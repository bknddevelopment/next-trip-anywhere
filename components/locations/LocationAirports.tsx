'use client'

import { motion } from 'framer-motion'
import { Plane, Clock, Car, Train } from 'lucide-react'

interface LocationData {
  city: string
  shortName: string
  airports: Array<{ code: string; name: string; distance: string }>
  cruisePorts?: Array<{ name: string; location: string }>
}

interface LocationAirportsProps {
  location: LocationData
}

export default function LocationAirports({ location }: LocationAirportsProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-navy text-center mb-12">
            Airports & Departure Points
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {location.airports.map((airport, index) => (
              <motion.div
                key={airport.code}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-warm-50 rounded-xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-navy">{airport.code}</h3>
                    <p className="text-gray-700">{airport.name}</p>
                  </div>
                  <Plane className="w-8 h-8 text-primary-500" />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Car className="w-4 h-4 mr-2" />
                    {airport.distance}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    Check-in 2 hours before flight
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Train className="w-4 h-4 mr-2" />
                    Public transit available
                  </div>
                </div>

                <button className="mt-4 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                  View airport guide →
                </button>
              </motion.div>
            ))}
          </div>

          {location.cruisePorts && location.cruisePorts.length > 0 && (
            <>
              <h3 className="text-2xl font-bold text-navy text-center mb-8">
                Cruise Departure Ports
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {location.cruisePorts.map((port, index) => (
                  <motion.div
                    key={port.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-secondary-50 rounded-xl p-6"
                  >
                    <h4 className="text-lg font-bold text-navy mb-2">{port.name}</h4>
                    <p className="text-gray-600 text-sm mb-3">{port.location}</p>

                    <div className="space-y-1 text-sm text-gray-600">
                      <p>• Parking available on-site</p>
                      <p>• Luggage porters provided</p>
                      <p>• Arrive 2 hours before sailing</p>
                    </div>

                    <button className="mt-4 text-secondary-600 font-semibold hover:text-secondary-700 transition-colors">
                      Port information →
                    </button>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
