/**
 * Performance Monitor for Next.js Static Site
 * Tracks Core Web Vitals, bundle sizes, and page performance
 */

import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals'

export interface PerformanceMetrics {
  // Core Web Vitals
  lcp?: number // Largest Contentful Paint
  fid?: number // First Input Delay
  cls?: number // Cumulative Layout Shift
  fcp?: number // First Contentful Paint
  ttfb?: number // Time to First Byte

  // Additional metrics
  tti?: number // Time to Interactive
  tbt?: number // Total Blocking Time
  inp?: number // Interaction to Next Paint

  // Resource metrics
  bundleSize?: number
  imageLoadTime?: number
  scriptLoadTime?: number
  cssLoadTime?: number
  totalResourceSize?: number

  // Memory metrics
  memoryUsage?: number
  memoryLimit?: number
}

export interface PerformanceBudget {
  lcp: number
  fid: number
  cls: number
  fcp: number
  ttfb: number
  bundleSize: number
  totalResourceSize: number
}

// Performance budgets for 500+ page site
export const PERFORMANCE_BUDGETS: PerformanceBudget = {
  lcp: 2500, // 2.5s
  fid: 100, // 100ms
  cls: 0.1, // 0.1
  fcp: 1500, // 1.5s
  ttfb: 600, // 600ms
  bundleSize: 200 * 1024, // 200KB
  totalResourceSize: 1024 * 1024, // 1MB
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {}
  private observers: PerformanceObserver[] = []

  constructor() {
    if (typeof window !== 'undefined') {
      this.initWebVitals()
      this.initResourceObserver()
      this.initMemoryMonitoring()
    }
  }

  private initWebVitals() {
    // Core Web Vitals
    getCLS((metric) => {
      this.metrics.cls = metric.value
      this.checkBudget('cls', metric.value)
    })

    getFID((metric) => {
      this.metrics.fid = metric.value
      this.checkBudget('fid', metric.value)
    })

    getLCP((metric) => {
      this.metrics.lcp = metric.value
      this.checkBudget('lcp', metric.value)
    })

    getFCP((metric) => {
      this.metrics.fcp = metric.value
      this.checkBudget('fcp', metric.value)
    })

    getTTFB((metric) => {
      this.metrics.ttfb = metric.value
      this.checkBudget('ttfb', metric.value)
    })
  }

  private initResourceObserver() {
    if ('PerformanceObserver' in window) {
      // Observe resource timing
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'resource') {
            const resourceEntry = entry as PerformanceResourceTiming
            this.processResourceEntry(resourceEntry)
          }
        }
      })

      resourceObserver.observe({ entryTypes: ['resource'] })
      this.observers.push(resourceObserver)

      // Observe navigation timing
      const navigationObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming
            this.processNavigationEntry(navEntry)
          }
        }
      })

      navigationObserver.observe({ entryTypes: ['navigation'] })
      this.observers.push(navigationObserver)
    }
  }

  private initMemoryMonitoring() {
    if ('memory' in performance) {
      const memoryInfo = (performance as any).memory
      this.metrics.memoryUsage = memoryInfo.usedJSHeapSize
      this.metrics.memoryLimit = memoryInfo.jsHeapSizeLimit

      // Monitor memory usage periodically
      setInterval(() => {
        const currentMemory = memoryInfo.usedJSHeapSize
        if (currentMemory > this.metrics.memoryUsage! * 1.5) {
          console.warn('Memory usage increased by 50%:', {
            previous: this.metrics.memoryUsage,
            current: currentMemory,
          })
        }
        this.metrics.memoryUsage = currentMemory
      }, 10000) // Check every 10 seconds
    }
  }

  private processResourceEntry(entry: PerformanceResourceTiming) {
    const duration = entry.duration
    const size = entry.transferSize || 0

    // Track resource by type
    if (entry.name.includes('.js') || entry.name.includes('.mjs')) {
      this.metrics.scriptLoadTime = Math.max(
        this.metrics.scriptLoadTime || 0,
        duration
      )
    } else if (entry.name.includes('.css')) {
      this.metrics.cssLoadTime = Math.max(
        this.metrics.cssLoadTime || 0,
        duration
      )
    } else if (
      entry.name.match(/\.(jpg|jpeg|png|webp|avif|svg|gif)/i)
    ) {
      this.metrics.imageLoadTime = Math.max(
        this.metrics.imageLoadTime || 0,
        duration
      )
    }

    // Track total resource size
    this.metrics.totalResourceSize = (this.metrics.totalResourceSize || 0) + size
  }

  private processNavigationEntry(entry: PerformanceNavigationTiming) {
    // Calculate Time to Interactive (approximate)
    const tti = entry.loadEventEnd - entry.fetchStart
    this.metrics.tti = tti

    // Calculate Total Blocking Time (approximate)
    const tbt = Math.max(0, entry.loadEventStart - entry.responseEnd - 50)
    this.metrics.tbt = tbt
  }

  private checkBudget(metric: keyof PerformanceBudget, value: number) {
    const budget = PERFORMANCE_BUDGETS[metric]
    if (value > budget) {
      console.warn(`Performance budget exceeded for ${metric}:`, {
        actual: value,
        budget,
        exceeded: value - budget,
      })

      // Send to analytics or monitoring service
      this.reportBudgetViolation(metric, value, budget)
    }
  }

  private reportBudgetViolation(
    metric: string,
    actual: number,
    budget: number
  ) {
    // Report to analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'performance_budget_exceeded', {
        metric,
        actual,
        budget,
        page: window.location.pathname,
      })
    }
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics }
  }

  public reportMetrics() {
    const metrics = this.getMetrics()
    console.info('Performance Metrics:', metrics)

    // Send to analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'performance_metrics', {
        ...metrics,
        page: window.location.pathname,
      })
    }

    return metrics
  }

  public cleanup() {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }
}

// Singleton instance
let performanceMonitor: PerformanceMonitor | null = null

export function getPerformanceMonitor(): PerformanceMonitor {
  if (!performanceMonitor && typeof window !== 'undefined') {
    performanceMonitor = new PerformanceMonitor()
  }
  return performanceMonitor!
}

// Utility functions for manual performance tracking
export function measurePerformance<T>(
  name: string,
  fn: () => T
): T {
  const start = performance.now()
  const result = fn()
  const duration = performance.now() - start

  console.info(`[Performance] ${name}: ${duration.toFixed(2)}ms`)

  return result
}

export async function measureAsyncPerformance<T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> {
  const start = performance.now()
  const result = await fn()
  const duration = performance.now() - start

  console.info(`[Performance] ${name}: ${duration.toFixed(2)}ms`)

  return result
}

// Resource hint utilities
export function preloadResource(href: string, as: string) {
  if (typeof document !== 'undefined') {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = href
    link.as = as

    if (as === 'font') {
      link.crossOrigin = 'anonymous'
    }

    document.head.appendChild(link)
  }
}

export function prefetchResource(href: string) {
  if (typeof document !== 'undefined') {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = href
    document.head.appendChild(link)
  }
}

export function preconnect(origin: string) {
  if (typeof document !== 'undefined') {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = origin
    document.head.appendChild(link)
  }
}

// Lazy loading utility with Intersection Observer
export function lazyLoad(
  selector: string,
  callback: (element: Element) => void,
  options?: IntersectionObserverInit
) {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry.target)
          observer.unobserve(entry.target)
        }
      })
    }, options)

    const elements = document.querySelectorAll(selector)
    elements.forEach((element) => observer.observe(element))

    return observer
  }

  // Fallback for browsers without Intersection Observer
  const elements = document.querySelectorAll(selector)
  elements.forEach(callback)
  return null
}

// Bundle size tracking
export function trackBundleSize() {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const resources = performance.getEntriesByType('resource')

    const bundles = resources.filter(
      (r) => r.name.includes('.js') || r.name.includes('.css')
    )

    const totalSize = bundles.reduce(
      (sum, r) => sum + ((r as PerformanceResourceTiming).transferSize || 0),
      0
    )

    const jsSize = bundles
      .filter((r) => r.name.includes('.js'))
      .reduce(
        (sum, r) => sum + ((r as PerformanceResourceTiming).transferSize || 0),
        0
      )

    const cssSize = bundles
      .filter((r) => r.name.includes('.css'))
      .reduce(
        (sum, r) => sum + ((r as PerformanceResourceTiming).transferSize || 0),
        0
      )

    return {
      total: totalSize,
      js: jsSize,
      css: cssSize,
      resources: bundles.length,
    }
  }

  return null
}

export default getPerformanceMonitor