'use client'

import { DynamicMotion as motion } from '@/lib/dynamicMotion'
import { Phone, MessageCircle, Mail, ArrowRight, Sparkles } from 'lucide-react'
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
    <section className="py-24 bg-gradient-to-br from-primary-50 via-warm-50 to-secondary-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-secondary-100 text-secondary-700 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Free Consultation Available</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-primary-500 mb-6 font-display">
              Ready to Start Your
              <span className="block mt-2 bg-gradient-to-r from-secondary-500 to-accent-500 bg-clip-text text-transparent">
                Next Adventure?
              </span>
            </h2>

            <p className="text-xl text-gray-700 mb-10 leading-relaxed">
              Our travel experts are standing by to create your perfect itinerary with personalized
              service and exclusive deals you won&apos;t find online.
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

          {/* Right Content - Premium CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-100"
          >
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-primary-500 mb-4 font-display">
                Start Planning Today
              </h3>
              <p className="text-lg text-gray-600 mb-10">
                Get your free consultation and discover exclusive deals
              </p>

              <div className="space-y-4">
                <a
                  href="tel:1-833-874-1019"
                  onClick={handlePhoneClick}
                  className="group block w-full bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold py-5 px-8 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-accent-500/30 transform hover:scale-105 transition-all duration-300"
                >
                  <Phone className="inline-block w-5 h-5 mr-2" />
                  Call Now: 1-833-874-1019
                  <ArrowRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSe5Wy5yxW42FXTyFDsBPK7A0eqqcP_XKYCf-PHhd9vmlfvVWQ/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block w-full bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-bold py-5 px-8 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-secondary-500/30 transform hover:scale-105 transition-all duration-300"
                >
                  <MessageCircle className="inline-block w-5 h-5 mr-2" />
                  Get Free Consultation
                  <ArrowRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="mailto:info@nexttripanywhere.com"
                  onClick={handleEmailClick}
                  className="block w-full bg-white border-2 border-primary-300 text-primary-600 font-semibold py-4 px-8 rounded-xl hover:bg-primary-50 hover:border-primary-400 transition-all duration-300"
                >
                  <Mail className="inline-block w-5 h-5 mr-2" />
                  Email for Quote
                </a>
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

        {/* Professional Trust Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">
            Trusted Partners
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-50">
            <div className="text-base font-semibold text-gray-600">American Airlines</div>
            <div className="text-base font-semibold text-gray-600">Royal Caribbean</div>
            <div className="text-base font-semibold text-gray-600">Marriott</div>
            <div className="text-base font-semibold text-gray-600">Disney</div>
            <div className="text-base font-semibold text-gray-600">United Airlines</div>
            <div className="text-base font-semibold text-gray-600">Carnival</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
