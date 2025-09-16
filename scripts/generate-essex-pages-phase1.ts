#!/usr/bin/env tsx
/**
 * Essex County SEO Expansion - Phase 1 Page Generator
 * Generates 121 service pages:
 * - 99 pages: 11 cities × 9 services (for cities with no existing services)
 * - 22 pages: group-travel for remaining cities (10 cities + 12 already have other services)
 */

import * as fs from 'fs'
import * as path from 'path'
import { getCityById } from '../lib/data/essex-county-cities'

// Service definitions
const SERVICES = [
  {
    slug: 'airport-transfers',
    name: 'Airport Transfers',
    description:
      'Reliable airport transportation to Newark Airport (EWR), JFK, LGA, and Philadelphia airports.',
    keywords: ['airport transfers', 'Newark airport', 'EWR transportation', 'airport shuttle', 'airport limo'],
    features: [
      'On-time pickup guarantee',
      'Flight tracking for accurate timing',
      'Meet & greet service available',
      'Luggage assistance included',
    ],
  },
  {
    slug: 'corporate-travel',
    name: 'Corporate Travel',
    description:
      'Comprehensive business travel solutions including flight booking, hotel arrangements, and expense management.',
    keywords: ['corporate travel', 'business travel', 'company trips', 'executive travel', 'business class'],
    features: [
      'Dedicated corporate account manager',
      'Streamlined expense reporting',
      'Negotiated corporate rates',
      'VIP lounge access',
    ],
  },
  {
    slug: 'cruise-transfers',
    name: 'Cruise Transfers',
    description:
      'Direct transfers to Manhattan, Brooklyn, and Cape Liberty cruise terminals with luggage assistance.',
    keywords: ['cruise transfers', 'port transportation', 'cruise terminal', 'Manhattan cruise port', 'Cape Liberty'],
    features: [
      'Direct service to all major cruise ports',
      'Luggage handling included',
      'Guaranteed on-time arrival',
      'Group coordination for families',
    ],
  },
  {
    slug: 'wedding-transportation',
    name: 'Wedding Transportation',
    description:
      'Elegant wedding transportation including limousines, party buses, and guest shuttle services.',
    keywords: ['wedding transportation', 'wedding limo', 'bridal party', 'guest shuttle', 'wedding cars'],
    features: [
      'Luxury vehicle selection',
      'Red carpet service',
      'Complimentary champagne',
      'Decorated vehicles available',
    ],
  },
  {
    slug: 'special-events',
    name: 'Special Events',
    description:
      'Transportation for concerts, sporting events, proms, and special occasions throughout the tri-state area.',
    keywords: ['special events', 'concert transportation', 'sports events', 'prom limo', 'event shuttle'],
    features: [
      'VIP treatment for your special day',
      'Flexible scheduling options',
      'Group coordination services',
      'Safe return transportation',
    ],
  },
  {
    slug: 'wine-tours-day-trips',
    name: 'Wine Tours & Day Trips',
    description:
      'Guided wine tours to NJ wineries, NYC day trips, and Atlantic City excursions with comfortable transportation.',
    keywords: ['wine tours', 'day trips', 'winery tours', 'NYC tours', 'Atlantic City trips'],
    features: [
      'Knowledgeable tour guides',
      'Curated winery selection',
      'Lunch arrangements included',
      'Safe designated driver',
    ],
  },
  {
    slug: 'medical-appointments',
    name: 'Medical Appointments',
    description: 'Safe, reliable transportation to medical appointments, treatments, and hospital visits.',
    keywords: ['medical transportation', 'hospital transport', 'doctor appointments', 'medical shuttle', 'healthcare transport'],
    features: [
      'Wheelchair accessible vehicles',
      'Trained medical transport staff',
      'Door-to-door service',
      'Appointment scheduling assistance',
    ],
  },
  {
    slug: 'school-transportation',
    name: 'School Transportation',
    description:
      'Safe student transportation for field trips, sports events, and daily school runs with certified drivers.',
    keywords: ['school transportation', 'student transport', 'field trips', 'school bus', 'student shuttle'],
    features: [
      'Certified and vetted drivers',
      'Safety-first approach',
      'GPS tracking for parents',
      'Flexible scheduling',
    ],
  },
  {
    slug: 'group-travel',
    name: 'Group Travel',
    description:
      'Professional group travel coordination for schools, churches, sports teams, and organizations.',
    keywords: ['group travel', 'organization trips', 'school travel', 'church groups', 'sports teams'],
    features: [
      'Dedicated group coordinator',
      'Special group rates',
      'Customized itineraries',
      '24/7 support',
    ],
  },
]

// Cities that need all 9 services (no existing services)
const CITIES_NEEDING_ALL_SERVICES = [
  { slug: 'belleville', name: 'Belleville', population: 38222 },
  { slug: 'bloomfield', name: 'Bloomfield', population: 53105 },
  { slug: 'essex-fells', name: 'Essex Fells', population: 2288 },
  { slug: 'fairfield', name: 'Fairfield', population: 7615 },
  { slug: 'glen-ridge', name: 'Glen Ridge', population: 7852 },
  { slug: 'livingston', name: 'Livingston', population: 31334 },
  { slug: 'north-caldwell', name: 'North Caldwell', population: 7375 },
  { slug: 'nutley', name: 'Nutley', population: 30143 },
  { slug: 'roseland', name: 'Roseland', population: 6290 },
  { slug: 'verona', name: 'Verona', population: 14572 },
  { slug: 'west-caldwell', name: 'West Caldwell', population: 11223 },
]

// Cities that need only group-travel (already have other services)
const CITIES_NEEDING_GROUP_TRAVEL = [
  { slug: 'caldwell', name: 'Caldwell', population: 9027 },
  { slug: 'cedar-grove', name: 'Cedar Grove', population: 14052 },
  { slug: 'east-orange', name: 'East Orange', population: 69612 },
  { slug: 'irvington', name: 'Irvington', population: 61176 },
  { slug: 'maplewood', name: 'Maplewood', population: 25684 },
  { slug: 'millburn', name: 'Millburn', population: 21710 },
  { slug: 'montclair', name: 'Montclair', population: 40921 },
  { slug: 'newark', name: 'Newark', population: 311549 },
  { slug: 'south-orange', name: 'South Orange', population: 18484 },
  { slug: 'west-orange', name: 'West Orange', population: 48843 },
]

// Generate the page template
function generatePageContent(city: any, service: any): string {
  const cityNameFormatted = city.name
  const serviceName = service.name

  // Create unique metadata descriptions based on city and service
  const getUniqueDescription = () => {
    const templates = [
      `Professional ${service.name.toLowerCase()} services for ${cityNameFormatted} residents. ${service.description} Call 833-874-1019 for immediate assistance.`,
      `${serviceName} in ${cityNameFormatted}, NJ - Next Trip Anywhere provides ${service.description.toLowerCase()} Serving Essex County with excellence.`,
      `Reliable ${service.name.toLowerCase()} for ${cityNameFormatted} and surrounding areas. ${service.description} Available 24/7 at 833-874-1019.`,
    ]
    // Use city population to deterministically select a template
    return templates[city.population % templates.length]
  }

  const getLocalInfo = () => {
    const templates = [
      `Professional ${service.name.toLowerCase()} services tailored for ${cityNameFormatted} residents and businesses.`,
      `Serving ${cityNameFormatted} with premium ${service.name.toLowerCase()} solutions since 2010.`,
      `Your trusted ${service.name.toLowerCase()} provider in ${cityNameFormatted} and Essex County.`,
    ]
    return templates[(city.population + service.name.length) % templates.length]
  }

  return `/**
 * ${cityNameFormatted} ${serviceName} Service Page
 * Generated for Essex County SEO - Phase 1
 */

import { Metadata } from 'next'
import ServicePageTemplate from '@/components/services/ServicePageTemplate'
import { generateServiceMetadata } from '@/lib/seo/service-metadata'
import { getCityBySlug, getServiceBySlug } from '@/lib/seo/essex-county-services'
import { getCityById } from '@/lib/data/essex-county-cities'

const city = getCityBySlug('${city.slug}')!
const service = getServiceBySlug('${service.slug}')!
const cityData = getCityById('${city.slug}')

export const metadata: Metadata = {
  title: \`${serviceName} in ${cityNameFormatted}, NJ | Next Trip Anywhere\`,
  description: \`${getUniqueDescription()}\`,
  keywords: [
    \`${service.slug} ${cityNameFormatted}\`,
    \`${cityNameFormatted} ${service.name.toLowerCase()}\`,
    ...${JSON.stringify(service.keywords)},
    \`${cityNameFormatted} NJ\`,
    'Essex County',
  ],
  alternates: {
    canonical: \`https://nexttripanywhere.com/travel-from-${city.slug}/${service.slug}\`,
  },
  openGraph: {
    title: \`${serviceName} in ${cityNameFormatted} | Next Trip Anywhere\`,
    description: \`Professional ${service.name.toLowerCase()} for ${cityNameFormatted} residents. ${service.description}\`,
    url: \`https://nexttripanywhere.com/travel-from-${city.slug}/${service.slug}\`,
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
  },
}

export default function ${cityNameFormatted.replace(/[^a-zA-Z]/g, '')}${serviceName.replace(/[^a-zA-Z]/g, '')}Page() {
  const serviceData = {
    city: city.name,
    service: service.name,
    description: service.description,
    features: ${JSON.stringify(service.features, null, 6).split('\n').join('\n    ')},
    localInfo:
      '${getLocalInfo()}',
    population: city.population,
    nearbyAirports: cityData?.nearbyAirports || [],
    landmarks: cityData?.landmarks || [],
    transportationNeeds: cityData?.transportationNeeds || [],
  }

  return (
    <>
      <ServicePageTemplate {...serviceData} />

      {/* Local SEO Content */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">${serviceName} for ${cityNameFormatted} Residents</h2>
            <div className="prose max-w-none">
              <p>
                ${getLocalInfo()} With a population of ${city.population.toLocaleString()}, ${cityNameFormatted} residents trust Next Trip Anywhere for
                reliable ${service.name.toLowerCase()} services.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-4">
                Why Choose Our ${serviceName} Service?
              </h3>
              <ul className="space-y-2">
                ${service.features.map((f: string) => `<li>• ${f}</li>`).join('\n                ')}
              </ul>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Service Areas in ${cityNameFormatted}</h3>
                <p>
                  We proudly serve all neighborhoods in ${cityNameFormatted}, including residential areas,
                  business districts, and surrounding communities. Our ${service.name.toLowerCase()} service is
                  available 24/7 for your convenience.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Book Your ${serviceName} Today</h3>
                <p>
                  Ready to experience premium ${service.name.toLowerCase()} service? Contact Next Trip Anywhere at{' '}
                  <a href="tel:833-874-1019" className="text-blue-600 font-semibold">
                    833-874-1019
                  </a>{' '}
                  or visit our office to discuss your needs with our experienced team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
`
}

// Main generation function
async function generatePages() {
  let totalCreated = 0
  let totalSkipped = 0
  const createdPages: string[] = []

  // 1. Generate all 9 services for cities with no existing services
  console.log('\n📝 Phase 1: Generating services for cities with no existing services...\n')

  for (const city of CITIES_NEEDING_ALL_SERVICES) {
    const cityDir = path.join(process.cwd(), 'app', `travel-from-${city.slug}`)

    for (const service of SERVICES) {
      const serviceDir = path.join(cityDir, service.slug)
      const pagePath = path.join(serviceDir, 'page.tsx')

      // Check if page already exists
      if (fs.existsSync(pagePath)) {
        console.log(`⏩ Skipping: ${city.name}/${service.name} (already exists)`)
        totalSkipped++
        continue
      }

      // Create directory if it doesn't exist
      if (!fs.existsSync(serviceDir)) {
        fs.mkdirSync(serviceDir, { recursive: true })
      }

      // Generate and write the page
      const pageContent = generatePageContent(city, service)
      fs.writeFileSync(pagePath, pageContent)

      console.log(`✅ Created: ${city.name}/${service.name}`)
      createdPages.push(`travel-from-${city.slug}/${service.slug}`)
      totalCreated++
    }
  }

  // 2. Generate group-travel pages for cities that already have other services
  console.log('\n📝 Phase 2: Adding group-travel to cities with existing services...\n')

  const groupTravelService = SERVICES.find(s => s.slug === 'group-travel')!

  for (const city of CITIES_NEEDING_GROUP_TRAVEL) {
    const cityDir = path.join(process.cwd(), 'app', `travel-from-${city.slug}`)
    const serviceDir = path.join(cityDir, 'group-travel')
    const pagePath = path.join(serviceDir, 'page.tsx')

    // Check if page already exists
    if (fs.existsSync(pagePath)) {
      console.log(`⏩ Skipping: ${city.name}/Group Travel (already exists)`)
      totalSkipped++
      continue
    }

    // Create directory if it doesn't exist
    if (!fs.existsSync(serviceDir)) {
      fs.mkdirSync(serviceDir, { recursive: true })
    }

    // Generate and write the page
    const pageContent = generatePageContent(city, groupTravelService)
    fs.writeFileSync(pagePath, pageContent)

    console.log(`✅ Created: ${city.name}/Group Travel`)
    createdPages.push(`travel-from-${city.slug}/group-travel`)
    totalCreated++
  }

  // Summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 GENERATION COMPLETE')
  console.log('='.repeat(60))
  console.log(`✅ Pages created: ${totalCreated}`)
  console.log(`⏩ Pages skipped: ${totalSkipped}`)
  console.log(`📄 Total expected: 121`)

  if (totalCreated > 0) {
    console.log('\n🔍 Sample of created pages:')
    createdPages.slice(0, 5).forEach(page => {
      console.log(`   - /${page}`)
    })
    if (createdPages.length > 5) {
      console.log(`   ... and ${createdPages.length - 5} more`)
    }
  }

  console.log('\n✨ Phase 1 SEO expansion complete!')
}

// Run the generator
generatePages().catch(console.error)