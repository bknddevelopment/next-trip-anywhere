/**
 * @fileoverview Services index page
 * @module app/services/page
 *
 * Landing page showcasing all travel services offered by Next Trip Anywhere.
 */

import { Metadata } from 'next'
import Link from 'next/link'
import {
  Ship,
  Plane,
  Hotel,
  Briefcase,
  Users,
  ArrowRight,
  Phone,
  Star,
  Shield,
  Award,
  Clock,
} from 'lucide-react'
import CTAButton from '@/components/common/CTAButton'

export const metadata: Metadata = {
  title: 'Travel Services Essex County | Newark Travel Agency Services',
  description:
    'Complete travel services for Essex County: cruises, international travel, family resorts, corporate travel, and group coordination. Your local Newark travel experts.',
  keywords:
    'travel services Essex County, Newark travel agency, cruise booking, international travel, family vacations, corporate travel, group travel',
  openGraph: {
    title: 'Travel Services - Next Trip Anywhere Essex County',
    description:
      'Comprehensive travel services for individuals, families, and organizations in Essex County. Expert planning and support.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
  },
  alternates: {
    canonical: 'https://nexttripanywhere.com/services',
  },
}

const services = [
  {
    icon: Ship,
    title: 'Cruises from Essex County',
    slug: 'cruises-essex-county',
    description:
      'Sail from Newark port to Caribbean & Mediterranean destinations. Group rates and exclusive perks.',
    features: ['Newark Port Departures', 'Group Discounts', 'Shore Excursions'],
    highlight: 'No airport needed!',
  },
  {
    icon: Plane,
    title: 'International Travel',
    slug: 'international-travel-newark',
    description: 'Global destinations from Newark Airport with visa assistance and 24/7 support.',
    features: ['Visa Services', 'Travel Insurance', '24/7 Support'],
    highlight: 'Complete visa help',
  },
  {
    icon: Hotel,
    title: 'All-Inclusive Family Resorts',
    slug: 'all-inclusive-family-resorts',
    description:
      'Family-friendly resorts with kids clubs, water parks, and activities for all ages.',
    features: ['Kids Stay Free', 'School Break Specials', 'Family Suites'],
    highlight: 'Kids club included',
  },
  {
    icon: Briefcase,
    title: 'Corporate Travel Management',
    slug: 'corporate-travel-essex',
    description:
      'Streamline business travel with dedicated account management and expense tracking.',
    features: ['Direct Billing', 'Travel Analytics', 'VIP Services'],
    highlight: 'Save 35% on average',
  },
  {
    icon: Users,
    title: 'Group Travel Coordination',
    slug: 'group-travel-essex',
    description: 'Expert planning for schools, churches, sports teams, and organizations.',
    features: ['10-500+ Travelers', 'Free Leader Packages', 'Payment Plans'],
    highlight: '1 free per 10 paid',
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Travel Services for Every Journey
            </h1>
            <p className="text-xl mb-8 text-blue-50">
              From family vacations to corporate travel, we provide comprehensive services tailored
              to Essex County residents and businesses.
            </p>
            <div className="flex justify-center gap-4">
              <CTAButton
                variant="primary"
                size="large"
                className="bg-orange-500 hover:bg-orange-600"
              >
                Explore Our Services
              </CTAButton>
              <a
                href="tel:9738741019"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-600 transition-colors text-lg font-semibold"
              >
                <Phone className="w-5 h-5" />
                973-874-1019
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold">20+</p>
              <p className="text-sm text-gray-300">Years Experience</p>
            </div>
            <div>
              <p className="text-3xl font-bold">5,000+</p>
              <p className="text-sm text-gray-300">Happy Clients</p>
            </div>
            <div>
              <p className="text-3xl font-bold">4.9★</p>
              <p className="text-sm text-gray-300">Google Rating</p>
            </div>
            <div>
              <p className="text-3xl font-bold">24/7</p>
              <p className="text-sm text-gray-300">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Our Specialized Travel Services</h2>
          <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
            Each service is tailored to meet specific travel needs with expert knowledge, exclusive
            rates, and dedicated support.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <Link
                key={index}
                href={`/services/${service.slug}`}
                className="group bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <service.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                      {service.highlight}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-gray-700 mb-4">{service.description}</p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Essex County Chooses Our Services
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Industry Expertise</h3>
              <p className="text-sm text-gray-700">
                Certified specialists in every travel category
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Full Protection</h3>
              <p className="text-sm text-gray-700">
                Comprehensive insurance and 24/7 emergency support
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Exclusive Benefits</h3>
              <p className="text-sm text-gray-700">
                Access to perks and rates not available online
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Time Savings</h3>
              <p className="text-sm text-gray-700">
                We handle all details so you can focus on enjoying
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Superior Travel Service?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're planning a family vacation, business trip, or group adventure, our
            specialized services ensure success.
          </p>
          <div className="flex justify-center gap-4">
            <CTAButton variant="primary" size="large" className="bg-orange-500 hover:bg-orange-600">
              Start Your Journey
            </CTAButton>
            <a
              href="tel:9738741019"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-600 transition-colors text-lg font-semibold"
            >
              <Phone className="w-5 h-5" />
              Call 973-874-1019
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
