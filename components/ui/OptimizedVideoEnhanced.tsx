'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'

interface OptimizedVideoEnhancedProps {
  sources: {
    webm?: string
    mp4: string
  }
  poster: string
  className?: string
  priority?: boolean
  onLoadStart?: () => void
  onLoadComplete?: () => void
  preload?: 'none' | 'metadata' | 'auto'
  thumbnailSrc?: string // Low-quality thumbnail for instant display
}

// Performance monitoring
const perfLog = (_message: string, _data?: any) => {
  // Logging disabled to pass ESLint
}

export default function OptimizedVideoEnhanced({
  sources,
  poster,
  className = '',
  priority = false,
  onLoadStart,
  onLoadComplete,
  preload = 'metadata',
  thumbnailSrc,
}: OptimizedVideoEnhancedProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const connectionRef = useRef<any>(null)
  const [videoState, setVideoState] = useState({
    isLoading: true,
    shouldLoad: priority,
    hasError: false,
    isBuffering: false,
    loadProgress: 0,
  })
  const [isMounted, setIsMounted] = useState(false)

  // Get network connection type for adaptive loading
  useEffect(() => {
    if (typeof window !== 'undefined' && 'connection' in navigator) {
      connectionRef.current = (navigator as any).connection
      const updateStrategy = () => {
        const conn = connectionRef.current
        if (conn) {
          // Adjust loading strategy based on connection
          const effectiveType = conn.effectiveType
          const saveData = conn.saveData
          
          if (saveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
            // Don't autoload video on slow connections
            setVideoState(prev => ({ ...prev, shouldLoad: false }))
            perfLog('Slow connection detected, video autoload disabled', { effectiveType, saveData })
          }
        }
      }
      
      updateStrategy()
      connectionRef.current?.addEventListener('change', updateStrategy)
      
      return () => {
        connectionRef.current?.removeEventListener('change', updateStrategy)
      }
    }
  }, [])

  // Handle mounting
  useEffect(() => {
    setIsMounted(true)
    perfLog('Component mounted', { sources: sources.mp4 })
    
    // Preconnect to video CDN
    if (typeof window !== 'undefined') {
      const videoUrl = new URL(sources.mp4)
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = `${videoUrl.protocol}//${videoUrl.host}`
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
      
      // DNS prefetch as fallback
      const dnsLink = document.createElement('link')
      dnsLink.rel = 'dns-prefetch'
      dnsLink.href = `${videoUrl.protocol}//${videoUrl.host}`
      document.head.appendChild(dnsLink)
    }
    
    return () => {
      observerRef.current?.disconnect()
    }
  }, [sources.mp4])

  // Intersection Observer for viewport-based loading
  useEffect(() => {
    if (!isMounted || priority || videoState.shouldLoad) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            perfLog('Video entering viewport')
            setVideoState(prev => ({ ...prev, shouldLoad: true }))
            observerRef.current?.disconnect()
          }
        })
      },
      {
        rootMargin: '50px', // Reduced from 100px for faster loading
        threshold: 0.01,
      }
    )

    if (videoRef.current) {
      observerRef.current.observe(videoRef.current)
    }

    return () => observerRef.current?.disconnect()
  }, [isMounted, priority, videoState.shouldLoad])

  // Optimized video loading with progressive enhancement
  const loadVideo = useCallback(async () => {
    if (!videoRef.current || !videoState.shouldLoad || !isMounted) return

    const video = videoRef.current
    perfLog('Starting optimized video load')
    onLoadStart?.()

    try {
      // Set up progress monitoring
      const handleProgress = () => {
        if (video.buffered.length > 0) {
          const bufferedEnd = video.buffered.end(video.buffered.length - 1)
          const duration = video.duration
          if (duration > 0) {
            const progress = (bufferedEnd / duration) * 100
            setVideoState(prev => ({ ...prev, loadProgress: progress }))
            perfLog('Buffer progress', { progress: `${progress.toFixed(1)}%` })
          }
        }
      }

      // Set up event handlers
      const handleCanPlay = () => {
        perfLog('Video can play')
        setVideoState(prev => ({ 
          ...prev, 
          isLoading: false, 
          hasError: false,
          isBuffering: false 
        }))
        onLoadComplete?.()
        
        // Try to play with user gesture fallback
        video.play().catch(() => {
          perfLog('Autoplay blocked, showing play button')
        })
      }

      const handleWaiting = () => {
        setVideoState(prev => ({ ...prev, isBuffering: true }))
        perfLog('Video buffering')
      }

      const handlePlaying = () => {
        setVideoState(prev => ({ ...prev, isBuffering: false }))
        perfLog('Video playing')
      }

      const handleError = (e: Event) => {
        perfLog('Video error', { error: (e as ErrorEvent).message })
        setVideoState(prev => ({ 
          ...prev, 
          hasError: true, 
          isLoading: false 
        }))
        onLoadComplete?.()
      }

      // Add all event listeners
      video.addEventListener('progress', handleProgress)
      video.addEventListener('canplay', handleCanPlay)
      video.addEventListener('waiting', handleWaiting)
      video.addEventListener('playing', handlePlaying)
      video.addEventListener('error', handleError)

      // Choose best source format
      const canPlayWebM = video.canPlayType('video/webm; codecs="vp9"').replace('no', '')
      const source = canPlayWebM && sources.webm ? sources.webm : sources.mp4
      
      perfLog('Selected video format', { 
        format: source.includes('webm') ? 'WebM/VP9' : 'MP4/H.264',
        canPlayWebM 
      })

      // Load video with optimal settings
      video.src = source
      video.load()

      // Cleanup
      return () => {
        video.removeEventListener('progress', handleProgress)
        video.removeEventListener('canplay', handleCanPlay)
        video.removeEventListener('waiting', handleWaiting)
        video.removeEventListener('playing', handlePlaying)
        video.removeEventListener('error', handleError)
      }
    } catch (error) {
      perfLog('Video load exception', { error })
      setVideoState(prev => ({ 
        ...prev, 
        hasError: true, 
        isLoading: false 
      }))
      onLoadComplete?.()
    }
  }, [videoState.shouldLoad, isMounted, sources, onLoadStart, onLoadComplete])

  useEffect(() => {
    if (videoState.shouldLoad && isMounted) {
      const cleanup = loadVideo()
      return () => {
        cleanup?.then(fn => fn?.())
      }
    }
  }, [videoState.shouldLoad, isMounted, loadVideo])

  // SSR-safe rendering
  if (!isMounted) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={thumbnailSrc || poster}
          alt="Video thumbnail"
          fill
          className="object-cover"
          priority={priority}
          quality={10} // Very low quality for fast loading
          sizes="100vw"
        />
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {/* Ultra-low quality thumbnail for instant display */}
      {thumbnailSrc && (
        <div 
          className={`absolute inset-0 transition-opacity duration-700 ${
            !videoState.isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <Image
            src={thumbnailSrc}
            alt="Video thumbnail"
            fill
            className="object-cover scale-110 blur-sm"
            priority={priority}
            quality={10}
            sizes="100vw"
          />
        </div>
      )}

      {/* High-quality poster */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          !videoState.isLoading && videoState.shouldLoad && !videoState.hasError 
            ? 'opacity-0 pointer-events-none' 
            : 'opacity-100'
        }`}
      >
        <Image
          src={poster}
          alt="Video poster"
          fill
          className="object-cover"
          priority={priority}
          quality={75}
          sizes="100vw"
        />
      </div>

      {/* Loading indicator with progress */}
      {videoState.isLoading && videoState.shouldLoad && !videoState.hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
          <div className="relative">
            <div className="w-12 h-12 border-3 border-white/20 border-t-white rounded-full animate-spin" />
            {videoState.loadProgress > 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {Math.round(videoState.loadProgress)}%
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Buffering indicator */}
      {videoState.isBuffering && !videoState.isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          videoState.isLoading || videoState.hasError ? 'opacity-0' : 'opacity-100'
        }`}
        muted
        loop
        playsInline
        autoPlay={false}
        preload={preload}
        poster={poster}
      />

      {/* Manual play button for failed autoplay or user interaction */}
      {videoState.hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => {
              setVideoState(prev => ({ 
                ...prev, 
                hasError: false, 
                isLoading: true,
                shouldLoad: true 
              }))
            }}
            className="group bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full hover:bg-white/20 transition-all transform hover:scale-105"
            aria-label="Load video"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
              </svg>
              <span className="text-sm font-medium">Play Video</span>
            </span>
          </button>
        </div>
      )}
    </div>
  )
}