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
    // Warning: We're temporarily ignoring ESLint during builds
    // TODO: Fix all ESLint warnings and re-enable this
    ignoreDuringBuilds: true,
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

    // Enable parallel processing for faster builds
    if (!dev) {
      config.parallelism = 4
    }

    // Optimize chunks for production builds
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          // Target: Keep chunks under 50KB for better loading performance
          maxSize: 51200, // 50KB in bytes
          minSize: 20000, // 20KB minimum
          cacheGroups: {
            // Disable default groups to have full control
            default: false,
            vendors: false,

            // Framework chunk: React, React-DOM and core dependencies
            // Priority: 40 (highest) - loads first, cached aggressively
            // Target: ~100-120KB (React + React-DOM)
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              enforce: true,
              reuseExistingChunk: true,
            },

            // Next.js specific code
            // Priority: 39 - loads with framework
            // Target: ~50-70KB
            nextjs: {
              name: 'nextjs',
              chunks: 'all',
              test: /[\\/]node_modules[\\/]next[\\/]/,
              priority: 39,
              enforce: true,
              reuseExistingChunk: true,
            },

            // Large third-party libraries (>160KB)
            // Priority: 35 - isolated to prevent bloating other chunks
            // Strategy: Split by hash for better caching
            lib: {
              test(module) {
                return module.size() > 160000 && /node_modules[\\/]/.test(module.identifier())
              },
              name(module) {
                const hash = require('crypto').createHash('sha1')
                hash.update(module.identifier())
                return 'lib-' + hash.digest('hex').substring(0, 8)
              },
              priority: 35,
              minChunks: 1,
              reuseExistingChunk: true,
              maxSize: 244000, // ~240KB max per lib chunk
            },

            // UI/Animation libraries: framer-motion, lucide-react
            // Priority: 32 - separate for better code splitting
            // Target: ~40-60KB per chunk
            ui: {
              name: 'ui',
              test: /[\\/]node_modules[\\/](framer-motion|lucide-react|clsx|tailwind-merge)[\\/]/,
              chunks: 'all',
              priority: 32,
              reuseExistingChunk: true,
              maxSize: 61440, // 60KB
            },

            // Form & validation libraries
            // Priority: 31 - used across multiple pages
            // Target: ~30-40KB
            forms: {
              name: 'forms',
              test: /[\\/]node_modules[\\/](react-hook-form|@hookform|zod)[\\/]/,
              chunks: 'all',
              priority: 31,
              reuseExistingChunk: true,
              maxSize: 51200, // 50KB
            },

            // React Query & data fetching
            // Priority: 30 - async loading optimization
            query: {
              name: 'query',
              test: /[\\/]node_modules[\\/](@tanstack[\\/]react-query)[\\/]/,
              chunks: 'all',
              priority: 30,
              reuseExistingChunk: true,
            },

            // Other vendor code from node_modules
            // Priority: 25 - general third-party code
            // Target: ~50-80KB per chunk
            vendor: {
              name: 'vendor',
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all',
              priority: 25,
              minChunks: 1,
              reuseExistingChunk: true,
              maxSize: 81920, // 80KB
            },

            // Commons chunk: Code shared across 2+ pages
            // Priority: 20 - shared application code
            // GOAL: Reduce from 272KB to 80-100KB by aggressive splitting
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
              reuseExistingChunk: true,
              maxSize: 102400, // 100KB maximum - enforced!
            },

            // Shared utilities and helpers
            // Priority: 15 - app-specific shared code
            shared: {
              name: 'shared',
              minChunks: 2,
              priority: 15,
              reuseExistingChunk: true,
              maxSize: 51200, // 50KB
            },
          },
          // Limit number of parallel requests for better performance
          // Reduced from 25 to balance splitting vs HTTP requests
          maxAsyncRequests: 20,
          maxInitialRequests: 20,
        },
        // Separate runtime chunk for better long-term caching
        runtimeChunk: {
          name: 'runtime',
        },
        minimize: true,
        // Use deterministic module IDs for better caching
        moduleIds: 'deterministic',
        // Use deterministic chunk IDs
        chunkIds: 'deterministic',
      }

      // Additional performance optimizations
      config.performance = {
        ...config.performance,
        // Set performance budgets
        maxEntrypointSize: 512000, // 500KB warning threshold
        maxAssetSize: 512000, // 500KB per asset
        hints: 'warning',
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
