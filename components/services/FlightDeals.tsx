'use client'

import { DynamicMotion as motion } from '@/lib/dynamicMotion'
import { TrendingDown, Clock, Star } from 'lucide-react'

const popularRoutes = [
  {
    from: 'New York',
    to: 'London',
    description: 'Direct flights available daily',
    type: 'International',
  },
  {
    from: 'Boston',
    to: 'Paris',
    description: 'Multiple airlines and options',
    type: 'International',
  },
  {
    from: 'Miami',
    to: 'Caribbean',
    description: 'Short flights to paradise',
    type: 'Caribbean',
  },
  {
    from: 'Washington DC',
    to: 'Los Angeles',
    description: 'Coast to coast connections',
    type: 'Domestic',
  },
  {
    from: 'Major Cities',
    to: 'Asia',
    description: 'Premium routes to Tokyo, Seoul',
    type: 'International',
  },
  {
    from: 'East Coast',
    to: 'Europe',
    description: 'Direct connections available',
    type: 'International',
  },
]

export default function FlightDeals() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-warm-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-navy mb-4">
            Popular <span className="text-gradient">Flight Routes</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert travel planning for your next adventure. We find the best flights and handle all
            the details.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularRoutes.map((route, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="mb-4">
                  <span className="inline-block bg-primary-100 text-primary-700 text-xs font-medium px-2 py-1 rounded-full mb-3">
                    {route.type}
                  </span>
                  <h3 className="text-lg font-bold text-navy">{route.from}</h3>
                  <p className="text-sm text-gray-600">to</p>
                  <h3 className="text-lg font-bold text-navy">{route.to}</h3>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                    {route.description}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-secondary-500" />
                    Multiple departure times
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <TrendingDown className="w-4 h-4 mr-2 text-accent-500" />
                    Exclusive rates available
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Get Quote
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Planning a Different Route?</h3>
          <p className="mb-6 max-w-2xl mx-auto">
            We specialize in finding the best flights to any destination. Our travel experts have
            access to special fares and can help plan your perfect trip from anywhere to anywhere.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-secondary-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Custom Flight Quote
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
