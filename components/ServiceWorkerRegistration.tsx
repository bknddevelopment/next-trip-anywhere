'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      let intervalId: NodeJS.Timeout

      // Register service worker
      const registerServiceWorker = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js')

          // Check for updates periodically
          intervalId = setInterval(() => {
            registration.update()
          }, 60000) // Check every minute
        } catch (error) {
          // Silently fail in production, log in development
          if (process.env.NODE_ENV === 'development') {
            console.error('Service Worker registration failed:', error)
          }
        }
      }

      window.addEventListener('load', registerServiceWorker)

      // Cleanup function
      return () => {
        window.removeEventListener('load', registerServiceWorker)
        if (intervalId) {
          clearInterval(intervalId)
        }
      }
    }
    // Return undefined when service worker is not supported
    return undefined
  }, [])

  return null
}
