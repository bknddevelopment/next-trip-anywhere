// Sentry integration stub - install @sentry/nextjs to enable error tracking
// import * as Sentry from '@sentry/nextjs'

// This file provides stub implementations for Sentry functions
// When ready to enable error tracking, install @sentry/nextjs and uncomment the import

/**
 * Initialize Sentry for error tracking and performance monitoring
 */
export function initSentry() {
  const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN

  if (!SENTRY_DSN) {
    console.log('Sentry DSN not configured, skipping initialization')
    return
  }

  // Sentry initialization will be enabled when @sentry/nextjs is installed
  console.log('Sentry stub initialized - install @sentry/nextjs to enable error tracking')
}

/**
 * Capture custom errors with context
 */
export function captureError(error: Error, context?: Record<string, unknown>) {
  // Stub: Will capture errors when Sentry is installed
  console.error('Error captured (Sentry stub):', error, context)
}

/**
 * Track custom events
 */
export function trackEvent(name: string, data?: Record<string, unknown>) {
  // Stub: Will track events when Sentry is installed
  if (process.env.NODE_ENV === 'development') {
    console.debug('Event tracked (Sentry stub):', name, data)
  }
}

/**
 * Set user context for error tracking
 */
export function setUserContext(user: { id: string; email?: string; username?: string }) {
  // Stub: Will set user context when Sentry is installed
  if (process.env.NODE_ENV === 'development') {
    console.debug('User context set (Sentry stub):', user)
  }
}

/**
 * Clear user context on logout
 */
export function clearUserContext() {
  // Stub: Will clear user context when Sentry is installed
  if (process.env.NODE_ENV === 'development') {
    console.debug('User context cleared (Sentry stub)')
  }
}

/**
 * Performance monitoring transaction
 */
export function startTransaction(name: string, op: string = 'navigation') {
  // Stub: Will start transaction when Sentry is installed
  return {
    finish: () => {
      if (process.env.NODE_ENV === 'development') {
        console.debug('Transaction finished (Sentry stub):', name, op)
      }
    },
  }
}

/**
 * Add performance marks
 */
export function addPerformanceMark(name: string, data?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.performance) {
    performance.mark(name)

    if (process.env.NODE_ENV === 'development') {
      console.debug('Performance mark added (Sentry stub):', name, data)
    }
  }
}
