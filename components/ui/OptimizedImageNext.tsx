'use client'

import { useState, useEffect, useRef } from 'react'
import Image, { ImageProps } from 'next/image'
import { normalizePath } from '@/lib/basePath'

interface OptimizedImageNextProps extends Omit<ImageProps, 'src' | 'loading'> {
  src: string
  fallbackSrc?: string
  loading?: 'lazy' | 'eager'
  priority?: boolean
  quality?: number
  sizes?: string
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  fadeIn?: boolean
  aspectRatio?: number
  objectPosition?: string
  onLoadingComplete?: () => void
  className?: string
}

/**
 * Enhanced optimized image component with WebP/AVIF support and lazy loading
 * Implements Core Web Vitals best practices for LCP and CLS optimization
 */
export default function OptimizedImageNext({
  src,
  alt,
  fallbackSrc,
  loading = 'lazy',
  priority = false,
  quality = 85,
  sizes,
  placeholder = 'empty',
  blurDataURL,
  fadeIn = true,
  aspectRatio,
  objectPosition = 'center',
  onLoadingComplete,
  className = '',
  style,
  ...props
}: OptimizedImageNextProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [useFallback, setUseFallback] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)
  const imgRef = useRef<HTMLDivElement>(null)

  // Handle runtime base path
  useEffect(() => {
    if (typeof window !== 'undefined' && !src.startsWith('http')) {
      const runtimePath = normalizePath(src, true)
      if (runtimePath !== src) {
        setImageSrc(runtimePath)
      }
    }
  }, [src])

  // Implement Intersection Observer for truly lazy loading
  useEffect(() => {
    if (priority || loading === 'eager') {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        // Start loading when image is 50px away from viewport
        rootMargin: '50px',
        threshold: 0.01,
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [priority, loading])

  // Generate responsive sizes if not provided
  const responsiveSizes = sizes || generateResponsiveSizes(props.fill)

  // Add aspect ratio container for CLS prevention
  const containerStyle = aspectRatio && !props.fill
    ? {
        position: 'relative' as const,
        paddingBottom: `${(1 / aspectRatio) * 100}%`,
        overflow: 'hidden',
      }
    : {}

  // Fallback to regular img tag if Next/Image fails
  if (useFallback) {
    const fallbackImageSrc = fallbackSrc || (typeof window !== 'undefined' ? normalizePath(src, true) : src)
    
    return (
      <div 
        ref={imgRef}
        className={`image-container ${className}`}
        style={{ ...containerStyle, ...style }}
      >
        <picture>
          {/* WebP version */}
          <source
            srcSet={generateSrcSet(fallbackImageSrc, 'webp')}
            type="image/webp"
          />
          {/* AVIF version (better compression but less support) */}
          <source
            srcSet={generateSrcSet(fallbackImageSrc, 'avif')}
            type="image/avif"
          />
          {/* Fallback to original format */}
          <img
            src={fallbackImageSrc}
            alt={alt}
            loading={loading}
            decoding="async"
            style={{
              ...(props.fill
                ? {
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    objectFit: className?.includes('object-contain') ? 'contain' : 'cover',
                    objectPosition,
                  }
                : {}),
              ...(fadeIn ? {
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
              } : {}),
            }}
            onLoad={() => {
              setIsLoaded(true)
              onLoadingComplete?.()
            }}
          />
        </picture>
      </div>
    )
  }

  // Show placeholder while not in view
  if (!isInView && !priority) {
    return (
      <div 
        ref={imgRef}
        className={`image-placeholder ${className}`}
        style={{
          ...containerStyle,
          ...style,
          backgroundColor: '#f3f4f6',
          minHeight: props.height || 200,
        }}
        aria-label={`Loading ${alt}`}
      />
    )
  }

  return (
    <div 
      ref={imgRef}
      className={`image-wrapper ${className}`}
      style={{ ...containerStyle, ...style }}
    >
      <Image
        {...props}
        src={imageSrc}
        alt={alt}
        quality={quality}
        priority={priority}
        loading={priority ? 'eager' : loading}
        sizes={responsiveSizes}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        className={`${fadeIn ? 'transition-opacity duration-300' : ''} ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        onLoadingComplete={(result) => {
          setIsLoaded(true)
          onLoadingComplete?.()
          
          // Track Core Web Vitals for important images
          if (priority && typeof window !== 'undefined' && 'performance' in window) {
            performance.mark('image-loaded')
          }
        }}
        onError={() => {
          console.warn(`Image failed to load: ${imageSrc}, falling back to picture element`)
          setUseFallback(true)
        }}
      />
    </div>
  )
}

/**
 * Generate responsive sizes string for optimal loading
 */
function generateResponsiveSizes(isFill?: boolean): string {
  if (isFill) {
    return '100vw'
  }
  
  return [
    '(max-width: 640px) 100vw',
    '(max-width: 768px) 90vw',
    '(max-width: 1024px) 80vw',
    '(max-width: 1280px) 70vw',
    '60vw',
  ].join(', ')
}

/**
 * Generate srcSet for different image formats
 */
function generateSrcSet(src: string, format: 'webp' | 'avif'): string {
  // This is a simplified version - in production, you'd have actual converted images
  const widths = [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
  
  return widths
    .map(w => {
      // In production, these would be actual URLs to resized/converted images
      const url = src.replace(/\.[^.]+$/, `-${w}.${format}`)
      return `${url} ${w}w`
    })
    .join(', ')
}

/**
 * Preload critical images for LCP optimization
 */
export function preloadImage(src: string, sizes?: string) {
  if (typeof window === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = src
  
  if (sizes) {
    link.setAttribute('imagesizes', sizes)
    link.setAttribute('imagesrcset', generateSrcSet(src, 'webp'))
  }
  
  document.head.appendChild(link)
}