/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const basePath = isProd ? '/next-trip-anywhere' : ''

const nextConfig = {
  // Only use 'export' for production builds
  ...(isProd && { output: 'export' }),
  basePath: basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './lib/imageLoader.js',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'cdn.coverr.co',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  trailingSlash: true,
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig
