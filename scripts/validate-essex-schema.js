#!/usr/bin/env node

/**
 * Script to validate Essex County schema markup
 * Tests schemas for proper structure and Google Rich Results compatibility
 */

const fs = require('fs')
const path = require('path')

// Import the schema functions (in production, these would be TypeScript compiled)
const schemaPath = path.join(__dirname, '..', 'lib', 'seo', 'essex-county-schema.ts')

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  gray: '\x1b[90m'
}

// Validation rules for LocalBusiness schema
const localBusinessRules = {
  required: ['@context', '@type', 'name', 'address', 'telephone'],
  recommended: ['description', 'url', 'geo', 'openingHours', 'aggregateRating', 'priceRange'],
  address: {
    required: ['streetAddress', 'addressLocality', 'addressRegion', 'postalCode'],
    recommended: ['addressCountry']
  },
  geo: {
    required: ['latitude', 'longitude'],
    types: { latitude: 'number', longitude: 'number' }
  },
  aggregateRating: {
    required: ['ratingValue', 'reviewCount'],
    types: { ratingValue: 'number', reviewCount: 'number' },
    ranges: {
      ratingValue: { min: 1, max: 5 },
      reviewCount: { min: 0 }
    }
  }
}

// Validation rules for TravelAgency schema
const travelAgencyRules = {
  required: ['@context', '@type', 'name'],
  recommended: ['telephone', 'email', 'address', 'areaServed', 'paymentAccepted', 'openingHours'],
  specific: ['potentialAction', 'hasOfferCatalog', 'serviceArea']
}

// Mock schema data for testing
const mockSchemas = {
  essexCountyLocalBusiness: {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'TravelAgency'],
    name: 'Next Trip Anywhere - Essex County',
    telephone: '+1-833-874-1019',
    email: 'info@nexttripanywhere.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '744 Broad Street, Suite 1700',
      addressLocality: 'Newark',
      addressRegion: 'NJ',
      postalCode: '07102',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.7357,
      longitude: -74.1724
    },
    openingHours: ['Mo-Fr 06:00-23:00', 'Sa-Su 07:00-22:00'],
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.8,
      reviewCount: 3247,
      bestRating: 5,
      worstRating: 1
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Essex County'
    }
  },
  townSpecific: {
    '@context': 'https://schema.org',
    '@type': ['TravelAgency', 'LocalBusiness'],
    name: 'Next Trip Anywhere - Newark Travel Services',
    telephone: '+1-833-874-1019',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '744 Broad Street, Suite 1700',
      addressLocality: 'Newark',
      addressRegion: 'NJ',
      postalCode: '07102',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.7357,
      longitude: -74.1724
    }
  }
}

/**
 * Validate a schema against rules
 */
function validateSchema(schema, rules, schemaName) {
  console.log(`\n${colors.blue}Validating ${schemaName}...${colors.reset}`)

  let errors = []
  let warnings = []
  let passes = []

  // Check required fields
  rules.required.forEach(field => {
    if (!schema[field]) {
      errors.push(`Missing required field: ${field}`)
    } else {
      passes.push(`✓ Has required field: ${field}`)
    }
  })

  // Check recommended fields
  if (rules.recommended) {
    rules.recommended.forEach(field => {
      if (!schema[field]) {
        warnings.push(`Missing recommended field: ${field}`)
      } else {
        passes.push(`✓ Has recommended field: ${field}`)
      }
    })
  }

  // Validate address if present
  if (schema.address && rules.address) {
    rules.address.required.forEach(field => {
      if (!schema.address[field]) {
        errors.push(`Missing required address field: ${field}`)
      } else {
        passes.push(`✓ Address has required field: ${field}`)
      }
    })
  }

  // Validate geo coordinates if present
  if (schema.geo && rules.geo) {
    rules.geo.required.forEach(field => {
      if (!schema.geo[field]) {
        errors.push(`Missing required geo field: ${field}`)
      } else if (rules.geo.types && typeof schema.geo[field] !== rules.geo.types[field]) {
        errors.push(`Invalid type for geo.${field}: expected ${rules.geo.types[field]}, got ${typeof schema.geo[field]}`)
      } else {
        passes.push(`✓ Geo has valid field: ${field}`)
      }
    })
  }

  // Validate aggregate rating if present
  if (schema.aggregateRating && rules.aggregateRating) {
    rules.aggregateRating.required.forEach(field => {
      const value = schema.aggregateRating[field]
      if (!value && value !== 0) {
        errors.push(`Missing required aggregateRating field: ${field}`)
      } else if (rules.aggregateRating.types && typeof value !== rules.aggregateRating.types[field]) {
        errors.push(`Invalid type for aggregateRating.${field}`)
      } else if (rules.aggregateRating.ranges && rules.aggregateRating.ranges[field]) {
        const range = rules.aggregateRating.ranges[field]
        if ((range.min !== undefined && value < range.min) || (range.max !== undefined && value > range.max)) {
          errors.push(`aggregateRating.${field} out of range: ${value}`)
        } else {
          passes.push(`✓ AggregateRating has valid field: ${field}`)
        }
      } else {
        passes.push(`✓ AggregateRating has valid field: ${field}`)
      }
    })
  }

  // Print results
  if (passes.length > 0) {
    console.log(`${colors.gray}${passes.join('\n')}${colors.reset}`)
  }

  if (warnings.length > 0) {
    console.log(`\n${colors.yellow}Warnings:${colors.reset}`)
    warnings.forEach(warning => console.log(`  ⚠ ${warning}`))
  }

  if (errors.length > 0) {
    console.log(`\n${colors.red}Errors:${colors.reset}`)
    errors.forEach(error => console.log(`  ✗ ${error}`))
  }

  const result = {
    valid: errors.length === 0,
    errors: errors.length,
    warnings: warnings.length,
    passes: passes.length
  }

  if (result.valid) {
    console.log(`\n${colors.green}✅ Schema is valid!${colors.reset}`)
  } else {
    console.log(`\n${colors.red}❌ Schema has ${result.errors} error(s)${colors.reset}`)
  }

  return result
}

/**
 * Check if schema can be serialized to JSON-LD
 */
function validateJsonLd(schema, schemaName) {
  console.log(`\n${colors.blue}Testing JSON-LD serialization for ${schemaName}...${colors.reset}`)

  try {
    const jsonLd = JSON.stringify(schema, null, 2)
    const parsed = JSON.parse(jsonLd)

    // Check if it round-trips correctly
    if (JSON.stringify(parsed) === JSON.stringify(schema)) {
      console.log(`${colors.green}✅ JSON-LD serialization successful${colors.reset}`)
      return true
    } else {
      console.log(`${colors.red}❌ JSON-LD round-trip failed${colors.reset}`)
      return false
    }
  } catch (error) {
    console.log(`${colors.red}❌ JSON-LD serialization error: ${error.message}${colors.reset}`)
    return false
  }
}

/**
 * Generate HTML with embedded schema for testing
 */
function generateTestHtml(schema, title) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
    </script>
</head>
<body>
    <h1>${title}</h1>
    <p>This page contains structured data for testing in Google's Rich Results Test.</p>
    <p>Visit <a href="https://search.google.com/test/rich-results" target="_blank">Google Rich Results Test</a> to validate.</p>
    <h2>Schema Details:</h2>
    <pre>${JSON.stringify(schema, null, 2)}</pre>
</body>
</html>`
}

/**
 * Write test HTML files
 */
function writeTestFiles() {
  const testDir = path.join(__dirname, '..', 'test-schemas')

  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true })
  }

  Object.entries(mockSchemas).forEach(([name, schema]) => {
    const fileName = `${name}.html`
    const filePath = path.join(testDir, fileName)
    const html = generateTestHtml(schema, `Test: ${name}`)

    fs.writeFileSync(filePath, html)
    console.log(`${colors.gray}Created test file: ${fileName}${colors.reset}`)
  })

  console.log(`\n${colors.green}Test files created in: ${testDir}${colors.reset}`)
  console.log(`${colors.blue}Upload these files to Google's Rich Results Test for validation${colors.reset}`)
}

/**
 * Main validation function
 */
function main() {
  console.log(`${colors.blue}═══════════════════════════════════════════════════════${colors.reset}`)
  console.log(`${colors.blue}     Essex County Schema Validation Tool${colors.reset}`)
  console.log(`${colors.blue}═══════════════════════════════════════════════════════${colors.reset}`)

  const results = []

  // Validate Essex County LocalBusiness schema
  results.push(validateSchema(mockSchemas.essexCountyLocalBusiness, localBusinessRules, 'Essex County LocalBusiness'))
  validateJsonLd(mockSchemas.essexCountyLocalBusiness, 'Essex County LocalBusiness')

  // Validate Town-specific schema
  results.push(validateSchema(mockSchemas.townSpecific, localBusinessRules, 'Town-Specific Schema'))
  validateJsonLd(mockSchemas.townSpecific, 'Town-Specific Schema')

  // Summary
  console.log(`\n${colors.blue}═══════════════════════════════════════════════════════${colors.reset}`)
  console.log(`${colors.blue}                    SUMMARY${colors.reset}`)
  console.log(`${colors.blue}═══════════════════════════════════════════════════════${colors.reset}`)

  const totalErrors = results.reduce((sum, r) => sum + r.errors, 0)
  const totalWarnings = results.reduce((sum, r) => sum + r.warnings, 0)
  const totalPasses = results.reduce((sum, r) => sum + r.passes, 0)

  console.log(`Total Passes: ${colors.green}${totalPasses}${colors.reset}`)
  console.log(`Total Warnings: ${colors.yellow}${totalWarnings}${colors.reset}`)
  console.log(`Total Errors: ${colors.red}${totalErrors}${colors.reset}`)

  if (totalErrors === 0) {
    console.log(`\n${colors.green}✅ All schemas are valid!${colors.reset}`)
  } else {
    console.log(`\n${colors.red}❌ ${totalErrors} error(s) found. Please fix before deploying.${colors.reset}`)
  }

  // Generate test files
  console.log(`\n${colors.blue}Generating test HTML files...${colors.reset}`)
  writeTestFiles()

  // Instructions for further testing
  console.log(`\n${colors.blue}═══════════════════════════════════════════════════════${colors.reset}`)
  console.log(`${colors.blue}                 NEXT STEPS${colors.reset}`)
  console.log(`${colors.blue}═══════════════════════════════════════════════════════${colors.reset}`)
  console.log(`
1. Test with Google's Rich Results Test:
   ${colors.gray}https://search.google.com/test/rich-results${colors.reset}

2. Test with Schema.org Validator:
   ${colors.gray}https://validator.schema.org/${colors.reset}

3. Test with Google's Structured Data Testing Tool:
   ${colors.gray}https://search.google.com/structured-data/testing-tool${colors.reset}

4. Check in Google Search Console after deployment:
   ${colors.gray}https://search.google.com/search-console${colors.reset}
`)

  process.exit(totalErrors > 0 ? 1 : 0)
}

// Run validation
if (require.main === module) {
  main()
}