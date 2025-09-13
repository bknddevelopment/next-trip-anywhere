'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

interface Testimonial {
  name: string
  location: string
  quote: string
  rating: number
}

interface LocationTestimonialsProps {
  testimonials: Testimonial[]
  city: string
}

export default function LocationTestimonials({ testimonials, city }: LocationTestimonialsProps) {
  // Don't render if no testimonials
  if (!testimonials.length) {
    return null
  }

  return (
    <section className="py-16 bg-gradient-to-br from-warm-50 to-primary-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-navy mb-4">
            What <span className="text-gradient">{city}</span> Travelers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real reviews from satisfied customers in your area
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 relative"
            >
              <Quote className="w-8 h-8 text-primary-200 absolute top-4 right-4" />

              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>

              <div className="border-t pt-4">
                <p className="font-semibold text-navy">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.location}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">Ready to plan your next adventure from {city}?</p>
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <div>Licensed & Bonded</div>
            <div>24/7 Support</div>
            <div>Exclusive Travel Deals</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
