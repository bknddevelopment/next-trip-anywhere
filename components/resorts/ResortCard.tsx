'use client'

import { Resort } from '@/lib/data/all-inclusive-resorts'
import { formatPriceRange } from '@/lib/utils/resortFilters'
import OptimizedImage from '@/components/ui/OptimizedImage'

interface ResortCardProps {
  resort: Resort
  onCompare?: (resort: Resort) => void
  isComparing?: boolean
}

export default function ResortCard({ resort, onCompare, isComparing }: ResortCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-400 to-cyan-300">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-4xl mb-2">🏝️</div>
            <div className="text-sm font-medium">{resort.destination}</div>
          </div>
        </div>
        {resort.category === 'adults-only' && (
          <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Adults Only
          </div>
        )}
        {resort.category === 'luxury' && (
          <div className="absolute top-4 right-4 bg-gold-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Luxury
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{resort.name}</h3>
          <p className="text-sm text-gray-600">
            {resort.location}, {resort.destination}
          </p>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center">
            <span className="text-yellow-500">{'★'.repeat(Math.floor(resort.rating))}</span>
            {resort.rating % 1 !== 0 && <span className="text-yellow-500">☆</span>}
            <span className="ml-1 text-sm font-semibold text-gray-700">{resort.rating}</span>
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-semibold">{resort.reviewScore}/10</span>
            <span className="ml-1">({resort.reviewCount.toLocaleString()} reviews)</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-xs text-gray-600">Flight</div>
            <div className="text-sm font-semibold text-gray-900">{resort.flightTime}h</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-xs text-gray-600">Restaurants</div>
            <div className="text-sm font-semibold text-gray-900">{resort.restaurants}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-xs text-gray-600">Pools</div>
            <div className="text-sm font-semibold text-gray-900">{resort.pools}</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{resort.description}</p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1 mb-4">
          {resort.highlights.slice(0, 3).map((highlight, index) => (
            <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
              {highlight}
            </span>
          ))}
        </div>

        {/* Amenities Icons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {resort.beachfront && (
            <span className="text-xs text-gray-600 flex items-center">
              <span className="mr-1">🏖️</span> Beach
            </span>
          )}
          {resort.amenities.includes('Spa') && (
            <span className="text-xs text-gray-600 flex items-center">
              <span className="mr-1">💆</span> Spa
            </span>
          )}
          {resort.amenities.includes('Golf Course') && (
            <span className="text-xs text-gray-600 flex items-center">
              <span className="mr-1">⛳</span> Golf
            </span>
          )}
          {resort.amenities.includes('Kids Club') && (
            <span className="text-xs text-gray-600 flex items-center">
              <span className="mr-1">👶</span> Kids Club
            </span>
          )}
          {resort.amenities.includes('Casino') && (
            <span className="text-xs text-gray-600 flex items-center">
              <span className="mr-1">🎰</span> Casino
            </span>
          )}
        </div>

        {/* Price */}
        <div className="border-t pt-4">
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-xs text-gray-600 mb-1">Starting from</p>
              <p className="text-2xl font-bold text-gray-900">
                ${resort.priceRange.min.toLocaleString()}
              </p>
              <p className="text-xs text-gray-600">per person (7 nights)</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">{formatPriceRange(resort)}</p>
            </div>
          </div>

          {/* Current Deals */}
          {resort.currentDeals && resort.currentDeals.length > 0 && (
            <div className="mb-3">
              {resort.currentDeals.slice(0, 1).map((deal, index) => (
                <div key={index} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                  🎉 {deal}
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <a
              href="tel:833-874-1019"
              className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
            >
              Call to Book
            </a>
            {onCompare && (
              <button
                onClick={() => onCompare(resort)}
                className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-colors ${
                  isComparing
                    ? 'bg-blue-100 text-blue-700 border-blue-300'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {isComparing ? '✓' : '⚖️'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
