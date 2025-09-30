'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Calendar, MapPin, Check } from 'lucide-react'

const packageDeals = [
  {
    destination: 'Cancun, Mexico',
    title: 'All-Inclusive Beach Paradise',
    image: 'https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=800&q=80',
    duration: '5 Days / 4 Nights',
    offer: 'Limited Time Offer',
    badge: 'Popular Choice',
    includes: [
      'Round-trip flights',
      'All-inclusive resort',
      'Airport transfers',
      'All meals & drinks',
    ],
  },
  {
    destination: 'Orlando, Florida',
    title: 'Disney Magic Package',
    image: 'https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=800&q=80',
    duration: '6 Days / 5 Nights',
    offer: 'Special Group Rates',
    badge: 'Family Favorite',
    includes: ['Flights from NYC/BOS', 'Disney Resort hotel', 'Park tickets', 'Meal plan'],
  },
  {
    destination: 'Las Vegas',
    title: 'Vegas VIP Experience',
    image: 'https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?w=800&q=80',
    duration: '4 Days / 3 Nights',
    offer: 'Exclusive Deal',
    badge: 'Best Value',
    includes: ['Round-trip flights', 'Strip hotel', 'Show tickets', 'Resort credit included'],
  },
  {
    destination: 'Hawaii',
    title: 'Maui Paradise Escape',
    image: 'https://images.unsplash.com/photo-1542259009477-d625272157b7?w=800&q=80',
    duration: '7 Days / 6 Nights',
    offer: 'Premium Package',
    badge: 'Top Rated',
    includes: ['Flights from East Coast', 'Ocean view room', 'Car rental', 'Luau dinner'],
  },
  {
    destination: 'Paris & Rome',
    title: 'European Romance',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    duration: '9 Days / 8 Nights',
    offer: 'All-Inclusive',
    badge: 'Luxury Experience',
    includes: ['International flights', '4-star hotels', 'Train between cities', 'Breakfast daily'],
  },
  {
    destination: 'Turks & Caicos',
    title: 'Luxury Beach Retreat',
    image: 'https://images.unsplash.com/photo-1516370873344-fb7c61054fa9?w=800&q=80',
    duration: '5 Days / 4 Nights',
    offer: 'Premium Getaway',
    badge: 'Honeymoon Special',
    includes: ['Direct flights', 'Beachfront suite', 'All meals', 'Water sports'],
  },
]

export default function PackageDeals() {
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
            Hot <span className="text-gradient">Package Deals</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete vacation packages with everything included. Book now for the best rates!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packageDeals.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48">
                <Image src={pkg.image} alt={pkg.destination} fill className="object-cover" />
                <div className="absolute top-4 left-4 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {pkg.badge}
                </div>
              </div>

              <div className="p-6">
                <div className="mb-3">
                  <p className="text-sm text-primary-600 font-semibold flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {pkg.destination}
                  </p>
                  <h3 className="text-lg font-bold text-navy">{pkg.title}</h3>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Calendar className="w-4 h-4 mr-1" />
                  {pkg.duration}
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Package Includes:</p>
                  <ul className="space-y-1">
                    {pkg.includes.map((item, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start">
                        <Check className="w-4 h-4 text-accent-500 mr-1 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-primary-500">{pkg.offer}</p>
                    <p className="text-sm text-gray-600">Get personalized quote</p>
                  </div>
                  <motion.a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSe5Wy5yxW42FXTyFDsBPK7A0eqqcP_XKYCf-PHhd9vmlfvVWQ/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Get Quote
                  </motion.a>
                </div>
              </div>
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
            Can&apos;t find what you&apos;re looking for? We create custom packages for any
            destination!
          </p>
          <motion.a
            href="https://docs.google.com/forms/d/e/1FAIpQLSe5Wy5yxW42FXTyFDsBPK7A0eqqcP_XKYCf-PHhd9vmlfvVWQ/viewform"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Create My Custom Package
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
