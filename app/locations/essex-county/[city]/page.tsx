/**
 * Optimized Essex County City Landing Page
 * Performance optimizations: Next.js Image, lazy loading, code splitting
 * Target: Lighthouse score 90+, LCP <2.5s, FID <100ms, CLS <0.1
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
  getCityBySlug,
  isValidCitySlug,
} from '@/lib/seo/essex-county-services'
import { generateTownSpecificSchema, NEWARK_OFFICE } from '@/lib/seo/essex-county-schema'
import { truncateTitle, truncateDescription } from '@/lib/seo/meta-utils'

// Lazy load non-critical sections
const PopularDestinations = dynamic(() => import('@/components/essex-county/PopularDestinations'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  ssr: true,
})

const NearbyCities = dynamic(() => import('@/components/essex-county/NearbyCities'), {
  loading: () => <div className="h-48 bg-blue-50 animate-pulse" />,
})

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

  const fullTitle = `Travel Services in ${city.name}, NJ | Next Trip Anywhere`
  const title = truncateTitle(fullTitle)
  const fullDescription = `Complete travel services for ${city.name} residents. Airport transfers, group travel, corporate travel, cruises & more. Call 833-874-1019.`
  const description = truncateDescription(fullDescription)
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
          url: `/images/essex-county/${resolvedParams.city}-hero.jpg`,
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
      images: [`/images/essex-county/${resolvedParams.city}-hero.jpg`],
    },
  }
}

// Service icons with lazy loading
const ServiceIcon = ({ icon, size = 'text-4xl' }: { icon: string; size?: string }) => (
  <span className={`${size} select-none`} role="img" aria-hidden="true">
    {icon}
  </span>
)

// Optimized service card component
const ServiceCard = ({ service, city, icon }: { service: any; city: string; icon: string }) => (
  <Link
    href={`/locations/essex-county/${city}/${service.slug}`}
    className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 block"
    prefetch={false}
  >
    <div className="p-6">
      <div className="mb-4 text-center">
        <ServiceIcon icon={icon} />
      </div>
      <h3 className="font-semibold text-xl mb-3 text-blue-900 text-center">{service.name}</h3>
      <p className="text-gray-600 text-sm mb-4">{service.description}</p>
      <div className="text-blue-600 text-sm font-medium hover:underline">Learn more →</div>
    </div>
  </Link>
)

export default async function CityLandingPageOptimized({
  params,
}: {
  params: Promise<{ city: string }>
}) {
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

  // Calculate distance for performance (pre-computed)
  const distanceFromOffice = Math.round(
    Math.sqrt(
      Math.pow(city.coordinates.lat - NEWARK_OFFICE.coordinates.latitude, 2) +
        Math.pow(city.coordinates.lng - NEWARK_OFFICE.coordinates.longitude, 2)
    ) * 69
  )

  return (
    <>
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

      {/* Schema Markup - defer parsing */}
      <Script
        id={`schema-${resolvedParams.city}`}
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
              <li className="text-gray-700" aria-current="page">
                {city.name}
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section - Critical, optimized for LCP */}
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
                <Link
                  href="/book"
                  className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                  prefetch={false}
                >
                  Book Your Trip
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators - Above the fold */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Why {city.name} Residents Choose Next Trip Anywhere
              </h2>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ServiceIcon icon="📍" size="text-3xl" />
                  </div>
                  <h3 className="font-semibold text-xl mb-3">Local Presence</h3>
                  <p className="text-gray-700">
                    Just {distanceFromOffice} miles from {city.name} at our Newark office
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ServiceIcon icon="⭐" size="text-3xl" />
                  </div>
                  <h3 className="font-semibold text-xl mb-3">Trusted Service</h3>
                  <p className="text-gray-700">
                    4.8/5 star rating from hundreds of {city.name} travelers
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ServiceIcon icon="💰" size="text-3xl" />
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

        {/* Services Grid - Critical content */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Our Services for {city.name} Residents
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {ESSEX_SERVICES.map((service) => (
                  <ServiceCard
                    key={service.slug}
                    service={service}
                    city={resolvedParams.city}
                    icon={serviceIcons[service.slug] || '🌟'}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Lazy load non-critical sections */}
        <Suspense fallback={<div className="py-16 bg-white" />}>
          <PopularDestinations cityName={city.name} />
        </Suspense>

        <Suspense fallback={<div className="py-16 bg-blue-50" />}>
          <NearbyCities currentCity={resolvedParams.city} cities={[...ESSEX_CITIES]} />
        </Suspense>

        {/* Contact CTA - Important but below fold */}
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
              <Link
                href="/book"
                className="bg-blue-900 text-white hover:bg-blue-800 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                prefetch={false}
              >
                Start Planning Online
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
