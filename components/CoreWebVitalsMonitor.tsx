'use client'

import { useEffect } from 'react'
import { onCLS, onFCP, onINP, onLCP, onTTFB, Metric } from 'web-vitals'

/**
 * Core Web Vitals monitoring component
 * Tracks and reports performance metrics
 */
export default function CoreWebVitalsMonitor() {
  useEffect(() => {
    const logMetric = (metric: Metric) => {
      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        const color = metric.rating === 'good' ? 'green' : metric.rating === 'needs-improvement' ? 'orange' : 'red'
        console.warn(
          `[Web Vitals] ${metric.name}: ${metric.value.toFixed(2)}ms (${metric.rating})`,
          `color: ${color}; font-weight: bold;`
        )
      }

      // Send to analytics in production
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', metric.name, {
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          metric_rating: metric.rating,
          metric_id: metric.id,
          metric_navigation_type: metric.navigationType,
        })
      }

      // Send to custom analytics endpoint
      if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
        fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            metric: metric.name,
            value: metric.value,
            rating: metric.rating,
            id: metric.id,
            navigationType: metric.navigationType,
            timestamp: Date.now(),
            url: window.location.href,
          }),
        }).catch(() => {
          // Silently fail - don't impact user experience
        })
      }
    }

    // Observe all Core Web Vitals
    onCLS(logMetric)  // Cumulative Layout Shift
    onFCP(logMetric)  // First Contentful Paint
    onINP(logMetric)  // Interaction to Next Paint (replaces FID)
    onLCP(logMetric)  // Largest Contentful Paint
    onTTFB(logMetric) // Time to First Byte

    // Additional performance observations
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Observe long tasks (blocking main thread)
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
              console.warn('[Performance] Long task detected:', {
                duration: entry.duration,
                startTime: entry.startTime,
                name: entry.name,
              })
            }
          }
        })
        longTaskObserver.observe({ entryTypes: ['longtask'] })
      } catch {
        // Long task observer not supported
      }

      // Observe resource timing
      try {
        const resourceObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'resource' && entry.duration > 1000) {
              console.warn('[Performance] Slow resource:', {
                name: entry.name,
                duration: entry.duration,
                transferSize: (entry as PerformanceResourceTiming).transferSize,
              })
            }
          }
        })
        resourceObserver.observe({ entryTypes: ['resource'] })
      } catch {
        // Resource timing observer not supported
      }
    }

    // Monitor memory usage (Chrome only)
    interface PerformanceMemory {
      usedJSHeapSize: number
      jsHeapSizeLimit: number
    }
    
    if (typeof window !== 'undefined' && 'memory' in window.performance) {
      setInterval(() => {
        const memory = (window.performance as unknown as { memory: PerformanceMemory }).memory
        const usedMemoryMB = Math.round(memory.usedJSHeapSize / 1048576)
        const totalMemoryMB = Math.round(memory.jsHeapSizeLimit / 1048576)
        
        if (usedMemoryMB > totalMemoryMB * 0.9) {
          console.warn('[Performance] High memory usage:', {
            used: `${usedMemoryMB}MB`,
            total: `${totalMemoryMB}MB`,
            percentage: `${Math.round(usedMemoryMB / totalMemoryMB * 100)}%`
          })
        }
      }, 30000) // Check every 30 seconds
    }
  }, [])

  return null
}

// Type declarations are in ErrorBoundary.tsx