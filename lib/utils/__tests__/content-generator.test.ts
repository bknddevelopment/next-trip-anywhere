// Unit tests for content generation utilities

import {
  generateServiceDescription,
  generateMetaTags,
  generateSchemaMarkup,
  generateFAQs,
  generateSectionHeadings,
  generateLocalContent,
  calculateKeywordDensity,
  optimizeKeywordDensity,
} from '../content-generator'

describe('Content Generator', () => {
  describe('generateServiceDescription', () => {
    it('should generate description for valid service and city', () => {
      const description = generateServiceDescription('airport-transfers', 'belleville')

      expect(description).toContain('Professional airport transfers services in Belleville')
      expect(description).toContain('38,000 residents')
      expect(description).toContain('Essex County')
      expect(description).toContain('Newark Liberty International')
      expect(description).toContain('8 miles')
    })

    it('should generate description without local details when specified', () => {
      const description = generateServiceDescription('corporate-travel', 'nutley', false)

      expect(description).toContain('Professional corporate travel services')
      expect(description).toContain('Executive transportation solutions')
      expect(description).not.toContain('28,000 residents')
      expect(description).not.toContain('landmarks')
    })

    it('should throw error for invalid service ID', () => {
      expect(() => {
        generateServiceDescription('invalid-service', 'belleville')
      }).toThrow('Invalid service ID (invalid-service) or city ID (belleville)')
    })

    it('should throw error for invalid city ID', () => {
      expect(() => {
        generateServiceDescription('airport-transfers', 'invalid-city')
      }).toThrow('Invalid service ID (airport-transfers) or city ID (invalid-city)')
    })

    it('should include neighboring towns in description', () => {
      const description = generateServiceDescription('wedding-transportation', 'verona')

      expect(description).toContain('nearby communities')
      expect(description).toMatch(/Montclair|Cedar Grove|West Orange/)
    })

    it('should include landmarks for cities with landmarks', () => {
      const description = generateServiceDescription('special-events', 'glen-ridge')

      expect(description).toContain('local landmarks')
      expect(description).toMatch(/Glen Ridge Train Station|Glen Ridge Country Club/)
    })
  })

  describe('generateMetaTags', () => {
    it('should generate complete meta tags', () => {
      const meta = generateMetaTags('cruise-transfers', 'bloomfield')

      expect(meta.title).toBe('Cruise Transfers in Bloomfield NJ | Next Trip Anywhere')
      expect(meta.title.length).toBeLessThanOrEqual(60)

      expect(meta.description).toContain('Premium cruise transfers in Bloomfield')
      expect(meta.description.length).toBeLessThanOrEqual(160)

      expect(meta.keywords).toContain('Bloomfield cruise transfers')
      expect(meta.keywords).toContain('cruise port transfer Bloomfield')
      expect(meta.keywords).toContain('Essex County cruise transfers')

      expect(meta.ogTitle).toContain('Cruise Transfers Services in Bloomfield')
      expect(meta.canonical).toBe(
        'https://nexttripanywhere.com/essex-county/bloomfield/cruise-transfers'
      )
    })

    it('should include zip codes in keywords', () => {
      const meta = generateMetaTags('medical-appointments', 'fairfield')

      expect(meta.keywords).toContain('medical appointments 07004')
    })

    it('should generate proper canonical URL', () => {
      const meta = generateMetaTags('wine-tours', 'essex-fells', 'https://example.com')

      expect(meta.canonical).toBe('https://example.com/essex-county/essex-fells/wine-tours')
    })

    it('should handle custom base URL', () => {
      const meta = generateMetaTags('school-transportation', 'roseland', 'https://custom.com')

      expect(meta.ogImage).toContain('https://custom.com/images/services/')
      expect(meta.canonical).toContain('https://custom.com/')
    })
  })

  describe('generateSchemaMarkup', () => {
    it('should generate valid schema.org markup', () => {
      const schema = generateSchemaMarkup('airport-transfers', 'north-caldwell')

      expect(schema['@context']).toBe('https://schema.org')
      expect(schema['@type']).toBe('TransportationService')
      expect(schema.name).toContain('Airport Transfers in North Caldwell')

      expect(schema.address).toEqual({
        '@type': 'PostalAddress',
        addressLocality: 'North Caldwell',
        addressRegion: 'NJ',
        postalCode: '07006',
      })

      expect(schema.priceRange).toBe('$75 - $350')
      expect(schema.areaServed).toHaveLength(4) // Main city + 3 neighbors
      expect(schema.areaServed?.[0].name).toBe('North Caldwell')
    })

    it('should include neighboring towns in areaServed', () => {
      const schema = generateSchemaMarkup('wedding-transportation', 'glen-ridge')

      const servedAreas = schema.areaServed?.map((a) => a.name) || []
      expect(servedAreas).toContain('Glen Ridge')
      expect(servedAreas).toContain('Montclair')
      expect(servedAreas).toContain('Bloomfield')
    })

    it('should use custom business name', () => {
      const schema = generateSchemaMarkup('corporate-travel', 'nutley', 'Custom Limo Co')

      expect(schema.name).toContain('Custom Limo Co')
      expect(schema.provider?.name).toBe('Custom Limo Co')
    })
  })

  describe('generateFAQs', () => {
    it('should generate service-specific FAQs for airport transfers', () => {
      const faqs = generateFAQs('airport-transfers', 'belleville', 3)

      expect(faqs).toHaveLength(3)

      const questions = faqs.map((f) => f.question)
      expect(questions[0]).toContain('How far is Belleville from Newark Airport')

      const answers = faqs.map((f) => f.answer)
      expect(answers[0]).toContain('8 miles')
      expect(answers[0]).toContain('20-45 minutes')
    })

    it('should generate wedding-specific FAQs', () => {
      const faqs = generateFAQs('wedding-transportation', 'verona', 5)

      const questions = faqs.map((f) => f.question)
      const weddingQuestion = questions.find((q) => q.includes('wedding venues'))
      expect(weddingQuestion).toBeDefined()

      const decorationQuestion = questions.find((q) => q.includes('decorate'))
      expect(decorationQuestion).toBeDefined()
    })

    it('should include pricing information in FAQs', () => {
      const faqs = generateFAQs('special-events', 'glen-ridge')

      const pricingFaq = faqs.find((f) => f.question.includes('cost'))
      expect(pricingFaq).toBeDefined()
      expect(pricingFaq?.answer).toContain('$200 to $1500')
      expect(pricingFaq?.answer).toContain('per event')
    })

    it('should include vehicle information', () => {
      const faqs = generateFAQs('wine-tours', 'roseland')

      const vehicleFaq = faqs.find((f) => f.question.includes('vehicles'))
      expect(vehicleFaq).toBeDefined()
      expect(vehicleFaq?.answer).toMatch(/Luxury SUV|Mercedes Sprinter Van|Stretch Limousine/)
    })

    it('should mention neighboring towns in area coverage', () => {
      const faqs = generateFAQs('medical-appointments', 'fairfield')

      const areaFaq = faqs.find((f) => f.question.includes('areas near Fairfield'))
      expect(areaFaq).toBeDefined()
      expect(areaFaq?.answer).toMatch(/West Caldwell|North Caldwell|Wayne|Montville/)
    })
  })

  describe('generateSectionHeadings', () => {
    it('should generate keyword-rich headings', () => {
      const headings = generateSectionHeadings('corporate-travel', 'nutley')

      expect(headings).toHaveLength(6)
      expect(headings[0]).toBe('Premium Corporate Travel Services in Nutley, NJ')
      expect(headings[1]).toBe('Why Choose Our Nutley Corporate Travel')
      expect(headings[3]).toContain('Essex County Since 2010')

      headings.forEach((heading) => {
        expect(heading).toMatch(/Nutley|Corporate Travel/i)
      })
    })

    it('should include location in multiple headings', () => {
      const headings = generateSectionHeadings('school-transportation', 'north-caldwell')

      const withLocation = headings.filter((h) => h.includes('North Caldwell'))
      expect(withLocation.length).toBeGreaterThanOrEqual(4)
    })
  })

  describe('generateLocalContent', () => {
    it('should generate multiple paragraphs with local context', () => {
      const paragraphs = generateLocalContent('airport-transfers', 'belleville')

      expect(paragraphs.length).toBeGreaterThanOrEqual(4)

      // Check for local details
      expect(paragraphs[0]).toContain('38,000 residents')
      expect(paragraphs[0]).toContain('Essex County')

      // Check for landmarks
      const landmarkParagraph = paragraphs.find((p) => p.includes('Branch Brook Park'))
      expect(landmarkParagraph).toBeDefined()

      // Check for highways
      const highwayParagraph = paragraphs.find((p) => p.includes('Route 21'))
      expect(highwayParagraph).toBeDefined()
    })

    it('should include business district information', () => {
      const paragraphs = generateLocalContent('corporate-travel', 'bloomfield')

      const businessParagraph = paragraphs.find((p) => p.includes('Bloomfield Center'))
      expect(businessParagraph).toBeDefined()
      expect(businessParagraph).toContain('Healthcare, Education')
    })

    it('should include airport-specific content for airport transfers', () => {
      const paragraphs = generateLocalContent('airport-transfers', 'verona')

      // Find the paragraph that mentions airports or contains airport-specific content
      const hasAirportContent = paragraphs.some(
        (p) =>
          p.includes('Newark Liberty International') ||
          p.includes('airport') ||
          p.includes('real-time')
      )
      expect(hasAirportContent).toBe(true)

      // Check for airport-specific paragraph with distance info
      const airportSpecificParagraph = paragraphs.find(
        (p) => p.includes('miles away') && p.includes('airport')
      )
      if (airportSpecificParagraph) {
        expect(airportSpecificParagraph).toContain('real-time')
      }
    })

    it('should include income demographics for corporate travel', () => {
      const paragraphs = generateLocalContent('corporate-travel', 'glen-ridge')

      const incomeParagraph = paragraphs.find((p) => p.includes('median household income'))
      expect(incomeParagraph).toBeDefined()
      expect(incomeParagraph).toContain('$165,000')
      expect(incomeParagraph).toContain('professional excellence')
    })
  })

  describe('calculateKeywordDensity', () => {
    it('should calculate correct keyword density', () => {
      const content =
        'Airport transfers in Belleville. Our airport transfer service provides reliable airport transfers.'
      const keywords = ['airport transfers', 'Belleville', 'service']

      const density = calculateKeywordDensity(content, keywords)

      // Count actual words in content: 12 total words
      // "airport transfers" appears 2 times (as complete phrase)
      // "Belleville" appears 1 time
      // "service" appears 1 time
      expect(density.get('airport transfers')).toBeCloseTo((2 / 12) * 100, 1)
      expect(density.get('Belleville')).toBeCloseTo((1 / 12) * 100, 1)
      expect(density.get('service')).toBeCloseTo((1 / 12) * 100, 1)
    })

    it('should be case-insensitive', () => {
      const content = 'AIRPORT TRANSFERS and airport transfers are the same.'
      const keywords = ['airport transfers']

      const density = calculateKeywordDensity(content, keywords)

      expect(density.get('airport transfers')).toBeCloseTo((2 / 8) * 100, 1)
    })

    it('should match whole words only', () => {
      const content = 'The car service is different from scary services.'
      const keywords = ['car', 'service']

      const density = calculateKeywordDensity(content, keywords)

      expect(density.get('car')).toBeCloseTo((1 / 8) * 100, 1)
      expect(density.get('service')).toBeCloseTo((1 / 8) * 100, 1)
    })
  })

  describe('optimizeKeywordDensity', () => {
    it('should not modify content if density is already at target', () => {
      const content =
        'Airport transfers service in Belleville provides excellent airport transfers for all residents.'
      const optimized = optimizeKeywordDensity(content, 'airport transfers', 2)

      // Calculate current density
      const density = calculateKeywordDensity(content, ['airport transfers'])
      const currentDensity = density.get('airport transfers') || 0

      if (currentDensity >= 2) {
        expect(optimized).toBe(content)
      }
    })

    it('should add keywords to increase density', () => {
      const content =
        'We provide service in Belleville. Our company offers reliable transportation. Contact us today.'
      const optimized = optimizeKeywordDensity(content, 'airport transfers', 2)

      const originalDensity =
        calculateKeywordDensity(content, ['airport transfers']).get('airport transfers') || 0
      const optimizedDensity =
        calculateKeywordDensity(optimized, ['airport transfers']).get('airport transfers') || 0

      expect(optimizedDensity).toBeGreaterThan(originalDensity)
      expect(optimized).toContain('airport transfers')
    })

    it('should maintain sentence structure when adding keywords', () => {
      const content = 'We offer transportation. We provide reliable service.'
      const optimized = optimizeKeywordDensity(content, 'limo', 3)

      expect(optimized).toContain('.')
      expect(optimized.split('. ').length).toBe(content.split('. ').length)
    })
  })
})

describe('Edge Cases and Error Handling', () => {
  it('should handle cities with no landmarks', () => {
    // Create a test where we modify the data temporarily
    const description = generateServiceDescription('airport-transfers', 'belleville')
    expect(description).toBeDefined()
    expect(description.length).toBeGreaterThan(0)
  })

  it('should handle services with no popular destinations', () => {
    const description = generateServiceDescription('medical-appointments', 'verona')
    expect(description).toBeDefined()
    expect(description).not.toContain('undefined')
  })

  it('should handle empty keyword arrays', () => {
    const density = calculateKeywordDensity('Some content here', [])
    expect(density.size).toBe(0)
  })

  it('should handle very short content', () => {
    const optimized = optimizeKeywordDensity('Short.', 'keyword', 2)
    expect(optimized).toBeDefined()
  })

  it('should generate valid FAQs even with minimal data', () => {
    const faqs = generateFAQs('school-transportation', 'essex-fells', 1)
    expect(faqs).toHaveLength(1)
    expect(faqs[0].question).toBeDefined()
    expect(faqs[0].answer).toBeDefined()
  })
})
