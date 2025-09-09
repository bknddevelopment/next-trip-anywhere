import { Metadata } from 'next'
import LocationHero from '@/components/locations/LocationHero'
import LocationDeals from '@/components/locations/LocationDeals'
import LocationAirports from '@/components/locations/LocationAirports'
import LocationTestimonials from '@/components/locations/LocationTestimonials'
import LocationSeasonalHighlights from '@/components/locations/LocationSeasonalHighlights'
import LocationCTA from '@/components/locations/LocationCTA'
import LocationSEOContent from '@/components/locations/LocationSEOContent'
import { getLocationData } from '@/lib/location-data'

export const metadata: Metadata = {
  title: 'Boston Travel Agency | Flights from Logan Airport | Cruises from Boston',
  description:
    'Book flights from Logan Airport, cruises from Black Falcon Terminal, and vacation packages. Expert Boston travel agency serving Massachusetts, New Hampshire, Rhode Island, and New England.',
  keywords:
    'Boston travel agency, flights from Logan Airport, Boston cruises, Black Falcon cruise terminal, Massachusetts travel, New England vacation packages, cheap flights from Boston',
  openGraph: {
    title: 'Boston Travel Agency - Expert Travel Planning from New England',
    description:
      'Your trusted Boston travel experts. Best deals on flights from Logan Airport and cruises from Black Falcon Terminal. Serving all of New England.',
    url: 'https://nexttripanywhere.com/from/boston',
    images: [
      {
        url: '/images/boston-travel.jpg',
        width: 1200,
        height: 630,
        alt: 'Boston Travel Agency - Next Trip Anywhere',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boston Travel Agency | Flights & Cruises from Boston',
    description:
      'Book your next trip from Boston with expert local travel agents. Best deals from Logan Airport.',
  },
  alternates: {
    canonical: 'https://nexttripanywhere.com/from/boston',
  },
}

const bostonData = getLocationData('boston')!

// JSON-LD for Boston location
const bostonJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://nexttripanywhere.com/from/boston',
  name: 'Next Trip Anywhere - Boston',
  description:
    'Full-service travel agency serving Boston and New England with expert flight, cruise, and vacation package planning.',
  url: 'https://nexttripanywhere.com/from/boston',
  telephone: '+1-833-874-1019',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Boston',
    addressRegion: 'MA',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 42.3601,
    longitude: -71.0589,
  },
  areaServed: [
    {
      '@type': 'State',
      name: 'Massachusetts',
    },
    {
      '@type': 'State',
      name: 'New Hampshire',
    },
    {
      '@type': 'State',
      name: 'Rhode Island',
    },
    {
      '@type': 'State',
      name: 'Connecticut',
    },
    {
      '@type': 'State',
      name: 'Maine',
    },
    {
      '@type': 'State',
      name: 'Vermont',
    },
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
}

export default function BostonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(bostonJsonLd),
        }}
      />

      <LocationHero location={bostonData} />
      <LocationAirports location={bostonData} />
      <LocationDeals location={bostonData} />
      <LocationSeasonalHighlights highlights={bostonData.seasonalHighlights} city={bostonData.city} />
      <LocationTestimonials testimonials={bostonData.testimonials} city={bostonData.city} />
      <LocationCTA city={bostonData.city} urgencyMessage="LIMITED TIME: Save up to $500 on Boston Departures" />
      <LocationSEOContent location={bostonData} />
    </>
  )
}
