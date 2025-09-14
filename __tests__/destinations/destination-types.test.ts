/**
 * @fileoverview Tests for destination type guards and validation
 * @module __tests__/destinations/destination-types.test
 */

import { describe, it, expect } from 'vitest'
import { isDestination, isDestinationListItem } from '@/types/destination'
import type { Destination, DestinationListItem } from '@/types/destination'

describe('Destination Type Guards', () => {
  describe('isDestination', () => {
    it('should return true for valid destination object', () => {
      const validDestination = {
        id: 'test-001',
        slug: 'test-destination',
        name: 'Test Destination',
        country: 'Test Country',
        coordinates: {
          latitude: 10.5,
          longitude: -20.3,
        },
        nearestAirports: ['TEST'],
        shortDescription: 'Short description',
        longDescription: 'Long description',
        highlights: ['Highlight 1'],
        heroImage: {
          url: 'https://example.com/image.jpg',
          alt: 'Image',
          type: 'image',
        },
        gallery: [],
        climate: [],
        travelOptions: [],
        averageStayDuration: '5 days',
        attractions: [],
        activities: [],
        accommodations: [],
        travelTips: {
          bestTimeToVisit: 'Summer',
          currency: 'USD',
          language: ['English'],
          timezone: 'EST',
          visaRequirements: 'None',
          healthAndSafety: [],
          transportation: {
            local: [],
            fromAirport: [],
          },
        },
        seo: {
          title: 'Test',
          description: 'Test',
          keywords: [],
        },
        lastUpdated: '2024-01-01',
        publishedAt: '2024-01-01',
        status: 'published' as const,
      }

      expect(isDestination(validDestination)).toBe(true)
    })

    it('should return false for null', () => {
      expect(isDestination(null)).toBe(false)
    })

    it('should return false for undefined', () => {
      expect(isDestination(undefined)).toBe(false)
    })

    it('should return false for non-object types', () => {
      expect(isDestination('string')).toBe(false)
      expect(isDestination(123)).toBe(false)
      expect(isDestination(true)).toBe(false)
      expect(isDestination([])).toBe(false)
    })

    it('should return false for object missing required fields', () => {
      const invalidDestination = {
        id: 'test-001',
        name: 'Test',
        // Missing slug, country, coordinates
      }

      expect(isDestination(invalidDestination)).toBe(false)
    })

    it('should return false for object with invalid coordinate types', () => {
      const invalidDestination = {
        id: 'test-001',
        slug: 'test',
        name: 'Test',
        country: 'Country',
        coordinates: {
          latitude: 'not-a-number', // Should be number
          longitude: -20.3,
        },
      }

      expect(isDestination(invalidDestination)).toBe(false)
    })

    it('should return false for object without coordinates', () => {
      const invalidDestination = {
        id: 'test-001',
        slug: 'test',
        name: 'Test',
        country: 'Country',
        // Missing coordinates
      }

      expect(isDestination(invalidDestination)).toBe(false)
    })
  })

  describe('isDestinationListItem', () => {
    it('should return true for valid destination list item', () => {
      const validItem: DestinationListItem = {
        id: 'test-001',
        slug: 'test-destination',
        name: 'Test Destination',
        country: 'Test Country',
        shortDescription: 'Short description',
        heroImage: {
          url: 'https://example.com/image.jpg',
          alt: 'Image',
          type: 'image',
        },
      }

      expect(isDestinationListItem(validItem)).toBe(true)
    })

    it('should return true for list item with optional fields', () => {
      const validItem = {
        id: 'test-001',
        slug: 'test-destination',
        name: 'Test Destination',
        country: 'Test Country',
        region: 'Test Region',
        shortDescription: 'Short description',
        heroImage: {
          url: 'https://example.com/image.jpg',
          alt: 'Image',
          type: 'image',
        },
        featured: true,
        popularity: 85,
        tags: ['beach', 'luxury'],
        packages: 3,
        startingPrice: 999,
      }

      expect(isDestinationListItem(validItem)).toBe(true)
    })

    it('should return false for null', () => {
      expect(isDestinationListItem(null)).toBe(false)
    })

    it('should return false for undefined', () => {
      expect(isDestinationListItem(undefined)).toBe(false)
    })

    it('should return false for non-object types', () => {
      expect(isDestinationListItem('string')).toBe(false)
      expect(isDestinationListItem(123)).toBe(false)
      expect(isDestinationListItem(true)).toBe(false)
      expect(isDestinationListItem([])).toBe(false)
    })

    it('should return false for object missing required fields', () => {
      const invalidItem = {
        id: 'test-001',
        name: 'Test',
        // Missing slug and country
      }

      expect(isDestinationListItem(invalidItem)).toBe(false)
    })

    it('should return false for object with wrong field types', () => {
      const invalidItem = {
        id: 123, // Should be string
        slug: 'test',
        name: 'Test',
        country: 'Country',
      }

      expect(isDestinationListItem(invalidItem)).toBe(false)
    })
  })

  describe('Type Validation', () => {
    it('should validate climate data structure', () => {
      const climate = {
        season: 'summer' as const,
        temperatureRange: {
          min: 70,
          max: 85,
        },
        description: 'Warm and sunny',
        rainfall: 2.5,
      }

      expect(climate.season).toMatch(/^(spring|summer|fall|winter)$/)
      expect(typeof climate.temperatureRange.min).toBe('number')
      expect(typeof climate.temperatureRange.max).toBe('number')
      expect(typeof climate.description).toBe('string')
    })

    it('should validate travel option structure', () => {
      const travelOption = {
        fromCity: 'New York',
        averageFlightTime: '4h 30m',
        averagePrice: {
          economy: 450,
          business: 1500,
        },
        airlines: ['Delta', 'American'],
        directFlights: true,
      }

      expect(typeof travelOption.fromCity).toBe('string')
      expect(typeof travelOption.averageFlightTime).toBe('string')
      expect(typeof travelOption.averagePrice.economy).toBe('number')
      expect(Array.isArray(travelOption.airlines)).toBe(true)
      expect(typeof travelOption.directFlights).toBe('boolean')
    })

    it('should validate attraction structure', () => {
      const attraction = {
        name: 'Beach Resort',
        description: 'Beautiful beach',
        category: 'nature' as const,
        price: '$50',
        duration: '2 hours',
        rating: 4.5,
      }

      expect(typeof attraction.name).toBe('string')
      expect(typeof attraction.description).toBe('string')
      expect(attraction.category).toMatch(
        /^(landmark|museum|nature|entertainment|dining|shopping|adventure)$/
      )
      expect(typeof attraction.rating).toBe('number')
      expect(attraction.rating).toBeGreaterThanOrEqual(0)
      expect(attraction.rating).toBeLessThanOrEqual(5)
    })

    it('should validate travel tips structure', () => {
      const travelTips = {
        bestTimeToVisit: 'December to April',
        currency: 'USD',
        language: ['English', 'Spanish'],
        timezone: 'EST',
        visaRequirements: 'No visa required',
        healthAndSafety: ['Drink bottled water'],
        transportation: {
          local: ['Taxi', 'Bus'],
          fromAirport: ['Shuttle', 'Taxi'],
        },
      }

      expect(typeof travelTips.bestTimeToVisit).toBe('string')
      expect(typeof travelTips.currency).toBe('string')
      expect(Array.isArray(travelTips.language)).toBe(true)
      expect(typeof travelTips.timezone).toBe('string')
      expect(typeof travelTips.visaRequirements).toBe('string')
      expect(Array.isArray(travelTips.healthAndSafety)).toBe(true)
      expect(Array.isArray(travelTips.transportation.local)).toBe(true)
      expect(Array.isArray(travelTips.transportation.fromAirport)).toBe(true)
    })
  })
})
