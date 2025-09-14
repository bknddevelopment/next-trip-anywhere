/**
 * JSON File Data Source for Destinations
 * Initial implementation using static JSON files
 * Can be easily swapped with database implementation later
 */

import type {
  Destination,
  DestinationCollection,
  DestinationQueryOptions,
  Attraction,
  Activity,
} from '@/lib/types/destination'
import type { IDestinationDataSource } from './repository'
import { applyFilters, applySort, paginate } from './repository'
import destinationsData from './destinations-data.json'
import attractionsData from './attractions-data.json'
import activitiesData from './activities-data.json'

export class JSONDataSource implements IDestinationDataSource {
  private destinations: Destination[]
  private attractions: Attraction[]
  private activities: Activity[]

  constructor() {
    // Load data from JSON files
    this.destinations = (destinationsData as Destination[]) || []
    this.attractions = (attractionsData as Attraction[]) || []
    this.activities = (activitiesData as Activity[]) || []
  }

  async findAll(options?: DestinationQueryOptions): Promise<DestinationCollection> {
    let result = [...this.destinations]

    // Apply filters
    if (options?.filters) {
      result = applyFilters(result, options.filters)
    }

    // Apply sorting
    if (options?.sort) {
      result = applySort(result, options.sort)
    }

    // Apply pagination
    if (options?.pagination) {
      const paginated = paginate(result, options.pagination.page, options.pagination.perPage)
      return {
        destinations: paginated.items,
        total: paginated.total,
        page: paginated.page,
        perPage: paginated.perPage,
        hasMore: paginated.hasMore,
      }
    }

    return {
      destinations: result,
      total: result.length,
    }
  }

  async findBySlug(slug: string): Promise<Destination | null> {
    return this.destinations.find((d) => d.slug === slug) || null
  }

  async findById(id: string): Promise<Destination | null> {
    return this.destinations.find((d) => d.id === id) || null
  }

  async findByCountry(country: string): Promise<Destination[]> {
    return this.destinations.filter((d) => d.country.toLowerCase() === country.toLowerCase())
  }

  async findByRegion(region: string): Promise<Destination[]> {
    return this.destinations.filter((d) => d.region.toLowerCase() === region.toLowerCase())
  }

  async findFeatured(limit = 10): Promise<Destination[]> {
    return this.destinations
      .filter((d) => d.featured && d.status === 'active')
      .sort((a, b) => b.popularityScore - a.popularityScore)
      .slice(0, limit)
  }

  async findSimilar(destinationId: string, limit = 6): Promise<Destination[]> {
    const destination = await this.findById(destinationId)
    if (!destination) {
      return []
    }

    // Find destinations with similar characteristics
    const similar = this.destinations
      .filter(
        (d) =>
          d.id !== destinationId &&
          d.status === 'active' &&
          // Same country
          (d.country === destination.country ||
            // Same type
            d.type.some((t) => destination.type.includes(t)) ||
            // Similar climate
            d.climate === destination.climate ||
            // Shared tags
            d.tags.some((t) => destination.tags.includes(t)))
      )
      .map((d) => ({
        destination: d,
        score: this.calculateSimilarityScore(destination, d),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((item) => item.destination)

    return similar
  }

  async search(query: string, limit = 20): Promise<Destination[]> {
    const searchTerm = query.toLowerCase()

    const results = this.destinations
      .filter((d) => d.status === 'active')
      .map((d) => ({
        destination: d,
        score: this.calculateSearchScore(d, searchTerm),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((item) => item.destination)

    return results
  }

  async getAttractions(destinationId: string): Promise<Attraction[]> {
    return this.attractions
      .filter((a) => a.destinationId === destinationId)
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
  }

  async getActivities(destinationId: string): Promise<Activity[]> {
    return this.activities
      .filter((a) => a.destinationId === destinationId)
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
  }

  // Helper methods

  private calculateSimilarityScore(dest1: Destination, dest2: Destination): number {
    let score = 0

    // Same country (high weight)
    if (dest1.country === dest2.country) {
      score += 30
    }

    // Same region (medium weight)
    if (dest1.region === dest2.region) {
      score += 20
    }

    // Same continent (low weight)
    if (dest1.continent === dest2.continent) {
      score += 10
    }

    // Shared destination types
    const sharedTypes = dest1.type.filter((t) => dest2.type.includes(t))
    score += sharedTypes.length * 15

    // Same climate
    if (dest1.climate === dest2.climate) {
      score += 15
    }

    // Overlapping best time to visit
    const sharedMonths = dest1.bestTimeToVisit.months.filter((m) =>
      dest2.bestTimeToVisit.months.includes(m)
    )
    score += sharedMonths.length * 3

    // Shared tags
    const sharedTags = dest1.tags.filter((t) => dest2.tags.includes(t))
    score += sharedTags.length * 5

    // Similar budget levels
    const dest1Budgets = Object.keys(dest1.budgetLevels)
    const dest2Budgets = Object.keys(dest2.budgetLevels)
    const sharedBudgets = dest1Budgets.filter((b) => dest2Budgets.includes(b))
    score += sharedBudgets.length * 10

    return score
  }

  private calculateSearchScore(destination: Destination, searchTerm: string): number {
    let score = 0

    // Exact match in name (highest priority)
    if (destination.name.toLowerCase() === searchTerm) {
      score += 100
    } else if (destination.name.toLowerCase().includes(searchTerm)) {
      score += 50
    }

    // Match in alternative names
    if (destination.alternativeNames?.some((n) => n.toLowerCase().includes(searchTerm))) {
      score += 40
    }

    // Match in country
    if (destination.country.toLowerCase().includes(searchTerm)) {
      score += 30
    }

    // Match in region
    if (destination.region.toLowerCase().includes(searchTerm)) {
      score += 25
    }

    // Match in description
    if (destination.description.toLowerCase().includes(searchTerm)) {
      score += 20
    }

    // Match in short description
    if (destination.shortDescription.toLowerCase().includes(searchTerm)) {
      score += 15
    }

    // Match in highlights
    if (destination.highlights.some((h) => h.toLowerCase().includes(searchTerm))) {
      score += 15
    }

    // Match in tags
    if (destination.tags.some((t) => t.toLowerCase().includes(searchTerm))) {
      score += 10
    }

    // Match in attractions
    const attractions = this.attractions.filter((a) => a.destinationId === destination.id)
    if (attractions.some((a) => a.name.toLowerCase().includes(searchTerm))) {
      score += 10
    }

    // Boost score based on popularity
    score += destination.popularityScore * 0.1

    // Boost if featured
    if (destination.featured) {
      score += 5
    }

    return score
  }
}

// Singleton instance
let dataSourceInstance: JSONDataSource | null = null

export function getJSONDataSource(): JSONDataSource {
  if (!dataSourceInstance) {
    dataSourceInstance = new JSONDataSource()
  }
  return dataSourceInstance
}
