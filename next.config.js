/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const nextConfig = {
  images: {
    domains: ['summit.8848digitalerp.com', 's3.us-east-2.amazonaws.com'],
  },
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = withBundleAnalyzer(nextConfig);
// module.exports = nextConfig;
