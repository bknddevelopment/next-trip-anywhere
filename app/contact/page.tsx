import { Metadata } from 'next'
import { Phone, Mail, Clock, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us | Next Trip Anywhere Travel Agency',
  description:
    'Get in touch with Next Trip Anywhere. Call 1-833-874-1019 or fill out our form for expert travel planning assistance.',
}

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-br from-secondary-50 to-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-navy mb-6">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-gray-700">
              We&apos;re here to help you plan the perfect trip. Reach out to our expert team today.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-navy mb-8">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-navy mb-1">Phone</h3>
                    <p className="text-gray-700">Main: 1-833-874-1019</p>
                    <p className="text-gray-700">International: +1-833-874-1019</p>
                    <p className="text-sm text-gray-500 mt-1">Available 24/7 for emergencies</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-secondary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-navy mb-1">Email</h3>
                    <p className="text-gray-700">info@nexttripanywhere.com</p>
                    <p className="text-sm text-gray-500 mt-1">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-navy mb-1">Business Hours</h3>
                    <p className="text-gray-700">Monday - Friday: 8:00 AM - 8:00 PM EST</p>
                    <p className="text-gray-700">Saturday: 9:00 AM - 6:00 PM EST</p>
                    <p className="text-gray-700">Sunday: 10:00 AM - 5:00 PM EST</p>
                    <p className="text-sm text-gray-500 mt-1">
                      24/7 emergency support for active bookings
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-secondary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-navy mb-1">Live Chat</h3>
                    <p className="text-gray-700">Available on our website during business hours</p>
                    <button className="mt-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                      Start Chat Now →
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="mt-12 p-6 bg-warm-50 rounded-xl">
                <h3 className="text-lg font-semibold text-navy mb-4">Quick Links</h3>
                <div className="grid grid-cols-2 gap-3">
                  <a href="/faq" className="text-gray-700 hover:text-primary-600 transition-colors">
                    FAQs
                  </a>
                  <a
                    href="/terms"
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    Terms & Conditions
                  </a>
                  <a
                    href="/privacy"
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="/careers"
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    Careers
                  </a>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div>
              <h2 className="text-3xl font-bold text-navy mb-8">Ready to Book Your Trip?</h2>
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold text-navy mb-3">
                      Speak with a Travel Expert Today
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Our experienced agents are ready to help you find the perfect vacation with
                      exclusive deals.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <a
                      href="tel:1-833-874-1019"
                      className="block w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center"
                    >
                      <Phone className="inline-block w-5 h-5 mr-2" />
                      Call 1-833-874-1019
                    </a>

                    <a
                      href="mailto:info@nexttripanywhere.com"
                      className="block w-full bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center"
                    >
                      <Mail className="inline-block w-5 h-5 mr-2" />
                      Email for a Quote
                    </a>

                    <button className="block w-full bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                      <MessageCircle className="inline-block w-5 h-5 mr-2" />
                      Start Live Chat
                    </button>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="font-semibold text-navy mb-3">Why Book With Us?</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        Exclusive Travel Deals - Access insider rates
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        Expert Travel Agents with 20+ years experience
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        24/7 Support during your trip
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        Exclusive deals not available online
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        Free cancellation on most bookings
                      </li>
                    </ul>
                  </div>

                  <div className="bg-warm-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600">
                      <strong>Office Hours:</strong> Mon-Fri 8AM-8PM EST | Sat 9AM-6PM | Sun
                      10AM-5PM
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Emergency support available 24/7 for active bookings
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
