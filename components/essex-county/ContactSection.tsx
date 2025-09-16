/**
 * Lazy-loaded Contact Section Component
 * Optimized with static content and minimal props
 */

import React from 'react'

interface ContactSectionProps {
  city: any
  service: any
  distanceFromOffice: number
}

const ContactSection: React.FC<ContactSectionProps> = React.memo(
  ({ city, service, distanceFromOffice }) => {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              Get {service.name} in {city.name} Today
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-xl mb-4">Newark Office</h3>
                <address className="not-italic text-gray-700 space-y-2">
                  <p>744 Broad Street, Suite 1700</p>
                  <p>Newark, NJ 07102</p>
                  <p className="pt-2">
                    <strong>Serving {city.name}:</strong> {distanceFromOffice} miles from our office
                  </p>
                </address>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-4">Quick Contact</h3>
                <div className="space-y-3">
                  <a
                    href="tel:+18338741019"
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <span className="text-2xl mr-3">📞</span>
                    <span className="font-semibold">833-874-1019</span>
                  </a>
                  <a
                    href="mailto:info@nexttripanywhere.com"
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <span className="text-2xl mr-3">✉️</span>
                    <span>info@nexttripanywhere.com</span>
                  </a>
                  <div className="flex items-center text-gray-700">
                    <span className="text-2xl mr-3">🕒</span>
                    <span>Mon-Fri: 6AM-11PM, Sat-Sun: 7AM-10PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
)

ContactSection.displayName = 'ContactSection'

export default ContactSection
