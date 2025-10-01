/**
 * Dynamic Vacation Package Pages
 * SEO-optimized pages for vacation packages with static generation
 * Implements comprehensive schema markup and local SEO focus
 */

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import {
  vacationPackages,
  getPackageBySlug,
  type VacationPackage,
} from '@/lib/data/vacation-packages'
import { generatePackageSchemaGraph } from '@/lib/utils/packageSchema'

// Lazy load ALL non-critical components for optimal performance
const ContactForm = dynamic(() => import('@/components/forms/ContactFormWithAnalytics'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg" />,
})

// Lazy load below-fold sections
const FAQSection = dynamic(() => import('./components/FAQSection'), {
  loading: () => <div className="py-16 bg-gray-50 animate-pulse" />,
})

const PricingSection = dynamic(() => import('./components/PricingSection'), {
  loading: () => (
    <div className="py-16 bg-blue-900 animate-pulse">
      <div className="container mx-auto px-4">
        <div className="h-64 bg-white/10 rounded-lg"></div>
      </div>
    </div>
  ),
})

const RelatedPackages = dynamic(() => import('./components/RelatedPackages'), {
  loading: () => (
    <div className="py-16 bg-gray-50 animate-pulse">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="h-64 bg-white rounded-lg"></div>
          <div className="h-64 bg-white rounded-lg"></div>
          <div className="h-64 bg-white rounded-lg"></div>
        </div>
      </div>
    </div>
  ),
})

// Generate static params for all vacation packages
export async function generateStaticParams() {
  return vacationPackages.map((pkg) => ({
    type: pkg.slug,
  }))
}

// Generate metadata for each package page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const pkg = getPackageBySlug(resolvedParams.type)

  if (!pkg) {
    return {
      title: 'Page Not Found',
      description: 'The requested vacation package could not be found.',
    }
  }

  const canonical = `https://nexttripanywhere.com/packages/${resolvedParams.type}`

  return {
    title: pkg.metaTitle,
    description: pkg.metaDescription,
    keywords: pkg.keywords.join(', '),
    alternates: {
      canonical,
    },
    openGraph: {
      title: pkg.metaTitle,
      description: pkg.metaDescription,
      url: canonical,
      type: 'website',
      locale: 'en_US',
      siteName: 'Next Trip Anywhere',
      images: [
        {
          url: `/images/packages/${resolvedParams.type}-hero.jpg`,
          width: 1200,
          height: 630,
          alt: pkg.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pkg.metaTitle,
      description: pkg.metaDescription,
      images: [`/images/packages/${resolvedParams.type}-hero.jpg`],
    },
  }
}

// Hero section component
const HeroSection = ({ pkg }: { pkg: VacationPackage }) => (
  <section className="relative bg-gradient-to-b from-blue-900 to-blue-700 text-white py-20">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          {pkg.content.hero.headline}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/95">{pkg.content.hero.subheadline}</p>
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
            Get Free Quote
          </Link>
        </div>
      </div>
    </div>
  </section>
)

// Main content section
const ContentSection = ({ pkg }: { pkg: VacationPackage }) => (
  <section className="py-16">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">{pkg.content.description}</p>

          {/* Key Highlights */}
          <div className="bg-blue-50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Key Highlights</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {pkg.content.highlights.map((highlight, index) => (
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

          {/* Included Features */}
          {pkg.content.includedFeatures && pkg.content.includedFeatures.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h2>
              <ul className="space-y-3">
                {pkg.content.includedFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Destinations */}
          {pkg.content.destinations && pkg.content.destinations.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Destinations</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pkg.content.destinations.map((destination, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="font-semibold text-gray-800">{destination}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Featured Resorts */}
          {pkg.content.resorts && pkg.content.resorts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Resorts</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {pkg.content.resorts.map((resort, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">{resort.name}</h3>
                    <p className="text-gray-700 mb-3">{resort.location}</p>
                    {resort.rating && (
                      <div className="flex items-center mb-3">
                        <span className="text-yellow-500">
                          {'★'.repeat(Math.floor(resort.rating))}
                        </span>
                        <span className="ml-2 text-gray-700">({resort.rating}/5)</span>
                      </div>
                    )}
                    <ul className="space-y-2">
                      {resort.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-center">
                          <span className="text-green-500 mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Local Advantages */}
          {pkg.content.localAdvantages && pkg.content.localAdvantages.length > 0 && (
            <div className="bg-yellow-50 rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-yellow-900 mb-6">
                Essex County Resident Advantages
              </h2>
              <ul className="space-y-3">
                {pkg.content.localAdvantages.map((advantage, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-600 mr-3 font-bold">{index + 1}.</span>
                    <span className="text-gray-700">{advantage}</span>
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

// Loading skeleton for below-fold content
const LoadingSkeleton = () => (
  <div className="animate-pulse bg-gray-100 rounded-lg p-8">
    <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
  </div>
)

// Main page component
export default async function VacationPackagePage({
  params,
}: {
  params: Promise<{ type: string }>
}) {
  const resolvedParams = await params
  const pkg = getPackageBySlug(resolvedParams.type)

  if (!pkg) {
    notFound()
  }

  // Generate comprehensive schema markup with enhanced rich snippets
  const schemaData = generatePackageSchemaGraph(pkg)

  return (
    <>
      {/* Schema Markup */}
      <Script
        id={`package-schema-${resolvedParams.type}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />

      <main className="min-h-screen">
        {/* Breadcrumb Navigation */}
        <nav className="bg-gray-50 py-3 px-4" aria-label="Breadcrumb">
          <div className="container mx-auto">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-blue-600 hover:text-blue-800">
                  Home
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li>
                <Link href="/packages" className="text-blue-600 hover:text-blue-800">
                  Packages
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li className="text-gray-700" aria-current="page">
                {pkg.title}
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <HeroSection pkg={pkg} />

        {/* Main Content - Critical, render immediately */}
        <ContentSection pkg={pkg} />

        {/* Below-fold content - Lazy load with Suspense for better code splitting */}

        {/* Pricing Section - Lazy loaded */}
        <Suspense fallback={<LoadingSkeleton />}>
          <PricingSection pkg={pkg} />
        </Suspense>

        {/* FAQ Section - Lazy loaded */}
        <Suspense fallback={<LoadingSkeleton />}>
          <FAQSection pkg={pkg} />
        </Suspense>

        {/* Related Packages - Lazy loaded */}
        <Suspense fallback={<LoadingSkeleton />}>
          <RelatedPackages currentSlug={pkg.slug} />
        </Suspense>

        {/* Contact Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                Ready to Book Your {pkg.title}?
              </h2>
              <p className="text-center text-gray-700 mb-8">
                Get personalized assistance from our Essex County travel experts
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
            <h2 className="text-3xl font-bold mb-4">Start Your Dream Vacation Today</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied Essex County residents who trust Next Trip Anywhere for
              their vacation packages
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
