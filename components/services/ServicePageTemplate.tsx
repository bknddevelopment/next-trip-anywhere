/**
 * @fileoverview Service page template component
 * @module components/services/ServicePageTemplate
 *
 * This component renders the complete layout for service-specific landing pages,
 * optimized for SEO and conversions with trust signals and clear CTAs.
 */

'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  MapPin,
  Phone,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Globe,
  Users,
  Calendar,
  DollarSign,
  Award,
  Shield,
  Info,
  BadgeCheck,
  TrendingUp,
  MessageSquare,
} from 'lucide-react'
import CTAButton from '@/components/common/CTAButton'
import { IconName, getIcon } from '@/lib/utils/icon-map'

export interface ServiceTestimonial {
  name: string
  location: string
  rating: number
  text: string
  service?: string
  date?: string
}

export interface PricingTier {
  name: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
}

export interface ServiceBenefit {
  icon: IconName
  title: string
  description: string
}

export interface ServiceFAQ {
  question: string
  answer: string
}

interface ServicePageTemplateProps {
  serviceName: string
  headline: string
  subheadline: string
  description: string
  icon: IconName
  benefits: ServiceBenefit[]
  features: string[]
  testimonials: ServiceTestimonial[]
  pricing?: PricingTier[]
  faqs?: ServiceFAQ[]
  certifications?: string[]
  statistics?: Array<{
    value: string
    label: string
  }>
  relatedServices?: Array<{
    name: string
    link: string
  }>
}

export default function ServicePageTemplate({
  serviceName,
  headline,
  subheadline,
  description,
  icon: serviceIconName,
  benefits,
  features,
  testimonials,
  pricing,
  faqs,
  certifications,
  statistics,
  relatedServices,
}: ServicePageTemplateProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const ServiceIcon = getIcon(serviceIconName)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <ServiceIcon className="w-8 h-8" />
              <span className="text-lg font-medium uppercase tracking-wide">{serviceName}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">{headline}</h1>
            <p className="text-xl mb-8 leading-relaxed text-blue-50">{subheadline}</p>
            <div className="flex flex-wrap gap-4">
              <CTAButton
                variant="primary"
                size="large"
                className="bg-orange-500 hover:bg-orange-600"
              >
                Get Started Today
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
        </div>
      </section>

      {/* Trust Signals Bar */}
      <section className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statistics?.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-300">{stat.label}</p>
              </div>
            )) || (
              <>
                <div className="text-center">
                  <p className="text-3xl font-bold">20+</p>
                  <p className="text-sm text-gray-300">Years Experience</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold">5,000+</p>
                  <p className="text-sm text-gray-300">Happy Customers</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold">4.9★</p>
                  <p className="text-sm text-gray-300">Google Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold">100%</p>
                  <p className="text-sm text-gray-300">Satisfaction</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Service Description */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-50 rounded-2xl p-8 mb-12">
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold mb-4">About This Service</h2>
                  <p className="text-gray-700 leading-relaxed">{description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our {serviceName}</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => {
              const BenefitIcon = getIcon(benefit.icon)
              return (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <BenefitIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-gray-700">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Checklist */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What's Included</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {pricing && pricing.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Transparent Pricing</h2>
            <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
              Choose the package that best fits your needs. All prices include our full service
              guarantee.
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricing.map((tier, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                    tier.highlighted ? 'ring-2 ring-blue-600' : ''
                  }`}
                >
                  {tier.highlighted && (
                    <div className="bg-blue-600 text-white text-center py-2 text-sm font-semibold">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <p className="text-4xl font-bold text-blue-600 mb-4">{tier.price}</p>
                    <p className="text-gray-700 mb-6">{tier.description}</p>
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <CTAButton
                      variant={tier.highlighted ? 'primary' : 'secondary'}
                      size="medium"
                      fullWidth
                    >
                      Choose {tier.name}
                    </CTAButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg border border-gray-100">
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="border-t pt-3">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                  {testimonial.service && (
                    <p className="text-sm text-blue-600 mt-1">{testimonial.service}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Trust Badges */}
      {certifications && certifications.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Certifications & Partnerships</h2>
            <div className="flex flex-wrap justify-center items-center gap-8 max-w-4xl mx-auto">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white px-6 py-3 rounded-lg shadow"
                >
                  <BadgeCheck className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {faqs && faqs.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <div key={index} className="mb-4">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full bg-white rounded-lg shadow px-6 py-4 text-left flex items-center justify-between hover:shadow-lg transition-shadow"
                  >
                    <span className="font-semibold">{faq.question}</span>
                    <ArrowRight
                      className={`w-5 h-5 text-gray-400 transform transition-transform ${
                        openFAQ === index ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  {openFAQ === index && (
                    <div className="bg-gray-50 px-6 py-4 rounded-b-lg">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Services */}
      {relatedServices && relatedServices.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Explore More Services</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {relatedServices.map((service, index) => (
                <Link
                  key={index}
                  href={service.link}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow hover:shadow-lg transition-shadow"
                >
                  <span>{service.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Our {serviceName}?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied Essex County travelers who trust Next Trip Anywhere. Get
            started with a free consultation today.
          </p>
          <div className="flex justify-center gap-4">
            <CTAButton variant="primary" size="large" className="bg-orange-500 hover:bg-orange-600">
              Book Your Service Now
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
      </section>
    </div>
  )
}
