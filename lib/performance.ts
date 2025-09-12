/**
 * Performance monitoring and optimization utilities
 * Tracks Core Web Vitals and provides performance insights
 */

// Type definitions for performance monitoring
interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput: boolean
  value: number
}

interface GtagWindow extends Window {
  gtag: (...args: unknown[]) => void
}

interface IdleCallbackWindow {
  requestIdleCallback: (callback: () => void, options?: { timeout?: number }) => number
  cancelIdleCallback: (id: number) => void
}

interface PerformanceMetrics {
  FCP?: number // First Contentful Paint
  LCP?: number // Largest Contentful Paint
  FID?: number // First Input Delay
  CLS?: number // Cumulative Layout Shift
  TTFB?: number // Time to First Byte
  INP?: number // Interaction to Next Paint
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {}
  private observers: Map<string, PerformanceObserver> = new Map()

  constructor() {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      this.initializeObservers()
    }
  }

  private initializeObservers() {
    // Observe paint timing
    try {
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.FCP = Math.round(entry.startTime)
            this.log('FCP', this.metrics.FCP)
          }
        }
      })
      paintObserver.observe({ entryTypes: ['paint'] })
      this.observers.set('paint', paintObserver)
    } catch {
      console.warn('Paint observer not supported')
    }

    // Observe LCP
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        this.metrics.LCP = Math.round(lastEntry.startTime)
        this.log('LCP', this.metrics.LCP)
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
      this.observers.set('lcp', lcpObserver)
    } catch {
      console.warn('LCP observer not supported')
    }

    // Observe FID
    try {
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if ('processingStart' in entry) {
            const eventEntry = entry as PerformanceEventTiming
            const fid = eventEntry.processingStart - eventEntry.startTime
            if (!this.metrics.FID || fid < this.metrics.FID) {
              this.metrics.FID = Math.round(fid)
              this.log('FID', this.metrics.FID)
            }
          }
        }
      })
      fidObserver.observe({ entryTypes: ['first-input'] })
      this.observers.set('fid', fidObserver)
    } catch {
      console.warn('FID observer not supported')
    }

    // Observe CLS
    try {
      let clsValue = 0
      const clsEntries: PerformanceEntry[] = []

      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if ('hadRecentInput' in entry && !(entry as LayoutShiftEntry).hadRecentInput) {
            clsEntries.push(entry)
            clsValue += (entry as LayoutShiftEntry).value
            this.metrics.CLS = Math.round(clsValue * 1000) / 1000
          }
        }
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
      this.observers.set('cls', clsObserver)
    } catch {
      console.warn('CLS observer not supported')
    }

    // Observe navigation timing
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navEntries = performance.getEntriesByType('navigation')
      if (navEntries.length > 0) {
        const navEntry = navEntries[0] as PerformanceNavigationTiming
        this.metrics.TTFB = Math.round(navEntry.responseStart - navEntry.fetchStart)
        this.log('TTFB', this.metrics.TTFB)
      }
    }
  }

  private log(metric: string, value: number) {
    if (process.env.NODE_ENV === 'development') {
      const rating = this.getRating(metric, value)
      const color = rating === 'good' ? '🟢' : rating === 'needs-improvement' ? '🟡' : '🔴'
      console.info(`${color} [Performance] ${metric}: ${value}ms (${rating})`)
    }
  }

  private getRating(metric: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const thresholds: Record<string, { good: number; poor: number }> = {
      FCP: { good: 1800, poor: 3000 },
      LCP: { good: 2500, poor: 4000 },
      FID: { good: 100, poor: 300 },
      CLS: { good: 0.1, poor: 0.25 },
      TTFB: { good: 800, poor: 1800 },
      INP: { good: 200, poor: 500 },
    }

    const threshold = thresholds[metric]
    if (!threshold) {
      return 'good'
    }

    if (value <= threshold.good) {
      return 'good'
    }
    if (value >= threshold.poor) {
      return 'poor'
    }
    return 'needs-improvement'
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics }
  }

  public reportToAnalytics() {
    // Report to Google Analytics or other analytics service
    if (typeof window !== 'undefined' && 'gtag' in window) {
      Object.entries(this.metrics).forEach(([metric, value]) => {
        (window as GtagWindow).gtag('event', 'performance', {
          event_category: 'Web Vitals',
          event_label: metric,
          value: Math.round(value),
          non_interaction: true,
        })
      })
    }
  }

  public destroy() {
    this.observers.forEach((observer) => observer.disconnect())
    this.observers.clear()
  }
}

// Singleton instance
let performanceMonitor: PerformanceMonitor | null = null

export function initPerformanceMonitoring() {
  if (typeof window !== 'undefined' && !performanceMonitor) {
    performanceMonitor = new PerformanceMonitor()

    // Report metrics when page is about to unload
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden' && performanceMonitor) {
        performanceMonitor.reportToAnalytics()
      }
    })
  }
  return performanceMonitor
}

export function getPerformanceMetrics(): PerformanceMetrics {
  return performanceMonitor?.getMetrics() || {}
}

/**
 * Utility to measure component render performance
 */
export function measureComponentPerformance(componentName: string) {
  if (typeof window === 'undefined' || !('performance' in window)) {
    return {
      start: () => {},
      end: () => {},
    }
  }

  const startMark = `${componentName}-start`
  const endMark = `${componentName}-end`
  const measureName = `${componentName}-render`

  return {
    start: () => performance.mark(startMark),
    end: () => {
      performance.mark(endMark)
      performance.measure(measureName, startMark, endMark)
      
      const measures = performance.getEntriesByName(measureName)
      if (measures.length > 0 && process.env.NODE_ENV === 'development') {
        const duration = Math.round(measures[measures.length - 1].duration)
        console.info(`⚡ [Performance] ${componentName} rendered in ${duration}ms`)
      }
      
      // Clean up marks and measures
      performance.clearMarks(startMark)
      performance.clearMarks(endMark)
      performance.clearMeasures(measureName)
    },
  }
}

/**
 * Preload critical resources
 */
export function preloadResource(url: string, type: 'image' | 'script' | 'style' | 'font' | 'fetch') {
  if (typeof window === 'undefined') {
    return
  }

  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = url

  switch (type) {
    case 'image':
      link.as = 'image'
      break
    case 'script':
      link.as = 'script'
      break
    case 'style':
      link.as = 'style'
      break
    case 'font':
      link.as = 'font'
      link.crossOrigin = 'anonymous'
      break
    case 'fetch':
      link.as = 'fetch'
      link.crossOrigin = 'anonymous'
      break
  }

  document.head.appendChild(link)
}

/**
 * Prefetch resources for likely next navigation
 */
export function prefetchRoute(url: string) {
  if (typeof window === 'undefined') {
    return
  }

  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = url
  document.head.appendChild(link)
}

/**
 * Request idle callback with fallback
 */
export function requestIdleCallback(
  callback: () => void,
  options?: { timeout?: number }
): number {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    return (window as unknown as IdleCallbackWindow).requestIdleCallback(callback, options)
  }
  // Fallback to setTimeout
  if (typeof window !== 'undefined') {
    return (typeof window !== 'undefined' ? window : global).setTimeout(callback, options?.timeout || 1) as unknown as number
  }
  return 0
}

/**
 * Cancel idle callback with fallback
 */
export function cancelIdleCallback(id: number) {
  if (typeof window !== 'undefined') {
    if ('cancelIdleCallback' in window) {
      (window as unknown as IdleCallbackWindow).cancelIdleCallback(id)
    } else {
      (typeof window !== 'undefined' ? window : global).clearTimeout(id as unknown as NodeJS.Timeout)
    }
  }
}