/**
 * @fileoverview Business Travel Management landing page
 * @module app/services/corporate-travel-essex/page
 *
 * Landing page for corporate travel services for Essex County businesses.
 */

import { Metadata } from 'next'
import ServicePageTemplate from '@/components/services/ServicePageTemplate'

export const metadata: Metadata = {
  title: 'Business Travel Newark | Corporate Travel Management Essex County',
  description:
    'Corporate travel management for Essex County businesses. Executive travel services, expense tracking, VIP support, and negotiated rates from Newark Airport.',
  keywords:
    'business travel Newark, corporate travel Essex County, executive travel services, business class Newark, corporate travel management, expense tracking travel, VIP travel services',
  openGraph: {
    title: 'Corporate Travel Management - Essex County Business Services',
    description:
      'Streamline your business travel with dedicated corporate account management, expense tracking, and VIP services for Essex County companies.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Corporate Travel Essex County | Business Travel Management',
    description:
      'Professional travel management for Essex County businesses. Save time and money with our corporate travel services.',
  },
  alternates: {
    canonical: 'https://nexttripanywhere.com/services/corporate-travel-essex',
  },
}

export default function CorporateTravelEssexPage() {
  const benefits = [
    {
      icon: 'CreditCard' as const,
      title: 'Centralized Billing',
      description:
        'Simplified expense management with consolidated invoicing, detailed reporting, and integration with your accounting systems.',
    },
    {
      icon: 'ChartBar' as const,
      title: 'Cost Savings & Analytics',
      description:
        'Access negotiated corporate rates and receive detailed spend analytics to optimize your travel budget and identify savings.',
    },
    {
      icon: 'Clock' as const,
      title: '24/7 Executive Support',
      description:
        'Dedicated account managers available round-the-clock for last-minute changes, emergencies, and VIP requirements.',
    },
    {
      icon: 'Shield' as const,
      title: 'Duty of Care',
      description:
        'Real-time traveler tracking, emergency assistance, and comprehensive travel insurance to protect your employees.',
    },
    {
      icon: 'FileText' as const,
      title: 'Policy Compliance',
      description:
        'Automated travel policy enforcement, approval workflows, and expense report integration for seamless compliance.',
    },
    {
      icon: 'TrendingUp' as const,
      title: 'Productivity Tools',
      description:
        'Mobile booking apps, seat selection, upgrade management, and calendar integration to maximize travel productivity.',
    },
  ]

  const features = [
    'Dedicated corporate account manager',
    'Negotiated rates with airlines and hotels',
    'Direct billing and invoicing',
    'Expense report integration',
    'Travel policy creation and enforcement',
    'Executive car service arrangements',
    'Airport lounge access programs',
    'Group meeting and event planning',
    'Visa and passport expediting',
    'Travel risk management',
    'Mobile booking platform',
    'Quarterly business reviews',
  ]

  const testimonials = [
    {
      name: 'Robert Mitchell, CFO',
      location: 'Tech Startup, Newark',
      rating: 5,
      text: 'Switching to Next Trip Anywhere reduced our travel costs by 35% in the first year. The expense tracking and policy compliance features have streamlined our entire process.',
      service: 'Corporate Account Management',
    },
    {
      name: 'Amanda Chen, HR Director',
      location: 'Law Firm, Millburn',
      rating: 5,
      text: 'Their 24/7 support has been invaluable. When our partner was stranded in London during a strike, they had him rebooked and in a hotel within an hour.',
      service: 'Executive Travel Services',
    },
    {
      name: 'James Williams, CEO',
      location: 'Financial Services, Montclair',
      rating: 5,
      text: 'The quarterly spend analysis helps us budget effectively. Our account manager proactively suggests ways to optimize our travel spending. True partnership.',
      service: 'Enterprise Travel Program',
    },
  ]

  const pricing = [
    {
      name: 'Startup',
      price: '$299/month',
      description: 'For companies with 1-10 travelers',
      features: [
        'Dedicated account support',
        'Basic reporting dashboard',
        'Corporate rates access',
        'Direct billing option',
        'Email support',
        'Quarterly reviews',
      ],
    },
    {
      name: 'Business',
      price: '$999/month',
      description: 'For companies with 11-50 travelers',
      features: [
        'Senior account manager',
        'Advanced analytics dashboard',
        'Negotiated corporate rates',
        'Expense system integration',
        '24/7 phone support',
        'Travel policy automation',
        'Executive car service',
        'Monthly business reviews',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For companies with 50+ travelers',
      features: [
        'Executive account team',
        'Custom reporting and analytics',
        'Exclusive negotiated rates',
        'Full system integration',
        'On-site support available',
        'Global travel management',
        'Meeting and event planning',
        'VIP traveler services',
        'Weekly strategic reviews',
      ],
    },
  ]

  const faqs = [
    {
      question: 'How quickly can we set up a corporate account?',
      answer:
        "Corporate accounts can be established within 24-48 hours. We'll assign your dedicated account manager, set up billing preferences, and provide access to our booking platform immediately.",
    },
    {
      question: 'Can you integrate with our expense management system?',
      answer:
        'Yes, we integrate with major expense platforms including Concur, Expensify, and SAP. We provide detailed electronic receipts and reports that seamlessly flow into your systems.',
    },
    {
      question: 'What kind of savings can we expect?',
      answer:
        'Most companies save 20-40% through our negotiated rates, policy optimization, and advance booking strategies. We provide quarterly savings reports showing exact cost reductions.',
    },
    {
      question: 'How do you handle travel emergencies?',
      answer:
        'Our 24/7 emergency hotline connects travelers with senior agents who can handle rebooking, medical emergencies, lost passports, and any travel disruption. Average response time is under 2 minutes.',
    },
    {
      question: 'Do you handle international business travel?',
      answer:
        'Absolutely. We manage complex international itineraries, handle visa processing, provide country-specific travel advisories, and ensure duty of care compliance worldwide.',
    },
  ]

  const certifications = [
    'GBTA Corporate Member',
    'ASTA Business Travel Specialist',
    'ISO 27001 Certified',
    'SAP Concur Partner',
    'TSA Trusted Traveler',
    'IATA Accredited',
  ]

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Corporate Travel Management',
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
      'Professional corporate travel management services for Essex County businesses. Dedicated account management, expense tracking, and VIP services.',
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '299',
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
        serviceName="Corporate Travel Services"
        headline="Elevate Your Business Travel from Essex County"
        subheadline="Professional travel management that saves time, reduces costs, and enhances productivity for Newark and Essex County businesses."
        description="In today's global business environment, efficient travel management is crucial for success. Next Trip Anywhere provides comprehensive corporate travel services tailored for Essex County businesses. From startups to Fortune 500 companies, we deliver personalized service backed by technology and negotiated rates that reduce costs while improving traveler satisfaction. Our proximity to Newark Airport and understanding of local business needs makes us the preferred partner for corporate travel management. Let us handle the logistics while you focus on business."
        icon="Briefcase"
        benefits={benefits}
        features={features}
        testimonials={testimonials}
        pricing={pricing}
        faqs={faqs}
        certifications={certifications}
        statistics={[
          { value: '35%', label: 'Average Cost Savings' },
          { value: '2min', label: 'Emergency Response' },
          { value: '98%', label: 'On-Time Delivery' },
          { value: '200+', label: 'Corporate Clients' },
        ]}
        relatedServices={[
          { name: 'International Travel', link: '/services/international-travel-newark' },
          { name: 'Group Travel', link: '/services/group-travel-essex' },
          { name: 'VIP Services', link: '/contact' },
        ]}
      />
    </>
  )
}
