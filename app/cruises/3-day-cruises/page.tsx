import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Mail, Ship, Clock, DollarSign, Calendar, MapPin, Anchor } from 'lucide-react'

export const metadata: Metadata = {
  title: '3 Day Cruises from NYC & NJ 2025 | Quick Weekend Getaways',
  description:
    '3-4 day cruises from New York and New Jersey. Perfect weekend getaways to Bahamas, Bermuda, Canada. Depart Cape Liberty or Manhattan. Book your quick cruise escape today.',
  keywords: [
    '3 day cruise from nyc',
    '3 day cruise from nj',
    'short cruises from new york',
    'weekend cruise from newark',
    'quick cruise getaway',
    '3 night cruise',
    '4 day cruise from cape liberty',
    'short bahamas cruise',
  ],
  openGraph: {
    title: '3 Day Cruises from NYC & New Jersey | Weekend Getaways 2025',
    description:
      'Perfect weekend escapes! 3-4 day cruises from Cape Liberty and Manhattan to Bahamas, Bermuda, Canada. Expert planning from Essex County.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function ThreeDayCruisesPage() {
  const cruiseOptions = [
    {
      name: '3-Day Bahamas Getaway',
      duration: '3 nights',
      ports: 'Nassau, Half Moon Cay OR CocoCay',
      cruiseLine: 'Royal Caribbean, Carnival',
      season: 'Year-round',
      price: '$299-$549',
      highlights: [
        'Visit Nassau capital city',
        'Private island beach day',
        'Duty-free shopping',
        'Casino & nightlife',
        'Water sports included',
      ],
    },
    {
      name: '4-Day Bermuda Express',
      duration: '4 nights',
      ports: "King's Wharf, Bermuda",
      cruiseLine: 'Norwegian, Carnival',
      season: 'May - September',
      price: '$449-$699',
      highlights: [
        'Pink sand beaches',
        'British colonial charm',
        'Crystal Caves tour',
        'Horseshoe Bay Beach',
        'Golf & water sports',
      ],
    },
    {
      name: '3-Day Canada Sampler',
      duration: '3 nights',
      ports: 'Saint John, Halifax OR Bar Harbor',
      cruiseLine: 'Royal Caribbean, Celebrity',
      season: 'September - October',
      price: '$399-$649',
      highlights: [
        'Fall foliage viewing',
        'Maritime history',
        'Fresh lobster dining',
        'Coastal towns',
        'Lighthouse tours',
      ],
    },
    {
      name: '4-Night Coastal Cruise',
      duration: '4 nights',
      ports: 'Boston, Portland, Bar Harbor',
      cruiseLine: 'Norwegian, Celebrity',
      season: 'Summer & Fall',
      price: '$499-$799',
      highlights: [
        'New England charm',
        'Historic sites',
        'Acadia National Park',
        'Lobster & clam bakes',
        'Scenic coastal views',
      ],
    },
  ]

  const whyShortCruises = [
    {
      icon: Clock,
      title: 'Perfect for Busy Schedules',
      description:
        'Take a Friday off, cruise Saturday through Monday, back to work Tuesday. Get a vacation without using all your PTO.',
    },
    {
      icon: DollarSign,
      title: 'Budget-Friendly',
      description:
        'Starting under $300 per person, short cruises offer incredible value. Less time off work means less lost income too.',
    },
    {
      icon: Ship,
      title: 'First-Timer Friendly',
      description:
        'Never cruised before? 3-4 days is perfect to test the waters without committing to a full week at sea.',
    },
    {
      icon: Calendar,
      title: 'Frequent Departures',
      description:
        'Multiple sailings every week year-round. Easy to find dates that work with your schedule.',
    },
  ]

  const perfectFor = [
    {
      title: 'First-Time Cruisers',
      description:
        'Discover if cruising is for you without the commitment of a 7+ day voyage. Most first-timers book longer cruises after trying a short sailing.',
    },
    {
      title: 'Anniversary & Celebrations',
      description:
        'Quick romantic getaway for anniversaries, birthdays, or babymoons. Enjoy adult time without being away from kids too long.',
    },
    {
      title: 'Last-Minute Travel',
      description:
        'Sudden free weekend? Book a cruise departing in days. Short cruises have better last-minute availability than week-long sailings.',
    },
    {
      title: 'Extended Weekends',
      description:
        'Turn holiday weekends (Memorial Day, July 4th, Labor Day) into cruise vacations. Use just 1-2 PTO days for a 4-day trip.',
    },
    {
      title: 'Family Bonding',
      description:
        'Perfect length for families with younger kids or teens with limited time off school. Not too long to cause homework stress.',
    },
    {
      title: 'Group & Friends',
      description:
        'Easier to coordinate schedules for groups. Lower total cost makes it accessible for everyone to join.',
    },
  ]

  const essexCountyAdvantages = [
    'Leave Friday afternoon from Essex County - arrive at Cape Liberty in 20-30 minutes',
    'Sail Friday evening, return Monday morning - perfect long weekend',
    'No expensive flights or airport stress',
    'Parking only $75-100 for 3-4 days (vs $175+ for week-long cruises)',
    'Close to home if emergency arises',
    'Easy to pack - just a carry-on for a quick getaway',
  ]

  const faqs = [
    {
      question: 'Are 3-day cruises worth it?',
      answer:
        "Absolutely! 3-4 day cruises offer tremendous value for the price and time investment. You get all the same amenities as longer cruises - unlimited food, entertainment, activities, pools - just compressed into a long weekend. They're perfect for first-timers, busy professionals, budget travelers, or anyone wanting a quick escape. Most ships on short cruises are the same modern vessels used for 7-day sailings, so you're not sacrificing quality. The value per day is often better than a hotel resort when you factor in meals and entertainment.",
    },
    {
      question: 'How much does a 3-day cruise from NYC cost?',
      answer:
        'Prices for 3-day cruises from New York/New Jersey start around $299 per person for interior cabins during off-peak times, ranging up to $799+ for balcony cabins during peak summer or holiday weekends. Budget about $350-450 per person for an interior cabin, $500-650 for oceanview, and $600-800 for balcony during average seasons. Add $100-150 per person for port taxes and fees. Specialty dining, drinks, and gratuities ($45-50 per person for 3 days) are extra. Total all-in cost typically $450-600 per person for interior, $700-1000 for balcony.',
    },
    {
      question: "What's included on a 3-day cruise?",
      answer:
        'Your cruise fare includes: Stateroom accommodations for 3-4 nights, all main dining room meals and buffet service, casual dining venues (pizza, cafe, room service), onboard activities (pools, waterslides, mini golf, rock climbing, fitness center), nightly entertainment (shows, comedy, live music), kids programs if applicable. NOT included: Alcoholic beverages, soda and specialty coffee, specialty restaurants ($20-50 per person), shore excursions, spa services, casino, photos, gratuities ($15/day per person), WiFi. Most cruise lines offer beverage packages that may be worthwhile even for 3 days.',
    },
    {
      question: 'Where do 3-day cruises from New Jersey go?',
      answer:
        'Most 3-4 day cruises from Cape Liberty (Bayonne, NJ) head to the Bahamas with stops in Nassau and a private island (Perfect Day at CocoCay for Royal Caribbean, Half Moon Cay for Carnival). Some sail to Bermuda (4 days typically), offering one port day in King\'s Wharf. In fall, you\'ll find 3-day Canada/New England cruises to Halifax, Saint John, or Bar Harbor. Occasionally, there are 3-4 day "cruises to nowhere" that are all sea days with no ports - pure relaxation at sea. Destinations depend on season and cruise line.',
    },
    {
      question: 'Do I need a passport for a 3-day cruise?',
      answer:
        "For closed-loop cruises (departing and returning to the same US port), you don't technically need a passport - a birth certificate and government-issued photo ID suffice. However, we STRONGLY recommend bringing a valid passport anyway. If you have a medical emergency and need to fly home from the Bahamas or Bermuda, you'll need a passport. If you miss the ship at a port, you'll need it to rejoin. Plus, many shore excursions and international travel require passports. It's simply not worth the risk of being stuck in a foreign country without one.",
    },
    {
      question: 'Can I bring my kids on a 3-day cruise?',
      answer:
        "Yes! 3-day cruises are actually perfect for families with children. The shorter duration is ideal for younger kids who might get restless on a week-long trip. All major cruise lines offer kids clubs with age-appropriate activities for ages 3-17 (some from 6 months with parents). The compact timeframe means less chance of kids getting bored or homesick. It's also a great way to introduce children to cruising before committing to a longer, more expensive vacation. Most ships have pools, waterslides, and family-friendly entertainment. Connecting staterooms are available for families needing more space.",
    },
  ]

  const tipsByCategory = [
    {
      category: 'Booking Smart',
      tips: [
        'Book early for holiday weekends - they sell out months in advance',
        'Last-minute deals are common 3-4 weeks before sailing',
        "Inside cabins are great value - you're barely in the room",
        'Cruise during shoulder seasons (April-May, Sept-Oct) for best pricing',
      ],
    },
    {
      category: 'Packing Efficiently',
      tips: [
        'Bring a carry-on only - luggage delivery takes 2-3 hours',
        'Pack swimsuit in carry-on - pools open immediately',
        'Bring reusable water bottle - fill at buffet',
        "Don't forget medications - pharmacy access is limited",
      ],
    },
    {
      category: 'Maximizing Time',
      tips: [
        'Complete online check-in ASAP - board earlier',
        'Book shore excursions in advance - limited time in port',
        'Eat dinner early (5:30 PM) to catch evening shows',
        "Skip formal night if it's only 3 days - relaxed dining works",
      ],
    },
    {
      category: 'Saving Money',
      tips: [
        'Bring your own alcohol (wine/champagne allowed)',
        'Skip specialty dining - included food is excellent',
        'Book excursions independently - save 30-50%',
        'Set daily spending limits for casino and shopping',
      ],
    },
  ]

  const jsonLdOrganization = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': 'https://nexttripanywhere.com/cruises/3-day-cruises/#organization',
    name: 'Next Trip Anywhere - Short Cruise Specialists',
    description: 'Expert planning for 3-4 day cruises from New York and New Jersey',
    url: 'https://nexttripanywhere.com/cruises/3-day-cruises/',
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
      'Short Cruises',
      'Weekend Cruises',
      'Bahamas Cruises',
      'Bermuda Cruises',
      'Cape Liberty Departures',
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

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-cyan-700 via-blue-700 to-blue-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-6 w-6" />
              <span className="bg-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Quick Weekend Getaways
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              3-4 Day Cruises from NYC & New Jersey
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl">
              Perfect weekend escapes! Experience paradise without using all your vacation days.
              Depart Friday, return Monday. Starting under $300 per person.
            </p>
            <div className="flex flex-wrap gap-6 text-sm md:text-base mb-8">
              <div className="flex items-center gap-2">
                <Ship className="h-5 w-5" />
                <span>Bahamas • Bermuda • Canada</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>Just 3-4 Nights</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                <span>From $299/person</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>Departs Cape Liberty NJ</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+18338741019"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors"
              >
                <Phone className="h-5 w-5" />
                833-874-1019
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                <Mail className="h-5 w-5" />
                Find My Weekend Cruise
              </Link>
            </div>
          </div>
        </section>

        {/* Why 3-Day Cruises */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Why Choose a 3-4 Day Cruise?
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              All the luxury and fun of a full cruise vacation, perfectly sized for a long weekend
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyShortCruises.map((reason, index) => {
                const Icon = reason.icon
                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
                  >
                    <Icon className="h-12 w-12 text-cyan-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-3">{reason.title}</h3>
                    <p className="text-gray-600">{reason.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Cruise Options */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Popular 3-4 Day Cruise Options from New Jersey
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {cruiseOptions.map((cruise, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white p-6">
                    <h3 className="text-2xl font-bold mb-2">{cruise.name}</h3>
                    <p className="text-cyan-100">
                      {cruise.duration} • {cruise.season}
                    </p>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <span className="text-sm font-semibold text-gray-700">Ports of Call:</span>
                      <p className="text-gray-600">{cruise.ports}</p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-700">Cruise Lines:</span>
                      <p className="text-gray-600">{cruise.cruiseLine}</p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-700">Highlights:</span>
                      <ul className="space-y-1 mt-2">
                        {cruise.highlights.map((highlight, idx) => (
                          <li key={idx} className="text-sm text-gray-600">
                            • {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-500">Starting from</p>
                      <p className="text-3xl font-bold text-orange-500">{cruise.price}</p>
                      <p className="text-xs text-gray-500">per person, interior cabin</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Perfect For Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              3-Day Cruises Are Perfect For...
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {perfectFor.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Essex County Benefits */}
        <section className="py-16 bg-cyan-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Perfect Weekend Cruise from Essex County
              </h2>
              <p className="text-xl text-cyan-100 mb-12">
                Drive to Cape Liberty in under 30 minutes and start your vacation
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                {essexCountyAdvantages.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 bg-cyan-800 rounded-lg p-4">
                    <span className="text-green-400 text-xl flex-shrink-0">✓</span>
                    <span className="text-cyan-50">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-12 bg-cyan-800 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">Sample Weekend Itinerary</h3>
                <div className="space-y-3 text-left max-w-2xl mx-auto">
                  <div className="flex items-start gap-4">
                    <span className="font-bold text-cyan-300">Friday 4pm:</span>
                    <span>Leave work in Essex County, drive to Cape Liberty (20-30 min)</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="font-bold text-cyan-300">Friday 6pm:</span>
                    <span>Board ship, dinner at buffet, sail away at 7pm</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="font-bold text-cyan-300">Saturday:</span>
                    <span>Full day at sea - pools, shows, relaxation</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="font-bold text-cyan-300">Sunday:</span>
                    <span>Port day in Nassau or Bermuda - beach & shopping</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="font-bold text-cyan-300">Monday 7am:</span>
                    <span>Return to Cape Liberty, drive home, back to work Tuesday!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Insider Tips for 3-Day Cruises
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {tipsByCategory.map((category, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">{category.category}</h3>
                  <ul className="space-y-2">
                    {category.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <span className="text-cyan-600 flex-shrink-0">•</span>
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
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">3-Day Cruise FAQs</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-cyan-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for Your Weekend Cruise Adventure?
            </h2>
            <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
              Essex County's experts in short cruises. We find the perfect 3-4 day sailing for your
              schedule and budget. Book now and escape this weekend!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18338741019"
                className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors"
              >
                <Phone className="h-5 w-5" />
                Call: 833-874-1019
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                <Mail className="h-5 w-5" />
                Get Free Quote
              </Link>
            </div>
            <p className="mt-6 text-cyan-100">
              Best prices guaranteed • Instant booking • 24/7 support
            </p>
          </div>
        </section>

        {/* Related Links */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-semibold text-center mb-8">Explore More Cruise Options</h3>
            <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <Link
                href="/cruises/last-minute-deals"
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
              >
                <h4 className="font-semibold text-blue-700 mb-2">Last-Minute Deals</h4>
                <p className="text-sm text-gray-600">Save up to 70%</p>
              </Link>
              <Link
                href="/cruises/royal-caribbean-nj"
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
              >
                <h4 className="font-semibold text-blue-700 mb-2">Royal Caribbean</h4>
                <p className="text-sm text-gray-600">From New Jersey</p>
              </Link>
              <Link
                href="/cruises/bahamas"
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
              >
                <h4 className="font-semibold text-blue-700 mb-2">Bahamas Cruises</h4>
                <p className="text-sm text-gray-600">Tropical paradise</p>
              </Link>
              <Link
                href="/cruises/from-newark"
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
              >
                <h4 className="font-semibold text-blue-700 mb-2">All Newark Cruises</h4>
                <p className="text-sm text-gray-600">Browse all options</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
