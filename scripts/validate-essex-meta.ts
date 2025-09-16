#!/usr/bin/env node
/**
 * Script to validate all Essex County page metadata
 * Ensures titles are ≤60 chars and descriptions are ≤160 chars
 */

import {
  ESSEX_CITIES,
  ESSEX_SERVICES,
} from '../lib/seo/essex-county-services'
import {
  generateEssexCountyMeta,
  validateMetaTags,
  truncateTitle,
  truncateDescription,
} from '../lib/seo/meta-utils'

interface MetaIssue {
  page: string
  title: string
  titleLength: number
  description: string
  descriptionLength: number
  warnings: string[]
}

function validateAllPages(): void {
  const issues: MetaIssue[] = []
  let totalPages = 0
  let validPages = 0

  console.log('🔍 Validating Essex County Page Metadata...\n')

  // Validate city landing pages
  console.log('📍 Checking City Landing Pages:')
  for (const city of ESSEX_CITIES) {
    totalPages++
    const fullTitle = `Travel Services in ${city.name}, NJ | Next Trip Anywhere`
    const title = truncateTitle(fullTitle)
    const fullDescription = `Complete travel services for ${city.name} residents. Airport transfers, group travel, corporate travel, cruises & more. Call 833-874-1019.`
    const description = truncateDescription(fullDescription)

    const warnings = validateMetaTags(title, description)

    if (warnings.length > 0) {
      issues.push({
        page: `/locations/essex-county/${city.slug}`,
        title,
        titleLength: title.length,
        description,
        descriptionLength: description.length,
        warnings,
      })
      console.log(`❌ ${city.name}: ${warnings.join(', ')}`)
    } else {
      validPages++
      console.log(`✅ ${city.name}: OK (T:${title.length}, D:${description.length})`)
    }
  }

  console.log('\n📋 Checking Service Pages:')

  // Validate service pages for each city
  for (const city of ESSEX_CITIES) {
    console.log(`\n  ${city.name}:`)

    for (const service of ESSEX_SERVICES) {
      totalPages++
      const { title, description } = generateEssexCountyMeta(
        service.name,
        city.name,
        `${service.description} Expert travel planning for ${city.name} residents.`
      )

      const warnings = validateMetaTags(title, description)

      if (warnings.length > 0) {
        issues.push({
          page: `/locations/essex-county/${city.slug}/${service.slug}`,
          title,
          titleLength: title.length,
          description,
          descriptionLength: description.length,
          warnings,
        })
        console.log(`    ❌ ${service.name}: ${warnings.join(', ')}`)
      } else {
        validPages++
        console.log(`    ✅ ${service.name}: OK`)
      }
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 VALIDATION SUMMARY')
  console.log('='.repeat(60))
  console.log(`Total Pages Checked: ${totalPages}`)
  console.log(`Valid Pages: ${validPages} (${((validPages / totalPages) * 100).toFixed(1)}%)`)
  console.log(`Pages with Issues: ${issues.length} (${((issues.length / totalPages) * 100).toFixed(1)}%)`)

  if (issues.length > 0) {
    console.log('\n⚠️  PAGES WITH ISSUES:')
    console.log('='.repeat(60))

    // Group by issue type
    const titleIssues = issues.filter(i => i.titleLength > 60)
    const descriptionIssues = issues.filter(i => i.descriptionLength > 160)

    if (titleIssues.length > 0) {
      console.log(`\n📏 TITLE LENGTH ISSUES (${titleIssues.length} pages):`)
      titleIssues.slice(0, 5).forEach(issue => {
        console.log(`  ${issue.page}`)
        console.log(`    Title (${issue.titleLength} chars): "${issue.title}"`)
      })
      if (titleIssues.length > 5) {
        console.log(`  ... and ${titleIssues.length - 5} more`)
      }
    }

    if (descriptionIssues.length > 0) {
      console.log(`\n📝 DESCRIPTION LENGTH ISSUES (${descriptionIssues.length} pages):`)
      descriptionIssues.slice(0, 5).forEach(issue => {
        console.log(`  ${issue.page}`)
        console.log(`    Description (${issue.descriptionLength} chars): "${issue.description.substring(0, 50)}..."`)
      })
      if (descriptionIssues.length > 5) {
        console.log(`  ... and ${descriptionIssues.length - 5} more`)
      }
    }

    // Show sample fixed versions
    if (issues.length > 0) {
      console.log('\n💡 SAMPLE FIXES:')
      console.log('='.repeat(60))

      const sampleIssue = issues[0]
      console.log(`\nOriginal (${sampleIssue.page}):`)
      console.log(`  Title: "${sampleIssue.title}"`)
      console.log(`  Length: ${sampleIssue.titleLength} chars`)

      // Show how truncation would fix it
      const fixedTitle = truncateTitle(sampleIssue.title, 60)
      console.log(`\nFixed:`)
      console.log(`  Title: "${fixedTitle}"`)
      console.log(`  Length: ${fixedTitle.length} chars`)
    }
  } else {
    console.log('\n✨ All pages have valid metadata within SEO limits!')
  }

  // Character distribution stats
  console.log('\n📈 CHARACTER DISTRIBUTION:')
  console.log('='.repeat(60))

  const titleLengths = []
  const descriptionLengths = []

  // Collect all lengths
  for (const city of ESSEX_CITIES) {
    const cityTitle = truncateTitle(`Travel Services in ${city.name}, NJ | Next Trip Anywhere`)
    const cityDesc = truncateDescription(`Complete travel services for ${city.name} residents. Airport transfers, group travel, corporate travel, cruises & more. Call 833-874-1019.`)
    titleLengths.push(cityTitle.length)
    descriptionLengths.push(cityDesc.length)

    for (const service of ESSEX_SERVICES) {
      const { title, description } = generateEssexCountyMeta(
        service.name,
        city.name,
        `${service.description} Expert travel planning for ${city.name} residents.`
      )
      titleLengths.push(title.length)
      descriptionLengths.push(description.length)
    }
  }

  // Calculate stats
  const avgTitleLength = Math.round(titleLengths.reduce((a, b) => a + b, 0) / titleLengths.length)
  const maxTitleLength = Math.max(...titleLengths)
  const minTitleLength = Math.min(...titleLengths)

  const avgDescLength = Math.round(descriptionLengths.reduce((a, b) => a + b, 0) / descriptionLengths.length)
  const maxDescLength = Math.max(...descriptionLengths)
  const minDescLength = Math.min(...descriptionLengths)

  console.log('Title Lengths:')
  console.log(`  Average: ${avgTitleLength} chars`)
  console.log(`  Range: ${minTitleLength} - ${maxTitleLength} chars`)
  console.log(`  Limit: 60 chars`)

  console.log('\nDescription Lengths:')
  console.log(`  Average: ${avgDescLength} chars`)
  console.log(`  Range: ${minDescLength} - ${maxDescLength} chars`)
  console.log(`  Limit: 160 chars`)
}

// Run validation
validateAllPages()