/**
 * Lazy-loaded Other Services Component
 * Optimized for minimal bundle size and re-renders
 */

import React from 'react'
import Link from 'next/link'

interface Service {
  slug: string
  name: string
  description: string
}

interface OtherServicesProps {
  currentService: string
  currentCity: string
  services: readonly Service[]
}

const OtherServices: React.FC<OtherServicesProps> = React.memo(
  ({ currentService, currentCity, services }) => {
    const otherServices = services.filter((s) => s.slug !== currentService).slice(0, 6)

    return (
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Other Services Available in {currentCity}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {otherServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/locations/essex-county/${currentCity}/${service.slug}`}
                  className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow block"
                  prefetch={false}
                >
                  <h3 className="font-semibold text-lg mb-2 text-blue-900">{service.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{service.description}</p>
                  <span className="text-blue-600 text-sm mt-3 inline-block hover:underline">
                    Learn more →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }
)

OtherServices.displayName = 'OtherServices'

export default OtherServices
