'use client'

import { motion } from 'framer-motion'
import { Package, Plane, Hotel, Car, Utensils } from 'lucide-react'

export default function PackageHero() {
  return (
    <section className="relative pt-32 pb-20 bg-gradient-to-br from-accent-50 via-warm-50 to-primary-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-6">
            <Package className="w-10 h-10 text-accent-500" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-navy mb-6">
            All-Inclusive <span className="text-gradient">Vacation Packages</span>
          </h1>

          <p className="text-xl text-gray-700 mb-8">
            Everything you need in one perfect package. Flights, hotels, transfers, and activities
            bundled together for maximum savings and minimum stress.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-lg p-4 shadow-md">
              <Plane className="w-8 h-8 text-primary-500 mx-auto mb-2" />
              <h3 className="font-semibold text-navy">Flights</h3>
              <p className="text-sm text-gray-600">Included</p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-lg p-4 shadow-md">
              <Hotel className="w-8 h-8 text-secondary-500 mx-auto mb-2" />
              <h3 className="font-semibold text-navy">Hotels</h3>
              <p className="text-sm text-gray-600">4-5 Star</p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-lg p-4 shadow-md">
              <Car className="w-8 h-8 text-accent-500 mx-auto mb-2" />
              <h3 className="font-semibold text-navy">Transfers</h3>
              <p className="text-sm text-gray-600">Airport & Tours</p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-lg p-4 shadow-md">
              <Utensils className="w-8 h-8 text-primary-500 mx-auto mb-2" />
              <h3 className="font-semibold text-navy">Meals</h3>
              <p className="text-sm text-gray-600">All-Inclusive</p>
            </motion.div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-2xl font-bold text-accent-600 mb-2">Save up to 50%</p>
            <p className="text-gray-600">When you bundle everything together</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
