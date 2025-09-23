/**
 * Web Vitals Performance Monitoring
 * Tracks Core Web Vitals and reports performance metrics
 */

import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals'

export interface WebVitalsMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  id: string
  entries: any[]
}

// Thresholds for Core Web Vitals
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
  FID: { good: 100, poor: 300 }, // First Input Delay
  CLS: { good: 0.1, poor: 0.25 }, // Cumulative Layout Shift
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
  TTFB: { good: 800, poor: 1800 }, // Time to First Byte
  INP: { good: 200, poor: 500 }, // Interaction to Next Paint
}

// Rate a metric value
function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS]
  if (!threshold) {
    return 'good'
  }

  if (value <= threshold.good) {
    return 'good'
  }
  if (value > threshold.poor) {
    return 'poor'
  }
  return 'needs-improvement'
}

// Send analytics data to your analytics provider
function sendToAnalytics(metric: WebVitalsMetric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    const emoji = metric.rating === 'good' ? '✅' : metric.rating === 'poor' ? '❌' : '⚠️'
    console.log(`${emoji} ${metric.name}: ${metric.value.toFixed(2)}ms (${metric.rating})`)
  }

  // Send to Google Analytics if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', metric.name, {
      value: Math.round(metric.value),
      metric_rating: metric.rating,
      metric_delta: Math.round(metric.delta),
      event_category: 'Web Vitals',
      non_interaction: true,
    })
  }

  // Send to custom analytics endpoint
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        metric: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      }),
    }).catch(console.error)
  }
}

// Initialize Web Vitals tracking
export function initWebVitals() {
  // Core Web Vitals
  onLCP((metric) => {
    const vitalsMetric = {
      ...metric,
      rating: getRating('LCP', metric.value),
    }
    sendToAnalytics(vitalsMetric)
  })

  // FID is deprecated in favor of INP (Interaction to Next Paint)
  // INP measurement is already included below

  onCLS((metric) => {
    const vitalsMetric = {
      ...metric,
      rating: getRating('CLS', metric.value),
    }
    sendToAnalytics(vitalsMetric)
  })

  // Additional metrics
  onFCP((metric) => {
    const vitalsMetric = {
      ...metric,
      rating: getRating('FCP', metric.value),
    }
    sendToAnalytics(vitalsMetric)
  })

  onTTFB((metric) => {
    const vitalsMetric = {
      ...metric,
      rating: getRating('TTFB', metric.value),
    }
    sendToAnalytics(vitalsMetric)
  })

  onINP((metric) => {
    const vitalsMetric = {
      ...metric,
      rating: getRating('INP', metric.value),
    }
    sendToAnalytics(vitalsMetric)
  })
}

// Performance marks for custom measurements
export function markPerformance(name: string) {
  if (typeof window !== 'undefined' && window.performance) {
    performance.mark(name)
  }
}

// Measure between two marks
export function measurePerformance(name: string, startMark: string, endMark: string) {
  if (typeof window !== 'undefined' && window.performance) {
    try {
      performance.measure(name, startMark, endMark)
      const measure = performance.getEntriesByName(name)[0]
      if (measure) {
        console.log(`⏱ ${name}: ${measure.duration.toFixed(2)}ms`)
        return measure.duration
      }
    } catch (error) {
      console.error('Performance measurement error:', error)
    }
  }
  return null
}

// Get current performance metrics
export function getPerformanceMetrics() {
  if (typeof window === 'undefined' || !window.performance) {
    return null
  }

  const navigation = performance.getEntriesByType('navigation')[0] as any
  const paint = performance.getEntriesByType('paint')

  return {
    // Navigation timing
    domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart,
    loadComplete: navigation?.loadEventEnd - navigation?.loadEventStart,
    domInteractive: navigation?.domInteractive,

    // Paint timing
    firstPaint: paint.find((p) => p.name === 'first-paint')?.startTime,
    firstContentfulPaint: paint.find((p) => p.name === 'first-contentful-paint')?.startTime,

    // Resource timing
    resources: performance.getEntriesByType('resource').length,

    // Memory (if available)
    memory: (performance as any).memory
      ? {
          usedJSHeapSize: Math.round((performance as any).memory.usedJSHeapSize / 1048576),
          totalJSHeapSize: Math.round((performance as any).memory.totalJSHeapSize / 1048576),
          limit: Math.round((performance as any).memory.jsHeapSizeLimit / 1048576),
        }
      : null,
  }
}

// Optimize long tasks detection
export function detectLongTasks(callback: (duration: number) => void) {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return
  }

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Long task is > 50ms
        if (entry.duration > 50) {
          callback(entry.duration)
        }
      }
    })

    observer.observe({ entryTypes: ['longtask'] })

    return observer
  } catch (error) {
    console.error('Long task detection not supported:', error)
  }
}
