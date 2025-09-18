import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { Phone, MapPin, Clock, Star, Check, Calendar, DollarSign, Ship, Anchor } from 'lucide-react'
import { europeanCruise } from '@/lib/data/cruise-destinations'

export const metadata: Metadata = {
  title: europeanCruise.metaTitle,
  description: europeanCruise.metaDescription,
  keywords:
    'European cruises, Baltic cruises, Norwegian fjords, British Isles cruise, river cruises, Danube cruise, Rhine cruise, Northern Europe cruise, Scandinavia cruise',
  openGraph: {
    title: europeanCruise.metaTitle,
    description: europeanCruise.metaDescription,
    url: 'https://nexttripanywhere.com/cruises/european',
    images: [
      {
        url: 'https://nexttripanywhere.com/images/european-cruise-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'European Cruise Ships in Norwegian Fjords',
      },
    ],
  },
  alternates: {
    canonical: 'https://nexttripanywhere.com/cruises/european',
  },
}

// Generate structured data for SEO
const generateStructuredData = () => {
  const baseUrl = 'https://nexttripanywhere.com'

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TravelAgency',
        '@id': `${baseUrl}/#organization`,
        name: 'Next Trip Anywhere',
        url: baseUrl,
        telephone: '+1-833-874-1019',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'US',
        },
      },
      {
        '@type': 'TouristTrip',
        name: europeanCruise.name,
        description: europeanCruise.heroDescription,
        provider: {
          '@id': `${baseUrl}/#organization`,
        },
        touristType: 'Cruise passengers',
        itinerary: {
          '@type': 'ItemList',
          itemListElement: europeanCruise.popularPorts.map((port, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'TouristDestination',
              name: port.name,
              address: {
                '@type': 'PostalAddress',
                addressCountry: port.country,
              },
              description: port.description,
            },
          })),
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: europeanCruise.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': baseUrl,
              name: 'Home',
            },
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@id': `${baseUrl}/cruises`,
              name: 'Cruises',
            },
          },
          {
            '@type': 'ListItem',
            position: 3,
            item: {
              '@id': `${baseUrl}/cruises/european`,
              name: 'European',
            },
          },
        ],
      },
    ],
  }
}

export default function EuropeanCruisesPage() {
  const structuredData = generateStructuredData()

  return (
    <>
      <Script
        id="european-cruise-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

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
              European
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {europeanCruise.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {europeanCruise.heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18338741019"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call 833-874-1019
              </a>
              <Link
                href="/book"
                className="bg-white text-indigo-900 hover:bg-blue-50 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                Get Free Quote
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Ship className="w-4 h-4" />
                <span>Ocean & River Cruises</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{europeanCruise.averageDuration}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>From ${europeanCruise.priceRange.min}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-900">
              European Cruise Highlights
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {europeanCruise.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-indigo-100 rounded-full p-2 mt-1">
                    <Check className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-gray-700">{highlight}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Ports Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-indigo-900">
              Iconic European Ports of Call
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              From the majestic Norwegian fjords to the historic Baltic capitals, explore Europe's
              most captivating destinations
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {europeanCruise.popularPorts.map((port, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-indigo-900">{port.name}</h3>
                        <p className="text-sm text-gray-500">{port.country}</p>
                      </div>
                      <Anchor className="w-5 h-5 text-indigo-400" />
                    </div>
                    <p className="text-gray-700 mb-4">{port.description}</p>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-gray-700">Must-See Attractions:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {port.attractions.map((attraction, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-indigo-500 mt-0.5">•</span>
                            <span>{attraction}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ocean vs River Cruises */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-900">
              Ocean Cruises vs River Cruises
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-blue-900 flex items-center gap-2">
                  <Ship className="w-6 h-6" />
                  Ocean Cruises
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Large ships with 2,000+ passengers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Extensive onboard amenities & entertainment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Visit coastal cities and islands</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Norwegian fjords, Baltic, and British Isles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>More affordable per-day rates</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-green-900 flex items-center gap-2">
                  <Anchor className="w-6 h-6" />
                  River Cruises
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Intimate ships with 150-200 passengers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Dock in city centers, no tender boats</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>All-inclusive with excursions included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Rhine, Danube, Seine, and Douro rivers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Cultural immersion and scenic cruising</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cruise Lines Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-indigo-900">
              Premium European Cruise Lines
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              We partner with the finest cruise lines specializing in European itineraries
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {europeanCruise.cruiseLines.map((line, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-3 text-indigo-900">{line.name}</h3>
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Featured Ships:</p>
                    <p className="text-sm text-gray-600">{line.ships.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      What Makes Them Special:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {line.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Best Time to Visit */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-900">
              When to Cruise Europe
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {europeanCruise.bestTimeToVisit.map((season, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-3 text-indigo-900">{season.season}</h3>
                  <div className="mb-3">
                    <span className="text-sm font-semibold text-gray-700">Best Months: </span>
                    <span className="text-sm text-gray-600">{season.months.join(', ')}</span>
                  </div>
                  <p className="text-gray-700">{season.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-900">
              European Cruise Experiences
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {europeanCruise.activities.map((activity, index) => (
                <div
                  key={index}
                  className="bg-indigo-50 rounded-lg p-4 hover:bg-indigo-100 transition-colors"
                >
                  <p className="text-gray-700 text-center">{activity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Book With Us */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-indigo-900">
              Your European Cruise Experts
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              We specialize in European cruises with exclusive benefits and expert planning
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {europeanCruise.whyChooseUs.map((reason, index) => (
                <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg">
                  <Star className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-900">
              European Cruise FAQs
            </h2>
            <div className="space-y-6">
              {europeanCruise.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-bold mb-3 text-indigo-900">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Planning Your European Cruise Today
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            From Norwegian fjords to Mediterranean rivers, we'll create your perfect European voyage
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+18338741019"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call 833-874-1019
            </a>
            <Link
              href="/book"
              className="bg-white text-indigo-900 hover:bg-blue-50 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
            >
              Get Your Free Quote
            </Link>
          </div>
          <p className="mt-8 text-sm text-blue-200">
            European cruise specialists • Exclusive deals • Best price guarantee
          </p>
        </div>
      </section>
    </>
  )
}
