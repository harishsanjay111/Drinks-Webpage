/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    workerThreads: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'drinks-apps.s3.amazonaws.com',
      },
    ],
  },
  staticPageGenerationTimeout: 60000, // 60 seconds
};

export default nextConfig;