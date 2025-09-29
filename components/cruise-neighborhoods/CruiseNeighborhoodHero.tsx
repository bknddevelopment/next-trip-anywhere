'use client'

import { CruiseNeighborhood } from '@/lib/data/cruise-neighborhoods'

interface CruiseNeighborhoodHeroProps {
  neighborhood: CruiseNeighborhood
}

export default function CruiseNeighborhoodHero({ neighborhood }: CruiseNeighborhoodHeroProps) {
  const getCruiseLineColor = () => {
    switch (neighborhood.cruiseLine) {
      case 'royal-caribbean':
        return 'from-blue-600 to-blue-800'
      case 'carnival':
        return 'from-red-600 to-red-800'
      case 'norwegian':
        return 'from-indigo-600 to-purple-700'
      case 'celebrity':
        return 'from-gray-700 to-black'
      case 'princess':
        return 'from-teal-600 to-teal-800'
      case 'msc':
        return 'from-blue-700 to-yellow-600'
      case 'disney':
        return 'from-red-600 to-yellow-500'
      default:
        return 'from-blue-600 to-purple-600'
    }
  }

  const formatCruiseLine = (line: string) => {
    return line
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <section
      className={`bg-gradient-to-r ${getCruiseLineColor()} text-white relative overflow-hidden`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <a href="/" className="text-white/70 hover:text-white transition">
                  Home
                </a>
              </li>
              <li className="text-white/50">/</li>
              <li>
                <a href="/guides" className="text-white/70 hover:text-white transition">
                  Guides
                </a>
              </li>
              <li className="text-white/50">/</li>
              <li>
                <a
                  href="/guides/cruise-neighborhoods"
                  className="text-white/70 hover:text-white transition"
                >
                  Cruise Neighborhoods
                </a>
              </li>
              <li className="text-white/50">/</li>
              <li className="text-white">{neighborhood.neighborhoodName}</li>
            </ol>
          </nav>

          {/* Ship and Cruise Line Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
              {formatCruiseLine(neighborhood.cruiseLine)}
            </span>
            <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
              {neighborhood.shipClass}
            </span>
            <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
              {neighborhood.priority} PRIORITY
            </span>
            {neighborhood.searchVolume && (
              <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                {neighborhood.searchVolume.toLocaleString()}+ searches/month
              </span>
            )}
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {neighborhood.hero.headline}
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl opacity-90 mb-8">{neighborhood.hero.subheadline}</p>

          {/* Key Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
              <span className="text-sm opacity-75 block">Ship</span>
              <div className="font-semibold">{neighborhood.shipName}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
              <span className="text-sm opacity-75 block">Neighborhood</span>
              <div className="font-semibold">{neighborhood.neighborhoodName}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
              <span className="text-sm opacity-75 block">Decks</span>
              <div className="font-semibold">{neighborhood.deckNumbers.join(', ')}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
              <span className="text-sm opacity-75 block">Departure Port</span>
              <div className="font-semibold">Cape Liberty</div>
            </div>
          </div>

          {/* Highlights */}
          <div className="grid md:grid-cols-2 gap-3">
            {neighborhood.hero.highlights.map((highlight, index) => (
              <div key={index} className="flex items-center">
                <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-lg">{highlight}</span>
              </div>
            ))}
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="tel:833-874-1019"
              className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call 833-874-1019
            </a>
            <a
              href="#booking-tips"
              className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full font-semibold hover:bg-white/30 transition"
            >
              View Booking Tips
            </a>
            <a
              href="#faqs"
              className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full font-semibold hover:bg-white/30 transition"
            >
              Read FAQs
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
