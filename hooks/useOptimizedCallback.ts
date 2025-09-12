import { useCallback, useRef, useEffect } from 'react'

/**
 * Custom hook that provides a stable callback reference while ensuring
 * the latest function is always called. This prevents unnecessary re-renders
 * in child components while maintaining access to fresh props/state.
 */
export function useOptimizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T {
  const callbackRef = useRef(callback)
  const stableCallbackRef = useRef<T | null>(null)

  // Update the callback ref when dependencies change
  useEffect(() => {
    callbackRef.current = callback
  }, deps)

  // Create stable callback only once
  if (!stableCallbackRef.current) {
    stableCallbackRef.current = ((...args) => {
      return callbackRef.current(...args)
    }) as T
  }

  return stableCallbackRef.current as T
}

/**
 * Hook for debouncing values to prevent excessive updates
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * Hook for throttling function calls
 */
export function useThrottle<T extends (...args: any[]) => any>(callback: T, delay: number): T {
  const lastRun = useRef(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastArgs = useRef<any[]>([])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return useCallback(
    ((...args) => {
      const now = Date.now()
      const timeSinceLastRun = now - lastRun.current
      lastArgs.current = args

      if (timeSinceLastRun >= delay || lastRun.current === 0) {
        lastRun.current = now
        return callback(...args)
      } else {
        // Schedule the call for later
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
          lastRun.current = Date.now()
          callback(...lastArgs.current)
        }, delay - timeSinceLastRun)
      }
    }) as T,
    [callback, delay]
  )
}

import { useState } from 'react'

/**
 * Hook for lazy loading components when they come into viewport
 */
export function useLazyLoad(
  rootMargin = '50px',
  threshold = 0.01
): [React.RefObject<HTMLDivElement | null>, boolean] {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold }
    )

    const element = elementRef.current
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [rootMargin, threshold])

  return [elementRef, isVisible]
}
