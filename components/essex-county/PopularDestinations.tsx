/**
 * Lazy-loaded Popular Destinations Component
 * Optimized for performance with minimal re-renders
 */

import React from 'react'

interface PopularDestinationsProps {
  cityName: string
}

const PopularDestinations: React.FC<PopularDestinationsProps> = React.memo(({ cityName }) => {
  // Static data to prevent re-computation
  const flightRoutes = [
    { destination: 'Orlando (MCO)', price: 'from $89' },
    { destination: 'Fort Lauderdale (FLL)', price: 'from $79' },
    { destination: 'Los Angeles (LAX)', price: 'from $149' },
    { destination: 'Las Vegas (LAS)', price: 'from $139' },
    { destination: 'Miami (MIA)', price: 'from $99' },
  ]

  const cruises = [
    { name: 'Caribbean (7 days)', price: 'from $599' },
    { name: 'Bermuda (5 days)', price: 'from $449' },
    { name: 'Bahamas (3 days)', price: 'from $299' },
    { name: 'Alaska (7 days)', price: 'from $799' },
    { name: 'Mediterranean (10 days)', price: 'from $1,299' },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Destinations from {cityName}
          </h2>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-xl mb-4">Top Flight Routes</h3>
                <ul className="space-y-2 text-gray-700">
                  {flightRoutes.map((route, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>{route.destination}</span>
                      <span className="text-blue-600 font-medium">{route.price}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-4">Popular Cruises</h3>
                <ul className="space-y-2 text-gray-700">
                  {cruises.map((cruise, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>{cruise.name}</span>
                      <span className="text-blue-600 font-medium">{cruise.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

PopularDestinations.displayName = 'PopularDestinations'

export default PopularDestinations
