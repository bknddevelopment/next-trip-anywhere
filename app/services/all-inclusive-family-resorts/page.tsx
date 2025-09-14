/**
 * @fileoverview All-Inclusive Family Resorts landing page
 * @module app/services/all-inclusive-family-resorts/page
 *
 * Landing page for all-inclusive family resort packages from Essex County.
 */

import { Metadata } from 'next'
import ServicePageTemplate from '@/components/services/ServicePageTemplate'

export const metadata: Metadata = {
  title: 'All-Inclusive Family Resorts Essex County | Kids Vacation Packages Newark',
  description:
    'Book all-inclusive family resorts from Newark. Kid-friendly vacation packages, school break specials, and multi-generation travel for Essex County families.',
  keywords:
    'family resorts from Newark, all-inclusive Essex County, kids vacation packages NJ, family travel Newark, school break vacations, Disney packages Newark, beach resorts families',
  openGraph: {
    title: 'All-Inclusive Family Resorts - Essex County Travel',
    description:
      'Create unforgettable family memories at all-inclusive resorts. Expert planning for Essex County families with kids clubs, teen programs, and multi-generation travel.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All-Inclusive Family Resorts | Essex County Specialists',
    description:
      'The perfect family vacation starts here. All-inclusive resorts with kids clubs, water parks, and activities for every age.',
  },
  alternates: {
    canonical: 'https://nexttripanywhere.com/services/all-inclusive-family-resorts',
  },
}

export default function AllInclusiveFamilyResortsPage() {
  const benefits = [
    {
      icon: 'Users' as const,
      title: 'Family Room Experts',
      description:
        'We find the perfect accommodations for your family size - connecting rooms, family suites, or villas with kitchens and multiple bedrooms.',
    },
    {
      icon: 'Baby' as const,
      title: 'Age-Appropriate Activities',
      description:
        'Resorts with supervised kids clubs, teen lounges, and adult-only areas. Everyone gets their perfect vacation.',
    },
    {
      icon: 'Utensils' as const,
      title: 'Dining for Picky Eaters',
      description:
        'Resorts with kid-friendly menus, 24-hour room service, and allergy accommodations. No hungry kids on vacation!',
    },
    {
      icon: 'Calendar' as const,
      title: 'School Calendar Planning',
      description:
        'We know Essex County school schedules and plan around breaks, professional days, and holidays for best rates.',
    },
    {
      icon: 'Heart' as const,
      title: 'Peace of Mind',
      description:
        'On-site medical facilities, lifeguards, and certified childcare. Travel insurance covers the whole family.',
    },
    {
      icon: 'GameController2' as const,
      title: 'Entertainment for All Ages',
      description:
        "Water parks, game rooms, sports, shows, and excursions. We match resorts to your family's interests.",
    },
  ]

  const features = [
    'Direct flights from Newark Airport',
    'Kids stay and eat free promotions',
    'Supervised kids clubs (ages 4-17)',
    'Water parks and lazy rivers',
    'Multiple pools including kids pools',
    'Beach access with calm waters',
    'Family suites with separate bedrooms',
    'Cribs, high chairs, and strollers available',
    'Teen lounges and activities',
    'Babysitting services',
    'Character breakfasts and themed dinners',
    'Non-motorized water sports included',
  ]

  const testimonials = [
    {
      name: 'Jennifer & Mike Wilson',
      location: 'Maplewood, NJ',
      rating: 5,
      text: 'With 3 kids ages 5-14, finding a resort that works for everyone seemed impossible. They found us the perfect place in Turks & Caicos - the kids club was amazing and we actually got to relax!',
      service: 'Beaches Turks & Caicos',
    },
    {
      name: 'The Patel Family',
      location: 'Millburn, NJ',
      rating: 5,
      text: 'Our Disney World package was flawless. FastPass+ for every ride, character dining reservations, and they even arranged a surprise birthday celebration for our daughter!',
      service: 'Disney World Package',
    },
    {
      name: 'Lisa Rodriguez',
      location: 'East Orange, NJ',
      rating: 5,
      text: 'Single mom with 2 teens - they found us an amazing deal at Club Med with teen programs that my kids loved. The all-inclusive meant no budget surprises!',
      service: 'Club Med Cancun',
    },
  ]

  const pricing = [
    {
      name: 'Value Season',
      price: '$2,499',
      description: 'Family of 4, 5 nights (Sept-Nov, Jan-Feb)',
      features: [
        'Round-trip flights from EWR',
        'Standard family room',
        'All meals and snacks',
        'Kids club access',
        'Basic resort activities',
        'Airport transfers',
      ],
    },
    {
      name: 'Peak Season',
      price: '$3,999',
      description: 'Family of 4, 7 nights (School breaks)',
      features: [
        'Round-trip flights from EWR',
        'Family suite with kitchen',
        'All meals and premium snacks',
        'Kids club with extended hours',
        'Water park access',
        'One family excursion',
        'Resort credits included',
        'Priority reservations',
      ],
      highlighted: true,
    },
    {
      name: 'Luxury Escape',
      price: '$6,999',
      description: 'Family of 4, 7 nights (Premium resorts)',
      features: [
        'First class flights available',
        'Two-bedroom villa or suite',
        'Butler or concierge service',
        'Private pool or beach area',
        'Unlimited premium activities',
        'Spa credits for parents',
        'Private family excursions',
        'Photographer session included',
        'VIP airport services',
      ],
    },
  ]

  const faqs = [
    {
      question: 'What age ranges do kids clubs typically cover?',
      answer:
        "Most all-inclusive resorts offer supervised programs for ages 4-17, divided into age groups (typically 4-6, 7-9, 10-12, and 13-17). Some resorts also offer nurseries for babies and toddlers (additional cost). We match you with resorts that fit your children's ages.",
    },
    {
      question: 'Are all meals really included for kids?',
      answer:
        'Yes! All-inclusive means all meals, snacks, and drinks (non-alcoholic) are included for everyone. Most resorts have kid-friendly options at every restaurant, plus room service. Special dietary needs can be accommodated.',
    },
    {
      question: 'When are the best times to travel with school-age children?',
      answer:
        'We track Essex County school calendars and recommend: February break (good weather, moderate prices), Spring break (peak season but great weather), Summer (hot but lots of availability), and Thanksgiving week (good deals if you book early).',
    },
    {
      question: 'Do you handle large family groups or reunions?',
      answer:
        'Absolutely! We specialize in multi-generation travel and family reunions. We can arrange group rates, block rooms together, plan private events, and coordinate activities for all ages. Groups of 10+ receive special perks.',
    },
    {
      question: 'What if my child gets sick at the resort?',
      answer:
        'All resorts we recommend have on-site medical facilities with English-speaking doctors. Our comprehensive travel insurance covers medical expenses, and we provide 24/7 support. We also share health prep tips before travel.',
    },
  ]

  const certifications = [
    'Disney Authorized Vacation Planner',
    'Beaches Resorts Preferred Agency',
    'Club Med Specialist',
    'Universal Studios Preferred',
    'Atlantis Ambassador Agency',
    'Family Travel Association Member',
  ]

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'All-Inclusive Family Resort Packages',
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
      name: 'Essex County, New Jersey',
    },
    description:
      'All-inclusive family resort vacation packages for Essex County families. Specializing in kid-friendly resorts with supervised programs, water parks, and activities for all ages.',
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '2499',
      highPrice: '6999',
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
        serviceName="Family Resort Packages"
        headline="Unforgettable All-Inclusive Family Vacations from Essex County"
        subheadline="Expert family travel planning with kid-friendly resorts, school break specials, and stress-free all-inclusive packages perfect for New Jersey families."
        description="Planning a family vacation shouldn't be stressful. Next Trip Anywhere specializes in all-inclusive family resorts that delight every generation. From toddlers to teenagers, parents to grandparents, we find resorts with the perfect mix of togetherness and independence. Our Essex County agents are parents too - we understand the challenges of family travel and know which resorts deliver on their promises. With supervised kids clubs, teen programs, water parks, and endless activities, everyone gets their dream vacation."
        icon="Hotel"
        benefits={benefits}
        features={features}
        testimonials={testimonials}
        pricing={pricing}
        faqs={faqs}
        certifications={certifications}
        statistics={[
          { value: '2,500+', label: 'Families Served' },
          { value: '4.9★', label: 'Parent Reviews' },
          { value: '50+', label: 'Family Resorts' },
          { value: '100%', label: 'Kids Approved' },
        ]}
        relatedServices={[
          { name: 'Disney Vacations', link: '/destinations' },
          { name: 'Cruise Packages', link: '/services/cruises-essex-county' },
          { name: 'Group Travel', link: '/services/group-travel-essex' },
        ]}
      />
    </>
  )
}
