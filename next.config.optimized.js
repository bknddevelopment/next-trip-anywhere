/** @type {import('next').NextConfig} */

const { BundleAnalyzerPlugin } =
  process.env.ANALYZE === 'true'
    ? require('webpack-bundle-analyzer')
    : { BundleAnalyzerPlugin: false }

const isProd = process.env.NODE_ENV === 'production'

/**
 * Optimized Next.js Configuration for 500+ Page Static Site
 * Implements advanced optimizations for build performance and runtime efficiency
 */
const nextConfig = {
  // Static export configuration
  ...(isProd && {
    output: 'export',
    distDir: '.next-build'
  }),

  // React optimizations
  reactStrictMode: true,
  productionBrowserSourceMaps: false,

  // Compiler optimizations
  compiler: {
    removeConsole: isProd ? { exclude: ['error', 'warn'] } : false,
    reactRemoveProperties: isProd ? { properties: ['^data-testid'] } : false,
    emotion: true,
  },

  // Build optimizations
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: true,

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['app', 'components', 'lib'],
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // Image optimization
  images: {
    unoptimized: true, // Required for static export
    loader: 'custom',
    loaderFile: './lib/imageLoader.js',
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // URL configuration
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,

  // Module optimization
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
    '@heroicons/react/24/outline': {
      transform: '@heroicons/react/24/outline/{{member}}',
    },
    '@heroicons/react/24/solid': {
      transform: '@heroicons/react/24/solid/{{member}}',
    },
  },

  // Experimental features for performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@tanstack/react-query',
      'react-hook-form',
      'clsx',
      'tailwind-merge',
    ],
    webpackMemoryOptimizations: true,
    craCompat: false,
    esmExternals: true,
    fullySpecified: false,
    urlImports: [],
    adjustFontFallbacks: true,
    adjustFontFallbacksWithSizeAdjust: true,
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // Headers for caching (Note: Not applied in static export)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_BASE_PATH: '',
  },

  // Server external packages
  serverExternalPackages: ['sharp', '@prisma/client'],

  // Webpack configuration for advanced optimizations
  webpack: (config, { dev, isServer, webpack }) => {
    // Bundle analyzer
    if (BundleAnalyzerPlugin && !isServer && !dev) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: './analyze/client.html',
          openAnalyzer: false,
          generateStatsFile: true,
          statsFilename: './analyze/stats.json',
        })
      )
    }

    // Production optimizations
    if (!dev && !isServer) {
      // Advanced chunk splitting for 500+ pages
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        minimize: true,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          cacheGroups: {
            // React and core framework
            framework: {
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next|styled-jsx)[\\/]/,
              priority: 50,
              enforce: true,
              reuseExistingChunk: true,
            },

            // Common libraries used across multiple pages
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]

                // Group certain packages together
                if (packageName.includes('@tanstack')) return 'tanstack'
                if (packageName.includes('lucide')) return 'icons'
                if (packageName.includes('framer')) return 'animation'
                if (packageName.includes('tailwind')) return 'styles'

                // Large libraries get their own chunk
                if (['lodash', 'moment', 'date-fns', 'react-hook-form'].includes(packageName)) {
                  return packageName.replace('@', '')
                }

                return 'vendor'
              },
              priority: 30,
              minChunks: 2,
              reuseExistingChunk: true,
            },

            // Shared components used across pages
            components: {
              name: 'components',
              test: /[\\/]components[\\/]/,
              priority: 20,
              minChunks: 3,
              reuseExistingChunk: true,
            },

            // Utilities and helpers
            utils: {
              name: 'utils',
              test: /[\\/](lib|utils)[\\/]/,
              priority: 20,
              minChunks: 2,
              reuseExistingChunk: true,
            },

            // Page-specific chunks for Essex County pages
            essexCounty: {
              name: 'essex-county',
              test: /[\\/]app[\\/]locations[\\/]essex-county[\\/]/,
              priority: 10,
              minChunks: 1,
              reuseExistingChunk: true,
            },

            // Travel-from pages chunk
            travelFrom: {
              name: 'travel-from',
              test: /[\\/]app[\\/]travel-from-/,
              priority: 10,
              minChunks: 1,
              reuseExistingChunk: true,
            },

            // Cruise pages chunk
            cruises: {
              name: 'cruises',
              test: /[\\/]app[\\/]cruises[\\/]/,
              priority: 10,
              minChunks: 1,
              reuseExistingChunk: true,
            },

            // Blog pages chunk
            blog: {
              name: 'blog',
              test: /[\\/]app[\\/]blog[\\/]/,
              priority: 10,
              minChunks: 1,
              reuseExistingChunk: true,
            },

            // CSS modules
            styles: {
              name: 'styles',
              test: /\.(css|scss)$/,
              chunks: 'all',
              enforce: true,
              priority: 60,
            },

            // Default chunks
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      }

      // Additional optimizations
      config.optimization.usedExports = true
      config.optimization.sideEffects = false
      config.optimization.concatenateModules = true
    }

    // Memory optimizations for build process
    if (!dev) {
      config.performance = {
        hints: 'warning',
        maxEntrypointSize: 512000, // 500KB
        maxAssetSize: 512000, // 500KB
      }

      // Limit concurrent compilations to prevent memory overflow
      config.parallelism = 4
    }

    // Ignore certain modules to reduce bundle size
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      })
    )

    // Module aliases for cleaner imports
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname),
      '@components': require('path').resolve(__dirname, 'components'),
      '@lib': require('path').resolve(__dirname, 'lib'),
      '@utils': require('path').resolve(__dirname, 'lib/utils'),
      '@hooks': require('path').resolve(__dirname, 'hooks'),
      '@styles': require('path').resolve(__dirname, 'styles'),
    }

    // Optimize module resolution
    config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx', '.json']
    config.resolve.preferRelative = true

    return config
  },
}

module.exports = nextConfig