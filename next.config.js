/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'www.vccircle.com',
      'img-cdn.publive.online',
      'entrackr.com',
      'img.etimg.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.vccircle.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'img-cdn.publive.online',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'entrackr.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.etimg.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
}

module.exports = nextConfig