import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Phone, Ship, MapPin, Calendar, DollarSign, Users, Anchor, Star } from 'lucide-react'

const LegitTrustBadges = dynamic(() => import('@/components/home/LegitTrustBadges'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg m-4" />,
})

export const metadata: Metadata = {
  title: 'Royal Caribbean Ships 2025 | Complete Fleet Guide | Oasis, Icon & Quantum Class',
  description:
    'Complete Royal Caribbean fleet guide: 28 ships from Oasis-class mega-ships to Icon of the Seas. Compare sizes, features, itineraries. Expert booking 833-874-1019.',
  keywords: [
    'royal caribbean ships',
    'oasis class ships',
    'icon of the seas',
    'quantum class',
    'royal caribbean fleet',
    'biggest cruise ships',
    'symphony of the seas',
  ],
  openGraph: {
    title: 'Royal Caribbean Ships Complete Guide 2025 | All 28 Ships',
    description:
      'Expert guide to Royal Caribbean fleet: Icon-class, Oasis-class, Quantum-class mega-ships. Compare features, sizes, destinations.',
    type: 'website',
  },
}

export default function RoyalCaribbeanShipsPage() {
  const iconClass = [
    {
      name: 'Icon of the Seas',
      year: '2024',
      tonnage: '250,800',
      passengers: '7,600',
      highlights:
        "World's largest cruise ship, 8 neighborhoods, Category 6 waterpark, Thrill Island with Crown's Edge",
      homePort: 'Miami',
      wow: 'Surfside neighborhood for families, AquaDome with entertainment, 6 waterslides',
    },
  ]

  const oasisClass = [
    {
      name: 'Wonder of the Seas',
      year: '2022',
      tonnage: '236,857',
      passengers: '6,988',
      highlights: '8th wonder at sea, Suite Neighborhood, Wonder Playscape, Wonder Main Dining',
      homePort: 'Port Canaveral',
      length: '1,188 feet',
    },
    {
      name: 'Symphony of the Seas',
      year: '2018',
      tonnage: '228,081',
      passengers: '6,680',
      highlights: 'Ultimate Abyss slide (10 decks), laser tag, water slides, Hairspray musical',
      homePort: 'Miami',
      length: '1,188 feet',
    },
    {
      name: 'Harmony of the Seas',
      year: '2016',
      tonnage: '226,963',
      passengers: '6,780',
      highlights: 'Bionic Bar (robot bartenders), Ultimate Abyss, slide duo (Cyclone/Typhoon)',
      homePort: 'Port Canaveral',
      length: '1,188 feet',
    },
    {
      name: 'Oasis of the Seas',
      year: '2009',
      tonnage: '226,838',
      passengers: '6,780',
      highlights: 'Original Oasis-class, revolutionized cruising, Central Park with 20,000 plants',
      homePort: 'Miami',
      length: '1,187 feet',
    },
    {
      name: 'Allure of the Seas',
      year: '2010',
      tonnage: '225,282',
      passengers: '6,780',
      highlights: 'Twin to Oasis, AquaTheater shows, 7 distinct neighborhoods',
      homePort: 'Port Canaveral',
      length: '1,187 feet',
    },
  ]

  const quantumClass = [
    {
      name: 'Odyssey of the Seas',
      year: '2021',
      tonnage: '169,379',
      passengers: '4,198',
      highlights: 'SeaPlex (bumper cars/sports), North Star observation capsule, FlowRider surf',
      homePort: 'Fort Lauderdale',
    },
    {
      name: 'Spectrum of the Seas',
      year: '2019',
      tonnage: '169,379',
      passengers: '4,246',
      highlights: 'China market specialist, SeaPlex, Star Moment karaoke pods',
      homePort: 'Shanghai',
    },
    {
      name: 'Ovation of the Seas',
      year: '2016',
      tonnage: '168,666',
      passengers: '4,180',
      highlights: 'Alaska specialist, North Star, iFLY skydiving, RipCord by iFLY',
      homePort: 'Seattle (seasonal)',
    },
    {
      name: 'Quantum of the Seas',
      year: '2014',
      tonnage: '168,666',
      passengers: '4,180',
      highlights: 'First Quantum-class, introduced North Star & RipCord, technology pioneer',
      homePort: 'Singapore',
    },
    {
      name: 'Anthem of the Seas',
      year: '2015',
      tonnage: '168,666',
      passengers: '4,180',
      highlights: 'Cape Liberty year-round, Bermuda specialist, North Star, SeaPlex',
      homePort: 'Cape Liberty (NJ)',
    },
  ]

  const signatureFeatures = [
    {
      title: 'Central Park',
      ships: 'Oasis & Icon Class',
      description:
        '20,000+ live plants, open-air promenade, specialty dining, tranquil escape mid-ship',
    },
    {
      title: 'Boardwalk',
      ships: 'Oasis & Icon Class',
      description: 'Coney Island vibes, AquaTheater shows, carousel, outdoor entertainment',
    },
    {
      title: 'North Star',
      ships: 'Quantum Class',
      description: 'Glass observation capsule rises 300 feet above sea level for 360° views',
    },
    {
      title: 'Ultimate Abyss',
      ships: 'Oasis Class',
      description: 'Tallest slide at sea - 10-story spiral drop from Deck 16 to 6',
    },
    {
      title: 'FlowRider',
      ships: 'Most Ships',
      description: 'Surf simulator - learn to surf with 40-foot wave',
    },
    {
      title: 'Perfect Day at CocoCay',
      ships: 'Caribbean itineraries',
      description:
        'Private island with Thrill Waterpark, zip line, beach club, exclusive for Royal guests',
    },
  ]

  const shipComparison = [
    {
      category: 'Mega-Ships (200K+ tons)',
      ships: 'Icon, Wonder, Symphony, Harmony, Oasis, Allure',
      bestFor: 'Variety, families, never-get-bored travelers',
      pros: 'Most activities, dining options, entertainment choices',
      cons: 'Can feel crowded at embarkation/debarkation',
    },
    {
      category: 'Large Ships (160-200K tons)',
      ships: 'Quantum-class (Odyssey, Anthem, Ovation, Quantum, Spectrum)',
      bestFor: 'Tech lovers, active travelers, Alaska cruisers',
      pros: 'North Star, RipCord skydiving, SeaPlex, technology features',
      cons: 'No Central Park neighborhood',
    },
    {
      category: 'Mid-Size (90-160K tons)',
      ships: 'Freedom, Liberty, Voyager-class',
      bestFor: 'Traditional cruisers, couples, value seekers',
      pros: 'Less crowded, easier navigation, lower pricing',
      cons: 'Fewer dining/entertainment options vs mega-ships',
    },
    {
      category: 'Classic Ships (70-90K tons)',
      ships: 'Vision-class (Grandeur, Rhapsody, Vision)',
      bestFor: 'Intimate experience, European itineraries',
      pros: 'Port-intensive itineraries, personalized service',
      cons: 'Limited dining options, older ships',
    },
  ]

  const newJerseyShips = [
    {
      ship: 'Anthem of the Seas',
      class: 'Quantum-class',
      size: '168,666 tons',
      capacity: '4,180 passengers',
      homePort: 'Cape Liberty (Bayonne, NJ)',
      routes: 'Bermuda (May-Oct), Caribbean (Nov-Apr), Canada/New England (Fall)',
      pricing: '$699-$1,899 per person for 7 days',
      essexAdvantage: '20-minute drive from Newark - year-round convenience',
    },
    {
      ship: 'Adventure of the Seas',
      class: 'Voyager-class',
      size: '138,000 tons',
      capacity: '3,807 passengers',
      homePort: 'Cape Liberty (seasonal)',
      routes: 'Bermuda, Caribbean, short cruises',
      pricing: '$599-$1,499 per person for 7 days',
      essexAdvantage: 'Smaller ship, easier to navigate, excellent value',
    },
  ]

  const faqs = [
    {
      question: 'What is the biggest Royal Caribbean ship?',
      answer:
        "Icon of the Seas (launched January 2024) is the world's largest cruise ship at 250,800 gross tons, carrying 7,600 passengers. It features 8 neighborhoods including Surfside (families), Thrill Island (adventure seekers), and the AquaDome. Second-largest is Wonder of the Seas (236,857 tons, 6,988 passengers). The Oasis-class ships (Symphony, Harmony, Oasis, Allure) follow at 225,000-228,000 tons each.",
    },
    {
      question: 'Which Royal Caribbean ships sail from New Jersey?',
      answer:
        'Anthem of the Seas is homeported year-round at Cape Liberty in Bayonne, NJ - just 20 minutes from Essex County. Anthem offers 7-day Bermuda cruises (May-October), Caribbean sailings (November-April), and Canada/New England fall foliage cruises. Adventure of the Seas also operates seasonal Cape Liberty departures. This is the only Royal Caribbean homeport in the Northeast - perfect for Essex County residents to avoid flights.',
    },
    {
      question: "What's the difference between Oasis-class and Quantum-class ships?",
      answer:
        'Oasis-class ships (Oasis, Allure, Harmony, Symphony, Wonder, Icon) are larger (225K-250K tons) with 7-8 neighborhoods including Central Park (open-air with live plants) and Boardwalk (entertainment district). They have Ultimate Abyss slides and AquaTheater shows. Quantum-class ships (Quantum, Anthem, Ovation, Odyssey, Spectrum) are smaller (168K tons) but technologically advanced with North Star observation capsule, RipCord skydiving simulator, and SeaPlex (bumper cars, sports court). Quantum-class better for Alaska/cold weather; Oasis-class better for Caribbean variety.',
    },
    {
      question: 'Which Royal Caribbean ship is best for families?',
      answer:
        'Icon of the Seas has the dedicated Surfside neighborhood designed for young families with water playground, family dining, family-friendly staterooms, and easy beach access. Wonder of the Seas offers Wonder Playscape and Suite Neighborhood. Oasis-class ships (Symphony, Harmony) have Splashaway Bay aqua park, Ultimate Abyss slides, Dreamworks characters, and Adventure Ocean kids clubs for ages 3-17. All ships offer complimentary kids programs, water slides, rock climbing, and family-friendly entertainment.',
    },
    {
      question: 'How do I choose the right Royal Caribbean ship?',
      answer:
        'Consider: (1) Destination - Oasis-class for Caribbean, Quantum for Alaska, smaller ships for Europe; (2) Activities - mega-ships for variety, Quantum for tech features; (3) Crowd preference - larger ships feel less crowded per-passenger but have more people total; (4) Budget - newer/larger ships cost more; (5) Departure port - Cape Liberty (NJ) offers Anthem and Adventure year-round for Essex County convenience. We help match you to the perfect ship based on your priorities and travel dates.',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'TravelAgency',
                '@id': 'https://nexttripanywhere.com/#organization',
                name: 'Next Trip Anywhere',
                description: 'Royal Caribbean Fleet Experts - Essex County NJ',
                url: 'https://nexttripanywhere.com',
                telephone: '833-874-1019',
                areaServed: {
                  '@type': 'State',
                  name: 'New Jersey',
                },
              },
              {
                '@type': 'FAQPage',
                mainEntity: faqs.map((faq) => ({
                  '@type': 'Question',
                  name: faq.question,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer,
                  },
                })),
              },
            ],
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Ship className="w-5 h-5" />
              <span className="text-sm font-semibold">28 Ships • World&apos;s Largest Fleet</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Royal Caribbean Ships: Complete 2025 Fleet Guide
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-cyan-100">
              Icon of the Seas • Oasis-Class Mega-Ships • Quantum-Class Innovation • Anthem from NJ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="tel:833-874-1019"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call 833-874-1019
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-cyan-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-cyan-600 transition-colors"
              >
                Get Free Quote
              </Link>
            </div>
            <p className="text-cyan-100 text-sm">
              <MapPin className="w-4 h-4 inline mr-2" />
              Essex County&apos;s Royal Caribbean Experts • Anthem Sails from Cape Liberty (20 min
              away)
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-xl text-gray-700 leading-relaxed">
            <strong>Royal Caribbean International</strong> operates the world&apos;s most innovative
            cruise fleet with 28 ships ranging from the groundbreaking Icon of the Seas
            (world&apos;s largest at 250,800 tons) to classic Vision-class vessels. The fleet spans
            five distinct classes: Icon (newest), Oasis (mega-ships with neighborhoods), Quantum
            (technology leaders), Freedom/Voyager (mid-size favorites), and Vision (intimate
            classics).
          </p>
          <p className="text-gray-700 leading-relaxed">
            For <strong>Essex County, NJ travelers</strong>, Royal Caribbean offers year-round
            convenience with Anthem of the Seas and seasonal Adventure of the Seas sailing from Cape
            Liberty in Bayonne - just 20 minutes from Newark, Montclair, and Bloomfield. Skip the
            airports and cruise directly to Bermuda, the Caribbean, and Canada/New England.
          </p>
        </div>

        {/* Icon Class */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Star className="w-8 h-8 text-yellow-500" />
            Icon Class: The World&apos;s Largest
          </h2>
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-600 p-8 rounded-lg mb-8">
            {iconClass.map((ship) => (
              <div key={ship.name}>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{ship.name}</h3>
                <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                  <div>
                    <p className="mb-2">
                      <strong>Launched:</strong> {ship.year}
                    </p>
                    <p className="mb-2">
                      <strong>Size:</strong> {ship.tonnage} gross tons
                    </p>
                    <p className="mb-2">
                      <strong>Passengers:</strong> {ship.passengers} (double occupancy)
                    </p>
                    <p className="mb-2">
                      <strong>Home Port:</strong> {ship.homePort}
                    </p>
                  </div>
                  <div>
                    <p className="mb-3">
                      <strong>Highlights:</strong> {ship.highlights}
                    </p>
                    <p>
                      <strong>Wow Factor:</strong> {ship.wow}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Oasis Class */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Oasis Class: Neighborhood Mega-Ships
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            The revolutionary Oasis-class introduced the neighborhood concept with 7-8 distinct
            zones including Central Park (20,000 live plants) and Boardwalk (entertainment
            district). These are the world&apos;s 2nd-6th largest ships.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {oasisClass.map((ship) => (
              <div
                key={ship.name}
                className="bg-white border-2 border-blue-200 rounded-lg p-6 hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{ship.name}</h3>
                <div className="space-y-2 text-gray-700 text-sm">
                  <p>
                    <strong>Year:</strong> {ship.year} • <strong>Size:</strong> {ship.tonnage} tons
                  </p>
                  <p>
                    <strong>Capacity:</strong> {ship.passengers} passengers
                  </p>
                  <p>
                    <strong>Length:</strong> {ship.length}
                  </p>
                  <p className="text-blue-700 mt-3">{ship.highlights}</p>
                  <p className="text-sm text-gray-600">
                    <MapPin className="w-3 h-3 inline mr-1" />
                    {ship.homePort}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quantum Class */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Quantum Class: Technology & Innovation
          </h2>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
            <p className="text-lg text-gray-800">
              <strong>Essex County Advantage:</strong> Anthem of the Seas is homeported year-round
              at Cape Liberty - the only Royal Caribbean ship in the Northeast. No flights required!
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quantumClass.map((ship) => (
              <div key={ship.name} className="bg-white border border-gray-300 rounded-lg p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{ship.name}</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>{ship.year}</strong> • {ship.tonnage} tons
                  </p>
                  <p>{ship.passengers} passengers</p>
                  <p className="text-blue-600 text-xs mt-2">{ship.highlights}</p>
                  <p className="text-gray-600 text-xs pt-2 border-t">
                    <MapPin className="w-3 h-3 inline" /> {ship.homePort}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Signature Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Signature Features Across the Fleet
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {signatureFeatures.map((feature) => (
              <div
                key={feature.title}
                className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-6 border border-cyan-200"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-blue-600 font-semibold mb-3">{feature.ships}</p>
                <p className="text-gray-700 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ship Comparison */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Which Ship Class Is Right For You?
          </h2>
          <div className="space-y-6">
            {shipComparison.map((comp) => (
              <div key={comp.category} className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{comp.category}</h3>
                <p className="text-blue-600 font-semibold mb-3">Ships: {comp.ships}</p>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-bold text-gray-900 mb-2">Best For:</p>
                    <p className="text-gray-700">{comp.bestFor}</p>
                  </div>
                  <div>
                    <p className="font-bold text-green-700 mb-2">Pros:</p>
                    <p className="text-gray-700">{comp.pros}</p>
                  </div>
                  <div>
                    <p className="font-bold text-red-700 mb-2">Cons:</p>
                    <p className="text-gray-700">{comp.cons}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NJ Ships */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Anchor className="w-8 h-8 text-blue-600" />
            Royal Caribbean from Cape Liberty (NJ)
          </h2>
          <div className="space-y-6">
            {newJerseyShips.map((item) => (
              <div key={item.ship} className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.ship}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2 text-gray-700">
                    <p>
                      <strong>Class:</strong> {item.class}
                    </p>
                    <p>
                      <strong>Size:</strong> {item.size}
                    </p>
                    <p>
                      <strong>Capacity:</strong> {item.capacity}
                    </p>
                    <p>
                      <strong>Home Port:</strong> {item.homePort}
                    </p>
                  </div>
                  <div className="space-y-2 text-gray-700">
                    <p>
                      <strong>Routes:</strong> {item.routes}
                    </p>
                    <p>
                      <strong>Pricing:</strong> {item.pricing}
                    </p>
                    <p className="text-blue-700 font-semibold pt-2 border-t border-blue-200">
                      {item.essexAdvantage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white rounded-2xl p-12 text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Perfect Royal Caribbean Ship?
          </h2>
          <p className="text-xl mb-8 text-cyan-100">
            Expert guidance • Ship comparisons • Best available rates • Essex County specialists
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:833-874-1019"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call 833-874-1019
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-600 transition-colors border-2 border-white"
            >
              Get Free Quote
            </Link>
          </div>
        </section>

        <LegitTrustBadges />

        {/* Related */}
        <section className="mt-16 border-t pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Guides</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/cruises/royal-caribbean-nj"
              className="text-blue-600 hover:underline font-medium"
            >
              Royal Caribbean from NJ
            </Link>
            <Link
              href="/cruises/carnival-cruise-line"
              className="text-blue-600 hover:underline font-medium"
            >
              Carnival Cruise Line
            </Link>
            <Link
              href="/cruises/cape-liberty-port"
              className="text-blue-600 hover:underline font-medium"
            >
              Cape Liberty Port Guide
            </Link>
            <Link href="/cruises" className="text-blue-600 hover:underline font-medium">
              All Cruises
            </Link>
          </div>
        </section>
      </article>
    </div>
  )
}
