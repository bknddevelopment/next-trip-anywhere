/**
 * @fileoverview Group Travel for Organizations landing page
 * @module app/services/group-travel-essex/page
 *
 * Landing page for group travel services for Essex County organizations.
 */

import { Metadata } from 'next'
import ServicePageTemplate from '@/components/services/ServicePageTemplate'

export const metadata: Metadata = {
  title: 'Group Travel Essex County | School Trips & Organization Travel Newark',
  description:
    'Expert group travel planning for Essex County organizations. School trips, church groups, sports teams, and corporate events with dedicated coordination.',
  keywords:
    'group travel Essex County, organization trips Newark, school travel NJ, church group travel, sports team travel, student trips Newark, group rates Essex County',
  openGraph: {
    title: 'Group Travel Services - Essex County Organizations',
    description:
      'Professional group travel planning for schools, churches, sports teams, and organizations. Complete coordination from Essex County.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Group Travel Essex County | Complete Organization Services',
    description:
      'Expert group travel coordination for Essex County schools, churches, teams, and organizations.',
  },
  alternates: {
    canonical: 'https://nexttripanywhere.com/services/group-travel-essex',
  },
}

export default function GroupTravelEssexPage() {
  const benefits = [
    {
      icon: 'Users' as const,
      title: 'Dedicated Group Coordinator',
      description:
        'One experienced coordinator handles your entire group from planning to return, ensuring consistency and accountability.',
    },
    {
      icon: 'Bus' as const,
      title: 'Complete Transportation',
      description:
        'Charter buses from Essex County locations, airport transfers, and local transportation at your destination all arranged.',
    },
    {
      icon: 'ClipboardCheck' as const,
      title: 'Detailed Planning',
      description:
        "Comprehensive itineraries, rooming lists, meal arrangements, and activity scheduling tailored to your group's needs.",
    },
    {
      icon: 'Award' as const,
      title: 'Group Perks & Discounts',
      description:
        'Exclusive group rates, complimentary leader packages, and special amenities not available to individual travelers.',
    },
    {
      icon: 'Heart' as const,
      title: 'Safety First',
      description:
        'Background-checked vendors, comprehensive insurance, emergency protocols, and 24/7 support for group leaders.',
    },
    {
      icon: 'Calendar' as const,
      title: 'Flexible Payment Options',
      description:
        'Individual payment collection, installment plans, and fundraising support to make group travel accessible.',
    },
  ]

  const features = [
    'Groups from 10 to 500+ travelers',
    'Complimentary packages for group leaders',
    'Custom group websites for communication',
    'Individual payment collection service',
    'Rooming list management',
    'Special dietary accommodations',
    'Group dining reservations',
    'Private event planning',
    'Educational program coordination',
    'Performance and competition logistics',
    'Travel insurance for entire group',
    'Emergency contact system',
  ]

  const testimonials = [
    {
      name: 'Principal Margaret Johnson',
      location: 'East Orange High School',
      rating: 5,
      text: 'Our senior class trip to Washington DC was perfectly executed. 120 students, educational tours, and not a single issue. The planning portal made parent communication easy.',
      service: 'Senior Class Trip',
    },
    {
      name: 'Pastor Michael Williams',
      location: 'First Baptist Newark',
      rating: 5,
      text: 'Our mission trip to Haiti with 35 members was life-changing. They handled all logistics including supplies transport and coordinated with our partner organization perfectly.',
      service: 'Church Mission Trip',
    },
    {
      name: 'Coach Tony Martinez',
      location: 'Essex County Youth Soccer',
      rating: 5,
      text: 'Tournament travel for 3 teams (45 kids and parents) to Florida was seamless. Hotels near the fields, team meals arranged, and they even helped with equipment transport.',
      service: 'Sports Tournament Travel',
    },
  ]

  const pricing = [
    {
      name: 'Small Group',
      price: '$99/person',
      description: '10-25 travelers',
      features: [
        'Dedicated coordinator',
        'Group rate negotiations',
        'Basic itinerary planning',
        'Rooming list management',
        'One complimentary leader package per 15 paid',
        'Email support',
      ],
    },
    {
      name: 'Standard Group',
      price: '$149/person',
      description: '26-75 travelers',
      features: [
        'Senior coordinator',
        'Custom group website',
        'Detailed itinerary with activities',
        'Individual payment collection',
        'One free per 10 paid travelers',
        'Group dining arrangements',
        '24/7 phone support',
        'Welcome materials kit',
      ],
      highlighted: true,
    },
    {
      name: 'Large Group',
      price: '$199/person',
      description: '75+ travelers',
      features: [
        'Executive coordination team',
        'Branded group portal',
        'Complete logistics management',
        'Fundraising support tools',
        'Enhanced leader benefits',
        'Private events and venues',
        'On-site coordination available',
        'Professional group photography',
        'Post-trip reporting',
      ],
    },
  ]

  const faqs = [
    {
      question: 'What size groups do you handle?',
      answer:
        'We coordinate groups from 10 to 500+ travelers. Our largest single group was 450 students for a Disney World band trip. We have the experience and resources to handle any size group effectively.',
    },
    {
      question: 'Can parents pay individually for student trips?',
      answer:
        'Yes! We offer individual payment collection where parents can pay directly online. We track all payments, send reminders, and provide you with regular reports. This eliminates the burden of payment collection from group leaders.',
    },
    {
      question: 'Do you help with fundraising?',
      answer:
        'Absolutely. We provide fundraising support including promotional materials, group booking incentives that generate funds, and can connect you with fundraising partners. Many groups offset significant costs through our programs.',
    },
    {
      question: 'What about travelers with special needs?',
      answer:
        'We excel at accommodating special needs including mobility assistance, dietary restrictions, medical requirements, and learning differences. We work with venues and vendors to ensure full accessibility and inclusion.',
    },
    {
      question: 'How far in advance should we book?',
      answer:
        'For optimal rates and availability, we recommend booking 6-12 months in advance. However, we can accommodate shorter timelines. School trips should ideally be planned at the start of the school year.',
    },
  ]

  const certifications = [
    'SYTA Member (Student & Youth Travel)',
    'NTA Certified (National Tour Association)',
    'Faith Travel Association',
    'NAYS Sports Travel Certified',
    'Educational Travel Specialist',
    'Group Leaders International',
  ]

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Group Travel for Organizations',
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
      'Professional group travel coordination for Essex County schools, churches, sports teams, and organizations. Complete planning and logistics management.',
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '99',
      highPrice: '199',
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
        serviceName="Group Travel Services"
        headline="Unite Your Essex County Organization Through Travel"
        subheadline="Professional group travel coordination for schools, churches, sports teams, and organizations. From 10 to 500+ travelers, we handle every detail."
        description="Group travel creates bonds, memories, and experiences that last a lifetime. Next Trip Anywhere has been organizing group travel for Essex County schools, churches, sports teams, and organizations for over 20 years. We understand the unique challenges of group coordination - from managing different budgets and preferences to ensuring safety and satisfaction for every traveler. Our dedicated group coordinators handle every detail, allowing leaders to focus on their group's experience rather than logistics. Whether it's a senior class trip, church mission, team tournament, or corporate retreat, we make group travel smooth, affordable, and memorable."
        icon="Users"
        benefits={benefits}
        features={features}
        testimonials={testimonials}
        pricing={pricing}
        faqs={faqs}
        certifications={certifications}
        statistics={[
          { value: '500+', label: 'Groups Organized' },
          { value: '25,000+', label: 'Group Travelers' },
          { value: '100%', label: 'Safety Record' },
          { value: '1:10', label: 'Free Leader Ratio' },
        ]}
        relatedServices={[
          { name: 'Student Travel', link: '/contact' },
          { name: 'Corporate Events', link: '/services/corporate-travel-essex' },
          { name: 'Family Reunions', link: '/services/all-inclusive-family-resorts' },
        ]}
      />
    </>
  )
}
