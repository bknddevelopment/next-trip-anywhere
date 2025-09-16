/**
 * Performance Monitoring Utilities
 * Tracks Core Web Vitals and custom metrics
 */

// Core Web Vitals thresholds
export const PERFORMANCE_THRESHOLDS = {
  LCP: {
    good: 2500,
    needsImprovement: 4000,
  },
  FID: {
    good: 100,
    needsImprovement: 300,
  },
  CLS: {
    good: 0.1,
    needsImprovement: 0.25,
  },
  FCP: {
    good: 1800,
    needsImprovement: 3000,
  },
  TTI: {
    good: 3800,
    needsImprovement: 7300,
  },
  TTFB: {
    good: 800,
    needsImprovement: 1800,
  },
}

// Performance metrics collection
export interface PerformanceMetrics {
  lcp?: number
  fid?: number
  cls?: number
  fcp?: number
  tti?: number
  ttfb?: number
  resourceTiming?: {
    images: number
    scripts: number
    stylesheets: number
  }
}

// Initialize performance monitoring
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined' || !('performance' in window)) {
    return
  }

  // Report Web Vitals if available
  if ('web-vital' in window) {
    reportWebVitals()
  }

  // Monitor resource loading
  monitorResourceLoading()

  // Track custom metrics
  trackCustomMetrics()
}

// Report Core Web Vitals
function reportWebVitals() {
  // Only import in client-side
  if (typeof window !== 'undefined') {
    import('web-vitals')
      .then((vitals) => {
        if (vitals.onCLS) {
          vitals.onCLS((metric) => {
            console.log('CLS:', metric.value)
            sendMetricToAnalytics('CLS', metric.value)
          })
        }
        if (vitals.onFCP) {
          vitals.onFCP((metric) => {
            console.log('FCP:', metric.value)
            sendMetricToAnalytics('FCP', metric.value)
          })
        }
        if (vitals.onLCP) {
          vitals.onLCP((metric) => {
            console.log('LCP:', metric.value)
            sendMetricToAnalytics('LCP', metric.value)
          })
        }
        if (vitals.onTTFB) {
          vitals.onTTFB((metric) => {
            console.log('TTFB:', metric.value)
            sendMetricToAnalytics('TTFB', metric.value)
          })
        }
        if (vitals.onINP) {
          vitals.onINP((metric) => {
            console.log('INP:', metric.value)
            sendMetricToAnalytics('INP', metric.value)
          })
        }
      })
      .catch(() => {
        // Silently fail if web-vitals is not available
      })
  }
}

// Monitor resource loading performance
function monitorResourceLoading() {
  if (!window.performance || !window.performance.getEntriesByType) {
    return
  }

  // Check after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      const resources = window.performance.getEntriesByType('resource')

      const imageResources = resources.filter(
        (r) =>
          r.name.includes('.jpg') ||
          r.name.includes('.jpeg') ||
          r.name.includes('.png') ||
          r.name.includes('.webp') ||
          r.name.includes('.avif')
      )

      const scriptResources = resources.filter((r) => r.name.includes('.js'))
      const styleResources = resources.filter((r) => r.name.includes('.css'))

      const metrics = {
        totalImages: imageResources.length,
        totalScripts: scriptResources.length,
        totalStyles: styleResources.length,
        avgImageLoadTime: calculateAverage(imageResources.map((r) => r.duration)),
        avgScriptLoadTime: calculateAverage(scriptResources.map((r) => r.duration)),
        avgStyleLoadTime: calculateAverage(styleResources.map((r) => r.duration)),
      }

      console.log('Resource Loading Metrics:', metrics)
      sendMetricToAnalytics('ResourceMetrics', metrics)
    }, 3000)
  })
}

// Track custom performance metrics
function trackCustomMetrics() {
  // Track Time to Interactive
  if (window.performance && window.performance.timing) {
    const timing = window.performance.timing
    const tti = timing.domInteractive - timing.navigationStart
    console.log('Time to Interactive:', tti)
    sendMetricToAnalytics('TTI', tti)
  }

  // Track First Paint
  if ('PerformancePaintTiming' in window) {
    const paintEntries = performance.getEntriesByType('paint')
    paintEntries.forEach((entry) => {
      console.log(`${entry.name}: ${entry.startTime}`)
      sendMetricToAnalytics(entry.name, entry.startTime)
    })
  }

  // Track Long Tasks
  if (
    'PerformanceObserver' in window &&
    PerformanceObserver.supportedEntryTypes?.includes('longtask')
  ) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log('Long Task detected:', entry.duration)
        sendMetricToAnalytics('LongTask', entry.duration)
      }
    })
    observer.observe({ entryTypes: ['longtask'] })
  }
}

// Helper function to calculate average
function calculateAverage(values: number[]): number {
  if (values.length === 0) {
    return 0
  }
  const sum = values.reduce((a, b) => a + b, 0)
  return Math.round(sum / values.length)
}

// Send metrics to analytics (placeholder)
function sendMetricToAnalytics(name: string, value: any) {
  // In production, send to your analytics service
  if (process.env.NODE_ENV === 'production') {
    // Example: Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'performance', {
        metric_name: name,
        value: value,
        page_path: window.location.pathname,
      })
    }
  }
}

// Performance optimization recommendations
export function getPerformanceRecommendations(metrics: PerformanceMetrics): string[] {
  const recommendations: string[] = []

  if (metrics.lcp && metrics.lcp > PERFORMANCE_THRESHOLDS.LCP.good) {
    recommendations.push(
      'Optimize Largest Contentful Paint: Consider lazy loading images, optimizing image sizes, and preloading critical resources.'
    )
  }

  if (metrics.fid && metrics.fid > PERFORMANCE_THRESHOLDS.FID.good) {
    recommendations.push(
      'Reduce First Input Delay: Split large JavaScript bundles, use web workers for heavy computations.'
    )
  }

  if (metrics.cls && metrics.cls > PERFORMANCE_THRESHOLDS.CLS.good) {
    recommendations.push(
      'Fix Cumulative Layout Shift: Reserve space for dynamic content, avoid inserting content above existing content.'
    )
  }

  if (metrics.ttfb && metrics.ttfb > PERFORMANCE_THRESHOLDS.TTFB.good) {
    recommendations.push(
      'Improve Time to First Byte: Optimize server response time, use CDN, enable caching.'
    )
  }

  return recommendations
}

// Export utilities for use in components
export const PerformanceMonitor = {
  init: initPerformanceMonitoring,
  getRecommendations: getPerformanceRecommendations,
  thresholds: PERFORMANCE_THRESHOLDS,
}
