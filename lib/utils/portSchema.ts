/**
 * Schema generators for port, destination, and location pages
 * Provides Place, LocalBusiness, TouristAttraction, and Event structured data
 */

// Type definitions for port and destination schemas
interface Place {
  '@context'?: string
  '@type':
    | 'Place'
    | 'LandmarksOrHistoricalBuildings'
    | 'TouristAttraction'
    | 'TouristDestination'
    | 'Airport'
  '@id'?: string
  name: string
  description?: string
  image?: string | ImageObject | ImageObject[]
  url?: string
  sameAs?: string[]
  address?: PostalAddress
  geo?: GeoCoordinates
  map?: string
  telephone?: string
  email?: string
  openingHoursSpecification?: OpeningHoursSpecification[]
  hasMap?: string
  isAccessibleForFree?: boolean
  publicAccess?: boolean
  smokingAllowed?: boolean
  maximumAttendeeCapacity?: number
  amenityFeature?: LocationFeatureSpecification[]
  containedInPlace?: Place
  containsPlace?: Place[]
  event?: Event[]
  photo?: Photograph[]
  review?: Review[]
  aggregateRating?: AggregateRating
  tourBookingPage?: string
  slogan?: string
  additionalProperty?: PropertyValue[]
}

interface TouristAttraction extends Place {
  '@type': 'TouristAttraction'
  availableLanguage?: Language[]
  touristType?: string | string[]
  isAccessibleForFree?: boolean
  publicAccess?: boolean
}

interface TouristDestination extends Place {
  '@type': 'TouristDestination'
  includesAttraction?: TouristAttraction[]
  touristType?: string | string[]
}

interface Airport extends Place {
  '@type': 'Airport'
  iataCode?: string
  icaoCode?: string
}

interface CruiseTerminal {
  '@context'?: string
  '@type': 'CivicStructure'
  '@id'?: string
  name: string
  description?: string
  address: PostalAddress
  geo?: GeoCoordinates
  telephone?: string
  url?: string
  image?: string | ImageObject
  openingHours?: string
  amenityFeature?: LocationFeatureSpecification[]
  hasMap?: string
  isAccessibleForFree?: boolean
  aggregateRating?: AggregateRating
}

interface LocalBusiness {
  '@context'?: string
  '@type': 'LocalBusiness' | 'TravelAgency'
  '@id'?: string
  name: string
  description?: string
  image?: string | ImageObject | ImageObject[]
  url?: string
  telephone?: string
  email?: string
  address: PostalAddress
  geo?: GeoCoordinates
  priceRange?: string
  openingHoursSpecification?: OpeningHoursSpecification[]
  sameAs?: string[]
  paymentAccepted?: string | string[]
  currenciesAccepted?: string
  areaServed?: Place | Place[] | AdministrativeArea | AdministrativeArea[]
  hasOfferCatalog?: OfferCatalog
  aggregateRating?: AggregateRating
  review?: Review[]
  founder?: Person
  foundingDate?: string
  knowsAbout?: string | string[]
  knowsLanguage?: string | string[]
  memberOf?: Organization[]
  slogan?: string
}

interface PostalAddress {
  '@type': 'PostalAddress'
  streetAddress?: string
  addressLocality: string
  addressRegion?: string
  postalCode?: string
  addressCountry: string
  postOfficeBoxNumber?: string
}

interface GeoCoordinates {
  '@type': 'GeoCoordinates'
  latitude: number
  longitude: number
  elevation?: number
}

interface ImageObject {
  '@type': 'ImageObject'
  url: string
  width?: number
  height?: number
  caption?: string
  contentUrl?: string
}

interface OpeningHoursSpecification {
  '@type': 'OpeningHoursSpecification'
  dayOfWeek: string | string[]
  opens?: string
  closes?: string
  validFrom?: string
  validThrough?: string
}

interface LocationFeatureSpecification {
  '@type': 'LocationFeatureSpecification'
  name: string
  value?: boolean | string | number
  propertyID?: string
}

interface Event {
  '@type': 'Event' | 'MusicEvent' | 'Festival' | 'SportsEvent'
  '@id'?: string
  name: string
  description?: string
  startDate: string
  endDate?: string
  location: Place
  image?: string | ImageObject
  url?: string
  performer?: Person | Organization | PerformingGroup
  organizer?: Person | Organization
  sponsor?: Person | Organization
  offers?: Offer | Offer[]
  eventStatus?: EventStatusType
  eventAttendanceMode?: EventAttendanceModeEnumeration
  previousStartDate?: string
  typicalAgeRange?: string
  duration?: string
  inLanguage?: string | Language
  audience?: Audience
  maximumAttendeeCapacity?: number
  remainingAttendeeCapacity?: number
}

interface Person {
  '@type': 'Person'
  name: string
  url?: string
  image?: string
  jobTitle?: string
  sameAs?: string[]
}

interface Organization {
  '@type': 'Organization'
  name: string
  url?: string
  logo?: string
  sameAs?: string[]
  description?: string
}

interface PerformingGroup {
  '@type': 'PerformingGroup'
  name: string
  url?: string
}

interface Offer {
  '@type': 'Offer'
  url?: string
  price?: number | string
  priceCurrency?: string
  availability?: string
  validFrom?: string
  validThrough?: string
  category?: string
}

interface EventStatusType {
  '@type': 'EventStatusType'
  name: 'EventScheduled' | 'EventCancelled' | 'EventPostponed' | 'EventRescheduled'
}

interface EventAttendanceModeEnumeration {
  '@type': 'EventAttendanceModeEnumeration'
  name: 'OfflineEventAttendanceMode' | 'OnlineEventAttendanceMode' | 'MixedEventAttendanceMode'
}

interface Language {
  '@type': 'Language'
  name: string
  alternateName?: string
}

interface Audience {
  '@type': 'Audience'
  audienceType?: string
  geographicArea?: Place
}

interface Photograph {
  '@type': 'Photograph'
  url: string
  caption?: string
  creator?: Person | Organization
  copyrightHolder?: Person | Organization
  contentLocation?: Place
  dateCreated?: string
}

interface Review {
  '@type': 'Review'
  author: Person
  datePublished: string
  reviewRating: Rating
  reviewBody?: string
}

interface Rating {
  '@type': 'Rating'
  ratingValue: number
  bestRating?: number
  worstRating?: number
}

interface AggregateRating {
  '@type': 'AggregateRating'
  ratingValue: number
  reviewCount: number
  bestRating?: number
  worstRating?: number
}

interface PropertyValue {
  '@type': 'PropertyValue'
  name: string
  value: string | number | boolean
  unitCode?: string
  unitText?: string
}

interface AdministrativeArea {
  '@type': 'AdministrativeArea'
  name: string
  containedInPlace?: AdministrativeArea
  geo?: GeoCoordinates
}

interface OfferCatalog {
  '@type': 'OfferCatalog'
  name: string
  itemListElement: Offer[]
}

interface Service {
  '@type': 'Service'
  name: string
  description?: string
  provider?: Organization | Person
  serviceType?: string
  areaServed?: Place | AdministrativeArea
  hasOfferCatalog?: OfferCatalog
}

interface TransportService {
  '@context'?: string
  '@type': 'Service'
  serviceType: 'TransportService'
  name: string
  description?: string
  provider?: Organization
  departureAirport?: Airport
  arrivalAirport?: Airport
  departurePort?: Place
  arrivalPort?: Place
}

interface Flight {
  '@context'?: string
  '@type': 'Flight'
  '@id'?: string
  flightNumber?: string
  provider?: Organization
  departureAirport: Airport
  arrivalAirport: Airport
  departureTime?: string
  arrivalTime?: string
  aircraft?: string
  seller?: Organization
  webCheckinTime?: string
  boardingPolicy?: BoardingPolicyType
  estimatedFlightDuration?: string
}

interface BoardingPolicyType {
  '@type': 'BoardingPolicyType'
  name: 'GroupBoardingPolicy' | 'ZoneBoardingPolicy'
}

interface TravelGuide {
  '@context'?: string
  '@type': 'Article'
  articleSection: 'Travel Guide'
  headline: string
  description: string
  about: Place | TouristDestination
  author?: Person | Organization
  datePublished?: string
  dateModified?: string
  image?: ImageObject
  mentions?: Place[]
  spatialCoverage?: Place
}

// Newark Airport schema
export function generateNewarkAirportSchema(): Airport {
  return {
    '@type': 'Airport',
    '@id': 'https://nexttripanywhere.com/#ewr',
    name: 'Newark Liberty International Airport',
    iataCode: 'EWR',
    icaoCode: 'KEWR',
    url: 'https://www.newarkairport.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3 Brewster Rd',
      addressLocality: 'Newark',
      addressRegion: 'NJ',
      postalCode: '07114',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.6925,
      longitude: -74.1687,
    },
    telephone: '+1-973-961-6000',
    hasMap: 'https://goo.gl/maps/ewr',
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Parking' },
      { '@type': 'LocationFeatureSpecification', name: 'Wheelchair Accessible' },
      { '@type': 'LocationFeatureSpecification', name: 'Wi-Fi' },
      { '@type': 'LocationFeatureSpecification', name: 'Restaurant' },
      { '@type': 'LocationFeatureSpecification', name: 'Shopping' },
    ],
  }
}

// Cape Liberty Cruise Port schema
export function generateCapeLibertyPortSchema(): CruiseTerminal {
  return {
    '@type': 'CivicStructure',
    '@id': 'https://nexttripanywhere.com/#cape-liberty',
    name: 'Cape Liberty Cruise Port',
    description:
      'The primary cruise terminal serving the New York metropolitan area, located in Bayonne, NJ',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '14 Port Terminal Blvd',
      addressLocality: 'Bayonne',
      addressRegion: 'NJ',
      postalCode: '07002',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.6626,
      longitude: -74.0777,
    },
    telephone: '+1-201-823-3737',
    url: 'https://www.cruiseliberty.com',
    hasMap: 'https://goo.gl/maps/capeliberty',
    isAccessibleForFree: false,
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Parking', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Wheelchair Accessible', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Luggage Storage', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Security Checkpoint', value: true },
    ],
  }
}

// Generate destination schema for travel destinations
export function generateDestinationSchema(destination: {
  name: string
  description: string
  type?: 'city' | 'country' | 'region' | 'island'
  country?: string
  region?: string
  coordinates?: { lat: number; lng: number }
  attractions?: string[]
  languages?: string[]
  currency?: string
  bestTimeToVisit?: string
  image?: string
}): TouristDestination {
  const schema: TouristDestination = {
    '@type': 'TouristDestination',
    '@id': `https://nexttripanywhere.com/destinations/${destination.name.toLowerCase().replace(/\s+/g, '-')}`,
    name: destination.name,
    description: destination.description,
    url: `https://nexttripanywhere.com/destinations/${destination.name.toLowerCase().replace(/\s+/g, '-')}`,
    touristType: ['Family', 'Couples', 'Solo Travelers', 'Business'],
  }

  if (destination.image) {
    schema.image = {
      '@type': 'ImageObject',
      url: `https://nexttripanywhere.com${destination.image}`,
      caption: `${destination.name} destination view`,
    }
  }

  if (destination.coordinates) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: destination.coordinates.lat,
      longitude: destination.coordinates.lng,
    }
  }

  if (destination.country || destination.region) {
    schema.address = {
      '@type': 'PostalAddress',
      addressCountry: destination.country || '',
      addressRegion: destination.region || '',
      addressLocality: destination.type === 'city' ? destination.name : '',
    }
  }

  if (destination.attractions && destination.attractions.length > 0) {
    schema.includesAttraction = destination.attractions.map((attraction) => ({
      '@type': 'TouristAttraction',
      name: attraction,
      isAccessibleForFree: false,
      publicAccess: true,
    }))
  }

  if (destination.languages) {
    schema.additionalProperty = schema.additionalProperty || []
    schema.additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'Languages Spoken',
      value: destination.languages.join(', '),
    })
  }

  if (destination.currency) {
    schema.additionalProperty = schema.additionalProperty || []
    schema.additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'Currency',
      value: destination.currency,
    })
  }

  if (destination.bestTimeToVisit) {
    schema.additionalProperty = schema.additionalProperty || []
    schema.additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'Best Time to Visit',
      value: destination.bestTimeToVisit,
    })
  }

  return schema
}

// Generate tourist attraction schema
export function generateAttractionSchema(attraction: {
  name: string
  description: string
  location: string
  type?: string
  price?: number
  hours?: string
  website?: string
  rating?: number
  reviewCount?: number
}): TouristAttraction {
  const schema: TouristAttraction = {
    '@type': 'TouristAttraction',
    '@id': `https://nexttripanywhere.com/#attraction-${attraction.name.toLowerCase().replace(/\s+/g, '-')}`,
    name: attraction.name,
    description: attraction.description,
    isAccessibleForFree: attraction.price === 0,
    publicAccess: true,
    address: {
      '@type': 'PostalAddress',
      addressLocality: attraction.location,
      addressCountry: 'US',
    },
  }

  if (attraction.website) {
    schema.url = attraction.website
  }

  if (attraction.hours) {
    schema.openingHoursSpecification = [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '09:00',
        closes: '17:00',
      },
    ]
  }

  if (attraction.rating && attraction.reviewCount) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: attraction.rating,
      reviewCount: attraction.reviewCount,
      bestRating: 5,
      worstRating: 1,
    }
  }

  return schema
}

// Generate transport service schema
export function generateTransportSchema(transport: {
  type: 'flight' | 'cruise' | 'train' | 'bus'
  from: string
  to: string
  provider?: string
  departureTime?: string
  arrivalTime?: string
}): TransportService {
  return {
    '@type': 'Service',
    serviceType: 'TransportService',
    name: `${transport.type.charAt(0).toUpperCase() + transport.type.slice(1)} from ${transport.from} to ${transport.to}`,
    description: `${transport.type} transportation service between ${transport.from} and ${transport.to}`,
    provider: transport.provider
      ? {
          '@type': 'Organization',
          name: transport.provider,
        }
      : undefined,
    departurePort: {
      '@type': 'Place',
      name: transport.from,
    },
    arrivalPort: {
      '@type': 'Place',
      name: transport.to,
    },
  }
}

// Generate event schema for destination events
export function generateDestinationEventSchema(event: {
  name: string
  description: string
  location: string
  startDate: string
  endDate?: string
  url?: string
  image?: string
  price?: number
  organizer?: string
}): Event {
  const schema: Event = {
    '@type': 'Event',
    '@id': `https://nexttripanywhere.com/#event-${event.name.toLowerCase().replace(/\s+/g, '-')}`,
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    location: {
      '@type': 'Place',
      name: event.location,
    },
    eventStatus: {
      '@type': 'EventStatusType',
      name: 'EventScheduled',
    },
    eventAttendanceMode: {
      '@type': 'EventAttendanceModeEnumeration',
      name: 'OfflineEventAttendanceMode',
    },
  }

  if (event.url) {
    schema.url = event.url
  }

  if (event.image) {
    schema.image = {
      '@type': 'ImageObject',
      url: `https://nexttripanywhere.com${event.image}`,
    }
  }

  if (event.price !== undefined) {
    schema.offers = {
      '@type': 'Offer',
      price: event.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    }
  }

  if (event.organizer) {
    schema.organizer = {
      '@type': 'Organization',
      name: event.organizer,
    }
  }

  return schema
}

// Generate travel guide schema for destination content
export function generateDestinationGuideSchema(guide: {
  title: string
  description: string
  destination: string
  publishedDate?: string
  modifiedDate?: string
  author?: string
  image?: string
  mentions?: string[]
}): TravelGuide {
  return {
    '@type': 'Article',
    articleSection: 'Travel Guide',
    headline: guide.title,
    description: guide.description,
    about: {
      '@type': 'TouristDestination',
      name: guide.destination,
    },
    author: guide.author
      ? {
          '@type': 'Person',
          name: guide.author,
        }
      : {
          '@type': 'Organization',
          name: 'Next Trip Anywhere',
        },
    datePublished: guide.publishedDate || new Date().toISOString().split('T')[0],
    dateModified: guide.modifiedDate,
    image: guide.image
      ? {
          '@type': 'ImageObject',
          url: `https://nexttripanywhere.com${guide.image}`,
        }
      : undefined,
    mentions: guide.mentions?.map((place) => ({
      '@type': 'Place',
      name: place,
    })),
    spatialCoverage: {
      '@type': 'Place',
      name: guide.destination,
    },
  }
}

// Generate complete port/destination schema graph
export function generatePortSchemaGraph(options: {
  type: 'port' | 'destination' | 'attraction'
  name: string
  description: string
  location?: { city: string; state?: string; country: string }
  coordinates?: { lat: number; lng: number }
  amenities?: string[]
  transportOptions?: Array<{ type: string; provider?: string }>
  nearbyAttractions?: Array<{ name: string; description: string }>
  events?: Array<{ name: string; date: string }>
  rating?: { value: number; count: number }
}) {
  const schemas = []

  // Add main place schema based on type
  let mainSchema: Place | TouristDestination | CruiseTerminal

  switch (options.type) {
    case 'port':
      mainSchema = {
        '@type': 'CivicStructure',
        name: options.name,
        description: options.description,
        address: options.location
          ? {
              '@type': 'PostalAddress',
              addressLocality: options.location.city,
              addressRegion: options.location.state,
              addressCountry: options.location.country,
            }
          : {
              '@type': 'PostalAddress',
              addressLocality: '',
              addressCountry: '',
            },
      } as CruiseTerminal

      if (options.amenities) {
        mainSchema.amenityFeature = options.amenities.map((amenity) => ({
          '@type': 'LocationFeatureSpecification',
          name: amenity,
        }))
      }
      break

    case 'destination':
      mainSchema = generateDestinationSchema({
        name: options.name,
        description: options.description,
        country: options.location?.country,
        region: options.location?.state,
        coordinates: options.coordinates,
      })
      break

    case 'attraction':
      mainSchema = generateAttractionSchema({
        name: options.name,
        description: options.description,
        location: options.location?.city || '',
        rating: options.rating?.value,
        reviewCount: options.rating?.count,
      })
      break

    default:
      mainSchema = {
        '@type': 'Place',
        name: options.name,
        description: options.description,
      }
  }

  if (options.coordinates && mainSchema) {
    mainSchema.geo = {
      '@type': 'GeoCoordinates',
      latitude: options.coordinates.lat,
      longitude: options.coordinates.lng,
    }
  }

  if (options.rating && mainSchema) {
    mainSchema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: options.rating.value,
      reviewCount: options.rating.count,
      bestRating: 5,
      worstRating: 1,
    }
  }

  schemas.push(mainSchema)

  // Add transport services
  if (options.transportOptions) {
    options.transportOptions.forEach((transport) => {
      schemas.push({
        '@type': 'Service',
        serviceType: 'TransportService',
        name: `${transport.type} service to ${options.name}`,
        provider: transport.provider
          ? {
              '@type': 'Organization',
              name: transport.provider,
            }
          : undefined,
      })
    })
  }

  // Add nearby attractions
  if (options.nearbyAttractions) {
    options.nearbyAttractions.forEach((attraction) => {
      schemas.push({
        '@type': 'TouristAttraction',
        name: attraction.name,
        description: attraction.description,
        containedInPlace: mainSchema,
      })
    })
  }

  // Add events
  if (options.events) {
    options.events.forEach((event) => {
      schemas.push({
        '@type': 'Event',
        name: event.name,
        startDate: event.date,
        location: mainSchema,
      })
    })
  }

  // Add travel agency as service provider
  schemas.push({
    '@type': 'TravelAgency',
    name: 'Next Trip Anywhere',
    url: 'https://nexttripanywhere.com',
    telephone: '+1-833-874-1019',
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Essex County, New Jersey',
    },
  })

  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  }
}

// Export all types
export type {
  Place,
  TouristAttraction,
  TouristDestination,
  Airport,
  CruiseTerminal,
  LocalBusiness,
  PostalAddress,
  GeoCoordinates,
  ImageObject,
  OpeningHoursSpecification,
  LocationFeatureSpecification,
  Event,
  Person,
  Organization,
  PerformingGroup,
  Offer,
  EventStatusType,
  EventAttendanceModeEnumeration,
  Language,
  Audience,
  Photograph,
  Review,
  Rating,
  AggregateRating,
  PropertyValue,
  AdministrativeArea,
  OfferCatalog,
  Service,
  TransportService,
  Flight,
  BoardingPolicyType,
  TravelGuide,
}
