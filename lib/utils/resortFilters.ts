/**
 * Resort Filtering and Sorting Utilities
 *
 * Provides comprehensive filtering, sorting, and URL parameter management
 * for the all-inclusive resorts database. Supports multiple filter criteria
 * and maintains filter state through URL parameters.
 */

import { Resort } from '@/lib/data/all-inclusive-resorts'

export interface ResortFilters {
  destinations: string[]
  categories: Resort['category'][]
  priceMin: number
  priceMax: number
  rating: number | null
  amenities: string[]
  flightTime: number | null
  beachfront: boolean | null
  sortBy: SortOption
  searchQuery: string
}

export type SortOption =
  | 'price-low'
  | 'price-high'
  | 'rating-high'
  | 'rating-low'
  | 'name-asc'
  | 'name-desc'
  | 'flight-time'
  | 'reviews'

export const DEFAULT_FILTERS: ResortFilters = {
  destinations: [],
  categories: [],
  priceMin: 500,
  priceMax: 10000,
  rating: null,
  amenities: [],
  flightTime: null,
  beachfront: null,
  sortBy: 'rating-high',
  searchQuery: '',
}

// Common amenities for filtering
export const AMENITY_OPTIONS = [
  'Kids Club',
  'Adults Only',
  'Water Park',
  'Spa',
  'Casino',
  'Golf Course',
  'Scuba Diving',
  'Tennis',
  'Fitness Center',
  'Water Sports',
  'Entertainment',
  'Room Service',
  'Butler Service',
  'Private Island',
  'Swim-Out Suites',
]

// Category display names
export const CATEGORY_LABELS: Record<Resort['category'], string> = {
  'adults-only': 'Adults Only',
  family: 'Family Friendly',
  luxury: 'Luxury',
  budget: 'Budget Friendly',
  party: 'Party & Nightlife',
  romantic: 'Romantic',
}

// Sort option display names
export const SORT_LABELS: Record<SortOption, string> = {
  'price-low': 'Price: Low to High',
  'price-high': 'Price: High to Low',
  'rating-high': 'Rating: High to Low',
  'rating-low': 'Rating: Low to High',
  'name-asc': 'Name: A to Z',
  'name-desc': 'Name: Z to A',
  'flight-time': 'Flight Time: Shortest',
  reviews: 'Most Reviews',
}

/**
 * Apply filters to resort list
 */
export function filterResorts(resorts: Resort[], filters: ResortFilters): Resort[] {
  let filtered = [...resorts]

  // Filter by destinations
  if (filters.destinations.length > 0) {
    filtered = filtered.filter((resort) => filters.destinations.includes(resort.destination))
  }

  // Filter by categories
  if (filters.categories.length > 0) {
    filtered = filtered.filter((resort) => filters.categories.includes(resort.category))
  }

  // Filter by price range
  filtered = filtered.filter(
    (resort) =>
      resort.priceRange.min >= filters.priceMin && resort.priceRange.min <= filters.priceMax
  )

  // Filter by minimum rating
  if (filters.rating !== null && filters.rating !== undefined) {
    filtered = filtered.filter((resort) => resort.rating >= filters.rating!)
  }

  // Filter by amenities
  if (filters.amenities.length > 0) {
    filtered = filtered.filter((resort) =>
      filters.amenities.every((amenity) => resort.amenities.includes(amenity))
    )
  }

  // Filter by max flight time
  if (filters.flightTime !== null && filters.flightTime !== undefined) {
    filtered = filtered.filter((resort) => resort.flightTime <= filters.flightTime!)
  }

  // Filter by beachfront
  if (filters.beachfront !== null) {
    filtered = filtered.filter((resort) => resort.beachfront === filters.beachfront)
  }

  // Filter by search query
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase()
    filtered = filtered.filter(
      (resort) =>
        resort.name.toLowerCase().includes(query) ||
        resort.destination.toLowerCase().includes(query) ||
        resort.location.toLowerCase().includes(query) ||
        resort.description.toLowerCase().includes(query) ||
        resort.brand?.toLowerCase().includes(query)
    )
  }

  return filtered
}

/**
 * Sort resorts by selected option
 */
export function sortResorts(resorts: Resort[], sortBy: SortOption): Resort[] {
  const sorted = [...resorts]

  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.priceRange.min - b.priceRange.min)

    case 'price-high':
      return sorted.sort((a, b) => b.priceRange.max - a.priceRange.max)

    case 'rating-high':
      return sorted.sort((a, b) => {
        // First sort by star rating, then by review score
        if (b.rating !== a.rating) {
          return b.rating - a.rating
        }
        return b.reviewScore - a.reviewScore
      })

    case 'rating-low':
      return sorted.sort((a, b) => {
        if (a.rating !== b.rating) {
          return a.rating - b.rating
        }
        return a.reviewScore - b.reviewScore
      })

    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))

    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name))

    case 'flight-time':
      return sorted.sort((a, b) => a.flightTime - b.flightTime)

    case 'reviews':
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount)

    default:
      return sorted
  }
}

/**
 * Parse URL search params into filter object
 */
export function parseFilterParams(searchParams: URLSearchParams): Partial<ResortFilters> {
  const filters: Partial<ResortFilters> = {}

  // Parse destinations (comma-separated)
  const destinations = searchParams.get('destinations')
  if (destinations) {
    filters.destinations = destinations.split(',').filter(Boolean)
  }

  // Parse categories (comma-separated)
  const categories = searchParams.get('categories')
  if (categories) {
    filters.categories = categories.split(',').filter(Boolean) as Resort['category'][]
  }

  // Parse price range
  const priceMin = searchParams.get('priceMin')
  if (priceMin) {
    filters.priceMin = parseInt(priceMin, 10)
  }

  const priceMax = searchParams.get('priceMax')
  if (priceMax) {
    filters.priceMax = parseInt(priceMax, 10)
  }

  // Parse rating
  const rating = searchParams.get('rating')
  if (rating) {
    filters.rating = parseFloat(rating)
  }

  // Parse amenities (comma-separated)
  const amenities = searchParams.get('amenities')
  if (amenities) {
    filters.amenities = amenities.split(',').filter(Boolean)
  }

  // Parse flight time
  const flightTime = searchParams.get('flightTime')
  if (flightTime) {
    filters.flightTime = parseFloat(flightTime)
  }

  // Parse beachfront
  const beachfront = searchParams.get('beachfront')
  if (beachfront) {
    filters.beachfront = beachfront === 'true'
  }

  // Parse sort
  const sortBy = searchParams.get('sortBy')
  if (sortBy && isValidSortOption(sortBy)) {
    filters.sortBy = sortBy as SortOption
  }

  // Parse search query
  const search = searchParams.get('search')
  if (search) {
    filters.searchQuery = search
  }

  return filters
}

/**
 * Convert filter object to URL search params
 */
export function filtersToParams(filters: Partial<ResortFilters>): URLSearchParams {
  const params = new URLSearchParams()

  if (filters.destinations?.length) {
    params.set('destinations', filters.destinations.join(','))
  }

  if (filters.categories?.length) {
    params.set('categories', filters.categories.join(','))
  }

  if (filters.priceMin !== undefined && filters.priceMin !== DEFAULT_FILTERS.priceMin) {
    params.set('priceMin', filters.priceMin.toString())
  }

  if (filters.priceMax !== undefined && filters.priceMax !== DEFAULT_FILTERS.priceMax) {
    params.set('priceMax', filters.priceMax.toString())
  }

  if (filters.rating !== null && filters.rating !== undefined) {
    params.set('rating', filters.rating.toString())
  }

  if (filters.amenities?.length) {
    params.set('amenities', filters.amenities.join(','))
  }

  if (filters.flightTime !== null && filters.flightTime !== undefined) {
    params.set('flightTime', filters.flightTime.toString())
  }

  if (filters.beachfront !== null && filters.beachfront !== undefined) {
    params.set('beachfront', filters.beachfront.toString())
  }

  if (filters.sortBy && filters.sortBy !== DEFAULT_FILTERS.sortBy) {
    params.set('sortBy', filters.sortBy)
  }

  if (filters.searchQuery) {
    params.set('search', filters.searchQuery)
  }

  return params
}

/**
 * Check if string is valid sort option
 */
function isValidSortOption(value: string): value is SortOption {
  return [
    'price-low',
    'price-high',
    'rating-high',
    'rating-low',
    'name-asc',
    'name-desc',
    'flight-time',
    'reviews',
  ].includes(value)
}

/**
 * Get filter statistics for display
 */
export function getFilterStats(
  resorts: Resort[],
  filtered: Resort[]
): {
  totalResults: number
  priceRange: { min: number; max: number }
  destinations: Map<string, number>
  categories: Map<Resort['category'], number>
  avgRating: number
  avgFlightTime: number
} {
  const stats = {
    totalResults: filtered.length,
    priceRange: {
      min: Math.min(...filtered.map((r) => r.priceRange.min)),
      max: Math.max(...filtered.map((r) => r.priceRange.max)),
    },
    destinations: new Map<string, number>(),
    categories: new Map<Resort['category'], number>(),
    avgRating: 0,
    avgFlightTime: 0,
  }

  // Count destinations
  resorts.forEach((resort) => {
    const count = stats.destinations.get(resort.destination) || 0
    stats.destinations.set(resort.destination, count + 1)
  })

  // Count categories
  resorts.forEach((resort) => {
    const count = stats.categories.get(resort.category) || 0
    stats.categories.set(resort.category, count + 1)
  })

  // Calculate averages
  if (filtered.length > 0) {
    stats.avgRating = filtered.reduce((sum, r) => sum + r.rating, 0) / filtered.length
    stats.avgFlightTime = filtered.reduce((sum, r) => sum + r.flightTime, 0) / filtered.length
  }

  return stats
}

/**
 * Group resorts by destination for display
 */
export function groupResortsByDestination(resorts: Resort[]): Map<string, Resort[]> {
  const grouped = new Map<string, Resort[]>()

  resorts.forEach((resort) => {
    const list = grouped.get(resort.destination) || []
    list.push(resort)
    grouped.set(resort.destination, list)
  })

  return grouped
}

/**
 * Calculate price per night from per person price
 */
export function calculatePricePerNight(perPersonPrice: number, nights: number = 7): number {
  return Math.round(perPersonPrice / nights)
}

/**
 * Format price range for display
 */
export function formatPriceRange(resort: Resort, nights: number = 7): string {
  const minPerNight = calculatePricePerNight(resort.priceRange.min, nights)
  const maxPerNight = calculatePricePerNight(resort.priceRange.max, nights)
  return `$${minPerNight}-$${maxPerNight}/night`
}

/**
 * Get resort recommendations based on user preferences
 */
export function getRecommendations(
  resorts: Resort[],
  preferences: {
    budget?: 'budget' | 'moderate' | 'luxury'
    travelStyle?: 'family' | 'couples' | 'party' | 'relaxation'
    flightTime?: 'short' | 'medium' | 'any'
  }
): Resort[] {
  let recommended = [...resorts]

  // Filter by budget
  if (preferences.budget === 'budget') {
    recommended = recommended.filter((r) => r.priceRange.min <= 2000)
  } else if (preferences.budget === 'moderate') {
    recommended = recommended.filter((r) => r.priceRange.min <= 3500)
  } else if (preferences.budget === 'luxury') {
    recommended = recommended.filter((r) => r.category === 'luxury' || r.rating === 5)
  }

  // Filter by travel style
  if (preferences.travelStyle === 'family') {
    recommended = recommended.filter((r) => r.category === 'family')
  } else if (preferences.travelStyle === 'couples') {
    recommended = recommended.filter(
      (r) => r.category === 'adults-only' || r.category === 'romantic'
    )
  } else if (preferences.travelStyle === 'party') {
    recommended = recommended.filter(
      (r) => r.category === 'party' || r.amenities.includes('Casino')
    )
  }

  // Filter by flight time
  if (preferences.flightTime === 'short') {
    recommended = recommended.filter((r) => r.flightTime <= 3.5)
  } else if (preferences.flightTime === 'medium') {
    recommended = recommended.filter((r) => r.flightTime <= 4.5)
  }

  // Sort by rating and return top 10
  return recommended.sort((a, b) => b.reviewScore - a.reviewScore).slice(0, 10)
}
