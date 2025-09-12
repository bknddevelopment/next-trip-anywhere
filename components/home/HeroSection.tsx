'use client'

import { useState, useEffect, Suspense, useCallback, useRef } from 'react'
import dynamic from 'next/dynamic'
import { ChevronDown, Sparkles } from 'lucide-react'
import PerformantImage from '@/components/ui/PerformantImage'

// Lazy load the video component with proper error boundary
const OptimizedVideo = dynamic(() => import('@/components/ui/OptimizedVideo'), {
  loading: () => (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
    </div>
  ),
  ssr: false, // Disable SSR for video to prevent hydration issues
})

// Using the beautiful Ocean.png as our primary hero image
const OCEAN_HERO_IMAGE = '/images/ocean-hero.png'

const heroVideos = [
  {
    url: 'https://cdn.coverr.co/videos/coverr-aerial-view-of-tropical-beach-5570/1080p.mp4',
    poster: OCEAN_HERO_IMAGE, // Using Ocean.png as primary poster
    fallbackPoster: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80',
    title: 'Caribbean Paradise',
  },
  {
    url: 'https://cdn.coverr.co/videos/coverr-flying-over-new-york-city-5823/1080p.mp4',
    poster: OCEAN_HERO_IMAGE, // Using Ocean.png as primary poster
    fallbackPoster: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=1920&q=80',
    title: 'City Adventures',
  },
]

// Default fallback image - using Ocean.png as primary
const DEFAULT_FALLBACK = OCEAN_HERO_IMAGE

export default function HeroSection() {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [isVideoLoading, setIsVideoLoading] = useState(true)
  const [hasVideoError, setHasVideoError] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const rotationIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const videoLoadTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true)
    return () => {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current)
      }
      if (videoLoadTimeoutRef.current) {
        clearTimeout(videoLoadTimeoutRef.current)
      }
    }
  }, [])

  // Video rotation with pause during loading
  useEffect(() => {
    if (!isMounted) {
      return
    }

    // Clear existing interval
    if (rotationIntervalRef.current) {
      clearInterval(rotationIntervalRef.current)
    }

    // Only rotate if video is loaded successfully
    if (!isVideoLoading && !hasVideoError) {
      rotationIntervalRef.current = setInterval(() => {
        setCurrentVideo((prev) => (prev + 1) % heroVideos.length)
        setIsVideoLoading(true) // Reset loading state for new video
        setHasVideoError(false)
      }, 15000) // Increased to 15 seconds for better viewing
    }

    return () => {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current)
      }
    }
  }, [isMounted, isVideoLoading, hasVideoError])

  // Handle video load timeout
  const handleVideoLoadStart = useCallback(() => {
    setIsVideoLoading(true)
    setHasVideoError(false)

    // Set a timeout for video loading
    if (videoLoadTimeoutRef.current) {
      clearTimeout(videoLoadTimeoutRef.current)
    }

    videoLoadTimeoutRef.current = setTimeout(() => {
      if (isVideoLoading) {
        console.warn('Video load timeout, falling back to poster')
        setHasVideoError(true)
        setIsVideoLoading(false)
      }
    }, 10000) // 10 second timeout
  }, [isVideoLoading])

  const handleVideoLoadComplete = useCallback(() => {
    setIsVideoLoading(false)
    if (videoLoadTimeoutRef.current) {
      clearTimeout(videoLoadTimeoutRef.current)
    }
  }, [])

  const scrollToSearch = useCallback(() => {
    const searchSection = document.getElementById('search-section')
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  // Get current media with fallbacks
  const currentMedia = heroVideos[currentVideo] || heroVideos[0]
  const posterImage = hasVideoError
    ? currentMedia.fallbackPoster || currentMedia.poster || DEFAULT_FALLBACK
    : currentMedia.poster || DEFAULT_FALLBACK

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background with multiple fallback layers */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient background - always visible */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />

        {/* Fallback poster image - always rendered */}
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

        {/* Video layer - only render when mounted to avoid hydration issues */}
        {isMounted && (
          <Suspense
            fallback={
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
              </div>
            }
          >
            <div className="absolute inset-0">
              <OptimizedVideo
                key={`video-${currentVideo}`} // Force remount on video change
                src={currentMedia.url}
                poster={posterImage}
                className="absolute inset-0 w-full h-full"
                priority={true}
                onLoadStart={handleVideoLoadStart}
                onLoadComplete={handleVideoLoadComplete}
              />
            </div>
          </Suspense>
        )}

        {/* Overlay gradient - always on top */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />

        {/* Additional overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30" />
      </div>

      {/* Content with optimized rendering */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="motion-safe:animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-display will-change-transform">
            Your Next Adventure
            <span className="block text-3xl md:text-5xl mt-2 text-accent-400">Starts Here</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100">
            Expert travel planning from America&apos;s trusted nationwide travel agency. Flights,
            cruises, and unforgettable vacation packages tailored just for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="https://nextripanywhere.app.n8n.cloud/form/travel-quote-form"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Start Planning My Trip
            </a>

            <a
              href="https://nextripanywhere.app.n8n.cloud/form/travel-quote-form"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-95 transition-all duration-300 items-center justify-center space-x-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>Surprise Me with Deals!</span>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-accent-400">✓</span>
              <span>15+ Years Experience</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-accent-400">✓</span>
              <span>50,000+ Happy Travelers</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-accent-400">✓</span>
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-accent-400">✓</span>
              <span>Best Price Guarantee</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 motion-safe:animate-fade-in-delayed">
          <button onClick={scrollToSearch} className="animate-bounce" aria-label="Scroll to search">
            <ChevronDown className="w-8 h-8 text-white" />
          </button>
        </div>
      </div>
    </section>
  )
}
