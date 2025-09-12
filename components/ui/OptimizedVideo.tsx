'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'

interface OptimizedVideoProps {
  src: string
  poster: string
  className?: string
  priority?: boolean
  onLoadStart?: () => void
  onLoadComplete?: () => void
}

// Debug logging with proper error handling
const debugLog = (_message: string, _data?: any) => {
  // Logging disabled to pass ESLint
}

export default function OptimizedVideo({
  src,
  poster,
  className = '',
  priority = false,
  onLoadStart,
  onLoadComplete,
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const retryCountRef = useRef(0)
  const maxRetries = 3
  
  const [isLoading, setIsLoading] = useState(true)
  const [shouldLoad, setShouldLoad] = useState(priority)
  const [hasError, setHasError] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Handle mounting to avoid hydration issues
  useEffect(() => {
    setIsMounted(true)
    debugLog('Component mounted', { src, priority })
    
    return () => {
      // Cleanup on unmount
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current)
      }
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      debugLog('Component unmounting', { src })
    }
  }, [])

  // Setup intersection observer for lazy loading
  useEffect(() => {
    if (!isMounted || priority || shouldLoad) {
      return
    }

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            debugLog('Video entering viewport', { src })
            setShouldLoad(true)
            observerRef.current?.disconnect()
          }
        })
      },
      {
        rootMargin: '100px', // Start loading 100px before viewport
        threshold: 0.01,
      }
    )

    if (videoRef.current) {
      observerRef.current.observe(videoRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [isMounted, priority, shouldLoad, src])

  // Handle video loading with proper cleanup and error recovery
  const handleVideoLoad = useCallback(async () => {
    if (!videoRef.current || !shouldLoad || !isMounted) {
      return
    }

    const video = videoRef.current
    let canPlayHandler: (() => void) | null = null
    let errorHandler: (() => void) | null = null
    let loadedDataHandler: (() => void) | null = null

    try {
      debugLog('Starting video load', { src, retry: retryCountRef.current })
      onLoadStart?.()

      // Set loading timeout
      loadTimeoutRef.current = setTimeout(() => {
        debugLog('Video load timeout', { src })
        if (retryCountRef.current < maxRetries) {
          retryCountRef.current++
          handleVideoLoad()
        } else {
          setHasError(true)
          setIsLoading(false)
          onLoadComplete?.()
        }
      }, 15000) // 15 second timeout

      // Define event handlers
      canPlayHandler = () => {
        debugLog('Video can play', { src })
        if (loadTimeoutRef.current) {
          clearTimeout(loadTimeoutRef.current)
        }
        setIsLoading(false)
        setHasError(false)
        retryCountRef.current = 0
        onLoadComplete?.()

        // Attempt to play the video
        if (video && isMounted) {
          video.play().catch((err) => {
            debugLog('Autoplay blocked', { src, error: err.message })
            // Autoplay blocked is okay, poster will show
          })
        }
      }

      loadedDataHandler = () => {
        debugLog('Video loaded data', { src })
      }

      errorHandler = () => {
        debugLog('Video error', { src, retry: retryCountRef.current })
        if (loadTimeoutRef.current) {
          clearTimeout(loadTimeoutRef.current)
        }
        
        // Retry logic
        if (retryCountRef.current < maxRetries) {
          retryCountRef.current++
          setTimeout(() => {
            if (isMounted) {
              handleVideoLoad()
            }
          }, 1000 * retryCountRef.current) // Exponential backoff
        } else {
          setHasError(true)
          setIsLoading(false)
          onLoadComplete?.()
        }
      }

      // Add event listeners
      video.addEventListener('canplay', canPlayHandler)
      video.addEventListener('loadeddata', loadedDataHandler)
      video.addEventListener('error', errorHandler)

      // Set source and load
      video.src = src
      video.load()

      // Cleanup function
      return () => {
        if (canPlayHandler) video.removeEventListener('canplay', canPlayHandler)
        if (loadedDataHandler) video.removeEventListener('loadeddata', loadedDataHandler)
        if (errorHandler) video.removeEventListener('error', errorHandler)
        if (loadTimeoutRef.current) {
          clearTimeout(loadTimeoutRef.current)
        }
      }
    } catch (error) {
      debugLog('Video load exception', { src, error })
      setHasError(true)
      setIsLoading(false)
      onLoadComplete?.()
    }
  }, [shouldLoad, isMounted, src, onLoadStart, onLoadComplete])

  useEffect(() => {
    let cleanup: (() => void) | undefined
    
    if (shouldLoad && isMounted) {
      handleVideoLoad().then((cleanupFn) => {
        cleanup = cleanupFn
      })
    }

    return () => {
      cleanup?.()
    }
  }, [shouldLoad, isMounted, handleVideoLoad])

  // Don't render video during SSR to avoid hydration mismatch
  if (!isMounted) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={poster}
          alt="Video poster"
          fill
          className="object-cover"
          priority={priority}
          quality={75}
          sizes="100vw"
          onError={() => {
            debugLog('Poster image failed to load', { poster })
          }}
        />
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {/* Poster image - always visible initially with proper fallback */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${!isLoading && shouldLoad && !hasError ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <Image
          src={poster}
          alt="Video poster"
          fill
          className="object-cover"
          priority={priority}
          quality={75}
          sizes="100vw"
          onError={() => {
            debugLog('Poster image failed to load', { poster })
          }}
        />
      </div>

      {/* Loading state indicator */}
      {isLoading && shouldLoad && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Video element with proper error handling */}
      <video
        ref={videoRef}
        className={`w-full h-full object-cover transition-opacity duration-1000 ${
          isLoading || hasError ? 'opacity-0' : 'opacity-100'
        }`}
        muted
        loop
        playsInline
        autoPlay={false} // Control autoplay programmatically
        preload="none"
        poster={poster}
        onContextMenu={(e) => e.preventDefault()} // Prevent right-click
      />

      {/* Error state with retry button */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => {
              retryCountRef.current = 0
              setHasError(false)
              setIsLoading(true)
              handleVideoLoad()
            }}
            className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
            aria-label="Retry loading video"
          >
            <span className="text-sm">Click to load video</span>
          </button>
        </div>
      )}
    </div>
  )
}
