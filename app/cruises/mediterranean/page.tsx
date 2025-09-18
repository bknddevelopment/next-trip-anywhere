import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { Phone, MapPin, Clock, Star, Check, Calendar, DollarSign, Users } from 'lucide-react'
import { mediterraneanCruise } from '@/lib/data/cruise-destinations'

export const metadata: Metadata = {
  title: mediterraneanCruise.metaTitle,
  description: mediterraneanCruise.metaDescription,
  keywords:
    'Mediterranean cruises, Greek islands cruise, Italy cruise, Spain cruise, Croatia cruise, French Riviera cruise, Mediterranean ports, cruise deals, luxury cruises',
  openGraph: {
    title: mediterraneanCruise.metaTitle,
    description: mediterraneanCruise.metaDescription,
    url: 'https://nexttripanywhere.com/cruises/mediterranean',
    images: [
      {
        url: 'https://nexttripanywhere.com/images/mediterranean-cruise-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Mediterranean Cruise Ships',
      },
    ],
  },
  alternates: {
    canonical: 'https://nexttripanywhere.com/cruises/mediterranean',
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
        name: mediterraneanCruise.name,
        description: mediterraneanCruise.heroDescription,
        provider: {
          '@id': `${baseUrl}/#organization`,
        },
        touristType: 'Cruise passengers',
        itinerary: {
          '@type': 'ItemList',
          itemListElement: mediterraneanCruise.popularPorts.map((port, index) => ({
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
        mainEntity: mediterraneanCruise.faqs.map((faq) => ({
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
              '@id': `${baseUrl}/cruises/mediterranean`,
              name: 'Mediterranean',
            },
          },
        ],
      },
    ],
  }
}

export default function MediterraneanCruisesPage() {
  const structuredData = generateStructuredData()

  return (
    <>
      <Script
        id="mediterranean-cruise-schema"
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
              Mediterranean
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {mediterraneanCruise.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {mediterraneanCruise.heroDescription}
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
                className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                Get Free Quote
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Multiple Departure Ports</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{mediterraneanCruise.averageDuration}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>From ${mediterraneanCruise.priceRange.min}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
              Why Choose a Mediterranean Cruise?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediterraneanCruise.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-blue-100 rounded-full p-2 mt-1">
                    <Check className="w-5 h-5 text-blue-600" />
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-900">
              Popular Mediterranean Ports
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Explore ancient civilizations, stunning coastlines, and vibrant cultures at these
              iconic Mediterranean destinations
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediterraneanCruise.popularPorts.map((port, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-blue-900">{port.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{port.country}</p>
                    <p className="text-gray-700 mb-4">{port.description}</p>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-gray-700">Top Attractions:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {port.attractions.map((attraction, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-blue-500 mt-0.5">•</span>
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

      {/* Cruise Lines Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-900">
              Top Mediterranean Cruise Lines
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              We work with the best cruise lines to bring you exceptional Mediterranean experiences
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {mediterraneanCruise.cruiseLines.map((line, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-3 text-blue-900">{line.name}</h3>
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Ships:</p>
                    <p className="text-sm text-gray-600">{line.ships.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-2">
                      {line.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full"
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
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
              Best Time to Cruise the Mediterranean
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {mediterraneanCruise.bestTimeToVisit.map((season, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-3 text-blue-900">{season.season}</h3>
                  <div className="mb-3">
                    <span className="text-sm font-semibold text-gray-700">Months: </span>
                    <span className="text-sm text-gray-600">{season.months.join(', ')}</span>
                  </div>
                  <p className="text-gray-700">{season.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Book With Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-900">
              Why Book Your Mediterranean Cruise With Us?
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              As certified cruise specialists, we provide exclusive benefits you won't find booking
              directly
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mediterraneanCruise.whyChooseUs.map((reason, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
              Mediterranean Cruise Activities
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mediterraneanCruise.activities.map((activity, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <p className="text-gray-700">{activity}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {mediterraneanCruise.faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-3 text-blue-900">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Book Your Mediterranean Adventure?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Let our cruise experts help you plan the perfect Mediterranean cruise
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
              className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
            >
              Start Planning Online
            </Link>
          </div>
          <p className="mt-8 text-sm text-blue-200">
            Available 7 days a week • Expert cruise specialists • Best price guarantee
          </p>
        </div>
      </section>
    </>
  )
}
