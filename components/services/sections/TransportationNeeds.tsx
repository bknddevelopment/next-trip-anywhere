import React from 'react'
import { MapPin, Car, Plane } from 'lucide-react'

interface TransportationNeedsProps {
  location: string
  services?: Array<{
    title: string
    description: string
    icon?: React.ReactNode
  }>
}

const TransportationNeeds: React.FC<TransportationNeedsProps> = ({ location, services = [] }) => {
  const defaultServices = [
    {
      title: 'Airport Transfers',
      description: `Convenient airport transfer services to and from ${location} area airports.`,
      icon: <Plane className="w-6 h-6" />,
    },
    {
      title: 'Local Transportation',
      description: `Reliable local transportation options throughout ${location}.`,
      icon: <Car className="w-6 h-6" />,
    },
    {
      title: 'Custom Routes',
      description: `Personalized travel routes designed for your ${location} journey.`,
      icon: <MapPin className="w-6 h-6" />,
    },
  ]

  const displayServices = services.length > 0 ? services : defaultServices

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Transportation Services in {location}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {displayServices.map((service, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="text-primary-500 mr-3">
                  {service.icon || <MapPin className="w-6 h-6" />}
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
              </div>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TransportationNeeds
