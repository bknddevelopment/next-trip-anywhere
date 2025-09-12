'use client'

import { useCallback } from 'react'
import Image from 'next/image'
import { ChevronDown, Sparkles } from 'lucide-react'
import { normalizePath } from '@/lib/basePath'

// Optimized hero section focused on performance
export default function HeroSectionPerformant() {
  const scrollToSearch = useCallback(() => {
    const searchSection = document.getElementById('search-section')
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Optimized background image with priority loading */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient for immediate paint */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />

        {/* Optimized hero image with Next.js Image component */}
        <picture className="absolute inset-0">
          <source
            srcSet={normalizePath('/images/ocean-hero-mobile.webp')}
            type="image/webp"
            media="(max-width: 768px)"
          />
          <source
            srcSet={normalizePath('/images/ocean-hero-optimized.webp')}
            type="image/webp"
            media="(min-width: 769px)"
          />
          <Image
            src={normalizePath('/images/ocean-hero-optimized.jpg')}
            alt="Tropical ocean paradise"
            fill
            className="object-cover"
            priority
            quality={85}
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAACQAQCdASoUABQAPt1usFOqKSWiMAgBABsS4gBOmUAP0NP/AP0A/QD9AA=="
          />
        </picture>

        {/* Gradient overlays for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
      </div>

      {/* Content with optimized animations */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="motion-safe:animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-display drop-shadow-2xl">
            Your Next Adventure
            <span className="block text-3xl md:text-5xl mt-2 text-accent-400">Starts Here</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100 drop-shadow-lg">
            Expert travel planning from America&apos;s trusted nationwide travel agency. Flights,
            cruises, and unforgettable vacation packages tailored just for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={scrollToSearch}
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-95 transition-all duration-300"
              aria-label="Start planning your trip"
            >
              Start Planning My Trip
            </button>

            <button
              className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2"
              aria-label="Get surprise travel deals"
            >
              <Sparkles className="w-5 h-5" aria-hidden="true" />
              <span>Surprise Me with Deals!</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-accent-400" aria-hidden="true">
                ✓
              </span>
              <span>15+ Years Experience</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-accent-400" aria-hidden="true">
                ✓
              </span>
              <span>50,000+ Happy Travelers</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-accent-400" aria-hidden="true">
                ✓
              </span>
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-accent-400" aria-hidden="true">
                ✓
              </span>
              <span>Best Price Guarantee</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 motion-safe:animate-fade-in-delayed">
          <button
            onClick={scrollToSearch}
            className="animate-bounce"
            aria-label="Scroll to search section"
          >
            <ChevronDown className="w-8 h-8 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
