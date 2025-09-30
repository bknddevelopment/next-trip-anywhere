'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plane, Ship, Package, Hotel, Search, ArrowRight } from 'lucide-react'

const searchTabs = [
  { id: 'flights', name: 'Flights', icon: Plane, description: 'Find the best flight deals' },
  {
    id: 'cruises',
    name: 'Cruises',
    icon: Ship,
    description: 'Explore amazing cruise destinations',
  },
  {
    id: 'packages',
    name: 'Packages',
    icon: Package,
    description: 'All-inclusive vacation packages',
  },
  { id: 'hotels', name: 'Hotels', icon: Hotel, description: 'Book comfortable accommodations' },
]

export default function SearchSection() {
  const [activeTab, setActiveTab] = useState('flights')

  const handleGetQuote = () => {
    // Redirect to Google Forms
    window.location.href =
      'https://docs.google.com/forms/d/e/1FAIpQLSe5Wy5yxW42FXTyFDsBPK7A0eqqcP_XKYCf-PHhd9vmlfvVWQ/viewform'
  }

  const currentTab = searchTabs.find((tab) => tab.id === activeTab)

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

          {/* Search CTA Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center">
              {currentTab && (
                <div className="mb-8">
                  <currentTab.icon className="w-16 h-16 text-primary-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-navy mb-2">
                    {currentTab.name === 'Flights' && 'Book Your Next Flight'}
                    {currentTab.name === 'Cruises' && 'Find Your Dream Cruise'}
                    {currentTab.name === 'Packages' && 'Discover Perfect Vacation Packages'}
                    {currentTab.name === 'Hotels' && 'Reserve Your Ideal Hotel'}
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    {currentTab.description}. Our travel experts will help you find the best options
                    and prices for your trip.
                  </p>
                </div>
              )}

              {/* Key Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">20+</div>
                  <div className="text-sm text-gray-600">Years of Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">24/7</div>
                  <div className="text-sm text-gray-600">Customer Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">100%</div>
                  <div className="text-sm text-gray-600">Best Price Guarantee</div>
                </div>
              </div>

              {/* CTA Button */}
              <motion.button
                onClick={handleGetQuote}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>Get Your Free Personalized Quote</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <p className="text-sm text-gray-500 mt-4">
                Takes only 2 minutes • No obligation • Expert travel planning
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
