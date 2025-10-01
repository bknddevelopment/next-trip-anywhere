'use client'

import { DynamicMotion as motion } from '@/lib/dynamicMotion'
import { Calendar, MapPin, Snowflake, Sun, Leaf, Flower } from 'lucide-react'

interface SeasonalHighlight {
  season: string
  description: string
  destinations: string[]
}

interface LocationSeasonalHighlightsProps {
  highlights: SeasonalHighlight[]
  city: string
}

const seasonIcons = {
  Spring: Flower,
  Summer: Sun,
  Fall: Leaf,
  Winter: Snowflake,
}

const seasonColors = {
  Spring: 'from-green-400 to-green-600',
  Summer: 'from-yellow-400 to-orange-500',
  Fall: 'from-orange-400 to-red-500',
  Winter: 'from-blue-400 to-blue-600',
}

export default function LocationSeasonalHighlights({
  highlights,
  city,
}: LocationSeasonalHighlightsProps) {
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
          <h2 className="text-3xl font-bold text-navy mb-4">
            Best Times to Travel from <span className="text-gradient">{city}</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Seasonal travel insights and destination recommendations tailored for {city} travelers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {highlights.map((highlight, index) => {
            const IconComponent =
              seasonIcons[highlight.season as keyof typeof seasonIcons] || Calendar
            const colorClass =
              seasonColors[highlight.season as keyof typeof seasonColors] ||
              'from-gray-400 to-gray-600'

            return (
              <motion.div
                key={highlight.season}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-navy">{highlight.season}</h3>
                  <div className={`p-3 rounded-full bg-gradient-to-r ${colorClass}`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {highlight.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="font-medium">Top Destinations:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {highlight.destinations.slice(0, 4).map((destination) => (
                      <span
                        key={destination}
                        className={`px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${colorClass}`}
                      >
                        {destination}
                      </span>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full mt-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r ${colorClass} hover:shadow-lg transition-all duration-300`}
                >
                  View {highlight.season} Deals
                </motion.button>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-navy mb-4">Year-Round Travel Expertise</h3>
            <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
              Our {city} travel specialists understand seasonal trends, weather patterns, and the
              best times to visit destinations worldwide. We'll help you find the perfect trip at
              the perfect time.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                <span className="text-sm font-semibold text-gray-700">🌡️ Climate Experts</span>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                <span className="text-sm font-semibold text-gray-700">📅 Seasonal Pricing</span>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                <span className="text-sm font-semibold text-gray-700">🎯 Perfect Timing</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
