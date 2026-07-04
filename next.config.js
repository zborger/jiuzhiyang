/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static image import
  images: {
    remotePatterns: [],
    unoptimized: false,
  },
};

module.exports = nextConfig;
