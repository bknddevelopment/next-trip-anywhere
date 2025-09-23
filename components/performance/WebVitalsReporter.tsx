/**
 * Web Vitals Reporter Component
 * Initializes performance monitoring and reporting
 */

'use client'

import { useEffect } from 'react'
import { initWebVitals, detectLongTasks } from '@/lib/performance/web-vitals'

export default function WebVitalsReporter() {
  useEffect(() => {
    // Initialize Web Vitals tracking
    initWebVitals()

    // Detect long tasks that block the main thread
    const observer = detectLongTasks((duration) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`⚠️ Long task detected: ${duration.toFixed(2)}ms`)
      }
    })

    // Cleanup
    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [])

  return null // This component doesn't render anything
}
