/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  experimental: {
    // optimizeCss: true, // Disabled - causing critters module error
    optimizePackageImports: ['@/components', '@/lib'],
  },
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
  },
  
  // Compression
  compress: true,
  
  // Bundle analyzer (uncomment for debugging)
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       ...config.resolve.fallback,
  //       fs: false,
  //     };
  //   }
  //   return config;
  // },
  
  async rewrites() {
    return {
      beforeFiles: [
        // These rewrites are checked before pages/public files
        {
          source: '/waterlooville-restaurants',
          destination: '/public/waterlooville-restaurants.html',
        },
        {
          source: '/waterlooville-shops',
          destination: '/public/waterlooville-shops.html',
        },
        {
          source: '/waterlooville-dentist',
          destination: '/public/waterlooville-dentist.html',
        },
        // Add more specific routes as needed
      ],
    }
  },
}

module.exports = nextConfig
