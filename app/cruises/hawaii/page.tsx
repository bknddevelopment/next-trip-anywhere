import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import {
  Phone,
  MapPin,
  Clock,
  Star,
  Check,
  Calendar,
  DollarSign,
  Palmtree,
  Mountain,
} from 'lucide-react'
import { hawaiiCruise } from '@/lib/data/cruise-destinations'

export const metadata: Metadata = {
  title: hawaiiCruise.metaTitle,
  description: hawaiiCruise.metaDescription,
  keywords:
    'Hawaii cruises, NCL Pride of America, Hawaiian islands cruise, Maui cruise, Kauai cruise, Big Island cruise, Oahu cruise, inter-island cruise',
  openGraph: {
    title: hawaiiCruise.metaTitle,
    description: hawaiiCruise.metaDescription,
    url: 'https://nexttripanywhere.com/cruises/hawaii',
    images: [
      {
        url: 'https://nexttripanywhere.com/images/hawaii-cruise-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Hawaii Island Hopping Cruise',
      },
    ],
  },
  alternates: {
    canonical: 'https://nexttripanywhere.com/cruises/hawaii',
  },
}

// Custom Volcano Icon Component
const VolcanoIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L8 10H16L12 2Z M7 11L5 16H19L17 11H7Z M4 17L2 22H22L20 17H4Z" />
  </svg>
)

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
        name: hawaiiCruise.name,
        description: hawaiiCruise.heroDescription,
        provider: {
          '@id': `${baseUrl}/#organization`,
        },
        touristType: 'Cruise passengers',
        itinerary: {
          '@type': 'ItemList',
          itemListElement: hawaiiCruise.popularPorts.map((port, index) => ({
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
        mainEntity: hawaiiCruise.faqs.map((faq) => ({
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
              '@id': `${baseUrl}/cruises/hawaii`,
              name: 'Hawaii',
            },
          },
        ],
      },
    ],
  }
}

export default function HawaiiCruisesPage() {
  const structuredData = generateStructuredData()

  return (
    <>
      <Script
        id="hawaii-cruise-schema"
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
              Hawaii
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-800 via-pink-700 to-orange-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {hawaiiCruise.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-pink-100">{hawaiiCruise.heroDescription}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18338741019"
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call 833-874-1019
              </a>
              <Link
                href="/book"
                className="bg-white text-purple-800 hover:bg-purple-50 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                Plan Your Voyage
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>4 Hawaiian Islands</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{hawaiiCruise.averageDuration}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>From ${hawaiiCruise.priceRange.min}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aloha Spirit Section */}
      <section className="py-8 bg-gradient-to-r from-pink-100 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-900">
              Aloha! Experience the Spirit of Hawaii
            </p>
            <p className="text-gray-700 mt-2">
              No inter-island flights needed • Unpack once • See it all
            </p>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-900">
              Why Choose a Hawaii Cruise?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hawaiiCruise.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-purple-100 rounded-full p-2 mt-1">
                    <Check className="w-5 h-5 text-purple-600" />
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

      {/* Hawaiian Islands Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-purple-900">
              Four Magnificent Hawaiian Islands
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Experience the unique character of each island - from volcanic landscapes to pristine
              beaches
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hawaiiCruise.popularPorts.map((port, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-purple-900">{port.name}</h3>
                        <p className="text-sm text-gray-500">Hawaii, USA</p>
                      </div>
                      {port.name.includes('Hilo') || port.name.includes('Kona') ? (
                        <VolcanoIcon className="w-5 h-5 text-orange-500" />
                      ) : (
                        <Mountain className="w-5 h-5 text-purple-400" />
                      )}
                    </div>
                    <p className="text-gray-700 mb-4">{port.description}</p>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-gray-700">Island Highlights:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {port.attractions.map((attraction, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-purple-500 mt-0.5">🌺</span>
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

      {/* NCL Pride of America Feature */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-purple-900">
                NCL Pride of America - The Only Year-Round Hawaii Ship
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-purple-800">What Makes It Special</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5" />
                      <span>Only US-flagged cruise ship in Hawaii</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5" />
                      <span>Sails year-round from Honolulu</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5" />
                      <span>Overnight stays in Maui and Kauai</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5" />
                      <span>100% Hawaii-focused itinerary</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5" />
                      <span>No sea days - new island every day</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-purple-800">7-Day Itinerary</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>
                      <strong>Day 1:</strong> Embark in Honolulu, Oahu
                    </li>
                    <li>
                      <strong>Day 2:</strong> Kahului, Maui (overnight)
                    </li>
                    <li>
                      <strong>Day 3:</strong> Kahului, Maui
                    </li>
                    <li>
                      <strong>Day 4:</strong> Hilo, Big Island
                    </li>
                    <li>
                      <strong>Day 5:</strong> Kona, Big Island
                    </li>
                    <li>
                      <strong>Day 6:</strong> Nawiliwili, Kauai (overnight)
                    </li>
                    <li>
                      <strong>Day 7:</strong> Nawiliwili, Kauai
                    </li>
                    <li>
                      <strong>Day 8:</strong> Return to Honolulu, Oahu
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cruise Lines Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-purple-900">
              Hawaii Cruise Lines & Options
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              From dedicated Hawaii cruises to repositioning voyages from the mainland
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {hawaiiCruise.cruiseLines.map((line, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-3 text-purple-900">{line.name}</h3>
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Ships to Hawaii:</p>
                    <p className="text-sm text-gray-600">{line.ships.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Unique Features:</p>
                    <div className="flex flex-wrap gap-2">
                      {line.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full"
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-900">
              Best Time for Hawaii Cruises
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {hawaiiCruise.bestTimeToVisit.map((season, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-3 text-purple-900">{season.season}</h3>
                  <div className="mb-3">
                    <span className="text-sm font-semibold text-gray-700">Best Months: </span>
                    <span className="text-sm text-gray-600">{season.months.join(', ')}</span>
                  </div>
                  <p className="text-gray-700">{season.reason}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center">
              <p className="text-lg font-semibold text-blue-900 mb-2">🐋 Whale Watching Season</p>
              <p className="text-gray-700">
                December through April - See humpback whales during their annual migration!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-900">
              Unforgettable Hawaii Experiences
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {hawaiiCruise.activities.map((activity, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 hover:from-purple-100 hover:to-pink-100 transition-colors text-center"
                >
                  <p className="text-gray-700">{activity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Book With Us */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-purple-900">
              Your Hawaii Cruise Specialists
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              We're experts in Hawaii cruises with exclusive deals and insider knowledge
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {hawaiiCruise.whyChooseUs.map((reason, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm"
                >
                  <span className="text-2xl">🌺</span>
                  <p className="text-gray-700 text-sm">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cruise Options Comparison */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-900">
              Hawaii Cruise Options
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-purple-800">7-Day Inter-Island</h3>
                <p className="text-sm text-gray-600 mb-3">Pride of America from Honolulu</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ 100% Hawaii focused</li>
                  <li>✓ No sea days</li>
                  <li>✓ Overnight port stays</li>
                  <li>✓ Year-round sailings</li>
                </ul>
                <p className="mt-4 text-purple-700 font-semibold">Competitive Rates Available</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-purple-800">15-Day Round-Trip</h3>
                <p className="text-sm text-gray-600 mb-3">From West Coast ports</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ No flights needed</li>
                  <li>✓ Relaxing sea days</li>
                  <li>✓ Visit 4 islands</li>
                  <li>✓ Spring & fall sailings</li>
                </ul>
                <p className="mt-4 text-purple-700 font-semibold">Best Available Pricing</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-purple-800">10-Day One-Way</h3>
                <p className="text-sm text-gray-600 mb-3">Repositioning cruises</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ Best value option</li>
                  <li>✓ One flight required</li>
                  <li>✓ More sea days</li>
                  <li>✓ Limited dates</li>
                </ul>
                <p className="mt-4 text-purple-700 font-semibold">Exceptional Value Rates</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-900">
              Hawaii Cruise Questions
            </h2>
            <div className="space-y-6">
              {hawaiiCruise.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-bold mb-3 text-purple-900">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-800 to-pink-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Your Hawaiian Adventure Today
          </h2>
          <p className="text-xl mb-8 text-pink-100">
            Experience the Aloha spirit on an unforgettable Hawaii cruise
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+18338741019"
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call 833-874-1019
            </a>
            <Link
              href="/book"
              className="bg-white text-purple-800 hover:bg-purple-50 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
            >
              Request Hawaii Quote
            </Link>
          </div>
          <p className="mt-8 text-sm text-pink-200">
            Hawaii cruise experts • Exclusive NCL rates • Best price guarantee
          </p>
        </div>
      </section>
    </>
  )
}
