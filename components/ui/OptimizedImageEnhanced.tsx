/**
 * Enhanced Optimized Image Component
 * Implements advanced image optimization strategies for 500+ page site
 */

'use client'

import { useState, useEffect, useRef, CSSProperties } from 'react'
import Image, { ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

interface OptimizedImageProps extends Omit<ImageProps, 'placeholder'> {
  src: string
  alt: string
  priority?: boolean
  lazy?: boolean
  blur?: boolean
  fallbackSrc?: string
  aspectRatio?: number
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  fadeIn?: boolean
  responsive?: boolean
  sizes?: string
  quality?: number
  placeholder?: 'blur' | 'empty' | 'shimmer' | 'skeleton'
  blurDataURL?: string
  onLoadComplete?: () => void
  onError?: () => void
}

// Shimmer effect for loading state
const shimmer = (w: number, h: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#f0f0f0" offset="20%" />
        <stop stop-color="#e0e0e0" offset="50%" />
        <stop stop-color="#f0f0f0" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#f0f0f0" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

const generateBlurDataURL = (w: number = 10, h: number = 10) =>
  `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`

// Generate srcSet for responsive images
function generateSrcSet(src: string, widths: number[]): string {
  if (src.startsWith('http') || src.startsWith('//')) {
    return src // External images don't support srcSet in static export
  }

  return widths
    .map((width) => {
      const path = src.replace(/\.(jpg|jpeg|png|webp)$/i, `-${width}w.$1`)
      return `${path} ${width}w`
    })
    .join(', ')
}

// Default sizes for responsive images
const DEFAULT_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'

// Image widths for srcSet generation
const IMAGE_WIDTHS = [320, 640, 768, 1024, 1280, 1536, 1920]

export default function OptimizedImageEnhanced({
  src,
  alt,
  width,
  height,
  priority = false,
  lazy = true,
  blur = true,
  fallbackSrc = '/images/placeholder.jpg',
  aspectRatio,
  objectFit = 'cover',
  fadeIn = true,
  responsive = false,
  sizes = DEFAULT_SIZES,
  quality = 75,
  placeholder = 'blur',
  blurDataURL,
  className,
  style,
  onLoadComplete,
  onError,
  ...props
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [isInView, setIsInView] = useState(!lazy)
  const [hasError, setHasError] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Calculate dimensions if aspect ratio is provided
  const calculatedHeight = aspectRatio && width
    ? Math.round(Number(width) / aspectRatio)
    : height

  // Setup Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || !imageRef.current) {
      setIsInView(true)
      return
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observerRef.current?.disconnect()
          }
        })
      },
      {
        rootMargin: '50px',
        threshold: 0.01,
      }
    )

    observerRef.current.observe(imageRef.current)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [lazy])

  // Preload image if priority
  useEffect(() => {
    if (priority && typeof window !== 'undefined') {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = imageSrc

      // Add image format hint
      if (imageSrc.includes('.webp')) {
        link.type = 'image/webp'
      } else if (imageSrc.includes('.avif')) {
        link.type = 'image/avif'
      }

      document.head.appendChild(link)

      return () => {
        document.head.removeChild(link)
      }
    }
  }, [priority, imageSrc])

  const handleLoad = () => {
    setIsLoading(false)
    onLoadComplete?.()
  }

  const handleError = () => {
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc)
    }
    setHasError(true)
    setIsLoading(false)
    onError?.()
  }

  // Generate optimized blur placeholder
  const getPlaceholder = () => {
    if (!blur || placeholder === 'empty') return undefined

    if (blurDataURL) return blurDataURL

    if (placeholder === 'shimmer' || placeholder === 'skeleton') {
      return generateBlurDataURL(Number(width) || 10, Number(calculatedHeight) || 10)
    }

    return 'blur'
  }

  // Container styles for aspect ratio
  const containerStyle: CSSProperties = {
    ...style,
    position: 'relative',
    overflow: 'hidden',
    ...(aspectRatio && {
      aspectRatio: String(aspectRatio),
      width: width || '100%',
      height: 'auto',
    }),
  }

  // Image styles
  const imageStyle: CSSProperties = {
    objectFit,
    transition: fadeIn ? 'opacity 0.3s ease-in-out' : undefined,
    opacity: isLoading && fadeIn ? 0 : 1,
  }

  // For static export, we need to handle images differently
  const isStaticExport = process.env.NEXT_PUBLIC_BUILD_MODE === 'export'

  if (isStaticExport) {
    // Use native img tag for static export with optimizations
    return (
      <div ref={imageRef} className={cn('relative overflow-hidden', className)} style={containerStyle}>
        {isInView ? (
          <>
            {/* Loading skeleton */}
            {isLoading && placeholder === 'skeleton' && (
              <div className="absolute inset-0 animate-pulse bg-gray-200" />
            )}

            {/* Actual image */}
            <img
              src={imageSrc}
              alt={alt}
              width={width}
              height={calculatedHeight}
              loading={lazy && !priority ? 'lazy' : 'eager'}
              decoding={priority ? 'sync' : 'async'}
              onLoad={handleLoad}
              onError={handleError}
              style={imageStyle}
              className={cn(
                'h-full w-full',
                isLoading && 'blur-sm',
                className
              )}
              {...(responsive && {
                srcSet: generateSrcSet(imageSrc, IMAGE_WIDTHS),
                sizes,
              })}
            />

            {/* Error state */}
            {hasError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <span className="text-gray-500">Failed to load image</span>
              </div>
            )}
          </>
        ) : (
          // Placeholder while not in view
          <div
            className={cn('bg-gray-200', className)}
            style={{
              width,
              height: calculatedHeight,
              ...style,
            }}
          />
        )}
      </div>
    )
  }

  // Use Next.js Image component for development
  return (
    <div ref={imageRef} className={cn('relative', className)} style={containerStyle}>
      {isInView ? (
        <Image
          src={imageSrc}
          alt={alt}
          width={Number(width)}
          height={Number(calculatedHeight)}
          priority={priority}
          quality={quality}
          sizes={sizes}
          placeholder={getPlaceholder() as any}
          blurDataURL={blurDataURL || generateBlurDataURL()}
          onLoad={handleLoad}
          onError={handleError}
          style={imageStyle}
          className={cn(
            'h-full w-full',
            className
          )}
          {...props}
        />
      ) : (
        // Placeholder while not in view
        <div
          className={cn('bg-gray-200', className)}
          style={{
            width,
            height: calculatedHeight,
            ...style,
          }}
        />
      )}
    </div>
  )
}

/**
 * Picture component for art-directed responsive images
 */
export function OptimizedPicture({
  sources,
  alt,
  className,
  ...props
}: {
  sources: Array<{
    srcSet: string
    media?: string
    type?: string
  }>
  alt: string
  className?: string
  fallbackSrc: string
  width?: number
  height?: number
}) {
  return (
    <picture className={className}>
      {sources.map((source, index) => (
        <source
          key={index}
          srcSet={source.srcSet}
          media={source.media}
          type={source.type}
        />
      ))}
      <OptimizedImageEnhanced
        src={props.fallbackSrc}
        alt={alt}
        width={props.width}
        height={props.height}
        className={className}
      />
    </picture>
  )
}

/**
 * Background image component with lazy loading
 */
export function OptimizedBackgroundImage({
  src,
  alt,
  children,
  className,
  overlay = false,
  parallax = false,
}: {
  src: string
  alt: string
  children?: React.ReactNode
  className?: string
  overlay?: boolean
  parallax?: boolean
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

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
        rootMargin: '100px',
        threshold: 0.01,
      }
    )

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isInView) return

    const img = new window.Image()
    img.src = src
    img.onload = () => setIsLoaded(true)
  }, [isInView, src])

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden bg-gray-200',
        className
      )}
      style={{
        backgroundImage: isLoaded ? `url(${src})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: parallax ? 'fixed' : 'scroll',
      }}
      role="img"
      aria-label={alt}
    >
      {overlay && (
        <div className="absolute inset-0 bg-black/40" />
      )}
      {children}
    </div>
  )
}