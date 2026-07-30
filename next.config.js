/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  // Add webpack configuration to handle chunk loading errors
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Disable caching in development to prevent chunk loading errors
      config.cache = false;
    }
    return config;
  },
  // Enable better error handling for chunk loading failures
  experimental: {
    optimizePackageImports: ['react-hot-toast', '@heroicons/react'],
  },
}

module.exports = nextConfig