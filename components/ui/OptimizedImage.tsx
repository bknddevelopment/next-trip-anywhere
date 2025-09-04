'use client'

import { useState, useEffect } from 'react'
import Image, { ImageProps } from 'next/image'
import { normalizePath } from '@/lib/basePath'

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string
  fallbackSrc?: string
}

/**
 * Optimized image component that handles GitHub Pages deployment
 * Uses centralized base path detection for consistency
 */
export default function OptimizedImage({ src, alt, ...props }: OptimizedImageProps) {
  const [useFallback, setUseFallback] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)

  // Update image source on mount to handle runtime base path
  useEffect(() => {
    // For client-side, ensure we have the correct runtime path
    if (typeof window !== 'undefined' && !src.startsWith('http')) {
      const runtimePath = normalizePath(src, true)
      if (runtimePath !== src) {
        setImageSrc(runtimePath)
      }
    }
  }, [src])

  // Fallback to regular img tag if Image component fails
  if (useFallback) {
    // Use runtime base path detection for fallback
    const fallbackSrc = typeof window !== 'undefined' ? normalizePath(src, true) : src

    return (
      <img
        src={fallbackSrc}
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