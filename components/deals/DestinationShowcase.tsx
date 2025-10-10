import Link from 'next/link'

interface Destination {
  name: string
  imageUrl: string
  description: string
  departurePort: string
  cruiseLines: string[]
  startingPrice: number
}

interface DestinationShowcaseProps {
  destinations: Destination[]
}

export default function DestinationShowcase({ destinations }: DestinationShowcaseProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Where Will You Go in 2027/2028?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore incredible destinations departing from Newark and nearby ports
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image Placeholder with Gradient */}
              <div className="relative h-64 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2">🌊</div>
                  <p className="text-white font-semibold">{destination.name}</p>
                </div>
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-full shadow-lg">
                  <p className="text-sm font-semibold">From</p>
                  <p className="text-2xl font-bold">${destination.startingPrice}</p>
                  <p className="text-xs">per person</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {destination.name}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {destination.description}
                </p>

                {/* Departure Port */}
                <div className="flex items-start gap-2 mb-4 text-sm">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Departs from:</p>
                    <p className="text-gray-600">{destination.departurePort}</p>
                  </div>
                </div>

                {/* Cruise Lines */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">
                    Available Cruise Lines:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {destination.cruiseLines.map((line, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {line}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href="#book-now"
                  className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-center py-3 rounded-lg transition-colors duration-300"
                >
                  View Sailings
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
