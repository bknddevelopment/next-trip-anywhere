import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Phone, Ship, MapPin, Calendar, DollarSign, Users, Anchor } from 'lucide-react'

const LegitTrustBadges = dynamic(() => import('@/components/home/LegitTrustBadges'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg m-4" />,
})

export const metadata: Metadata = {
  title: 'Carnival Cruise Line 2025 | Complete Guide | Ships, Deals & Departures from NJ',
  description:
    'Complete Carnival Cruise Line guide for Essex County travelers. 24 ships, Fun Ship experience, Cape Liberty departures. Expert booking from Next Trip Anywhere. Call 833-874-1019.',
  keywords: [
    'carnival cruise line',
    'carnival cruises',
    'fun ship carnival',
    'carnival ships',
    'carnival cruise deals',
    'carnival from new jersey',
    'carnival cape liberty',
  ],
  openGraph: {
    title: 'Carnival Cruise Line Complete Guide 2025 | Essex County NJ',
    description:
      'Expert Carnival cruise guide: 24 ships, Fun Ship experience, Cape Liberty departures. Book with local NJ travel agency.',
    type: 'website',
  },
}

export default function CarnivalCruiseLinePage() {
  const carnivalFleet = [
    {
      name: 'Carnival Celebration',
      year: '2022',
      tonnage: '183,521',
      passengers: '5,374',
      highlights: 'Excel-class flagship, BOLT roller coaster, 6 themed zones',
      homePort: 'Miami',
    },
    {
      name: 'Carnival Jubilee',
      year: '2023',
      tonnage: '183,521',
      passengers: '5,374',
      highlights: 'Excel-class, BOLT coaster, Gateway Brewhouse, Caribbean departures',
      homePort: 'Galveston',
    },
    {
      name: 'Carnival Venezia',
      year: '2023',
      tonnage: '135,225',
      passengers: '4,134',
      highlights: 'Italian-themed, Mediterranean flair, unique European design',
      homePort: 'New York',
    },
    {
      name: 'Mardi Gras',
      year: '2021',
      tonnage: '180,800',
      passengers: '5,282',
      highlights: 'First Excel-class, BOLT roller coaster, 6 themed zones',
      homePort: 'Port Canaveral',
    },
    {
      name: 'Carnival Panorama',
      year: '2019',
      tonnage: '133,596',
      passengers: '3,954',
      highlights: 'Vista-class, SkyRide aerial bike, Mexican Riviera specialist',
      homePort: 'Long Beach',
    },
    {
      name: 'Carnival Horizon',
      year: '2018',
      tonnage: '133,596',
      passengers: '3,954',
      highlights: 'Vista-class, Dr. Seuss WaterWorks, IMAX theater',
      homePort: 'Miami',
    },
  ]

  const funShipFeatures = [
    {
      title: 'BOLT Ultimate Sea Coaster',
      description:
        'First roller coaster at sea - 800-foot track with 40 MPH speeds on select Excel-class ships',
      ships: 'Celebration, Jubilee, Mardi Gras',
    },
    {
      title: 'WaterWorks Aqua Park',
      description:
        'Industry-leading water parks with Twister Waterslide, PowerDrencher bucket, splash zones',
      ships: 'All ships',
    },
    {
      title: 'Guys Burger Joint',
      description:
        "Celebrity chef Guy Fieri's complimentary burger venue - voted best burgers at sea",
      ships: 'Most ships',
    },
    {
      title: 'RedFrog Pub & BlueIguana Cantina',
      description:
        'Caribbean-themed bar with exclusive RedFrog beer + Mexican cantina with fresh burritos',
      ships: 'Most ships',
    },
    {
      title: 'Seuss at Sea',
      description:
        'Dr. Seuss-themed experiences - character breakfasts, parades, Green Eggs & Ham café',
      ships: 'All ships',
    },
    {
      title: 'Playlist Productions',
      description: 'Broadway-style shows with live singing, original music, theatrical productions',
      ships: 'All ships',
    },
  ]

  const capeLibertySchedule = [
    {
      destination: 'Bermuda',
      duration: '7 days',
      frequency: 'Weekly May-October',
      pricing: '$699-$1,499',
      ship: 'Carnival Venezia',
    },
    {
      destination: 'Caribbean',
      duration: '6-8 days',
      frequency: 'Year-round',
      pricing: '$549-$1,299',
      ship: 'Carnival Venezia',
    },
    {
      destination: 'Canada & New England',
      duration: '7-10 days',
      frequency: 'Fall foliage season',
      pricing: '$799-$1,699',
      ship: 'Carnival Venezia',
    },
  ]

  const cabinTypes = [
    {
      category: 'Interior Stateroom',
      size: '185 sq ft',
      occupancy: '2-4 guests',
      price: '$549-$899',
      features: 'Two twin beds (converts to king), private bathroom, ample storage',
    },
    {
      category: 'Ocean View',
      size: '185-220 sq ft',
      occupancy: '2-4 guests',
      price: '$649-$1,099',
      features: 'Picture window or porthole, natural light, sea views',
    },
    {
      category: 'Balcony Stateroom',
      size: '185-230 sq ft + balcony',
      occupancy: '2-4 guests',
      price: '$849-$1,499',
      features: 'Private balcony, two chairs, sliding glass door, premium location',
    },
    {
      category: 'Suite',
      size: '275-430 sq ft',
      occupancy: '4-6 guests',
      price: '$1,499-$3,999',
      features: 'Separate living area, premium bathroom, priority boarding, concierge service',
    },
  ]

  const faqs = [
    {
      question: 'What makes Carnival Cruise Line different from other cruise lines?',
      answer:
        'Carnival is known as "The Fun Ships" with a focus on value, casual atmosphere, and innovative features. They invented the lido deck concept, pioneered waterslides at sea, and created the first roller coaster on a cruise ship (BOLT). Carnival offers excellent value with included dining options, WaterWorks aqua parks on every ship, and partnerships with celebrity chefs like Guy Fieri. The atmosphere is relaxed and family-friendly with activities for all ages.',
    },
    {
      question: 'Which Carnival ships sail from Cape Liberty (Bayonne) near Essex County?',
      answer:
        'Carnival Venezia is the primary ship sailing from Cape Liberty in Bayonne, NJ - just 20 minutes from most Essex County communities. This Italian-themed ship offers 7-day Bermuda cruises in summer, 6-8 day Caribbean sailings, and fall foliage cruises to Canada/New England. The Cape Liberty port is incredibly convenient for Newark, Montclair, Bloomfield, and all Essex County residents - avoid flights and enjoy free parking or easy drop-off.',
    },
    {
      question: "What's included in a Carnival cruise fare?",
      answer:
        'Your Carnival cruise fare includes: accommodations, all main dining room meals and complimentary restaurants (Guys Burger Joint, BlueIguana Cantina, pizza, deli, 24-hour room service), WaterWorks aqua park, entertainment (shows, comedy, live music), kids programs (Camp Ocean), fitness center access, and most onboard activities. Optional extras include specialty dining ($15-45 per person), alcoholic beverages, shore excursions, spa services, casino, and specialty coffee.',
    },
    {
      question: 'How early should Essex County travelers book a Carnival cruise?',
      answer:
        'For Cape Liberty departures, book 6-9 months ahead for best cabin selection and pricing, especially for summer Bermuda cruises and peak travel periods (holidays, spring break, summer vacation). Early booking discounts average $100-300 per cabin. Last-minute deals (30-90 days out) can offer 30-60% savings but cabin choices are very limited. We monitor Carnival\'s "Early Saver" rates and "Last Minute Deals" daily to find the best value for our Essex County clients.',
    },
    {
      question: 'What are the best Carnival ships for families vs couples?',
      answer:
        'For families: Mardi Gras, Celebration, and Jubilee (Excel-class) offer BOLT roller coaster, massive WaterWorks parks, Dr. Seuss experiences, and family harbor staterooms sleeping 5. For couples: Carnival Venezia (Italian romance theme), Vista-class ships with Havana cabins (exclusive pool access), and any ship with Cloud 9 Spa balcony cabins. All Carnival ships are family-friendly with Camp Ocean kids programs ages 2-11 and Circle C/Club O2 for teens.',
    },
  ]

  const essexCountyTips = [
    'Drive to Cape Liberty in 20-30 minutes from most Essex County towns - free parking available or use our transfer service',
    'Book shore excursions through us before sailing - we offer 15-20% discounts vs booking onboard',
    'Cheers! beverage package ($59.95/day) pays for itself after 6 drinks - purchase before sailing for best rate',
    'VIFP (Very Important Fun Person) program is FREE - earn points toward future perks and cabin upgrades',
    'Fly-cruise packages to Miami/Port Canaveral for newer ships - we bundle airfare from Newark with cruise for total savings',
    'Early boarding (arrive at port 11am-12pm) gives you first access to lunch and afternoon activities',
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
                description: 'Essex County Carnival Cruise Specialists',
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
              {
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
                    name: 'Carnival Cruise Line',
                    item: 'https://nexttripanywhere.com/cruises/carnival-cruise-line',
                  },
                ],
              },
            ],
          }),
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 via-blue-700 to-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Ship className="w-5 h-5" />
              <span className="text-sm font-semibold">
                America&apos;s #1 Cruise Line • 24 Fun Ships
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Carnival Cruise Line Complete Guide 2025
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              The Fun Ships™ • BOLT Roller Coaster • Guy Fieri Dining • Cape Liberty Departures
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
                className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-600 transition-colors"
              >
                Get Free Quote
              </Link>
            </div>
            <p className="text-blue-100 text-sm">
              <MapPin className="w-4 h-4 inline mr-2" />
              Serving Newark, Montclair, Bloomfield & All Essex County • 20 Minutes to Cape Liberty
              Port
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-xl text-gray-700 leading-relaxed">
            <strong>Carnival Cruise Line</strong> is America&apos;s most popular cruise line,
            carrying more passengers than any other cruise company. Known as &quot;The Fun
            Ships,&quot; Carnival invented the modern cruise vacation with their pioneering lido
            deck concept in 1972 and continues to innovate with industry firsts like the BOLT roller
            coaster at sea.
          </p>
          <p className="text-gray-700 leading-relaxed">
            For <strong>Essex County travelers</strong>, Carnival offers exceptional convenience
            with year-round departures from Cape Liberty in Bayonne - just 20-30 minutes from
            Newark, Montclair, Bloomfield, and surrounding communities. Skip the airports and enjoy
            easy drive-up cruising to Bermuda, the Caribbean, and Canada/New England.
          </p>
          <p className="text-gray-700 leading-relaxed">
            With a fleet of 24 Fun Ships ranging from intimate 2,000-passenger vessels to massive
            5,300-passenger mega-ships, Carnival combines excellent value, innovative features,
            casual atmosphere, and activities for all ages. This complete guide covers everything
            Essex County travelers need to know about sailing with Carnival in 2025.
          </p>
        </div>

        {/* Carnival Fleet Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Ship className="w-8 h-8 text-red-600" />
            Carnival Fleet: 24 Ships & Growing
          </h2>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
            <p className="text-lg text-gray-800">
              <strong>Fleet Highlights:</strong> Excel-class (newest, BOLT coaster), Vista-class
              (SkyRide, IMAX), Dream-class (massive water parks), Spirit-class (intimate 2,000
              passengers). Carnival launches new ships every 1-2 years with innovative features.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {carnivalFleet.map((ship) => (
              <div
                key={ship.name}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{ship.name}</h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Launched:</strong> {ship.year} • <strong>Size:</strong> {ship.tonnage}{' '}
                    tons
                  </p>
                  <p>
                    <strong>Passengers:</strong> {ship.passengers} double occupancy
                  </p>
                  <p>
                    <strong>Highlights:</strong> {ship.highlights}
                  </p>
                  <p className="text-sm text-blue-600">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Home Port: {ship.homePort}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Complete Carnival Fleet (2025)</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700">
              <div>
                <strong className="text-red-600">Excel Class (newest):</strong>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                  <li>Celebration (2022)</li>
                  <li>Jubilee (2023)</li>
                  <li>Mardi Gras (2021)</li>
                </ul>
              </div>
              <div>
                <strong className="text-red-600">Vista Class:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                  <li>Panorama (2019)</li>
                  <li>Horizon (2018)</li>
                  <li>Vista (2016)</li>
                </ul>
              </div>
              <div>
                <strong className="text-red-600">Dream Class:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                  <li>Breeze (2012)</li>
                  <li>Magic (2011)</li>
                  <li>Dream (2009)</li>
                </ul>
              </div>
              <div>
                <strong className="text-red-600">Conquest Class:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                  <li>Venezia (2023, ex-Costa)</li>
                  <li>Sunrise (2023, ex-Costa)</li>
                  <li>Freedom (2007)</li>
                  <li>Liberty (2005)</li>
                  <li>Valor (2004)</li>
                  <li>Glory (2003)</li>
                  <li>Conquest (2002)</li>
                </ul>
              </div>
              <div>
                <strong className="text-red-600">Spirit Class:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                  <li>Miracle (2004)</li>
                  <li>Legend (2002)</li>
                  <li>Pride (2002)</li>
                  <li>Spirit (2001)</li>
                </ul>
              </div>
              <div>
                <strong className="text-red-600">Fantasy Class:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                  <li>Paradise (1998)</li>
                  <li>Elation (1998)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Fun Ship Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Signature Fun Ship™ Features</h2>
          <p className="text-lg text-gray-700 mb-8">
            Carnival pioneered the concept of cruising as a fun, casual vacation with activities and
            dining options that appeal to all ages. These signature features appear across the
            fleet:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {funShipFeatures.map((feature) => (
              <div
                key={feature.title}
                className="bg-gradient-to-br from-red-50 to-blue-50 border border-red-200 rounded-lg p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-700 mb-3">{feature.description}</p>
                <p className="text-sm text-red-600 font-semibold">Available on: {feature.ships}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cape Liberty Sailings */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Anchor className="w-8 h-8 text-blue-600" />
            Carnival from Cape Liberty (Bayonne, NJ)
          </h2>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
            <p className="text-lg text-gray-800">
              <strong>Essex County Advantage:</strong> Cape Liberty is 20-30 minutes from Newark,
              Montclair, West Orange, and all Essex County communities. Drive directly to the port -
              no flights, no airports, no TSA hassles. Free parking or book our convenient transfer
              service.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {capeLibertySchedule.map((sailing) => (
              <div
                key={sailing.destination}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{sailing.destination}</h3>
                    <div className="space-y-1 text-gray-700">
                      <p>
                        <Calendar className="w-4 h-4 inline mr-2 text-blue-600" />
                        <strong>Duration:</strong> {sailing.duration} • <strong>Frequency:</strong>{' '}
                        {sailing.frequency}
                      </p>
                      <p>
                        <Ship className="w-4 h-4 inline mr-2 text-blue-600" />
                        <strong>Ship:</strong> {sailing.ship}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:text-right">
                    <p className="text-sm text-gray-600 mb-1">Starting from</p>
                    <p className="text-2xl font-bold text-red-600">{sailing.pricing}</p>
                    <p className="text-xs text-gray-500">per person, double occupancy</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Getting to Cape Liberty from Essex County
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <span>
                  <strong>Drive Time:</strong> 20-30 minutes from most Essex County locations via
                  I-280 and NJ Turnpike
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <span>
                  <strong>Parking:</strong> Port-operated parking $20/day or free off-site shuttle
                  lots
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <span>
                  <strong>Transfer Service:</strong> We offer door-to-door service from Essex County
                  - reserve when booking
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Cabin Types */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Carnival Stateroom Categories</h2>
          <div className="space-y-6">
            {cabinTypes.map((cabin) => (
              <div key={cabin.category} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{cabin.category}</h3>
                    <div className="space-y-2 text-gray-700">
                      <p>
                        <strong>Size:</strong> {cabin.size} • <strong>Sleeps:</strong>{' '}
                        {cabin.occupancy}
                      </p>
                      <p className="text-sm">{cabin.features}</p>
                    </div>
                  </div>
                  <div className="md:text-right">
                    <p className="text-sm text-gray-600 mb-1">Typical pricing</p>
                    <p className="text-xl font-bold text-blue-600">{cabin.price}</p>
                    <p className="text-xs text-gray-500">7-day cruise per person</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Special Cabin Categories Worth Considering:
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                <strong>Havana Cabins:</strong> Exclusive access to Havana Bar & Pool (Vista-class
                ships) - tropical Cuban theme
              </li>
              <li>
                <strong>Cloud 9 Spa Cabins:</strong> Free spa thermal suite access, priority spa
                booking, special bath amenities
              </li>
              <li>
                <strong>Family Harbor Staterooms:</strong> Family-only lounge access, special
                concierge, accommodate up to 5 guests
              </li>
            </ul>
          </div>
        </section>

        {/* Essex County Tips */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Essex County Traveler Tips</h2>
          <div className="bg-gradient-to-br from-blue-50 to-red-50 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-4">
              {essexCountyTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
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

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-red-600 to-blue-700 text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Book Your Carnival Cruise?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Expert guidance • Best available rates • Essex County&apos;s Carnival specialists since
            2010
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
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
          <p className="text-sm text-blue-100">
            <Users className="w-4 h-4 inline mr-2" />
            Serving Newark, Montclair, Bloomfield, West Orange & All Essex County
          </p>
        </section>

        {/* Trust Badges */}
        <div className="mt-12">
          <LegitTrustBadges />
        </div>

        {/* Related Links */}
        <section className="mt-16 border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Cruise Guides</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/cruises/royal-caribbean-nj"
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
            >
              Royal Caribbean from NJ
            </Link>
            <Link
              href="/cruises/cape-liberty-port"
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
            >
              Cape Liberty Port Guide
            </Link>
            <Link
              href="/cruises/3-day-cruises"
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
            >
              3-Day Weekend Cruises
            </Link>
            <Link
              href="/cruises/last-minute-deals"
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
            >
              Last Minute Cruise Deals
            </Link>
          </div>
        </section>
      </article>
    </div>
  )
}
