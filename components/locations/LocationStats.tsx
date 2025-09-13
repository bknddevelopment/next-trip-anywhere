'use client'

import { motion } from 'framer-motion'

interface LocationStatsProps {
  stats: {
    yearsServing: number
    happyTravelers: string
    priceMatchGuarantee: boolean
    support: string
  }
  city: string
}

export default function LocationStats({ stats, city }: LocationStatsProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-navy to-blue-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            Trusted by <span className="text-gradient-light">{city}</span> Since Day One
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Our track record speaks for itself - delivering exceptional travel experiences to your
            community
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
          >
            <div className="text-4xl font-bold mb-2 text-primary-200">{stats.yearsServing}+</div>
            <div className="text-sm opacity-90">Years Serving {city}</div>
            <div className="mt-2 text-xs opacity-75">Established local presence</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
          >
            <div className="text-4xl font-bold mb-2 text-secondary-200">{stats.happyTravelers}</div>
            <div className="text-sm opacity-90">Happy {city} Travelers</div>
            <div className="mt-2 text-xs opacity-75">And growing every day</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
          >
            <div className="text-4xl font-bold mb-2 text-accent-200">{stats.support}</div>
            <div className="text-sm opacity-90">Travel Support</div>
            <div className="mt-2 text-xs opacity-75">Always here when you need us</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
          >
            <div className="text-4xl font-bold mb-2 text-green-300">100%</div>
            <div className="text-sm opacity-90">Exclusive Travel Deals</div>
            <div className="mt-2 text-xs opacity-75">Insider rates & perks</div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex flex-wrap justify-center gap-6 text-sm opacity-75">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Licensed & Bonded Agency</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Avoya Travel Network Partner</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>15+ Years Experience</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
