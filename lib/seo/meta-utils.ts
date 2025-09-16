/**
 * SEO Meta Tag Utilities
 * Functions for ensuring meta tags meet search engine character limits
 * while preserving important keywords and readability
 */

/**
 * Truncates a title to meet the 60 character SEO limit
 * Uses smart truncation to preserve keywords and readability
 * @param title - The original title
 * @param maxLength - Maximum character length (default 60)
 * @returns Truncated title that fits within the limit
 */
export function truncateTitle(title: string, maxLength: number = 60): string {
  if (title.length <= maxLength) {
    return title
  }

  // Common abbreviations to save space
  const abbreviations: Record<string, string> = {
    'Next Trip Anywhere': 'NTA',
    'New Jersey': 'NJ',
    'Airport Transfers': 'Airport Transfer',
    'Transportation Services': 'Transport',
    Professional: 'Pro',
    Services: 'Service',
    Management: 'Mgmt',
    and: '&',
  }

  // Try abbreviating first
  let shortened = title
  for (const [long, short] of Object.entries(abbreviations)) {
    if (shortened.length <= maxLength) {
      break
    }
    shortened = shortened.replace(new RegExp(long, 'gi'), short)
  }

  if (shortened.length <= maxLength) {
    return shortened
  }

  // If still too long, truncate at word boundary
  const words = shortened.split(' ')
  let result = ''

  for (const word of words) {
    const testResult = result ? `${result} ${word}` : word
    if (testResult.length > maxLength - 3) {
      // Leave room for ellipsis if needed
      break
    }
    result = testResult
  }

  // Only add ellipsis if we actually truncated content
  if (result.split(' ').length < words.length) {
    return result + '...'
  }

  return result
}

/**
 * Truncates a meta description to meet the 160 character SEO limit
 * Preserves important keywords and ensures complete sentences when possible
 * @param description - The original description
 * @param maxLength - Maximum character length (default 160)
 * @returns Truncated description that fits within the limit
 */
export function truncateDescription(description: string, maxLength: number = 160): string {
  if (description.length <= maxLength) {
    return description
  }

  // Common phrases to abbreviate
  const abbreviations: Record<string, string> = {
    'Next Trip Anywhere': 'NTA',
    professional: 'pro',
    services: 'service',
    transportation: 'transport',
    and: '&',
    including: 'incl.',
    available: 'avail.',
    experience: 'exp.',
    exclusive: 'excl.',
  }

  // Apply abbreviations
  let shortened = description
  for (const [long, short] of Object.entries(abbreviations)) {
    if (shortened.length <= maxLength) {
      break
    }
    shortened = shortened.replace(new RegExp(long, 'gi'), short)
  }

  if (shortened.length <= maxLength) {
    return shortened
  }

  // Try to truncate at sentence boundary
  const sentences = shortened.match(/[^.!?]+[.!?]+/g) || [shortened]
  let result = ''

  for (const sentence of sentences) {
    const testResult = result ? `${result} ${sentence}` : sentence
    if (testResult.length > maxLength) {
      break
    }
    result = testResult
  }

  // If we have at least one complete sentence, use it
  if (result && result.includes('.')) {
    return result.trim()
  }

  // Otherwise, truncate at word boundary
  const words = shortened.split(' ')
  result = ''

  for (const word of words) {
    const testResult = result ? `${result} ${word}` : word
    if (testResult.length > maxLength - 3) {
      break
    }
    result = testResult
  }

  return result + '...'
}

/**
 * Generates SEO-optimized meta tags for Essex County service pages
 * @param service - Service name
 * @param city - City name
 * @param customDescription - Optional custom description
 * @returns Object with title and description within character limits
 */
export function generateEssexCountyMeta(
  service: string,
  city: string,
  customDescription?: string
): { title: string; description: string } {
  // Build the full title
  const fullTitle = `${service} in ${city}, NJ | Next Trip Anywhere`

  // Build the description
  const baseDescription =
    customDescription ||
    `Professional ${service.toLowerCase()} services for ${city} residents. Expert travel planning with exclusive deals and 24/7 support.`

  // Add call to action if there's room
  const ctaDescription = `${baseDescription} Call 833-874-1019.`

  return {
    title: truncateTitle(fullTitle),
    description: truncateDescription(ctaDescription),
  }
}

/**
 * Validates meta tag lengths and returns warnings
 * @param title - The title to validate
 * @param description - The description to validate
 * @returns Array of warning messages (empty if all valid)
 */
export function validateMetaTags(title: string, description: string): string[] {
  const warnings: string[] = []

  if (title.length > 60) {
    warnings.push(`Title is ${title.length} characters (limit: 60)`)
  }

  if (description.length > 160) {
    warnings.push(`Description is ${description.length} characters (limit: 160)`)
  }

  return warnings
}

/**
 * Common SEO-friendly abbreviations for Essex County locations
 */
export const LOCATION_ABBREVIATIONS: Record<string, string> = {
  'East Orange': 'E. Orange',
  'West Orange': 'W. Orange',
  'South Orange': 'S. Orange',
  'West Caldwell': 'W. Caldwell',
  'North Caldwell': 'N. Caldwell',
  'Essex Fells': 'E. Fells',
  'Cedar Grove': 'C. Grove',
  'Glen Ridge': 'G. Ridge',
}

/**
 * Service name variations for better SEO
 */
export const SERVICE_VARIATIONS: Record<string, string[]> = {
  'Airport Transfers': ['Airport Transfer', 'Airport Transport', 'Airport Shuttle'],
  'Group Travel': ['Group Tours', 'Group Trip', 'Group Transport'],
  'Corporate Travel': ['Business Travel', 'Corporate Transport', 'Business Trip'],
  'Cruise Transfers': ['Cruise Transport', 'Port Transfer', 'Cruise Shuttle'],
  'Wedding Transportation': ['Wedding Transport', 'Wedding Cars', 'Wedding Shuttle'],
  'Special Events': ['Event Transport', 'Event Transportation', 'Special Event'],
  'Wine Tours & Day Trips': ['Wine Tours', 'Day Trips', 'Wine Tasting Tours'],
  'Medical Appointments': ['Medical Transport', 'Healthcare Transport', 'Medical Shuttle'],
  'School Transportation': ['School Transport', 'Student Transport', 'School Bus'],
}
