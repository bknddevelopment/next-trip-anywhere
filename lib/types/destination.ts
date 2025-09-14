/**
 * Travel Destination Database Schema
 * Comprehensive type definitions for destination data management
 */

// ============= Core Enums =============

export enum DestinationStatus {
  ACTIVE = 'active',
  DRAFT = 'draft',
  ARCHIVED = 'archived',
  SEASONAL = 'seasonal',
}

export enum DestinationType {
  CITY = 'city',
  BEACH = 'beach',
  MOUNTAIN = 'mountain',
  ISLAND = 'island',
  COUNTRYSIDE = 'countryside',
  DESERT = 'desert',
  CULTURAL = 'cultural',
  ADVENTURE = 'adventure',
}

export enum BudgetLevel {
  BUDGET = 'budget',
  MID_RANGE = 'mid_range',
  LUXURY = 'luxury',
  ULTRA_LUXURY = 'ultra_luxury',
}

export enum Season {
  SPRING = 'spring',
  SUMMER = 'summer',
  FALL = 'fall',
  WINTER = 'winter',
  YEAR_ROUND = 'year_round',
}

export enum ClimateType {
  TROPICAL = 'tropical',
  TEMPERATE = 'temperate',
  MEDITERRANEAN = 'mediterranean',
  CONTINENTAL = 'continental',
  POLAR = 'polar',
  DESERT = 'desert',
  MONSOON = 'monsoon',
}

// ============= Supporting Types =============

export interface Coordinates {
  latitude: number
  longitude: number
  altitude?: number // meters above sea level
}

export interface PriceRange {
  min: number
  max: number
  currency: string
  period?: 'daily' | 'weekly' | 'total'
}

export interface CostBreakdown {
  accommodation: PriceRange
  meals: PriceRange
  transportation: PriceRange
  activities: PriceRange
  miscellaneous: PriceRange
  total: PriceRange
}

export interface WeatherData {
  season: Season
  temperatureRange: {
    min: number // Celsius
    max: number
    average: number
  }
  precipitation: number // mm per month
  humidity: number // percentage
  description: string
  packingTips: string[]
}

export interface Image {
  id: string
  url: string
  thumbnailUrl?: string
  alt: string
  caption?: string
  credit?: string
  isPrimary: boolean
  order: number
  width?: number
  height?: number
  tags?: string[]
}

export interface SEOData {
  metaTitle: string
  metaDescription: string
  keywords: string[]
  canonicalUrl?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  structuredData?: Record<string, any>
}

export interface Translation {
  locale: string
  name: string
  description: string
  highlights: string[]
  travelTips?: string[]
}

// ============= Main Entities =============

export interface Destination {
  // Primary identifiers
  id: string
  slug: string
  status: DestinationStatus

  // Basic information
  name: string
  alternativeNames?: string[]
  type: DestinationType[]

  // Location details
  country: string
  countryCode: string // ISO 3166-1 alpha-2
  region: string
  subRegion?: string
  continent: string
  coordinates: Coordinates
  timezone: string

  // Descriptions
  shortDescription: string // 160 chars for meta
  description: string // Full description
  highlights: string[]
  uniqueSellingPoints: string[]

  // Travel information
  bestTimeToVisit: {
    months: number[] // 1-12
    description: string
    events?: string[]
  }
  avoidMonths?: {
    months: number[]
    reasons: string[]
  }
  recommendedDuration: {
    min: number // days
    max: number
    ideal: number
  }

  // Costs
  budgetLevels: {
    [key in BudgetLevel]?: CostBreakdown
  }

  // Climate & Weather
  climate: ClimateType
  weatherByMonth: WeatherData[]

  // Access & Transportation
  nearestAirports: Airport[]
  localTransportation: Transportation[]
  visaRequirements?: VisaInfo

  // Media
  images: Image[]
  videos?: VideoContent[]
  virtualTours?: string[]

  // Attractions & Activities
  attractions: Attraction[]
  activities: Activity[]

  // Practical Information
  languages: string[]
  currency: CurrencyInfo
  electricityInfo?: ElectricityInfo
  healthAndSafety?: HealthSafetyInfo

  // Cultural Information
  culturalNotes?: string[]
  etiquetteTips?: string[]
  localCuisine?: string[]

  // Relationships
  nearbyDestinations?: string[] // IDs of related destinations
  similarDestinations?: string[] // IDs for "you might also like"
  parentDestination?: string // For sub-destinations (e.g., neighborhood in a city)
  childDestinations?: string[] // Sub-areas within this destination

  // SEO & Marketing
  seo: SEOData
  tags: string[]
  popularityScore: number // 0-100 for sorting
  featured: boolean

  // Internationalization
  translations?: Translation[]

  // Metadata
  createdAt: string // ISO date
  updatedAt: string
  publishedAt?: string
  lastReviewedAt?: string
  createdBy?: string
  updatedBy?: string

  // Analytics
  viewCount?: number
  bookingCount?: number
  averageRating?: number
  reviewCount?: number
}

export interface Airport {
  code: string // IATA code
  name: string
  distance: number // km from destination
  transportOptions: string[]
  averageTransferTime: number // minutes
  coordinates?: Coordinates
}

export interface Transportation {
  type: 'taxi' | 'uber' | 'bus' | 'metro' | 'train' | 'ferry' | 'rental_car' | 'bike' | 'walk'
  name?: string
  description: string
  averageCost?: PriceRange
  availability: string
  bookingRequired: boolean
  bookingUrl?: string
}

export interface VisaInfo {
  required: boolean
  type?: string
  duration?: number // days
  cost?: number
  processTime?: string
  description: string
  exemptCountries?: string[]
  url?: string
}

export interface CurrencyInfo {
  code: string // ISO 4217
  name: string
  symbol: string
  exchangeRateToUSD?: number
  acceptedPaymentMethods: string[]
  atmAvailability: string
  tippingCulture?: string
}

export interface ElectricityInfo {
  voltage: number
  frequency: number // Hz
  plugTypes: string[]
  adapterNeeded: boolean
  description?: string
}

export interface HealthSafetyInfo {
  vaccinations?: string[]
  healthRisks?: string[]
  emergencyNumbers: {
    police?: string
    medical?: string
    fire?: string
    tourist?: string
  }
  safetyRating: number // 1-5
  safetyNotes?: string[]
  travelInsuranceRecommended: boolean
}

export interface VideoContent {
  id: string
  title: string
  url: string
  platform: 'youtube' | 'vimeo' | 'custom'
  duration?: number // seconds
  thumbnail?: string
  description?: string
}

// ============= Related Entities =============

export interface Attraction {
  id: string
  destinationId: string
  name: string
  slug: string
  type:
    | 'landmark'
    | 'museum'
    | 'park'
    | 'beach'
    | 'historical'
    | 'entertainment'
    | 'shopping'
    | 'religious'
  description: string
  coordinates?: Coordinates
  address?: string

  openingHours?: {
    [key: string]: string // day: hours
  }
  admission?: {
    adult?: number
    child?: number
    senior?: number
    currency: string
    freeForChildren?: boolean
    description?: string
  }

  duration?: number // recommended visit time in minutes
  bestTimeToVisit?: string

  images?: Image[]
  website?: string
  phone?: string
  email?: string

  rating?: number
  reviewCount?: number
  popularity?: number // for sorting

  accessibility?: {
    wheelchairAccessible: boolean
    audioGuide: boolean
    brailleAvailable: boolean
    notes?: string
  }

  tags: string[]
  mustSee: boolean
  familyFriendly: boolean

  createdAt: string
  updatedAt: string
}

export interface Activity {
  id: string
  destinationId: string
  name: string
  slug: string
  category:
    | 'adventure'
    | 'cultural'
    | 'relaxation'
    | 'food'
    | 'nightlife'
    | 'sports'
    | 'nature'
    | 'shopping'
  description: string

  duration: {
    min: number // hours
    max: number
    typical: number
  }

  priceRange?: PriceRange
  groupSize?: {
    min: number
    max: number
  }

  ageRestrictions?: {
    min?: number
    max?: number
  }

  difficultyLevel?: 'easy' | 'moderate' | 'challenging' | 'extreme'
  fitnessLevel?: 'low' | 'moderate' | 'high'

  includedItems?: string[]
  excludedItems?: string[]
  requirements?: string[]

  availability?: {
    seasonal: boolean
    months?: number[]
    daysOfWeek?: number[] // 0-6
    weatherDependent: boolean
  }

  bookingInfo?: {
    required: boolean
    advanceBookingDays?: number
    cancellationPolicy?: string
    url?: string
    phone?: string
    email?: string
  }

  images?: Image[]

  rating?: number
  reviewCount?: number
  popularity?: number

  tags: string[]
  familyFriendly: boolean

  createdAt: string
  updatedAt: string
}

// ============= Collection Types =============

export interface DestinationCollection {
  destinations: Destination[]
  total: number
  page?: number
  perPage?: number
  hasMore?: boolean
}

export interface DestinationFilters {
  type?: DestinationType[]
  continent?: string[]
  country?: string[]
  climate?: ClimateType[]
  budgetLevel?: BudgetLevel[]
  bestTimeToVisit?: number[] // months
  minDuration?: number
  maxDuration?: number
  tags?: string[]
  featured?: boolean
  status?: DestinationStatus
  searchQuery?: string
}

export interface DestinationSortOptions {
  field: 'name' | 'popularity' | 'rating' | 'price' | 'createdAt' | 'updatedAt'
  direction: 'asc' | 'desc'
}

// ============= Query Helpers =============

export interface DestinationQueryOptions {
  filters?: DestinationFilters
  sort?: DestinationSortOptions
  pagination?: {
    page: number
    perPage: number
  }
  include?: Array<'attractions' | 'activities' | 'images' | 'reviews'>
  locale?: string
}

// ============= Cache Types =============

export interface CachedDestination {
  data: Destination
  timestamp: number
  ttl: number // seconds
  etag?: string
}

// ============= Analytics Types =============

export interface DestinationAnalytics {
  destinationId: string
  period: 'day' | 'week' | 'month' | 'year'
  startDate: string
  endDate: string
  metrics: {
    views: number
    uniqueViews: number
    bookingClicks: number
    averageTimeOnPage: number
    bounceRate: number
    conversionRate: number
  }
  topReferrers: Array<{
    source: string
    count: number
  }>
  deviceBreakdown: {
    mobile: number
    desktop: number
    tablet: number
  }
}
