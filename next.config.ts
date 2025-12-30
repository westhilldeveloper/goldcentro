/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Optional: Add logging for dev
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;  // Changed from module.exports