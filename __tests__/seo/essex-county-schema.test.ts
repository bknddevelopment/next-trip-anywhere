/**
 * Unit tests for Essex County schema generation
 */

import {
  generateEssexCountyLocalBusinessSchema,
  generateTownSpecificSchema,
  generateEssexCountyServiceSchema,
  generateBookingActionSchema,
  generateEssexCountySchemaGraph,
  validateSchema,
  ESSEX_COUNTY_TOWNS,
  NEWARK_OFFICE,
  BUSINESS_HOURS,
  PAYMENT_METHODS,
} from '@/lib/seo/essex-county-schema'

describe('Essex County Schema Generation', () => {
  describe('generateEssexCountyLocalBusinessSchema', () => {
    it('should generate valid LocalBusiness and TravelAgency schema', () => {
      const schema = generateEssexCountyLocalBusinessSchema()

      // Check required fields
      expect(schema['@context']).toBe('https://schema.org')
      expect(schema['@type']).toEqual(['LocalBusiness', 'TravelAgency'])
      expect(schema.name).toBe('Next Trip Anywhere - Essex County')
      expect(schema.telephone).toBe(NEWARK_OFFICE.phone)
      expect(schema.email).toBe(NEWARK_OFFICE.email)

      // Check address
      expect(schema.address).toBeDefined()
      expect(schema.address.streetAddress).toBe('Online Travel Services')
      expect(schema.address.addressLocality).toBe(NEWARK_OFFICE.city)
      expect(schema.address.addressRegion).toBe(NEWARK_OFFICE.state)
      expect(schema.address.postalCode).toBe(NEWARK_OFFICE.postalCode)
      expect(schema.address.addressCountry).toBe(NEWARK_OFFICE.country)

      // Check geo coordinates
      expect(schema.geo).toBeDefined()
      expect(schema.geo.latitude).toBe(NEWARK_OFFICE.coordinates.latitude)
      expect(schema.geo.longitude).toBe(NEWARK_OFFICE.coordinates.longitude)

      // Check opening hours
      expect(schema.openingHours).toEqual(BUSINESS_HOURS.regular)
      expect(schema.openingHoursSpecification).toEqual(BUSINESS_HOURS.specialHours)

      // Check payment methods
      expect(schema.paymentAccepted).toEqual(PAYMENT_METHODS)
      expect(schema.currenciesAccepted).toBe('USD')
      expect(schema.priceRange).toBe('$$')

      // Check aggregate rating
      expect(schema.aggregateRating).toBeDefined()
      expect(schema.aggregateRating.ratingValue).toBe(4.8)
      expect(schema.aggregateRating.reviewCount).toBe(3247)
      expect(schema.aggregateRating.bestRating).toBe(5)
      expect(schema.aggregateRating.worstRating).toBe(1)

      // Check area served includes all Essex County towns
      expect(schema.areaServed).toBeDefined()
      expect(Array.isArray(schema.areaServed)).toBe(true)

      const townNames = schema.areaServed
        .filter((area: any) => area['@type'] === 'City')
        .map((area: any) => area.name)

      ESSEX_COUNTY_TOWNS.forEach((town) => {
        expect(townNames).toContain(town.name)
      })

      // Check service area
      expect(schema.serviceArea).toBeDefined()
      expect(schema.serviceArea['@type']).toBe('AdministrativeArea')
      expect(schema.serviceArea.name).toBe('Essex County')

      // Check potential actions
      expect(schema.potentialAction).toBeDefined()
      expect(Array.isArray(schema.potentialAction)).toBe(true)
      expect(schema.potentialAction.length).toBeGreaterThan(0)

      // Check contact points
      expect(schema.contactPoint).toBeDefined()
      expect(Array.isArray(schema.contactPoint)).toBe(true)
      expect(schema.contactPoint.length).toBeGreaterThanOrEqual(2)

      // Validate schema
      expect(validateSchema(schema)).toBe(true)
    })

    it('should include all required review properties', () => {
      const schema = generateEssexCountyLocalBusinessSchema()

      expect(schema.review).toBeDefined()
      expect(Array.isArray(schema.review)).toBe(true)
      expect(schema.review.length).toBeGreaterThan(0)

      schema.review.forEach((review: any) => {
        expect(review['@type']).toBe('Review')
        expect(review.author).toBeDefined()
        expect(review.datePublished).toBeDefined()
        expect(review.reviewBody).toBeDefined()
        expect(review.reviewRating).toBeDefined()
        expect(review.reviewRating.ratingValue).toBeGreaterThanOrEqual(1)
        expect(review.reviewRating.ratingValue).toBeLessThanOrEqual(5)
      })
    })

    it('should include proper organization memberships', () => {
      const schema = generateEssexCountyLocalBusinessSchema()

      expect(schema.memberOf).toBeDefined()
      expect(Array.isArray(schema.memberOf)).toBe(true)

      const membershipNames = schema.memberOf.map((org: any) => org.name)
      expect(membershipNames).toContain('Newark Regional Business Partnership')
      expect(membershipNames).toContain('Essex County Chamber of Commerce')
      expect(membershipNames).toContain('American Society of Travel Advisors (ASTA)')
    })

    it('should include accessibility and additional properties', () => {
      const schema = generateEssexCountyLocalBusinessSchema()

      expect(schema.additionalProperty).toBeDefined()
      expect(Array.isArray(schema.additionalProperty)).toBe(true)

      const propertyNames = schema.additionalProperty.map((prop: any) => prop.name)
      expect(propertyNames).toContain('Wheelchair Accessible')
      expect(propertyNames).toContain('Parking Available')
      expect(propertyNames).toContain('Public Transit')
      expect(propertyNames).toContain('Appointment Required')
    })
  })

  describe('generateTownSpecificSchema', () => {
    it('should generate valid schema for Newark', () => {
      const schema = generateTownSpecificSchema('Newark')

      expect(schema['@context']).toBe('https://schema.org')
      expect(schema['@type']).toEqual(['TravelAgency', 'LocalBusiness'])
      expect(schema.name).toBe('Next Trip Anywhere - Newark Travel Services')
      expect(schema.url).toContain('/travel-from-newark')

      // Check geo coordinates match Newark
      const newarkTown = ESSEX_COUNTY_TOWNS.find((t) => t.name === 'Newark')
      expect(schema.geo.latitude).toBe(newarkTown?.coordinates.lat)
      expect(schema.geo.longitude).toBe(newarkTown?.coordinates.lng)

      // Check area served
      expect(schema.areaServed.name).toBe('Newark')
      expect(schema.areaServed.containedInPlace.name).toBe('Essex County')

      // Validate schema
      expect(validateSchema(schema)).toBe(true)
    })

    it('should generate valid schema for Montclair', () => {
      const schema = generateTownSpecificSchema('Montclair')

      expect(schema.name).toBe('Next Trip Anywhere - Montclair Travel Services')
      expect(schema.url).toContain('/travel-from-montclair')

      const montclairTown = ESSEX_COUNTY_TOWNS.find((t) => t.name === 'Montclair')
      expect(schema.geo.latitude).toBe(montclairTown?.coordinates.lat)
      expect(schema.geo.longitude).toBe(montclairTown?.coordinates.lng)

      expect(validateSchema(schema)).toBe(true)
    })

    it('should generate schema for all Essex County towns', () => {
      ESSEX_COUNTY_TOWNS.forEach((town) => {
        const schema = generateTownSpecificSchema(town.name)

        expect(schema).toBeDefined()
        expect(schema.name).toContain(town.name)
        expect(schema.geo.latitude).toBe(town.coordinates.lat)
        expect(schema.geo.longitude).toBe(town.coordinates.lng)
        expect(validateSchema(schema)).toBe(true)
      })
    })

    it('should throw error for invalid town name', () => {
      expect(() => {
        generateTownSpecificSchema('InvalidTown')
      }).toThrow('Town InvalidTown not found in Essex County towns list')
    })

    it('should include proper service area radius', () => {
      const schema = generateTownSpecificSchema('Newark')

      expect(schema.serviceArea).toBeDefined()
      expect(schema.serviceArea['@type']).toBe('GeoCircle')
      expect(schema.serviceArea.geoRadius).toBe('10 miles')
    })
  })

  describe('generateEssexCountyServiceSchema', () => {
    it('should generate valid Service schema', () => {
      const schema = generateEssexCountyServiceSchema()

      expect(schema['@context']).toBe('https://schema.org')
      expect(schema['@type']).toBe('Service')
      expect(schema.name).toBe('Essex County Travel Services')

      // Check provider
      expect(schema.provider).toBeDefined()
      expect(schema.provider['@type']).toBe('TravelAgency')
      expect(schema.provider.name).toBe('Next Trip Anywhere')

      // Check area served
      expect(schema.areaServed).toBeDefined()
      expect(schema.areaServed.name).toBe('Essex County')

      // Check service types
      expect(schema.serviceType).toBeDefined()
      expect(Array.isArray(schema.serviceType)).toBe(true)
      expect(schema.serviceType).toContain('Flight Booking')
      expect(schema.serviceType).toContain('Cruise Planning')
      expect(schema.serviceType).toContain('Vacation Packages')

      // Check offers
      expect(schema.offers).toBeDefined()
      expect(schema.offers['@type']).toBe('AggregateOffer')
      expect(schema.offers.priceCurrency).toBe('USD')

      // Check aggregate rating
      expect(schema.aggregateRating).toBeDefined()
      expect(schema.aggregateRating.ratingValue).toBe(4.8)
    })

    it('should include offer catalog', () => {
      const schema = generateEssexCountyServiceSchema()

      expect(schema.hasOfferCatalog).toBeDefined()
      expect(schema.hasOfferCatalog['@type']).toBe('OfferCatalog')
      expect(schema.hasOfferCatalog.name).toBe('Essex County Travel Deals')

      expect(Array.isArray(schema.hasOfferCatalog.itemListElement)).toBe(true)
      expect(schema.hasOfferCatalog.itemListElement.length).toBeGreaterThan(0)
    })
  })

  describe('generateBookingActionSchema', () => {
    it('should generate valid ReserveAction schema', () => {
      const schema = generateBookingActionSchema()

      expect(schema['@context']).toBe('https://schema.org')
      expect(schema['@type']).toBe('ReserveAction')
      expect(schema.name).toBe('Book Your Trip')

      // Check target
      expect(schema.target).toBeDefined()
      expect(schema.target['@type']).toBe('EntryPoint')
      expect(schema.target.urlTemplate).toContain('/book')
      expect(schema.target.inLanguage).toBe('en-US')

      // Check action platforms
      expect(schema.target.actionPlatform).toBeDefined()
      expect(Array.isArray(schema.target.actionPlatform)).toBe(true)
      expect(schema.target.actionPlatform).toContain('http://schema.org/DesktopWebPlatform')
      expect(schema.target.actionPlatform).toContain('http://schema.org/MobileWebPlatform')

      // Check object
      expect(schema.object).toBeDefined()
      expect(schema.object['@type']).toBe('Service')
      expect(schema.object.name).toBe('Travel Booking Service')

      // Check result
      expect(schema.result).toBeDefined()
      expect(schema.result['@type']).toBe('Reservation')
    })
  })

  describe('generateEssexCountySchemaGraph', () => {
    it('should generate complete schema graph', () => {
      const schemaGraph = generateEssexCountySchemaGraph()

      expect(schemaGraph['@context']).toBe('https://schema.org')
      expect(schemaGraph['@graph']).toBeDefined()
      expect(Array.isArray(schemaGraph['@graph'])).toBe(true)
      expect(schemaGraph['@graph'].length).toBe(3)

      // Check that all schemas are included
      const types = schemaGraph['@graph'].map((schema: any) => schema['@type'])
      expect(types).toContain('Service')
      expect(types).toContain('ReserveAction')

      // LocalBusiness has array type
      const localBusinessSchema = schemaGraph['@graph'].find(
        (s: any) => Array.isArray(s['@type']) && s['@type'].includes('LocalBusiness')
      )
      expect(localBusinessSchema).toBeDefined()
    })
  })

  describe('validateSchema', () => {
    it('should validate correct schema', () => {
      const validSchema = {
        '@context': 'https://schema.org',
        '@type': 'TravelAgency',
        name: 'Test Agency',
        telephone: '+1-555-0123',
        address: {
          streetAddress: '123 Main St',
          addressLocality: 'Newark',
          addressRegion: 'NJ',
          postalCode: '07102',
        },
      }

      expect(validateSchema(validSchema)).toBe(true)
    })

    it('should invalidate schema missing required fields', () => {
      const invalidSchema = {
        '@context': 'https://schema.org',
        '@type': 'TravelAgency',
        name: 'Test Agency',
        // Missing telephone and address
      }

      expect(validateSchema(invalidSchema)).toBe(false)
    })

    it('should invalidate schema with incomplete address', () => {
      const invalidSchema = {
        '@context': 'https://schema.org',
        '@type': 'TravelAgency',
        name: 'Test Agency',
        telephone: '+1-555-0123',
        address: {
          streetAddress: '123 Main St',
          // Missing other required address fields
        },
      }

      expect(validateSchema(invalidSchema)).toBe(false)
    })

    it('should validate geo coordinates when present', () => {
      const schemaWithGeo = {
        '@context': 'https://schema.org',
        '@type': 'TravelAgency',
        name: 'Test Agency',
        telephone: '+1-555-0123',
        address: {
          streetAddress: '123 Main St',
          addressLocality: 'Newark',
          addressRegion: 'NJ',
          postalCode: '07102',
        },
        geo: {
          latitude: 40.7357,
          longitude: -74.1724,
        },
      }

      expect(validateSchema(schemaWithGeo)).toBe(true)
    })

    it('should invalidate schema with invalid geo coordinates', () => {
      const schemaWithBadGeo = {
        '@context': 'https://schema.org',
        '@type': 'TravelAgency',
        name: 'Test Agency',
        telephone: '+1-555-0123',
        address: {
          streetAddress: '123 Main St',
          addressLocality: 'Newark',
          addressRegion: 'NJ',
          postalCode: '07102',
        },
        geo: {
          latitude: 'invalid',
          longitude: -74.1724,
        },
      }

      expect(validateSchema(schemaWithBadGeo)).toBe(false)
    })

    it('should validate aggregate rating when present', () => {
      const schemaWithRating = {
        '@context': 'https://schema.org',
        '@type': 'TravelAgency',
        name: 'Test Agency',
        telephone: '+1-555-0123',
        address: {
          streetAddress: '123 Main St',
          addressLocality: 'Newark',
          addressRegion: 'NJ',
          postalCode: '07102',
        },
        aggregateRating: {
          ratingValue: 4.8,
          reviewCount: 100,
        },
      }

      expect(validateSchema(schemaWithRating)).toBe(true)
    })
  })

  describe('Constants and Data', () => {
    it('should have all Essex County towns defined', () => {
      expect(ESSEX_COUNTY_TOWNS.length).toBe(21)

      const expectedTowns = [
        'Newark',
        'Montclair',
        'West Orange',
        'Livingston',
        'Millburn',
        'South Orange',
        'Maplewood',
        'Bloomfield',
        'Cedar Grove',
        'Verona',
        'Nutley',
        'Belleville',
        'East Orange',
        'Irvington',
        'Glen Ridge',
        'Caldwell',
        'North Caldwell',
        'West Caldwell',
        'Essex Fells',
        'Roseland',
        'Fairfield',
      ]

      expectedTowns.forEach((townName) => {
        const town = ESSEX_COUNTY_TOWNS.find((t) => t.name === townName)
        expect(town).toBeDefined()
        expect(town?.coordinates).toBeDefined()
        expect(town?.coordinates.lat).toBeGreaterThanOrEqual(40)
        expect(town?.coordinates.lat).toBeLessThanOrEqual(41)
        expect(town?.coordinates.lng).toBeGreaterThanOrEqual(-75)
        expect(town?.coordinates.lng).toBeLessThanOrEqual(-74)
      })
    })

    it('should have correct Newark virtual office information', () => {
      expect(NEWARK_OFFICE.streetAddress).toBe('Virtual Office')
      expect(NEWARK_OFFICE.suite).toBe('')
      expect(NEWARK_OFFICE.city).toBe('Newark')
      expect(NEWARK_OFFICE.state).toBe('NJ')
      expect(NEWARK_OFFICE.postalCode).toBe('07102')
      expect(NEWARK_OFFICE.country).toBe('US')
      expect(NEWARK_OFFICE.coordinates.latitude).toBe(40.7357)
      expect(NEWARK_OFFICE.coordinates.longitude).toBe(-74.1724)
      expect(NEWARK_OFFICE.phone).toBe('+1-833-874-1019')
      expect(NEWARK_OFFICE.email).toBe('info@nexttripanywhere.com')
    })

    it('should have proper business hours', () => {
      expect(BUSINESS_HOURS.regular).toBeDefined()
      expect(BUSINESS_HOURS.regular.length).toBe(7)
      expect(BUSINESS_HOURS.specialHours).toBeDefined()
      expect(BUSINESS_HOURS.specialHours.length).toBe(2)
    })

    it('should have comprehensive payment methods', () => {
      expect(PAYMENT_METHODS).toBeDefined()
      expect(PAYMENT_METHODS.length).toBeGreaterThan(10)
      expect(PAYMENT_METHODS).toContain('Credit Card')
      expect(PAYMENT_METHODS).toContain('PayPal')
      expect(PAYMENT_METHODS).toContain('VISA')
      expect(PAYMENT_METHODS).toContain('MasterCard')
    })
  })
})
