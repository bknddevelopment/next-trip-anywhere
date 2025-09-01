import { Metadata } from 'next'
import LocationHero from '@/components/locations/LocationHero'
import LocationDeals from '@/components/locations/LocationDeals'
import LocationAirports from '@/components/locations/LocationAirports'
import LeadCaptureForm from '@/components/forms/LeadCaptureForm'

export const metadata: Metadata = {
  title: 'Travel from New York City | NYC Travel Agency | Next Trip Anywhere',
  description:
    'Book flights, cruises, and vacation packages departing from NYC airports (JFK, LGA, EWR). Local travel experts serving Manhattan, Brooklyn, Queens, and the Tri-State area.',
  openGraph: {
    title: 'NYC Travel Agency - Flights & Vacations from New York',
    description:
      'Expert travel planning for New York residents. Best deals from JFK, LaGuardia, and Newark airports.',
  },
}

const nycData = {
  city: 'New York City',
  shortName: 'NYC',
  airports: [
    { code: 'JFK', name: 'John F. Kennedy International', distance: '15 miles from Manhattan' },
    { code: 'LGA', name: 'LaGuardia Airport', distance: '8 miles from Manhattan' },
    { code: 'EWR', name: 'Newark Liberty International', distance: '16 miles from Manhattan' },
  ],
  cruisePorts: [
    { name: 'Manhattan Cruise Terminal', location: 'West Side, Manhattan' },
    { name: 'Brooklyn Cruise Terminal', location: 'Red Hook, Brooklyn' },
    { name: 'Cape Liberty Cruise Port', location: 'Bayonne, NJ (20 min from Manhattan)' },
  ],
  popularDestinations: [
    'Miami',
    'Los Angeles',
    'London',
    'Paris',
    'Cancun',
    'Orlando',
    'Las Vegas',
    'San Francisco',
  ],
  localAreas: [
    'Manhattan',
    'Brooklyn',
    'Queens',
    'The Bronx',
    'Staten Island',
    'Long Island',
    'Westchester',
    'New Jersey',
    'Connecticut',
  ],
}

export default function NYCPage() {
  return (
    <>
      <LocationHero location={nycData} />
      <LocationAirports location={nycData} />
      <LocationDeals location={nycData} />

      <section className="py-16 bg-warm-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-bold text-navy mb-4">Your NYC Travel Experts</h2>
            <p className="text-lg text-gray-600">
              As New York&apos;s trusted travel agency, we know the best routes, times, and deals
              from all NYC airports. Let us handle the details while you enjoy your trip.
            </p>
          </div>
          <LeadCaptureForm source="nyc-location" />
        </div>
      </section>

      {/* Local SEO Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-4xl mx-auto">
            <h2>Travel Services for New York City Residents</h2>
            <p>
              Next Trip Anywhere is your local NYC travel agency, specializing in departures from
              JFK, LaGuardia, and Newark airports. Whether you&apos;re in Manhattan, Brooklyn,
              Queens, or the surrounding areas, we provide personalized travel planning with the
              best deals on flights, cruises, and vacation packages.
            </p>

            <h3>Why NYC Travelers Choose Us</h3>
            <ul>
              <li>Expert knowledge of all three major NYC airports</li>
              <li>Special group rates from Manhattan and Brooklyn cruise terminals</li>
              <li>24/7 support for NYC&apos;s busy professionals</li>
              <li>Exclusive deals on non-stop flights from New York</li>
              <li>Personalized service for Tri-State area residents</li>
            </ul>

            <h3>Popular Vacations from New York</h3>
            <p>
              New Yorkers love escaping to warm beaches in the Caribbean, exploring European
              capitals, and taking advantage of direct flights to Asia and South America. Our most
              popular packages from NYC include all-inclusive resorts in Cancun and Jamaica,
              Mediterranean cruises from Manhattan, and city breaks to London and Paris.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
