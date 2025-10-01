'use client'

import { DynamicMotion as motion } from '@/lib/dynamicMotion'
import { MapPin, Plane, Ship } from 'lucide-react'

interface LocationData {
  city: string
  shortName: string
  airports: Array<{ code: string; name: string; distance: string }>
  cruisePorts?: Array<{ name: string; location: string }>
  popularDestinations: string[]
  localAreas: string[]
}

interface LocationHeroProps {
  location: LocationData
}

export default function LocationHero({ location }: LocationHeroProps) {
  return (
    <section className="relative pt-32 pb-20 bg-gradient-to-br from-navy-50 via-white to-primary-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-6">
            <MapPin className="w-10 h-10 text-primary-500" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-navy mb-6">
            Travel from <span className="text-gradient">{location.city}</span>
          </h1>

          <p className="text-xl text-gray-700 mb-8">
            Your local travel experts for {location.shortName} and the surrounding areas. Best deals
            on flights, cruises, and vacation packages departing from {location.city}.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-lg p-6 shadow-md">
              <Plane className="w-8 h-8 text-primary-500 mx-auto mb-3" />
              <h3 className="font-semibold text-navy mb-2">{location.airports.length} Airports</h3>
              <p className="text-sm text-gray-600">
                {location.airports.map((a) => a.code).join(', ')}
              </p>
            </motion.div>

            {location.cruisePorts && location.cruisePorts.length > 0 && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-6 shadow-md"
              >
                <Ship className="w-8 h-8 text-secondary-500 mx-auto mb-3" />
                <h3 className="font-semibold text-navy mb-2">Cruise Ports</h3>
                <p className="text-sm text-gray-600">
                  {location.cruisePorts.length} departure{' '}
                  {location.cruisePorts.length === 1 ? 'port' : 'ports'}
                </p>
              </motion.div>
            )}

            <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-lg p-6 shadow-md">
              <MapPin className="w-8 h-8 text-accent-500 mx-auto mb-3" />
              <h3 className="font-semibold text-navy mb-2">Service Areas</h3>
              <p className="text-sm text-gray-600">{location.localAreas.length}+ neighborhoods</p>
            </motion.div>
          </div>

          <div className="mt-12">
            <p className="text-sm text-gray-600 mb-3">
              Popular destinations from {location.shortName}:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {location.popularDestinations.map((dest) => (
                <span
                  key={dest}
                  className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                >
                  {dest}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
