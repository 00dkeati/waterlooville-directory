/** @type {import('next').NextConfig} */
const { loadCsvRedirects } = require('./scripts/loadCsvRedirects.mjs');

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
  
  // CSV-driven redirects
  async redirects() {
    try {
      const rows = loadCsvRedirects('./data/redirects.csv');
      const rules = rows.map(({ from, to, status }) => {
        return {
          source: from,
          destination: to,
          permanent: false,
          statusCode: status || 307,
        };
      });
      
      console.log(`[next.config] Generated ${rules.length} redirect rules`);
      return rules;
    } catch (error) {
      console.error('[next.config] Error loading redirects:', error);
      return [];
    }
  },
  
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
