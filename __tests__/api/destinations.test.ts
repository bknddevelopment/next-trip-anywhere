/**
 * @fileoverview Tests for destination API routes
 * @module __tests__/api/destinations.test
 */

import { describe, it, expect, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { GET as getDestinations } from '@/app/api/destinations/route'
import { GET as getDestination } from '@/app/api/destinations/[slug]/route'
import { GET as getFeatured } from '@/app/api/destinations/featured/route'
import { GET as getMetadata } from '@/app/api/destinations/metadata/route'

describe('Destination API Routes', () => {
  describe('GET /api/destinations', () => {
    it('should return paginated destinations', async () => {
      const request = new NextRequest('http://localhost:3000/api/destinations')
      const response = await getDestinations(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toHaveProperty('destinations')
      expect(data).toHaveProperty('total')
      expect(data).toHaveProperty('page')
      expect(data).toHaveProperty('perPage')
      expect(data).toHaveProperty('totalPages')
      expect(Array.isArray(data.destinations)).toBe(true)
    })

    it('should filter destinations by region', async () => {
      const request = new NextRequest('http://localhost:3000/api/destinations?region=caribbean')
      const response = await getDestinations(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      data.destinations.forEach((dest: any) => {
        expect(dest.region).toBe('caribbean')
      })
    })

    it('should search destinations by query', async () => {
      const request = new NextRequest('http://localhost:3000/api/destinations?q=cancun')
      const response = await getDestinations(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.destinations.length).toBeGreaterThan(0)
    })

    it('should handle pagination parameters', async () => {
      const request = new NextRequest('http://localhost:3000/api/destinations?page=2&perPage=5')
      const response = await getDestinations(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.page).toBe(2)
      expect(data.perPage).toBe(5)
      expect(data.destinations.length).toBeLessThanOrEqual(5)
    })

    it('should validate pagination parameters', async () => {
      const request = new NextRequest('http://localhost:3000/api/destinations?page=0')
      const response = await getDestinations(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error.message).toBe('Invalid page number')
    })

    it('should validate perPage limits', async () => {
      const request = new NextRequest('http://localhost:3000/api/destinations?perPage=200')
      const response = await getDestinations(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error.message).toBe('Items per page must be between 1 and 100')
    })

    it('should include proper cache headers', async () => {
      const request = new NextRequest('http://localhost:3000/api/destinations')
      const response = await getDestinations(request)

      expect(response.headers.get('Cache-Control')).toContain('public')
      expect(response.headers.get('Cache-Control')).toContain('max-age=600')
      expect(response.headers.get('Content-Type')).toBe('application/json')
    })
  })

  describe('GET /api/destinations/[slug]', () => {
    it('should return a destination by slug', async () => {
      const request = new NextRequest('http://localhost:3000/api/destinations/cancun-mexico')
      const response = await getDestination(request, { params: { slug: 'cancun-mexico' } })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.destination).toBeDefined()
      expect(data.destination.slug).toBe('cancun-mexico')
      expect(data.destination.name).toBe('Cancun')
    })

    it('should return 404 for non-existent destination', async () => {
      const request = new NextRequest('http://localhost:3000/api/destinations/non-existent')
      const response = await getDestination(request, { params: { slug: 'non-existent' } })
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.error.message).toContain('not found')
    })

    it('should include related destinations when requested', async () => {
      const request = new NextRequest(
        'http://localhost:3000/api/destinations/cancun-mexico?includeRelated=true'
      )
      const response = await getDestination(request, { params: { slug: 'cancun-mexico' } })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.destination).toBeDefined()
      expect(data.relatedDestinations).toBeDefined()
      expect(Array.isArray(data.relatedDestinations)).toBe(true)
    })

    it('should respect relatedLimit parameter', async () => {
      const request = new NextRequest(
        'http://localhost:3000/api/destinations/cancun-mexico?includeRelated=true&relatedLimit=2'
      )
      const response = await getDestination(request, { params: { slug: 'cancun-mexico' } })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.relatedDestinations).toBeDefined()
      expect(data.relatedDestinations.length).toBeLessThanOrEqual(2)
    })

    it('should include ETag header', async () => {
      const request = new NextRequest('http://localhost:3000/api/destinations/cancun-mexico')
      const response = await getDestination(request, { params: { slug: 'cancun-mexico' } })

      expect(response.headers.get('ETag')).toBeDefined()
    })

    it('should validate slug parameter', async () => {
      const request = new NextRequest('http://localhost:3000/api/destinations/')
      const response = await getDestination(request, { params: { slug: '' } })
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error.message).toContain('required')
    })
  })

  describe('GET /api/destinations/featured', () => {
    it('should return featured destinations', async () => {
      const request = new NextRequest('http://localhost:3000/api/destinations/featured')
      const response = await getFeatured(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.destinations).toBeDefined()
      expect(Array.isArray(data.destinations)).toBe(true)
      expect(data.total).toBeDefined()

      data.destinations.forEach((dest: any) => {
        expect(dest.featured).toBe(true)
      })
    })

    it('should respect limit parameter', async () => {
      const request = new NextRequest('http://localhost:3000/api/destinations/featured?limit=3')
      const response = await getFeatured(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.destinations.length).toBeLessThanOrEqual(3)
    })

    it('should validate limit parameter', async () => {
      const request = new NextRequest('http://localhost:3000/api/destinations/featured?limit=50')
      const response = await getFeatured(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Limit must be between 1 and 20')
    })

    it('should use default limit when not specified', async () => {
      const request = new NextRequest('http://localhost:3000/api/destinations/featured')
      const response = await getFeatured(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.destinations.length).toBeLessThanOrEqual(6) // Default limit
    })
  })

  describe('GET /api/destinations/metadata', () => {
    it('should return destination metadata', async () => {
      const request = new NextRequest('http://localhost:3000/api/destinations/metadata')
      const response = await getMetadata(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.regions).toBeDefined()
      expect(data.countries).toBeDefined()
      expect(data.tags).toBeDefined()
      expect(data.totals).toBeDefined()

      expect(Array.isArray(data.regions)).toBe(true)
      expect(Array.isArray(data.countries)).toBe(true)
      expect(Array.isArray(data.tags)).toBe(true)
    })

    it('should return sorted metadata', async () => {
      const request = new NextRequest('http://localhost:3000/api/destinations/metadata')
      const response = await getMetadata(request)
      const data = await response.json()

      // Check if arrays are sorted
      const isSorted = (arr: string[]) => {
        for (let i = 1; i < arr.length; i++) {
          if (arr[i - 1] > arr[i]) {
            return false
          }
        }
        return true
      }

      expect(isSorted(data.regions)).toBe(true)
      expect(isSorted(data.countries)).toBe(true)
      expect(isSorted(data.tags)).toBe(true)
    })

    it('should include totals for each metadata type', async () => {
      const request = new NextRequest('http://localhost:3000/api/destinations/metadata')
      const response = await getMetadata(request)
      const data = await response.json()

      expect(data.totals.regions).toBe(data.regions.length)
      expect(data.totals.countries).toBe(data.countries.length)
      expect(data.totals.tags).toBe(data.tags.length)
    })

    it('should include longer cache headers for metadata', async () => {
      const request = new NextRequest('http://localhost:3000/api/destinations/metadata')
      const response = await getMetadata(request)

      expect(response.headers.get('Cache-Control')).toContain('s-maxage=3600') // 1 hour
    })
  })

  // CORS tests are temporarily disabled as OPTIONS exports are handled by middleware
  // describe('CORS Headers', () => {
  //   it('should handle OPTIONS requests for /api/destinations', async () => {
  //     const { OPTIONS } = await import('@/app/api/destinations/route')
  //     const request = new NextRequest('http://localhost:3000/api/destinations')
  //     const response = await OPTIONS(request)

  //     expect(response.status).toBe(200)
  //     expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*')
  //     expect(response.headers.get('Access-Control-Allow-Methods')).toContain('GET')
  //   })

  //   it('should handle OPTIONS requests for /api/destinations/[slug]', async () => {
  //     const { OPTIONS } = await import('@/app/api/destinations/[slug]/route')
  //     const request = new NextRequest('http://localhost:3000/api/destinations/test')
  //     const response = await OPTIONS(request)

  //     expect(response.status).toBe(200)
  //     expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*')
  //   })
  // })
})
