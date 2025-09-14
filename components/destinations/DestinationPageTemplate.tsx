/**
 * @fileoverview Destination page template component
 * @module components/destinations/DestinationPageTemplate
 *
 * This component renders the complete layout for individual destination pages,
 * including hero section, content sections, galleries, and CTAs.
 */

'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  Globe,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import type { Destination, DestinationListItem } from '@/types/destination'
import CTAButton from '@/components/common/CTAButton'

interface DestinationPageTemplateProps {
  destination: Destination
  relatedDestinations?: DestinationListItem[]
}

export default function DestinationPageTemplate({
  destination,
  relatedDestinations = [],
}: DestinationPageTemplateProps) {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <Image
          src={destination.heroImage?.url || '/images/placeholder-destination.jpg'}
          alt={destination.heroImage?.alt || destination.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">
                {destination.region ? `${destination.region}, ` : ''}
                {destination.country}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{destination.name}</h1>
            <p className="text-xl max-w-3xl mb-6">{destination.shortDescription}</p>
            <div className="flex flex-wrap gap-4">
              <CTAButton
                variant="primary"
                size="large"
                className="bg-orange-500 hover:bg-orange-600"
              >
                Plan Your Trip
              </CTAButton>
              <a
                href="#packages"
                className="px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-colors"
              >
                View Packages
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-gray-100 py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Recommended Stay</p>
                <p className="font-semibold">{destination.averageStayDuration}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Starting From</p>
                <p className="font-semibold">
                  $
                  {(typeof destination.packages?.[0] === 'object' &&
                  'price' in destination.packages[0]
                    ? (destination.packages[0] as any).price.perPerson
                    : null) || 'Contact us'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Best Time</p>
                <p className="font-semibold">
                  {destination.travelTips?.bestTimeToVisit?.split(' ')[0] || 'Year-round'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Language</p>
                <p className="font-semibold">
                  {destination.travelTips?.language?.[0] || 'English'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content - 2 columns */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <div>
                <h2 className="text-3xl font-bold mb-4">Overview</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {destination.longDescription}
                </p>

                {/* Highlights */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Highlights</h3>
                  <ul className="space-y-2">
                    {(destination.highlights || []).map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Things to Do */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Things to Do</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {(destination.attractions || []).slice(0, 4).map((attraction, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
                    >
                      <h4 className="font-semibold text-lg mb-2">{attraction.name}</h4>
                      <p className="text-gray-600 text-sm mb-3">{attraction.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        {attraction.price && (
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {attraction.price}
                          </span>
                        )}
                        {attraction.duration && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {attraction.duration}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Activities List */}
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">Popular Activities</h3>
                  <div className="flex flex-wrap gap-2">
                    {(destination.activities || []).map((activity, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors"
                      >
                        {typeof activity === 'string' ? activity : activity.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Photo Gallery */}
              {destination.gallery && destination.gallery.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold mb-6">Photo Gallery</h2>
                  <div className="space-y-4">
                    <div className="relative h-[400px] rounded-lg overflow-hidden">
                      <Image
                        src={
                          destination.gallery?.[selectedImage]?.url ||
                          destination.heroImage?.url ||
                          '/images/placeholder-destination.jpg'
                        }
                        alt={destination.gallery?.[selectedImage]?.alt || 'Gallery image'}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {(destination.gallery || []).slice(0, 4).map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`relative h-24 rounded overflow-hidden ${
                            selectedImage === index ? 'ring-2 ring-blue-600' : ''
                          }`}
                        >
                          <Image src={image.url} alt={image.alt} fill className="object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Travel Tips */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Travel Tips & Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Currency</h4>
                      <p className="text-gray-700">{destination.travelTips?.currency || 'USD'}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Visa Requirements</h4>
                      <p className="text-gray-700">
                        {destination.travelTips?.visaRequirements || 'Check with embassy'}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Time Zone</h4>
                      <p className="text-gray-700">{destination.travelTips?.timezone || 'UTC'}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Transportation</h4>
                      <p className="text-gray-700">
                        {destination.travelTips?.transportation?.local?.join(', ') ||
                          'Various options available'}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Health & Safety</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        {(destination.travelTips?.healthAndSafety || [])
                          .slice(0, 3)
                          .map((tip, index) => (
                            <li key={index}>• {tip}</li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQs */}
              {destination.faqs && destination.faqs.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-3">
                    {destination.faqs.map((faq, index) => (
                      <div key={index} className="border rounded-lg">
                        <button
                          onClick={() =>
                            setExpandedFAQ(expandedFAQ === faq.question ? null : faq.question)
                          }
                          className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50"
                        >
                          <span className="font-semibold">{faq.question}</span>
                          {expandedFAQ === faq.question ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </button>
                        {expandedFAQ === faq.question && (
                          <div className="p-4 pt-0 text-gray-700">{faq.answer}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - 1 column */}
            <div className="lg:col-span-1 space-y-6">
              {/* Booking Card */}
              <div className="sticky top-4 bg-white border rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Ready to Visit {destination.name}?</h3>
                <div className="space-y-4 mb-6">
                  <p className="text-gray-700">
                    Let our travel experts help you plan the perfect trip to {destination.name}.
                  </p>
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600 mb-2">Package starts from</p>
                    <p className="text-3xl font-bold text-blue-600">
                      $
                      {(typeof destination.packages?.[0] === 'object' &&
                      'price' in destination.packages[0]
                        ? (destination.packages[0] as any).price.perPerson
                        : null) || 'Contact us'}
                    </p>
                    <p className="text-sm text-gray-600">per person</p>
                  </div>
                </div>
                <CTAButton variant="primary" size="large" className="w-full mb-3">
                  Get Free Quote
                </CTAButton>
                <CTAButton variant="secondary" size="medium" className="w-full">
                  Call 1-833-874-1019
                </CTAButton>
              </div>

              {/* Climate Info */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Climate</h3>
                <div className="space-y-3">
                  {(Array.isArray(destination.climate) ? destination.climate : []).map((season) => (
                    <div key={season.season} className="text-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span className="capitalize font-medium">{season.season}</span>
                        <span className="text-gray-600">
                          {season.temperatureRange.min}°F - {season.temperatureRange.max}°F
                        </span>
                      </div>
                      <p className="text-gray-600 text-xs">{season.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flight Options */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Flights from Major Cities</h3>
                <div className="space-y-3">
                  {destination.travelOptions?.slice(0, 3).map((option, index) => (
                    <div key={index} className="text-sm">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{option.fromCity}</span>
                        <span className="text-gray-600">{option.averageFlightTime}</span>
                      </div>
                      <p className="text-xs text-gray-500">From ${option.averagePrice.economy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Packages Section */}
      {destination.packages && destination.packages.length > 0 && (
        <section id="packages" className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Available Packages</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {destination.packages.map((pkg) => {
                // Type guard to ensure pkg is TravelPackage
                if (typeof pkg === 'string') {
                  return null
                }
                return (
                  <div key={pkg.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                      <p className="text-gray-600 mb-4">{pkg.duration}</p>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-blue-600">
                          ${pkg.price?.perPerson || 0}
                        </span>
                        <span className="text-gray-600"> /person</span>
                      </div>
                      <div className="space-y-2 mb-6">
                        <h4 className="font-semibold text-sm">Includes:</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {Array.isArray(pkg.includes)
                            ? pkg.includes.map((item: string, idx: number) => (
                                <li key={idx}>• {item}</li>
                              ))
                            : null}
                        </ul>
                      </div>
                      <CTAButton variant="primary" size="medium" className="w-full">
                        Book Package
                      </CTAButton>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Related Destinations */}
      {relatedDestinations.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">You Might Also Like</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {relatedDestinations.map((dest) => (
                <Link
                  key={dest.id}
                  href={`/destinations/${dest.slug}`}
                  className="group hover:shadow-lg transition-shadow rounded-lg overflow-hidden"
                >
                  <div className="relative h-48">
                    <Image
                      src={dest.heroImage?.url || '/images/default-destination.jpg'}
                      alt={dest.heroImage?.alt || dest.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">{dest.name}</h3>
                    <p className="text-sm text-gray-600">{dest.country}</p>
                    {dest.startingPrice && (
                      <p className="text-sm font-semibold text-blue-600 mt-2">
                        From ${dest.startingPrice}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore {destination.name}?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our travel experts are here to help you plan the perfect trip. Get personalized
            recommendations and exclusive deals.
          </p>
          <div className="flex justify-center gap-4">
            <CTAButton variant="primary" size="large" className="bg-orange-500 hover:bg-orange-600">
              Start Planning Your Trip
            </CTAButton>
            <a
              href="tel:18338741019"
              className="px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-600 transition-colors"
            >
              Call 1-833-874-1019
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
