'use client'

import { useState, useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { ChevronDown, Sparkles } from 'lucide-react'
import PerformantImage from '@/components/ui/PerformantImage'

// Lazy load the video component
const OptimizedVideo = dynamic(() => import('@/components/ui/OptimizedVideo'), {
  loading: () => <div className="absolute inset-0 bg-gradient-to-b from-navy/80 to-navy/60" />,
  ssr: false, // Disable SSR for video to improve initial load
})

const heroVideos = [
  {
    url: 'https://cdn.coverr.co/videos/coverr-aerial-view-of-tropical-beach-5570/1080p.mp4',
    poster: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=80',
    title: 'Caribbean Paradise',
  },
  {
    url: 'https://cdn.coverr.co/videos/coverr-flying-over-new-york-city-5823/1080p.mp4',
    poster: 'https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?w=1920&q=80',
    title: 'City Adventures',
  },
]

export default function HeroSection() {
  const [currentVideo, setCurrentVideo] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % heroVideos.length)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const scrollToSearch = () => {
    const searchSection = document.getElementById('search-section')
    searchSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Optimized Video Background with Performance Improvements */}
      <div className="absolute inset-0 z-0">
        <Suspense
          fallback={
            <PerformantImage
              src={heroVideos[currentVideo]?.poster || ''}
              alt="Hero background"
              fill
              className="object-cover"
              priority
              quality={60}
              preload
            />
          }
        >
          <OptimizedVideo
            src={heroVideos[currentVideo]?.url || ''}
            poster={heroVideos[currentVideo]?.poster || ''}
            className="absolute inset-0 w-full h-full"
            priority={true}
          />
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
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
            <button
              onClick={scrollToSearch}
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Start Planning My Trip
            </button>

            <button className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>Surprise Me with Deals!</span>
            </button>
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
