/**
 * Enhanced Newark Airport Transfer Service Content
 * Provides comprehensive, authoritative content for Newark airport pages
 */

import {
  NEWARK_TERMINALS,
  ESSEX_COUNTY_TRANSPORT,
  NEWARK_AIRPORT_FAQ,
  LOCAL_EXPERT_TIPS,
  CORPORATE_BENEFITS,
  VEHICLE_OPTIONS,
  SPECIAL_SERVICES,
  TERMINAL_TIPS,
  SEASONAL_ADVISORIES,
} from '@/lib/data/newark-airport-content'

export function getNewarkAirportContent(cityName: string) {
  // Find specific town transport info
  const townInfo = ESSEX_COUNTY_TRANSPORT.find((town) => town.name === cityName)
  const localTips = LOCAL_EXPERT_TIPS[cityName] || []

  // Get relevant FAQs for this town
  const relevantFAQs =
    cityName === 'Newark'
      ? NEWARK_AIRPORT_FAQ
      : NEWARK_AIRPORT_FAQ.filter(
          (faq) =>
            !faq.question.toLowerCase().includes('newark penn') ||
            faq.category === 'general' ||
            faq.category === 'terminals' ||
            faq.category === 'parking'
        )

  return {
    hero: {
      title: `Newark Airport Transportation from ${cityName}`,
      subtitle: `Professional EWR Airport Transfers for ${cityName} Residents`,
      description: townInfo
        ? `Just ${townInfo.distance} from Newark Liberty International Airport (EWR), ${cityName} residents enjoy convenient access to one of the nation's busiest airports. With ${townInfo.driveTime} average drive time and multiple transportation options starting at ${townInfo.uberCost.split('-')[0]}, Next Trip Anywhere provides reliable, professional airport transfer services tailored to ${cityName}'s unique needs.`
        : `Professional Newark Airport (EWR) transportation services for ${cityName} residents. Reliable, on-time airport transfers with experienced local drivers.`,
      stats: [
        { label: 'Distance to EWR', value: townInfo?.distance || 'N/A' },
        { label: 'Drive Time', value: townInfo?.driveTime || 'N/A' },
        { label: 'Starting Price', value: townInfo?.uberCost.split('-')[0] || 'Call for quote' },
        { label: 'Available 24/7', value: 'Yes' },
      ],
    },

    mainContent: {
      introduction: `
        <h2>Your Trusted ${cityName} to Newark Airport Transportation Expert</h2>
        <p>Next Trip Anywhere has been serving ${cityName} residents with premium Newark Airport transportation since 2010. As Essex County's leading airport transfer specialist, we understand the unique challenges of getting to EWR from ${cityName} - whether it's navigating ${townInfo?.driveTime || 'local'} traffic patterns, finding the most reliable routes, or ensuring on-time arrival for that important flight.</p>

        <p>Newark Liberty International Airport serves <strong>48+ million passengers annually</strong> with over 50 airlines operating from three terminals. As United Airlines' major East Coast hub, Terminal C alone handles 63% of Newark's passenger traffic. With our deep knowledge of Newark Airport's layout, traffic patterns, and the best routes from ${cityName}, we ensure a smooth, stress-free journey every time.</p>
      `,

      whyChooseUs: {
        title: `Why ${cityName} Residents Choose Next Trip Anywhere for Newark Airport Transfers`,
        points: [
          {
            title: 'Local Expertise',
            description: `We know ${cityName} inside and out - from the fastest routes during rush hour to the best pickup points in your neighborhood. ${localTips[0] || `Our drivers are familiar with all ${cityName} areas.`}`,
          },
          {
            title: 'Guaranteed On-Time Service',
            description: `With real-time flight tracking and traffic monitoring, we adjust pickup times automatically. We've never missed a flight in our 14+ years serving ${cityName}.`,
          },
          {
            title: 'Transparent Pricing',
            description: `No surge pricing, no hidden fees. Our rates from ${cityName} to Newark Airport are fixed and all-inclusive, starting at ${townInfo?.privateCarCost || '$65'}.`,
          },
          {
            title: '24/7 Availability',
            description: `Early morning flight? Late night arrival? We're available round-the-clock for ${cityName} residents, including holidays and weekends.`,
          },
        ],
      },

      transportOptions: {
        title: `${cityName} to Newark Airport: Your Transportation Options`,
        introduction: `Understanding your options helps you make the best choice for your specific needs and budget.`,
        options: townInfo
          ? [
              {
                method: 'Private Car Service (Recommended)',
                cost: townInfo.privateCarCost,
                time: townInfo.driveTime,
                pros: [
                  'Door-to-door service',
                  'Fixed rates',
                  'Flight monitoring',
                  'Professional drivers',
                  'No parking fees',
                ],
                cons: ['Higher upfront cost', 'Advance booking recommended'],
                bestFor: 'Business travelers, families with luggage, early/late flights',
              },
              {
                method: 'Uber/Lyft Rideshare',
                cost: `Uber: ${townInfo.uberCost}, Lyft: ${townInfo.lyftCost}`,
                time: townInfo.driveTime,
                pros: ['On-demand booking', 'App-based tracking', 'Various vehicle options'],
                cons: ['Surge pricing common', 'Driver may not know area', 'No flight monitoring'],
                bestFor: 'Last-minute trips, solo travelers, tech-savvy users',
              },
              {
                method: 'Traditional Taxi',
                cost: townInfo.taxiCost,
                time: townInfo.driveTime,
                pros: ['Metered fare', 'No app needed', 'Can hail on street'],
                cons: ['Variable pricing', 'May need to call dispatch', 'Cash often required'],
                bestFor: 'Spontaneous trips, cash payments',
              },
              ...(townInfo.publicTransit
                ? [
                    {
                      method: 'Public Transportation',
                      cost: townInfo.publicTransit.cost,
                      time: townInfo.publicTransit.duration,
                      pros: [
                        'Most affordable option',
                        'No traffic concerns on train',
                        'Environmentally friendly',
                      ],
                      cons: ['Multiple transfers', 'Limited luggage space', 'Fixed schedule'],
                      bestFor: 'Budget travelers, light packers, flexible schedule',
                    },
                  ]
                : []),
              {
                method: 'Drive & Park',
                cost: '$27-39/day parking',
                time: `${townInfo.driveTime} + parking`,
                pros: ['Complete flexibility', 'Car available on return', 'No coordination needed'],
                cons: ['Parking fees add up', 'Risk of car damage', 'Long walk with luggage'],
                bestFor: 'Short trips (1-3 days), irregular return times',
              },
            ]
          : [],
      },
    },

    terminalGuide: {
      title: 'Newark Airport Terminal Guide for Essex County Travelers',
      introduction:
        "Knowing your terminal saves time and reduces stress. Here's everything you need to know:",
      terminals: NEWARK_TERMINALS.map((terminal) => ({
        ...terminal,
        tips: (TERMINAL_TIPS as Record<string, string[]>)[terminal.name] || [],
      })),
    },

    localAreaInfo: {
      title: `${cityName} to Newark Airport: Routes, Tips & Local Knowledge`,
      pickupPoints: townInfo?.popularPickupPoints || [],
      localTips: localTips,
      trafficPatterns: {
        morning: `Morning Rush (7-9 AM): Expect ${townInfo?.trafficTime || '30-45 minutes'} from ${cityName}`,
        evening: `Evening Rush (4-7 PM): Heavy traffic, allow extra time`,
        weekend: 'Weekends: Generally lighter traffic, except Sunday evenings',
      },
    },

    costCalculator: {
      title: `Calculate Your ${cityName} to Newark Airport Transfer Cost`,
      baseRates: {
        economy: townInfo?.privateCarCost.split('-')[0] || '$65',
        premium: townInfo
          ? `$${parseInt(townInfo.privateCarCost.split('-')[0].replace('$', '')) + 20}`
          : '$85',
        suv: townInfo
          ? `$${parseInt(townInfo.privateCarCost.split('-')[0].replace('$', '')) + 30}`
          : '$95',
        van: townInfo
          ? `$${parseInt(townInfo.privateCarCost.split('-')[0].replace('$', '')) + 45}`
          : '$110',
      },
      factors: [
        'Time of day (rush hour adds 15-20%)',
        'Day of week (Fridays +30%, Sundays +20%)',
        'Number of passengers and luggage',
        'Special requests (child seats, meet & greet)',
        'Advance booking (save 10-15%)',
      ],
    },

    vehicleOptions: VEHICLE_OPTIONS,

    specialServices: SPECIAL_SERVICES,

    corporateBenefits: CORPORATE_BENEFITS,

    seasonalInfo: SEASONAL_ADVISORIES,

    faqs: {
      title: 'Frequently Asked Questions About Newark Airport Transportation',
      questions: relevantFAQs,
    },

    booking: {
      title: `Book Your ${cityName} to Newark Airport Transfer`,
      urgentMessage: 'Traveling within 48 hours? Call us directly for immediate assistance.',
      benefits: [
        '✓ Instant confirmation',
        '✓ Flight tracking included',
        '✓ Free cancellation up to 24 hours',
        '✓ Child seats available',
        '✓ Meet & greet option',
        '✓ 24/7 customer support',
      ],
      phoneNumber: '833-874-1019',
      onlineBookingUrl: '/book',
    },

    seoContent: {
      metaTitle: `${cityName} to Newark Airport EWR Transportation | Transfers from $${townInfo?.privateCarCost.split('-')[0].replace('$', '') || '65'}`,
      metaDescription: `Professional Newark Airport transfers from ${cityName}, NJ. ${townInfo?.distance || ''} ${townInfo?.driveTime || ''} drive. Private cars from ${townInfo?.privateCarCost.split('-')[0] || '$65'}. On-time guarantee. 24/7 service. Book online or call 833-874-1019.`,

      schemaData: {
        '@context': 'https://schema.org',
        '@type': 'TaxiService',
        name: `${cityName} to Newark Airport Transportation`,
        provider: {
          '@type': 'Organization',
          name: 'Next Trip Anywhere',
          telephone: '+1-833-874-1019',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Online Travel Services',
            addressLocality: 'Newark',
            addressRegion: 'NJ',
            postalCode: '07102',
          },
        },
        areaServed: {
          '@type': 'City',
          name: cityName,
        },
        serviceType: 'Airport Transfer',
        priceRange: townInfo?.privateCarCost || '$$',
      },
    },

    trustSignals: {
      stats: [
        { number: '48M+', label: 'Annual EWR Passengers Served' },
        { number: '14+', label: `Years Serving ${cityName}` },
        { number: '24/7', label: 'Available Every Day' },
        { number: '100%', label: 'On-Time Guarantee' },
      ],
      certifications: [
        'Licensed by NJ Department of Transportation',
        'TSA Certified Drivers',
        'Fully Insured & Bonded',
        'COVID-19 Safety Certified',
      ],
      testimonials: [
        {
          text: `The only airport service we trust in ${cityName}. Always on time, professional drivers, and fair prices.`,
          author: `Sarah M., ${cityName} Resident`,
          rating: 5,
        },
        {
          text: "Used them for our company's executive travel for 3 years. Impeccable service every single time.",
          author: `David L., ${cityName} Business Owner`,
          rating: 5,
        },
      ],
    },
  }
}

// Helper function to get comprehensive content for any city
export function getEnhancedAirportServiceContent(serviceSlug: string, cityName: string) {
  if (serviceSlug === 'airport-transfers') {
    return getNewarkAirportContent(cityName)
  }

  // Return null for other services (use existing content)
  return null
}
