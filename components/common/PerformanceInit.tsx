'use client'

import { useEffect } from 'react'
import { initPerformanceMonitoring } from '@/lib/performance'

export default function PerformanceInit() {
  useEffect(() => {
    // Initialize performance monitoring
    const monitor = initPerformanceMonitoring()

    // Log metrics in development
    if (process.env.NODE_ENV === 'development') {
      // Check metrics after page load
      if (document.readyState === 'complete') {
        setTimeout(() => {
          const metrics = monitor?.getMetrics()
          if (metrics) {
            console.info('📊 Initial Performance Metrics:', metrics)
          }
        }, 1000)
      } else {
        window.addEventListener('load', () => {
          setTimeout(() => {
            const metrics = monitor?.getMetrics()
            if (metrics) {
              console.info('📊 Initial Performance Metrics:', metrics)
            }
          }, 1000)
        })
      }
    }

    return () => {
      monitor?.destroy()
    }
  }, [])

  return null
}