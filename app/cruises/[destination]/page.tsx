/**
 * Performance-Optimized Dynamic Cruise Destination Pages
 * Implements Core Web Vitals optimizations, lazy loading, and critical CSS
 * SEO-optimized with comprehensive schema markup and local SEO focus
 */

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Suspense, lazy } from 'react'
import { cruiseDestinations, getCruiseBySlug, type CruiseDestination } from '@/lib/data/cruises'
import { generateCruiseSchemaGraph, generateCruiseBreadcrumbSchema } from '@/lib/utils/cruiseSchema'

// Lazy load ALL non-critical components for optimal performance
const ContactForm = dynamic(() => import('@/components/forms/ContactFormWithAnalytics'), {
  loading: () => (
    <div
      className="h-96 bg-gray-50 animate-pulse rounded-lg"
      aria-label="Loading contact form..."
    />
  ),
})

// Lazy load below-fold sections
const FAQSection = lazy(() => import('./components/FAQSection'))
const RelatedCruises = lazy(() => import('./components/RelatedCruises'))
const PricingSection = lazy(() => import('./components/PricingSection'))

// Generate static params for all cruise destinations
export async function generateStaticParams() {
  return cruiseDestinations.map((cruise) => ({
    destination: cruise.slug,
  }))
}

// Generate metadata for each cruise page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ destination: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const cruise = getCruiseBySlug(resolvedParams.destination)

  if (!cruise) {
    return {
      title: 'Page Not Found',
      description: 'The requested cruise destination could not be found.',
    }
  }

  const canonical = `https://nexttripanywhere.com/cruises/${resolvedParams.destination}`

  return {
    title: cruise.metaTitle,
    description: cruise.metaDescription,
    keywords: cruise.keywords.join(', '),
    alternates: {
      canonical,
    },
    openGraph: {
      title: cruise.metaTitle,
      description: cruise.metaDescription,
      url: canonical,
      type: 'website',
      locale: 'en_US',
      siteName: 'Next Trip Anywhere',
      images: [
        {
          url: `/images/cruises/${resolvedParams.destination}-hero.jpg`,
          width: 1200,
          height: 630,
          alt: cruise.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: cruise.metaTitle,
      description: cruise.metaDescription,
      images: [`/images/cruises/${resolvedParams.destination}-hero.jpg`],
    },
  }
}

// Optimized Hero section with critical CSS inline for LCP
const HeroSection = ({ cruise }: { cruise: CruiseDestination }) => (
  <section
    className="relative bg-gradient-to-b from-blue-900 to-blue-700 text-white py-20"
    style={{
      // Inline critical styles for LCP optimization
      minHeight: '400px',
      backgroundImage: 'linear-gradient(to bottom, rgb(30, 58, 138), rgb(29, 78, 216))',
    }}
  >
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          {cruise.content.hero.headline}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100">{cruise.content.hero.subheadline}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+18338741019"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
            // Add touch-action for better mobile performance
            style={{ touchAction: 'manipulation' }}
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Call 833-874-1019
          </a>
          <Link
            href="/contact"
            className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
            style={{ touchAction: 'manipulation' }}
            prefetch={false} // Don't prefetch contact page to save bandwidth
          >
            Get Free Quote
          </Link>
        </div>
      </div>
    </div>
  </section>
)

// Optimized Main content section
const ContentSection = ({ cruise }: { cruise: CruiseDestination }) => (
  <section className="py-16">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">{cruise.content.description}</p>

          {/* Key Highlights */}
          <div className="bg-blue-50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Key Highlights</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {cruise.content.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Port Information */}
          {cruise.content.portInfo && (
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {cruise.content.portInfo.name}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Address</h3>
                  <p className="text-gray-600">{cruise.content.portInfo.address}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Distance from Essex County</h3>
                  <p className="text-gray-600">{cruise.content.portInfo.distance}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Parking Information</h3>
                  <p className="text-gray-600">{cruise.content.portInfo.parkingInfo}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Directions</h3>
                  <p className="text-gray-600">{cruise.content.portInfo.directions}</p>
                </div>
              </div>
            </div>
          )}

          {/* Cruise Lines */}
          {cruise.content.popularCruiseLines && cruise.content.popularCruiseLines.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Cruise Lines</h2>
              <ul className="space-y-3">
                {cruise.content.popularCruiseLines.map((line, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100 4h2a1 1 0 100 2 2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Travel Tips */}
          {cruise.content.localTips && cruise.content.localTips.length > 0 && (
            <div className="bg-yellow-50 rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-yellow-900 mb-6">
                Insider Tips for Essex County Travelers
              </h2>
              <ul className="space-y-3">
                {cruise.content.localTips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-600 mr-3 font-bold">{index + 1}.</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
)

// Loading skeleton component
const LoadingSkeleton = () => (
  <div className="animate-pulse bg-gray-100 rounded-lg p-8">
    <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
  </div>
)

// Optimized pricing section component is now lazy loaded

// Related cruises section is now lazy loaded

// Main page component
export default async function CruiseDestinationPage({
  params,
}: {
  params: Promise<{ destination: string }>
}) {
  const resolvedParams = await params
  const cruise = getCruiseBySlug(resolvedParams.destination)

  if (!cruise) {
    notFound()
  }

  // Generate schema markup
  const schemaGraph = generateCruiseSchemaGraph(cruise)

  return (
    <>
      {/* Preconnect to external domains for faster resource loading */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

      {/* Schema Markup - Use afterInteractive for non-critical */}
      <Script
        id={`cruise-schema-${resolvedParams.destination}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaGraph),
        }}
      />

      <main className="min-h-screen">
        {/* Breadcrumb Navigation */}
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
                  href="/cruises"
                  className="text-blue-600 hover:text-blue-800"
                  prefetch={false}
                >
                  Cruises
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-700" aria-current="page">
                {cruise.title}
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <HeroSection cruise={cruise} />

        {/* Main Content - Critical, render immediately */}
        <ContentSection cruise={cruise} />

        {/* Below-fold content - Lazy load with Suspense */}

        {/* Pricing Section - Lazy loaded */}
        <Suspense fallback={<LoadingSkeleton />}>
          <PricingSection cruise={cruise} />
        </Suspense>

        {/* FAQ Section - Lazy loaded */}
        <Suspense fallback={<LoadingSkeleton />}>
          <FAQSection cruise={cruise} />
        </Suspense>

        {/* Related Cruises - Lazy loaded */}
        <Suspense fallback={<LoadingSkeleton />}>
          <RelatedCruises currentSlug={cruise.slug} />
        </Suspense>

        {/* Contact Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                Ready to Book Your {cruise.title}?
              </h2>
              <p className="text-center text-gray-700 mb-8">
                Get personalized assistance from our Essex County cruise experts
              </p>
              <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse rounded-lg" />}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-orange-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Start Your Cruise Adventure Today</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied Essex County residents who trust Next Trip Anywhere for
              their cruise vacations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18338741019"
                className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call Now: 833-874-1019
              </a>
              <Link
                href="/contact"
                className="bg-blue-900 text-white hover:bg-blue-800 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
                style={{ touchAction: 'manipulation' }}
                prefetch={false}
              >
                Request Free Quote
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
