/** @type {import('next').NextConfig} */


const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const nextConfig = {
  images: {
    domains: ['summit.8848digitalerp.com', 'staging-twinkle.8848digitalerp.com', 'emr-euro-shine.8848digitalerp.com', 'backend.atelier-reya.com'],
  },    
    reactStrictMode: false,
  swcMinify: true,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
// module.exports = nextConfig;
