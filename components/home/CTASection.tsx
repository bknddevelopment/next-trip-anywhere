'use client'

import { motion } from 'framer-motion'
import { Phone, MessageCircle, Mail, ArrowRight } from 'lucide-react'
import LeadCaptureForm from '@/components/forms/LeadCaptureForm'

export default function CTASection() {
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
              standing by to create your perfect itinerary with exclusive deals you won&apos;t find
              anywhere else.
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
                  <h4 className="font-semibold text-navy">Exclusive Deals</h4>
                  <p className="text-sm text-gray-600">Save up to 40% on packages</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-secondary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-navy">Price Match Guarantee</h4>
                  <p className="text-sm text-gray-600">Find it cheaper? We&apos;ll beat it!</p>
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
                <button className="flex items-center space-x-3 text-gray-700 hover:text-primary-500 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">Live Chat Available</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Lead Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <LeadCaptureForm source="homepage-cta" />
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
