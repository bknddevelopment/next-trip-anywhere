import React from 'react'
import { Building2, MapPin, Star } from 'lucide-react'

interface LocalLandmarksProps {
  location: string
  landmarks?: Array<{
    name: string
    description: string
    distance?: string
  }>
}

const LocalLandmarks: React.FC<LocalLandmarksProps> = ({ location, landmarks = [] }) => {
  const defaultLandmarks = [
    {
      name: 'Historic Downtown',
      description: `Explore the charming historic district of ${location}`,
      distance: '5 miles',
    },
    {
      name: 'Local Museums',
      description: 'Discover the rich cultural heritage of the area',
      distance: '10 miles',
    },
    {
      name: 'Scenic Parks',
      description: 'Beautiful parks and outdoor recreation areas',
      distance: '15 miles',
    },
  ]

  const displayLandmarks = landmarks.length > 0 ? landmarks : defaultLandmarks

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Landmarks Near {location}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {displayLandmarks.map((landmark, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start mb-4">
                <Building2 className="w-6 h-6 text-primary-500 mr-3 mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{landmark.name}</h3>
                  <p className="text-gray-600 mb-2">{landmark.description}</p>
                  {landmark.distance && (
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{landmark.distance}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LocalLandmarks
