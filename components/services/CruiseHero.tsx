'use client'

import { motion } from 'framer-motion'
import { Ship, Anchor, Globe, Utensils } from 'lucide-react'

export default function CruiseHero() {
  return (
    <section className="relative pt-32 pb-20 bg-gradient-to-br from-secondary-50 via-blue-50 to-primary-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-6">
            <Ship className="w-10 h-10 text-secondary-500" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-navy mb-6">
            Unforgettable <span className="text-gradient">Cruise</span> Vacations
          </h1>

          <p className="text-xl text-gray-700 mb-8">
            From weekend getaways to world cruises. Exclusive group rates, onboard credits, and free
            upgrades available on all major cruise lines.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-lg p-4 shadow-md">
              <Anchor className="w-8 h-8 text-secondary-500 mx-auto mb-2" />
              <h3 className="font-semibold text-navy">All Ports</h3>
              <p className="text-sm text-gray-600">East Coast departures</p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-lg p-4 shadow-md">
              <Globe className="w-8 h-8 text-primary-500 mx-auto mb-2" />
              <h3 className="font-semibold text-navy">300+ Ships</h3>
              <p className="text-sm text-gray-600">All cruise lines</p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-lg p-4 shadow-md">
              <Utensils className="w-8 h-8 text-accent-500 mx-auto mb-2" />
              <h3 className="font-semibold text-navy">Free Perks</h3>
              <p className="text-sm text-gray-600">Dining & drinks</p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-lg p-4 shadow-md">
              <Ship className="w-8 h-8 text-secondary-500 mx-auto mb-2" />
              <h3 className="font-semibold text-navy">Group Rates</h3>
              <p className="text-sm text-gray-600">Extra savings</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
