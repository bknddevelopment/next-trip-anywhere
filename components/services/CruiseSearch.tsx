'use client'

import { useState } from 'react'
import { DynamicMotion as motion } from '@/lib/dynamicMotion'
import { Search, Anchor, Calendar, Users, Globe, Ship } from 'lucide-react'

export default function CruiseSearch() {
  const [selectedDestination, setSelectedDestination] = useState('caribbean')

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
          <div className="bg-gradient-to-r from-secondary-500 to-blue-500 rounded-t-2xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Find Your Perfect Cruise</h2>

            <div className="flex flex-wrap gap-2">
              {['Caribbean', 'Bahamas', 'Europe', 'Alaska', 'Mexico', 'Bermuda'].map((dest) => (
                <button
                  key={dest}
                  onClick={() => setSelectedDestination(dest.toLowerCase())}
                  className={`px-4 py-2 rounded-full transition-all ${
                    selectedDestination === dest.toLowerCase()
                      ? 'bg-white text-secondary-600'
                      : 'bg-white/20 hover:bg-white/30'
                  }`}
                >
                  {dest}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-b-2xl shadow-xl p-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Anchor className="w-4 h-4 mr-1 text-secondary-500" />
                    Departure Port
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent">
                    <option>Any Port</option>
                    <option>Miami, FL</option>
                    <option>Fort Lauderdale, FL</option>
                    <option>Port Canaveral, FL</option>
                    <option>New York, NY</option>
                    <option>Boston, MA</option>
                    <option>Baltimore, MD</option>
                    <option>Charleston, SC</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Ship className="w-4 h-4 mr-1 text-secondary-500" />
                    Cruise Line
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent">
                    <option>Any Cruise Line</option>
                    <option>Royal Caribbean</option>
                    <option>Carnival</option>
                    <option>Norwegian</option>
                    <option>Celebrity</option>
                    <option>Disney</option>
                    <option>Princess</option>
                    <option>Holland America</option>
                    <option>MSC Cruises</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 mr-1 text-secondary-500" />
                    Departure Month
                  </label>
                  <input
                    type="month"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Globe className="w-4 h-4 mr-1 text-secondary-500" />
                    Cruise Length
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent">
                    <option>Any Length</option>
                    <option>2-5 Days</option>
                    <option>6-9 Days</option>
                    <option>10-14 Days</option>
                    <option>15+ Days</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 mr-1 text-secondary-500" />
                    Guests
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent">
                    <option>2 Guests</option>
                    <option>1 Guest</option>
                    <option>3 Guests</option>
                    <option>4 Guests</option>
                    <option>5+ Guests</option>
                  </select>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>Search Cruises & Get Quote</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
