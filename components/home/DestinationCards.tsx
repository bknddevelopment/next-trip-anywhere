'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, MapPin, Calendar, Users } from 'lucide-react'

const destinations = [
  {
    id: 1,
    name: 'Cancun, Mexico',
    image: 'https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=800&q=80',
    price: 'From $599',
    rating: 4.8,
    duration: '5 Days',
    groupSize: '2-4 People',
    description: 'All-inclusive beach paradise with crystal clear waters',
    featured: true,
  },
  {
    id: 2,
    name: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    price: 'From $1,299',
    rating: 4.9,
    duration: '7 Days',
    groupSize: '2-6 People',
    description: 'Romance and culture in the City of Lights',
    featured: false,
  },
  {
    id: 3,
    name: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    price: 'From $999',
    rating: 4.7,
    duration: '8 Days',
    groupSize: '2-8 People',
    description: 'Tropical paradise with temples and rice terraces',
    featured: true,
  },
  {
    id: 4,
    name: 'Dubai, UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    price: 'From $1,499',
    rating: 4.8,
    duration: '6 Days',
    groupSize: '2-4 People',
    description: 'Luxury and adventure in the desert metropolis',
    featured: false,
  },
  {
    id: 5,
    name: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80',
    price: 'From $1,199',
    rating: 4.9,
    duration: '5 Days',
    groupSize: '2 People',
    description: 'Stunning sunsets and white-washed villages',
    featured: true,
  },
  {
    id: 6,
    name: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    price: 'From $1,799',
    rating: 4.8,
    duration: '7 Days',
    groupSize: '2-6 People',
    description: "Modern meets traditional in Japan's capital",
    featured: false,
  },
]

export default function DestinationCards() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleCards((prev) => new Set(prev).add(index))
          }
        })
      },
      {
        rootMargin: '50px',
        threshold: 0.01,
      }
    )

    cardRefs.current.forEach((ref) => {
      if (ref) {
        observerRef.current?.observe(ref)
      }
    })

    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <section className="py-20 bg-warm-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold text-navy mb-4">
            Popular <span className="text-gradient">Destinations</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked destinations with exclusive deals for East Coast travelers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <div
              key={destination.id}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
              data-index={index}
              className={`group transition-all duration-500 ${
                visibleCards.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  {visibleCards.has(index) && (
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      quality={75}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                  {destination.featured && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured Deal
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold">{destination.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy mb-2 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-primary-500" />
                    {destination.name}
                  </h3>

                  <p className="text-gray-600 mb-4">{destination.description}</p>

                  <div className="flex flex-wrap gap-3 mb-4 text-sm">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {destination.duration}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      {destination.groupSize}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-primary-500">{destination.price}</p>
                      <p className="text-xs text-gray-500">per person</p>
                    </div>
                    <Link
                      href={`/destinations/${destination.name.toLowerCase().replace(/[, ]/g, '-')}`}
                      className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in">
          <Link
            href="/destinations"
            className="inline-flex items-center justify-center bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Explore All Destinations
          </Link>
        </div>
      </div>
    </section>
  )
}
