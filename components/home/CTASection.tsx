'use client'

import { motion } from 'framer-motion'
import { Phone, MessageCircle, Mail, ArrowRight } from 'lucide-react'
import { useABTest, AB_EVENTS } from '@/lib/ab-testing'

export default function CTASection() {
  const { config, trackConversion, isLoading } = useABTest('homepage-hero-cta')

  // Default values if A/B test is not active
  const primaryCtaColor =
    config.primaryCtaColor || 'bg-gradient-to-r from-primary-500 to-primary-600'
  const secondaryCtaText = config.secondaryCtaText || 'Surprise Me with Deals!'
  const secondaryCtaColor =
    config.secondaryCtaColor || 'bg-gradient-to-r from-accent-500 to-accent-600'

  const handlePhoneClick = () => {
    trackConversion(AB_EVENTS.PHONE_CLICK)
  }

  const handleEmailClick = () => {
    trackConversion(AB_EVENTS.EMAIL_CLICK)
  }

  if (isLoading) {
    return <div className="animate-pulse bg-gray-200 h-48 rounded-lg m-4" />
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 via-warm-50 to-secondary-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
              Ready to Start Your
              <span className="block text-gradient">Next Adventure?</span>
            </h2>

            <p className="text-lg text-gray-700 mb-8">
              Don&apos;t wait for tomorrow to plan your dream vacation. Our travel experts are
              standing by to create your perfect itinerary with personalized service and competitive
              rates.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-navy">Free Travel Consultation</h4>
                  <p className="text-sm text-gray-600">No obligation quote in 24 hours</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-accent-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-navy">Competitive Rates</h4>
                  <p className="text-sm text-gray-600">Access to special pricing</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-secondary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-navy">Exclusive Travel Deals</h4>
                  <p className="text-sm text-gray-600">
                    Access to insider rates you won't find online
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Options */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-navy mb-4">Prefer to Talk? Contact Us:</h3>
              <div className="space-y-3">
                <a
                  href="tel:1-833-874-1019"
                  className="flex items-center space-x-3 text-gray-700 hover:text-primary-500 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">1-833-874-1019</span>
                </a>
                <a
                  href="mailto:info@nexttripanywhere.com"
                  className="flex items-center space-x-3 text-gray-700 hover:text-primary-500 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span className="font-medium">info@nexttripanywhere.com</span>
                </a>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSe5Wy5yxW42FXTyFDsBPK7A0eqqcP_XKYCf-PHhd9vmlfvVWQ/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-700 hover:text-primary-500 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">Live Chat Available</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Call to Action */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-xl"
          >
            <div className="text-center">
              <h3 className="text-3xl font-bold text-navy mb-4">
                Start Planning Your Dream Vacation Today!
              </h3>
              <p className="text-lg text-gray-700 mb-8">
                Our expert travel agents are ready to help you find the perfect getaway with
                personalized service.
              </p>

              <div className="space-y-4">
                <a
                  href="tel:1-833-874-1019"
                  onClick={handlePhoneClick}
                  className={`block w-full ${primaryCtaColor} text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
                >
                  <Phone className="inline-block w-5 h-5 mr-2" />
                  Call Now: 1-833-874-1019
                </a>

                <a
                  href="mailto:info@nexttripanywhere.com"
                  onClick={handleEmailClick}
                  className="block w-full bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Mail className="inline-block w-5 h-5 mr-2" />
                  Email Us for a Quote
                </a>

                <div className="relative">
                  <div className={`absolute inset-0 ${secondaryCtaColor} rounded-lg blur-sm`}></div>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSe5Wy5yxW42FXTyFDsBPK7A0eqqcP_XKYCf-PHhd9vmlfvVWQ/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative block w-full ${secondaryCtaColor} text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center`}
                  >
                    <MessageCircle className="inline-block w-5 h-5 mr-2" />
                    {secondaryCtaText}
                  </a>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">Why Choose Next Trip Anywhere?</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Exclusive Travel Deals</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>24/7 Support</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Expert Travel Agents</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Trust Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-3xl p-8 shadow-xl"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-navy">Trusted by Major Travel Partners</h3>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-lg font-semibold text-gray-600">American Airlines</div>
            <div className="text-lg font-semibold text-gray-600">Royal Caribbean</div>
            <div className="text-lg font-semibold text-gray-600">Marriott Hotels</div>
            <div className="text-lg font-semibold text-gray-600">Disney Cruises</div>
            <div className="text-lg font-semibold text-gray-600">United Airlines</div>
            <div className="text-lg font-semibold text-gray-600">Carnival Cruise</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
