'use client'

import { useState, useEffect, useCallback, useRef, memo } from 'react'
import dynamic from 'next/dynamic'
import { ChevronDown, Sparkles } from 'lucide-react'
import PerformantImage from '@/components/ui/PerformantImage'

// Enhanced video component with lazy loading
const OptimizedVideoEnhanced = dynamic(() => import('@/components/ui/OptimizedVideoEnhanced'), {
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
  ),
  ssr: false,
})

// Optimized video sources with WebM support
const heroVideos = [
  {
    sources: {
      webm: 'https://cdn.coverr.co/videos/coverr-aerial-view-of-tropical-beach-5570/720p.webm',
      mp4: 'https://cdn.coverr.co/videos/coverr-aerial-view-of-tropical-beach-5570/720p.mp4', // Reduced to 720p
    },
    poster: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=75&fm=webp', // WebP format
    thumbnail:
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=50&q=10&blur=20&fm=webp', // Ultra-low quality
    fallbackPoster:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=75&fm=webp',
    title: 'Caribbean Paradise',
  },
  {
    sources: {
      webm: 'https://cdn.coverr.co/videos/coverr-flying-over-new-york-city-5823/720p.webm',
      mp4: 'https://cdn.coverr.co/videos/coverr-flying-over-new-york-city-5823/720p.mp4',
    },
    poster: 'https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?w=1920&q=75&fm=webp',
    thumbnail:
      'https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?w=50&q=10&blur=20&fm=webp',
    fallbackPoster:
      'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=1920&q=75&fm=webp',
    title: 'City Adventures',
  },
]

const DEFAULT_FALLBACK =
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=75&fm=webp'

// Memoized button components to prevent re-renders
const PlanningButton = memo(() => (
  <a
    href="https://nextripanywhere.app.n8n.cloud/form/travel-quote-form"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-95 transition-all duration-300 will-change-transform"
  >
    Start Planning My Trip
  </a>
))
PlanningButton.displayName = 'PlanningButton'

const SurpriseButton = memo(() => (
  <a
    href="https://nextripanywhere.app.n8n.cloud/form/travel-quote-form"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-95 transition-all duration-300 items-center justify-center space-x-2 will-change-transform"
  >
    <Sparkles className="w-5 h-5" />
    <span>Surprise Me with Deals!</span>
  </a>
))
SurpriseButton.displayName = 'SurpriseButton'

// Trust indicators component
const TrustIndicators = memo(() => (
  <div className="flex flex-wrap justify-center gap-6 text-sm">
    {[
      { icon: '✓', text: '15+ Years Experience' },
      { icon: '✓', text: '50,000+ Happy Travelers' },
      { icon: '✓', text: '24/7 Support' },
      { icon: '✓', text: 'Best Price Guarantee' },
    ].map((item, index) => (
      <div key={index} className="flex items-center space-x-2">
        <span className="text-accent-400">{item.icon}</span>
        <span>{item.text}</span>
      </div>
    ))}
  </div>
))
TrustIndicators.displayName = 'TrustIndicators'

export default function HeroSectionOptimized() {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [isVideoLoading, setIsVideoLoading] = useState(true)
  const [hasVideoError, setHasVideoError] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const rotationIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const videoLoadTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setReduceMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true)

    // Preconnect to CDNs
    const cdns = ['https://cdn.coverr.co', 'https://images.unsplash.com']
    cdns.forEach((cdn) => {
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = cdn
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)

      const dnsLink = document.createElement('link')
      dnsLink.rel = 'dns-prefetch'
      dnsLink.href = cdn
      document.head.appendChild(dnsLink)
    })

    return () => {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current)
      }
      if (videoLoadTimeoutRef.current) {
        clearTimeout(videoLoadTimeoutRef.current)
      }
    }
  }, [])

  // Video rotation with performance optimization
  useEffect(() => {
    if (!isMounted || reduceMotion) {
      return
    }

    if (rotationIntervalRef.current) {
      clearInterval(rotationIntervalRef.current)
    }

    // Only rotate if video is loaded successfully
    if (!isVideoLoading && !hasVideoError) {
      rotationIntervalRef.current = setInterval(() => {
        setCurrentVideo((prev) => (prev + 1) % heroVideos.length)
        setIsVideoLoading(true)
        setHasVideoError(false)
      }, 20000) // Increased to 20 seconds
    }

    return () => {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current)
      }
    }
  }, [isMounted, isVideoLoading, hasVideoError, reduceMotion])

  // Optimized scroll function with RAF
  const scrollToSearch = useCallback(() => {
    const searchSection = document.getElementById('search-section')
    if (searchSection) {
      // Use requestAnimationFrame for smooth scrolling
      requestAnimationFrame(() => {
        searchSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }, [])

  // Handle video load events
  const handleVideoLoadStart = useCallback(() => {
    setIsVideoLoading(true)
    setHasVideoError(false)

    if (videoLoadTimeoutRef.current) {
      clearTimeout(videoLoadTimeoutRef.current)
    }

    // Increased timeout for slower connections
    videoLoadTimeoutRef.current = setTimeout(() => {
      if (isVideoLoading) {
        console.warn('Video load timeout, falling back to poster')
        setHasVideoError(true)
        setIsVideoLoading(false)
      }
    }, 15000)
  }, [isVideoLoading])

  const handleVideoLoadComplete = useCallback(() => {
    setIsVideoLoading(false)
    if (videoLoadTimeoutRef.current) {
      clearTimeout(videoLoadTimeoutRef.current)
    }
  }, [])

  // Get current media with fallbacks
  const currentMedia = heroVideos[currentVideo] || heroVideos[0]
  const posterImage = hasVideoError
    ? currentMedia.fallbackPoster || currentMedia.poster || DEFAULT_FALLBACK
    : currentMedia.poster || DEFAULT_FALLBACK

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background layers with optimized rendering */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient - always visible, GPU accelerated */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 will-change-transform" />

        {/* Thumbnail for instant display (ultra-low quality) */}
        {currentMedia.thumbnail && (
          <div className="absolute inset-0">
            <PerformantImage
              src={currentMedia.thumbnail}
              alt="Hero thumbnail"
              fill
              className="object-cover scale-110 blur-lg"
              priority
              quality={10}
              preload
              fallbackSrc={DEFAULT_FALLBACK}
            />
          </div>
        )}

        {/* High-quality poster image */}
        <div className="absolute inset-0">
          <PerformantImage
            src={posterImage}
            alt="Hero background"
            fill
            className="object-cover"
            priority
            quality={85}
            preload
            fallbackSrc={DEFAULT_FALLBACK}
          />
        </div>

        {/* Video layer - conditionally rendered */}
        {isMounted && !reduceMotion && (
          <div className="absolute inset-0">
            <OptimizedVideoEnhanced
              key={`video-${currentVideo}`}
              sources={currentMedia.sources}
              poster={posterImage}
              thumbnailSrc={currentMedia.thumbnail}
              className="absolute inset-0 w-full h-full"
              priority={currentVideo === 0} // Only prioritize first video
              onLoadStart={handleVideoLoadStart}
              onLoadComplete={handleVideoLoadComplete}
              preload={currentVideo === 0 ? 'auto' : 'metadata'}
            />
          </div>
        )}

        {/* Overlay gradients - GPU accelerated */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50 will-change-transform" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 will-change-transform" />
      </div>

      {/* Content with optimized animations */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className={`${!reduceMotion ? 'motion-safe:animate-fade-in' : ''}`}>
          {/* Title with will-change for smooth animations */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-display will-change-transform transform-gpu">
            Your Next Adventure
            <span className="block text-3xl md:text-5xl mt-2 text-accent-400">Starts Here</span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100">
            Expert travel planning from America&apos;s trusted nationwide travel agency. Flights,
            cruises, and unforgettable vacation packages tailored just for you.
          </p>

          {/* CTA Buttons - Memoized components */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <PlanningButton />
            <SurpriseButton />
          </div>

          {/* Trust Indicators - Memoized */}
          <TrustIndicators />
        </div>

        {/* Scroll Indicator with reduced motion support */}
        <div
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${
            !reduceMotion ? 'motion-safe:animate-fade-in-delayed' : ''
          }`}
        >
          <button
            onClick={scrollToSearch}
            className={`${!reduceMotion ? 'animate-bounce' : ''}`}
            aria-label="Scroll to search"
          >
            <ChevronDown className="w-8 h-8 text-white" />
          </button>
        </div>
      </div>
    </section>
  )
}
