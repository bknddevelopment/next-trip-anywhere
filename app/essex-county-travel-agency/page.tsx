import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Mail, MapPin, Star, Users, Award, Clock, CheckCircle } from 'lucide-react'
import { essexCountyCities } from '@/lib/data/essex-county-cities'
import { essexCountyServices } from '@/lib/data/essex-county-services'

export const metadata: Metadata = {
  title: 'Travel Agency Essex County NJ | Expert Travel Planning Since 2010',
  description:
    "Essex County's trusted travel agency serving Newark, East Orange, Montclair & all 22 municipalities. Expert cruise planning from Cape Liberty, vacation packages & flights. Call 833-874-1019.",
  keywords: [
    'travel agency essex county nj',
    'travel agent newark nj',
    'cruise travel essex county',
    'vacation packages new jersey',
    'montclair travel agency',
    'east orange travel agent',
    'essex county cruise specialist',
  ],
  alternates: {
    canonical: 'https://nexttripanywhere.com/essex-county-travel-agency',
  },
  openGraph: {
    title: 'Travel Agency Essex County NJ | Next Trip Anywhere',
    description:
      'Serving 22 Essex County municipalities with expert travel planning. Cruises from Cape Liberty, vacation packages & flights.',
    url: 'https://nexttripanywhere.com/essex-county-travel-agency',
    type: 'website',
  },
}

// Local Business Schema for Essex County
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Next Trip Anywhere - Essex County Travel Agency',
  description:
    'Premier travel agency serving all 22 municipalities in Essex County, NJ. Specializing in cruises from Cape Liberty, vacation packages, and personalized travel planning.',
  url: 'https://nexttripanywhere.com/essex-county-travel-agency',
  telephone: '+1-833-874-1019',
  email: 'info@nexttripanywhere.com',
  areaServed: essexCountyCities.map((city) => ({
    '@type': 'City',
    name: `${city.name}, New Jersey`,
  })),
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: '40.7643',
      longitude: '-74.2107',
    },
    geoRadius: '15 miles',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Travel Services in Essex County',
    itemListElement: essexCountyServices.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.name,
        description: service.shortDescription,
      },
    })),
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://nexttripanywhere.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Essex County Travel Agency',
      item: 'https://nexttripanywhere.com/essex-county-travel-agency',
    },
  ],
}

export default function EssexCountyTravelAgencyPage() {
  // Group cities by region for better UX
  const northernCities = essexCountyCities.filter((c) =>
    [
      'Belleville',
      'Bloomfield',
      'Caldwell',
      'Cedar Grove',
      'Essex Fells',
      'Fairfield',
      'Glen Ridge',
      'Montclair',
      'North Caldwell',
      'Nutley',
      'Roseland',
      'Verona',
      'West Caldwell',
    ].includes(c.name)
  )
  const centralCities = essexCountyCities.filter((c) =>
    ['East Orange', 'Irvington', 'Maplewood', 'Millburn', 'Orange', 'South Orange'].includes(c.name)
  )
  const southernCities = essexCountyCities.filter((c) =>
    ['Newark', 'West Orange', 'Livingston'].includes(c.name)
  )

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy via-navy-600 to-navy-700 text-white py-20">
        <div className="absolute inset-0 bg-[url('/images/essex-county-map.jpg')] opacity-10 bg-cover bg-center" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <nav className="mb-8 text-sm text-gray-300">
            <Link href="/" className="hover:text-accent-400 transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Essex County Travel Agency</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center bg-accent-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm font-semibold">
                Serving All 22 Essex County Municipalities
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Essex County's Trusted <span className="text-gradient">Travel Agency</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Expert travel planning for Newark, Montclair, East Orange, Bloomfield & all 22 Essex
              County communities since 2010.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="tel:1-833-874-1019"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call 833-874-1019
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Get Free Quote
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-accent-400 mb-1">15+</div>
                <div className="text-sm text-gray-300">
                  Years Serving
                  <br />
                  Essex County
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-accent-400 mb-1">22</div>
                <div className="text-sm text-gray-300">
                  Municipalities
                  <br />
                  Served
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-accent-400 mb-1">10K+</div>
                <div className="text-sm text-gray-300">
                  Local
                  <br />
                  Customers
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-accent-400 mb-1">24/7</div>
                <div className="text-sm text-gray-300">
                  Customer
                  <br />
                  Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us for Essex County */}
      <section className="py-16 bg-warm-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Why Essex County Residents Choose Us
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              As your local travel experts, we understand the unique needs of Essex County travelers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Local Expertise</h3>
              <p className="text-gray-600">
                We know every Essex County municipality intimately. From Newark's Ironbound to
                Montclair's downtown, we tailor travel plans to your neighborhood.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Cape Liberty Specialists</h3>
              <p className="text-gray-600">
                Expert guidance for cruises departing from Bayonne's Cape Liberty port - just 15-20
                minutes from most Essex County locations. We know the best routes, parking, and
                pre-cruise hotels.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Flexible Hours</h3>
              <p className="text-gray-600">
                Mon-Fri 6am-11pm, Weekends 7am-10pm EST. We work around your schedule, whether
                you're commuting from Newark or relaxing in Montclair.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center mb-4">
                <Award className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">ASTA & CLIA Certified</h3>
              <p className="text-gray-600">
                Trusted credentials with exclusive access to unpublished fares and special perks for
                Essex County residents.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Group Travel Experts</h3>
              <p className="text-gray-600">
                Specialized service for church groups, school trips, family reunions, and corporate
                events from across Essex County.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center mb-4">
                <Star className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">No Booking Fees</h3>
              <p className="text-gray-600">
                Free personalized travel planning with exclusive deals that save you money. Our
                expertise costs you nothing extra.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cities We Serve */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Serving All 22 Essex County Municipalities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Click your city for customized travel services in your area
            </p>
          </div>

          {/* Northern Essex County */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-navy mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-accent-500" />
              Northern Essex County
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {northernCities.map((city) => (
                <Link
                  key={city.id}
                  href={`/locations/essex-county/${city.id}`}
                  className="group bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-lg p-4 hover:border-accent-500 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-navy group-hover:text-accent-600 transition-colors">
                        {city.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {city.population.toLocaleString()} residents
                      </p>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-accent-500 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Central Essex County */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-navy mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-accent-500" />
              Central Essex County
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {centralCities.map((city) => (
                <Link
                  key={city.id}
                  href={`/locations/essex-county/${city.id}`}
                  className="group bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-lg p-4 hover:border-accent-500 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-navy group-hover:text-accent-600 transition-colors">
                        {city.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {city.population.toLocaleString()} residents
                      </p>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-accent-500 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Southern Essex County */}
          <div>
            <h3 className="text-2xl font-bold text-navy mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-accent-500" />
              Southern Essex County
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {southernCities.map((city) => (
                <Link
                  key={city.id}
                  href={`/locations/essex-county/${city.id}`}
                  className="group bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-lg p-4 hover:border-accent-500 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-navy group-hover:text-accent-600 transition-colors">
                        {city.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {city.population.toLocaleString()} residents
                      </p>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-accent-500 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Offered */}
      <section className="py-16 bg-gradient-to-br from-navy via-navy-600 to-navy-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Travel Services for Essex County Residents
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Comprehensive travel planning customized for your Essex County lifestyle
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {essexCountyServices.map((service) => (
              <div
                key={service.id}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                <p className="text-gray-200 mb-4">{service.shortDescription}</p>
                <Link
                  href={`/locations/essex-county/newark/${service.id}`}
                  className="inline-flex items-center text-accent-400 hover:text-accent-300 font-semibold transition-colors"
                >
                  Learn More
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent-500 to-accent-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Plan Your Next Essex County Adventure?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Call us now for personalized service from travel experts who know Essex County
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:1-833-874-1019"
              className="inline-flex items-center px-8 py-4 bg-white text-accent-600 rounded-lg font-bold text-lg hover:shadow-2xl transition-all duration-300"
            >
              <Phone className="w-6 h-6 mr-2" />
              833-874-1019
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-navy text-white rounded-lg font-bold text-lg hover:shadow-2xl transition-all duration-300"
            >
              <Mail className="w-6 h-6 mr-2" />
              Email Us
            </Link>
          </div>
          <p className="mt-6 text-white/90">Mon-Fri 6am-11pm, Sat-Sun 7am-10pm EST</p>
        </div>
      </section>
    </>
  )
}
