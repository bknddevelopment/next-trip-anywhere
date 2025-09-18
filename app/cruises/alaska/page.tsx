/**
 * Alaska Cruises Landing Page
 * High-traffic page targeting 74K monthly searches
 * SEO-optimized with comprehensive content and local schema markup
 */

import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { alaskaCruise } from '@/lib/data/cruise-destinations'
import { TrustBar, DetailedTrustSection } from '@/components/ui/TrustSignals'

// Lazy load non-critical components
const OptimizedImage = dynamic(() => import('@/components/ui/OptimizedImage'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
})

// Generate metadata for SEO
export const metadata: Metadata = {
  title: alaskaCruise.metaTitle,
  description: alaskaCruise.metaDescription,
  keywords: [
    'Alaska cruises',
    'Alaska cruise deals',
    'Inside Passage cruises',
    'Glacier Bay cruises',
    'Alaska cruise packages',
    'best Alaska cruises',
    'Alaska cruise lines',
    'Alaska glacier cruise',
    'Alaska wildlife cruises',
    'Seattle to Alaska cruise',
    'Vancouver to Alaska cruise',
    'Alaska cruise tours',
  ].join(', '),
  alternates: {
    canonical: 'https://nexttripanywhere.com/cruises/alaska',
  },
  openGraph: {
    title: alaskaCruise.metaTitle,
    description: alaskaCruise.metaDescription,
    url: 'https://nexttripanywhere.com/cruises/alaska',
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
    images: [
      {
        url: '/images/cruises/alaska-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Alaska Cruise Glaciers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: alaskaCruise.metaTitle,
    description: alaskaCruise.metaDescription,
    images: ['/images/cruises/alaska-hero.jpg'],
  },
}

// Service card component
const ServiceCard = ({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) => (
  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
    <div className="text-4xl mb-4 text-center">{icon}</div>
    <h3 className="text-xl font-semibold mb-3 text-blue-900">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

// Port card component
const PortCard = ({ port }: { port: any }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1">
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
      <h3 className="text-xl font-semibold">{port.name}</h3>
      <p className="text-blue-100">{port.country}</p>
    </div>
    <div className="p-6">
      <p className="text-gray-700 mb-4">{port.description}</p>
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-600 mb-2">Must-See Attractions:</p>
        <ul className="text-gray-700 text-sm space-y-1">
          {port.attractions.map((attraction: string, idx: number) => (
            <li key={idx} className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              {attraction}
            </li>
          ))}
        </ul>
      </div>
      <Link href="/contact" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
        Plan Your Visit →
      </Link>
    </div>
  </div>
)

export default function AlaskaCruisePage() {
  // Schema markup for SEO
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TravelAgency',
        '@id': 'https://nexttripanywhere.com/#organization',
        name: 'Next Trip Anywhere',
        url: 'https://nexttripanywhere.com',
        telephone: '+1-833-874-1019',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '185 Franklin Ave',
          addressLocality: 'Nutley',
          addressRegion: 'NJ',
          postalCode: '07110',
          addressCountry: 'US',
        },
      },
      {
        '@type': 'TouristTrip',
        name: 'Alaska Cruises',
        description: 'Experience glaciers, wildlife, and stunning landscapes on an Alaska cruise',
        provider: {
          '@id': 'https://nexttripanywhere.com/#organization',
        },
        touristType: 'Cruise passengers',
        itinerary: {
          '@type': 'ItemList',
          itemListElement: alaskaCruise.popularPorts.map((port, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: port.name,
            description: port.description,
          })),
        },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://nexttripanywhere.com/cruises/alaska',
        url: 'https://nexttripanywhere.com/cruises/alaska',
        name: alaskaCruise.metaTitle,
        description: alaskaCruise.metaDescription,
        inLanguage: 'en-US',
        breadcrumb: {
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
              name: 'Cruises',
              item: 'https://nexttripanywhere.com/cruises',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Alaska Cruises',
              item: 'https://nexttripanywhere.com/cruises/alaska',
            },
          ],
        },
      },
    ],
  }

  return (
    <>
      <Script
        id="schema-alaska-cruise"
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
              <li className="text-gray-400">/</li>
              <li>
                <Link href="/cruises" className="text-blue-600 hover:text-blue-800">
                  Cruises
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-700" aria-current="page">
                Alaska
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-800 via-blue-900 to-slate-800 text-white py-20">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {alaskaCruise.heroTitle}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                {alaskaCruise.heroDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+18338741019"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
                >
                  <span className="mr-2">📞</span> Call 833-874-1019
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

        {/* Trust Signals */}
        <section className="bg-white py-8 border-b">
          <div className="container mx-auto px-4">
            <TrustBar />
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Why Choose an Alaska Cruise?</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Alaska cruises offer a once-in-a-lifetime opportunity to explore America's last
                frontier. From the comfort of your ship, witness calving glaciers, breaching whales,
                and soaring eagles while sailing through the pristine waters of the Inside Passage
                and beyond. Each port tells a story of gold rush history, Native heritage, and
                untamed wilderness.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <ServiceCard
                  icon="🏔️"
                  title="Glaciers & Fjords"
                  description="Witness massive glaciers calving into the sea and cruise through dramatic fjords"
                />
                <ServiceCard
                  icon="🐻"
                  title="Wildlife Encounters"
                  description="Spot whales, bears, eagles, sea lions, and more in their natural habitat"
                />
                <ServiceCard
                  icon="⛏️"
                  title="Gold Rush History"
                  description="Explore historic towns and ride the famous White Pass Railway"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Alaska Cruise Highlights</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {alaskaCruise.highlights.map((highlight, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow-lg p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-blue-600 text-xl">✓</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">{highlight}</h3>
                    <p className="text-gray-600 text-sm">
                      Experience the best of Alaska with our expertly crafted cruise itineraries
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Popular Ports */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">Alaska Cruise Ports of Call</h2>
              <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                Each Alaska port offers unique experiences, from glaciers and wildlife to gold rush
                history and Native culture
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {alaskaCruise.popularPorts.map((port, idx) => (
                  <PortCard key={idx} port={port} />
                ))}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-lg p-6 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-5xl mb-4 block">🛳️</span>
                    <h3 className="text-xl font-semibold mb-2 text-blue-900">
                      Plus Scenic Cruising
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Hubbard Glacier, Tracy Arm Fjord, and College Fjord
                    </p>
                    <Link href="/contact" className="text-blue-600 hover:text-blue-800 font-medium">
                      View All Itineraries →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cruise Lines */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Top Alaska Cruise Lines</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {alaskaCruise.cruiseLines.map((line, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-semibold mb-3 text-blue-900">{line.name}</h3>
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-600 mb-2">Featured Ships:</p>
                      <div className="flex flex-wrap gap-2">
                        {line.ships.map((ship, shipIdx) => (
                          <span
                            key={shipIdx}
                            className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                          >
                            {ship}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-2">Specialties:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {line.specialties.map((specialty, specIdx) => (
                          <li key={specIdx}>• {specialty}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Best Time to Visit */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                When to Take an Alaska Cruise
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {alaskaCruise.bestTimeToVisit.map((season, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-semibold mb-2 text-blue-900">{season.season}</h3>
                    <p className="text-orange-500 font-semibold mb-3">{season.months.join(', ')}</p>
                    <p className="text-gray-600">{season.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Alaska Cruise Activities & Excursions
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {alaskaCruise.activities.map((activity, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-4"
                  >
                    <p className="font-medium">{activity}</p>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <p className="text-gray-600 mb-4">
                  From helicopter glacier landings to whale watching, Alaska offers adventures for
                  everyone
                </p>
                <Link
                  href="/contact"
                  className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
                >
                  Explore All Excursions
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Alaska Cruise FAQs</h2>
              {alaskaCruise.faqs.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-blue-900">{faq.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready for Your Alaska Adventure?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let our Alaska cruise experts help you plan the perfect voyage to the Last Frontier.
              We'll find the best ship, itinerary, and cabin to match your dreams and budget.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto mb-8">
              <h3 className="text-2xl font-semibold mb-4">Why Book With Next Trip Anywhere?</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                {alaskaCruise.whyChooseUs.map((reason, idx) => (
                  <div key={idx} className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18338741019"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                <span className="mr-2">📞</span> Call 833-874-1019
              </a>
              <Link
                href="/contact"
                className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Start Planning Your Cruise
              </Link>
            </div>
            <p className="mt-6 text-blue-100">
              Free consultation • No booking fees • Best price guarantee
            </p>
          </div>
        </section>

        {/* Trust Section */}
        <DetailedTrustSection />
      </main>
    </>
  )
}
