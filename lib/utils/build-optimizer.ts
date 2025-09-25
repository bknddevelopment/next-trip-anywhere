/**
 * Build Optimizer for Next.js Static Site with 500+ pages
 * Implements strategies to optimize build time and memory usage
 */

import fs from 'fs'
import path from 'path'

export interface BuildConfig {
  maxConcurrentPages: number
  memoryLimit: number
  chunkSize: number
  enableCache: boolean
  parallelization: boolean
  incrementalBuild: boolean
}

export const OPTIMIZED_BUILD_CONFIG: BuildConfig = {
  maxConcurrentPages: 50, // Process 50 pages at a time
  memoryLimit: 8192, // 8GB
  chunkSize: 100, // Split builds into chunks of 100 pages
  enableCache: true,
  parallelization: true,
  incrementalBuild: true,
}

/**
 * Splits page generation into batches to prevent memory overflow
 */
export function* batchPages<T>(pages: T[], batchSize: number): Generator<T[]> {
  for (let i = 0; i < pages.length; i += batchSize) {
    yield pages.slice(i, i + batchSize)
  }
}

/**
 * Memory-efficient page processor
 */
export async function processPageBatch<T>(
  batch: T[],
  processor: (page: T) => Promise<void>,
  maxConcurrent: number = 10
): Promise<void> {
  const results = []

  for (let i = 0; i < batch.length; i += maxConcurrent) {
    const chunk = batch.slice(i, i + maxConcurrent)
    const promises = chunk.map(processor)
    await Promise.all(promises)

    // Force garbage collection hint (Node.js)
    if (global.gc && i % 100 === 0) {
      global.gc()
    }
  }
}

/**
 * Cache manager for build artifacts
 */
export class BuildCache {
  private cacheDir: string
  private manifest: Map<string, { hash: string; timestamp: number }>

  constructor(cacheDir: string = '.next-cache') {
    this.cacheDir = path.join(process.cwd(), cacheDir)
    this.manifest = new Map()
    this.loadManifest()
  }

  private loadManifest() {
    const manifestPath = path.join(this.cacheDir, 'manifest.json')
    if (fs.existsSync(manifestPath)) {
      try {
        const data = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
        this.manifest = new Map(Object.entries(data))
      } catch (error) {
        console.error('Failed to load cache manifest:', error)
      }
    }
  }

  private saveManifest() {
    const manifestPath = path.join(this.cacheDir, 'manifest.json')
    fs.mkdirSync(this.cacheDir, { recursive: true })
    fs.writeFileSync(
      manifestPath,
      JSON.stringify(Object.fromEntries(this.manifest))
    )
  }

  public isCached(key: string, hash: string): boolean {
    const entry = this.manifest.get(key)
    if (!entry) return false

    // Check if cache is still valid (24 hours)
    const isExpired = Date.now() - entry.timestamp > 24 * 60 * 60 * 1000
    return !isExpired && entry.hash === hash
  }

  public set(key: string, hash: string, data: any) {
    const filePath = path.join(this.cacheDir, `${key}.json`)
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, JSON.stringify(data))

    this.manifest.set(key, { hash, timestamp: Date.now() })
    this.saveManifest()
  }

  public get(key: string): any | null {
    const filePath = path.join(this.cacheDir, `${key}.json`)
    if (fs.existsSync(filePath)) {
      try {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      } catch (error) {
        console.error(`Failed to read cache for ${key}:`, error)
      }
    }
    return null
  }

  public clear() {
    if (fs.existsSync(this.cacheDir)) {
      fs.rmSync(this.cacheDir, { recursive: true, force: true })
    }
    this.manifest.clear()
  }
}

/**
 * Parallel build executor for static pages
 */
export class ParallelBuildExecutor {
  private workerPool: any[] = []
  private maxWorkers: number

  constructor(maxWorkers: number = 4) {
    this.maxWorkers = maxWorkers
  }

  async execute<T, R>(
    items: T[],
    processor: (item: T) => Promise<R>
  ): Promise<R[]> {
    const results: R[] = []
    const batches = batchPages(items, Math.ceil(items.length / this.maxWorkers))

    const batchPromises = Array.from(batches).map(async (batch) => {
      const batchResults = await Promise.all(batch.map(processor))
      return batchResults
    })

    const allResults = await Promise.all(batchPromises)
    return allResults.flat()
  }
}

/**
 * Dynamic import optimizer for code splitting
 */
export function createDynamicImport(
  componentPath: string,
  options?: {
    loading?: () => React.ReactElement
    ssr?: boolean
    suspense?: boolean
  }
) {
  return {
    loader: () => import(componentPath),
    loading: options?.loading,
    ssr: options?.ssr ?? true,
    suspense: options?.suspense ?? false,
  }
}

/**
 * Route-based code splitting configuration
 */
export const ROUTE_CHUNKS = {
  // Core pages - always loaded
  core: [
    '/',
    '/flights',
    '/cruises',
    '/packages',
    '/destinations',
  ],

  // Essex County pages - lazy load
  essexCounty: {
    pattern: /^\/locations\/essex-county/,
    chunk: 'essex-county',
  },

  // Travel from pages - lazy load
  travelFrom: {
    pattern: /^\/travel-from-/,
    chunk: 'travel-from',
  },

  // Blog pages - lazy load
  blog: {
    pattern: /^\/blog/,
    chunk: 'blog',
  },

  // Cruise pages - split by type
  cruises: {
    pattern: /^\/cruises/,
    chunk: 'cruises',
  },

  // Package pages - split
  packages: {
    pattern: /^\/packages/,
    chunk: 'packages',
  },

  // Destination pages - split
  destinations: {
    pattern: /^\/destinations/,
    chunk: 'destinations',
  },
}

/**
 * Memory monitoring during build
 */
export class BuildMemoryMonitor {
  private initialMemory: number
  private peakMemory: number = 0
  private checkInterval: NodeJS.Timeout | null = null

  constructor() {
    this.initialMemory = process.memoryUsage().heapUsed
    this.startMonitoring()
  }

  private startMonitoring() {
    this.checkInterval = setInterval(() => {
      const currentMemory = process.memoryUsage().heapUsed
      this.peakMemory = Math.max(this.peakMemory, currentMemory)

      // Warn if memory usage is too high
      const usedGB = currentMemory / (1024 * 1024 * 1024)
      if (usedGB > 6) {
        console.warn(`High memory usage: ${usedGB.toFixed(2)}GB`)

        // Try to trigger garbage collection
        if (global.gc) {
          console.info('Triggering garbage collection...')
          global.gc()
        }
      }
    }, 5000) // Check every 5 seconds
  }

  public stopMonitoring() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval)
      this.checkInterval = null
    }
  }

  public getReport() {
    const currentMemory = process.memoryUsage().heapUsed
    return {
      initial: this.formatBytes(this.initialMemory),
      current: this.formatBytes(currentMemory),
      peak: this.formatBytes(this.peakMemory),
      increase: this.formatBytes(currentMemory - this.initialMemory),
    }
  }

  private formatBytes(bytes: number): string {
    const gb = bytes / (1024 * 1024 * 1024)
    const mb = bytes / (1024 * 1024)

    if (gb >= 1) {
      return `${gb.toFixed(2)}GB`
    }
    return `${mb.toFixed(2)}MB`
  }
}

/**
 * Webpack optimization helpers
 */
export const webpackOptimizations = {
  // Split chunks configuration for better caching
  splitChunks: {
    chunks: 'all' as const,
    cacheGroups: {
      // Framework libraries
      framework: {
        name: 'framework',
        test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
        priority: 50,
        reuseExistingChunk: true,
      },

      // Common libraries
      commons: {
        name: 'commons',
        test: /[\\/]node_modules[\\/]/,
        priority: 40,
        minChunks: 2,
      },

      // Shared components
      shared: {
        name: 'shared',
        test: /[\\/](components|lib)[\\/]/,
        priority: 30,
        minChunks: 3,
      },

      // Page-specific chunks
      pages: {
        name(module: any, chunks: any[]) {
          const pageRegex = /[\\/]app[\\/](.*?)[\\/]/
          const match = module.identifier().match(pageRegex)
          if (match) {
            const pageName = match[1].replace(/[\\/]/g, '-')
            return `page-${pageName}`
          }
          return 'page-common'
        },
        test: /[\\/]app[\\/]/,
        priority: 20,
        minChunks: 1,
      },

      // Style chunks
      styles: {
        name: 'styles',
        test: /\.css$/,
        chunks: 'all' as const,
        enforce: true,
        priority: 60,
      },
    },
    maxAsyncRequests: 30,
    maxInitialRequests: 30,
    minSize: 20000,
    maxSize: 244000,
  },

  // Minimize configuration
  minimizer: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
        ascii_only: true,
      },
    },
    parallel: true,
    extractComments: false,
  },

  // Module concatenation for smaller bundles
  optimization: {
    usedExports: true,
    sideEffects: false,
    concatenateModules: true,
  },
}

/**
 * Preload critical resources
 */
export function generateResourceHints(route: string): string[] {
  const hints: string[] = []

  // Always preload framework
  hints.push('<link rel="preload" href="/_next/static/chunks/framework.js" as="script">')

  // Route-specific preloads
  Object.entries(ROUTE_CHUNKS).forEach(([key, value]) => {
    if (key === 'core') return

    if ('pattern' in value && value.pattern.test(route)) {
      hints.push(
        `<link rel="prefetch" href="/_next/static/chunks/${value.chunk}.js" as="script">`
      )
    }
  })

  // Preload fonts
  hints.push('<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>')

  // Preconnect to external origins
  hints.push('<link rel="preconnect" href="https://fonts.googleapis.com">')
  hints.push('<link rel="preconnect" href="https://www.googletagmanager.com">')

  return hints
}

export default {
  BuildCache,
  ParallelBuildExecutor,
  BuildMemoryMonitor,
  batchPages,
  processPageBatch,
  webpackOptimizations,
  generateResourceHints,
}