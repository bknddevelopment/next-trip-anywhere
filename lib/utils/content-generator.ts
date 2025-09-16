// Content generation utilities for Essex County SEO pages

import { getServiceById } from '../data/essex-county-services'
import { getCityById } from '../data/essex-county-cities'

// Interfaces for generated content
export interface MetaTags {
  title: string
  description: string
  keywords: string[]
  ogTitle: string
  ogDescription: string
  ogImage?: string
  canonical?: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface SchemaMarkup {
  '@context': string
  '@type': string
  name: string
  description: string
  url?: string
  address?: {
    '@type': string
    addressLocality: string
    addressRegion: string
    postalCode?: string
  }
  telephone?: string
  email?: string
  priceRange?: string
  areaServed?: Array<{
    '@type': string
    name: string
  }>
  serviceType?: string
  provider?: {
    '@type': string
    name: string
  }
}

/**
 * Generates SEO-optimized service description for a specific city
 */
export function generateServiceDescription(
  serviceId: string,
  cityId: string,
  includeLocalDetails: boolean = true
): string {
  const service = getServiceById(serviceId)
  const city = getCityById(cityId)

  if (!service || !city) {
    throw new Error(`Invalid service ID (${serviceId}) or city ID (${cityId})`)
  }

  let description = `Professional ${service.name.toLowerCase()} services in ${city.name}, New Jersey. `

  // Add service-specific content
  description += `${service.shortDescription} `

  // Add city-specific content
  if (includeLocalDetails) {
    description += `Serving ${city.name}'s ${city.population.toLocaleString()} residents, `
    description += `we provide reliable transportation throughout ${city.county} County. `

    // Mention nearby landmarks
    if (city.landmarks.length > 0) {
      const landmarkNames = city.landmarks
        .slice(0, 2)
        .map((l) => l.name)
        .join(' and ')
      description += `Our drivers are familiar with local landmarks like ${landmarkNames}. `
    }

    // Include airport distances for relevant services
    if (serviceId === 'airport-transfers' && city.nearbyAirports.length > 0) {
      const nearest = city.nearbyAirports[0]
      description += `Just ${nearest.distance} from ${nearest.name}, `
      description += `we ensure timely airport transfers for all ${city.name} travelers. `
    }

    // Add neighboring towns for broader appeal
    if (city.neighboringTowns.length > 0) {
      const neighbors = city.neighboringTowns.slice(0, 3).join(', ')
      description += `We also serve nearby communities including ${neighbors}. `
    }
  }

  // Add call-to-action
  description += `Book your ${service.name.toLowerCase()} in ${city.name} today for premium service at competitive rates.`

  return description
}

/**
 * Generates SEO meta tags for a service-city combination
 */
export function generateMetaTags(
  serviceId: string,
  cityId: string,
  baseUrl: string = 'https://nexttripanywhere.com'
): MetaTags {
  const service = getServiceById(serviceId)
  const city = getCityById(cityId)

  if (!service || !city) {
    throw new Error(`Invalid service ID (${serviceId}) or city ID (${cityId})`)
  }

  // Generate title (50-60 characters ideal)
  const title = `${service.name} in ${city.name} NJ | Next Trip Anywhere`

  // Generate description (150-160 characters ideal)
  const description = `Premium ${service.name.toLowerCase()} in ${city.name}, Essex County. Professional chauffeurs, luxury vehicles, competitive rates. Available 24/7. Book online or call now!`

  // Combine keywords
  const keywords = [
    ...service.keywords.map((k) => `${k} ${city.name}`),
    `${city.name} ${service.name.toLowerCase()}`,
    `${city.name} limo service`,
    `${city.name} car service`,
    `Essex County ${service.name.toLowerCase()}`,
    ...city.zipCodes.map((zip) => `${service.name.toLowerCase()} ${zip}`),
  ]

  // Generate Open Graph tags
  const ogTitle = `${service.name} Services in ${city.name}, New Jersey`
  const ogDescription = generateServiceDescription(serviceId, cityId, false).substring(0, 200)

  // Generate canonical URL
  const canonical = `${baseUrl}/essex-county/${cityId}/${serviceId}`

  return {
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage: `${baseUrl}/images/services/${serviceId}-hero.jpg`,
    canonical,
  }
}

/**
 * Generates structured data schema markup
 */
export function generateSchemaMarkup(
  serviceId: string,
  cityId: string,
  businessName: string = 'Next Trip Anywhere',
  baseUrl: string = 'https://nexttripanywhere.com'
): SchemaMarkup {
  const service = getServiceById(serviceId)
  const city = getCityById(cityId)

  if (!service || !city) {
    throw new Error(`Invalid service ID (${serviceId}) or city ID (${cityId})`)
  }

  const schema: SchemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'TransportationService',
    name: `${businessName} - ${service.name} in ${city.name}`,
    description: generateServiceDescription(serviceId, cityId, false),
    url: `${baseUrl}/essex-county/${cityId}/${serviceId}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city.name,
      addressRegion: 'NJ',
      postalCode: city.zipCodes[0],
    },
    priceRange: `$${service.priceRange.min} - $${service.priceRange.max}`,
    areaServed: [
      {
        '@type': 'City',
        name: city.name,
      },
      ...city.neighboringTowns.slice(0, 3).map((town) => ({
        '@type': 'City' as const,
        name: town,
      })),
    ],
    serviceType: service.name,
    provider: {
      '@type': 'Organization',
      name: businessName,
    },
  }

  return schema
}

/**
 * Generates location and service-specific FAQs
 */
export function generateFAQs(serviceId: string, cityId: string, count: number = 5): FAQ[] {
  const service = getServiceById(serviceId)
  const city = getCityById(cityId)

  if (!service || !city) {
    throw new Error(`Invalid service ID (${serviceId}) or city ID (${cityId})`)
  }

  const faqs: FAQ[] = []

  // Service-specific FAQs with city context
  switch (serviceId) {
    case 'airport-transfers':
      faqs.push({
        question: `How far is ${city.name} from Newark Airport?`,
        answer: `${city.name} is approximately ${city.nearbyAirports[0].distance} from Newark Liberty International Airport. Our professional drivers can get you there in 20-45 minutes depending on traffic conditions. We monitor your flight in real-time to ensure timely pickup.`,
      })
      faqs.push({
        question: `Do you provide airport transfers from ${city.name} to JFK and LaGuardia?`,
        answer: `Yes! We provide luxury airport transfers from ${city.name} to all major airports including JFK (${city.nearbyAirports.find((a) => a.code === 'JFK')?.distance || '28 miles'}), LaGuardia (${city.nearbyAirports.find((a) => a.code === 'LGA')?.distance || '22 miles'}), Newark, and Philadelphia airports. Our fleet includes sedans, SUVs, and vans to accommodate any group size.`,
      })
      break

    case 'wedding-transportation':
      faqs.push({
        question: `What wedding venues do you service in ${city.name}?`,
        answer: `We provide wedding transportation to all venues in and around ${city.name}, including ${city.landmarks
          .filter((l) => l.type === 'Recreation' || l.type === 'Park')
          .slice(0, 2)
          .map((l) => l.name)
          .join(
            ', '
          )}. Our chauffeurs are familiar with local churches, reception halls, and photo locations throughout Essex County.`,
      })
      faqs.push({
        question: `Do you decorate wedding vehicles in ${city.name}?`,
        answer: `Absolutely! Our wedding vehicles can be decorated with ribbons, bows, and "Just Married" signs. We also provide red carpet service and complimentary champagne for the newlyweds. All decorations are tastefully done to match your wedding theme.`,
      })
      break

    case 'corporate-travel':
      faqs.push({
        question: `Do you offer corporate accounts for ${city.name} businesses?`,
        answer: `Yes, we offer corporate accounts with flexible billing options for ${city.name} businesses. With a median income of $${(city.demographics.medianIncome / 1000).toFixed(0)}k, many local executives rely on our services for reliable business transportation to Manhattan, Newark, and throughout the tri-state area.`,
      })
      break

    case 'medical-appointments':
      faqs.push({
        question: `Can you provide wheelchair-accessible transportation in ${city.name}?`,
        answer: `Yes, we offer wheelchair-accessible vehicles for medical appointments in ${city.name} and surrounding areas. Our drivers are trained to assist passengers with mobility needs and can provide door-to-door service to any medical facility in Essex County.`,
      })
      break
  }

  // Generic FAQs with local context
  faqs.push({
    question: `What areas near ${city.name} do you service?`,
    answer: `In addition to ${city.name}, we provide ${service.name.toLowerCase()} throughout Essex County including ${city.neighboringTowns.slice(0, 4).join(', ')}. Our service area covers all of North Jersey with connections to New York City and Philadelphia.`,
  })

  faqs.push({
    question: `How much does ${service.name.toLowerCase()} cost in ${city.name}?`,
    answer: `Our ${service.name.toLowerCase()} in ${city.name} ranges from $${service.priceRange.min} to $${service.priceRange.max} ${service.priceRange.unit}, depending on vehicle type, distance, and specific requirements. We offer competitive rates and often match or beat competitor pricing. Contact us for a free quote tailored to your needs.`,
  })

  faqs.push({
    question: `How do I book ${service.name.toLowerCase()} in ${city.name}?`,
    answer: `Booking is easy! You can reserve your ${service.name.toLowerCase()} online through our website, call us 24/7, or use our mobile app. We recommend booking at least 24 hours in advance, though we do accommodate last-minute requests when possible. All major credit cards are accepted.`,
  })

  // Add vehicle-specific FAQ
  faqs.push({
    question: `What vehicles are available for ${service.name.toLowerCase()} in ${city.name}?`,
    answer: `We offer a premium fleet including ${service.vehicles.slice(0, 3).join(', ')} and more. All vehicles are professionally maintained, fully insured, and driven by licensed chauffeurs familiar with ${city.name} and the surrounding ${city.majorHighways.join(', ')} routes.`,
  })

  // Return requested number of FAQs
  return faqs.slice(0, count)
}

/**
 * Generates keyword-rich headings for content sections
 */
export function generateSectionHeadings(serviceId: string, cityId: string): string[] {
  const service = getServiceById(serviceId)
  const city = getCityById(cityId)

  if (!service || !city) {
    throw new Error(`Invalid service ID (${serviceId}) or city ID (${cityId})`)
  }

  return [
    `Premium ${service.name} Services in ${city.name}, NJ`,
    `Why Choose Our ${city.name} ${service.name}`,
    `${service.name} Rates and Vehicles in ${city.name}`,
    `Serving ${city.name} and ${city.county} County Since 2010`,
    `Book Your ${service.name} in ${city.name} Today`,
    `${city.name} ${service.name}: Local Expertise, Global Standards`,
  ]
}

/**
 * Generates localized content paragraphs
 */
export function generateLocalContent(serviceId: string, cityId: string): string[] {
  const service = getServiceById(serviceId)
  const city = getCityById(cityId)

  if (!service || !city) {
    throw new Error(`Invalid service ID (${serviceId}) or city ID (${cityId})`)
  }

  const paragraphs: string[] = []

  // Introduction paragraph with local context
  paragraphs.push(
    `Welcome to Next Trip Anywhere's ${service.name.toLowerCase()} in ${city.name}, New Jersey. As a trusted transportation provider in Essex County, we understand the unique needs of ${city.name}'s ${city.population.toLocaleString()} residents. ${city.description}`
  )

  // Service benefits with local landmarks
  if (city.landmarks.length > 0) {
    const landmarkList = city.landmarks
      .slice(0, 3)
      .map((l) => l.name)
      .join(', ')
    paragraphs.push(
      `Our professional chauffeurs are intimately familiar with ${city.name}'s layout, from ${landmarkList} to every neighborhood street. This local knowledge ensures efficient routes and timely arrivals for your ${service.name.toLowerCase()} needs.`
    )
  }

  // Transportation infrastructure
  paragraphs.push(
    `Located with convenient access to ${city.majorHighways.join(', ')}, ${city.name} is perfectly positioned for travel throughout the tri-state area. Our ${service.name.toLowerCase()} leverages these major routes to provide swift, comfortable transportation whether you're heading to ${city.nearbyAirports[0].name} or downtown Manhattan.`
  )

  // Community focus
  if (city.businessDistricts.length > 0) {
    paragraphs.push(
      `We're proud to serve ${city.name}'s thriving business community, including the ${city.businessDistricts[0]} area. Our ${service.name.toLowerCase()} caters to professionals in ${city.demographics.primaryIndustries.slice(0, 3).join(', ')}, providing reliable transportation that matches the high standards of our clientele.`
    )
  }

  // Service-specific local content
  if (serviceId === 'airport-transfers') {
    paragraphs.push(
      `With ${city.nearbyAirports[0].name} just ${city.nearbyAirports[0].distance} away, ${city.name} residents rely on our punctual airport transfer service. We monitor all flights in real-time and adjust pickup times accordingly, ensuring stress-free travel from your ${city.name} home to any terminal.`
    )
  } else if (serviceId === 'corporate-travel') {
    paragraphs.push(
      `${city.name}'s median household income of $${(city.demographics.medianIncome / 1000).toFixed(0)},000 reflects a community that values professional excellence. Our corporate travel services match this standard, providing executive transportation that enhances your business image while ensuring productive travel time.`
    )
  }

  return paragraphs
}

/**
 * Calculates keyword density for SEO optimization
 */
export function calculateKeywordDensity(content: string, keywords: string[]): Map<string, number> {
  const density = new Map<string, number>()
  const totalWords = content.split(/\s+/).length

  keywords.forEach((keyword) => {
    const keywordLower = keyword.toLowerCase()
    const regex = new RegExp(`\\b${keywordLower}\\b`, 'gi')
    const matches = content.match(regex)
    const count = matches ? matches.length : 0
    const percentage = (count / totalWords) * 100
    density.set(keyword, percentage)
  })

  return density
}

/**
 * Optimizes content for target keyword density (1-3% ideal)
 */
export function optimizeKeywordDensity(
  content: string,
  primaryKeyword: string,
  targetDensity: number = 2
): string {
  const currentDensity = calculateKeywordDensity(content, [primaryKeyword]).get(primaryKeyword) || 0

  if (currentDensity >= targetDensity) {
    return content
  }

  // Add keyword naturally to increase density
  // This is a simplified example - in production, you'd want more sophisticated insertion
  const sentences = content.split('. ')
  const keywordInsertions = Math.ceil(((targetDensity - currentDensity) * sentences.length) / 100)

  for (
    let i = 0;
    i < keywordInsertions && i < sentences.length;
    i += Math.floor(sentences.length / keywordInsertions)
  ) {
    if (!sentences[i].toLowerCase().includes(primaryKeyword.toLowerCase())) {
      // Add keyword contextually (this is simplified)
      sentences[i] = sentences[i].replace(
        /our service|we provide|we offer/i,
        `our ${primaryKeyword}`
      )
    }
  }

  return sentences.join('. ')
}
