#!/usr/bin/env node
/**
 * Cross-platform settings fetcher for Summit/EMR
 *
 * Requirements:
 * - Node 18+ (for global fetch) OR Node 16 with undici/polyfill (prefer Node 18+)
 * - A .env file located next to this script (customize ENV_PATH if needed)
 *
 * Env:
 * - NEXT_PUBLIC_ENGINE_NAME = "EMR" | "Summit"
 * - NEXT_PUBLIC_API_URL     = base URL, e.g. https://site.com or http://localhost:8000
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Change this if you want .env at repo root instead:
// const ENV_PATH = path.resolve(__dirname, "..", ".env");
const ENV_PATH = path.resolve(__dirname, '.env');
const OUTPUT_FILE = path.resolve(process.cwd(), 'summit-settings.json');

function parseDotEnv(content) {
  const out = {};
  const lines = content.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const eq = line.indexOf('=');
    if (eq === -1) continue;

    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();

    // remove surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // basic unescape for \n
    value = value.replace(/\\n/g, '\n');

    out[key] = value;
  }
  return out;
}

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`.env file not found at: ${filePath}`);
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const parsed = parseDotEnv(content);

  // Do NOT override already-set env vars (lets CI / shell override)
  for (const [k, v] of Object.entries(parsed)) {
    if (process.env[k] == null) process.env[k] = v;
  }

  return { content, parsed };
}

function requireEnv(name) {
  const val = process.env[name];
  if (!val) throw new Error(`${name} is not set (check .env / environment variables)`);
  return val;
}

function joinUrl(base, pathname) {
  // robust URL joining (handles trailing slashes)
  const u = new URL(base);
  // ensure single slash join
  u.pathname = `${u.pathname.replace(/\/$/, '')}${pathname.startsWith('/') ? '' : '/'}${pathname}`;
  return u.toString();
}

async function fetchJson(url) {
  // If you have self-signed HTTPS in dev, DO NOT blindly disable TLS here.
  // Prefer fixing the cert. If you must bypass in dev, use NODE_TLS_REJECT_UNAUTHORIZED=0.
  const res = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });

  const text = await res.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    // keep json as null
  }

  return { status: res.status, text, json };
}

function hasFrappeException(json) {
  // Frappe error shapes vary; 'exception' is common
  return !!(json && typeof json === 'object' && 'exception' in json);
}

async function main() {
  // Load .env (without overriding existing process.env)
  const { content } = loadEnvFile(ENV_PATH);

  const engine = requireEnv('NEXT_PUBLIC_ENGINE_NAME');
  const apiBase = requireEnv('NEXT_PUBLIC_API_URL');

  let apiUrl;
  if (engine === 'EMR') {
    console.log('NEXT_PUBLIC_ENGINE_NAME is EMR.');
    apiUrl = joinUrl(apiBase, '/api/resource/Settings');
  } else if (engine === 'Summit') {
    console.log('NEXT_PUBLIC_ENGINE_NAME is Summit. Proceeding to fetch summit settings.');
    apiUrl = joinUrl(apiBase, '/api/resource/Summit%20Settings/Summit%20Settings');
  } else {
    throw new Error(`Unsupported NEXT_PUBLIC_ENGINE_NAME="${engine}". Expected "EMR" or "Summit".`);
  }

  const { status, text, json } = await fetchJson(apiUrl);

  // Write whatever we got (useful for debugging)
  fs.writeFileSync(OUTPUT_FILE, text ?? '', 'utf8');

  if (status !== 200) {
    throw new Error(`❌ API call failed with status ${status}\nResponse saved to: ${OUTPUT_FILE}\nBody:\n${text}`);
  }

  if (hasFrappeException(json)) {
    throw new Error(`❌ Frappe exception returned\nResponse saved to: ${OUTPUT_FILE}\nBody:\n${text}`);
  }

  console.log(`✅ Settings fetched from ${apiUrl}`);
  console.log(`✅ Saved to ${OUTPUT_FILE}`);
}

main().catch((err) => {
  console.error(err?.message || err);
  process.exit(1);
});
