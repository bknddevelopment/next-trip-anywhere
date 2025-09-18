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
  Umbrella,
  Waves,
} from 'lucide-react'
import { bahamasCruise } from '@/lib/data/cruise-destinations'

export const metadata: Metadata = {
  title: bahamasCruise.metaTitle,
  description: bahamasCruise.metaDescription,
  keywords:
    'Bahamas cruises, Nassau cruise, Freeport cruise, CocoCay, Half Moon Cay, Caribbean cruise, short cruises, weekend cruises, Florida cruises',
  openGraph: {
    title: bahamasCruise.metaTitle,
    description: bahamasCruise.metaDescription,
    url: 'https://nexttripanywhere.com/cruises/bahamas',
    images: [
      {
        url: 'https://nexttripanywhere.com/images/bahamas-cruise-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Bahamas Cruise Paradise',
      },
    ],
  },
  alternates: {
    canonical: 'https://nexttripanywhere.com/cruises/bahamas',
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
        name: bahamasCruise.name,
        description: bahamasCruise.heroDescription,
        provider: {
          '@id': `${baseUrl}/#organization`,
        },
        touristType: 'Cruise passengers',
        itinerary: {
          '@type': 'ItemList',
          itemListElement: bahamasCruise.popularPorts.map((port, index) => ({
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
        mainEntity: bahamasCruise.faqs.map((faq) => ({
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
              '@id': `${baseUrl}/cruises/bahamas`,
              name: 'Bahamas',
            },
          },
        ],
      },
    ],
  }
}

export default function BahamasCruisesPage() {
  const structuredData = generateStructuredData()

  return (
    <>
      <Script
        id="bahamas-cruise-schema"
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
              Bahamas
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cyan-600 via-blue-600 to-cyan-700 text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {bahamasCruise.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-cyan-50">{bahamasCruise.heroDescription}</p>
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
                className="bg-white text-cyan-700 hover:bg-cyan-50 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                Get Instant Quote
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Depart from Florida</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{bahamasCruise.averageDuration}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>From ${bahamasCruise.priceRange.min}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-8 bg-cyan-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-cyan-700">3-7</p>
              <p className="text-sm text-gray-600">Day Cruises</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-cyan-700">700</p>
              <p className="text-sm text-gray-600">Islands to Explore</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-cyan-700">4</p>
              <p className="text-sm text-gray-600">Florida Ports</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-cyan-700">5</p>
              <p className="text-sm text-gray-600">Private Islands</p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-cyan-900">
              Why Choose a Bahamas Cruise?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bahamasCruise.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-cyan-100 rounded-full p-2 mt-1">
                    <Waves className="w-5 h-5 text-cyan-600" />
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-cyan-900">
              Bahamas Cruise Destinations
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              From bustling Nassau to exclusive private islands, discover the best of the Bahamas
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bahamasCruise.popularPorts.map((port, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-cyan-900">{port.name}</h3>
                        <p className="text-sm text-gray-500">{port.country}</p>
                      </div>
                      <Umbrella className="w-5 h-5 text-cyan-400" />
                    </div>
                    <p className="text-gray-700 mb-4">{port.description}</p>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-gray-700">Popular Activities:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {port.attractions.map((attraction, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-cyan-500 mt-0.5">•</span>
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

      {/* Private Islands Feature */}
      <section className="py-16 bg-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-cyan-900">
              Exclusive Private Island Experiences
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Many cruise lines offer their own private island paradises in the Bahamas, exclusively
              for their guests
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-bold mb-2 text-cyan-800">Perfect Day at CocoCay</h3>
                <p className="text-sm text-gray-500 mb-3">Royal Caribbean</p>
                <p className="text-gray-700">
                  Thrill waterpark, pristine beaches, and the tallest waterslide in North America
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-bold mb-2 text-cyan-800">Half Moon Cay</h3>
                <p className="text-sm text-gray-500 mb-3">Holland America & Carnival</p>
                <p className="text-gray-700">
                  Award-winning private island with horseback riding on the beach
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-bold mb-2 text-cyan-800">Castaway Cay</h3>
                <p className="text-sm text-gray-500 mb-3">Disney Cruise Line</p>
                <p className="text-gray-700">
                  Disney magic meets tropical paradise with character meet-and-greets
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-bold mb-2 text-cyan-800">Great Stirrup Cay</h3>
                <p className="text-sm text-gray-500 mb-3">Norwegian Cruise Line</p>
                <p className="text-gray-700">
                  Pristine beaches with new luxury lagoon and zip line adventures
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-bold mb-2 text-cyan-800">Princess Cays</h3>
                <p className="text-sm text-gray-500 mb-3">Princess Cruises</p>
                <p className="text-gray-700">
                  40 acres of beach paradise with sanctuary adults-only retreat
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-bold mb-2 text-cyan-800">Ocean Cay</h3>
                <p className="text-sm text-gray-500 mb-3">MSC Cruises</p>
                <p className="text-gray-700">
                  Marine reserve island with evening stays and lighthouse shows
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cruise Lines Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-cyan-900">
              Top Bahamas Cruise Lines
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Choose from the best cruise lines offering Bahamas itineraries from Florida
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {bahamasCruise.cruiseLines.map((line, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-3 text-cyan-900">{line.name}</h3>
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Featured Ships:</p>
                    <p className="text-sm text-gray-600">{line.ships.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      What Sets Them Apart:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {line.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="bg-cyan-100 text-cyan-700 text-xs px-3 py-1 rounded-full"
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-cyan-900">
              When to Cruise to the Bahamas
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {bahamasCruise.bestTimeToVisit.map((season, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-3 text-cyan-900">{season.season}</h3>
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

      {/* Activities Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-cyan-900">
              Bahamas Cruise Activities
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {bahamasCruise.activities.map((activity, index) => (
                <div
                  key={index}
                  className="bg-cyan-50 rounded-lg p-4 hover:bg-cyan-100 transition-colors text-center"
                >
                  <p className="text-gray-700">{activity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Book With Us */}
      <section className="py-16 bg-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-cyan-900">
              Exclusive Bahamas Cruise Benefits
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Book with our Bahamas cruise experts and enjoy perks you won't find anywhere else
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {bahamasCruise.whyChooseUs.map((reason, index) => (
                <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg">
                  <Star className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Florida Departure Ports */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-cyan-900">
              Convenient Florida Departure Ports
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Miami</h3>
                <p className="text-sm text-gray-600">
                  Cruise Capital of the World with most departures
                </p>
              </div>
              <div className="text-center">
                <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Fort Lauderdale</h3>
                <p className="text-sm text-gray-600">Port Everglades with easy airport access</p>
              </div>
              <div className="text-center">
                <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Port Canaveral</h3>
                <p className="text-sm text-gray-600">
                  Near Orlando theme parks, perfect for families
                </p>
              </div>
              <div className="text-center">
                <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Jacksonville</h3>
                <p className="text-sm text-gray-600">Less crowded port with unique itineraries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-cyan-900">
              Bahamas Cruise FAQs
            </h2>
            <div className="space-y-6">
              {bahamasCruise.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-bold mb-3 text-cyan-900">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-cyan-700 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Your Bahamas Escape?</h2>
          <p className="text-xl mb-8 text-cyan-100">
            Book your perfect Bahamas cruise today with exclusive deals and expert guidance
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
              className="bg-white text-cyan-700 hover:bg-cyan-50 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
            >
              Check Availability
            </Link>
          </div>
          <p className="mt-8 text-sm text-cyan-200">
            Quick getaways from Florida • Family-friendly • Best prices guaranteed
          </p>
        </div>
      </section>
    </>
  )
}
