/**
 * @fileoverview Destination data repository
 * @module lib/repositories/destination-repository
 *
 * This module provides the data layer for destinations, including
 * methods to query destination information.
 */

import type {
  Destination,
  DestinationListItem,
  DestinationSearchParams,
  DestinationsListResponse,
} from '@/types/destination'
import { DESTINATIONS } from '@/lib/data/destinations'

/**
 * Repository class for destination data operations
 */
export class DestinationRepository {
  /**
   * Get all destinations with optional filtering and pagination
   */
  static async getAll(params?: DestinationSearchParams): Promise<DestinationsListResponse> {
    // Simulate async database call
    await new Promise((resolve) => setTimeout(resolve, 100))

    let filteredDestinations = [...DESTINATIONS]

    // Apply filters
    if (params?.filters) {
      const { region, country, featured, tags, categories } = params.filters

      if (region) {
        filteredDestinations = filteredDestinations.filter((d) => d.region === region)
      }
      if (country) {
        filteredDestinations = filteredDestinations.filter((d) => d.country === country)
      }
      if (featured !== undefined) {
        filteredDestinations = filteredDestinations.filter((d) => d.featured === featured)
      }
      if (tags && tags.length > 0) {
        filteredDestinations = filteredDestinations.filter((d) =>
          d.tags?.some((tag) => tags.includes(tag))
        )
      }
      if (categories && categories.length > 0) {
        filteredDestinations = filteredDestinations.filter((d) =>
          d.categories?.some((cat) => categories.includes(cat))
        )
      }
    }

    // Apply search query
    if (params?.query) {
      const query = params.query.toLowerCase()
      filteredDestinations = filteredDestinations.filter(
        (d) =>
          d.name.toLowerCase().includes(query) ||
          d.country.toLowerCase().includes(query) ||
          d.shortDescription.toLowerCase().includes(query) ||
          d.description.toLowerCase().includes(query)
      )
    }

    // Apply sorting
    if (params?.filters?.sortBy) {
      const { sortBy, order = 'asc' } = params.filters
      filteredDestinations.sort((a, b) => {
        let comparison = 0
        switch (sortBy) {
          case 'name':
            comparison = a.name.localeCompare(b.name)
            break
          case 'popularity':
            comparison = (a.popularity || a.viewCount || 0) - (b.popularity || b.viewCount || 0)
            break
          case 'rating':
            comparison = (a.rating || 0) - (b.rating || 0)
            break
          case 'views':
            comparison = (a.viewCount || 0) - (b.viewCount || 0)
            break
          case 'bookings':
            comparison = (a.bookingCount || 0) - (b.bookingCount || 0)
            break
          case 'date':
            comparison =
              new Date(a.createdAt || a.publishedAt || 0).getTime() -
              new Date(b.createdAt || b.publishedAt || 0).getTime()
            break
        }
        return order === 'desc' ? -comparison : comparison
      })
    }

    // Convert to list items
    const listItems: DestinationListItem[] = filteredDestinations.map((d) => ({
      id: d.id,
      slug: d.slug,
      name: d.name,
      country: d.country,
      region: d.region,
      shortDescription: d.shortDescription,
      thumbnail: d.images?.thumbnail,
      heroImage: d.heroImage || {
        url: d.images?.hero || '',
        alt: `${d.name} destination`,
        type: 'image' as const,
      },
      featured: d.featured,
      popularity: d.popularity || d.viewCount,
      tags: d.tags,
      categories: d.categories,
      priceRange: d.priceRange,
      rating: d.rating,
      packages: Array.isArray(d.packages)
        ? typeof d.packages[0] === 'string'
          ? d.packages.length
          : d.packages.length
        : 0,
      startingPrice:
        Array.isArray(d.packages) && typeof d.packages[0] === 'object'
          ? d.packages[0].price?.perPerson
          : undefined,
    }))

    // Apply pagination
    const page = params?.page || 1
    const perPage = params?.perPage || 12
    const start = (page - 1) * perPage
    const end = start + perPage
    const paginatedItems = listItems.slice(start, end)

    return {
      destinations: paginatedItems,
      total: listItems.length,
      page,
      perPage,
      totalPages: Math.ceil(listItems.length / perPage),
    }
  }

  /**
   * Get a single destination by slug
   */
  static async getBySlug(slug: string): Promise<Destination | null> {
    // Simulate async database call
    await new Promise((resolve) => setTimeout(resolve, 100))

    const destination = DESTINATIONS.find((d) => d.slug === slug)
    return destination || null
  }

  /**
   * Get featured destinations
   */
  static async getFeatured(limit: number = 6): Promise<DestinationListItem[]> {
    const response = await this.getAll({
      filters: { featured: true, sortBy: 'popularity', order: 'desc' },
      perPage: limit,
    })
    return response.destinations
  }

  /**
   * Get related destinations
   */
  static async getRelated(
    destination: Destination,
    limit: number = 4
  ): Promise<DestinationListItem[]> {
    const response = await this.getAll({
      filters: {
        region: destination.region as string,
        tags: destination.tags,
        categories: destination.categories,
      },
      perPage: limit + 1, // Get one extra to exclude current
    })

    // Remove current destination and limit results
    return response.destinations.filter((d) => d.id !== destination.id).slice(0, limit)
  }

  /**
   * Get available regions
   */
  static async getRegions(): Promise<string[]> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    const regions = new Set(DESTINATIONS.map((d) => d.region).filter(Boolean))
    // Capitalize first letter of each region for consistency
    return Array.from(regions).map((r) =>
      r ? r.charAt(0).toUpperCase() + r.slice(1).replace(/-/g, ' ') : r
    ) as string[]
  }

  /**
   * Get available countries
   */
  static async getCountries(): Promise<string[]> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    const countries = new Set(DESTINATIONS.map((d) => d.country))
    // Ensure countries are properly capitalized
    return Array.from(countries).sort()
  }

  /**
   * Get all unique tags
   */
  static async getTags(): Promise<string[]> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    const tags = new Set(DESTINATIONS.flatMap((d) => d.tags || []))
    return Array.from(tags)
  }
}
