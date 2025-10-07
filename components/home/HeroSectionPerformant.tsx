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

      {/* Premium Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white max-w-6xl">
        {/* Subtle badge above headline */}
        <div className="motion-safe:animate-fade-in mb-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <Sparkles className="w-4 h-4 text-accent-400" />
            <span className="text-sm font-medium">America&apos;s Premier Travel Agency</span>
          </div>
        </div>

        <div className="motion-safe:animate-fade-in space-y-8">
          {/* Hero Headline - Luxury Serif Typography */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-serif drop-shadow-2xl leading-[1.1] tracking-tight">
            Unforgettable Journeys,
            <span className="block mt-3 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Expertly Planned
            </span>
          </h1>

          {/* Enhanced Subheadline */}
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-50 drop-shadow-xl leading-relaxed font-light">
            Personalized service, exclusive deals, and 24/7 support from America&apos;s most trusted
            travel experts since 2010
          </p>

          {/* Premium CTA Buttons */}
          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSe5Wy5yxW42FXTyFDsBPK7A0eqqcP_XKYCf-PHhd9vmlfvVWQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-12 py-5 rounded-xl font-bold text-lg shadow-2xl hover:shadow-accent-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
              aria-label="Start planning your trip"
            >
              Plan Your Dream Trip
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>

            <a
              href="tel:1-833-874-1019"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-10 py-5 rounded-xl font-semibold text-lg border-2 border-white/30 hover:border-white/50 shadow-xl transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              1-833-874-1019
            </a>
          </div>

          {/* Premium Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium pt-8">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              <svg
                className="w-5 h-5 text-accent-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>15+ Years</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              <svg
                className="w-5 h-5 text-accent-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>50,000+ Travelers</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              <svg
                className="w-5 h-5 text-accent-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>ASTA Certified</span>
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
