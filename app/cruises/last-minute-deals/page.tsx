import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Mail, Ship, Zap, DollarSign, Clock, TrendingDown, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Last Minute Cruise Deals from Newark NJ 2025 | Save Up to 70%',
  description:
    'Last-minute cruise deals from Newark and Cape Liberty. Save 40-70% on cruises departing within 90 days. Caribbean, Bermuda, Bahamas. Expert booking from Essex County.',
  keywords: [
    'last minute cruise deals newark',
    'last minute cruises nj',
    'cheap cruises from new jersey',
    'cruise deals cape liberty',
    'discounted cruises newark',
    'last minute caribbean cruise',
    'cruise deals from nj',
    'cheap last minute cruises',
  ],
  openGraph: {
    title: 'Last Minute Cruise Deals from Newark NJ | Save Up to 70%',
    description:
      'Spontaneous travel saves money! Last-minute cruises from Cape Liberty with savings up to 70%. Caribbean, Bermuda, Bahamas departing within 90 days.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function LastMinuteCruiseDealsPage() {
  const dealTypes = [
    {
      type: '90-Day Window Deals',
      savings: '30-50% off',
      description:
        'Cruises departing in 60-90 days often see first price drops as cruise lines start filling remaining cabins.',
      bestFor: 'Planners who can book vacation time with some notice',
    },
    {
      type: '30-Day Fire Sales',
      savings: '40-60% off',
      description:
        'Significant discounts appear 3-4 weeks before sailing as cruise lines aggressively fill ships.',
      bestFor: 'Flexible travelers who can arrange time off quickly',
    },
    {
      type: '2-Week Blowouts',
      savings: '50-70% off',
      description:
        'Steepest discounts for cruises departing in 7-14 days. Limited cabin selection but incredible value.',
      bestFor: 'Spontaneous travelers ready to go immediately',
    },
    {
      type: 'Same-Week Emergencies',
      savings: '60-75% off',
      description:
        'Rock-bottom prices for cruises leaving within days. Very limited availability but unbeatable deals.',
      bestFor: 'Ultimate flexibility - can pack and go within 48 hours',
    },
  ]

  const whyLastMinute = [
    {
      icon: DollarSign,
      title: 'Massive Savings',
      description:
        'Cruise lines discount unsold cabins heavily rather than sail with empty rooms. Save 40-70% off original prices.',
    },
    {
      icon: Zap,
      title: 'Spontaneous Adventure',
      description:
        'Break from routine with an unexpected vacation. The excitement of last-minute travel adds to the fun.',
    },
    {
      icon: Ship,
      title: 'Same Great Experience',
      description:
        'You get the exact same cruise, dining, entertainment, and service as those who paid full price months ago.',
    },
    {
      icon: Clock,
      title: 'Perfect for Essex County',
      description:
        'Cape Liberty departures mean you can book Thursday, pack Friday, cruise Saturday. No flight booking stress.',
    },
  ]

  const howToFind = [
    {
      step: 1,
      title: 'Call Us First',
      description:
        'We monitor last-minute inventory daily and have access to unadvertised deals. Many best offers never appear online. Call 833-874-1019 for current availability.',
    },
    {
      step: 2,
      title: 'Be Flexible',
      description:
        'Flexibility is key to maximum savings. Be open to any cabin type, any sailing date within your window, and any itinerary. The more flexible, the better the deal.',
    },
    {
      step: 3,
      title: 'Have Documents Ready',
      description:
        'Keep passports current and easily accessible. Have credit card ready. Be prepared to book immediately - deals can disappear in hours as cabins sell.',
    },
    {
      step: 4,
      title: 'Book Quickly',
      description:
        "Last-minute deals don't last. When you find a great price, book it. Hesitating even a few hours can mean losing the cabin to someone else.",
    },
  ]

  const tipsTricks = [
    {
      category: 'Best Times to Find Deals',
      tips: [
        'Tuesday afternoons - cruise lines adjust pricing mid-week',
        'After holiday weekends - people cancel, inventory opens up',
        'January-February - "Wave Season" creates movement in inventory',
        'September - hurricane season fears create opportunities',
        'Late November - between Thanksgiving and Christmas bookings',
      ],
    },
    {
      category: 'What to Watch For',
      tips: [
        'Repositioning cruises - ships moving between regions',
        'Inaugural season sailings - new ships, aggressive pricing',
        'Weather-affected sailings - fear of hurricanes drops demand',
        'Overstocked ships - too much Caribbean inventory',
        'Post-incident sales - negative news creates deals',
      ],
    },
    {
      category: 'Maximizing Savings',
      tips: [
        "Inside cabins have deepest discounts - you're barely in room",
        'Shoulder season (Apr-May, Sep-Oct) better availability',
        'Solo travelers - ask about reduced single supplements',
        'Book directly with us - we waive booking fees on last-minute',
        'Add beverage packages at time of booking for discounts',
      ],
    },
    {
      category: 'Things to Consider',
      tips: [
        'Travel insurance may be more expensive or unavailable',
        'Shore excursions book up early - may have limited choices',
        'Specialty dining reservations might be full',
        "Cabin location less ideal - take what's available",
        'Less time for trip planning and research',
      ],
    },
  ]

  const sampleDeals = [
    {
      cruise: '7-Night Eastern Caribbean',
      ship: 'Anthem of the Seas',
      date: 'Departing in 18 days',
      was: '$1,299',
      now: '$499',
      savings: '62% off',
      ports: 'St. Thomas, St. Maarten, Nassau',
    },
    {
      cruise: '5-Night Bermuda',
      ship: 'Norwegian Joy',
      date: 'Departing in 25 days',
      was: '$949',
      now: '$399',
      savings: '58% off',
      ports: "King's Wharf (overnight)",
    },
    {
      cruise: '4-Night Bahamas',
      ship: 'Carnival Sunrise',
      date: 'Departing in 12 days',
      was: '$649',
      now: '$249',
      savings: '62% off',
      ports: 'Nassau, Half Moon Cay',
    },
  ]

  const faqs = [
    {
      question: 'How late can I book a last-minute cruise?',
      answer:
        "You can book cruises up to 24-48 hours before departure, though we recommend at least 3-5 days notice to ensure proper planning. The latest we've booked a client was 36 hours before sailing from Cape Liberty - they called Monday morning, sailed Wednesday evening. You need a valid passport (or birth certificate + ID for closed-loop cruises), available credit, and the ability to get to Cape Liberty quickly. Keep in mind that booking extremely last-minute may limit your cabin choices and you'll have very little time for trip preparation.",
    },
    {
      question: 'Why are last-minute cruises so cheap?',
      answer:
        'Cruise lines operate on a "perishable inventory" model - once a ship sails with an empty cabin, that revenue is lost forever. It costs the cruise line almost nothing to fill an empty cabin (minimal food/service costs), so they\'re motivated to sell at steep discounts rather than sail with vacancies. They\'d rather get $500 for a cabin than $0. Additionally, most cruisers book 6-12 months in advance, so last-minute inventory often indicates weak demand for that particular sailing, driving prices down further. The closer to sail date, the more desperate cruise lines become to fill ships.',
    },
    {
      question: 'What are the downsides of booking last-minute?',
      answer:
        "Limited cabin selection - you take what's available, often inside or obstructed-view cabins. Shore excursions may be sold out, though you can usually book independently in ports. Specialty dining reservations might be full. Travel insurance is more expensive or unavailable within 14 days of departure. Less time to mentally prepare, research ports, or arrange pet care/house sitters. Your preferred sailing date might not have deals. However, once onboard, your experience is identical to those who paid full price months ago - same food, service, entertainment, and destinations.",
    },
    {
      question: 'Can I still get a good cabin on a last-minute cruise?',
      answer:
        'Sometimes! While last-minute inventory is often "leftover" cabins (inside rooms, poor locations), we occasionally see balconies and even suites available at deep discounts. This happens when someone cancels a premium cabin or when the cruise line purposely holds back inventory. It\'s unpredictable but worth checking. We\'ve booked clients into junior suites for less than inside cabin prices because the suite happened to be available 10 days before sailing. Call us to check current inventory - availability changes daily and even hourly as people cancel or book.',
    },
    {
      question: 'Do I need a passport for last-minute cruises?',
      answer:
        "For closed-loop cruises (departing and returning to Cape Liberty), technically no - a birth certificate and government ID work. However, we STRONGLY recommend having a valid passport, especially for last-minute travel. If you have a medical emergency and need to fly home from a Caribbean island, you'll need a passport. If you miss the ship at a port, you need a passport to catch up with it. Many countries won't let you enter without one. Travel insurance may not cover you without a passport. Plus, some last-minute deals might be for one-way cruises or repositioning sailings that require air return, necessitating a passport.",
    },
    {
      question: 'How do I find the best last-minute cruise deals?',
      answer:
        'Call us! We monitor last-minute inventory across all cruise lines daily and have access to unadvertised agent-only deals that never appear on public websites. We can check availability across multiple cruise lines, ships, and dates in minutes. Many of our best last-minute deals are negotiated directly with cruise line BDMs (Business Development Managers) and never published online. Sign up for our last-minute deal alerts and we\'ll email/text you when exceptional deals appear. Being flexible with dates, cabins, and destinations gets you the deepest discounts. The relationship we have with cruise lines means we can sometimes secure cabins even when websites show "sold out."',
    },
  ]

  const jsonLdOrganization = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': 'https://nexttripanywhere.com/cruises/last-minute-deals/#organization',
    name: 'Next Trip Anywhere - Last-Minute Cruise Specialists',
    description: 'Expert booking for last-minute cruise deals from Newark and Cape Liberty, NJ',
    url: 'https://nexttripanywhere.com/cruises/last-minute-deals/',
    telephone: '+1-833-874-1019',
    email: 'info@nexttripanywhere.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
      addressRegion: 'NJ',
    },
    areaServed: [
      { '@type': 'State', name: 'New Jersey' },
      { '@type': 'State', name: 'New York' },
    ],
    priceRange: '$',
    knowsAbout: [
      'Last-Minute Cruises',
      'Cruise Deals',
      'Discounted Cruises',
      'Cape Liberty Departures',
      'Budget Cruises',
    ],
  }

  const jsonLdFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 via-red-600 to-red-700 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-6 w-6 animate-pulse" />
              <span className="bg-red-800 px-3 py-1 rounded-full text-sm font-medium">
                🔥 Limited Time Offers
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Last-Minute Cruise Deals from Newark NJ
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 mb-8 max-w-4xl">
              Spontaneous travel = Massive savings! Book cruises departing within 90 days and save
              40-70% off. Same ships, same experience, fraction of the price.
            </p>
            <div className="flex flex-wrap gap-6 text-sm md:text-base mb-8">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5" />
                <span>Save 40-70%</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>Departing Within 90 Days</span>
              </div>
              <div className="flex items-center gap-2">
                <Ship className="h-5 w-5" />
                <span>All Cruise Lines</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                <span>Book Today, Sail This Month</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+18338741019"
                className="inline-flex items-center justify-center gap-2 bg-white text-red-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                <Phone className="h-5 w-5" />
                Call Now: 833-874-1019
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors border-2 border-white"
              >
                <Mail className="h-5 w-5" />
                Get Deal Alerts
              </Link>
            </div>
            <p className="mt-6 text-orange-100">
              💥 Deals change hourly • Limited inventory • First come, first served
            </p>
          </div>
        </section>

        {/* Sample Deals */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Current Last-Minute Deals (Examples)
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12">
              Real savings from recent weeks - call for today's available deals
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {sampleDeals.map((deal, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg shadow-lg overflow-hidden border-2 border-red-200"
                >
                  <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-white text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                        {deal.savings}
                      </span>
                      <Clock className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold">{deal.cruise}</h3>
                    <p className="text-orange-100 text-sm">{deal.ship}</p>
                  </div>
                  <div className="p-6">
                    <p className="text-sm font-semibold text-red-700 mb-4">{deal.date}</p>
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">Ports:</p>
                      <p className="text-gray-900">{deal.ports}</p>
                    </div>
                    <div className="flex items-end justify-between pt-4 border-t">
                      <div>
                        <p className="text-xs text-gray-500 line-through">{deal.was}</p>
                        <p className="text-3xl font-bold text-red-700">{deal.now}</p>
                        <p className="text-xs text-gray-600">per person</p>
                      </div>
                      <TrendingDown className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center mt-8 text-gray-600 italic">
              *Sample pricing from recent bookings. Current deals vary by availability. Call for
              today's inventory.
            </p>
          </div>
        </section>

        {/* Deal Types */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Understanding Last-Minute Deal Windows
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {dealTypes.map((deal, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{deal.type}</h3>
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {deal.savings}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">{deal.description}</p>
                  <div className="bg-blue-50 rounded p-3">
                    <p className="text-sm font-semibold text-blue-900">Best For:</p>
                    <p className="text-sm text-blue-800">{deal.bestFor}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Last Minute */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Book Last-Minute Cruises?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyLastMinute.map((reason, index) => {
                const Icon = reason.icon
                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
                  >
                    <Icon className="h-12 w-12 text-orange-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-3">{reason.title}</h3>
                    <p className="text-gray-600">{reason.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* How to Find Deals */}
        <section className="py-16 bg-orange-900 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How to Find & Book Last-Minute Deals
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {howToFind.map((item, index) => (
                <div key={index} className="bg-orange-800 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-white text-orange-900 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">
                      {item.step}
                    </span>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-orange-100">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Insider Tips for Last-Minute Cruise Hunting
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {tipsTricks.map((category, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-orange-900 mb-4">
                    {category.category}
                  </h3>
                  <ul className="space-y-2">
                    {category.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <span className="text-orange-600 flex-shrink-0 font-bold">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Last-Minute Cruise FAQs
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-orange-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-orange-600 to-red-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <Zap className="h-16 w-16 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Snag an Incredible Last-Minute Deal?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Call now to check today's available last-minute cruises from Cape Liberty. Deals
              change hourly - don't miss out!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18338741019"
                className="inline-flex items-center gap-2 bg-white text-red-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                <Phone className="h-5 w-5" />
                Call: 833-874-1019
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-orange-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-900 transition-colors border-2 border-white"
              >
                <Mail className="h-5 w-5" />
                Sign Up for Deal Alerts
              </Link>
            </div>
            <p className="mt-6 text-orange-100">
              ⚡ Available 24/7 • No booking fees on last-minute deals • Price match guarantee
            </p>
          </div>
        </section>

        {/* Related Links */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-semibold text-center mb-8">More Cruise Options</h3>
            <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <Link
                href="/cruises/3-day-cruises"
                className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
              >
                <h4 className="font-semibold text-blue-700 mb-2">3-Day Cruises</h4>
                <p className="text-sm text-gray-600">Quick getaways</p>
              </Link>
              <Link
                href="/cruises/royal-caribbean-nj"
                className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
              >
                <h4 className="font-semibold text-blue-700 mb-2">Royal Caribbean</h4>
                <p className="text-sm text-gray-600">From New Jersey</p>
              </Link>
              <Link
                href="/cruises/caribbean"
                className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
              >
                <h4 className="font-semibold text-blue-700 mb-2">Caribbean</h4>
                <p className="text-sm text-gray-600">Tropical paradise</p>
              </Link>
              <Link
                href="/cruises/from-newark"
                className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
              >
                <h4 className="font-semibold text-blue-700 mb-2">All Cruises</h4>
                <p className="text-sm text-gray-600">Browse all options</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
