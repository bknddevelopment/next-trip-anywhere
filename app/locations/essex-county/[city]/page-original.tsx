/**
 * Essex County City Landing Page
 * Shows all available services for a specific city
 * Example: /locations/essex-county/newark
 */

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import Link from 'next/link'
import {
  ESSEX_CITIES,
  ESSEX_SERVICES,
  getCityBySlug,
  isValidCitySlug,
} from '@/lib/seo/essex-county-services'
import { generateTownSpecificSchema, NEWARK_OFFICE } from '@/lib/seo/essex-county-schema'

// Generate static params for all cities
export async function generateStaticParams() {
  return ESSEX_CITIES.map((city) => ({
    city: city.slug,
  }))
}

// Generate metadata for each city page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const city = getCityBySlug(resolvedParams.city)

  if (!city) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    }
  }

  const title = `Travel Services in ${city.name}, NJ | Next Trip Anywhere Essex County`
  const description = `Complete travel services for ${city.name} residents. Airport transfers, group travel, corporate travel, cruises, and more. Serving ${city.population.toLocaleString()} residents. Call 833-874-1019.`
  const canonical = `https://nexttripanywhere.com/locations/essex-county/${resolvedParams.city}`

  return {
    title,
    description,
    keywords: [
      city.name,
      'travel services',
      'travel agency',
      'Essex County',
      'New Jersey',
      'airport transfers',
      'group travel',
      'corporate travel',
    ].join(', '),
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      locale: 'en_US',
      siteName: 'Next Trip Anywhere',
      images: [
        {
          url: `https://nexttripanywhere.com/images/${resolvedParams.city}-services.jpg`,
          width: 1200,
          height: 630,
          alt: `Travel Services in ${city.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`https://nexttripanywhere.com/images/${resolvedParams.city}-services.jpg`],
    },
  }
}

export default async function CityLandingPage({ params }: { params: Promise<{ city: string }> }) {
  const resolvedParams = await params

  // Validate params and get data
  if (!isValidCitySlug(resolvedParams.city)) {
    notFound()
  }

  const city = getCityBySlug(resolvedParams.city)!

  // Generate schema for SEO
  const localBusinessSchema = generateTownSpecificSchema(city.name)
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [localBusinessSchema],
  }

  // Service icons mapping
  const serviceIcons: Record<string, string> = {
    'group-travel': '👥',
    'airport-transfers': '✈️',
    'corporate-travel': '💼',
    'cruise-transfers': '🚢',
    'wedding-transportation': '💒',
    'special-events': '🎉',
    'wine-tours-day-trips': '🍷',
    'medical-appointments': '🏥',
    'school-transportation': '🚌',
  }

  return (
    <>
      {/* Schema Markup */}
      <Script
        id={`schema-${resolvedParams.city}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaGraph),
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Breadcrumb */}
        <nav className="bg-gray-50 py-3 px-4" aria-label="Breadcrumb">
          <div className="container mx-auto">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-blue-600 hover:text-blue-800">
                  Home
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <Link href="/essex-county" className="text-blue-600 hover:text-blue-800">
                  Essex County
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-700" aria-current="page">
                {city.name}
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative bg-blue-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Travel Services in {city.name}, NJ
              </h1>
              <p className="text-xl mb-8">
                Serving {city.population.toLocaleString()} residents with professional travel
                solutions. Your trusted Essex County travel experts since 2010.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+18338741019"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  Call 833-874-1019
                </a>
                <a
                  href="/book"
                  className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  Book Your Trip
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* City Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Why {city.name} Residents Choose Next Trip Anywhere
              </h2>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">📍</span>
                  </div>
                  <h3 className="font-semibold text-xl mb-3">Local Presence</h3>
                  <p className="text-gray-700">
                    Just{' '}
                    {Math.round(
                      Math.sqrt(
                        Math.pow(city.coordinates.lat - NEWARK_OFFICE.coordinates.latitude, 2) +
                          Math.pow(city.coordinates.lng - NEWARK_OFFICE.coordinates.longitude, 2)
                      ) * 69
                    )}{' '}
                    miles from {city.name} at our Newark office
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">⭐</span>
                  </div>
                  <h3 className="font-semibold text-xl mb-3">Trusted Service</h3>
                  <p className="text-gray-700">
                    4.8/5 star rating from hundreds of {city.name} travelers
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">💰</span>
                  </div>
                  <h3 className="font-semibold text-xl mb-3">Best Value</h3>
                  <p className="text-gray-700">
                    Exclusive deals and group rates for {city.name} residents
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All Services Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Our Services for {city.name} Residents
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {ESSEX_SERVICES.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/locations/essex-county/${resolvedParams.city}/${service.slug}`}
                    className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 block"
                  >
                    <div className="p-6">
                      <div className="text-4xl mb-4 text-center">
                        {serviceIcons[service.slug] || '🌟'}
                      </div>
                      <h3 className="font-semibold text-xl mb-3 text-blue-900 text-center">
                        {service.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                      <div className="text-blue-600 text-sm font-medium hover:underline">
                        Learn more →
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Popular Destinations from {city.name}
              </h2>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-xl mb-4">Top Flight Routes</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex justify-between">
                        <span>Orlando (MCO)</span>
                        <span className="text-blue-600 font-medium">from $89</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Fort Lauderdale (FLL)</span>
                        <span className="text-blue-600 font-medium">from $79</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Los Angeles (LAX)</span>
                        <span className="text-blue-600 font-medium">from $149</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Las Vegas (LAS)</span>
                        <span className="text-blue-600 font-medium">from $139</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Miami (MIA)</span>
                        <span className="text-blue-600 font-medium">from $99</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-xl mb-4">Popular Cruises</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex justify-between">
                        <span>Caribbean (7 days)</span>
                        <span className="text-blue-600 font-medium">from $599</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Bermuda (5 days)</span>
                        <span className="text-blue-600 font-medium">from $449</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Bahamas (3 days)</span>
                        <span className="text-blue-600 font-medium">from $299</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Alaska (7 days)</span>
                        <span className="text-blue-600 font-medium">from $799</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Mediterranean (10 days)</span>
                        <span className="text-blue-600 font-medium">from $1,299</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nearby Cities */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                We Also Serve Nearby Communities
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {ESSEX_CITIES.filter((c) => c.slug !== resolvedParams.city).map((nearbyCity) => (
                  <Link
                    key={nearbyCity.slug}
                    href={`/locations/essex-county/${nearbyCity.slug}`}
                    className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
                  >
                    <h3 className="font-semibold text-gray-800">{nearbyCity.name}</h3>
                    <p className="text-sm text-gray-600">
                      {nearbyCity.population.toLocaleString()} residents
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-orange-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Journey from {city.name}?
            </h2>
            <p className="text-xl mb-8">
              Let our Essex County travel experts plan your perfect trip
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18338741019"
                className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Call 833-874-1019
              </a>
              <a
                href="/book"
                className="bg-blue-900 text-white hover:bg-blue-800 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Start Planning Online
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
