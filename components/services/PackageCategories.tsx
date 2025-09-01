'use client'

import { motion } from 'framer-motion'
import { Heart, Users, Sparkles, Palmtree, Mountain, Building } from 'lucide-react'

const categories = [
  {
    icon: Heart,
    title: 'Romantic Getaways',
    description: 'Couples retreats to paradise',
    packages: ['Santorini Romance', 'Bali Honeymoon', 'Paris for Two'],
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
  {
    icon: Users,
    title: 'Family Vacations',
    description: 'Fun for all ages',
    packages: ['Disney World', 'Atlantis Bahamas', 'Costa Rica Adventure'],
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Palmtree,
    title: 'Beach Escapes',
    description: 'Sun, sand, and relaxation',
    packages: ['Cancun All-Inclusive', 'Turks & Caicos', 'Jamaica Bliss'],
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-50',
  },
  {
    icon: Mountain,
    title: 'Adventure Tours',
    description: 'Thrilling experiences',
    packages: ['Iceland Explorer', 'Peru & Machu Picchu', 'African Safari'],
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    icon: Building,
    title: 'City Breaks',
    description: 'Urban exploration',
    packages: ['NYC Weekend', 'Vegas Extravaganza', 'European Capitals'],
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Sparkles,
    title: 'Luxury Escapes',
    description: 'Indulgence redefined',
    packages: ['Maldives Overwater', 'Dubai Luxury', 'Bora Bora Paradise'],
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
  },
]

export default function PackageCategories() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-navy mb-4">
            Choose Your <span className="text-gradient">Package Style</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From romantic escapes to family adventures, we have the perfect package for every
            traveler
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full">
                <div
                  className={`inline-flex p-3 rounded-lg ${category.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <category.icon className={`w-8 h-8 ${category.color}`} />
                </div>

                <h3 className="text-xl font-bold text-navy mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700">Popular Packages:</p>
                  <ul className="space-y-1">
                    {category.packages.map((pkg) => (
                      <li key={pkg} className="text-sm text-gray-600 flex items-center">
                        <span className="text-accent-500 mr-2">→</span>
                        {pkg}
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Explore {category.title}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
