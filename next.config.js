/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/waterlooville-:path*',
        destination: '/waterlooville-:path*.html',
      },
    ]
  },
  trailingSlash: false,
}

module.exports = nextConfig
