'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image, { ImageProps } from 'next/image'

interface PerformantImageProps extends Omit<ImageProps, 'src' | 'loading'> {
  src: string
  fallbackSrc?: string
  priority?: boolean
  preload?: boolean
  aspectRatio?: number
  blur?: boolean
}

// Debug logging for development
const debugLog = (_message: string, _data?: any) => {
  // Logging disabled to pass ESLint
}

/**
 * High-performance image component with:
 * - Lazy loading with intersection observer
 * - WebP/AVIF format support
 * - Blur placeholder
 * - Aspect ratio preservation
 * - Progressive enhancement
 */
export default function PerformantImage({ 
  src, 
  alt, 
  priority = false,
  preload = false,
  aspectRatio,
  blur = true,
  fallbackSrc,
  className = '',
  ...props 
}: PerformantImageProps) {
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)
  const imgRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const retryCountRef = useRef(0)
  const maxRetries = 2

  // Handle mounting to avoid SSR issues
  useEffect(() => {
    setIsMounted(true)
    debugLog('Component mounted', { src, priority })
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [])

  // Reset state when src changes
  useEffect(() => {
    if (src !== currentSrc) {
      setCurrentSrc(src)
      setHasError(false)
      setIsLoaded(false)
      retryCountRef.current = 0
      debugLog('Source changed', { from: currentSrc, to: src })
    }
  }, [src, currentSrc])

  // Use Intersection Observer for lazy loading
  useEffect(() => {
    if (!isMounted || priority || isInView) {
      if (priority) {
        setIsInView(true)
      }
      return
    }

    if (!imgRef.current) {
      return
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          debugLog('Image entering viewport', { src: currentSrc })
          setIsInView(true)
          if (observerRef.current) {
            observerRef.current.disconnect()
            observerRef.current = null
          }
        }
      },
      {
        rootMargin: '100px', // Start loading 100px before entering viewport
        threshold: 0.01
      }
    )

    observerRef.current.observe(imgRef.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [isMounted, priority, isInView, currentSrc])

  // Preload critical images
  useEffect(() => {
    if (preload && isMounted && typeof window !== 'undefined') {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = currentSrc
      link.type = 'image/jpeg' // Assuming JPEG, adjust as needed
      document.head.appendChild(link)
      
      debugLog('Preloading image', { src: currentSrc })
      
      return () => {
        // Clean up preload link if component unmounts
        if (document.head.contains(link)) {
          document.head.removeChild(link)
        }
      }
    }
  }, [preload, currentSrc, isMounted])

  const shimmer = (w: number, h: number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f6f7f8" offset="20%" />
          <stop stop-color="#edeef1" offset="50%" />
          <stop stop-color="#f6f7f8" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#f6f7f8" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str)

  const blurDataURL = `data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`

  // Handle errors with retry logic
  const handleImageError = useCallback(() => {
    debugLog('Image load error', { src: currentSrc, retry: retryCountRef.current })
    
    if (retryCountRef.current < maxRetries) {
      retryCountRef.current++
      // Force reload by adding timestamp
      const newSrc = currentSrc.includes('?') 
        ? `${currentSrc}&retry=${Date.now()}`
        : `${currentSrc}?retry=${Date.now()}`
      setCurrentSrc(newSrc)
    } else if (fallbackSrc && currentSrc !== fallbackSrc) {
      debugLog('Using fallback image', { fallback: fallbackSrc })
      setCurrentSrc(fallbackSrc)
      retryCountRef.current = 0 // Reset for fallback
    } else {
      setHasError(true)
    }
  }, [currentSrc, fallbackSrc])

  const handleImageLoad = useCallback(() => {
    debugLog('Image loaded successfully', { src: currentSrc })
    setIsLoaded(true)
    setHasError(false)
  }, [currentSrc])

  // Handle final error state
  if (hasError && !fallbackSrc) {
    return (
      <div 
        className={`${className} bg-gray-200 flex items-center justify-center`}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        <span className="text-gray-400 text-sm">Image unavailable</span>
      </div>
    )
  }

  const containerClassName = `relative ${className} ${!isLoaded && blur ? 'animate-pulse bg-gray-200' : ''}`

  // SSR-safe rendering
  if (!isMounted) {
    return (
      <div 
        ref={imgRef}
        className={`relative ${className}`}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        <div className="w-full h-full bg-gray-200 animate-pulse" />
      </div>
    )
  }

  return (
    <div 
      ref={imgRef} 
      className={containerClassName}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {isInView ? (
        <Image
          {...props}
          src={currentSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          placeholder={blur && !hasError ? 'blur' : 'empty'}
          blurDataURL={blur && !hasError ? blurDataURL : undefined}
          quality={props.quality || 75}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          unoptimized={hasError} // Disable optimization on error to help with reload
        />
      ) : (
        <div 
          className="w-full h-full bg-gray-200 animate-pulse"
          style={aspectRatio ? { aspectRatio } : { minHeight: '200px' }}
        />
      )}
    </div>
  )
}