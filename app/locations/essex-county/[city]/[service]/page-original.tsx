/**
 * Dynamic Essex County Service Pages
 * Generates pages for all city + service combinations
 * Example: /locations/essex-county/newark/group-travel
 */

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import Link from 'next/link'
import {
  ESSEX_CITIES,
  ESSEX_SERVICES,
  generateAllCombinations,
  getCityBySlug,
  getServiceBySlug,
  isValidCitySlug,
  isValidServiceSlug,
  getServiceContent,
  type ServiceSlug,
} from '@/lib/seo/essex-county-services'
import { generateTownSpecificSchema, NEWARK_OFFICE } from '@/lib/seo/essex-county-schema'

// Generate static params for all city/service combinations
export async function generateStaticParams() {
  return generateAllCombinations()
}

// Generate metadata for each page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; service: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const city = getCityBySlug(resolvedParams.city)
  const service = getServiceBySlug(resolvedParams.service)

  if (!city || !service) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    }
  }

  const title = `${service.name} in ${city.name} NJ | Next Trip Anywhere Essex County`
  const description = `Professional ${service.name.toLowerCase()} services for ${city.name} residents. ${service.description} Call 833-874-1019 for immediate assistance.`
  const canonical = `https://nexttripanywhere.com/locations/essex-county/${resolvedParams.city}/${resolvedParams.service}`

  return {
    title,
    description,
    keywords: [
      ...service.keywords,
      city.name,
      'Essex County',
      'New Jersey',
      'travel agency',
      'Newark office',
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
          url: `https://nexttripanywhere.com/images/${resolvedParams.city}-${resolvedParams.service}.jpg`,
          width: 1200,
          height: 630,
          alt: `${service.name} in ${city.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        `https://nexttripanywhere.com/images/${resolvedParams.city}-${resolvedParams.service}.jpg`,
      ],
    },
  }
}

// Type for page params
type PageParams = {
  params: Promise<{
    city: string
    service: string
  }>
}

export default async function EssexCountyServicePage({ params }: PageParams) {
  const resolvedParams = await params

  // Validate params and get data
  if (!isValidCitySlug(resolvedParams.city) || !isValidServiceSlug(resolvedParams.service)) {
    notFound()
  }

  const city = getCityBySlug(resolvedParams.city)!
  const service = getServiceBySlug(resolvedParams.service)!
  const serviceContent = getServiceContent(resolvedParams.service as ServiceSlug, city.name)

  // Generate schema for SEO
  const localBusinessSchema = generateTownSpecificSchema(city.name)
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.name} in ${city.name}`,
    provider: {
      '@type': 'TravelAgency',
      name: 'Next Trip Anywhere',
      telephone: NEWARK_OFFICE.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: city.name,
        addressRegion: 'NJ',
      },
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
    },
    description: `${service.description} Serving ${city.name} and surrounding Essex County areas.`,
  }

  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [localBusinessSchema, serviceSchema],
  }

  return (
    <>
      {/* Schema Markup */}
      <Script
        id={`schema-${resolvedParams.city}-${resolvedParams.service}`}
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
              <li>
                <Link
                  href={`/locations/essex-county/${resolvedParams.city}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {city.name}
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-700" aria-current="page">
                {service.name}
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative bg-blue-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {service.title} in {city.name}
              </h1>
              <p className="text-xl mb-8">
                {service.description} Serving {city.name}'s {city.population.toLocaleString()}{' '}
                residents with professional travel services.
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
                  Book Online
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Local Service Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Why Choose Our {service.name} in {city.name}?
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Local Expertise</h3>
                  <p className="text-gray-700 mb-4">
                    Our team knows {city.name} inside and out. We understand the unique needs of our{' '}
                    {city.population.toLocaleString()} residents and provide tailored{' '}
                    {service.name.toLowerCase()} solutions.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Convenient pickup locations throughout {city.name}
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Local knowledge of best routes and timing
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Established relationships with {city.name} organizations
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Service Benefits</h3>
                  <ul className="space-y-2 text-gray-700">
                    {serviceContent.benefits?.slice(0, 5).map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Details */}
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
                    <div className="text-4xl mb-4">
                      {index === 0
                        ? '🏢'
                        : index === 1
                          ? '👨‍👩‍👧‍👦'
                          : index === 2
                            ? '🎯'
                            : index === 3
                              ? '🎉'
                              : '⭐'}
                    </div>
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

        {/* Coverage Area */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Serving {city.name} and Nearby Areas
              </h2>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <p className="text-gray-700 mb-6">
                  Our {service.name.toLowerCase()} services extend throughout {city.name} and
                  neighboring Essex County communities. With our central Newark office at 744 Broad
                  Street, we're perfectly positioned to serve all {city.population.toLocaleString()}{' '}
                  residents of {city.name}.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {ESSEX_CITIES.filter((c) => c.slug !== resolvedParams.city)
                    .slice(0, 8)
                    .map((nearbyCity) => (
                      <Link
                        key={nearbyCity.slug}
                        href={`/locations/essex-county/${nearbyCity.slug}/${resolvedParams.service}`}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        {nearbyCity.name}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Services in City */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Other Services Available in {city.name}
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {ESSEX_SERVICES.filter((s) => s.slug !== resolvedParams.service)
                  .slice(0, 6)
                  .map((otherService) => (
                    <Link
                      key={otherService.slug}
                      href={`/locations/essex-county/${resolvedParams.city}/${otherService.slug}`}
                      className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow block"
                    >
                      <h3 className="font-semibold text-lg mb-2 text-blue-900">
                        {otherService.name}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {otherService.description}
                      </p>
                      <span className="text-blue-600 text-sm mt-3 inline-block hover:underline">
                        Learn more →
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
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
                      <strong>Serving {city.name}:</strong>{' '}
                      {Math.round(
                        Math.sqrt(
                          Math.pow(city.coordinates.lat - NEWARK_OFFICE.coordinates.latitude, 2) +
                            Math.pow(city.coordinates.lng - NEWARK_OFFICE.coordinates.longitude, 2)
                        ) * 69
                      )}{' '}
                      miles from our office
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

        {/* Final CTA */}
        <section className="py-16 bg-orange-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Book {service.name} in {city.name}?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of satisfied {city.name} residents who trust Next Trip Anywhere
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18338741019"
                className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Call Now: 833-874-1019
              </a>
              <a
                href="/book"
                className="bg-blue-900 text-white hover:bg-blue-800 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Book Online
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
