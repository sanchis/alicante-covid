const withPWA = require('next-pwa')
const withPlugins = require('next-compose-plugins')

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false
}

module.exports = withPlugins([
  [
    withPWA,
    {
      pwa: {
        disable: process.env.NODE_ENV === 'development',
        dest: 'public'
      }
    }
  ]
], nextConfig)
