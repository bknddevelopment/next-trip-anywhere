/**
 * @fileoverview TypeScript interfaces and types for destination data structures
 * @module types/destination
 *
 * This module defines the core data structures for destination pages,
 * including all necessary fields for SEO, content, and media management.
 */

/**
 * Destination region/continent
 */
export type DestinationRegion =
  | 'north-america'
  | 'south-america'
  | 'europe'
  | 'asia'
  | 'africa'
  | 'oceania'
  | 'caribbean'
  | 'middle-east'

/**
 * Destination category/type
 */
export type DestinationCategory =
  | 'beach'
  | 'city'
  | 'mountain'
  | 'adventure'
  | 'cultural'
  | 'island'
  | 'desert'
  | 'forest'
  | 'luxury'
  | 'budget'
  | 'nightlife'
  | 'shopping'

/**
 * Season/best time to visit
 */
export type TravelSeason = 'spring' | 'summer' | 'autumn' | 'winter' | 'year-round'

/**
 * Price range indicators
 */
export type PriceRange = '$' | '$$' | '$$$' | '$$$$'

/**
 * Activity types available at destination
 */
export type DestinationActivity = {
  name: string
  category: 'adventure' | 'cultural' | 'relaxation' | 'nightlife' | 'shopping' | 'dining' | 'nature'
  description?: string
  priceRange?: PriceRange
  duration?: string // e.g., "2-3 hours"
  bestTime?: string
}

/**
 * Climate information
 */
export interface ClimateInfo {
  temperature: {
    summer: { min: number; max: number } // in Celsius
    winter: { min: number; max: number }
  }
  rainyMonths?: string[]
  humidity?: 'low' | 'moderate' | 'high'
  description?: string
}

/**
 * Travel requirements
 */
export interface TravelRequirements {
  visa: {
    required: boolean
    onArrival?: boolean
    details?: string
  }
  onArrival?: boolean
  vaccinations?: string[]
  currency: {
    code: string
    name: string
    exchangeRate?: number // to USD
  }
  language: string[]
  timezone: string
  electricalOutlet?: string
  drivingSide?: 'left' | 'right'
}

/**
 * Transportation options
 */
export interface TransportationOptions {
  fromAirport: string[]
  local: string[]
  intercity?: string[]
  rentalOptions?: string[]
}

/**
 * Seasonal climate for new structure
 */
export interface SeasonalClimate {
  season: 'spring' | 'summer' | 'fall' | 'winter'
  temperatureRange: {
    min: number // in Fahrenheit
    max: number // in Fahrenheit
  }
  description: string
  rainfall?: number // in inches per month
}

/**
 * Media asset for destinations
 */
export interface MediaAsset {
  url: string
  alt: string
  caption?: string
  width?: number
  height?: number
  type: 'image' | 'video'
  priority?: 'high' | 'medium' | 'low'
}

/**
 * Travel option from a US city
 */
export interface TravelOption {
  fromCity: string
  averageFlightTime: string
  averagePrice: {
    economy: number
    business?: number
  }
  airlines: string[]
  directFlights: boolean
}

/**
 * Popular attraction
 */
export interface Attraction {
  name: string
  description: string
  category: 'landmark' | 'museum' | 'nature' | 'entertainment' | 'dining' | 'shopping' | 'adventure'
  price?: string
  duration?: string
  bestTimeToVisit?: string
  image?: MediaAsset
  bookingUrl?: string
  rating?: number
}

/**
 * Accommodation option
 */
export interface Accommodation {
  name: string
  type: 'hotel' | 'resort' | 'vacation-rental' | 'hostel' | 'boutique'
  starRating?: number
  priceRange: string
  location: string
  amenities: string[]
  bookingUrl?: string
  image?: MediaAsset
  description?: string
}

/**
 * Travel package
 */
export interface TravelPackage {
  id: string
  name: string
  duration: string
  price: {
    perPerson: number
    currency: string
  }
  includes: string[]
  highlights: string[]
  image?: MediaAsset
  availability?: string
  bookingUrl?: string
}

/**
 * FAQ item
 */
export interface FAQ {
  question: string
  answer: string
  category?: string
}

/**
 * Travel tips and practical information
 */
export interface TravelTips {
  bestTimeToVisit: string
  currency: string
  language: string[]
  timezone: string
  visaRequirements: string
  healthAndSafety: string[]
  localCustoms?: string[]
  transportation: {
    local: string[]
    fromAirport: string[]
  }
  powerOutlets?: string
  tipping?: string
}

/**
 * SEO metadata
 */
export interface DestinationSEO {
  title: string
  description: string
  keywords: string[]
  canonicalUrl?: string
  ogImage?: string
  structuredData?: Record<string, any>
}

/**
 * Main Destination interface - Extended version for new features
 */
export interface Destination {
  // Core identification
  id: string
  slug: string
  name: string
  country: string
  region?: DestinationRegion | string

  // Location data
  coordinates: {
    latitude: number
    longitude: number
  }
  nearestAirports:
    | Array<{
        code: string
        name: string
        distance: string
      }>
    | string[]

  // Content
  description: string
  shortDescription: string
  longDescription?: string
  highlights?: string[]

  // Media
  images?: {
    hero: string
    thumbnail: string
    gallery?: string[]
  }
  heroImage?: MediaAsset
  gallery?: MediaAsset[]
  videoUrl?: string

  // Climate and seasons
  climate?: SeasonalClimate[] | ClimateInfo

  // Travel logistics
  travelOptions?: TravelOption[]
  averageStayDuration: string

  // Things to do
  topAttractions?: string[]
  attractions?: Attraction[]
  activities?: DestinationActivity[] | string[]

  // Accommodation
  accommodations?: Accommodation[]

  // Packages
  packages?: TravelPackage[] | string[]

  // Practical info
  travelTips?: TravelTips
  travelRequirements?: TravelRequirements
  transportation?: TransportationOptions

  // FAQs
  faqs?: FAQ[]

  // SEO
  seo?: DestinationSEO
  seoTitle?: string
  seoDescription?: string
  keywords?: string[]

  // Metadata
  featured?: boolean
  popularity?: number
  viewCount?: number
  bookingCount?: number
  rating?: number
  reviewCount?: number
  tags?: string[]
  categories?: DestinationCategory[]
  priceRange?: PriceRange
  bestTimeToVisit?: TravelSeason[]

  // Dates
  lastUpdated?: string
  publishedAt?: string
  createdAt?: string
  updatedAt?: string
  lastModified?: string

  // Status
  status?: 'draft' | 'published' | 'archived'
  published?: boolean

  // Related content
  relatedDestinations?: string[] | DestinationSummary[]
}

/**
 * Simplified destination for lists/cards
 */
export interface DestinationSummary {
  id: string
  slug: string
  name: string
  country: string
  region?: DestinationRegion | string
  shortDescription: string
  thumbnail?: string
  heroImage?: MediaAsset
  priceRange?: PriceRange
  rating?: number
  featured?: boolean
  categories?: DestinationCategory[]
  popularity?: number
  tags?: string[]
  packages?: number
  startingPrice?: number
}

/**
 * Destination list item (alias for DestinationSummary)
 */
export type DestinationListItem = DestinationSummary

/**
 * API response types
 */
export interface DestinationResponse {
  destination: Destination
  relatedDestinations?: DestinationSummary[]
}

export interface DestinationsListResponse {
  destinations: DestinationSummary[]
  total: number
  page: number
  perPage: number
  totalPages: number
}

export interface PopularDestinationsResponse {
  destinations: DestinationSummary[]
  total: number
}

export interface SearchResponse {
  success?: boolean
  results: DestinationSummary[]
  total: number
  query: string
}

export interface RegionsResponse {
  regions: Array<{
    id: string
    name: string
    destinationCount: number
    popularDestinations: DestinationSummary[]
  }>
}

/**
 * API query types
 */
export interface ListDestinationsQuery {
  page?: string
  perPage?: string
  limit?: string
  region?: string
  country?: string
  category?: string
  priceRange?: string
  featured?: string
  tags?: string
  sortBy?: string
  order?: string
  search?: string
}

export interface PopularDestinationsQuery {
  limit?: string
  period?: 'week' | 'month' | 'year' | 'all'
  basedOn?: 'views' | 'bookings'
  region?: string
}

export interface SearchDestinationsQuery {
  q: string
  limit?: string
  region?: string
  fuzzy?: string
}

/**
 * API error codes
 */
export enum ApiErrorCode {
  DESTINATION_NOT_FOUND = 'DESTINATION_NOT_FOUND',
  INVALID_PARAMETERS = 'INVALID_PARAMETERS',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  NOT_FOUND = 'NOT_FOUND',
}

/**
 * Filter options
 */
export interface DestinationFilters {
  region?: string
  country?: string
  priceRange?: {
    min: number
    max: number
  }
  activities?: string[]
  duration?: string
  featured?: boolean
  tags?: string[]
  categories?: DestinationCategory[]
  sortBy?: 'popularity' | 'price' | 'name' | 'date' | 'rating' | 'views' | 'bookings'
  order?: 'asc' | 'desc'
}

/**
 * Search parameters
 */
export interface DestinationSearchParams {
  query?: string
  filters?: DestinationFilters
  page?: number
  perPage?: number
}

/**
 * Generic API Response wrapper
 */
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    code: ApiErrorCode
    message: string
    details?: any
  }
  metadata?: {
    timestamp: string
    requestId?: string
  }
  meta?: any
}

/**
 * Rate limit configuration
 */
export interface RateLimitConfig {
  windowMs: number
  maxRequests: number
  message?: string
}

/**
 * Cache configuration
 */
export interface CacheConfig {
  ttl: number // Time to live in seconds
  key?: string
  revalidate?: boolean
  staleWhileRevalidate?: number
}

/**
 * Search result
 */
export interface DestinationSearchResult {
  id: string
  slug: string
  name: string
  country: string
  region?: DestinationRegion | string
  shortDescription: string
  matchScore: number
  matchType?: 'exact' | 'partial' | 'fuzzy'
  score?: number
  highlights?: string[]
  highlight?: {
    name?: string
    country?: string
    description?: string
  }
}

/**
 * Region information
 */
export interface Region {
  id: DestinationRegion | string
  name: string
  description: string
  destinationCount: number
  popularDestinations: string[]
  image?: string
}

/**
 * Type guards for runtime validation
 */
export const isDestination = (obj: any): obj is Destination => {
  if (!obj || typeof obj !== 'object') {
    return false
  }
  if (!obj.coordinates || typeof obj.coordinates !== 'object') {
    return false
  }

  return (
    typeof obj.id === 'string' &&
    typeof obj.slug === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.country === 'string' &&
    typeof obj.coordinates.latitude === 'number' &&
    typeof obj.coordinates.longitude === 'number'
  )
}

export const isDestinationListItem = (obj: any): obj is DestinationListItem => {
  if (!obj || typeof obj !== 'object') {
    return false
  }

  return (
    typeof obj.id === 'string' &&
    typeof obj.slug === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.country === 'string'
  )
}
