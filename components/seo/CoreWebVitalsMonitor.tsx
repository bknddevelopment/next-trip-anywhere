'use client'

import { useEffect } from 'react'

/**
 * Core Web Vitals Monitoring Component
 * Tracks INP, LCP, and CLS metrics in production
 */
export default function CoreWebVitalsMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return

    // Dynamically import web-vitals to reduce bundle size
    import('web-vitals').then(({ onINP, onLCP, onCLS, onFCP, onTTFB }) => {
      // Track Interaction to Next Paint (INP)
      onINP((metric) => {
        console.log('INP:', metric.value)
        // Send to analytics
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            name: 'INP',
            value: Math.round(metric.value),
            event_category: 'Web Vitals',
            event_label: metric.id,
          })
        }
      })

      // Track Largest Contentful Paint (LCP)
      onLCP((metric) => {
        console.log('LCP:', metric.value)
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            name: 'LCP',
            value: Math.round(metric.value),
            event_category: 'Web Vitals',
            event_label: metric.id,
          })
        }
      })

      // Track Cumulative Layout Shift (CLS)
      onCLS((metric) => {
        console.log('CLS:', metric.value)
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            name: 'CLS',
            value: Math.round(metric.value * 1000), // Convert to milliseconds
            event_category: 'Web Vitals',
            event_label: metric.id,
          })
        }
      })

      // Track First Contentful Paint (FCP)
      onFCP((metric) => {
        console.log('FCP:', metric.value)
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            name: 'FCP',
            value: Math.round(metric.value),
            event_category: 'Web Vitals',
            event_label: metric.id,
          })
        }
      })

      // Track Time to First Byte (TTFB)
      onTTFB((metric) => {
        console.log('TTFB:', metric.value)
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            name: 'TTFB',
            value: Math.round(metric.value),
            event_category: 'Web Vitals',
            event_label: metric.id,
          })
        }
      })
    })
  }, [])

  return null // This component doesn't render anything
}

// Performance optimization recommendations based on metrics
export const performanceOptimizations = {
  INP: {
    target: 200, // milliseconds
    tips: [
      'Use React.memo() for expensive components',
      'Debounce user input handlers',
      'Use virtualization for long lists',
      'Minimize main thread work',
      'Use Web Workers for heavy computations',
    ],
  },
  LCP: {
    target: 2500, // milliseconds
    tips: [
      'Optimize and compress images',
      'Use next/image with priority for hero images',
      'Preload critical resources',
      'Minimize render-blocking CSS',
      'Use static generation for pages',
    ],
  },
  CLS: {
    target: 0.1, // score
    tips: [
      'Set explicit dimensions for images and videos',
      'Reserve space for dynamic content',
      'Avoid inserting content above existing content',
      'Use CSS aspect-ratio',
      'Load fonts with font-display: optional',
    ],
  },
}