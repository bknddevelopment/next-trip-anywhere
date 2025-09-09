import { Metadata } from 'next'
import { Phone, Mail } from 'lucide-react'
import LocationHero from '@/components/locations/LocationHero'
import LocationDeals from '@/components/locations/LocationDeals'
import LocationAirports from '@/components/locations/LocationAirports'
import { getLocationData } from '@/lib/location-data'
import { generateLocationMetadata, generateLocationJsonLd } from '@/lib/location-page-generator'

const dcData = getLocationData('dc')!
export const metadata: Metadata = generateLocationMetadata(dcData)

// JSON-LD for DC location
const dcJsonLd = generateLocationJsonLd(dcData)

const governmentTravelJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'GovernmentService',
  name: 'Government Employee Travel Services',
  serviceType: 'Federal Employee Travel Planning',
  provider: {
    '@type': 'Organization',
    name: 'Next Trip Anywhere - DC',
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Washington DC Metropolitan Area',
  },
  description:
    'Specialized travel services for federal employees, contractors, and military personnel.',
}

export default function DCPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(dcJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(governmentTravelJsonLd),
        }}
      />

      <LocationHero location={dcData} />

      {/* Government Travel Banner */}
      <section className="bg-gradient-to-r from-blue-900 to-red-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold">
            🏛️ Proud to Serve Federal Employees, Military, and Government Contractors with Special
            Rates
          </p>
        </div>
      </section>

      <LocationAirports location={dcData} />

      {/* Trust Building Section for DC */}
      <section className="py-16 bg-gradient-to-br from-navy to-blue-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            The Capital Region&apos;s Trusted Travel Partner
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">12+</div>
              <div className="text-sm opacity-90">Years Serving DC Metro</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">75K+</div>
              <div className="text-sm opacity-90">Government Employees Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">GSA</div>
              <div className="text-sm opacity-90">Schedule Contractor</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-sm opacity-90">Emergency Travel Support</div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <p className="text-lg mb-4">Preferred Partner of Major Airlines at DCA, IAD & BWI</p>
            <div className="inline-flex flex-wrap justify-center gap-4">
              <span className="bg-white/20 px-4 py-2 rounded-full">United Airlines</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">American Airlines</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Delta Airlines</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Southwest Airlines</span>
            </div>
          </div>
        </div>
      </section>

      <LocationDeals location={dcData} />

      {/* Lead Capture with Government Focus */}
      <section className="py-16 bg-warm-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              SPECIAL: Federal Employee Discounts Available
            </div>
            <h2 className="text-3xl font-bold text-navy mb-4">
              DC Metro&apos;s Premier Travel Agency
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Trusted by government employees, contractors, and Capital Region residents for over a
              decade. We understand the unique travel needs of DC professionals.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">GSA Schedule Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">Government Rate Specialist</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">Security Clearance Friendly</span>
              </div>
            </div>
          </div>
          {/* Call to Action */}
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-navy mb-4">
                Ready to Book Your Trip?
              </h3>
              <p className="text-gray-700 mb-6">
                Our expert travel agents are standing by to help you find the best deals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:1-833-874-1019"
                  className="inline-flex items-center justify-center bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call 1-833-874-1019
                </a>
                <a
                  href="mailto:info@nexttripanywhere.com"
                  className="inline-flex items-center justify-center bg-secondary-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-secondary-700 transition-colors"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Email for Quote
                </a>
              </div>
            </div>
        </div>
      </section>

      {/* Local SEO Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-4xl mx-auto">
            <h2>Washington DC&apos;s Expert Travel Agency for Government and Business</h2>
            <p>
              Next Trip Anywhere is the Capital Region&apos;s premier travel agency, specializing in
              serving the unique needs of Washington DC, Northern Virginia, and Maryland residents.
              With expertise in government travel regulations, corporate travel management, and
              leisure vacation planning, we&apos;re your trusted partner for all travel from Reagan
              National (DCA), Dulles International (IAD), and BWI airports.
            </p>

            <h3>Specialized Services for the DC Metro Area</h3>
            <ul>
              <li>
                <strong>Government Travel Expertise:</strong> GSA-approved rates, per diem
                compliance, and understanding of federal travel regulations
              </li>
              <li>
                <strong>Three Airport Coverage:</strong> Expert knowledge of DCA for quick shuttles,
                IAD for international flights, and BWI for best value
              </li>
              <li>
                <strong>Corporate Travel Management:</strong> Serving DC&apos;s law firms,
                associations, NGOs, and contractors
              </li>
              <li>
                <strong>Last-Minute Bookings:</strong> Emergency travel arrangements for government
                missions and business needs
              </li>
              <li>
                <strong>Security Clearance Considerations:</strong> Discrete handling of sensitive
                travel requirements
              </li>
              <li>
                <strong>Metro-Accessible Service:</strong> Convenient consultations for busy DC
                professionals
              </li>
            </ul>

            <h3>Popular Travel from Washington DC</h3>
            <p>DC area travelers rely on us for these top destinations and services:</p>
            <ul>
              <li>
                <strong>Business Travel Hubs:</strong> Shuttle flights to NYC, Boston, Chicago,
                Atlanta, and West Coast cities
              </li>
              <li>
                <strong>International Connections:</strong> Direct flights from Dulles to Europe,
                Asia, Middle East, and Africa
              </li>
              <li>
                <strong>Government Destinations:</strong> Military bases, federal facilities, and
                conference locations nationwide
              </li>
              <li>
                <strong>Weekend Getaways:</strong> Quick escapes to Florida, Charleston, Asheville,
                and Williamsburg
              </li>
              <li>
                <strong>Baltimore Cruises:</strong> Convenient departures to Bahamas, Bermuda, and
                Caribbean from nearby Port of Baltimore
              </li>
            </ul>

            <h3>Serving the Entire Capital Region</h3>
            <p>
              Our DC travel agency proudly serves professionals and families throughout the
              metropolitan area:
            </p>
            <ul>
              <li>
                <strong>Washington DC:</strong> Capitol Hill, Downtown, Georgetown, Dupont Circle,
                Navy Yard, all quadrants
              </li>
              <li>
                <strong>Northern Virginia:</strong> Arlington, Alexandria, Fairfax, Tysons Corner,
                Reston, Falls Church, McLean
              </li>
              <li>
                <strong>Maryland:</strong> Bethesda, Silver Spring, Rockville, College Park,
                Gaithersburg, Annapolis
              </li>
              <li>
                <strong>Extended Metro:</strong> Loudoun County, Prince William County, Frederick,
                Baltimore suburbs
              </li>
            </ul>

            <h3>Why DC Professionals Choose Next Trip Anywhere</h3>
            <p>
              With over 12 years serving the Capital Region, we understand the fast-paced lifestyle
              of DC professionals. Whether you&apos;re a federal employee needing compliant travel
              arrangements, a contractor managing project travel, or a family planning a
              well-deserved vacation, our expertise saves you time and money.
            </p>

            <h4>Government Employee Benefits</h4>
            <ul>
              <li>GSA City Pair Program fares</li>
              <li>Per diem rate expertise</li>
              <li>FedRooms rate access</li>
              <li>Military and veteran discounts</li>
              <li>Understanding of travel card requirements</li>
            </ul>

            <h4>Corporate Travel Excellence</h4>
            <ul>
              <li>Dedicated account management</li>
              <li>Expense report compatibility</li>
              <li>Group travel coordination</li>
              <li>Conference and event planning</li>
              <li>24/7 emergency support</li>
            </ul>

            <h3>Book Your Next Trip with Confidence</h3>
            <p>
              Join thousands of satisfied Capital Region travelers who trust Next Trip Anywhere for
              their travel needs. From quick shuttles to New York from Reagan National to
              international adventures from Dulles, we ensure your journey starts smoothly. Our
              team&apos;s deep knowledge of DC-area airports, combined with exclusive partnerships
              and government-approved rates, guarantees you the best value on every trip.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
