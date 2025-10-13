/** @type {import('next').NextConfig} */
const nextConfig = {
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
