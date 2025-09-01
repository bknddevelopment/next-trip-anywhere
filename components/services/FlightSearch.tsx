'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Calendar, Users } from 'lucide-react'

export default function FlightSearch() {
  const [tripType, setTripType] = useState('roundtrip')

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-t-2xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Search Flights</h2>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="roundtrip"
                  checked={tripType === 'roundtrip'}
                  onChange={(e) => setTripType(e.target.value)}
                  className="mr-2"
                />
                <span>Round Trip</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="oneway"
                  checked={tripType === 'oneway'}
                  onChange={(e) => setTripType(e.target.value)}
                  className="mr-2"
                />
                <span>One Way</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="multicity"
                  checked={tripType === 'multicity'}
                  onChange={(e) => setTripType(e.target.value)}
                  className="mr-2"
                />
                <span>Multi-City</span>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-b-2xl shadow-xl p-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 mr-1 text-primary-500" />
                    From
                  </label>
                  <input
                    type="text"
                    placeholder="City or Airport Code"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 mr-1 text-primary-500" />
                    To
                  </label>
                  <input
                    type="text"
                    placeholder="City or Airport Code"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 mr-1 text-primary-500" />
                    Departure Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {tripType === 'roundtrip' && (
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 mr-1 text-primary-500" />
                      Return Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                )}

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 mr-1 text-primary-500" />
                    Passengers & Class
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option>1 Adult, Economy</option>
                    <option>2 Adults, Economy</option>
                    <option>2 Adults, Business</option>
                    <option>Custom</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">Direct flights only</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">Flexible dates (±3 days)</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">Include nearby airports</span>
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>Search Flights & Get Expert Quote</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
