/**
 * Destinations API Client
 * Client-side SDK for interacting with the destinations API
 */

import type {
  DestinationsListResponse,
  DestinationResponse,
  RegionsResponse,
  PopularDestinationsResponse,
  SearchResponse,
  ListDestinationsQuery,
  PopularDestinationsQuery,
  SearchDestinationsQuery,
  ApiResponse,
  DestinationRegion,
  DestinationCategory,
  PriceRange,
} from '@/types/destination'

/**
 * API configuration
 */
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '',
  timeout: 10000, // 10 seconds
  retries: 3,
  retryDelay: 1000, // 1 second
}

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public status?: number,
    public details?: Record<string, any>
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

/**
 * Base fetch wrapper with error handling and retries
 */
async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries = API_CONFIG.retries
): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok && retries > 0) {
      // Retry on 5xx errors or rate limiting
      if (response.status >= 500 || response.status === 429) {
        const retryAfter = response.headers.get('Retry-After')
        const delay = retryAfter ? parseInt(retryAfter) * 1000 : API_CONFIG.retryDelay

        await new Promise((resolve) => setTimeout(resolve, delay))
        return fetchWithRetry(url, options, retries - 1)
      }
    }

    return response
  } catch (error) {
    clearTimeout(timeoutId)

    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError('TIMEOUT', 'Request timed out')
    }

    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, API_CONFIG.retryDelay))
      return fetchWithRetry(url, options, retries - 1)
    }

    throw error
  }
}

/**
 * Parse API response and handle errors
 */
async function parseResponse<T>(response: Response): Promise<T> {
  const data = await response.json()

  if (!response.ok || !data.success) {
    throw new ApiError(
      data.error?.code || 'UNKNOWN_ERROR',
      data.error?.message || 'An error occurred',
      response.status,
      data.error?.details
    )
  }

  return data
}

/**
 * Build query string from parameters
 */
function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return
    }

    if (Array.isArray(value)) {
      searchParams.append(key, value.join(','))
    } else if (typeof value === 'boolean') {
      searchParams.append(key, value.toString())
    } else {
      searchParams.append(key, String(value))
    }
  })

  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ''
}

/**
 * Destinations API Client
 */
export class DestinationsApiClient {
  private baseUrl: string

  constructor(baseUrl = API_CONFIG.baseUrl) {
    this.baseUrl = baseUrl
  }

  /**
   * List destinations with pagination and filtering
   */
  async listDestinations(query?: ListDestinationsQuery): Promise<DestinationsListResponse> {
    const queryString = query ? buildQueryString(query) : ''
    const url = `${this.baseUrl}/api/destinations${queryString}`

    const response = await fetchWithRetry(url)
    return parseResponse<DestinationsListResponse>(response)
  }

  /**
   * Get a single destination by slug
   */
  async getDestination(slug: string): Promise<DestinationResponse> {
    const url = `${this.baseUrl}/api/destinations/${slug}`

    const response = await fetchWithRetry(url)
    return parseResponse<DestinationResponse>(response)
  }

  /**
   * Get all regions
   */
  async getRegions(includeDetails = false): Promise<RegionsResponse> {
    const queryString = includeDetails ? '?includeDetails=true' : ''
    const url = `${this.baseUrl}/api/destinations/regions${queryString}`

    const response = await fetchWithRetry(url)
    return parseResponse<RegionsResponse>(response)
  }

  /**
   * Get popular destinations
   */
  async getPopularDestinations(
    query?: PopularDestinationsQuery
  ): Promise<PopularDestinationsResponse> {
    const queryString = query ? buildQueryString(query) : ''
    const url = `${this.baseUrl}/api/destinations/popular${queryString}`

    const response = await fetchWithRetry(url)
    return parseResponse<PopularDestinationsResponse>(response)
  }

  /**
   * Search destinations
   */
  async searchDestinations(query: SearchDestinationsQuery): Promise<SearchResponse> {
    const queryString = buildQueryString(query)
    const url = `${this.baseUrl}/api/destinations/search${queryString}`

    const response = await fetchWithRetry(url)
    return parseResponse<SearchResponse>(response)
  }

  /**
   * Prefetch destination data for better UX
   */
  async prefetchDestination(slug: string): Promise<void> {
    try {
      await this.getDestination(slug)
    } catch (error) {
      // Silently fail prefetch
      // Prefetch failed silently
    }
  }

  /**
   * Get destinations by specific criteria (convenience methods)
   */
  async getDestinationsByRegion(
    region: DestinationRegion,
    limit = 12
  ): Promise<DestinationsListResponse> {
    return this.listDestinations({ region, limit: limit.toString() })
  }

  async getDestinationsByCategory(
    category: DestinationCategory,
    limit = 12
  ): Promise<DestinationsListResponse> {
    return this.listDestinations({ category, limit: limit.toString() })
  }

  async getFeaturedDestinations(limit = 6): Promise<DestinationsListResponse> {
    return this.listDestinations({ featured: 'true', limit: limit.toString() })
  }

  async getAffordableDestinations(limit = 12): Promise<DestinationsListResponse> {
    return this.listDestinations({
      priceRange: '$,$$',
      limit: limit.toString(),
      sortBy: 'price',
      order: 'asc',
    })
  }

  async getLuxuryDestinations(limit = 12): Promise<DestinationsListResponse> {
    return this.listDestinations({
      priceRange: '$$$,$$$$',
      limit: limit.toString(),
      sortBy: 'rating',
      order: 'desc',
    })
  }
}

/**
 * Default client instance
 */
export const destinationsApi = new DestinationsApiClient()

/**
 * React hooks for data fetching (if using React Query/SWR)
 */
export const destinationKeys = {
  all: ['destinations'] as const,
  lists: () => [...destinationKeys.all, 'list'] as const,
  list: (query?: ListDestinationsQuery) => [...destinationKeys.lists(), query] as const,
  details: () => [...destinationKeys.all, 'detail'] as const,
  detail: (slug: string) => [...destinationKeys.details(), slug] as const,
  regions: () => [...destinationKeys.all, 'regions'] as const,
  popular: (query?: PopularDestinationsQuery) =>
    [...destinationKeys.all, 'popular', query] as const,
  search: (query: SearchDestinationsQuery) => [...destinationKeys.all, 'search', query] as const,
}

/**
 * Utility functions for working with destinations
 */
export const destinationUtils = {
  /**
   * Generate destination URL
   */
  getDestinationUrl(slug: string): string {
    return `/destinations/${slug}`
  },

  /**
   * Format price range for display
   */
  formatPriceRange(priceRange: PriceRange): string {
    const labels = {
      $: 'Budget',
      $$: 'Moderate',
      $$$: 'Premium',
      $$$$: 'Luxury',
    }
    return labels[priceRange] || priceRange
  },

  /**
   * Format region name for display
   */
  formatRegion(region: DestinationRegion): string {
    return region
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  },

  /**
   * Format category for display
   */
  formatCategory(category: DestinationCategory): string {
    return category.charAt(0).toUpperCase() + category.slice(1)
  },

  /**
   * Check if destination matches filters
   */
  matchesFilters(
    destination: any,
    filters: {
      region?: DestinationRegion
      category?: DestinationCategory
      priceRange?: PriceRange
    }
  ): boolean {
    if (filters.region && destination.region !== filters.region) {
      return false
    }
    if (filters.category && !destination.categories?.includes(filters.category)) {
      return false
    }
    if (filters.priceRange && destination.priceRange !== filters.priceRange) {
      return false
    }
    return true
  },
}
