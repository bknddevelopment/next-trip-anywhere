'use client'

import { motion } from 'framer-motion'

interface LocationData {
  city: string
  shortName: string
  airports: Array<{ code: string; name: string; distance: string }>
  cruisePorts?: Array<{ name: string; location: string }>
  specialties: string[]
  localAreas: string[]
}

interface LocationSEOContentProps {
  location: LocationData
}

export default function LocationSEOContent({ location }: LocationSEOContentProps) {
  const mainAirport = location.airports.find(a => a.code === location.shortName) || location.airports[0]
  const hasMultipleAirports = location.airports.length > 1
  const hasCruisePorts = location.cruisePorts && location.cruisePorts.length > 0

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="prose prose-lg max-w-4xl mx-auto"
        >
          <h2>Expert Travel Services for {location.city} and Surrounding Areas</h2>
          <p>
            Next Trip Anywhere is {location.city}'s premier travel agency, specializing in departures
            from {mainAirport.name} ({mainAirport.code}){hasMultipleAirports && ` and ${location.airports.length - 1} other regional airports`}
            {hasCruisePorts && ` and cruise departures from local ports`}. Whether
            you're in {location.localAreas.slice(0, 3).join(', ')}, or anywhere in the {location.city} metropolitan area, we provide
            personalized travel planning with unbeatable deals on flights, cruises, and vacation
            packages.
          </p>

          <h3>Why {location.city} Travelers Choose Next Trip Anywhere</h3>
          <ul>
            <li>
              <strong>{mainAirport.code} Airport Experts:</strong> We know the best routes, airlines, and
              timing for {mainAirport.name} departures
            </li>
            {hasCruisePorts && (
              <li>
                <strong>Cruise Specialists:</strong> Exclusive group rates from {location.cruisePorts![0].name}
                {location.cruisePorts!.length > 1 && ` and ${location.cruisePorts!.length - 1} other local ports`}
              </li>
            )}
            <li>
              <strong>Local Coverage:</strong> Serving {location.localAreas.slice(0, 6).join(', ')}, and surrounding communities
            </li>
            {location.specialties.map((specialty, index) => (
              <li key={index}>
                <strong>{specialty}:</strong> Specialized expertise in this area of travel
              </li>
            ))}
            <li>
              <strong>24/7 Support:</strong> Always available for {location.city}'s busy professionals
              and families
            </li>
          </ul>

          <h3>Popular Destinations from {location.city}</h3>
          <p>
            {location.city} travelers love our competitive rates and expert service for both domestic and international destinations. Our most popular packages include:
          </p>
          <ul>
            <li>
              <strong>Domestic Flights:</strong> Competitive rates to popular US destinations with convenient {location.shortName} departure times
            </li>
            <li>
              <strong>International Travel:</strong> Direct and connecting flights to Europe, Asia, Caribbean, and beyond
            </li>
            {hasCruisePorts && (
              <li>
                <strong>Cruise Vacations:</strong> 7-14 day sailings from {location.city} to Caribbean, Mediterranean, and other destinations
              </li>
            )}
            <li>
              <strong>All-Inclusive Resorts:</strong> Complete vacation packages with flights from {location.shortName}
            </li>
            <li>
              <strong>Group Travel:</strong> Corporate retreats, family reunions, and destination weddings
            </li>
            <li>
              <strong>Luxury Travel:</strong> Premium accommodations and first-class service worldwide
            </li>
          </ul>

          <h3>Serving All of Greater {location.city}</h3>
          <p>
            Our travel experts understand the unique needs of {location.city} area travelers. We serve
            clients throughout the metropolitan area including {location.localAreas.join(', ')}, 
            and surrounding communities. Whether you prefer departure from {mainAirport.name} or one of the 
            {hasMultipleAirports ? `${location.airports.length - 1} other regional airports` : 'regional alternatives'}, 
            we'll find the most convenient and cost-effective options for your travel needs.
          </p>

          <h3>Convenient {location.city} Travel Planning</h3>
          <p>
            Located in the heart of {location.city}'s travel market, we understand local preferences and travel patterns. 
            Our services include:
          </p>
          <ul>
            <li>Free travel consultations and trip planning</li>
            <li>Airport parking and transportation coordination</li>
            <li>Travel insurance and protection plans</li>
            <li>Visa and passport assistance</li>
            <li>Group travel coordination and management</li>
            <li>Corporate travel programs and expense management</li>
            <li>Emergency travel assistance and rebooking</li>
          </ul>

          <h3>Book Your {location.city} Departure with Confidence</h3>
          <p>
            As an established {location.city} travel agency with years of experience and thousands
            of satisfied customers, we guarantee the best prices on all travel from {location.city}. Our
            team of certified travel advisors ensures your trip is perfectly planned, from your departure at {mainAirport.code}
            {hasMultipleAirports && ` or other local airports`} to your final destination. Contact us today for your free consultation
            and discover why {location.city} travelers trust Next Trip Anywhere for all their vacation needs.
          </p>

          <h4>Travel Deals and Packages from {location.city}</h4>
          <p>
            We specialize in finding the best travel deals for {location.city} residents, including:
          </p>
          <ul>
            <li>Last-minute flight deals from {location.shortName}</li>
            <li>Early booking discounts on popular destinations</li>
            <li>Group rates for family and corporate travel</li>
            {hasCruisePorts && <li>Cruise deals with free upgrades and onboard credits</li>}
            <li>All-inclusive resort packages with airfare from {location.city}</li>
            <li>Honeymoon and anniversary travel specials</li>
            <li>Senior and military travel discounts</li>
          </ul>

          <p>
            <strong>Ready to plan your next adventure from {location.city}?</strong> Call us at 1-833-874-1019 
            or email info@nexttripanywhere.com for your free consultation. We're here to make your travel dreams a reality 
            with personalized service, competitive prices, and the peace of mind that comes with working with {location.city}'s 
            most trusted travel professionals.
          </p>
        </motion.div>
      </div>
    </section>
  )
}