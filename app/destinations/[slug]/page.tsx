/**
 * @fileoverview Dynamic destination page component
 * @module app/destinations/[slug]/page
 *
 * This is the main page component for individual destination pages.
 * It uses Next.js 14+ App Router with server components for optimal performance.
 * Supports both legacy destinations and new SEO-optimized destination pages.
 */

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { DestinationRepository } from '@/lib/repositories/destination-repository'
import DestinationPageTemplate from '@/components/destinations/DestinationPageTemplate'
import { generateDestinationMetadata } from '@/lib/seo/destination-metadata'
import { generateDestinationStructuredData } from '@/lib/seo/destination-structured-data'
import {
  seoDestinations,
  getDestinationBySlug as getSeoDestinationBySlug,
  type SeoDestination,
} from '@/lib/data/seo-destinations'

// Lazy load contact form
const ContactForm = dynamic(() => import('@/components/forms/ContactFormWithAnalytics'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
})

/**
 * Generate static params for all destination pages
 * This enables static generation at build time for better performance
 * Includes both legacy destinations and SEO destinations
 */
export async function generateStaticParams() {
  // Get legacy destinations
  const response = await DestinationRepository.getAll()
  const legacyParams = response.destinations.map((destination) => ({
    slug: destination.slug,
  }))

  // Get SEO destinations
  const seoParams = seoDestinations.map((destination) => ({
    slug: destination.slug,
  }))

  // Combine and return unique slugs
  const allSlugs = [...legacyParams, ...seoParams]
  const uniqueSlugs = Array.from(new Set(allSlugs.map((p) => p.slug))).map((slug) => ({ slug }))

  return uniqueSlugs
}

/**
 * Generate metadata for the destination page
 * This is used for SEO and social media sharing
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  // Try SEO destination first (higher priority)
  const seoDestination = getSeoDestinationBySlug(slug)
  if (seoDestination) {
    const canonical = `https://nexttripanywhere.com/destinations/${slug}`
    return {
      title: seoDestination.metaTitle,
      description: seoDestination.metaDescription,
      keywords: seoDestination.keywords.join(', '),
      alternates: {
        canonical,
      },
      openGraph: {
        title: seoDestination.metaTitle,
        description: seoDestination.metaDescription,
        url: canonical,
        type: 'website',
        locale: 'en_US',
        siteName: 'Next Trip Anywhere',
        images: [
          {
            url: `/images/destinations/${slug}-hero.jpg`,
            width: 1200,
            height: 630,
            alt: seoDestination.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: seoDestination.metaTitle,
        description: seoDestination.metaDescription,
        images: [`/images/destinations/${slug}-hero.jpg`],
      },
    }
  }

  // Fall back to legacy destination
  const destination = await DestinationRepository.getBySlug(slug)
  if (!destination) {
    return {
      title: 'Destination Not Found',
      description: 'The requested destination could not be found.',
    }
  }

  return generateDestinationMetadata(destination)
}

// SEO Destination Page Component
function SeoDestinationPage({ destination }: { destination: SeoDestination }) {
  return (
    <main className="min-h-screen">
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
              <Link href="/destinations" className="text-blue-600 hover:text-blue-800">
                Destinations
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-700" aria-current="page">
              {destination.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {destination.content.hero.headline}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {destination.content.hero.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18338741019"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call 833-874-1019
              </a>
              <Link
                href="/contact"
                className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                Plan Your Trip
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                {destination.content.description}
              </p>

              {/* Highlights */}
              <div className="bg-blue-50 rounded-lg p-8 mb-12">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Destination Highlights</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {destination.content.highlights.map((highlight, index) => (
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

              {/* Travel Info */}
              <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Travel Information from Newark
                </h2>
                <dl className="grid md:grid-cols-2 gap-4">
                  <div>
                    <dt className="font-semibold text-gray-700">Flight Time:</dt>
                    <dd className="text-gray-600">{destination.content.travelInfo.flightTime}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-700">Time Zone:</dt>
                    <dd className="text-gray-600">{destination.content.travelInfo.timeZone}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-700">Best Time to Visit:</dt>
                    <dd className="text-gray-600">
                      {destination.content.travelInfo.bestTimeToVisit}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-700">Average Temperature:</dt>
                    <dd className="text-gray-600">
                      {destination.content.travelInfo.averageTemperature}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-700">Currency:</dt>
                    <dd className="text-gray-600">{destination.content.travelInfo.currency}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-700">Airlines from Newark:</dt>
                    <dd className="text-gray-600">
                      {destination.content.travelInfo.airlines.join(', ')}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Attractions */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Attractions</h2>
                <ul className="grid md:grid-cols-2 gap-3">
                  {destination.content.attractions.map((attraction, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <svg
                        className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {attraction}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Local Tips */}
              <div className="bg-yellow-50 rounded-lg p-8 mb-12">
                <h2 className="text-2xl font-bold text-yellow-900 mb-6">
                  Insider Tips for Essex County Travelers
                </h2>
                <ul className="space-y-3">
                  {destination.content.localTips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-yellow-600 mr-3 font-bold">{index + 1}.</span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {destination.faq && destination.faq.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {destination.faq.map((item, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.question}</h3>
                    <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Ready to Visit {destination.title}?
            </h2>
            <p className="text-center text-gray-700 mb-8">
              Get personalized travel planning from our Essex County experts
            </p>
            <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse rounded-lg" />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  )
}

/**
 * Destination page component
 * Server component that fetches and displays destination data
 */
export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Check if this is an SEO destination first
  const seoDestination = getSeoDestinationBySlug(slug)
  if (seoDestination) {
    // Generate schema for SEO destination
    const seoSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'TravelAgency',
          name: 'Next Trip Anywhere',
          url: 'https://nexttripanywhere.com',
          telephone: '+1-833-874-1019',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Newark',
            addressRegion: 'NJ',
            addressCountry: 'US',
          },
        },
        {
          '@type': 'TouristDestination',
          name: seoDestination.title,
          description: seoDestination.metaDescription,
          url: `https://nexttripanywhere.com/destinations/${slug}`,
        },
        {
          '@type': 'FAQPage',
          mainEntity: seoDestination.faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        },
      ],
    }

    return (
      <>
        <Script
          id={`destination-schema-${slug}`}
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoSchema),
          }}
        />
        <SeoDestinationPage destination={seoDestination} />
      </>
    )
  }

  // Fall back to legacy destination handling
  const destination = await DestinationRepository.getBySlug(slug)
  if (!destination) {
    notFound()
  }

  const relatedDestinations = await DestinationRepository.getRelated(destination, 4)
  const structuredData = generateDestinationStructuredData(destination)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <DestinationPageTemplate
        destination={destination}
        relatedDestinations={relatedDestinations}
      />
    </>
  )
}
