/**
 * Web Vitals Monitoring and Performance Tracking
 * Captures and reports Core Web Vitals metrics for performance optimization
 */

import { onCLS, onFCP, onINP, onLCP, onTTFB, Metric } from 'web-vitals'

// Performance thresholds based on Google's recommendations
const THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint
  INP: { good: 200, needsImprovement: 500 }, // Interaction to Next Paint (replaces FID)
  CLS: { good: 0.1, needsImprovement: 0.25 }, // Cumulative Layout Shift
  FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint
  TTFB: { good: 800, needsImprovement: 1800 }, // Time to First Byte
}

type MetricRating = 'good' | 'needs-improvement' | 'poor'

/**
 * Determine the rating for a metric based on its value
 */
function getMetricRating(metricName: string, value: number): MetricRating {
  const threshold = THRESHOLDS[metricName as keyof typeof THRESHOLDS]
  if (!threshold) {
    return 'good'
  }

  if (value <= threshold.good) {
    return 'good'
  }
  if (value <= threshold.needsImprovement) {
    return 'needs-improvement'
  }
  return 'poor'
}

/**
 * Send metrics to analytics endpoint
 */
function sendToAnalytics(metric: Metric & { rating: MetricRating }) {
  const body = {
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
    url: window.location.href,
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
    connectionType: (navigator as any).connection?.effectiveType || 'unknown',
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    const color =
      metric.rating === 'good' ? 'green' : metric.rating === 'needs-improvement' ? 'orange' : 'red'
    console.log(
      `%c[Web Vitals] ${metric.name}: ${metric.value.toFixed(2)}ms (${metric.rating})`,
      `color: ${color}; font-weight: bold;`
    )
  }

  // Send to analytics endpoint (replace with your analytics service)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      metric_rating: metric.rating,
      metric_delta: metric.delta,
      non_interaction: true,
    })
  }

  // Alternative: Send to custom endpoint
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).catch((error) => {
      console.error('Failed to send metrics:', error)
    })
  }
}

/**
 * Initialize Web Vitals monitoring
 */
export function initWebVitals() {
  // Only run on client side
  if (typeof window === 'undefined') {
    return
  }

  // Capture Core Web Vitals
  onCLS((metric) => {
    const rating = getMetricRating('CLS', metric.value)
    sendToAnalytics({ ...metric, rating })
  })

  onFCP((metric) => {
    const rating = getMetricRating('FCP', metric.value)
    sendToAnalytics({ ...metric, rating })
  })

  onINP((metric) => {
    const rating = getMetricRating('INP', metric.value)
    sendToAnalytics({ ...metric, rating })
  })

  onLCP((metric) => {
    const rating = getMetricRating('LCP', metric.value)
    sendToAnalytics({ ...metric, rating })
  })

  onTTFB((metric) => {
    const rating = getMetricRating('TTFB', metric.value)
    sendToAnalytics({ ...metric, rating })
  })
}

/**
 * Performance observer for custom metrics
 */
export function observePerformance() {
  if (typeof window === 'undefined' || !window.PerformanceObserver) {
    return
  }

  // Observe long tasks
  try {
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          console.warn(`[Performance] Long task detected: ${entry.duration.toFixed(2)}ms`)
        }
      }
    })
    longTaskObserver.observe({ entryTypes: ['longtask'] })
  } catch (e) {
    // Long task observer not supported
  }

  // Observe resource timing
  try {
    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const resourceEntry = entry as PerformanceResourceTiming
        if (resourceEntry.duration > 1000) {
          console.warn(
            `[Performance] Slow resource: ${resourceEntry.name} (${resourceEntry.duration.toFixed(2)}ms)`
          )
        }
      }
    })
    resourceObserver.observe({ entryTypes: ['resource'] })
  } catch (e) {
    // Resource timing observer not supported
  }
}

/**
 * Get performance summary for current page
 */
export function getPerformanceSummary() {
  if (typeof window === 'undefined' || !window.performance) {
    return null
  }

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
  const paint = performance.getEntriesByType('paint')

  return {
    // Navigation timing
    dns: navigation.domainLookupEnd - navigation.domainLookupStart,
    tcp: navigation.connectEnd - navigation.connectStart,
    ttfb: navigation.responseStart - navigation.requestStart,
    download: navigation.responseEnd - navigation.responseStart,
    domInteractive: navigation.domInteractive - navigation.fetchStart,
    domComplete: navigation.domComplete - navigation.fetchStart,
    loadComplete: navigation.loadEventEnd - navigation.fetchStart,

    // Paint timing
    firstPaint: paint.find((p) => p.name === 'first-paint')?.startTime || 0,
    firstContentfulPaint: paint.find((p) => p.name === 'first-contentful-paint')?.startTime || 0,

    // Resource counts
    resources: performance.getEntriesByType('resource').length,

    // Memory usage (if available)
    memory: (performance as any).memory
      ? {
          used: (performance as any).memory.usedJSHeapSize / 1048576, // Convert to MB
          total: (performance as any).memory.totalJSHeapSize / 1048576,
        }
      : null,
  }
}

/**
 * Performance budget monitoring
 */
export const PERFORMANCE_BUDGETS = {
  // Time-based budgets (ms)
  LCP: 2500,
  INP: 200, // Interaction to Next Paint (replaces FID)
  CLS: 0.1,
  TTFB: 800,

  // Size-based budgets (KB)
  jsBundle: 200,
  cssBundle: 50,
  images: 500,
  fonts: 100,
  total: 1000,
}

/**
 * Check if current page meets performance budgets
 */
export function checkPerformanceBudgets() {
  const violations: string[] = []

  if (typeof window === 'undefined' || !window.performance) {
    return violations
  }

  // Check resource sizes
  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
  let totalSize = 0
  let jsSize = 0
  let cssSize = 0
  let imageSize = 0
  let fontSize = 0

  resources.forEach((resource) => {
    const size = resource.encodedBodySize / 1024 // Convert to KB
    totalSize += size

    if (resource.name.includes('.js')) {
      jsSize += size
    } else if (resource.name.includes('.css')) {
      cssSize += size
    } else if (/\.(jpg|jpeg|png|gif|webp|svg)/.test(resource.name)) {
      imageSize += size
    } else if (/\.(woff|woff2|ttf|otf)/.test(resource.name)) {
      fontSize += size
    }
  })

  // Check against budgets
  if (jsSize > PERFORMANCE_BUDGETS.jsBundle) {
    violations.push(
      `JS bundle size (${jsSize.toFixed(2)}KB) exceeds budget (${PERFORMANCE_BUDGETS.jsBundle}KB)`
    )
  }
  if (cssSize > PERFORMANCE_BUDGETS.cssBundle) {
    violations.push(
      `CSS bundle size (${cssSize.toFixed(2)}KB) exceeds budget (${PERFORMANCE_BUDGETS.cssBundle}KB)`
    )
  }
  if (imageSize > PERFORMANCE_BUDGETS.images) {
    violations.push(
      `Image size (${imageSize.toFixed(2)}KB) exceeds budget (${PERFORMANCE_BUDGETS.images}KB)`
    )
  }
  if (fontSize > PERFORMANCE_BUDGETS.fonts) {
    violations.push(
      `Font size (${fontSize.toFixed(2)}KB) exceeds budget (${PERFORMANCE_BUDGETS.fonts}KB)`
    )
  }
  if (totalSize > PERFORMANCE_BUDGETS.total) {
    violations.push(
      `Total size (${totalSize.toFixed(2)}KB) exceeds budget (${PERFORMANCE_BUDGETS.total}KB)`
    )
  }

  return violations
}

// Export types for external use
export type { Metric, MetricRating }
