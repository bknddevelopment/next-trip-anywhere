'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plane, Ship, Package, Hotel, Calendar, Users, MapPin, Search } from 'lucide-react'

const searchTabs = [
  { id: 'flights', name: 'Flights', icon: Plane },
  { id: 'cruises', name: 'Cruises', icon: Ship },
  { id: 'packages', name: 'Packages', icon: Package },
  { id: 'hotels', name: 'Hotels', icon: Hotel },
]

export default function SearchSection() {
  const [activeTab, setActiveTab] = useState('flights')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to contact page or trigger contact modal
    window.location.href = '/contact'
  }

  return (
    <section id="search-section" className="py-16 bg-gradient-to-b from-warm-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-navy mb-4">
            Find Your Perfect <span className="text-gradient">Getaway</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search flights, cruises, hotels, and vacation packages. Our experts will find you the
            best deals guaranteed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
            {/* Search Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {searchTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>

            {/* Search Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={handleSearch}>
                {activeTab === 'flights' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                          <MapPin className="w-4 h-4 mr-1 text-primary-500" />
                          From
                        </label>
                        <input
                          type="text"
                          placeholder="City or Airport"
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
                          placeholder="City or Airport"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="w-4 h-4 mr-1 text-primary-500" />
                          Departure
                        </label>
                        <input
                          type="date"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="w-4 h-4 mr-1 text-primary-500" />
                          Return
                        </label>
                        <input
                          type="date"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                          <Users className="w-4 h-4 mr-1 text-primary-500" />
                          Travelers
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                          <option>1 Adult</option>
                          <option>2 Adults</option>
                          <option>3 Adults</option>
                          <option>4 Adults</option>
                          <option>5+ Adults</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'cruises' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                          <MapPin className="w-4 h-4 mr-1 text-primary-500" />
                          Departure Port
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                          <option>Any Port</option>
                          <option>Miami, FL</option>
                          <option>Fort Lauderdale, FL</option>
                          <option>New York, NY</option>
                          <option>Boston, MA</option>
                          <option>Baltimore, MD</option>
                        </select>
                      </div>
                      <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                          <MapPin className="w-4 h-4 mr-1 text-primary-500" />
                          Destination
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                          <option>Any Destination</option>
                          <option>Caribbean</option>
                          <option>Bahamas</option>
                          <option>Mexico</option>
                          <option>Mediterranean</option>
                          <option>Alaska</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="w-4 h-4 mr-1 text-primary-500" />
                          Departure Month
                        </label>
                        <input
                          type="month"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                          <Ship className="w-4 h-4 mr-1 text-primary-500" />
                          Cruise Length
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                          <option>Any Length</option>
                          <option>3-5 Days</option>
                          <option>6-8 Days</option>
                          <option>9-12 Days</option>
                          <option>13+ Days</option>
                        </select>
                      </div>
                      <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                          <Users className="w-4 h-4 mr-1 text-primary-500" />
                          Travelers
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                          <option>1 Guest</option>
                          <option>2 Guests</option>
                          <option>3 Guests</option>
                          <option>4 Guests</option>
                          <option>5+ Guests</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'packages' && (
                  <div className="text-center py-8">
                    <Package className="w-16 h-16 text-primary-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-navy mb-2">
                      Custom Vacation Packages
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Let our experts create the perfect vacation package tailored to your dreams
                      and budget.
                    </p>
                  </div>
                )}

                {activeTab === 'hotels' && (
                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 mr-1 text-primary-500" />
                        Destination
                      </label>
                      <input
                        type="text"
                        placeholder="City, hotel, or attraction"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="w-4 h-4 mr-1 text-primary-500" />
                          Check-in
                        </label>
                        <input
                          type="date"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="w-4 h-4 mr-1 text-primary-500" />
                          Check-out
                        </label>
                        <input
                          type="date"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                          <Users className="w-4 h-4 mr-1 text-primary-500" />
                          Guests & Rooms
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                          <option>1 Room, 1 Guest</option>
                          <option>1 Room, 2 Guests</option>
                          <option>2 Rooms, 4 Guests</option>
                          <option>Custom</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Search className="w-5 h-5" />
                  <span>Search & Get Personalized Quote</span>
                </motion.button>
              </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
