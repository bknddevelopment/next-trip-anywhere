/**
 * Performance-Optimized Image Component
 * Implements WebP/AVIF formats, lazy loading, and responsive sizes
 */

'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { normalizePath } from '@/lib/basePath'

interface PerformanceImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  sizes?: string
  priority?: boolean
  className?: string
  fill?: boolean
  style?: React.CSSProperties
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  loading?: 'lazy' | 'eager'
  onLoad?: () => void
}

// Generate blur data URL for placeholder
const generateBlurDataURL = (width = 10, height = 10) => {
  const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : null
  if (!canvas) {
    return ''
  }

  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return ''
  }

  // Create a gradient blur effect
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#f3f4f6')
  gradient.addColorStop(1, '#e5e7eb')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  return canvas.toDataURL()
}

export default function PerformanceImage({
  src,
  alt,
  width,
  height,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false,
  className = '',
  fill = false,
  style,
  quality = 75,
  placeholder = 'blur',
  blurDataURL,
  loading = 'lazy',
  onLoad,
}: PerformanceImageProps) {
  const [isIntersecting, setIsIntersecting] = useState(priority)
  const [hasError, setHasError] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)
  const imgRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01,
      }
    )

    observer.observe(imgRef.current)

    return () => observer.disconnect()
  }, [priority])

  // Update image source for runtime base path
  useEffect(() => {
    if (typeof window !== 'undefined' && !src.startsWith('http')) {
      const runtimePath = normalizePath(src, true)
      if (runtimePath !== src) {
        setImageSrc(runtimePath)
      }
    }
  }, [src])

  // Generate responsive srcSet for modern formats
  const generateSrcSet = (originalSrc: string) => {
    const widths = [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
    const formats = ['webp', 'avif']

    // For static export, we can't generate these on the fly
    // Instead, we'll use the original image with size hints
    return {
      srcSet: widths.map((w) => `${originalSrc} ${w}w`).join(', '),
      webpSrcSet: widths
        .map((w) => `${originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp')} ${w}w`)
        .join(', '),
    }
  }

  // Fallback for error cases
  if (hasError) {
    const fallbackSrc = typeof window !== 'undefined' ? normalizePath(src, true) : src

    return (
      <img
        src={fallbackSrc}
        alt={alt}
        className={className}
        style={{
          ...(fill
            ? {
                position: 'absolute',
                height: '100%',
                width: '100%',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                objectFit: 'cover',
              }
            : {}),
          ...style,
        }}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        loading={loading}
        decoding="async"
      />
    )
  }

  // Loading placeholder
  if (!isIntersecting && !priority) {
    return (
      <div
        ref={imgRef}
        className={`${className} ${fill ? 'absolute inset-0' : ''}`}
        style={{
          width: !fill ? width : '100%',
          height: !fill ? height : '100%',
          backgroundColor: '#f3f4f6',
          ...style,
        }}
      >
        {/* Shimmer effect */}
        <div
          className="animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
          style={{
            width: '100%',
            height: '100%',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s ease-in-out infinite',
          }}
        />
      </div>
    )
  }

  return (
    <div ref={imgRef} className={fill ? 'relative w-full h-full' : ''}>
      <picture>
        {/* AVIF format (best compression) */}
        <source
          srcSet={imageSrc.replace(/\.(jpg|jpeg|png)$/i, '.avif')}
          type="image/avif"
          media="(min-width: 0px)"
        />
        {/* WebP format (good compression, wider support) */}
        <source
          srcSet={imageSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp')}
          type="image/webp"
          media="(min-width: 0px)"
        />
        {/* Original format fallback */}
        <Image
          src={imageSrc}
          alt={alt}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          fill={fill}
          sizes={sizes}
          quality={quality}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={blurDataURL || generateBlurDataURL()}
          className={className}
          style={style}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => {
            console.warn(`Image failed to load: ${imageSrc}`)
            setHasError(true)
          }}
          onLoad={() => {
            if (onLoad) {
              onLoad()
            }
          }}
        />
      </picture>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  )
}
