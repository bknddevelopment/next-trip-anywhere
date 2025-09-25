/**
 * Comparison Tool Type Definitions
 * Comprehensive types for cruise and destination comparison features
 */

import { CruiseLine } from '../data/cruise-lines'
import { Destination } from './destination'

// ============= Comparison Core Types =============

export interface ComparisonMetric {
  category: string
  label: string
  value: string | number | boolean
  unit?: string
  description?: string
  importance?: 'high' | 'medium' | 'low'
}

export interface ComparisonCategory {
  id: string
  name: string
  icon?: string
  metrics: ComparisonMetric[]
  weight?: number // For scoring
}

// ============= Cruise Line Comparison =============

export interface CruiseLineComparison {
  id: string
  cruiseLines: CruiseLine[]
  categories: CruiseComparisonCategory[]
  userPreferences?: UserPreferences
  score?: ComparisonScore[]
  createdAt: string
  updatedAt: string
}

export interface CruiseComparisonCategory extends ComparisonCategory {
  type: 'fleet' | 'destinations' | 'pricing' | 'dining' | 'entertainment' | 'amenities' | 'cabins' | 'loyalty' | 'departure'
}

export interface FleetComparison {
  totalShips: number
  averageAge: number
  newestShip: string
  largestShip: string
  smallestShip: string
  averageCapacity: number
}

export interface DiningComparison {
  mainDiningRooms: number
  specialtyRestaurants: number
  complimentaryOptions: number
  roomService24h: boolean
  dietaryOptions: string[]
  signatureDining: string[]
}

export interface EntertainmentComparison {
  shows: string[]
  activities: string[]
  kidsPrograms: boolean
  teenPrograms: boolean
  adultOnly: string[]
  casinos: boolean
  nightlife: string[]
}

// ============= Destination Comparison =============

export interface DestinationComparison {
  id: string
  destinations: Destination[]
  categories: DestinationComparisonCategory[]
  travelDates?: DateRange
  userPreferences?: UserPreferences
  recommendations?: Recommendation[]
  createdAt: string
  updatedAt: string
}

export interface DestinationComparisonCategory extends ComparisonCategory {
  type: 'travel' | 'weather' | 'activities' | 'budget' | 'safety' | 'culture' | 'accommodation' | 'timing'
}

export interface TravelMetrics {
  distanceFromNewark: number
  flightTime: number
  averageFlightCost: number
  directFlights: boolean
  airlines: string[]
  visaRequired: boolean
  bestAirport: string
}

export interface WeatherMetrics {
  averageTemp: {
    high: number
    low: number
  }
  rainyDays: number
  humidity: number
  hurricaneRisk: boolean
  bestMonths: number[]
  worstMonths: number[]
}

export interface BudgetMetrics {
  dailyBudget: {
    budget: number
    midRange: number
    luxury: number
  }
  mealCost: number
  transportCost: number
  attractionCost: number
  hotelCost: {
    budget: number
    midRange: number
    luxury: number
  }
}

// ============= Shore Excursions =============

export interface Excursion {
  id: string
  portId: string
  name: string
  description: string
  duration: number // minutes
  price: {
    adult: number
    child: number
    currency: string
  }
  difficulty: 'easy' | 'moderate' | 'challenging'
  activityType: 'sightseeing' | 'beach' | 'adventure' | 'cultural' | 'shopping' | 'food' | 'nature'
  includes: string[]
  excludes: string[]
  accessibility: AccessibilityInfo
  minimumAge?: number
  maximumGroupSize?: number
  availability: 'daily' | 'select-days' | 'seasonal'
  rating: number
  reviewCount: number
  photos: string[]
  meetingPoint: string
  operator: string
  shipExcursion: boolean
}

export interface ExcursionPlan {
  cruiseItinerary: CruiseItinerary
  selectedExcursions: Excursion[]
  totalCost: number
  totalDuration: number
  conflicts: ConflictInfo[]
  recommendations: Excursion[]
}

export interface CruiseItinerary {
  cruiseLineId: string
  shipName: string
  ports: Port[]
  embarkation: Port
  disembarkation: Port
  seaDays: number
  totalDays: number
}

export interface Port {
  id: string
  name: string
  country: string
  arrivalTime: string
  departureTime: string
  allAboardTime: string
  excursions: Excursion[]
  distance: number // from port to city center
  transportation: string[]
  highlights: string[]
}

// ============= Visa & Documentation =============

export interface VisaRequirement {
  destinationId: string
  destinationName: string
  citizenship: string
  visaRequired: boolean
  visaType?: string
  visaOnArrival?: boolean
  eVisa?: boolean
  duration: number // days allowed
  processingTime: number // days
  cost: number
  documents: string[]
  validityRequired: number // months passport validity needed
  blankPagesRequired: number
  vaccinations: Vaccination[]
  travelInsurance: boolean
  additionalRequirements: string[]
  applicationUrl?: string
  notes?: string
}

export interface Vaccination {
  name: string
  required: boolean
  recommended: boolean
  description: string
}

export interface DocumentChecklist {
  passport: {
    valid: boolean
    expiryDate: string
    validityMonths: number
  }
  visa: VisaRequirement[]
  vaccinations: Vaccination[]
  insurance: {
    required: boolean
    minimumCoverage?: number
    covidCoverage?: boolean
  }
  additionalDocs: string[]
  reminders: Reminder[]
}

// ============= Currency =============

export interface CurrencyRate {
  code: string
  name: string
  symbol: string
  rateToUSD: number
  lastUpdated: string
  country: string
  commonly_used: boolean
}

export interface CurrencyConversion {
  from: CurrencyRate
  to: CurrencyRate
  amount: number
  converted: number
  fee?: number
  total: number
  timestamp: string
}

export interface TippingGuide {
  country: string
  currency: string
  restaurant: {
    percentage: number
    included: boolean
    notes?: string
  }
  hotel: {
    housekeeping: number
    bellhop: number
    concierge: number
  }
  taxi: {
    percentage: number
    roundUp: boolean
  }
  tour: {
    guide: number
    driver: number
  }
  spa: {
    percentage: number
  }
  custom?: Record<string, number | string>
}

// ============= Weather Planning =============

export interface WeatherData {
  destinationId: string
  month: number
  temperature: {
    high: number
    low: number
    average: number
  }
  precipitation: number
  rainyDays: number
  humidity: number
  windSpeed: number
  seaTemperature?: number
  uvIndex: number
  hurricaneRisk: boolean
  packingList: string[]
  activities: {
    recommended: string[]
    notRecommended: string[]
  }
}

export interface SeasonalPricing {
  destinationId: string
  month: number
  season: 'peak' | 'shoulder' | 'low'
  priceMultiplier: number
  crowds: 'heavy' | 'moderate' | 'light'
  events: string[]
  pros: string[]
  cons: string[]
}

// ============= User Preferences =============

export interface UserPreferences {
  budget: 'budget' | 'moderate' | 'luxury' | 'ultra-luxury'
  travelStyle: ('adventure' | 'relaxation' | 'cultural' | 'family' | 'romantic' | 'party')[]
  interests: string[]
  accessibility: AccessibilityNeeds
  dietaryRestrictions: string[]
  groupSize: number
  ageRanges: AgeRange[]
  departureLocation: string
  flexibleDates: boolean
  duration: {
    min: number
    max: number
    ideal: number
  }
}

export interface AccessibilityNeeds {
  wheelchairAccessible: boolean
  mobilityAssistance: boolean
  visualAssistance: boolean
  hearingAssistance: boolean
  dietaryNeeds: string[]
  medicalNeeds: string[]
}

export interface AccessibilityInfo {
  wheelchairAccessible: boolean
  mobilityLevel: 'easy' | 'moderate' | 'difficult'
  walkingDistance: number // meters
  stairs: boolean
  uneven_terrain: boolean
  restrooms: boolean
  assistance_available: boolean
}

export interface AgeRange {
  min: number
  max: number
  count: number
}

// ============= Analytics & Tracking =============

export interface ToolUsageMetrics {
  toolId: string
  toolName: string
  usageCount: number
  completionRate: number
  averageTimeSpent: number
  popularComparisons: PopularComparison[]
  conversionRate: number
  leadGeneration: number
  userFeedback: UserFeedback[]
}

export interface PopularComparison {
  items: string[]
  count: number
  lastUsed: string
}

export interface UserFeedback {
  rating: number
  comment?: string
  timestamp: string
  helpful: boolean
}

// ============= Supporting Types =============

export interface DateRange {
  start: string
  end: string
}

export interface ComparisonScore {
  itemId: string
  totalScore: number
  categoryScores: Record<string, number>
  rank: number
  recommendation: string
}

export interface Recommendation {
  itemId: string
  reason: string
  score: number
  pros: string[]
  cons: string[]
  bestFor: string[]
}

export interface ConflictInfo {
  type: 'timing' | 'location' | 'capacity' | 'age' | 'accessibility'
  description: string
  severity: 'warning' | 'error'
  resolution?: string
}

export interface Reminder {
  id: string
  type: 'document' | 'booking' | 'payment' | 'medical'
  title: string
  description: string
  dueDate: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
}

// ============= Export Formats =============

export interface ComparisonExport {
  format: 'pdf' | 'image' | 'csv' | 'json'
  data: any
  metadata: {
    created: string
    title: string
    description?: string
  }
}

export interface ShareableComparison {
  id: string
  shortUrl: string
  fullUrl: string
  expiresAt?: string
  password?: string
  views: number
  maxViews?: number
}