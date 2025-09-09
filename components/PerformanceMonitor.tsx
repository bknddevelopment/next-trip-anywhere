'use client'

import { useEffect } from 'react'

// Type definitions for Web Vitals
interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number
  startTime: number
  interactionId?: string
}

interface LayoutShift extends PerformanceEntry {
  value: number
  hadRecentInput: boolean
}

// Type declarations are in ErrorBoundary.tsx

/**
 * Performance monitoring component that tracks Core Web Vitals and sends analytics
 * Tracks: LCP, FID, CLS, INP, TTFB, FCP
 */
export default function PerformanceMonitor() {
  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        // Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          if (lastEntry) {
            reportMetric('LCP', lastEntry.startTime)
          }
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            const performanceEventTiming = entry as PerformanceEventTiming
            if ('processingStart' in performanceEventTiming) {
              const delay =
                performanceEventTiming.processingStart - performanceEventTiming.startTime
              reportMetric('FID', delay)
            }
          })
        })
        fidObserver.observe({ entryTypes: ['first-input'] })

        // Cumulative Layout Shift (CLS)
        let clsValue = 0
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const layoutShiftEntry = entry as LayoutShift
            if ('hadRecentInput' in layoutShiftEntry && !layoutShiftEntry.hadRecentInput) {
              if ('value' in layoutShiftEntry) {
                clsValue += layoutShiftEntry.value
              }
            }
          }
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })

        // Report final CLS when page is hidden
        const handleVisibilityChange = () => {
          if (document.visibilityState === 'hidden') {
            reportMetric('CLS', clsValue * 1000) // Convert to milliseconds for consistency
          }
        }
        document.addEventListener('visibilitychange', handleVisibilityChange)

        // Interaction to Next Paint (INP)
        let maxINP = 0
        const inpObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const eventEntry = entry as PerformanceEventTiming
            if (eventEntry.interactionId) {
              maxINP = Math.max(maxINP, entry.duration)
              reportMetric('INP', maxINP)
            }
          }
        })
        inpObserver.observe({ entryTypes: ['event'] })

        // First Contentful Paint (FCP)
        const paintObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            if (entry.name === 'first-contentful-paint') {
              reportMetric('FCP', entry.startTime)
            }
          })
        })
        paintObserver.observe({ entryTypes: ['paint'] })

        // Time to First Byte (TTFB)
        const navigationEntry = performance.getEntriesByType(
          'navigation'
        )[0] as PerformanceNavigationTiming
        if (navigationEntry) {
          const ttfb = navigationEntry.responseStart - navigationEntry.fetchStart
          reportMetric('TTFB', ttfb)
        }

        // Long Task monitoring
        const longTaskObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            if (entry.duration > 50) {
              // Tasks longer than 50ms
              reportLongTask(entry.duration)
            }
          })
        })
        longTaskObserver.observe({ entryTypes: ['longtask'] })

        // Cleanup observers
        return () => {
          lcpObserver.disconnect()
          fidObserver.disconnect()
          clsObserver.disconnect()
          inpObserver.disconnect()
          paintObserver.disconnect()
          longTaskObserver.disconnect()
          document.removeEventListener('visibilitychange', handleVisibilityChange)
        }
      } catch (error) {
        // Silently fail if Performance Observer is not supported
        console.error('Performance monitoring failed:', error)
      }
    }

    // Monitor JavaScript errors
    const errorHandler = (event: ErrorEvent) => {
      reportError({
        message: event.message,
        source: event.filename,
        line: event.lineno,
        col: event.colno,
        error: event.error?.stack,
      })
    }
    window.addEventListener('error', errorHandler)

    // Monitor promise rejections
    const rejectionHandler = (event: PromiseRejectionEvent) => {
      reportError({
        message: 'Unhandled Promise Rejection',
        error: event.reason,
      })
    }
    window.addEventListener('unhandledrejection', rejectionHandler)

    return () => {
      window.removeEventListener('error', errorHandler)
      window.removeEventListener('unhandledrejection', rejectionHandler)
    }
  }, [])

  return null
}

/**
 * Report performance metrics to analytics
 */
function reportMetric(name: string, value: number) {
  // Round the value for cleaner reporting
  const roundedValue = Math.round(value)

  // Report to Google Analytics if available
  if (window.gtag) {
    window.gtag('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: name,
      value: roundedValue,
      non_interaction: true,
    })
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    const color = getMetricColor(name, value)
    console.log(
      `%c[${name}]`,
      `color: ${color}; font-weight: bold`,
      `${roundedValue}ms`,
      getMetricRating(name, value)
    )
  }
}

/**
 * Report long tasks
 */
function reportLongTask(duration: number) {
  if (window.gtag) {
    window.gtag('event', 'performance', {
      event_category: 'Performance',
      event_label: 'Long Task',
      value: Math.round(duration),
      non_interaction: true,
    })
  }

  if (process.env.NODE_ENV === 'development') {
    console.warn(`[Long Task] ${Math.round(duration)}ms - Consider optimizing`)
  }
}

/**
 * Report JavaScript errors
 */
function reportError(error: any) {
  if (window.gtag) {
    window.gtag('event', 'exception', {
      description: error.message || 'Unknown error',
      fatal: false,
    })
  }

  if (process.env.NODE_ENV === 'development') {
    console.error('[Error Tracking]', error)
  }
}

/**
 * Get color for metric value (green/yellow/red)
 */
function getMetricColor(name: string, value: number): string {
  const thresholds: Record<string, [number, number]> = {
    LCP: [2500, 4000],
    FID: [100, 300],
    CLS: [100, 250],
    INP: [200, 500],
    FCP: [1800, 3000],
    TTFB: [800, 1800],
  }

  const [good, poor] = thresholds[name] || [0, 0]
  if (value <= good) {
    return '#0cce6b' // Green
  }
  if (value <= poor) {
    return '#ffa400' // Yellow
  }
  return '#ff4e42' // Red
}

/**
 * Get rating for metric value
 */
function getMetricRating(name: string, value: number): string {
  const thresholds: Record<string, [number, number]> = {
    LCP: [2500, 4000],
    FID: [100, 300],
    CLS: [100, 250],
    INP: [200, 500],
    FCP: [1800, 3000],
    TTFB: [800, 1800],
  }

  const [good, poor] = thresholds[name] || [0, 0]
  if (value <= good) {
    return '✅ Good'
  }
  if (value <= poor) {
    return '⚠️ Needs Improvement'
  }
  return '❌ Poor'
}
