'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Calendar, MapPin, Gift } from 'lucide-react'

const cruiseDeals = [
  {
    line: 'Royal Caribbean',
    ship: 'Wonder of the Seas',
    destination: '7-Night Eastern Caribbean',
    departure: 'Miami, FL',
    dates: 'Multiple Dates Available',
    price: 'From $599',
    perks: ['$100 Onboard Credit', 'Free Drinks Package'],
    image: 'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?w=800&q=80',
  },
  {
    line: 'Carnival',
    ship: 'Carnival Celebration',
    destination: '5-Night Bahamas',
    departure: 'Fort Lauderdale, FL',
    dates: 'Feb - Apr 2025',
    price: 'From $399',
    perks: ['Free WiFi', 'Specialty Dining Credit'],
    image: 'https://images.unsplash.com/photo-1580541631950-7282082b53ce?w=800&q=80',
  },
  {
    line: 'Norwegian',
    ship: 'Norwegian Escape',
    destination: '7-Night Bermuda',
    departure: 'New York, NY',
    dates: 'May - Sept 2025',
    price: 'From $749',
    perks: ['Free at Sea Package', '3rd/4th Guest Free'],
    image: 'https://images.unsplash.com/photo-1517137879134-74be46c6a267?w=800&q=80',
  },
  {
    line: 'Celebrity',
    ship: 'Celebrity Beyond',
    destination: '10-Night Mediterranean',
    departure: 'Boston, MA',
    dates: 'June - Aug 2025',
    price: 'From $1,299',
    perks: ['All Included Package', 'Shore Excursion Credit'],
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
  },
  {
    line: 'Disney',
    ship: 'Disney Wish',
    destination: '4-Night Bahamas',
    departure: 'Port Canaveral, FL',
    dates: 'Year Round',
    price: 'From $999',
    perks: ['Character Breakfast', 'Kids Sail Free'],
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
  },
  {
    line: 'Princess',
    ship: 'Enchanted Princess',
    destination: '14-Night Alaska',
    departure: 'New York, NY',
    dates: 'May - Sept 2025',
    price: 'From $1,599',
    perks: ['Princess Plus Package', 'Balcony Upgrade'],
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
  },
]

export default function CruiseDeals() {
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
            Featured <span className="text-gradient">Cruise Deals</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Exclusive rates and perks for East Coast travelers. All prices are per person, double
            occupancy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cruiseDeals.map((cruise, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48">
                <Image src={cruise.image} alt={cruise.ship} fill className="object-cover" />
                <div className="absolute top-4 left-4 bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {cruise.line}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-navy mb-1">{cruise.ship}</h3>
                <p className="text-secondary-600 font-semibold mb-3">{cruise.destination}</p>

                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-secondary-500" />
                    {cruise.departure}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-primary-500" />
                    {cruise.dates}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-accent-600 mb-2 flex items-center">
                    <Gift className="w-4 h-4 mr-1" />
                    Exclusive Perks:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {cruise.perks.map((perk, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-accent-500 mr-2">✓</span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary-500">{cruise.price}</p>
                    <p className="text-xs text-gray-500">per person</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
