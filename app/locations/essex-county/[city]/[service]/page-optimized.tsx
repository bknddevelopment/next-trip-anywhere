/**
 * Ultra-Optimized Essex County Service Pages
 * Performance-first implementation with all optimizations
 * Target: LCP <2.5s, FID <100ms, CLS <0.1
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
import { generateResourceHints, extractCriticalCSS } from '@/lib/performance/optimization'

// Ultra-optimized lazy loading with smaller chunks
const ServiceDetails = dynamic(
  () => import('@/components/essex-county/ServiceDetails').then((mod) => mod.default),
  {
    loading: () => <ServiceDetailsSkeleton />,
    ssr: true,
  }
)

const OtherServices = dynamic(
  () => import('@/components/essex-county/OtherServices').then((mod) => mod.default),
  {
    loading: () => <OtherServicesSkeleton />,
    ssr: false, // Client-side only for below-fold content
  }
)

const ContactSection = dynamic(
  () => import('@/components/essex-county/ContactSection').then((mod) => mod.default),
  {
    loading: () => <ContactSectionSkeleton />,
    ssr: false,
  }
)

const PerformanceMonitor = dynamic(
  () => import('@/components/performance/PerformanceMonitor').then((mod) => mod.default),
  {
    ssr: false,
  }
)

// Skeleton components for better perceived performance
const ServiceDetailsSkeleton = () => (
  <div className="h-64 bg-gray-50 animate-pulse" aria-hidden="true" />
)

const OtherServicesSkeleton = () => (
  <div className="h-48 bg-blue-50 animate-pulse" aria-hidden="true" />
)

const ContactSectionSkeleton = () => (
  <div className="h-64 bg-white animate-pulse" aria-hidden="true" />
)

// Generate static params for all combinations
export async function generateStaticParams() {
  return generateAllCombinations()
}

// Optimized metadata generation
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
      robots: 'noindex, nofollow',
    }
  }

  const title = `${service.name} in ${city.name} NJ | Next Trip Anywhere`
  const description = `Professional ${service.name.toLowerCase()} services for ${city.name} residents. ${service.description} Call 833-874-1019.`
  const canonical = `https://nexttripanywhere.com/locations/essex-county/${resolvedParams.city}/${resolvedParams.service}`

  return {
    title,
    description,
    keywords: [...service.keywords, city.name, 'Essex County', 'New Jersey'].join(', '),
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
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    other: {
      'format-detection': 'telephone=no',
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

// Inline critical hero section (no dynamic import for LCP)
const HeroSection = ({ city, service }: { city: any; service: any }) => (
  <section className="relative bg-blue-900 text-white py-20" id="hero">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {service.title} in {city.name}
        </h1>
        <p className="text-xl mb-8">
          {service.description} Serving {city.name}&apos;s {city.population.toLocaleString()}{' '}
          residents.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+18338741019"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-block"
            aria-label="Call us at 833-874-1019"
          >
            Call 833-874-1019
          </a>
          <Link
            href="/book"
            className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-block"
            prefetch={false}
            aria-label="Book your service online"
          >
            Book Online
          </Link>
        </div>
      </div>
    </div>
  </section>
)

// Inline critical service info (important for SEO and UX)
const ServiceInfo = ({
  city,
  service,
  serviceContent,
}: {
  city: any
  service: any
  serviceContent: any
}) => (
  <section className="py-16" id="service-info">
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
              {city.population.toLocaleString()} residents.
            </p>
            <ul className="space-y-2 text-gray-700">
              {[
                `Convenient pickup locations throughout ${city.name}`,
                'Local knowledge of best routes and timing',
                `Established relationships with ${city.name} organizations`,
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2" aria-hidden="true">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Service Benefits</h3>
            <ul className="space-y-2 text-gray-700">
              {serviceContent.benefits?.slice(0, 5).map((benefit: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2" aria-hidden="true">
                    ✓
                  </span>
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

  // Validate params
  if (!isValidCitySlug(resolvedParams.city) || !isValidServiceSlug(resolvedParams.service)) {
    notFound()
  }

  const city = getCityBySlug(resolvedParams.city)!
  const service = getServiceBySlug(resolvedParams.service)!
  const serviceContent = getServiceContent(resolvedParams.service as ServiceSlug, city.name)

  // Generate schema
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

  // Pre-calculate data
  const distanceFromOffice = Math.round(
    Math.sqrt(
      Math.pow(city.coordinates.lat - NEWARK_OFFICE.coordinates.latitude, 2) +
        Math.pow(city.coordinates.lng - NEWARK_OFFICE.coordinates.longitude, 2)
    ) * 69
  )

  return (
    <>
      {/* Critical CSS inline */}
      <style jsx>{`
        ${extractCriticalCSS('hero')}
        ${extractCriticalCSS('serviceInfo')}
      `}</style>

      {/* Resource hints for optimal loading */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

      {/* Structured data - deferred loading */}
      <Script
        id={`schema-${resolvedParams.city}-${resolvedParams.service}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaGraph),
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Breadcrumb - Important for SEO */}
        <nav className="bg-gray-50 py-3 px-4" aria-label="Breadcrumb">
          <div className="container mx-auto">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-blue-600 hover:text-blue-800" prefetch={false}>
                  Home
                </Link>
              </li>
              <li className="text-gray-400" aria-hidden="true">
                /
              </li>
              <li>
                <Link
                  href="/essex-county"
                  className="text-blue-600 hover:text-blue-800"
                  prefetch={false}
                >
                  Essex County
                </Link>
              </li>
              <li className="text-gray-400" aria-hidden="true">
                /
              </li>
              <li>
                <Link
                  href={`/locations/essex-county/${resolvedParams.city}`}
                  className="text-blue-600 hover:text-blue-800"
                  prefetch={false}
                >
                  {city.name}
                </Link>
              </li>
              <li className="text-gray-400" aria-hidden="true">
                /
              </li>
              <li className="text-gray-700" aria-current="page">
                {service.name}
              </li>
            </ol>
          </div>
        </nav>

        {/* Critical above-fold content - inline components */}
        <HeroSection city={city} service={service} />
        <ServiceInfo city={city} service={service} serviceContent={serviceContent} />

        {/* Non-critical content - lazy loaded */}
        <Suspense fallback={<ServiceDetailsSkeleton />}>
          <ServiceDetails service={service} city={city} serviceContent={serviceContent} />
        </Suspense>

        {/* Coverage Area - Semi-critical */}
        <section className="py-16" id="coverage">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Serving {city.name} and Nearby Areas
              </h2>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <p className="text-gray-700 mb-6">
                  Our {service.name.toLowerCase()} services extend throughout {city.name} and
                  neighboring Essex County communities. With our central Newark office at 744 Broad
                  Street, we&apos;re perfectly positioned to serve all{' '}
                  {city.population.toLocaleString()} residents of {city.name}.
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

        {/* Below-fold lazy loaded sections */}
        <Suspense fallback={<OtherServicesSkeleton />}>
          <OtherServices
            currentService={resolvedParams.service}
            currentCity={resolvedParams.city}
            services={[...ESSEX_SERVICES]}
          />
        </Suspense>

        <Suspense fallback={<ContactSectionSkeleton />}>
          <ContactSection city={city} service={service} distanceFromOffice={distanceFromOffice} />
        </Suspense>

        {/* Final CTA */}
        <section className="py-16 bg-orange-500 text-white" id="final-cta">
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
                className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-block"
              >
                Call Now: 833-874-1019
              </a>
              <Link
                href="/book"
                className="bg-blue-900 text-white hover:bg-blue-800 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-block"
                prefetch={false}
              >
                Book Online
              </Link>
            </div>
          </div>
        </section>

        {/* Performance monitoring */}
        <Suspense fallback={null}>
          <PerformanceMonitor />
        </Suspense>
      </main>
    </>
  )
}
