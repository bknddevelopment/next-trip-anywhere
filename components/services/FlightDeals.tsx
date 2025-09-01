'use client'

import { motion } from 'framer-motion'
import { TrendingDown, Clock, Star } from 'lucide-react'

const deals = [
  {
    from: 'New York (JFK)',
    to: 'London (LHR)',
    airline: 'British Airways',
    price: '$398',
    savings: '$250',
    type: 'Round Trip',
    class: 'Economy',
    dates: 'Jan 15 - Feb 28',
  },
  {
    from: 'Boston (BOS)',
    to: 'Paris (CDG)',
    airline: 'Air France',
    price: '$445',
    savings: '$180',
    type: 'Round Trip',
    class: 'Economy',
    dates: 'Feb 1 - Mar 15',
  },
  {
    from: 'Miami (MIA)',
    to: 'Cancun (CUN)',
    airline: 'American Airlines',
    price: '$178',
    savings: '$120',
    type: 'Round Trip',
    class: 'Economy',
    dates: 'Flexible Dates',
  },
  {
    from: 'Washington DC (DCA)',
    to: 'Los Angeles (LAX)',
    airline: 'United Airlines',
    price: '$198',
    savings: '$150',
    type: 'Round Trip',
    class: 'Economy',
    dates: 'Jan 20 - Feb 10',
  },
  {
    from: 'NYC All Airports',
    to: 'Tokyo (NRT)',
    airline: 'ANA',
    price: '$698',
    savings: '$400',
    type: 'Round Trip',
    class: 'Economy',
    dates: 'Mar 1 - Apr 30',
  },
  {
    from: 'Boston (BOS)',
    to: 'Dublin (DUB)',
    airline: 'Aer Lingus',
    price: '$348',
    savings: '$200',
    type: 'Round Trip',
    class: 'Economy',
    dates: 'Feb 15 - Mar 31',
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
            Current <span className="text-gradient">Flight Deals</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Exclusive fares negotiated for our East Coast travelers. Prices include all taxes and
            fees.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500">{deal.airline}</p>
                    <h3 className="text-lg font-bold text-navy">{deal.from}</h3>
                    <p className="text-sm text-gray-600">to</p>
                    <h3 className="text-lg font-bold text-navy">{deal.to}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-primary-500">{deal.price}</p>
                    <p className="text-sm text-accent-600 font-semibold">Save {deal.savings}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <TrendingDown className="w-4 h-4 mr-2 text-accent-500" />
                    {deal.type} • {deal.class}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-secondary-500" />
                    {deal.dates}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                    Limited availability
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Book This Deal
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
          <h3 className="text-2xl font-bold mb-4">Can&apos;t Find Your Route?</h3>
          <p className="mb-6 max-w-2xl mx-auto">
            These are just a sample of our deals. We have access to unpublished fares and special
            contracts with over 200 airlines. Let us search for your specific route.
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
