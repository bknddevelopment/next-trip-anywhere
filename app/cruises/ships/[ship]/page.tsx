import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { cruiseShips, getShipBySlug, generateShipStaticParams } from '@/lib/data/cruise-ships'
import ContactFormWithAnalytics from '@/components/forms/ContactFormWithAnalytics'
import { Phone, Mail } from 'lucide-react'

interface ShipPageProps {
  params: Promise<{
    ship: string
  }>
}

export async function generateStaticParams() {
  return generateShipStaticParams()
}

export async function generateMetadata({ params }: ShipPageProps): Promise<Metadata> {
  const { ship: shipSlug } = await params
  const ship = getShipBySlug(shipSlug)

  if (!ship) {
    return {
      title: 'Ship Not Found',
    }
  }

  return {
    title: `${ship.metaTitle} | Next Trip Anywhere`,
    description: ship.metaDescription,
    keywords: ship.keywords.join(', '),
    openGraph: {
      title: ship.metaTitle,
      description: ship.metaDescription,
      url: `https://nexttripanywhere.com/cruises/ships/${ship.slug}/`,
      siteName: 'Next Trip Anywhere',
      images: [
        {
          url: `https://nexttripanywhere.com/images/ships/${ship.slug}-hero.jpg`,
          width: 1200,
          height: 630,
          alt: ship.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: ship.metaTitle,
      description: ship.metaDescription,
      images: [`https://nexttripanywhere.com/images/ships/${ship.slug}-hero.jpg`],
    },
  }
}

export default async function ShipPage({ params }: ShipPageProps) {
  const { ship: shipSlug } = await params
  const ship = getShipBySlug(shipSlug)

  if (!ship) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-3 px-4" aria-label="Breadcrumb">
        <div className="container mx-auto">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <a href="/" className="text-blue-600 hover:text-blue-800">
                Home
              </a>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <a href="/cruises/" className="text-blue-600 hover:text-blue-800">
                Cruises
              </a>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <a
                href={`/cruises/${ship.cruiseLine.toLowerCase().replace(/\s+/g, '-')}/`}
                className="text-blue-600 hover:text-blue-800"
              >
                {ship.cruiseLine}
              </a>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-700" aria-current="page">
              {ship.name}
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-b from-blue-900 to-blue-700 text-white py-20"
        style={{
          minHeight: '400px',
          backgroundImage: 'linear-gradient(to bottom, rgb(30, 58, 138), rgb(29, 78, 216))',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-sm font-semibold text-blue-200 mb-2">{ship.cruiseLine}</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {ship.content.hero.headline}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/95">
              {ship.content.hero.subheadline}
            </p>

            {/* Ship Specs Quick View */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-blue-200">Launched</div>
                <div className="text-2xl font-bold">{ship.content.shipSpecs.launched}</div>
              </div>
              <div>
                <div className="text-sm text-blue-200">Passengers</div>
                <div className="text-2xl font-bold">
                  {ship.content.shipSpecs.passengers.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-blue-200">Decks</div>
                <div className="text-2xl font-bold">{ship.content.shipSpecs.decks}</div>
              </div>
              <div>
                <div className="text-sm text-blue-200">Tonnage</div>
                <div className="text-2xl font-bold">
                  {ship.content.shipSpecs.tonnage.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-blue-200">Crew</div>
                <div className="text-2xl font-bold">
                  {ship.content.shipSpecs.crew.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-blue-200">Length</div>
                <div className="text-2xl font-bold">{ship.content.shipSpecs.length}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18338741019"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
                style={{ touchAction: 'manipulation' }}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call 833-874-1019
              </a>
              <a
                className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
                style={{ touchAction: 'manipulation' }}
                href="/contact/"
              >
                Get Free Quote
              </a>
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
                {ship.content.description}
              </p>

              {/* Key Highlights */}
              <div className="bg-blue-50 rounded-lg p-8 mb-12">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Key Highlights</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {ship.content.highlights.map((highlight, index) => (
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

              {/* Features by Category */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy mb-8">What's On Board {ship.name}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {ship.content.features.map((featureCategory, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-navy mb-4">
                        {featureCategory.category}
                      </h3>
                      <ul className="space-y-2">
                        {featureCategory.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <span className="text-secondary-600 mr-2">•</span>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Local Tips */}
              <div className="bg-yellow-50 rounded-lg p-8 mb-12">
                <h2 className="text-2xl font-bold text-yellow-900 mb-6">
                  Insider Tips for Essex County Travelers
                </h2>
                <ul className="space-y-3">
                  {ship.content.localTips.map((tip, index) => (
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {ship.faq.map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-navy mb-3">{item.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Ready to Book {ship.name}?</h2>
            <p className="text-center text-gray-700 mb-8">
              Get personalized assistance from our Essex County cruise experts
            </p>
            <Suspense fallback={<div className="text-center py-8">Loading form...</div>}>
              <ContactFormWithAnalytics />
            </Suspense>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your {ship.name} Adventure Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied Essex County residents who trust Next Trip Anywhere for
            their cruise vacations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+18338741019"
              className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now: 833-874-1019
            </a>
            <a
              className="bg-blue-900 text-white hover:bg-blue-800 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
              style={{ touchAction: 'manipulation' }}
              href="/contact/"
            >
              Request Free Quote
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
