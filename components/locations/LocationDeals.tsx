'use client'

import { motion } from 'framer-motion'
import { TrendingDown, Calendar, MapPin } from 'lucide-react'

interface LocationData {
  city: string
  shortName: string
}

interface LocationDealsProps {
  location: LocationData
}

const getDealsForLocation = (city: string) => {
  // In a real app, this would fetch location-specific deals
  const baseDeals = [
    {
      type: 'Flight',
      route: `${city} to Miami`,
      price: 'From $149',
      savings: 'Save $100',
      dates: 'Jan - Mar 2025',
      airline: 'American Airlines',
    },
    {
      type: 'Cruise',
      route: '7-Night Caribbean',
      price: 'From $599',
      savings: 'Save $300',
      dates: 'Multiple Dates',
      airline: 'Royal Caribbean',
    },
    {
      type: 'Package',
      route: 'Cancun All-Inclusive',
      price: 'From $799',
      savings: 'Save $400',
      dates: 'Feb - Apr 2025',
      airline: 'Flight + Resort',
    },
    {
      type: 'Flight',
      route: `${city} to Las Vegas`,
      price: 'From $198',
      savings: 'Save $150',
      dates: 'Year Round',
      airline: 'Southwest Airlines',
    },
    {
      type: 'Package',
      route: 'Orlando Theme Parks',
      price: 'From $999',
      savings: 'Save $500',
      dates: 'Spring Break 2025',
      airline: 'Flight + Hotel + Tickets',
    },
    {
      type: 'Cruise',
      route: '5-Night Bahamas',
      price: 'From $449',
      savings: 'Save $200',
      dates: 'Weekly Departures',
      airline: 'Carnival Cruise Line',
    },
  ]

  return baseDeals
}

export default function LocationDeals({ location }: LocationDealsProps) {
  const deals = getDealsForLocation(location.shortName)

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
            Exclusive Deals from <span className="text-gradient">{location.city}</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Special rates negotiated for {location.shortName} travelers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {deals.map((deal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    deal.type === 'Flight'
                      ? 'bg-primary-100 text-primary-700'
                      : deal.type === 'Cruise'
                        ? 'bg-secondary-100 text-secondary-700'
                        : 'bg-accent-100 text-accent-700'
                  }`}
                >
                  {deal.type}
                </span>
                <span className="text-accent-600 font-bold">{deal.savings}</span>
              </div>

              <h3 className="text-lg font-bold text-navy mb-2">{deal.route}</h3>
              <p className="text-sm text-gray-600 mb-4">{deal.airline}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <TrendingDown className="w-4 h-4 mr-2 text-accent-500" />
                  <span className="text-xl font-bold text-primary-500">{deal.price}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-secondary-500" />
                  {deal.dates}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-primary-500" />
                  Departing from {location.shortName}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Book This Deal
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">
            These are just a sample of our {location.shortName} deals. Contact us for personalized
            offers.
          </p>
          <button className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
            See All {location.city} Deals
          </button>
        </motion.div>
      </div>
    </section>
  )
}
