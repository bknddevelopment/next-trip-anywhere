/**
 * Optimized Essex County Service Pages
 * Performance optimizations: Code splitting, lazy loading, optimized rendering
 * Target metrics: LCP <2.5s, FID <100ms, CLS <0.1
 */

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
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
import { generateEssexCountyMeta } from '@/lib/seo/meta-utils'

// Lazy load non-critical components
const ServiceDetails = dynamic(() => import('@/components/essex-county/ServiceDetails'), {
  loading: () => <div className="h-64 bg-gray-50 animate-pulse" />,
  ssr: true,
})

const OtherServices = dynamic(() => import('@/components/essex-county/OtherServices'), {
  loading: () => <div className="h-48 bg-blue-50 animate-pulse" />,
})

const ContactSection = dynamic(() => import('@/components/essex-county/ContactSection'), {
  loading: () => <div className="h-64 bg-white animate-pulse" />,
})

// Comprehensive Newark Airport Transfer component
const NewarkAirportTransfer = dynamic(
  () => import('@/components/essex-county/NewarkAirportTransfer'),
  {
    loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />,
    ssr: true,
  }
)

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

  // Generate SEO-optimized metadata with proper length limits
  const { title, description } = generateEssexCountyMeta(
    service.name,
    city.name,
    `${service.description} Expert travel planning for ${city.name} residents.`
  )

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
          url: `/images/essex-county/${resolvedParams.service}-hero.jpg`,
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
      images: [`/images/essex-county/${resolvedParams.service}-hero.jpg`],
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

// Optimized hero section component
const HeroSection = ({ city, service }: { city: any; service: any }) => (
  <section className="relative bg-blue-900 text-white py-20">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {service.title} in {city.name}
        </h1>
        <p className="text-xl mb-8">
          {service.description} Serving {city.name}'s {city.population.toLocaleString()} residents
          with professional travel services.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+18338741019"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            Call 833-874-1019
          </a>
          <Link
            href="/book"
            className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            prefetch={false}
          >
            Book Online
          </Link>
        </div>
      </div>
    </div>
  </section>
)

// Main service information component
const ServiceInfo = ({
  city,
  service,
  serviceContent,
}: {
  city: any
  service: any
  serviceContent: any
}) => (
  <section className="py-16">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Our {service.name} in {city.name}?
        </h2>

        {/* City-specific description if available */}
        {serviceContent.citySpecific?.description && (
          <p className="text-lg text-gray-700 text-center mb-8 max-w-3xl mx-auto">
            {serviceContent.citySpecific.description}
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Local Expertise</h3>
            <p className="text-gray-700 mb-4">
              {serviceContent.citySpecific?.localHighlight ||
                `Our team knows ${city.name} inside and out. We understand the unique needs of our ${city.population.toLocaleString()} residents and provide tailored ${service.name.toLowerCase()} solutions.`}
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
              {serviceContent.benefits?.slice(0, 6).map((benefit: string, index: number) => (
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
)

export default async function OptimizedServicePage({ params }: PageParams) {
  const resolvedParams = await params

  // Validate params and get data
  if (!isValidCitySlug(resolvedParams.city) || !isValidServiceSlug(resolvedParams.service)) {
    notFound()
  }

  const city = getCityBySlug(resolvedParams.city)!
  const service = getServiceBySlug(resolvedParams.service)!
  const serviceContent = getServiceContent(resolvedParams.service as ServiceSlug, city.name)

  // Use comprehensive Newark Airport component for airport transfers
  if (resolvedParams.service === 'airport-transfers') {
    return (
      <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <main className="min-h-screen">
          <Suspense fallback={<div className="min-h-screen bg-gray-50 animate-pulse" />}>
            <NewarkAirportTransfer cityName={city.name} citySlug={city.slug} />
          </Suspense>
        </main>
      </>
    )
  }

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

  // Pre-calculate distance
  const distanceFromOffice = Math.round(
    Math.sqrt(
      Math.pow(city.coordinates.lat - NEWARK_OFFICE.coordinates.latitude, 2) +
        Math.pow(city.coordinates.lng - NEWARK_OFFICE.coordinates.longitude, 2)
    ) * 69
  )

  return (
    <>
      {/* Resource hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

      {/* Schema Markup - lazy loaded */}
      <Script
        id={`schema-${resolvedParams.city}-${resolvedParams.service}`}
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaGraph),
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Breadcrumb - Critical */}
        <nav className="bg-gray-50 py-3 px-4" aria-label="Breadcrumb">
          <div className="container mx-auto">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-blue-600 hover:text-blue-800" prefetch={false}>
                  Home
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <Link
                  href="/essex-county"
                  className="text-blue-600 hover:text-blue-800"
                  prefetch={false}
                >
                  Essex County
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <Link
                  href={`/locations/essex-county/${resolvedParams.city}`}
                  className="text-blue-600 hover:text-blue-800"
                  prefetch={false}
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

        {/* Hero Section - Critical for LCP */}
        <HeroSection city={city} service={service} />

        {/* Service Information - Important */}
        <ServiceInfo city={city} service={service} serviceContent={serviceContent} />

        {/* Lazy load non-critical sections */}
        <Suspense fallback={<div className="py-16 bg-gray-50" />}>
          <ServiceDetails service={service} city={city} serviceContent={serviceContent} />
        </Suspense>

        {/* Coverage Area - Semi-critical */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Serving {city.name} and Nearby Areas
              </h2>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <p className="text-gray-700 mb-6">
                  Our {service.name.toLowerCase()} services extend throughout {city.name} and
                  neighboring Essex County communities. As a virtual travel agency, we're perfectly
                  positioned to serve all {city.population.toLocaleString()} residents of{' '}
                  {city.name} with personalized service from the comfort of your home.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {ESSEX_CITIES.filter((c) => c.slug !== resolvedParams.city)
                    .slice(0, 8)
                    .map((nearbyCity) => (
                      <Link
                        key={nearbyCity.slug}
                        href={`/locations/essex-county/${nearbyCity.slug}/${resolvedParams.service}`}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                        prefetch={false}
                      >
                        {nearbyCity.name}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lazy load other services */}
        <Suspense fallback={<div className="py-16 bg-blue-50" />}>
          <OtherServices
            currentService={resolvedParams.service}
            currentCity={resolvedParams.city}
            services={[...ESSEX_SERVICES]}
          />
        </Suspense>

        {/* Lazy load contact section */}
        <Suspense fallback={<div className="py-16 bg-white" />}>
          <ContactSection city={city} service={service} distanceFromOffice={distanceFromOffice} />
        </Suspense>

        {/* Final CTA - Important but below fold */}
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
              <Link
                href="/book"
                className="bg-blue-900 text-white hover:bg-blue-800 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                prefetch={false}
              >
                Book Online
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
