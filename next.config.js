/** @type {import('next').NextConfig} */
const { BundleAnalyzerPlugin } =
  process.env.ANALYZE === 'true'
    ? require('webpack-bundle-analyzer')
    : { BundleAnalyzerPlugin: false }

const isProd = process.env.NODE_ENV === 'production'
// Use the correct case-sensitive path for GitHub Pages
const basePath = isProd ? '/next-trip-anywhere' : ''

const nextConfig = {
  // Only use 'export' for production builds
  ...(isProd && { output: 'export' }),
  ...(isProd && { distDir: '.next-build' }), // Use different build dir for production
  basePath: basePath,
  assetPrefix: basePath,

  // React strict mode for better error detection
  reactStrictMode: true,

  // Optimize production builds
  productionBrowserSourceMaps: false,
  
  // Performance optimizations
  compiler: {
    removeConsole: isProd ? { exclude: ['error', 'warn'] } : false,
  },

  eslint: {
    // Temporarily disable ESLint during builds to check other issues
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
  
  // Headers configuration for performance and SEO
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin',
        },
      ],
    },
    {
      source: '/:all*(woff|woff2|ttf|eot)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/:all*(jpg|jpeg|gif|png|svg|ico|webp|avif)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/:all*(js|css)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],

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

// Note: Headers don't work with static export (output: 'export')
// If you need headers, remove the output: 'export' config
// and use a Node.js server deployment instead

module.exports = nextConfig
