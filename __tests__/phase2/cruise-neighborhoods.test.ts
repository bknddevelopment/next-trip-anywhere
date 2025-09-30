/**
 * Unit tests for Cruise Neighborhood Guide data and functionality
 * Tests data integrity, export functions, and type safety
 */

import { describe, it, expect } from 'vitest'
import {
  cruiseNeighborhoods,
  getCruiseNeighborhoodsForSitemap,
  getRelatedNeighborhoods,
  type CruiseNeighborhood,
  type CabinCategory,
  type DeckAmenity,
} from '@/lib/data/cruise-neighborhoods'

describe('Cruise Neighborhood Data', () => {
  describe('Data Structure Validation', () => {
    it('should have at least 2 neighborhood guides', () => {
      expect(cruiseNeighborhoods.length).toBeGreaterThanOrEqual(2)
    })

    it('should have all required fields for each neighborhood', () => {
      cruiseNeighborhoods.forEach((neighborhood) => {
        // Required string fields
        expect(neighborhood.slug).toBeTruthy()
        expect(neighborhood.shipName).toBeTruthy()
        expect(neighborhood.cruiseLine).toBeTruthy()
        expect(neighborhood.neighborhoodName).toBeTruthy()
        expect(neighborhood.shipClass).toBeTruthy()
        expect(neighborhood.metaTitle).toBeTruthy()
        expect(neighborhood.metaDescription).toBeTruthy()
        expect(neighborhood.lastUpdated).toBeTruthy()

        // Required arrays
        expect(Array.isArray(neighborhood.deckNumbers)).toBe(true)
        expect(neighborhood.deckNumbers.length).toBeGreaterThan(0)
        expect(Array.isArray(neighborhood.keywords)).toBe(true)
        expect(neighborhood.keywords.length).toBeGreaterThan(0)

        // Priority field
        expect(['HIGH', 'MEDIUM', 'LOW']).toContain(neighborhood.priority)

        // Hero section
        expect(neighborhood.hero).toBeDefined()
        expect(neighborhood.hero.headline).toBeTruthy()
        expect(neighborhood.hero.subheadline).toBeTruthy()
        expect(Array.isArray(neighborhood.hero.highlights)).toBe(true)
        expect(neighborhood.hero.highlights.length).toBeGreaterThanOrEqual(3)

        // Overview
        expect(neighborhood.overview).toBeDefined()
        expect(neighborhood.overview.description.length).toBeGreaterThan(200)
        expect(Array.isArray(neighborhood.overview.bestFor)).toBe(true)
        expect(Array.isArray(neighborhood.overview.notIdealFor)).toBe(true)
        expect(neighborhood.overview.priceComparison).toBeTruthy()
      })
    })

    it('should have valid cruise line values', () => {
      const validCruiseLines = [
        'royal-caribbean',
        'carnival',
        'norwegian',
        'celebrity',
        'princess',
        'msc',
        'disney',
      ]

      cruiseNeighborhoods.forEach((neighborhood) => {
        expect(validCruiseLines).toContain(neighborhood.cruiseLine)
      })
    })

    it('should have unique slugs', () => {
      const slugs = cruiseNeighborhoods.map((n) => n.slug)
      const uniqueSlugs = new Set(slugs)
      expect(uniqueSlugs.size).toBe(slugs.length)
    })

    it('should have valid date format for lastUpdated', () => {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/
      cruiseNeighborhoods.forEach((neighborhood) => {
        expect(neighborhood.lastUpdated).toMatch(dateRegex)
      })
    })
  })

  describe('SEO Content Requirements', () => {
    it('should have meta titles under 60 characters', () => {
      cruiseNeighborhoods.forEach((neighborhood) => {
        expect(neighborhood.metaTitle.length).toBeLessThanOrEqual(60)
      })
    })

    it('should have meta descriptions under 160 characters', () => {
      cruiseNeighborhoods.forEach((neighborhood) => {
        expect(neighborhood.metaDescription.length).toBeLessThanOrEqual(160)
      })
    })

    it('should have at least 5 keywords per guide', () => {
      cruiseNeighborhoods.forEach((neighborhood) => {
        expect(neighborhood.keywords.length).toBeGreaterThanOrEqual(5)
      })
    })

    it('should mention Cape Liberty or Newark in local tips', () => {
      cruiseNeighborhoods.forEach((neighborhood) => {
        const combinedTips = neighborhood.localTips.join(' ').toLowerCase()
        const hasLocalMention =
          combinedTips.includes('cape liberty') ||
          combinedTips.includes('newark') ||
          combinedTips.includes('essex county')
        expect(hasLocalMention).toBe(true)
      })
    })

    it('should have contact phone number in local tips or cape liberty section', () => {
      cruiseNeighborhoods.forEach((neighborhood) => {
        const combinedText = [
          ...neighborhood.localTips,
          ...neighborhood.capeLiberty.embarkationTips,
        ].join(' ')
        const hasPhoneOrAgency =
          combinedText.includes('833-874-1019') || combinedText.includes('Next Trip Anywhere')
        expect(hasPhoneOrAgency).toBe(true)
      })
    })
  })

  describe('Cabin Categories', () => {
    it('should have at least one cabin category per neighborhood', () => {
      cruiseNeighborhoods.forEach((neighborhood) => {
        expect(neighborhood.cabinCategories.length).toBeGreaterThan(0)
      })
    })

    it('should have valid cabin category fields', () => {
      cruiseNeighborhoods.forEach((neighborhood) => {
        neighborhood.cabinCategories.forEach((cabin: CabinCategory) => {
          expect(cabin.type).toBeTruthy()
          expect(Array.isArray(cabin.decks)).toBe(true)
          expect(cabin.decks.length).toBeGreaterThan(0)
          expect(cabin.priceRange).toBeTruthy()
          expect(cabin.sqFootage).toBeTruthy()
          expect(cabin.occupancy).toBeTruthy()
          expect(Array.isArray(cabin.perks)).toBe(true)
          expect(cabin.perks.length).toBeGreaterThan(0)
        })
      })
    })
  })

  describe('Nearby Amenities', () => {
    it('should have nearby amenities listed', () => {
      cruiseNeighborhoods.forEach((neighborhood) => {
        expect(neighborhood.nearbyAmenities.length).toBeGreaterThan(0)
      })
    })

    it('should have valid amenity fields', () => {
      cruiseNeighborhoods.forEach((neighborhood) => {
        neighborhood.nearbyAmenities.forEach((amenity: DeckAmenity) => {
          expect(amenity.name).toBeTruthy()
          expect(amenity.deck).toBeTruthy()
          expect(amenity.walkingDistance).toBeTruthy()
          expect(amenity.description).toBeTruthy()
        })
      })
    })
  })

  describe('Deck Plan Information', () => {
    it('should have deck plan details', () => {
      cruiseNeighborhoods.forEach((neighborhood) => {
        expect(neighborhood.deckPlan).toBeDefined()
        expect(neighborhood.deckPlan.description).toBeTruthy()
        expect(Array.isArray(neighborhood.deckPlan.keyLocations)).toBe(true)
        expect(neighborhood.deckPlan.keyLocations.length).toBeGreaterThan(0)
        expect(Array.isArray(neighborhood.deckPlan.navigationTips)).toBe(true)
        expect(neighborhood.deckPlan.navigationTips.length).toBeGreaterThan(0)
      })
    })

    it('should have valid key location fields', () => {
      cruiseNeighborhoods.forEach((neighborhood) => {
        neighborhood.deckPlan.keyLocations.forEach((location) => {
          expect(location.location).toBeTruthy()
          expect(location.deck).toBeTruthy()
          expect(location.significance).toBeTruthy()
        })
      })
    })
  })

  describe('Pros and Cons', () => {
    it('should have at least 3 pros and 3 cons', () => {
      cruiseNeighborhoods.forEach((neighborhood) => {
        expect(neighborhood.prosAndCons.pros.length).toBeGreaterThanOrEqual(3)
        expect(neighborhood.prosAndCons.cons.length).toBeGreaterThanOrEqual(3)
      })
    })

    it('should have valid pros structure', () => {
      cruiseNeighborhoods.forEach((neighborhood) => {
        neighborhood.prosAndCons.pros.forEach((pro) => {
          expect(pro.point).toBeTruthy()
          expect(pro.detail).toBeTruthy()
        })
      })
    })

    it('should have valid cons structure with optional mitigation', () => {
      cruiseNeighborhoods.forEach((neighborhood) => {
        neighborhood.prosAndCons.cons.forEach((con) => {
          expect(con.point).toBeTruthy()
          // mitigation is optional
          if (con.mitigation) {
            expect(con.mitigation).toBeTruthy()
          }
        })
      })
    })
  })

  describe('Noise Considerations', () => {
    it('should have noise consideration details', () => {
      cruiseNeighborhoods.forEach((neighborhood) => {
        expect(Array.isArray(neighborhood.noiseConsiderations.quietAreas)).toBe(true)
        expect(Array.isArray(neighborhood.noiseConsiderations.noisyAreas)).toBe(true)
        expect(Array.isArray(neighborhood.noiseConsiderations.bestCabinsForSleep)).toBe(true)
        expect(Array.isArray(neighborhood.noiseConsiderations.avoidCabins)).toBe(true)
      })
    })
  })

  describe('Booking Tips', () => {
    it('should have at least 3 booking tips', () => {
      cruiseNeighborhoods.forEach((neighborhood) => {
        expect(neighborhood.bookingTips.length).toBeGreaterThanOrEqual(3)
      })
    })

    it('should have valid booking tip structure', () => {
      cruiseNeighborhoods.forEach((neighborhood) => {
        neighborhood.bookingTips.forEach((tip) => {
          expect(tip.title).toBeTruthy()
          expect(tip.description).toBeTruthy()
          // insiderNote is optional
        })
      })
    })
  })

  describe('Cape Liberty Section', () => {
    it('should have Cape Liberty specific information', () => {
      cruiseNeighborhoods.forEach((neighborhood) => {
        expect(neighborhood.capeLiberty).toBeDefined()
        expect(Array.isArray(neighborhood.capeLiberty.embarkationTips)).toBe(true)
        expect(neighborhood.capeLiberty.embarkationTips.length).toBeGreaterThan(0)
        expect(Array.isArray(neighborhood.capeLiberty.nearbyHotels)).toBe(true)
        expect(neighborhood.capeLiberty.parkingInfo).toBeTruthy()
      })
    })

    it('should have valid hotel information', () => {
      cruiseNeighborhoods.forEach((neighborhood) => {
        neighborhood.capeLiberty.nearbyHotels.forEach((hotel) => {
          expect(hotel.name).toBeTruthy()
          expect(hotel.distance).toBeTruthy()
          expect(typeof hotel.shuttleService).toBe('boolean')
        })
      })
    })
  })

  describe('FAQs', () => {
    it('should have at least 3 FAQs', () => {
      cruiseNeighborhoods.forEach((neighborhood) => {
        expect(neighborhood.faqs.length).toBeGreaterThanOrEqual(3)
      })
    })

    it('should have valid FAQ structure', () => {
      cruiseNeighborhoods.forEach((neighborhood) => {
        neighborhood.faqs.forEach((faq) => {
          expect(faq.question).toBeTruthy()
          expect(faq.answer).toBeTruthy()
          expect(faq.answer.length).toBeGreaterThan(50) // Substantial answers
        })
      })
    })
  })

  describe('Related Neighborhoods', () => {
    it('should have related neighborhoods listed', () => {
      cruiseNeighborhoods.forEach((neighborhood) => {
        expect(Array.isArray(neighborhood.relatedNeighborhoods)).toBe(true)
        // May be empty but should be an array
      })
    })

    it('should have valid related neighborhood structure', () => {
      cruiseNeighborhoods.forEach((neighborhood) => {
        neighborhood.relatedNeighborhoods.forEach((related) => {
          expect(related.slug).toBeTruthy()
          expect(related.name).toBeTruthy()
          expect(related.reason).toBeTruthy()
        })
      })
    })
  })
})

describe('Cruise Neighborhood Export Functions', () => {
  describe('getCruiseNeighborhoodsForSitemap', () => {
    it('should return array of sitemap entries', () => {
      const sitemapEntries = getCruiseNeighborhoodsForSitemap()
      expect(Array.isArray(sitemapEntries)).toBe(true)
      expect(sitemapEntries.length).toBe(cruiseNeighborhoods.length)
    })

    it('should have valid sitemap entry structure', () => {
      const sitemapEntries = getCruiseNeighborhoodsForSitemap()
      sitemapEntries.forEach((entry) => {
        expect(entry.url).toMatch(/^\/guides\/cruise-neighborhoods\//)
        expect(entry.lastModified).toBeTruthy()
        expect(entry.changeFrequency).toBe('weekly')
        expect(typeof entry.priority).toBe('number')
        expect(entry.priority).toBeGreaterThan(0)
        expect(entry.priority).toBeLessThanOrEqual(1)
      })
    })

    it('should map priorities correctly', () => {
      const sitemapEntries = getCruiseNeighborhoodsForSitemap()
      sitemapEntries.forEach((entry, index) => {
        const neighborhood = cruiseNeighborhoods[index]
        const expectedPriority =
          neighborhood.priority === 'HIGH' ? 0.9 : neighborhood.priority === 'MEDIUM' ? 0.7 : 0.5
        expect(entry.priority).toBe(expectedPriority)
      })
    })
  })

  describe('getRelatedNeighborhoods', () => {
    it('should return empty array for non-existent slug', () => {
      const related = getRelatedNeighborhoods('non-existent-slug')
      expect(related).toEqual([])
    })

    it('should return related neighborhoods for valid slug', () => {
      const firstNeighborhood = cruiseNeighborhoods[0]
      const related = getRelatedNeighborhoods(firstNeighborhood.slug)
      expect(Array.isArray(related)).toBe(true)
    })

    it('should respect limit parameter', () => {
      const firstNeighborhood = cruiseNeighborhoods[0]
      const related = getRelatedNeighborhoods(firstNeighborhood.slug, 2)
      expect(related.length).toBeLessThanOrEqual(2)
    })

    it('should not include the current neighborhood in results', () => {
      const firstNeighborhood = cruiseNeighborhoods[0]
      const related = getRelatedNeighborhoods(firstNeighborhood.slug)
      const slugs = related.map((n) => n.slug)
      expect(slugs).not.toContain(firstNeighborhood.slug)
    })

    it('should return CruiseNeighborhood objects', () => {
      const firstNeighborhood = cruiseNeighborhoods[0]
      const related = getRelatedNeighborhoods(firstNeighborhood.slug)
      if (related.length > 0) {
        const relatedNeighborhood = related[0]
        expect(relatedNeighborhood.slug).toBeDefined()
        expect(relatedNeighborhood.shipName).toBeDefined()
        expect(relatedNeighborhood.neighborhoodName).toBeDefined()
      }
    })
  })
})

describe('Content Quality Checks', () => {
  describe('Word Count Requirements', () => {
    it('should have substantial content in overview description (200+ words)', () => {
      cruiseNeighborhoods.forEach((neighborhood) => {
        const wordCount = neighborhood.overview.description.split(/\s+/).length
        expect(wordCount).toBeGreaterThanOrEqual(200)
      })
    })

    it('should have detailed deck plan description (50+ words)', () => {
      cruiseNeighborhoods.forEach((neighborhood) => {
        const wordCount = neighborhood.deckPlan.description.split(/\s+/).length
        expect(wordCount).toBeGreaterThanOrEqual(50)
      })
    })
  })

  describe('Local Essex County Integration', () => {
    it('should have Essex County specific tips', () => {
      cruiseNeighborhoods.forEach((neighborhood) => {
        expect(neighborhood.localTips.length).toBeGreaterThan(0)
      })
    })

    it('should mention Essex County, Newark, or Cape Liberty in content', () => {
      cruiseNeighborhoods.forEach((neighborhood) => {
        const allText = [
          neighborhood.overview.description,
          ...neighborhood.localTips,
          ...neighborhood.capeLiberty.embarkationTips,
          neighborhood.capeLiberty.parkingInfo,
        ]
          .join(' ')
          .toLowerCase()

        const hasLocalMention =
          allText.includes('essex county') ||
          allText.includes('newark') ||
          allText.includes('cape liberty')

        expect(hasLocalMention).toBe(true)
      })
    })
  })

  describe('Search Volume Data', () => {
    it('should have search volume data for priority guides', () => {
      cruiseNeighborhoods.forEach((neighborhood) => {
        if (neighborhood.priority === 'HIGH') {
          expect(neighborhood.searchVolume).toBeDefined()
          expect(typeof neighborhood.searchVolume).toBe('number')
          expect(neighborhood.searchVolume).toBeGreaterThan(0)
        }
      })
    })
  })
})
