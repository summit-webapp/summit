/** @type {import('next').NextConfig} */


const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

let apiHost;

try {
  apiHost = process.env.NEXT_PUBLIC_API_URL ? new URL(process.env.NEXT_PUBLIC_API_URL).hostname : undefined;
} catch {
  apiHost = undefined;
}

const imageDomains = Array.from(new Set([apiHost].filter(Boolean)));

const nextConfig = {
  images: {
    domains: imageDomains,
  },
  reactStrictMode: false,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/product-category',
        permanent: false,
      },
    ]
  },
};

module.exports = withBundleAnalyzer(nextConfig);
// module.exports = nextConfig;
