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
    { destination: 'Orlando (MCO)', availability: 'Daily Flights' },
    { destination: 'Fort Lauderdale (FLL)', availability: 'Multiple Daily' },
    { destination: 'Los Angeles (LAX)', availability: 'Non-stop Available' },
    { destination: 'Las Vegas (LAS)', availability: 'Direct Flights' },
    { destination: 'Miami (MIA)', availability: 'Frequent Service' },
  ]

  const cruises = [
    { name: 'Caribbean (7 days)', offer: 'Group Rates Available' },
    { name: 'Bermuda (5 days)', offer: 'Special Promotions' },
    { name: 'Bahamas (3 days)', offer: 'Last Minute Deals' },
    { name: 'Alaska (7 days)', offer: 'Premium Packages' },
    { name: 'Mediterranean (10 days)', offer: 'All-Inclusive Options' },
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
                      <span className="text-blue-600 font-medium">{route.availability}</span>
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
                      <span className="text-blue-600 font-medium">{cruise.offer}</span>
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
