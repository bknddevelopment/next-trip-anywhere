/**
 * @fileoverview Cruises from Essex County landing page
 * @module app/services/cruises-essex-county/page
 *
 * Landing page for cruise services departing from Newark port and nearby locations.
 */

import { Metadata } from 'next'
import ServicePageTemplate from '@/components/services/ServicePageTemplate'

export const metadata: Metadata = {
  title: 'Cruises from Newark Port | Essex County Cruise Deals | Next Trip Anywhere',
  description:
    'Book Caribbean & Mediterranean cruises from Newark port. Exclusive Essex County cruise deals, group rates, and personalized planning. 20+ years serving New Jersey.',
  keywords:
    'cruises from Newark port, Essex County cruise deals, Caribbean cruises Newark, Mediterranean cruises New Jersey, cruise packages Essex County, Newark cruise terminal, family cruises NJ',
  openGraph: {
    title: 'Cruises from Essex County - Newark Port Departures',
    description:
      'Your local cruise experts. Book Caribbean & Mediterranean cruises departing from Newark port with exclusive deals for Essex County residents.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cruises from Newark Port | Essex County Cruise Deals',
    description:
      'Book your dream cruise from Newark port. Caribbean, Mediterranean & more with exclusive Essex County rates.',
  },
  alternates: {
    canonical: 'https://nexttripanywhere.com/services/cruises-essex-county',
  },
}

export default function CruisesEssexCountyPage() {
  const benefits = [
    {
      icon: 'MapPin' as const,
      title: 'Convenient Newark Departures',
      description:
        'No need to fly! Depart directly from Newark port, just minutes from Essex County. We arrange transportation to and from the terminal.',
    },
    {
      icon: 'DollarSign' as const,
      title: 'Exclusive Group Rates',
      description:
        'Access to special Essex County group rates and perks not available online. Save up to 30% on select sailings.',
    },
    {
      icon: 'Star' as const,
      title: 'VIP Treatment',
      description:
        'Priority check-in, cabin upgrades, onboard credits, and specialty dining reservations all arranged in advance.',
    },
    {
      icon: 'Users' as const,
      title: 'Group Cruise Specialists',
      description:
        'Perfect for family reunions, milestone celebrations, or organization trips. We handle all group logistics.',
    },
    {
      icon: 'Shield' as const,
      title: 'Full Protection',
      description:
        'Comprehensive travel insurance options and flexible cancellation policies to protect your investment.',
    },
    {
      icon: 'Globe' as const,
      title: 'Expert Destination Knowledge',
      description:
        'Our agents have sailed these routes. Get insider tips on ports, excursions, and onboard experiences.',
    },
  ]

  const features = [
    'Direct departures from Newark Liberty Cruise Port',
    'Caribbean, Bermuda, and Transatlantic cruises',
    'All major cruise lines: Royal Caribbean, NCL, Celebrity',
    'Free pre-cruise hotel packages available',
    'Airport and cruise port transfers included',
    'Shore excursion planning and booking',
    'Specialty restaurant reservations',
    'Group meeting space arrangements',
    'Special occasion celebrations coordination',
    'Travel documentation assistance',
    'Onboard credit negotiations',
    '24/7 support during your cruise',
  ]

  const testimonials = [
    {
      name: 'The Robinson Family',
      location: 'Montclair, NJ',
      rating: 5,
      text: 'We sailed to Bermuda from Newark port - so convenient! Next Trip Anywhere got us an amazing balcony upgrade and dining package. The kids loved the organized activities they recommended.',
      service: '7-Day Bermuda Cruise',
    },
    {
      name: 'Maria & John Santos',
      location: 'Newark, NJ',
      rating: 5,
      text: 'Celebrated our 25th anniversary on a Caribbean cruise. They arranged everything - from the suite upgrade to the special dinner. The onboard credit was a wonderful surprise!',
      service: 'Caribbean Anniversary Cruise',
    },
    {
      name: 'Bloomfield Senior Center',
      location: 'Bloomfield, NJ',
      rating: 5,
      text: 'Organized a group cruise for 42 members. The coordination was flawless - from bus transport to the port to special group dining. Everyone had an amazing time!',
      service: 'Group Caribbean Cruise',
    },
  ]

  const pricing = [
    {
      name: 'Essential',
      price: '$599/person',
      description: '3-5 day cruises to Bermuda or Bahamas',
      features: [
        'Interior cabin accommodations',
        'Port transfers from Essex County',
        'Basic travel insurance',
        'Standard boarding',
        'Dining reservations assistance',
      ],
    },
    {
      name: 'Premium',
      price: '$999/person',
      description: '7-day Caribbean or Mediterranean cruises',
      features: [
        'Balcony cabin accommodations',
        'Round-trip port transportation',
        'Comprehensive travel insurance',
        'Priority boarding',
        'Specialty dining package',
        '$100 onboard credit',
        'One shore excursion included',
      ],
      highlighted: true,
    },
    {
      name: 'Luxury',
      price: '$1,999/person',
      description: '10+ day premium cruise experiences',
      features: [
        'Suite accommodations',
        'Private car service to port',
        'Premium insurance with cancel-for-any-reason',
        'VIP boarding and concierge',
        'Unlimited specialty dining',
        '$300 onboard credit',
        'All shore excursions included',
        'Spa and beverage packages',
      ],
    },
  ]

  const faqs = [
    {
      question: 'How far is Newark cruise port from Essex County?',
      answer:
        'Newark Liberty Cruise Port is conveniently located just 15-30 minutes from most Essex County towns. We provide door-to-door transportation options, making your departure stress-free.',
    },
    {
      question: 'What cruise lines depart from Newark?',
      answer:
        'Major cruise lines departing from Newark include Royal Caribbean, Celebrity Cruises, and occasionally Norwegian Cruise Line. We also book repositioning cruises and special sailings from New York ports.',
    },
    {
      question: 'Do you offer group discounts?',
      answer:
        'Yes! We specialize in group cruises and can secure significant discounts for groups of 8 or more. Benefits include free cabins for group leaders, private cocktail parties, and group shore excursions.',
    },
    {
      question: 'What documents do I need for a cruise?',
      answer:
        'Requirements vary by destination. Closed-loop cruises (departing and returning to the same US port) to Caribbean typically require a passport or birth certificate plus government ID. We help you determine and obtain necessary documentation.',
    },
    {
      question: 'When should I book my cruise?',
      answer:
        'For best selection and prices, we recommend booking 6-12 months in advance. However, we also have access to last-minute deals. Contact us for current promotions and availability.',
    },
  ]

  const certifications = [
    'CLIA Certified Agency',
    'Royal Caribbean Elite Partner',
    'Celebrity Cruises Five Star Agency',
    'Norwegian Cruise Line Partners First',
    'ASTA Member Agency',
    'BBB Accredited Business',
  ]

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Cruises from Essex County',
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
      'Cruise booking services for Essex County residents with departures from Newark port. Caribbean, Mediterranean, and Bermuda cruises with exclusive group rates.',
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '599',
      highPrice: '1999',
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
        serviceName="Cruise Services"
        headline="Set Sail from Newark Port with Essex County's Cruise Experts"
        subheadline="Experience the convenience of local departures with Caribbean & Mediterranean cruises. No airports, no hassle – just unforgettable voyages starting right from Newark."
        description="Next Trip Anywhere has been Essex County's trusted cruise specialist for over 20 years. We offer exclusive access to cruise deals departing from Newark Liberty Cruise Port, plus convenient connections to Manhattan terminals. Our expert cruise consultants have personally sailed these routes and can guide you to the perfect voyage. Whether you're planning a romantic getaway, family vacation, or group celebration, we handle every detail from your doorstep to the ship and back."
        icon="Ship"
        benefits={benefits}
        features={features}
        testimonials={testimonials}
        pricing={pricing}
        faqs={faqs}
        certifications={certifications}
        statistics={[
          { value: '500+', label: 'Cruises Booked Annually' },
          { value: '42%', label: 'Average Savings' },
          { value: '100%', label: 'Satisfaction Rate' },
          { value: '24/7', label: 'Support While Sailing' },
        ]}
        relatedServices={[
          { name: 'International Travel', link: '/services/international-travel-newark' },
          { name: 'All-Inclusive Resorts', link: '/services/all-inclusive-family-resorts' },
          { name: 'Group Travel', link: '/services/group-travel-essex' },
        ]}
      />
    </>
  )
}
