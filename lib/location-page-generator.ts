import { LocationData } from './location-data'
import { Metadata } from 'next'

export function generateLocationMetadata(location: LocationData): Metadata {
  const mainAirport = location.airports.find(a => a.code === location.shortName) || location.airports[0]
  const hasMultipleAirports = location.airports.length > 1
  const hasCruisePorts = location.cruisePorts && location.cruisePorts.length > 0
  
  const title = `${location.city} Travel Agency | Flights from ${mainAirport.code} | ${hasCruisePorts ? 'Cruises from ' + location.city : 'Vacation Packages'}`
  const description = `Book flights from ${mainAirport.name}${hasCruisePorts ? ', cruises from local ports,' : ''} and vacation packages. Expert ${location.city} travel agency serving ${location.state}${hasMultipleAirports ? ' with ' + location.airports.length + ' airport options' : ''}.`
  
  const keywords = [
    `${location.city} travel agency`,
    `flights from ${mainAirport.code}`,
    `${mainAirport.name} flights`,
    `${location.city} vacation packages`,
    `${location.state} travel`,
    `cheap flights from ${location.city}`,
    ...location.specialties.map(s => s.toLowerCase()),
    ...location.airports.map(a => `flights from ${a.code}`)
  ].join(', ')

  return {
    title,
    description,
    keywords,
    openGraph: {
      title: `${location.city} Travel Agency - Expert Travel Planning from ${location.region}`,
      description: `Your trusted ${location.city} travel experts. Best deals on flights from ${mainAirport.code}${hasCruisePorts ? ' and cruises from local ports' : ''}. Serving all of ${location.state}.`,
      url: `https://nexttripanywhere.com/from/${location.city.toLowerCase().replace(/\s+/g, '')}`,
      images: [
        {
          url: `/images/${location.city.toLowerCase().replace(/\s+/g, '')}-travel.jpg`,
          width: 1200,
          height: 630,
          alt: `${location.city} Travel Agency - Next Trip Anywhere`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${location.city} Travel Agency | Flights${hasCruisePorts ? ' & Cruises' : ''} from ${location.city}`,
      description: `Book your next trip from ${location.city} with expert local travel agents. Best deals from ${mainAirport.code}.`,
    },
    alternates: {
      canonical: `https://nexttripanywhere.com/from/${location.city.toLowerCase().replace(/\s+/g, '')}`,
    },
  }
}

export function generateLocationJsonLd(location: LocationData) {
  const mainAirport = location.airports.find(a => a.code === location.shortName) || location.airports[0]
  
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://nexttripanywhere.com/from/${location.city.toLowerCase().replace(/\s+/g, '')}`,
    name: `Next Trip Anywhere - ${location.city}`,
    description: `Full-service travel agency serving ${location.city} and ${location.region} with expert flight, cruise, and vacation package planning.`,
    url: `https://nexttripanywhere.com/from/${location.city.toLowerCase().replace(/\s+/g, '')}`,
    telephone: '+1-833-874-1019',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.city,
      addressRegion: location.stateCode,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.coordinates.latitude,
      longitude: location.coordinates.longitude,
    },
    areaServed: [
      {
        '@type': 'State',
        name: location.state,
      },
      {
        '@type': 'City',
        name: location.city,
      },
      ...location.localAreas.slice(0, 10).map(area => ({
        '@type': 'City',
        name: area,
      }))
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    sameAs: [
      'https://www.facebook.com/nexttripanywhere',
      'https://www.instagram.com/nexttripanywhere',
      'https://www.linkedin.com/company/nexttripanywhere'
    ]
  }
}