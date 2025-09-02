'use client'

import { useState, useEffect } from 'react'
import Image, { ImageProps } from 'next/image'

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string
  fallbackSrc?: string
}

/**
 * Image component that handles GitHub Pages deployment correctly
 * Uses Next.js Image in development, fallback to img tag in production if needed
 */
export default function OptimizedImage({ src, alt, ...props }: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src)
  const [useFallback, setUseFallback] = useState(false)

  useEffect(() => {
    // For GitHub Pages in production, add basePath to local images
    if (typeof window !== 'undefined') {
      const isGitHubPages = window.location.pathname.startsWith('/next-trip-anywhere')

      // Only process local images (not external URLs)
      if (isGitHubPages && src.startsWith('/') && !src.startsWith('/next-trip-anywhere')) {
        setImageSrc(`/next-trip-anywhere${src}`)
      }
    }
  }, [src])

  // Fallback to regular img tag if Image component fails
  if (useFallback) {
    return (
      <img
        src={imageSrc}
        alt={alt}
        {...(props as any)}
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
                objectFit: props.className?.includes('object-contain') ? 'contain' : 'cover',
              }
            : {}),
          ...(props.style || {}),
        }}
      />
    )
  }

  return (
    <Image
      {...props}
      src={imageSrc}
      alt={alt}
      onError={() => {
        console.warn(`Image failed to load: ${imageSrc}, falling back to img tag`)
        setUseFallback(true)
      }}
    />
  )
}
