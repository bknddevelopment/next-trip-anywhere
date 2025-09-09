'use client'

import { useState, useEffect, useRef } from 'react'
import Image, { ImageProps } from 'next/image'

interface PerformantImageProps extends Omit<ImageProps, 'src' | 'loading'> {
  src: string
  fallbackSrc?: string
  priority?: boolean
  preload?: boolean
  aspectRatio?: number
  blur?: boolean
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
  const imgRef = useRef<HTMLDivElement>(null)

  // Use Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) {
      setIsInView(true)
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
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01
      }
    )

    observer.observe(imgRef.current)

    return () => observer.disconnect()
  }, [priority])

  // Preload critical images
  useEffect(() => {
    if (preload && typeof window !== 'undefined') {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    }
  }, [preload, src])

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

  // Handle error with fallback
  if (hasError && fallbackSrc) {
    return (
      <img
        src={fallbackSrc}
        alt={alt}
        className={className}
        {...(props as any)}
      />
    )
  }

  const containerClassName = `relative ${className} ${!isLoaded && blur ? 'animate-pulse bg-gray-200' : ''}`

  return (
    <div 
      ref={imgRef} 
      className={containerClassName}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {isInView ? (
        <Image
          {...props}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          placeholder={blur ? 'blur' : 'empty'}
          blurDataURL={blur ? blurDataURL : undefined}
          quality={props.quality || 75}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            console.warn(`Image failed to load: ${src}`)
            setHasError(true)
          }}
          className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
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