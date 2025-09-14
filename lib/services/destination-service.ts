/**
 * Destination Service
 * Business logic layer for destination operations
 */

import { DestinationRepository } from '@/lib/data/destinations/repository'
import { JSONDataSource } from '@/lib/data/destinations/json-data-source'
import type {
  Destination,
  DestinationCollection,
  DestinationFilters,
  BudgetLevel,
  DestinationType,
  Season,
} from '@/lib/types/destination'

// Initialize repository with JSON data source (can be swapped later)
const repository = new DestinationRepository(new JSONDataSource())

export class DestinationService {
  /**
   * Get a single destination by slug
   */
  static async getDestination(slug: string): Promise<Destination | null> {
    return repository.findBySlug(slug)
  }

  /**
   * Get featured destinations for homepage
   */
  static async getFeaturedDestinations(limit = 6): Promise<Destination[]> {
    return repository.findFeatured(limit)
  }

  /**
   * Get popular destinations
   */
  static async getPopularDestinations(limit = 10): Promise<Destination[]> {
    return repository.findPopular(limit)
  }

  /**
   * Get destinations by type (beach, mountain, city, etc.)
   */
  static async getDestinationsByType(type: DestinationType, limit = 12): Promise<Destination[]> {
    return repository.findByType(type, limit)
  }

  /**
   * Get destinations suitable for a specific budget level
   */
  static async getDestinationsByBudget(budget: BudgetLevel, limit = 12): Promise<Destination[]> {
    return repository.findByBudget(budget, limit)
  }

  /**
   * Get destinations best to visit in a specific month
   */
  static async getDestinationsBySeason(month: number): Promise<Destination[]> {
    return repository.findBySeason(month)
  }

  /**
   * Get destinations by country
   */
  static async getDestinationsByCountry(country: string): Promise<Destination[]> {
    return repository.findByCountry(country)
  }

  /**
   * Get destinations by region
   */
  static async getDestinationsByRegion(region: string): Promise<Destination[]> {
    return repository.findByRegion(region)
  }

  /**
   * Search destinations
   */
  static async searchDestinations(query: string, limit = 20): Promise<Destination[]> {
    return repository.search(query, limit)
  }

  /**
   * Get similar destinations
   */
  static async getSimilarDestinations(destinationId: string, limit = 6): Promise<Destination[]> {
    return repository.findSimilar(destinationId, limit)
  }

  /**
   * Get all destinations with filters and pagination
   */
  static async getDestinations(
    filters?: DestinationFilters,
    page = 1,
    perPage = 12
  ): Promise<DestinationCollection> {
    return repository.findAll({
      filters,
      pagination: { page, perPage },
      sort: { field: 'popularity', direction: 'desc' },
    })
  }

  /**
   * Get destinations for a specific departure city
   */
  static async getDestinationsFromCity(citySlug: string, limit = 12): Promise<Destination[]> {
    // This would typically consider flight routes, prices, etc.
    // For now, return popular destinations
    return repository.findPopular(limit)
  }

  /**
   * Get recommended destinations based on user preferences
   */
  static async getRecommendedDestinations(
    preferences: {
      types?: DestinationType[]
      budget?: BudgetLevel
      duration?: number
      month?: number
    },
    limit = 12
  ): Promise<Destination[]> {
    const filters: DestinationFilters = {}

    if (preferences.types?.length) {
      filters.type = preferences.types
    }

    if (preferences.budget) {
      filters.budgetLevel = [preferences.budget]
    }

    if (preferences.duration) {
      filters.maxDuration = preferences.duration
    }

    if (preferences.month) {
      filters.bestTimeToVisit = [preferences.month]
    }

    const result = await repository.findAll({
      filters,
      sort: { field: 'popularity', direction: 'desc' },
      pagination: { page: 1, perPage: limit },
    })

    return result.destinations
  }

  /**
   * Get destination statistics
   */
  static async getDestinationStats(): Promise<{
    total: number
    byType: Record<string, number>
    byCountry: Record<string, number>
    featured: number
  }> {
    return repository.getStats()
  }

  /**
   * Calculate estimated trip cost for a destination
   */
  static calculateTripCost(
    destination: Destination,
    budget: BudgetLevel,
    duration: number,
    travelers: number = 1
  ): {
    total: number
    breakdown: {
      accommodation: number
      meals: number
      transportation: number
      activities: number
      miscellaneous: number
    }
    currency: string
  } {
    const budgetData = destination.budgetLevels[budget]
    if (!budgetData) {
      throw new Error(`Budget level ${budget} not available for ${destination.name}`)
    }

    const breakdown = {
      accommodation: budgetData.accommodation.min * duration * Math.ceil(travelers / 2),
      meals: budgetData.meals.min * duration * travelers,
      transportation: budgetData.transportation.min * duration * travelers,
      activities: budgetData.activities.min * duration * travelers,
      miscellaneous: budgetData.miscellaneous.min * duration * travelers,
    }

    const total = Object.values(breakdown).reduce((sum, cost) => sum + cost, 0)

    return {
      total,
      breakdown,
      currency: budgetData.total.currency,
    }
  }

  /**
   * Get travel tips for a destination
   */
  static getTravelTips(destination: Destination): string[] {
    const tips: string[] = []

    // Visa tips
    if (destination.visaRequirements?.required) {
      tips.push(
        `Visa required: ${destination.visaRequirements.type} (${destination.visaRequirements.processTime})`
      )
    }

    // Best time to visit
    const months = destination.bestTimeToVisit.months
      .map((m) => new Date(2024, m - 1).toLocaleString('default', { month: 'long' }))
      .join(', ')
    tips.push(`Best time to visit: ${months}`)

    // Currency tips
    tips.push(`Currency: ${destination.currency.name} (${destination.currency.symbol})`)

    // Safety tips
    if (destination.healthAndSafety?.safetyNotes) {
      tips.push(...destination.healthAndSafety.safetyNotes)
    }

    // Cultural tips
    if (destination.culturalNotes) {
      tips.push(...destination.culturalNotes.slice(0, 3))
    }

    return tips
  }

  /**
   * Format destination for SEO-friendly URL
   */
  static formatDestinationUrl(destination: Destination): string {
    return `/destinations/${destination.slug}`
  }

  /**
   * Preload cache for performance
   */
  static async preloadCache(slugs: string[]): Promise<void> {
    return repository.preloadCache(slugs)
  }

  /**
   * Clear cache
   */
  static clearCache(): void {
    repository.clearCache()
  }
}

// Export singleton instance methods for convenience
export const destinationService = DestinationService
