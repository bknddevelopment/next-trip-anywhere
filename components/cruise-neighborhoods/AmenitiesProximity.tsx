'use client'

import { DeckAmenity } from '@/lib/data/cruise-neighborhoods'

interface AmenitiesProximityProps {
  amenities: DeckAmenity[]
}

export default function AmenitiesProximity({ amenities }: AmenitiesProximityProps) {
  const getWalkingTimeColor = (distance: string) => {
    if (distance.includes('view') || distance.includes('neighborhood')) {
      return 'bg-green-100 text-green-800'
    }
    if (distance.includes('30 seconds') || distance.includes('1 minute')) {
      return 'bg-blue-100 text-blue-800'
    }
    if (distance.includes('2-3') || distance.includes('3-4')) {
      return 'bg-yellow-100 text-yellow-800'
    }
    return 'bg-gray-100 text-gray-800'
  }

  const getWalkingIcon = (distance: string) => {
    if (distance.includes('view') || distance.includes('neighborhood')) {
      return '👁️'
    }
    if (distance.includes('seconds')) {
      return '🚶‍♂️'
    }
    if (distance.includes('minute')) {
      return '🚶‍♂️'
    }
    return '🚶‍♂️'
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {amenities.map((amenity, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg text-gray-900">{amenity.name}</h3>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getWalkingTimeColor(
                amenity.walkingDistance
              )}`}
            >
              {getWalkingIcon(amenity.walkingDistance)} {amenity.walkingDistance}
            </span>
          </div>
          <div className="text-sm text-gray-600 mb-2">{amenity.deck}</div>
          <p className="text-gray-700">{amenity.description}</p>
        </div>
      ))}
    </div>
  )
}
