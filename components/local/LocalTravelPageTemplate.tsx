/**
 * @fileoverview Local travel page template component
 * @module components/local/LocalTravelPageTemplate
 *
 * This component renders the complete layout for town-specific travel pages,
 * optimized for local SEO and conversions.
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
  Plane,
  Hotel,
  Ship,
  Car,
} from 'lucide-react'
import CTAButton from '@/components/common/CTAButton'
import type { TownInfo } from '@/lib/seo/local-metadata'

interface LocalTravelPageTemplateProps {
  town: TownInfo
  testimonials?: Array<{
    name: string
    location: string
    rating: number
    text: string
    destination?: string
  }>
}

export default function LocalTravelPageTemplate({
  town,
  testimonials = [],
}: LocalTravelPageTemplateProps) {
  const [selectedService, setSelectedService] = useState(0)

  const services = [
    {
      icon: Plane,
      title: 'Flight Booking',
      description: `Find the best flight deals from ${town.nearbyAirports?.[0] || 'nearby airports'}`,
      features: ['Price comparison', 'Flexible dates', '24/7 support'],
    },
    {
      icon: Hotel,
      title: 'Hotel Reservations',
      description: 'Handpicked accommodations worldwide',
      features: ['Verified reviews', 'Best price guarantee', 'Free cancellation options'],
    },
    {
      icon: Ship,
      title: 'Cruise Packages',
      description: 'Unforgettable cruise experiences',
      features: ['Caribbean', 'Mediterranean', 'River cruises'],
    },
    {
      icon: Car,
      title: 'Car Rentals',
      description: 'Reliable transportation at your destination',
      features: ['Major brands', 'Insurance included', 'GPS available'],
    },
  ]

  const popularDestinations = [
    { name: 'Cancun', tag: 'All-Inclusive', image: '/images/destinations/cancun-beach.jpg' },
    { name: 'Paris', tag: 'Romance Package', image: '/images/destinations/paris-eiffel.jpg' },
    { name: 'Dubai', tag: 'Luxury Experience', image: '/images/destinations/dubai-skyline.jpg' },
    { name: 'Hawaii', tag: 'Island Paradise', image: '/images/destinations/hawaii-beach.jpg' },
    { name: 'Italy', tag: 'Cultural Journey', image: '/images/destinations/italy-coast.jpg' },
    { name: 'Japan', tag: 'Adventure Tour', image: '/images/destinations/japan-temple.jpg' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">
                {town.name}, {town.stateAbbr}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Your Local Travel Experts in {town.name}
            </h1>
            <p className="text-xl mb-8 leading-relaxed">
              Next Trip Anywhere is {town.name}'s trusted travel agency, specializing in{' '}
              {town.demographics?.focus}. Let our expert agents plan your perfect getaway with
              exclusive deals and personalized service.
            </p>
            <div className="flex flex-wrap gap-4">
              <CTAButton
                variant="primary"
                size="large"
                className="bg-orange-500 hover:bg-orange-600"
              >
                Start Planning Your Trip
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
      <section className="bg-gray-100 py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-semibold">20+ Years</p>
                <p className="text-sm text-gray-600">Serving {town.county} County</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-semibold">5,000+</p>
                <p className="text-sm text-gray-600">Happy Travelers</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-semibold">ASTA Member</p>
                <p className="text-sm text-gray-600">Certified Agency</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-semibold">4.9 Rating</p>
                <p className="text-sm text-gray-600">Google Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why {town.name} Residents Choose Next Trip Anywhere
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Local Expertise</h3>
              <p className="text-gray-700">
                We understand {town.name} travelers. Located in {town.county} County, we know the
                best routes from {town.nearbyAirports?.[0] || 'local airports'} and can arrange
                convenient transportation.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Exclusive Deals</h3>
              <p className="text-gray-700">
                Access special rates and packages not available online. Our partnerships mean better
                prices for {town.name} residents.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Personal Service</h3>
              <p className="text-gray-700">
                Work with the same agent from planning to return. We're here for {town.name}{' '}
                travelers 24/7, before, during, and after your trip.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Complete Travel Services for {town.name} Residents
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="grid grid-cols-2 gap-4">
              {services.map((service, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedService(index)}
                  className={`p-6 rounded-lg text-left transition-all ${
                    selectedService === index
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white hover:shadow-md'
                  }`}
                >
                  <service.icon
                    className={`w-8 h-8 mb-3 ${
                      selectedService === index ? 'text-white' : 'text-blue-600'
                    }`}
                  />
                  <h3 className="font-semibold">{service.title}</h3>
                </button>
              ))}
            </div>
            <div className="bg-white rounded-lg p-8 shadow-lg">
              {(() => {
                const SelectedIcon = services[selectedService].icon
                return <SelectedIcon className="w-12 h-12 text-blue-600 mb-4" />
              })()}
              <h3 className="text-2xl font-semibold mb-3">{services[selectedService].title}</h3>
              <p className="text-gray-700 mb-6">{services[selectedService].description}</p>
              <ul className="space-y-3 mb-6">
                {services[selectedService].features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <CTAButton variant="primary" size="medium">
                Get Started
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Popular Destinations from {town.name}
          </h2>
          <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
            These are the top vacation spots chosen by your {town.name} neighbors. All packages
            include round-trip flights from {town.nearbyAirports?.[0] || 'Newark Airport'}.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {popularDestinations.map((dest, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold">{dest.name}</h3>
                    <p className="text-lg">{dest.tag}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All Destinations
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What {town.name} Travelers Say</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">{testimonial.text}</p>
                  <div className="border-t pt-3">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">
                      {testimonial.location} → {testimonial.destination}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Local Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Convenient Travel from {town.name}</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Nearby Airports</h3>
                  <ul className="space-y-2">
                    {(town.nearbyAirports || ['Newark Liberty International (EWR)']).map(
                      (airport, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <Plane className="w-5 h-5 text-blue-600" />
                          <span>{airport}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Local Landmarks</h3>
                  <p className="text-gray-700">
                    We're proud to serve the {town.name} community, home to{' '}
                    {town.landmarks?.slice(0, 2).join(' and ') || 'many local attractions'}.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Transportation Options</h3>
                  <p className="text-gray-700">
                    We can arrange airport transfers from {town.name}, including private cars,
                    shuttles, and group transportation for larger parties.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Visit Our Office</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-gray-700">
                        Serving all of {town.county} County
                        <br />
                        {town.name}, {town.stateAbbr} {town.zipCodes?.[0] || ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-semibold">Office Hours</p>
                      <p className="text-gray-700">
                        Monday - Friday: 9:00 AM - 6:00 PM
                        <br />
                        Saturday: 10:00 AM - 4:00 PM
                        <br />
                        Sunday: By appointment
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-semibold">Contact</p>
                      <p className="text-gray-700">
                        Phone:{' '}
                        <a href="tel:9738741019" className="text-blue-600 hover:underline">
                          973-874-1019
                        </a>
                        <br />
                        Email: travel@nexttripanywhere.com
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <CTAButton variant="primary" size="medium" className="w-full">
                    Schedule a Consultation
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Plan Your Next Adventure from {town.name}?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied {town.county} County travelers who trust Next Trip Anywhere
            for their vacation planning. Get started with a free consultation today.
          </p>
          <div className="flex justify-center gap-4">
            <CTAButton variant="primary" size="large" className="bg-orange-500 hover:bg-orange-600">
              Get Your Free Travel Quote
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
