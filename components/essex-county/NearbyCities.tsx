/**
 * Lazy-loaded Nearby Cities Component
 * Optimized with React.memo and minimal props
 */

import React from 'react'
import Link from 'next/link'

interface City {
  slug: string
  name: string
  population: number
}

interface NearbyCitiesProps {
  currentCity: string
  cities: readonly City[]
}

const NearbyCities: React.FC<NearbyCitiesProps> = React.memo(({ currentCity, cities }) => {
  const nearbyCities = cities.filter((c) => c.slug !== currentCity)

  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">We Also Serve Nearby Communities</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {nearbyCities.map((nearbyCity) => (
              <Link
                key={nearbyCity.slug}
                href={`/locations/essex-county/${nearbyCity.slug}`}
                className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
                prefetch={false}
              >
                <h3 className="font-semibold text-gray-800">{nearbyCity.name}</h3>
                <p className="text-sm text-gray-600">
                  {nearbyCity.population.toLocaleString()} residents
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})

NearbyCities.displayName = 'NearbyCities'

export default NearbyCities
