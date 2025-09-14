/**
 * Destination Repository
 * Data access layer with support for both static JSON and future database implementation
 */

import type {
  Destination,
  DestinationCollection,
  DestinationFilters,
  DestinationQueryOptions,
  DestinationSortOptions,
  CachedDestination,
  Attraction,
  Activity,
} from '@/lib/types/destination'

// Interface for swappable data sources
export interface IDestinationDataSource {
  findAll(options?: DestinationQueryOptions): Promise<DestinationCollection>
  findBySlug(slug: string): Promise<Destination | null>
  findById(id: string): Promise<Destination | null>
  findByCountry(country: string): Promise<Destination[]>
  findByRegion(region: string): Promise<Destination[]>
  findFeatured(limit?: number): Promise<Destination[]>
  findSimilar(destinationId: string, limit?: number): Promise<Destination[]>
  search(query: string, limit?: number): Promise<Destination[]>
  getAttractions(destinationId: string): Promise<Attraction[]>
  getActivities(destinationId: string): Promise<Activity[]>
  create?(destination: Omit<Destination, 'id' | 'createdAt' | 'updatedAt'>): Promise<Destination>
  update?(id: string, destination: Partial<Destination>): Promise<Destination>
  delete?(id: string): Promise<boolean>
}

// Cache implementation
class DestinationCache {
  private cache: Map<string, CachedDestination> = new Map()
  private defaultTTL = 3600 // 1 hour in seconds

  get(key: string): Destination | null {
    const cached = this.cache.get(key)
    if (!cached) {
      return null
    }

    const now = Date.now()
    if (now - cached.timestamp > cached.ttl * 1000) {
      this.cache.delete(key)
      return null
    }

    return cached.data
  }

  set(key: string, data: Destination, ttl?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL,
    })
  }

  clear(): void {
    this.cache.clear()
  }

  delete(key: string): void {
    this.cache.delete(key)
  }
}

// Main Repository Class
export class DestinationRepository {
  private dataSource: IDestinationDataSource
  private cache: DestinationCache

  constructor(dataSource: IDestinationDataSource) {
    this.dataSource = dataSource
    this.cache = new DestinationCache()
  }

  // ========== Read Operations ==========

  async findAll(options?: DestinationQueryOptions): Promise<DestinationCollection> {
    return this.dataSource.findAll(options)
  }

  async findBySlug(slug: string): Promise<Destination | null> {
    // Check cache first
    const cacheKey = `slug:${slug}`
    const cached = this.cache.get(cacheKey)
    if (cached) {
      return cached
    }

    // Fetch from data source
    const destination = await this.dataSource.findBySlug(slug)
    if (destination) {
      this.cache.set(cacheKey, destination)
    }

    return destination
  }

  async findById(id: string): Promise<Destination | null> {
    const cacheKey = `id:${id}`
    const cached = this.cache.get(cacheKey)
    if (cached) {
      return cached
    }

    const destination = await this.dataSource.findById(id)
    if (destination) {
      this.cache.set(cacheKey, destination)
    }

    return destination
  }

  async findByCountry(country: string): Promise<Destination[]> {
    return this.dataSource.findByCountry(country)
  }

  async findByRegion(region: string): Promise<Destination[]> {
    return this.dataSource.findByRegion(region)
  }

  async findFeatured(limit = 10): Promise<Destination[]> {
    return this.dataSource.findFeatured(limit)
  }

  async findPopular(limit = 10): Promise<Destination[]> {
    const result = await this.dataSource.findAll({
      filters: { status: 'active' as any },
      sort: { field: 'popularity', direction: 'desc' },
      pagination: { page: 1, perPage: limit },
    })
    return result.destinations
  }

  async findByType(type: string, limit = 20): Promise<Destination[]> {
    const result = await this.dataSource.findAll({
      filters: { type: [type as any] },
      sort: { field: 'popularity', direction: 'desc' },
      pagination: { page: 1, perPage: limit },
    })
    return result.destinations
  }

  async findByBudget(budgetLevel: string, limit = 20): Promise<Destination[]> {
    const result = await this.dataSource.findAll({
      filters: { budgetLevel: [budgetLevel as any] },
      sort: { field: 'popularity', direction: 'desc' },
      pagination: { page: 1, perPage: limit },
    })
    return result.destinations
  }

  async findBySeason(month: number): Promise<Destination[]> {
    const result = await this.dataSource.findAll({
      filters: { bestTimeToVisit: [month] },
    })
    return result.destinations
  }

  async findSimilar(destinationId: string, limit = 6): Promise<Destination[]> {
    return this.dataSource.findSimilar(destinationId, limit)
  }

  async search(query: string, limit = 20): Promise<Destination[]> {
    return this.dataSource.search(query, limit)
  }

  // ========== Related Data ==========

  async getAttractions(destinationId: string): Promise<Attraction[]> {
    return this.dataSource.getAttractions(destinationId)
  }

  async getActivities(destinationId: string): Promise<Activity[]> {
    return this.dataSource.getActivities(destinationId)
  }

  async getTopAttractions(destinationId: string, limit = 5): Promise<Attraction[]> {
    const attractions = await this.getAttractions(destinationId)
    return attractions
      .filter((a) => a.mustSee)
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .slice(0, limit)
  }

  async getFamilyActivities(destinationId: string): Promise<Activity[]> {
    const activities = await this.getActivities(destinationId)
    return activities.filter((a) => a.familyFriendly)
  }

  // ========== Write Operations (optional) ==========

  async create(
    destination: Omit<Destination, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Destination> {
    if (!this.dataSource.create) {
      throw new Error('Create operation not supported by current data source')
    }
    const created = await this.dataSource.create(destination)
    this.cache.clear() // Invalidate cache
    return created
  }

  async update(id: string, destination: Partial<Destination>): Promise<Destination> {
    if (!this.dataSource.update) {
      throw new Error('Update operation not supported by current data source')
    }
    const updated = await this.dataSource.update(id, destination)
    this.cache.delete(`id:${id}`)
    this.cache.delete(`slug:${updated.slug}`)
    return updated
  }

  async delete(id: string): Promise<boolean> {
    if (!this.dataSource.delete) {
      throw new Error('Delete operation not supported by current data source')
    }
    const deleted = await this.dataSource.delete(id)
    if (deleted) {
      this.cache.delete(`id:${id}`)
    }
    return deleted
  }

  // ========== Utility Methods ==========

  clearCache(): void {
    this.cache.clear()
  }

  async preloadCache(slugs: string[]): Promise<void> {
    const promises = slugs.map((slug) => this.findBySlug(slug))
    await Promise.all(promises)
  }

  async getStats(): Promise<{
    total: number
    byType: Record<string, number>
    byCountry: Record<string, number>
    featured: number
  }> {
    const all = await this.findAll()
    const stats = {
      total: all.total,
      byType: {} as Record<string, number>,
      byCountry: {} as Record<string, number>,
      featured: 0,
    }

    all.destinations.forEach((dest) => {
      // Count by type
      dest.type.forEach((t) => {
        stats.byType[t] = (stats.byType[t] || 0) + 1
      })

      // Count by country
      stats.byCountry[dest.country] = (stats.byCountry[dest.country] || 0) + 1

      // Count featured
      if (dest.featured) {
        stats.featured++
      }
    })

    return stats
  }
}

// ========== Filtering and Sorting Utilities ==========

export function applyFilters(
  destinations: Destination[],
  filters: DestinationFilters
): Destination[] {
  let filtered = [...destinations]

  if (filters.type?.length) {
    filtered = filtered.filter((d) => d.type.some((t) => filters.type?.includes(t)))
  }

  if (filters.country?.length) {
    filtered = filtered.filter((d) => filters.country?.includes(d.country))
  }

  if (filters.continent?.length) {
    filtered = filtered.filter((d) => filters.continent?.includes(d.continent))
  }

  if (filters.climate?.length) {
    filtered = filtered.filter((d) => filters.climate?.includes(d.climate))
  }

  if (filters.budgetLevel?.length) {
    filtered = filtered.filter((d) =>
      Object.keys(d.budgetLevels).some((level) => filters.budgetLevel?.includes(level as any))
    )
  }

  if (filters.bestTimeToVisit?.length) {
    filtered = filtered.filter((d) =>
      d.bestTimeToVisit.months.some((m) => filters.bestTimeToVisit?.includes(m))
    )
  }

  if (filters.minDuration !== undefined) {
    filtered = filtered.filter((d) => d.recommendedDuration.min >= filters.minDuration!)
  }

  if (filters.maxDuration !== undefined) {
    filtered = filtered.filter((d) => d.recommendedDuration.max <= filters.maxDuration!)
  }

  if (filters.tags?.length) {
    filtered = filtered.filter((d) => filters.tags?.some((tag) => d.tags.includes(tag)))
  }

  if (filters.featured !== undefined) {
    filtered = filtered.filter((d) => d.featured === filters.featured)
  }

  if (filters.status) {
    filtered = filtered.filter((d) => d.status === filters.status)
  }

  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase()
    filtered = filtered.filter(
      (d) =>
        d.name.toLowerCase().includes(query) ||
        d.country.toLowerCase().includes(query) ||
        d.region.toLowerCase().includes(query) ||
        d.description.toLowerCase().includes(query) ||
        d.tags.some((t) => t.toLowerCase().includes(query))
    )
  }

  return filtered
}

export function applySort(
  destinations: Destination[],
  sort: DestinationSortOptions
): Destination[] {
  const sorted = [...destinations]
  const direction = sort.direction === 'asc' ? 1 : -1

  sorted.sort((a, b) => {
    switch (sort.field) {
      case 'name':
        return direction * a.name.localeCompare(b.name)

      case 'popularity':
        return direction * ((a.popularityScore || 0) - (b.popularityScore || 0))

      case 'rating':
        return direction * ((a.averageRating || 0) - (b.averageRating || 0))

      case 'price': {
        const aPrice = Object.values(a.budgetLevels)[0]?.total.min || 0
        const bPrice = Object.values(b.budgetLevels)[0]?.total.min || 0
        return direction * (aPrice - bPrice)
      }

      case 'createdAt':
        return direction * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

      case 'updatedAt':
        return direction * (new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime())

      default:
        return 0
    }
  })

  return sorted
}

export function paginate<T>(
  items: T[],
  page: number,
  perPage: number
): {
  items: T[]
  total: number
  page: number
  perPage: number
  hasMore: boolean
} {
  const start = (page - 1) * perPage
  const end = start + perPage

  return {
    items: items.slice(start, end),
    total: items.length,
    page,
    perPage,
    hasMore: end < items.length,
  }
}
