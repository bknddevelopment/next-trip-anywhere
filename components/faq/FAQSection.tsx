'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'

export interface FAQItem {
  id: string
  question: string
  answer: string
  category?: string
}

interface FAQSectionProps {
  title?: string
  subtitle?: string
  faqs: FAQItem[]
  categories?: string[]
  defaultOpen?: string[]
  className?: string
}

export default function FAQSection({
  title = "Frequently Asked Questions",
  subtitle = "Get answers to common questions about our travel services",
  faqs,
  categories = [],
  defaultOpen = [],
  className = ''
}: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen))
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const filteredFAQs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory)

  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Questions
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 rounded-xl transition-colors duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openItems.has(faq.id) ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openItems.has(faq.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 pt-0">
                        <div 
                          className="text-gray-600 leading-relaxed prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our travel experts are here to help you plan the perfect trip.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1-833-874-1019"
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Call Us: 1-833-874-1019
              </a>
              <a
                href="mailto:info@nexttripanywhere.com"
                className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Email Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Predefined FAQ sets for different services
export const flightsFAQs: FAQItem[] = [
  {
    id: 'flight-savings',
    question: 'How much can I save booking flights with Next Trip Anywhere?',
    answer: 'Our customers typically save 20-40% compared to booking directly with airlines. We have exclusive access to unpublished fares and group rates that aren\'t available to the public.',
    category: 'Savings'
  },
  {
    id: 'flight-fees',
    question: 'Do you charge booking fees for flights?',
    answer: 'No! Our flight booking service is completely free. We earn commissions from airlines, so you pay the same or less than booking direct, plus you get our expert service and 24/7 support.',
    category: 'Pricing'
  },
  {
    id: 'flight-changes',
    question: 'What if I need to change my flight?',
    answer: 'We handle all flight changes for you, often negotiating better terms than travelers can get on their own. Change fees vary by airline and fare type - we\'ll always find the most cost-effective option.',
    category: 'Changes'
  },
  {
    id: 'flight-airports',
    question: 'Which airports do you serve?',
    answer: 'We serve all major airports nationwide including JFK, LGA, EWR (NYC), Logan (Boston), MIA, FLL (Miami), DCA, IAD, BWI (DC), LAX, SFO (West Coast), ORD (Chicago), DEN, ATL, DFW, and many more.',
    category: 'Locations'
  }
]

export const cruisesFAQs: FAQItem[] = [
  {
    id: 'cruise-savings',
    question: 'How much can I save on cruise bookings?',
    answer: 'Our cruise customers save an average of 25-45% compared to booking directly. We also secure free upgrades, onboard credits, and exclusive amenities not available elsewhere.',
    category: 'Savings'
  },
  {
    id: 'cruise-deposits',
    question: 'How much deposit is required for cruise bookings?',
    answer: 'Cruise deposits typically range from $100-500 per person depending on the cruise length and category. We offer flexible payment plans to make your dream cruise affordable.',
    category: 'Pricing'
  },
  {
    id: 'cruise-cancellation',
    question: 'What is your cruise cancellation policy?',
    answer: 'Cancellation policies vary by cruise line and booking date. We always recommend travel insurance and will help you understand all terms before booking. Our agents can also assist with any changes needed.',
    category: 'Policies'
  },
  {
    id: 'cruise-ports',
    question: 'Which cruise ports do you offer departures from?',
    answer: 'We offer cruises departing from all major ports nationwide: Miami, Fort Lauderdale, Port Canaveral (Florida), New York, Boston, Seattle, Los Angeles, San Francisco, New Orleans, and more.',
    category: 'Locations'
  }
]

export const packagesFAQs: FAQItem[] = [
  {
    id: 'package-includes',
    question: 'What\'s included in your vacation packages?',
    answer: 'Our packages typically include flights, hotels, and often meals, activities, and transfers. Each package is clearly detailed with inclusions and exclusions - we believe in complete transparency.',
    category: 'Inclusions'
  },
  {
    id: 'package-customization',
    question: 'Can I customize vacation packages?',
    answer: 'Absolutely! Our travel experts specialize in creating custom itineraries. We can modify existing packages or build completely custom trips based on your preferences and budget.',
    category: 'Customization'
  },
  {
    id: 'package-insurance',
    question: 'Should I purchase travel insurance?',
    answer: 'We strongly recommend travel insurance to protect your investment. We offer comprehensive coverage options and can help you choose the right plan based on your trip and needs.',
    category: 'Insurance'
  },
  {
    id: 'package-support',
    question: 'Do you provide support during my trip?',
    answer: 'Yes! We provide 24/7 emergency support throughout your entire trip. Whether you need help with a missed connection, restaurant recommendations, or any issues that arise, we\'re just a phone call away.',
    category: 'Support'
  }
]