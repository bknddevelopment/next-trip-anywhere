/**
 * Unit tests for Disney Room Guide data
 * Tests data integrity, SEO requirements, and content quality
 */

import { describe, it, expect } from 'vitest'
import { disneyRoomGuides, type DisneyRoomGuide } from '@/lib/data/disney-room-guides'

describe('Disney Room Guide Data', () => {
  describe('Data Structure Validation', () => {
    it('should have at least 5 room guides', () => {
      expect(disneyRoomGuides.length).toBeGreaterThanOrEqual(5)
    })

    it('should have all required fields for each room guide', () => {
      disneyRoomGuides.forEach((guide) => {
        // Required string fields
        expect(guide.slug).toBeTruthy()
        expect(guide.roomNumber).toBeTruthy()
        expect(guide.resort).toBeTruthy()
        expect(guide.resortSlug).toBeTruthy()
        expect(guide.metaTitle).toBeTruthy()
        expect(guide.metaDescription).toBeTruthy()
        expect(guide.overview).toBeTruthy()
        expect(guide.lastUpdated).toBeTruthy()

        // Required arrays
        expect(Array.isArray(guide.keywords)).toBe(true)
        expect(guide.keywords.length).toBeGreaterThan(0)
        expect(Array.isArray(guide.roomFeatures)).toBe(true)
        expect(guide.roomFeatures.length).toBeGreaterThan(0)

        // Category validation
        expect(['standard', 'preferred', 'deluxe', 'suite', 'villa']).toContain(guide.category)

        // View type validation
        expect(['theme-park', 'water', 'garden', 'parking', 'pool', 'savanna']).toContain(
          guide.viewType
        )

        // Priority validation
        expect(['HIGH', 'MEDIUM', 'LOW']).toContain(guide.priority)
      })
    })

    it('should have unique slugs', () => {
      const slugs = disneyRoomGuides.map((g) => g.slug)
      const uniqueSlugs = new Set(slugs)
      expect(uniqueSlugs.size).toBe(slugs.length)
    })

    it('should have unique room numbers per resort', () => {
      const resortRooms = new Map<string, Set<string>>()

      disneyRoomGuides.forEach((guide) => {
        if (!resortRooms.has(guide.resort)) {
          resortRooms.set(guide.resort, new Set())
        }
        const rooms = resortRooms.get(guide.resort)!
        expect(rooms.has(guide.roomNumber)).toBe(false)
        rooms.add(guide.roomNumber)
      })
    })

    it('should have valid date format for lastUpdated', () => {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/
      disneyRoomGuides.forEach((guide) => {
        expect(guide.lastUpdated).toMatch(dateRegex)
      })
    })

    it('should have numeric floor values when present', () => {
      disneyRoomGuides.forEach((guide) => {
        if (guide.floor !== undefined) {
          expect(typeof guide.floor).toBe('number')
          expect(guide.floor).toBeGreaterThan(0)
        }
      })
    })
  })

  describe('SEO Content Requirements', () => {
    it('should have meta titles under 60 characters', () => {
      disneyRoomGuides.forEach((guide) => {
        expect(guide.metaTitle.length).toBeLessThanOrEqual(60)
      })
    })

    it('should have meta descriptions under 160 characters', () => {
      disneyRoomGuides.forEach((guide) => {
        expect(guide.metaDescription.length).toBeLessThanOrEqual(160)
      })
    })

    it('should have at least 5 keywords per guide', () => {
      disneyRoomGuides.forEach((guide) => {
        expect(guide.keywords.length).toBeGreaterThanOrEqual(5)
      })
    })

    it('should include room number in keywords', () => {
      disneyRoomGuides.forEach((guide) => {
        const keywordsLower = guide.keywords.map((k) => k.toLowerCase())
        const hasRoomNumber = keywordsLower.some((k) => k.includes(guide.roomNumber))
        expect(hasRoomNumber).toBe(true)
      })
    })

    it('should have search volume for HIGH priority guides', () => {
      disneyRoomGuides.forEach((guide) => {
        if (guide.priority === 'HIGH') {
          expect(guide.searchVolume).toBeDefined()
          expect(typeof guide.searchVolume).toBe('number')
          expect(guide.searchVolume).toBeGreaterThan(0)
        }
      })
    })
  })

  describe('Hero Section', () => {
    it('should have complete hero section', () => {
      disneyRoomGuides.forEach((guide) => {
        expect(guide.hero).toBeDefined()
        expect(guide.hero.headline).toBeTruthy()
        expect(guide.hero.subheadline).toBeTruthy()
      })
    })

    it('should mention room number in hero headline or subheadline', () => {
      disneyRoomGuides.forEach((guide) => {
        const heroText = `${guide.hero.headline} ${guide.hero.subheadline}`
        expect(heroText.includes(guide.roomNumber)).toBe(true)
      })
    })
  })

  describe('Overview Content', () => {
    it('should have substantial overview (200+ words)', () => {
      disneyRoomGuides.forEach((guide) => {
        const wordCount = guide.overview.split(/\s+/).length
        expect(wordCount).toBeGreaterThanOrEqual(200)
      })
    })

    it('should mention Essex County or Newark in overview', () => {
      disneyRoomGuides.forEach((guide) => {
        const overviewLower = guide.overview.toLowerCase()
        const hasLocalMention =
          overviewLower.includes('essex county') ||
          overviewLower.includes('newark') ||
          overviewLower.includes('new jersey')
        expect(hasLocalMention).toBe(true)
      })
    })

    it('should mention Next Trip Anywhere in overview', () => {
      disneyRoomGuides.forEach((guide) => {
        const hasAgencyMention = guide.overview.includes('Next Trip Anywhere')
        expect(hasAgencyMention).toBe(true)
      })
    })
  })

  describe('Room Features', () => {
    it('should have at least 5 room features', () => {
      disneyRoomGuides.forEach((guide) => {
        expect(guide.roomFeatures.length).toBeGreaterThanOrEqual(5)
      })
    })

    it('should have non-empty feature descriptions', () => {
      disneyRoomGuides.forEach((guide) => {
        guide.roomFeatures.forEach((feature) => {
          expect(feature.length).toBeGreaterThan(0)
        })
      })
    })
  })

  describe('Views Section', () => {
    it('should have complete views information', () => {
      disneyRoomGuides.forEach((guide) => {
        expect(guide.views).toBeDefined()
        expect(guide.views.description).toBeTruthy()
        expect(Array.isArray(guide.views.whatYouSee)).toBe(true)
        expect(guide.views.whatYouSee.length).toBeGreaterThan(0)
      })
    })

    it('should have descriptive view details', () => {
      disneyRoomGuides.forEach((guide) => {
        expect(guide.views.description.length).toBeGreaterThan(50)
        expect(guide.views.whatYouSee.length).toBeGreaterThanOrEqual(3)
      })
    })

    it('should have best time for photos when view type is scenic', () => {
      disneyRoomGuides.forEach((guide) => {
        if (
          ['theme-park', 'water', 'savanna'].includes(guide.viewType) &&
          guide.priority === 'HIGH'
        ) {
          expect(guide.views.bestTimeForPhotos).toBeDefined()
        }
      })
    })
  })

  describe('Location Information', () => {
    it('should have complete location details', () => {
      disneyRoomGuides.forEach((guide) => {
        expect(guide.location).toBeDefined()
        expect(guide.location.walkToLobby).toBeTruthy()
        expect(guide.location.walkToPool).toBeTruthy()
        expect(guide.location.walkToDining).toBeTruthy()
        expect(guide.location.walkToTransportation).toBeTruthy()
        expect(guide.location.proximityNotes).toBeTruthy()
      })
    })

    it('should include time estimates in walking distances', () => {
      disneyRoomGuides.forEach((guide) => {
        const location = guide.location
        const timePattern = /\d+\s*(minute|min)/i

        expect(location.walkToLobby).toMatch(timePattern)
        expect(location.walkToPool).toMatch(timePattern)
        expect(location.walkToDining).toMatch(timePattern)
        expect(location.walkToTransportation).toMatch(timePattern)
      })
    })
  })

  describe('Pros and Cons', () => {
    it('should have at least 3 pros and 3 cons', () => {
      disneyRoomGuides.forEach((guide) => {
        expect(guide.prosAndCons.pros.length).toBeGreaterThanOrEqual(3)
        expect(guide.prosAndCons.cons.length).toBeGreaterThanOrEqual(3)
      })
    })

    it('should have non-empty pros and cons', () => {
      disneyRoomGuides.forEach((guide) => {
        guide.prosAndCons.pros.forEach((pro) => {
          expect(pro.length).toBeGreaterThan(0)
        })
        guide.prosAndCons.cons.forEach((con) => {
          expect(con.length).toBeGreaterThan(0)
        })
      })
    })

    it('should have balanced pros and cons', () => {
      disneyRoomGuides.forEach((guide) => {
        const prosCount = guide.prosAndCons.pros.length
        const consCount = guide.prosAndCons.cons.length
        const ratio = Math.max(prosCount, consCount) / Math.min(prosCount, consCount)
        // Ratio should not be too skewed (max 2:1)
        expect(ratio).toBeLessThanOrEqual(2)
      })
    })
  })

  describe('How To Request', () => {
    it('should have at least 3 request tips', () => {
      disneyRoomGuides.forEach((guide) => {
        expect(guide.howToRequest.length).toBeGreaterThanOrEqual(3)
      })
    })

    it('should mention phone number 833-874-1019', () => {
      disneyRoomGuides.forEach((guide) => {
        const combinedText = guide.howToRequest.join(' ')
        expect(combinedText.includes('833-874-1019')).toBe(true)
      })
    })

    it('should mention the specific room number', () => {
      disneyRoomGuides.forEach((guide) => {
        const combinedText = guide.howToRequest.join(' ')
        expect(combinedText.includes(guide.roomNumber)).toBe(true)
      })
    })
  })

  describe('Alternative Rooms', () => {
    it('should have at least 2 alternative rooms', () => {
      disneyRoomGuides.forEach((guide) => {
        expect(guide.alternativeRooms.length).toBeGreaterThanOrEqual(2)
      })
    })

    it('should have valid alternative room structure', () => {
      disneyRoomGuides.forEach((guide) => {
        guide.alternativeRooms.forEach((alt) => {
          expect(alt.roomNumber).toBeTruthy()
          expect(alt.reason).toBeTruthy()
          expect(alt.reason.length).toBeGreaterThan(10)
        })
      })
    })

    it('should not include the same room as an alternative', () => {
      disneyRoomGuides.forEach((guide) => {
        const altRooms = guide.alternativeRooms.map((a) => a.roomNumber)
        expect(altRooms).not.toContain(guide.roomNumber)
      })
    })
  })

  describe('Local Tips for Essex County', () => {
    it('should have at least 3 local tips', () => {
      disneyRoomGuides.forEach((guide) => {
        expect(guide.localTips.length).toBeGreaterThanOrEqual(3)
      })
    })

    it('should mention Newark, Essex County, or New Jersey', () => {
      disneyRoomGuides.forEach((guide) => {
        const combinedTips = guide.localTips.join(' ').toLowerCase()
        const hasLocalMention =
          combinedTips.includes('newark') ||
          combinedTips.includes('essex county') ||
          combinedTips.includes('new jersey')
        expect(hasLocalMention).toBe(true)
      })
    })

    it('should have practical, actionable tips', () => {
      disneyRoomGuides.forEach((guide) => {
        guide.localTips.forEach((tip) => {
          expect(tip.length).toBeGreaterThan(20) // Substantial tips
        })
      })
    })
  })

  describe('FAQs', () => {
    it('should have at least 3 FAQs', () => {
      disneyRoomGuides.forEach((guide) => {
        expect(guide.faqs.length).toBeGreaterThanOrEqual(3)
      })
    })

    it('should have valid FAQ structure', () => {
      disneyRoomGuides.forEach((guide) => {
        guide.faqs.forEach((faq) => {
          expect(faq.question).toBeTruthy()
          expect(faq.answer).toBeTruthy()
          expect(faq.question.length).toBeGreaterThan(10)
          expect(faq.answer.length).toBeGreaterThan(50)
        })
      })
    })

    it('should mention room number in at least one FAQ', () => {
      disneyRoomGuides.forEach((guide) => {
        const combinedFAQ = guide.faqs.map((f) => `${f.question} ${f.answer}`).join(' ')
        expect(combinedFAQ.includes(guide.roomNumber)).toBe(true)
      })
    })

    it('should have questions formatted as questions', () => {
      disneyRoomGuides.forEach((guide) => {
        guide.faqs.forEach((faq) => {
          expect(faq.question.endsWith('?')).toBe(true)
        })
      })
    })
  })

  describe('Content Quality', () => {
    it('should have high-priority guides for popular resorts', () => {
      const popularResorts = [
        'Grand Floridian',
        'Contemporary',
        'Polynesian',
        'Beach Club',
        'Animal Kingdom Lodge',
      ]

      const highPriorityGuides = disneyRoomGuides.filter((g) => g.priority === 'HIGH')

      popularResorts.forEach((resort) => {
        const hasGuide = highPriorityGuides.some((g) => g.resort.includes(resort))
        expect(hasGuide).toBe(true)
      })
    })

    it('should have consistent resort slug format', () => {
      disneyRoomGuides.forEach((guide) => {
        // Resort slug should be lowercase with hyphens
        expect(guide.resortSlug).toMatch(/^[a-z]+(-[a-z]+)*$/)
      })
    })

    it('should match slug to room and resort', () => {
      disneyRoomGuides.forEach((guide) => {
        expect(guide.slug.includes(guide.resortSlug)).toBe(true)
        expect(guide.slug.includes(guide.roomNumber)).toBe(true)
      })
    })

    it('should have building info for resorts with multiple buildings', () => {
      const multiBuilding = ['Contemporary', 'Polynesian', 'Beach Club', 'Caribbean Beach']

      disneyRoomGuides.forEach((guide) => {
        const needsBuilding = multiBuilding.some((resort) => guide.resort.includes(resort))
        if (needsBuilding && guide.priority === 'HIGH') {
          expect(guide.building).toBeDefined()
        }
      })
    })
  })

  describe('Target Keyword Integration', () => {
    it('should include room number in meta title', () => {
      disneyRoomGuides.forEach((guide) => {
        expect(guide.metaTitle.includes(guide.roomNumber)).toBe(true)
      })
    })

    it('should include resort name in meta title', () => {
      disneyRoomGuides.forEach((guide) => {
        const resortKeywords = guide.resort.split(' ').filter((word) => word.length > 3)
        const hasResortName = resortKeywords.some((keyword) => guide.metaTitle.includes(keyword))
        expect(hasResortName).toBe(true)
      })
    })

    it('should target long-tail keywords in FAQs', () => {
      disneyRoomGuides.forEach((guide) => {
        // At least one FAQ should target "room [number]" keyword
        const hasTargetedFAQ = guide.faqs.some((faq) =>
          faq.question.toLowerCase().includes(`room ${guide.roomNumber}`)
        )
        expect(hasTargetedFAQ).toBe(true)
      })
    })
  })

  describe('Call to Action Integration', () => {
    it('should mention Next Trip Anywhere in multiple sections', () => {
      disneyRoomGuides.forEach((guide) => {
        const allText = [
          guide.overview,
          ...guide.howToRequest,
          ...guide.localTips,
          ...guide.faqs.map((f) => f.answer),
        ].join(' ')

        const mentions = (allText.match(/Next Trip Anywhere/g) || []).length
        expect(mentions).toBeGreaterThanOrEqual(2)
      })
    })

    it('should have phone number in how to request section', () => {
      disneyRoomGuides.forEach((guide) => {
        const hasPhone = guide.howToRequest.some((tip) => tip.includes('833-874-1019'))
        expect(hasPhone).toBe(true)
      })
    })
  })
})
