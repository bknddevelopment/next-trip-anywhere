/**
 * @fileoverview Tests for DestinationRepository
 * @module __tests__/destinations/destination-repository.test
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { DestinationRepository } from '@/lib/repositories/destination-repository'
import type { Destination, DestinationSearchParams } from '@/types/destination'

describe('DestinationRepository', () => {
  describe('getAll', () => {
    it('should return paginated destinations', async () => {
      const result = await DestinationRepository.getAll({
        page: 1,
        perPage: 10,
      })

      expect(result).toHaveProperty('destinations')
      expect(result).toHaveProperty('total')
      expect(result).toHaveProperty('page')
      expect(result).toHaveProperty('perPage')
      expect(result).toHaveProperty('totalPages')
      expect(Array.isArray(result.destinations)).toBe(true)
      expect(result.page).toBe(1)
      expect(result.perPage).toBe(10)
    })

    it('should filter destinations by region', async () => {
      const result = await DestinationRepository.getAll({
        filters: { region: 'Caribbean' },
      })

      result.destinations.forEach((dest) => {
        expect(dest.region).toBe('Caribbean')
      })
    })

    it('should filter destinations by featured status', async () => {
      const result = await DestinationRepository.getAll({
        filters: { featured: true },
      })

      result.destinations.forEach((dest) => {
        expect(dest.featured).toBe(true)
      })
    })

    it('should filter destinations by tags', async () => {
      const result = await DestinationRepository.getAll({
        filters: { tags: ['beach'] },
      })

      result.destinations.forEach((dest) => {
        expect(dest.tags).toContain('beach')
      })
    })

    it('should search destinations by query', async () => {
      const result = await DestinationRepository.getAll({
        query: 'cancun',
      })

      expect(result.destinations.length).toBeGreaterThan(0)
      const cancun = result.destinations.find((d) => d.slug === 'cancun-mexico')
      expect(cancun).toBeDefined()
    })

    it('should sort destinations by popularity', async () => {
      const result = await DestinationRepository.getAll({
        filters: { sortBy: 'popularity', order: 'desc' },
      })

      for (let i = 1; i < result.destinations.length; i++) {
        const prev = result.destinations[i - 1].popularity || 0
        const curr = result.destinations[i].popularity || 0
        expect(prev).toBeGreaterThanOrEqual(curr)
      }
    })

    it('should sort destinations by name', async () => {
      const result = await DestinationRepository.getAll({
        filters: { sortBy: 'name', order: 'asc' },
      })

      for (let i = 1; i < result.destinations.length; i++) {
        const comparison = result.destinations[i - 1].name.localeCompare(
          result.destinations[i].name
        )
        expect(comparison).toBeLessThanOrEqual(0)
      }
    })

    it('should handle empty results gracefully', async () => {
      const result = await DestinationRepository.getAll({
        query: 'nonexistentdestination123456',
      })

      expect(result.destinations).toEqual([])
      expect(result.total).toBe(0)
      expect(result.totalPages).toBe(0)
    })

    it('should respect pagination limits', async () => {
      const perPage = 5
      const result = await DestinationRepository.getAll({
        page: 1,
        perPage,
      })

      expect(result.destinations.length).toBeLessThanOrEqual(perPage)
      expect(result.perPage).toBe(perPage)
    })
  })

  describe('getBySlug', () => {
    it('should return a destination by slug', async () => {
      const destination = await DestinationRepository.getBySlug('cancun-mexico')

      expect(destination).not.toBeNull()
      expect(destination?.slug).toBe('cancun-mexico')
      expect(destination?.name).toBe('Cancun')
    })

    it('should return null for non-existent slug', async () => {
      const destination = await DestinationRepository.getBySlug('non-existent-slug')

      expect(destination).toBeNull()
    })

    it('should include all required destination fields', async () => {
      const destination = await DestinationRepository.getBySlug('cancun-mexico')

      expect(destination).toHaveProperty('id')
      expect(destination).toHaveProperty('slug')
      expect(destination).toHaveProperty('name')
      expect(destination).toHaveProperty('country')
      expect(destination).toHaveProperty('coordinates')
      expect(destination).toHaveProperty('shortDescription')
      expect(destination).toHaveProperty('longDescription')
      expect(destination).toHaveProperty('heroImage')
      expect(destination).toHaveProperty('climate')
      expect(destination).toHaveProperty('travelOptions')
      expect(destination).toHaveProperty('attractions')
      expect(destination).toHaveProperty('travelTips')
      expect(destination).toHaveProperty('seo')
    })
  })

  describe('getFeatured', () => {
    it('should return featured destinations', async () => {
      const destinations = await DestinationRepository.getFeatured(3)

      expect(Array.isArray(destinations)).toBe(true)
      expect(destinations.length).toBeLessThanOrEqual(3)
      destinations.forEach((dest) => {
        expect(dest.featured).toBe(true)
      })
    })

    it('should respect the limit parameter', async () => {
      const limit = 2
      const destinations = await DestinationRepository.getFeatured(limit)

      expect(destinations.length).toBeLessThanOrEqual(limit)
    })

    it('should sort featured destinations by popularity', async () => {
      const destinations = await DestinationRepository.getFeatured(10)

      for (let i = 1; i < destinations.length; i++) {
        const prev = destinations[i - 1].popularity || 0
        const curr = destinations[i].popularity || 0
        expect(prev).toBeGreaterThanOrEqual(curr)
      }
    })
  })

  describe('getRelated', () => {
    it('should return related destinations', async () => {
      const destination = await DestinationRepository.getBySlug('cancun-mexico')
      if (!destination) {
        throw new Error('Test destination not found')
      }

      const related = await DestinationRepository.getRelated(destination, 4)

      expect(Array.isArray(related)).toBe(true)
      expect(related.length).toBeLessThanOrEqual(4)

      // Should not include the current destination
      related.forEach((dest) => {
        expect(dest.id).not.toBe(destination.id)
      })
    })

    it('should prioritize destinations from the same region', async () => {
      const destination = await DestinationRepository.getBySlug('cancun-mexico')
      if (!destination) {
        throw new Error('Test destination not found')
      }

      const related = await DestinationRepository.getRelated(destination, 4)

      // At least some related destinations should be from the same region
      const sameRegion = related.filter((d) => d.region === destination.region)
      expect(sameRegion.length).toBeGreaterThan(0)
    })
  })

  describe('getRegions', () => {
    it('should return unique regions', async () => {
      const regions = await DestinationRepository.getRegions()

      expect(Array.isArray(regions)).toBe(true)
      expect(regions.length).toBeGreaterThan(0)

      // Check for uniqueness
      const uniqueRegions = [...new Set(regions)]
      expect(regions.length).toBe(uniqueRegions.length)
    })

    it('should include expected regions', async () => {
      const regions = await DestinationRepository.getRegions()

      expect(regions).toContain('Caribbean')
      expect(regions).toContain('Europe')
    })
  })

  describe('getCountries', () => {
    it('should return unique countries', async () => {
      const countries = await DestinationRepository.getCountries()

      expect(Array.isArray(countries)).toBe(true)
      expect(countries.length).toBeGreaterThan(0)

      // Check for uniqueness
      const uniqueCountries = [...new Set(countries)]
      expect(countries.length).toBe(uniqueCountries.length)
    })

    it('should include expected countries', async () => {
      const countries = await DestinationRepository.getCountries()

      expect(countries).toContain('Mexico')
      expect(countries).toContain('France')
    })
  })

  describe('getTags', () => {
    it('should return unique tags', async () => {
      const tags = await DestinationRepository.getTags()

      expect(Array.isArray(tags)).toBe(true)
      expect(tags.length).toBeGreaterThan(0)

      // Check for uniqueness
      const uniqueTags = [...new Set(tags)]
      expect(tags.length).toBe(uniqueTags.length)
    })

    it('should include expected tags', async () => {
      const tags = await DestinationRepository.getTags()

      expect(tags).toContain('beach')
      expect(tags).toContain('culture')
    })
  })
})
