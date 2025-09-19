#!/usr/bin/env node

/**
 * Script to fix all airport-transfers pages to use the comprehensive NewarkAirportTransfer component
 * This adds the 3,000+ words of Newark Airport content to each page
 */

const fs = require('fs')
const path = require('path')

// List of all Essex County cities that need updating
const cities = [
  'belleville',
  'bloomfield',
  'caldwell',
  'cedar-grove',
  'east-orange',
  'essex-fells',
  'fairfield',
  'glen-ridge',
  'irvington',
  'livingston',
  'maplewood',
  'millburn',
  'montclair',
  'newark', // Already done but included for completeness
  'north-caldwell',
  'nutley',
  'orange',
  'roseland',
  'south-orange',
  'verona',
  'west-caldwell',
  'west-orange',
]

// Function to convert slug to proper city name
function slugToCityName(slug) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Template for the updated page
function generatePageContent(citySlug) {
  const cityName = slugToCityName(citySlug)

  return `/**
 * ${cityName} Airport Transfers Service Page
 * Generated for Essex County SEO - Phase 4
 * Enhanced with comprehensive Newark Airport content
 */

import { Metadata } from 'next'
import NewarkAirportTransfer from '@/components/essex-county/NewarkAirportTransfer'
import { getEnhancedAirportServiceContent } from '@/lib/seo/newark-airport-service'

const cityName = '${cityName}'
const citySlug = '${citySlug}'

// Get comprehensive Newark Airport content for metadata
const content = getEnhancedAirportServiceContent('airport-transfers', cityName)

export const metadata: Metadata = {
  title: content?.seoContent.metaTitle || \`Airport Transfers in ${cityName}, NJ | Next Trip Anywhere\`,
  description:
    content?.seoContent.metaDescription ||
    \`Reliable airport transportation to Newark Airport (EWR), JFK, LGA, and Philadelphia airports. Serving ${cityName} and surrounding Essex County areas. Call 833-874-1019 for immediate assistance.\`,
  keywords: [
    \`airport-transfers ${cityName}\`,
    \`${cityName} airport transfers\`,
    'airport transfers',
    'Newark airport',
    'EWR transportation',
    'airport shuttle',
    'airport limo',
    'Newark Liberty International',
    'EWR transfers',
    'airport car service ${cityName}',
    \`${cityName} NJ\`,
    'Essex County',
  ],
  alternates: {
    canonical: \`https://nexttripanywhere.com/travel-from-${citySlug}/airport-transfers\`,
  },
  openGraph: {
    title: \`Airport Transfers in ${cityName} | Next Trip Anywhere\`,
    description: \`Professional airport transfers for ${cityName} residents. Reliable airport transportation to Newark Airport (EWR), JFK, LGA, and Philadelphia airports.\`,
    url: \`https://nexttripanywhere.com/travel-from-${citySlug}/airport-transfers\`,
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
  },
}

export default function ${cityName.replace(/[- ]/g, '')}AirportTransfersPage() {
  return <NewarkAirportTransfer cityName={cityName} citySlug={citySlug} />
}
`
}

// Process each city
let updatedCount = 0
let skippedCount = 0
let errorCount = 0

cities.forEach((citySlug) => {
  const filePath = path.join(
    __dirname,
    '..',
    'app',
    `travel-from-${citySlug}`,
    'airport-transfers',
    'page.tsx'
  )

  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log(`❌ File not found: ${filePath}`)
      errorCount++
      return
    }

    // Read current content to check if already updated
    const currentContent = fs.readFileSync(filePath, 'utf8')

    // Check if already using NewarkAirportTransfer
    if (currentContent.includes('NewarkAirportTransfer')) {
      console.log(`✓ Already updated: travel-from-${citySlug}/airport-transfers`)
      skippedCount++
      return
    }

    // Generate new content
    const newContent = generatePageContent(citySlug)

    // Write the updated content
    fs.writeFileSync(filePath, newContent)
    console.log(`✅ Updated: travel-from-${citySlug}/airport-transfers`)
    updatedCount++
  } catch (error) {
    console.error(`❌ Error processing ${citySlug}:`, error.message)
    errorCount++
  }
})

// Summary
console.log('\n📊 Summary:')
console.log(`✅ Updated: ${updatedCount} files`)
console.log(`✓ Already updated: ${skippedCount} files`)
if (errorCount > 0) {
  console.log(`❌ Errors: ${errorCount} files`)
}
console.log(`\nTotal processed: ${cities.length} cities`)

// Exit with error code if there were errors
if (errorCount > 0) {
  process.exit(1)
}