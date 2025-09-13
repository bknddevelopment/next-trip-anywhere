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

const getServicesForLocation = (city: string) => {
  const services = [
    {
      type: 'Flight',
      route: `${city} to Popular Destinations`,
      description: 'Best rates on flights nationwide',
      dates: 'Year Round',
      provider: 'All Major Airlines',
    },
    {
      type: 'Cruise',
      route: 'Caribbean Cruises',
      description: 'Expert cruise planning and booking',
      dates: 'Multiple Dates',
      provider: 'All Cruise Lines',
    },
    {
      type: 'Package',
      route: 'Vacation Packages',
      description: 'Customized travel packages',
      dates: 'Flexible Dates',
      provider: 'Flight + Hotel Combos',
    },
    {
      type: 'Flight',
      route: `${city} to International`,
      description: 'Competitive international fares',
      dates: 'Year Round',
      provider: 'International Airlines',
    },
    {
      type: 'Package',
      route: 'Theme Park Packages',
      description: 'Family-friendly vacation planning',
      dates: 'All Seasons',
      provider: 'Flight + Hotel + Tickets',
    },
    {
      type: 'Cruise',
      route: 'Alaska & European Cruises',
      description: 'Premium cruise experiences',
      dates: 'Seasonal Departures',
      provider: 'Luxury Cruise Lines',
    },
  ]

  return services
}

export default function LocationDeals({ location }: LocationDealsProps) {
  const services = getServicesForLocation(location.shortName)

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
            Travel Services from <span className="text-gradient">{location.city}</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert travel planning for {location.city} travelers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
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
                    service.type === 'Flight'
                      ? 'bg-primary-100 text-primary-700'
                      : service.type === 'Cruise'
                        ? 'bg-secondary-100 text-secondary-700'
                        : 'bg-accent-100 text-accent-700'
                  }`}
                >
                  {service.type}
                </span>
                <span className="text-green-600 font-bold">Great Deal</span>
              </div>

              <h3 className="text-lg font-bold text-navy mb-2">{service.route}</h3>
              <p className="text-sm text-gray-600 mb-4">{service.provider}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <TrendingDown className="w-4 h-4 mr-2 text-accent-500" />
                  <span className="text-sm text-primary-500">{service.description}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-secondary-500" />
                  {service.dates}
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
                Get Quote
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
            Need help planning your trip from {location.city}? Our travel experts are here to help.
          </p>
          <button className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
            Contact Our {location.city} Experts
          </button>
        </motion.div>
      </div>
    </section>
  )
}
