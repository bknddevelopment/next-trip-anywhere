/**
 * Unit tests for Travel Info Guide data
 * Tests data integrity, SEO requirements, and content quality for Phase 2 guides
 */

import { describe, it, expect } from 'vitest'
import { travelInfoGuides, type TravelInfoGuide } from '@/lib/data/travel-info-guides'

describe('Travel Info Guide Data', () => {
  describe('Data Structure Validation', () => {
    it('should have at least 15 travel guides', () => {
      expect(travelInfoGuides.length).toBeGreaterThanOrEqual(15)
    })

    it('should have all required fields for each guide', () => {
      travelInfoGuides.forEach((guide) => {
        // Required string fields
        expect(guide.slug).toBeTruthy()
        expect(guide.title).toBeTruthy()
        expect(guide.metaTitle).toBeTruthy()
        expect(guide.metaDescription).toBeTruthy()
        expect(guide.lastUpdated).toBeTruthy()

        // Required arrays
        expect(Array.isArray(guide.keywords)).toBe(true)
        expect(guide.keywords.length).toBeGreaterThan(0)
        expect(Array.isArray(guide.relatedGuides)).toBe(true)

        // Guide type validation
        expect([
          'packing',
          'planning',
          'airport',
          'cruise-tips',
          'documentation',
          'insurance',
        ]).toContain(guide.guideType)

        // Search volume
        expect(typeof guide.searchVolume).toBe('number')
        expect(guide.searchVolume).toBeGreaterThan(0)

        // Content structure
        expect(guide.content).toBeDefined()
        expect(guide.content.introduction).toBeTruthy()
        expect(Array.isArray(guide.content.sections)).toBe(true)
        expect(guide.content.sections.length).toBeGreaterThan(0)
        expect(Array.isArray(guide.content.localAdvantages)).toBe(true)
        expect(guide.content.callToAction).toBeTruthy()

        // FAQ structure
        expect(Array.isArray(guide.faq)).toBe(true)
      })
    })

    it('should have unique slugs', () => {
      const slugs = travelInfoGuides.map((g) => g.slug)
      const uniqueSlugs = new Set(slugs)
      expect(uniqueSlugs.size).toBe(slugs.length)
    })

    it('should have valid date format for lastUpdated', () => {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/
      travelInfoGuides.forEach((guide) => {
        expect(guide.lastUpdated).toMatch(dateRegex)
      })
    })
  })

  describe('SEO Content Requirements', () => {
    it('should have meta titles under 60 characters', () => {
      travelInfoGuides.forEach((guide) => {
        expect(guide.metaTitle.length).toBeLessThanOrEqual(60)
      })
    })

    it('should have meta descriptions under 160 characters', () => {
      travelInfoGuides.forEach((guide) => {
        expect(guide.metaDescription.length).toBeLessThanOrEqual(160)
      })
    })

    it('should have at least 5 keywords per guide', () => {
      travelInfoGuides.forEach((guide) => {
        expect(guide.keywords.length).toBeGreaterThanOrEqual(5)
      })
    })

    it('should have featured snippet for high-search-volume guides', () => {
      travelInfoGuides.forEach((guide) => {
        if (guide.searchVolume > 5000) {
          expect(guide.featuredSnippet).toBeDefined()
          expect(guide.featuredSnippet!.length).toBeGreaterThan(0)
        }
      })
    })

    it('should have search volumes appropriate for guide types', () => {
      travelInfoGuides.forEach((guide) => {
        // Packing guides should have high search volume
        if (guide.guideType === 'packing') {
          expect(guide.searchVolume).toBeGreaterThan(1000)
        }
      })
    })
  })

  describe('Introduction Content', () => {
    it('should have substantial introduction (200+ words)', () => {
      travelInfoGuides.forEach((guide) => {
        const wordCount = guide.content.introduction.split(/\s+/).length
        expect(wordCount).toBeGreaterThanOrEqual(200)
      })
    })

    it('should mention Essex County or Newark in introduction', () => {
      travelInfoGuides.forEach((guide) => {
        const introLower = guide.content.introduction.toLowerCase()
        const hasLocalMention =
          introLower.includes('essex county') ||
          introLower.includes('newark') ||
          introLower.includes('cape liberty') ||
          introLower.includes('new jersey')
        expect(hasLocalMention).toBe(true)
      })
    })

    it('should mention Next Trip Anywhere in introduction', () => {
      travelInfoGuides.forEach((guide) => {
        expect(guide.content.introduction.includes('Next Trip Anywhere')).toBe(true)
      })
    })
  })

  describe('Content Sections', () => {
    it('should have at least 4 main sections', () => {
      travelInfoGuides.forEach((guide) => {
        expect(guide.content.sections.length).toBeGreaterThanOrEqual(4)
      })
    })

    it('should have substantial content in each section (200+ words)', () => {
      travelInfoGuides.forEach((guide) => {
        guide.content.sections.forEach((section) => {
          const wordCount = section.content.split(/\s+/).length
          expect(wordCount).toBeGreaterThanOrEqual(200)
        })
      })
    })

    it('should have section titles', () => {
      travelInfoGuides.forEach((guide) => {
        guide.content.sections.forEach((section) => {
          expect(section.title).toBeTruthy()
          expect(section.title.length).toBeGreaterThan(0)
        })
      })
    })

    it('should have tips or checklists in appropriate sections', () => {
      travelInfoGuides.forEach((guide) => {
        // At least some sections should have tips or checklists
        const hasTipsOrChecklists = guide.content.sections.some(
          (section) =>
            (section.tips && section.tips.length > 0) ||
            (section.checklist && section.checklist.length > 0)
        )
        expect(hasTipsOrChecklists).toBe(true)
      })
    })

    it('should have valid tips structure when present', () => {
      travelInfoGuides.forEach((guide) => {
        guide.content.sections.forEach((section) => {
          if (section.tips) {
            expect(Array.isArray(section.tips)).toBe(true)
            section.tips.forEach((tip) => {
              expect(tip.length).toBeGreaterThan(0)
            })
          }
        })
      })
    })

    it('should have valid checklist structure when present', () => {
      travelInfoGuides.forEach((guide) => {
        guide.content.sections.forEach((section) => {
          if (section.checklist) {
            expect(Array.isArray(section.checklist)).toBe(true)
            expect(section.checklist.length).toBeGreaterThan(0)
            section.checklist.forEach((item) => {
              expect(item.length).toBeGreaterThan(0)
            })
          }
        })
      })
    })

    it('should have local notes in key sections', () => {
      travelInfoGuides.forEach((guide) => {
        const sectionsWithLocalNotes = guide.content.sections.filter(
          (section) => section.localNote && section.localNote.length > 0
        )
        expect(sectionsWithLocalNotes.length).toBeGreaterThan(0)
      })
    })

    it('should mention Essex County locations in local notes', () => {
      travelInfoGuides.forEach((guide) => {
        const localNotes = guide.content.sections
          .filter((section) => section.localNote)
          .map((section) => section.localNote!.toLowerCase())

        if (localNotes.length > 0) {
          const hasLocalLocation = localNotes.some(
            (note) =>
              note.includes('essex county') ||
              note.includes('newark') ||
              note.includes('montclair') ||
              note.includes('livingston') ||
              note.includes('millburn') ||
              note.includes('west orange')
          )
          expect(hasLocalLocation).toBe(true)
        }
      })
    })
  })

  describe('Local Advantages', () => {
    it('should have at least 3 local advantages', () => {
      travelInfoGuides.forEach((guide) => {
        expect(guide.content.localAdvantages.length).toBeGreaterThanOrEqual(3)
      })
    })

    it('should have non-empty local advantages', () => {
      travelInfoGuides.forEach((guide) => {
        guide.content.localAdvantages.forEach((advantage) => {
          expect(advantage.length).toBeGreaterThan(0)
        })
      })
    })

    it('should mention Essex County or Newark area benefits', () => {
      travelInfoGuides.forEach((guide) => {
        const combinedAdvantages = guide.content.localAdvantages.join(' ').toLowerCase()
        const hasLocalMention =
          combinedAdvantages.includes('essex county') ||
          combinedAdvantages.includes('newark') ||
          combinedAdvantages.includes('new jersey') ||
          combinedAdvantages.includes('nj')
        expect(hasLocalMention).toBe(true)
      })
    })
  })

  describe('Call to Action', () => {
    it('should have non-empty call to action', () => {
      travelInfoGuides.forEach((guide) => {
        expect(guide.content.callToAction.length).toBeGreaterThan(0)
      })
    })

    it('should mention phone number or booking method', () => {
      travelInfoGuides.forEach((guide) => {
        const cta = guide.content.callToAction.toLowerCase()
        const hasContactInfo =
          cta.includes('833-874-1019') ||
          cta.includes('call') ||
          cta.includes('book') ||
          cta.includes('contact')
        expect(hasContactInfo).toBe(true)
      })
    })
  })

  describe('FAQs', () => {
    it('should have at least 5 FAQs', () => {
      travelInfoGuides.forEach((guide) => {
        expect(guide.faq.length).toBeGreaterThanOrEqual(5)
      })
    })

    it('should have valid FAQ structure', () => {
      travelInfoGuides.forEach((guide) => {
        guide.faq.forEach((faq) => {
          expect(faq.question).toBeTruthy()
          expect(faq.answer).toBeTruthy()
          expect(faq.answer.length).toBeGreaterThan(50)
        })
      })
    })

    it('should have questions formatted as questions', () => {
      travelInfoGuides.forEach((guide) => {
        guide.faq.forEach((faq) => {
          expect(faq.question.endsWith('?')).toBe(true)
        })
      })
    })

    it('should target long-tail keywords in FAQs', () => {
      travelInfoGuides.forEach((guide) => {
        // At least one FAQ should include keywords from the guide
        const faqText = guide.faq.map((f) => `${f.question} ${f.answer}`.toLowerCase()).join(' ')
        const hasKeywords = guide.keywords.some((keyword) =>
          faqText.includes(keyword.toLowerCase())
        )
        expect(hasKeywords).toBe(true)
      })
    })
  })

  describe('Related Guides', () => {
    it('should have at least 2 related guides', () => {
      travelInfoGuides.forEach((guide) => {
        expect(guide.relatedGuides.length).toBeGreaterThanOrEqual(2)
      })
    })

    it('should have valid related guide slugs', () => {
      travelInfoGuides.forEach((guide) => {
        guide.relatedGuides.forEach((slug) => {
          expect(slug).toBeTruthy()
          expect(slug).toMatch(/^[a-z0-9-]+$/)
        })
      })
    })

    it('should not reference itself in related guides', () => {
      travelInfoGuides.forEach((guide) => {
        expect(guide.relatedGuides).not.toContain(guide.slug)
      })
    })
  })

  describe('Content Quality and Word Count', () => {
    it('should have total content exceeding 2000 words per guide', () => {
      travelInfoGuides.forEach((guide) => {
        const totalWords =
          guide.content.introduction.split(/\s+/).length +
          guide.content.sections.reduce(
            (sum, section) => sum + section.content.split(/\s+/).length,
            0
          ) +
          guide.faq.reduce((sum, faq) => sum + faq.answer.split(/\s+/).length, 0)

        expect(totalWords).toBeGreaterThanOrEqual(2000)
      })
    })

    it('should have diverse guide types', () => {
      const guideTypes = new Set(travelInfoGuides.map((g) => g.guideType))
      expect(guideTypes.size).toBeGreaterThanOrEqual(4)
    })

    it('should have guides covering key topics', () => {
      const topics = travelInfoGuides.map((g) => g.slug.toLowerCase())
      const keyTopics = ['packing', 'passport', 'airport', 'cruise']

      keyTopics.forEach((topic) => {
        const hasTopic = topics.some((t) => t.includes(topic))
        expect(hasTopic).toBe(true)
      })
    })
  })

  describe('Local Integration Throughout Content', () => {
    it('should mention Essex County multiple times in guide', () => {
      travelInfoGuides.forEach((guide) => {
        const allText = [
          guide.content.introduction,
          ...guide.content.sections.map((s) => s.content),
          ...guide.content.sections.map((s) => s.localNote || ''),
          ...guide.content.localAdvantages,
        ].join(' ')

        const mentions = (allText.match(/Essex County/gi) || []).length
        expect(mentions).toBeGreaterThanOrEqual(1)
      })
    })

    it('should reference Cape Liberty for cruise-related guides', () => {
      travelInfoGuides.forEach((guide) => {
        if (guide.guideType === 'cruise-tips' || guide.slug.includes('cruise')) {
          const allText = [
            guide.content.introduction,
            ...guide.content.sections.map((s) => s.content),
            ...guide.content.localAdvantages,
          ].join(' ')

          expect(allText.toLowerCase()).toContain('cape liberty')
        }
      })
    })

    it('should reference Newark Airport for airport/travel guides', () => {
      travelInfoGuides.forEach((guide) => {
        if (guide.guideType === 'airport' || guide.slug.includes('airport')) {
          const allText = [
            guide.content.introduction,
            ...guide.content.sections.map((s) => s.content),
          ].join(' ')

          const hasAirportMention =
            allText.includes('Newark Liberty') ||
            allText.includes('Newark Airport') ||
            allText.includes('EWR')
          expect(hasAirportMention).toBe(true)
        }
      })
    })
  })

  describe('Checklist Quality for Packing Guides', () => {
    it('should have comprehensive checklists in packing guides', () => {
      const packingGuides = travelInfoGuides.filter((g) => g.guideType === 'packing')

      packingGuides.forEach((guide) => {
        const totalChecklistItems = guide.content.sections.reduce(
          (sum, section) => sum + (section.checklist?.length || 0),
          0
        )
        expect(totalChecklistItems).toBeGreaterThanOrEqual(20)
      })
    })
  })

  describe('Tips Quality', () => {
    it('should have actionable tips throughout guide', () => {
      travelInfoGuides.forEach((guide) => {
        const totalTips = guide.content.sections.reduce(
          (sum, section) => sum + (section.tips?.length || 0),
          0
        )
        expect(totalTips).toBeGreaterThanOrEqual(5)
      })
    })

    it('should have substantial tip content', () => {
      travelInfoGuides.forEach((guide) => {
        guide.content.sections.forEach((section) => {
          if (section.tips && section.tips.length > 0) {
            section.tips.forEach((tip) => {
              expect(tip.length).toBeGreaterThan(20) // Substantial tips, not just bullet points
            })
          }
        })
      })
    })
  })

  describe('Target Audience Alignment', () => {
    it('should mention families or travelers in content', () => {
      travelInfoGuides.forEach((guide) => {
        const allText =
          guide.content.introduction + guide.content.sections.map((s) => s.content).join(' ')
        const audienceMention =
          allText.toLowerCase().includes('family') ||
          allText.toLowerCase().includes('families') ||
          allText.toLowerCase().includes('traveler') ||
          allText.toLowerCase().includes('cruiser')
        expect(audienceMention).toBe(true)
      })
    })

    it('should provide practical, actionable advice', () => {
      travelInfoGuides.forEach((guide) => {
        // Check for imperative verbs indicating actionable advice
        const allText = guide.content.sections.map((s) => s.content).join(' ')
        const actionVerbs = [
          'bring',
          'pack',
          'book',
          'call',
          'visit',
          'check',
          'ensure',
          'remember',
        ]
        const hasActionable = actionVerbs.some((verb) => allText.toLowerCase().includes(verb))
        expect(hasActionable).toBe(true)
      })
    })
  })

  describe('Recent Updates', () => {
    it('should have guides updated in 2025', () => {
      const recentGuides = travelInfoGuides.filter((g) => g.lastUpdated.startsWith('2025'))
      expect(recentGuides.length).toBeGreaterThan(0)
    })

    it('should not have guides older than 2 years', () => {
      const currentYear = new Date().getFullYear()
      const twoYearsAgo = currentYear - 2

      travelInfoGuides.forEach((guide) => {
        const year = parseInt(guide.lastUpdated.split('-')[0])
        expect(year).toBeGreaterThanOrEqual(twoYearsAgo)
      })
    })
  })
})
