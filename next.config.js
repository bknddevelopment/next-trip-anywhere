/** @type {import('next').NextConfig} */
const { BundleAnalyzerPlugin } =
  process.env.ANALYZE === 'true'
    ? require('webpack-bundle-analyzer')
    : { BundleAnalyzerPlugin: false }

const isProd = process.env.NODE_ENV === 'production'
// No basePath needed when using custom domain
const basePath = ''

const nextConfig = {
  // Only use 'export' for production builds
  ...(isProd && { output: 'export' }),
  ...(isProd && { distDir: '.next-build' }), // Use different build dir for production
  // Remove basePath and assetPrefix for custom domain
  // basePath: basePath,
  // assetPrefix: basePath,

  // React strict mode for better error detection
  reactStrictMode: true,

  // Optimize production builds
  productionBrowserSourceMaps: false,

  // Performance optimizations
  compiler: {
    removeConsole: isProd ? { exclude: ['error', 'warn'] } : false,
  },

  eslint: {
    // ESLint enabled during builds
    ignoreDuringBuilds: false,
  },

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
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  trailingSlash: true,
  compress: true,
  poweredByHeader: false,

  // Server external packages for optimization
  serverExternalPackages: ['sharp'],

  experimental: {
    optimizeCss: true,
    // Enable module federation for better code splitting
    esmExternals: true,
    // Additional performance optimizations
    scrollRestoration: true,
    optimizePackageImports: ['lucide-react', 'framer-motion', '@tanstack/react-query'],
  },

  // NOTE: Headers configuration is not compatible with static export (output: 'export')
  // If you need headers, use a Node.js server deployment instead
  // Security headers can be configured at the hosting provider level (e.g., Vercel, Netlify, GitHub Pages)

  // Add environment variables for runtime access
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },

  // Webpack configuration for optimizations
  webpack: (config, { dev, isServer }) => {
    // Add bundle analyzer in analyze mode
    if (BundleAnalyzerPlugin && !isServer && !dev) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: './analyze/client.html',
          openAnalyzer: false,
        })
      )
    }

    // Optimize chunks
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Framework chunk
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              enforce: true,
            },
            // Library chunk
            lib: {
              test(module) {
                return module.size() > 160000 && /node_modules[\\/]/.test(module.identifier())
              },
              name(module) {
                const hash = require('crypto').createHash('sha1')
                hash.update(module.identifier())
                return hash.digest('hex').substring(0, 8)
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            // Commons chunk
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
            },
            // Shared chunk
            shared: {
              name(module, chunks) {
                return 'shared'
              },
              priority: 10,
              minChunks: 2,
              reuseExistingChunk: true,
            },
          },
          maxAsyncRequests: 25,
          maxInitialRequests: 25,
        },
        runtimeChunk: {
          name: 'runtime',
        },
        minimize: true,
      }
    }

    // Add module aliases for cleaner imports
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname),
    }

    return config
  },
}

module.exports = nextConfig
