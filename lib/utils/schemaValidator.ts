/**
 * Schema Validator and Tester
 * Validates all schema implementations and provides testing utilities
 */

import { validateSchema, previewRichSnippet } from './baseSchema'
import { generatePackageSchemaGraph } from './packageSchema'
import { generateCruiseSchemaGraph } from './cruiseSchema'
import { generateGuideSchemaGraph } from './guideSchema'
import { generatePortSchemaGraph } from './portSchema'

interface ValidationResult {
  page: string
  valid: boolean
  errors: string[]
  preview?: string
  schemaTypes: string[]
}

/**
 * Test all schema implementations
 */
export function testAllSchemas(): ValidationResult[] {
  const results: ValidationResult[] = []

  // Test Package Schema
  const packageSchema = generatePackageSchemaGraph({
    slug: 'test-package',
    title: 'Test Vacation Package',
    metaTitle: 'Test Package | Next Trip Anywhere',
    metaDescription: 'Test description for validation',
    keywords: ['test', 'package'],
    packageType: 'all-inclusive',
    content: {
      hero: {
        headline: 'Test Package',
        subheadline: 'Test subtitle',
      },
      description: 'Test package description',
      highlights: ['Feature 1', 'Feature 2'],
      includedFeatures: ['All meals', 'Airport transfer'],
      startingPrice: 999,
      resorts: [
        {
          name: 'Test Resort',
          location: 'Caribbean',
          rating: 4.5,
          features: ['Pool', 'Spa'],
        },
      ],
      localAdvantages: ['Newark departure', 'Local support'],
    },
    faq: [{ question: 'Test question?', answer: 'Test answer' }],
    priority: 'HIGH',
    searchVolume: 1000,
    difficulty: 25,
    lastUpdated: '2025-01-23',
  })

  const packageValidation = validateSchema(packageSchema)
  results.push({
    page: 'Vacation Package',
    valid: packageValidation.valid,
    errors: packageValidation.errors,
    preview: previewRichSnippet(packageSchema),
    schemaTypes: extractSchemaTypes(packageSchema),
  })

  // Test Cruise Schema
  const cruiseSchema = generateCruiseSchemaGraph({
    slug: 'test-cruise',
    title: 'Test Cruise',
    metaTitle: 'Test Cruise | Next Trip Anywhere',
    metaDescription: 'Test cruise description',
    keywords: ['cruise', 'test'],
    searchVolume: 5000,
    difficulty: 30,
    priority: 'HIGH',
    content: {
      hero: {
        headline: 'Test Cruise',
        subheadline: 'Amazing cruise experience',
      },
      description: 'Test cruise description',
      highlights: ['Highlight 1', 'Highlight 2'],
      popularCruiseLines: ['Royal Caribbean', 'Carnival'],
      startingPrice: 799,
      averageDuration: '7 nights',
      portInfo: {
        name: 'Cape Liberty',
        address: 'Bayonne, NJ',
        distance: '30 minutes from Newark',
        parkingInfo: '$20/day',
        directions: 'Take NJ Turnpike to Exit 14A',
      },
      localTips: ['Book early', 'Pack light'],
    },
    faq: [{ question: 'What is included?', answer: 'All meals and entertainment' }],
    lastUpdated: '2025-01-23',
  })

  const cruiseValidation = validateSchema(cruiseSchema)
  results.push({
    page: 'Cruise Destination',
    valid: cruiseValidation.valid,
    errors: cruiseValidation.errors,
    preview: previewRichSnippet(cruiseSchema),
    schemaTypes: extractSchemaTypes(cruiseSchema),
  })

  // Test Guide Schema
  const guideSchema = generateGuideSchemaGraph({
    title: 'Ultimate Travel Guide',
    description: 'Complete guide for travelers',
    category: 'Travel Tips',
    type: 'guide',
    slug: 'ultimate-travel-guide',
    publishedDate: '2025-01-23',
    content: 'Full guide content here...',
    wordCount: 1500,
    faqs: [{ question: 'How to pack?', answer: 'Pack light and smart' }],
  })

  const guideValidation = validateSchema(guideSchema)
  results.push({
    page: 'Travel Guide',
    valid: guideValidation.valid,
    errors: guideValidation.errors,
    preview: previewRichSnippet(guideSchema),
    schemaTypes: extractSchemaTypes(guideSchema),
  })

  // Test Port/Destination Schema
  const portSchema = generatePortSchemaGraph({
    type: 'port',
    name: 'Cape Liberty Cruise Port',
    description: 'Main cruise port for New Jersey',
    location: {
      city: 'Bayonne',
      state: 'NJ',
      country: 'USA',
    },
    coordinates: {
      lat: 40.6626,
      lng: -74.0777,
    },
    amenities: ['Parking', 'Security', 'Luggage Storage'],
    transportOptions: [{ type: 'Shuttle', provider: 'Next Trip Anywhere' }, { type: 'Taxi' }],
    rating: {
      value: 4.5,
      count: 234,
    },
  })

  const portValidation = validateSchema(portSchema)
  results.push({
    page: 'Port/Destination',
    valid: portValidation.valid,
    errors: portValidation.errors,
    preview: previewRichSnippet(portSchema),
    schemaTypes: extractSchemaTypes(portSchema),
  })

  return results
}

/**
 * Extract all schema types from a schema graph
 */
function extractSchemaTypes(schema: any): string[] {
  const types: string[] = []

  if (schema['@graph']) {
    schema['@graph'].forEach((item: any) => {
      if (item['@type']) {
        types.push(item['@type'])
      }
    })
  } else if (schema['@type']) {
    types.push(schema['@type'])
  }

  return [...new Set(types)] // Remove duplicates
}

/**
 * Validate a single schema and return detailed results
 */
export function validateSingleSchema(schema: any): ValidationResult {
  const validation = validateSchema(schema)
  return {
    page: 'Custom Schema',
    valid: validation.valid,
    errors: validation.errors,
    preview: previewRichSnippet(schema),
    schemaTypes: extractSchemaTypes(schema),
  }
}

/**
 * Check if schema includes required local business info
 */
export function hasLocalBusinessInfo(schema: any): boolean {
  const schemaString = JSON.stringify(schema)
  return (
    schemaString.includes('TravelAgency') &&
    schemaString.includes('Essex County') &&
    schemaString.includes('833-874-1019')
  )
}

/**
 * Check if schema includes FAQ markup
 */
export function hasFAQMarkup(schema: any): boolean {
  const schemaString = JSON.stringify(schema)
  return schemaString.includes('FAQPage') || schemaString.includes('Question')
}

/**
 * Check if schema includes breadcrumb markup
 */
export function hasBreadcrumbMarkup(schema: any): boolean {
  const schemaString = JSON.stringify(schema)
  return schemaString.includes('BreadcrumbList')
}

/**
 * Generate validation report
 */
export function generateValidationReport(): string {
  const results = testAllSchemas()
  let report = '# Schema Validation Report\n\n'

  results.forEach((result) => {
    report += `## ${result.page}\n`
    report += `- Status: ${result.valid ? '✅ Valid' : '❌ Invalid'}\n`
    report += `- Schema Types: ${result.schemaTypes.join(', ')}\n`

    if (result.errors.length > 0) {
      report += `- Errors:\n`
      result.errors.forEach((error) => {
        report += `  - ${error}\n`
      })
    }

    if (result.preview) {
      report += `- Rich Snippet Preview:\n\`\`\`\n${result.preview}\n\`\`\`\n`
    }

    report += '\n'
  })

  // Summary
  const validCount = results.filter((r) => r.valid).length
  const totalCount = results.length

  report += `## Summary\n`
  report += `- Total Schemas Tested: ${totalCount}\n`
  report += `- Valid Schemas: ${validCount}\n`
  report += `- Invalid Schemas: ${totalCount - validCount}\n`
  report += `- Success Rate: ${Math.round((validCount / totalCount) * 100)}%\n`

  return report
}

/**
 * CLI utility to run validation
 */
export function runValidation(verbose = false): void {
  const results = testAllSchemas()

  console.log('🔍 Schema Validation Results\n')

  results.forEach((result) => {
    const status = result.valid ? '✅' : '❌'
    console.log(`${status} ${result.page}`)

    if (verbose || !result.valid) {
      if (result.errors.length > 0) {
        console.log('  Errors:')
        result.errors.forEach((error) => {
          console.log(`    - ${error}`)
        })
      }

      if (result.schemaTypes.length > 0) {
        console.log(`  Schema Types: ${result.schemaTypes.join(', ')}`)
      }
    }
  })

  const validCount = results.filter((r) => r.valid).length
  const totalCount = results.length

  console.log('\n📊 Summary:')
  console.log(`  Total: ${totalCount} | Valid: ${validCount} | Invalid: ${totalCount - validCount}`)
  console.log(`  Success Rate: ${Math.round((validCount / totalCount) * 100)}%`)

  if (validCount === totalCount) {
    console.log('\n✨ All schemas are valid!')
  } else {
    console.log('\n⚠️  Some schemas have validation errors. Run with --verbose for details.')
  }
}

// Export all validation utilities
export { validateSchema, previewRichSnippet, extractSchemaTypes }
