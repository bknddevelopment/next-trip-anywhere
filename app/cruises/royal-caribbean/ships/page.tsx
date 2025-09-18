import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { Phone, Ship, Users, Calendar, Anchor, Globe, Award, ChevronRight } from 'lucide-react'
import {
  ROYAL_CARIBBEAN_SHIPS,
  SHIP_CLASSES,
  getShipsByClass,
} from '@/lib/data/royal-caribbean-ships'

export const metadata: Metadata = {
  title: 'Royal Caribbean Ships & Fleet Guide 2024 | All 27 Ships Reviewed',
  description:
    "Complete guide to Royal Caribbean's 27 ships including Icon of the Seas, Wonder of the Seas, and more. Compare ship classes, features, and itineraries. Expert booking assistance.",
  keywords:
    'royal caribbean ships, icon of the seas, wonder of the seas, symphony of the seas, oasis class, quantum class, royal caribbean fleet',
  openGraph: {
    title: 'Royal Caribbean Fleet - All 27 Ships Guide',
    description:
      "Explore Royal Caribbean's innovative fleet from Icon Class to Radiance Class. Find the perfect ship for your cruise vacation.",
    url: 'https://nexttripanywhere.com/cruises/royal-caribbean/ships',
    images: [
      {
        url: 'https://nexttripanywhere.com/images/royal-caribbean-fleet.jpg',
        width: 1200,
        height: 630,
        alt: 'Royal Caribbean Fleet',
      },
    ],
  },
  alternates: {
    canonical: 'https://nexttripanywhere.com/cruises/royal-caribbean/ships',
  },
}

// Schema markup
const fleetSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Royal Caribbean Fleet',
  description: 'Complete list of Royal Caribbean International cruise ships',
  url: 'https://nexttripanywhere.com/cruises/royal-caribbean/ships',
  numberOfItems: ROYAL_CARIBBEAN_SHIPS.length,
}

// Ship class descriptions
const shipClassDescriptions = {
  [SHIP_CLASSES.ICON]: {
    description:
      'The newest and largest cruise ships in the world, featuring 8 distinct neighborhoods, the largest water park at sea, and record-breaking amenities.',
    highlights: ['20 decks', '7,600+ guests', 'Category 6 water park', 'AquaDome', "Crown's Edge"],
    yearIntroduced: '2024',
  },
  [SHIP_CLASSES.OASIS]: {
    description:
      'Revolutionary mega-ships that changed cruising forever with neighborhoods like Central Park and the Boardwalk, plus the AquaTheater.',
    highlights: [
      '18 decks',
      '6,680+ guests',
      'Central Park',
      'Boardwalk',
      'AquaTheater',
      'Ultimate Abyss',
    ],
    yearIntroduced: '2009',
  },
  [SHIP_CLASSES.QUANTUM]: {
    description:
      'High-tech ships featuring the North Star observation capsule, RipCord skydiving simulator, and transformative Two70 venue.',
    highlights: ['16 decks', '4,900+ guests', 'North Star', 'RipCord iFLY', 'Two70', 'SeaPlex'],
    yearIntroduced: '2014',
  },
  [SHIP_CLASSES.FREEDOM]: {
    description:
      'Family-friendly ships with FlowRider surf simulators, ice skating rinks, and the H2O Zone water park.',
    highlights: [
      '15 decks',
      '4,500+ guests',
      'FlowRider',
      'Ice skating',
      'H2O Zone',
      'Royal Promenade',
    ],
    yearIntroduced: '2006',
  },
  [SHIP_CLASSES.VOYAGER]: {
    description:
      'The ships that started the revolution with rock climbing walls, ice skating rinks, and the iconic Royal Promenade.',
    highlights: [
      '14 decks',
      '3,800+ guests',
      'Rock climbing',
      'Ice skating',
      'Royal Promenade',
      'Mini golf',
    ],
    yearIntroduced: '1999',
  },
  [SHIP_CLASSES.RADIANCE]: {
    description:
      'Elegant ships with more glass than any other cruise ships, featuring floor-to-ceiling windows and scenic elevators.',
    highlights: [
      '13 decks',
      '2,500+ guests',
      'Panoramic views',
      'Rock climbing',
      'Pool deck',
      'Solarium',
    ],
    yearIntroduced: '2001',
  },
  [SHIP_CLASSES.VISION]: {
    description:
      'Classic ships perfect for intimate cruising experiences with signature Royal Caribbean amenities.',
    highlights: [
      '11 decks',
      '2,500+ guests',
      'Rock climbing',
      'Outdoor pools',
      'Theater',
      'Casino',
    ],
    yearIntroduced: '1995',
  },
}

export default function RoyalCaribbeanShipsPage() {
  return (
    <>
      <Script
        id="rc-fleet-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(fleetSchema),
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-900 to-blue-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/wave-pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Ship className="w-4 h-4" />
              27 INNOVATIVE SHIPS IN THE FLEET
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Royal Caribbean Ships & Fleet
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              From the world&apos;s largest Icon Class to the revolutionary Oasis Class
            </p>
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                <div className="text-3xl font-bold">27</div>
                <div className="text-sm">Ships</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                <div className="text-3xl font-bold">7</div>
                <div className="text-sm">Ship Classes</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                <div className="text-3xl font-bold">300+</div>
                <div className="text-sm">Destinations</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18338741019"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call for Ship Selection Help
              </a>
              <Link
                href="/cruises/royal-caribbean/deals"
                className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105 shadow-lg"
              >
                View Current Deals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ship Classes Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4 text-blue-900">
              Royal Caribbean Ship Classes
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Each ship class offers unique features and experiences. Let our experts help you
              choose the perfect ship for your vacation style.
            </p>

            <div className="space-y-8">
              {Object.entries(SHIP_CLASSES).map(([key, className]) => {
                const classInfo = shipClassDescriptions[className]
                const shipsInClass = getShipsByClass(className)

                return (
                  <div key={key} className="bg-gray-50 rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-2xl font-bold mb-2">{className}</h3>
                          <p className="text-blue-100 mb-3">{classInfo.description}</p>
                          <div className="flex flex-wrap gap-3">
                            {classInfo.highlights.map((highlight, index) => (
                              <span
                                key={index}
                                className="bg-white/20 px-3 py-1 rounded-full text-sm"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-blue-200">Introduced</div>
                          <div className="text-2xl font-bold">{classInfo.yearIntroduced}</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h4 className="font-bold text-lg mb-4 text-blue-900">Ships in this class:</h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {shipsInClass.map((ship) => (
                          <div
                            key={ship.id}
                            className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition-shadow"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-bold text-blue-900">{ship.name}</h5>
                              <span className="text-sm text-gray-500">{ship.yearBuilt}</span>
                            </div>
                            <div className="space-y-1 text-sm text-gray-600">
                              <div className="flex justify-between">
                                <span>Capacity:</span>
                                <span className="font-semibold">
                                  {ship.passengerCapacity.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Tonnage:</span>
                                <span className="font-semibold">
                                  {ship.grossTonnage.toLocaleString()} GT
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Homeport:</span>
                                <span className="font-semibold text-right">
                                  {ship.homeports[0]}
                                </span>
                              </div>
                            </div>
                            <div className="mt-3 pt-3 border-t">
                              <div className="text-xs text-gray-600 mb-2">Current routes:</div>
                              <div className="flex flex-wrap gap-1">
                                {ship.currentItineraries.slice(0, 2).map((route, index) => (
                                  <span
                                    key={index}
                                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                                  >
                                    {route}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Ships Detail */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">
              Featured Ships in Detail
            </h2>

            {/* Icon of the Seas Feature */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="w-8 h-8" />
                  <div>
                    <h3 className="text-2xl font-bold">Icon of the Seas</h3>
                    <p className="text-orange-100">
                      World&apos;s Largest Cruise Ship - Launched 2024
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-3 text-blue-900">Ship Statistics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Passenger Capacity</span>
                        <span className="font-semibold">7,600 guests</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Gross Tonnage</span>
                        <span className="font-semibold">250,800 GT</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Length</span>
                        <span className="font-semibold">1,198 feet</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Decks</span>
                        <span className="font-semibold">20 decks</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Staterooms</span>
                        <span className="font-semibold">2,805 cabins</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-3 text-blue-900">
                      Record-Breaking Features
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-orange-500 mt-0.5" />
                        <span>Category 6 water park - largest at sea</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-orange-500 mt-0.5" />
                        <span>AquaDome with 55-foot waterfall</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-orange-500 mt-0.5" />
                        <span>Crown&apos;s Edge - walk 154 feet above ocean</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-orange-500 mt-0.5" />
                        <span>8 distinct neighborhoods</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-orange-500 mt-0.5" />
                        <span>40+ restaurants and bars</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-orange-500 mt-0.5" />
                        <span>7 pools including infinity pool</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-600">Currently sailing from:</span>
                      <span className="font-bold text-lg ml-2">Miami, FL</span>
                    </div>
                    <a
                      href="tel:+18338741019"
                      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                    >
                      Book Icon of the Seas
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Ship Comparison Table */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-blue-900 text-white p-6">
                <h3 className="text-2xl font-bold">Quick Ship Comparison</h3>
                <p className="text-blue-100 mt-2">
                  Compare top features across our most popular ships
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold text-blue-900">Ship Name</th>
                      <th className="px-4 py-3 text-center font-bold text-blue-900">Class</th>
                      <th className="px-4 py-3 text-center font-bold text-blue-900">Year</th>
                      <th className="px-4 py-3 text-center font-bold text-blue-900">Capacity</th>
                      <th className="px-4 py-3 text-center font-bold text-blue-900">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold">Icon of the Seas</td>
                      <td className="px-4 py-3 text-center">Icon</td>
                      <td className="px-4 py-3 text-center">2024</td>
                      <td className="px-4 py-3 text-center">7,600</td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-sm">
                          Families
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold">Wonder of the Seas</td>
                      <td className="px-4 py-3 text-center">Oasis</td>
                      <td className="px-4 py-3 text-center">2022</td>
                      <td className="px-4 py-3 text-center">6,988</td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                          Adventure
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold">Odyssey of the Seas</td>
                      <td className="px-4 py-3 text-center">Quantum</td>
                      <td className="px-4 py-3 text-center">2021</td>
                      <td className="px-4 py-3 text-center">4,198</td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                          Tech Lovers
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold">Freedom of the Seas</td>
                      <td className="px-4 py-3 text-center">Freedom</td>
                      <td className="px-4 py-3 text-center">2006</td>
                      <td className="px-4 py-3 text-center">4,515</td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">
                          First-Timers
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Choose */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">
              How to Choose the Right Royal Caribbean Ship
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-bold text-xl mb-4 text-blue-900 flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  For Families with Kids
                </h3>
                <p className="text-gray-700 mb-3">
                  Choose Icon Class or Oasis Class ships for the most family amenities including
                  water parks, carousels, and dedicated family neighborhoods.
                </p>
                <div className="bg-white rounded p-3">
                  <strong className="text-sm text-blue-900">Recommended Ships:</strong>
                  <ul className="text-sm text-gray-600 mt-2">
                    <li>• Icon of the Seas</li>
                    <li>• Wonder of the Seas</li>
                    <li>• Symphony of the Seas</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="font-bold text-xl mb-4 text-blue-900 flex items-center gap-2">
                  <Globe className="w-6 h-6" />
                  For Adventure Seekers
                </h3>
                <p className="text-gray-700 mb-3">
                  Quantum Class ships offer skydiving simulators, North Star observation capsules,
                  and cutting-edge technology experiences.
                </p>
                <div className="bg-white rounded p-3">
                  <strong className="text-sm text-blue-900">Recommended Ships:</strong>
                  <ul className="text-sm text-gray-600 mt-2">
                    <li>• Odyssey of the Seas</li>
                    <li>• Anthem of the Seas</li>
                    <li>• Spectrum of the Seas</li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-6">
                <h3 className="font-bold text-xl mb-4 text-blue-900 flex items-center gap-2">
                  <Anchor className="w-6 h-6" />
                  For First-Time Cruisers
                </h3>
                <p className="text-gray-700 mb-3">
                  Freedom Class ships offer the perfect introduction to cruising with classic
                  amenities and a more manageable size.
                </p>
                <div className="bg-white rounded p-3">
                  <strong className="text-sm text-blue-900">Recommended Ships:</strong>
                  <ul className="text-sm text-gray-600 mt-2">
                    <li>• Freedom of the Seas</li>
                    <li>• Liberty of the Seas</li>
                    <li>• Independence of the Seas</li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="font-bold text-xl mb-4 text-blue-900 flex items-center gap-2">
                  <Calendar className="w-6 h-6" />
                  For Alaska Cruises
                </h3>
                <p className="text-gray-700 mb-3">
                  Radiance and Quantum Class ships are ideal for Alaska with extensive glass for
                  scenic viewing and appropriate size for glacier navigation.
                </p>
                <div className="bg-white rounded p-3">
                  <strong className="text-sm text-blue-900">Recommended Ships:</strong>
                  <ul className="text-sm text-gray-600 mt-2">
                    <li>• Radiance of the Seas</li>
                    <li>• Ovation of the Seas</li>
                    <li>• Quantum of the Seas</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-900 text-white rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Need Help Choosing Your Ship?</h3>
              <p className="text-lg mb-6">
                Our Royal Caribbean specialists know every ship in the fleet and can match you with
                the perfect vessel for your vacation style
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+18338741019"
                  className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Call 833-874-1019
                </a>
                <Link
                  href="/cruises/royal-caribbean"
                  className="inline-flex items-center justify-center bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-lg font-bold transition-all"
                >
                  Back to Royal Caribbean
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
