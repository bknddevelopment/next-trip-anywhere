'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MessageCircle, Clock } from 'lucide-react'

interface LocationCTAProps {
  city: string
  urgencyMessage?: string
}

export default function LocationCTA({
  city,
  urgencyMessage = 'LIMITED TIME: Exclusive deals on departures',
}: LocationCTAProps) {
  return (
    <section className="py-16 bg-warm-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <div className="inline-block bg-red-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <Clock className="w-4 h-4 inline mr-2" />
              {urgencyMessage}
            </div>
            <h2 className="text-4xl font-bold text-navy mb-4">
              Ready to Explore from <span className="text-gradient">{city}</span>?
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join thousands of satisfied {city} travelers who trust us with their dream vacations.
              Our local experts are standing by to help you find the perfect trip at the perfect
              price.
            </p>
          </div>

          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-navy text-center mb-6">
              Multiple Ways to Connect with Our {city} Experts
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.a
                href="tel:1-833-874-1019"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <Phone className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="text-lg">Call Now</div>
                  <div className="text-sm opacity-90">1-833-874-1019</div>
                </div>
              </motion.a>

              <motion.a
                href="mailto:info@nexttripanywhere.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center bg-gradient-to-r from-secondary-600 to-secondary-700 text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <Mail className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="text-lg">Email Quote</div>
                  <div className="text-sm opacity-90">Free Consultation</div>
                </div>
              </motion.a>

              <motion.a
                href="https://nextripanywhere.app.n8n.cloud/form/travel-quote-form"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center bg-gradient-to-r from-accent-600 to-accent-700 text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="text-lg">Get Quote</div>
                  <div className="text-sm opacity-90">Quick & Easy</div>
                </div>
              </motion.a>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>No Booking Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Exclusive Travel Deals</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>24/7 Travel Support</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Licensed & Bonded</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500 mb-4">
                Preferred by {city} travelers • Over 10,000 five-star reviews
              </p>
              <div className="flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-navy to-blue-800 text-white rounded-2xl p-8 text-center"
          >
            <h4 className="text-2xl font-bold mb-4">
              Why {city} Travelers Choose Next Trip Anywhere
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-primary-300 mb-2">Local</div>
                <p className="text-sm opacity-90">
                  We understand {city} airports, traffic patterns, and the best departure times
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary-300 mb-2">Expert</div>
                <p className="text-sm opacity-90">
                  Certified travel advisors with years of experience planning {city} departures
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent-300 mb-2">Trusted</div>
                <p className="text-sm opacity-90">
                  Thousands of satisfied customers and industry-leading guarantees
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
