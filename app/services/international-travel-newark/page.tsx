/**
 * @fileoverview International Travel from Newark Airport landing page
 * @module app/services/international-travel-newark/page
 *
 * Landing page for international travel services from EWR with visa assistance.
 */

import { Metadata } from 'next'
import ServicePageTemplate from '@/components/services/ServicePageTemplate'

export const metadata: Metadata = {
  title: 'International Flights EWR | Newark Airport Travel Services | Next Trip Anywhere',
  description:
    'Book international flights from Newark Airport (EWR). Expert visa assistance, travel insurance, and personalized itineraries for Essex County travelers.',
  keywords:
    'international flights EWR, Newark Airport destinations, international travel Newark, visa assistance Essex County, travel insurance Newark, EWR departures, passport services NJ',
  openGraph: {
    title: 'International Travel from Newark Airport - Global Destinations',
    description:
      'Your gateway to the world from Newark Airport. Expert international travel planning with visa assistance and comprehensive support.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'International Travel from Newark Airport | Expert Planning',
    description: 'Fly anywhere from EWR with expert planning, visa assistance, and 24/7 support.',
  },
  alternates: {
    canonical: 'https://nexttripanywhere.com/services/international-travel-newark',
  },
}

export default function InternationalTravelNewarkPage() {
  const benefits = [
    {
      icon: 'Globe' as const,
      title: 'Direct Global Connections',
      description:
        'Access to 140+ international destinations from Newark Airport with major airlines. We find the best routes and connections.',
    },
    {
      icon: 'FileCheck' as const,
      title: 'Complete Visa Services',
      description:
        'Full visa assistance including applications, document preparation, and expedited processing. We handle the paperwork.',
    },
    {
      icon: 'Shield' as const,
      title: 'Comprehensive Travel Insurance',
      description:
        'Medical coverage, trip cancellation, lost luggage protection, and emergency evacuation insurance tailored to your destination.',
    },
    {
      icon: 'Clock' as const,
      title: '24/7 Global Support',
      description:
        'Round-the-clock assistance in any time zone. Emergency rebooking, translation services, and local contacts worldwide.',
    },
    {
      icon: 'Languages' as const,
      title: 'Multilingual Assistance',
      description:
        'Our team speaks multiple languages and understands cultural nuances to ensure smooth international travel.',
    },
    {
      icon: 'Briefcase' as const,
      title: 'Business Travel Expertise',
      description:
        'Specialized services for international business travel including visa fast-tracking and corporate account management.',
    },
  ]

  const features = [
    'Direct flights from Newark Liberty International',
    'Visa and passport expediting services',
    'Travel insurance with COVID coverage',
    'Currency exchange assistance',
    'International phone and data plans',
    'Airport lounge access arrangements',
    'TSA PreCheck and Global Entry assistance',
    'Vaccination and health documentation',
    'Embassy and consulate coordination',
    'Lost passport emergency support',
    'Multi-city international itineraries',
    'First and business class upgrades',
  ]

  const testimonials = [
    {
      name: 'David Chen',
      location: 'Livingston, NJ',
      rating: 5,
      text: 'They handled my complex multi-country Asia trip perfectly. Visa for China, connecting flights through Tokyo, and they even helped when my flight was cancelled. Incredible service!',
      service: 'Asia Business Trip',
    },
    {
      name: 'Sarah Thompson',
      location: 'West Orange, NJ',
      rating: 5,
      text: 'First time traveling to Africa and they made it so easy. Arranged all vaccinations info, visa for Kenya, and the safari connections. The 24/7 support gave me peace of mind.',
      service: 'Kenya Safari Adventure',
    },
    {
      name: 'The Martinez Family',
      location: 'Newark, NJ',
      rating: 5,
      text: 'European vacation with 3 kids seemed daunting, but they planned everything. Direct flights to Rome, train passes, and they helped when we needed emergency passport replacement for our son.',
      service: 'European Family Tour',
    },
  ]

  const pricing = [
    {
      name: 'Standard',
      price: '$149',
      description: 'Basic international travel planning',
      features: [
        'Flight booking and seat selection',
        'Basic travel insurance quote',
        'Visa requirement consultation',
        'Digital itinerary creation',
        'Email support during travel',
      ],
    },
    {
      name: 'Premium',
      price: '$299',
      description: 'Complete international travel management',
      features: [
        'Flight optimization with best routes',
        'Comprehensive travel insurance',
        'Full visa application assistance',
        'Airport transfer arrangements',
        'Hotel and activity bookings',
        '24/7 phone support',
        'Currency and communication setup',
        'TSA PreCheck assistance',
      ],
      highlighted: true,
    },
    {
      name: 'Executive',
      price: '$599',
      description: 'White-glove international service',
      features: [
        'Business/First class booking',
        'Expedited visa processing',
        'Premium travel insurance',
        'Airport VIP lounge access',
        'Personal travel concierge',
        'Emergency evacuation coverage',
        'Multi-destination planning',
        'Corporate billing available',
        'Dedicated account manager',
      ],
    },
  ]

  const faqs = [
    {
      question: 'How early should I book international flights from Newark?',
      answer:
        'For best prices and availability, we recommend booking international flights 2-6 months in advance. Peak season travel (summer and holidays) should be booked even earlier. We monitor prices and can alert you to deals.',
    },
    {
      question: 'Do you handle visa applications?',
      answer:
        'Yes! We provide complete visa services including determining requirements, preparing applications, gathering documents, and submitting to consulates. We also offer expedited processing when available.',
    },
    {
      question: 'What if my flight from EWR is cancelled?',
      answer:
        'We provide 24/7 support for flight disruptions. We will immediately work on rebooking, contact airlines on your behalf, arrange accommodations if needed, and ensure you reach your destination.',
    },
    {
      question: 'Can you help with travel vaccines and health requirements?',
      answer:
        'Absolutely. We provide detailed health requirement information for your destination, connect you with travel clinics in Essex County, and ensure you have all necessary health documentation.',
    },
    {
      question: 'Do you book complex multi-country trips?',
      answer:
        'Yes, multi-destination international trips are our specialty. We optimize routing, handle varying visa requirements, coordinate regional flights, and create seamless itineraries across multiple countries.',
    },
  ]

  const certifications = [
    'IATA Accredited Agency',
    'US State Dept Registered',
    'TSA Certified',
    'ASTA International Specialist',
    'Travel Insurance Licensed',
    'BBB A+ Rating',
  ]

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'International Travel from Newark Airport',
    provider: {
      '@type': 'TravelAgency',
      name: 'Next Trip Anywhere',
      telephone: '973-874-1019',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Essex County',
        addressRegion: 'NJ',
      },
    },
    areaServed: {
      '@type': 'Place',
      name: 'Newark Airport, Essex County, New Jersey',
    },
    description:
      'International travel planning services from Newark Airport (EWR) including flights, visa assistance, travel insurance, and 24/7 support.',
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '149',
      highPrice: '599',
      priceCurrency: 'USD',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ServicePageTemplate
        serviceName="International Travel Services"
        headline="Your Gateway to the World from Newark Airport"
        subheadline="Expert international travel planning from EWR with comprehensive visa assistance, travel insurance, and 24/7 global support for Essex County travelers."
        description="Newark Liberty International Airport (EWR) is your gateway to over 140 international destinations. As Essex County's international travel specialists, Next Trip Anywhere provides complete travel management from your doorstep to destinations worldwide. Our experienced team handles everything from visa applications and travel insurance to flight optimization and emergency support. With expertise in business travel, family vacations, and adventure trips, we ensure your international journey is seamless, safe, and memorable."
        icon="Plane"
        benefits={benefits}
        features={features}
        testimonials={testimonials}
        pricing={pricing}
        faqs={faqs}
        certifications={certifications}
        statistics={[
          { value: '140+', label: 'Global Destinations' },
          { value: '98%', label: 'Visa Success Rate' },
          { value: '24/7', label: 'Emergency Support' },
          { value: '15min', label: 'Average Response Time' },
        ]}
        relatedServices={[
          { name: 'Business Travel', link: '/services/corporate-travel-essex' },
          { name: 'Cruise Packages', link: '/services/cruises-essex-county' },
          { name: 'Group Travel', link: '/services/group-travel-essex' },
        ]}
      />
    </>
  )
}
