/**
 * Optimized Image Component
 * Implements lazy loading, responsive images, and LQIP (Low Quality Image Placeholder)
 */

'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  sizes?: string
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  onLoad?: () => void
}

// Generate blur data URL for placeholder
const generateBlurDataURL = (width: number = 10, height: number = 10): string => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  if (ctx) {
    // Create gradient placeholder
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, '#f0f0f0')
    gradient.addColorStop(1, '#e0e0e0')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
  }

  return canvas.toDataURL('image/jpeg', 0.1)
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width = 800,
  height = 600,
  priority = false,
  className = '',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  quality = 85,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
}) => {
  const [isInView, setIsInView] = useState(priority)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [error, setError] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  // Use Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.01,
      }
    )

    observer.observe(imgRef.current)

    return () => {
      observer.disconnect()
    }
  }, [priority])

  // Generate placeholder if not provided
  const placeholderDataURL =
    blurDataURL || (typeof window !== 'undefined' ? generateBlurDataURL() : undefined)

  const handleLoad = () => {
    setHasLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setError(true)
  }

  // Fallback for error state
  if (error) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-400 text-sm">Image failed to load</span>
      </div>
    )
  }

  return (
    <div
      ref={imgRef}
      className={`relative ${className}`}
      style={{
        aspectRatio: `${width}/${height}`,
        maxWidth: '100%',
        height: 'auto',
      }}
    >
      {isInView ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          quality={quality}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={placeholderDataURL}
          onLoad={handleLoad}
          onError={handleError}
          className={`
            transition-opacity duration-300
            ${hasLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
          }}
        />
      ) : (
        // Skeleton loader
        <div
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"
          style={{
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s ease-in-out infinite',
          }}
        />
      )}
    </div>
  )
}

// Export with React.memo for performance
export default React.memo(OptimizedImage)
