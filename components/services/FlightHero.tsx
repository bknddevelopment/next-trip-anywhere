'use client'

import { DynamicMotion as motion } from '@/lib/dynamicMotion'
import { Plane, TrendingDown, Shield, Clock } from 'lucide-react'

export default function FlightHero() {
  return (
    <section className="relative pt-32 pb-20 bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-6">
            <Plane className="w-10 h-10 text-primary-500" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-navy mb-6">
            Book <span className="text-gradient">Flights</span> with Confidence
          </h1>

          <p className="text-xl text-gray-700 mb-8">
            Access exclusive airline contracts and unpublished fares. Our experts find routes and
            deals you won&apos;t see on public booking sites.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-lg p-4 shadow-md">
              <TrendingDown className="w-8 h-8 text-accent-500 mx-auto mb-2" />
              <h3 className="font-semibold text-navy">Save up to 40%</h3>
              <p className="text-sm text-gray-600">On international flights</p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-lg p-4 shadow-md">
              <Shield className="w-8 h-8 text-primary-500 mx-auto mb-2" />
              <h3 className="font-semibold text-navy">Travel Protection</h3>
              <p className="text-sm text-gray-600">Comprehensive travel insurance</p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-lg p-4 shadow-md">
              <Clock className="w-8 h-8 text-secondary-500 mx-auto mb-2" />
              <h3 className="font-semibold text-navy">24/7 Support</h3>
              <p className="text-sm text-gray-600">Help with cancellations & changes</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
