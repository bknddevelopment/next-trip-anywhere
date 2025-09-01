'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface OptimizedVideoProps {
  src: string
  poster: string
  className?: string
  priority?: boolean
  onLoadStart?: () => void
  onLoadComplete?: () => void
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
  const [isLoading, setIsLoading] = useState(true)
  const [shouldLoad, setShouldLoad] = useState(priority)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!priority) {
      // Use Intersection Observer for lazy loading
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setShouldLoad(true)
              observer.disconnect()
            }
          })
        },
        {
          rootMargin: '50px', // Start loading 50px before viewport
          threshold: 0.01,
        }
      )

      if (videoRef.current) {
        observer.observe(videoRef.current)
      }

      return () => observer.disconnect()
    }
    return undefined
  }, [priority])

  useEffect(() => {
    if (shouldLoad && videoRef.current) {
      onLoadStart?.()

      // Preload video metadata first
      videoRef.current.load()

      // When enough data is loaded, start playing
      videoRef.current.addEventListener('canplay', () => {
        setIsLoading(false)
        onLoadComplete?.()

        // Play video with reduced quality if needed
        if (videoRef.current) {
          videoRef.current.play().catch(() => {
            // Autoplay might be blocked, handle gracefully
            // Autoplay blocked, showing poster instead
          })
        }
      })

      videoRef.current.addEventListener('error', () => {
        setHasError(true)
        setIsLoading(false)
        onLoadComplete?.()
      })
    }
  }, [shouldLoad, onLoadStart, onLoadComplete])

  return (
    <div className={`relative ${className}`}>
      {/* Poster image - always visible initially */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${!isLoading && shouldLoad && !hasError ? 'opacity-0' : 'opacity-100'}`}
      >
        <Image
          src={poster}
          alt="Video poster"
          fill
          className="object-cover"
          priority={priority}
          quality={75}
        />
      </div>

      {/* Loading indicator - removed for cleaner appearance */}

      {/* Video element */}
      <video
        ref={videoRef}
        className={`w-full h-full object-cover ${isLoading || hasError ? 'invisible' : 'visible'}`}
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
      >
        {shouldLoad && (
          <>
            <source src={src} type="video/mp4" />
            {/* Add WebM source for better compression */}
            <source src={src.replace('.mp4', '.webm')} type="video/webm" />
          </>
        )}
      </video>
    </div>
  )
}
