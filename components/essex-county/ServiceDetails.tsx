/**
 * Lazy-loaded Service Details Component
 * Optimized with React.memo and minimal re-renders
 */

import React from 'react'

interface ServiceDetailsProps {
  service: any
  city: any
  serviceContent: any
}

const ServiceDetails: React.FC<ServiceDetailsProps> = React.memo(
  ({ service, city, serviceContent }) => {
    const iconMap: Record<number, string> = {
      0: '🏢',
      1: '👨‍👩‍👧‍👦',
      2: '🎯',
      3: '🎉',
      4: '⭐',
    }

    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {service.name} Services Available in {city.name}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {serviceContent.ideal_for?.map((item: string, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 text-center shadow hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-4">{iconMap[index] || '⭐'}</div>
                  <h3 className="font-semibold text-lg mb-2">{item}</h3>
                  <p className="text-gray-600 text-sm">
                    Specialized {service.name.toLowerCase()} solutions for {item.toLowerCase()} in{' '}
                    {city.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }
)

ServiceDetails.displayName = 'ServiceDetails'

export default ServiceDetails
