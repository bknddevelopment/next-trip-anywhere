import Link from 'next/link'
import { MapPin, Plane, Star, Users } from 'lucide-react'
import { getAllLocationKeys, getLocationData } from '@/lib/location-data'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Travel Agency Locations | NextTripAnywhere Serving 30+ Cities Nationwide',
  description: 'Find your local NextTripAnywhere travel experts in 30+ major cities across the United States. Expert travel planning with local airport knowledge and personalized service.',
  keywords: 'travel agency locations, local travel agents, nationwide travel service, airport experts, city travel specialists',
  openGraph: {
    title: 'NextTripAnywhere - Travel Experts in 30+ Cities Nationwide',
    description: 'Local travel expertise in major cities across America. Find your nearest NextTripAnywhere travel specialists.',
    url: 'https://nexttripanywhere.com/locations',
  },
  alternates: {
    canonical: 'https://nexttripanywhere.com/locations',
  },
}

export default function LocationsPage() {
  const locationKeys = getAllLocationKeys()
  const locations = locationKeys.map(key => getLocationData(key)!).sort((a, b) => a.city.localeCompare(b.city))

  // Group locations by region
  const locationsByRegion = locations.reduce((acc, location) => {
    const region = location.region
    if (!acc[region]) {
      acc[region] = []
    }
    acc[region].push(location)
    return acc
  }, {} as Record<string, typeof locations>)

  const regionOrder = ['New England', 'Mid-Atlantic', 'Southeast', 'Midwest', 'South', 'Southwest', 'Mountain West', 'West Coast', 'Pacific Northwest']
  const sortedRegions = regionOrder.filter(region => locationsByRegion[region])

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 via-white to-primary-50">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-navy to-blue-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Your Local Travel Experts
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Professional travel planning in 30+ major cities across America
              </p>
              <div className="flex justify-center space-x-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary-300">30+</div>
                  <div className="text-sm opacity-90">Cities Served</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary-300">75+</div>
                  <div className="text-sm opacity-90">Airports Covered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent-300">500K+</div>
                  <div className="text-sm opacity-90">Happy Travelers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {sortedRegions.map((regionName) => {
            const regionLocations = locationsByRegion[regionName]
            return (
              <div key={regionName} className="mb-16">
                <h2 className="text-3xl font-bold text-navy mb-8 text-center">
                  {regionName}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {regionLocations.map((location) => {
                    const cityUrl = location.city.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')
                    const mainAirport = location.airports.find(a => a.isMain) || location.airports[0]
                    const hasMultipleAirports = location.airports.length > 1
                    const hasCruisePorts = location.cruisePorts && location.cruisePorts.length > 0
                    
                    return (
                      <div key={location.city} className="group hover:scale-105 transition-transform duration-300">
                        <Link 
                          href={`/from/${cityUrl}`}
                          className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                          {/* City Header */}
                          <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-4 text-white">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-xl font-bold">{location.city}</h3>
                                <p className="text-sm opacity-90">{location.state}</p>
                              </div>
                              <MapPin className="w-6 h-6 opacity-80" />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-4">
                            <div className="space-y-3">
                              {/* Airport Info */}
                              <div className="flex items-center text-gray-600">
                                <Plane className="w-4 h-4 mr-2" />
                                <span className="text-sm">
                                  {mainAirport.code}
                                  {hasMultipleAirports && ` +${location.airports.length - 1} more`}
                                  {hasCruisePorts && ' • Cruise Ports'}
                                </span>
                              </div>

                              {/* Service Info */}
                              <div className="flex items-center text-gray-600">
                                <Users className="w-4 h-4 mr-2" />
                                <span className="text-sm">Professional Travel Services</span>
                              </div>

                              {/* Rating */}
                              <div className="flex items-center">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-600 ml-2">4.9/5 Rating</span>
                              </div>

                              {/* Specialties */}
                              <div className="flex flex-wrap gap-1">
                                {location.specialties.slice(0, 2).map((specialty) => (
                                  <span 
                                    key={specialty}
                                    className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium"
                                  >
                                    {specialty}
                                  </span>
                                ))}
                                {location.specialties.length > 2 && (
                                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                                    +{location.specialties.length - 2} more
                                  </span>
                                )}
                              </div>

                              {/* Popular Destinations Preview */}
                              <div className="text-xs text-gray-500">
                                Popular: {location.popularDestinations.slice(0, 3).join(', ')}
                                {location.popularDestinations.length > 3 && '...'}
                              </div>
                            </div>

                            {/* CTA */}
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <div className="text-center">
                                <span className="text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
                                  View {location.city} Travel Services →
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Why Choose Local Expertise */}
      <section className="py-16 bg-gradient-to-br from-warm-50 to-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy mb-8">
              Why Choose Local Travel Expertise?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-navy mb-3">Local Airport Knowledge</h3>
                <p className="text-gray-600">
                  Our agents know your local airports inside and out - from parking and security to the best departure times and gate locations.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-secondary-600" />
                </div>
                <h3 className="text-xl font-semibold text-navy mb-3">Community Understanding</h3>
                <p className="text-gray-600">
                  We understand your city's unique travel patterns, preferences, and the destinations your neighbors love most.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-accent-600" />
                </div>
                <h3 className="text-xl font-semibold text-navy mb-3">Personalized Service</h3>
                <p className="text-gray-600">
                  Get travel advice tailored to your city's weather, holidays, and local events. We know when to travel and when to stay home.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-lg text-gray-600 mb-6">
                Don't see your city listed? We serve travelers nationwide with the same expert, personalized service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:1-833-874-1019"
                  className="inline-flex items-center justify-center bg-primary-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Call 1-833-874-1019
                </a>
                <a
                  href="mailto:info@nexttripanywhere.com"
                  className="inline-flex items-center justify-center bg-secondary-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-secondary-700 transition-colors"
                >
                  Email for Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TravelAgency',
            '@id': 'https://nexttripanywhere.com/locations',
            name: 'Next Trip Anywhere - Nationwide Travel Services',
            description: 'Professional travel agency serving 30+ major cities across the United States with local expertise and personalized service.',
            url: 'https://nexttripanywhere.com/locations',
            telephone: '+1-833-874-1019',
            areaServed: locations.map(location => ({
              '@type': 'City',
              name: location.city,
              addressRegion: location.stateCode,
              addressCountry: 'US'
            })),
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Travel Services by Location',
              itemListElement: locations.map((location, index) => ({
                '@type': 'Offer',
                position: index + 1,
                itemOffered: {
                  '@type': 'TravelAgency',
                  name: `Next Trip Anywhere - ${location.city}`,
                  areaServed: {
                    '@type': 'City',
                    name: location.city,
                    addressRegion: location.stateCode
                  }
                }
              }))
            }
          }),
        }}
      />
    </div>
  )
}