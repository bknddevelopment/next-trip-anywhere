'use client'

import { memo } from 'react'
import {
  MapPin,
  Plane,
  Shield,
  Clock,
  Users,
  Award,
  Headphones,
  TrendingUp,
  Globe,
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

const majorCities = [
  { name: 'New York City', code: 'NYC', airports: 'JFK, LGA, EWR', highlight: true },
  { name: 'Los Angeles', code: 'LAX', airports: 'LAX', highlight: true },
  { name: 'Chicago', code: 'CHI', airports: "O'Hare, Midway", highlight: true },
  { name: 'Miami', code: 'MIA', airports: 'MIA, FLL', highlight: true },
  { name: 'Boston', code: 'BOS', airports: 'Logan', highlight: false },
  { name: 'Washington DC', code: 'DCA', airports: 'DCA, IAD, BWI', highlight: false },
  { name: 'Seattle', code: 'SEA', airports: 'Sea-Tac', highlight: false },
  { name: 'Denver', code: 'DEN', airports: 'DEN', highlight: false },
  { name: 'Atlanta', code: 'ATL', airports: 'Hartsfield-Jackson', highlight: false },
  { name: 'Dallas', code: 'DFW', airports: 'DFW, Love Field', highlight: false },
  { name: 'Phoenix', code: 'PHX', airports: 'Sky Harbor', highlight: false },
  { name: 'Las Vegas', code: 'LAS', airports: 'McCarran', highlight: false },
]

const cityDetails = [
  {
    city: 'New York City',
    description: 'Flights from JFK, LaGuardia, and Newark; cruises from Manhattan and Brooklyn terminals',
    icon: '🗽'
  },
  {
    city: 'Boston',
    description: 'Logan Airport departures and Black Falcon cruise terminal sailings',
    icon: '🏛️'
  },
  {
    city: 'Miami',
    description: 'Miami International and Fort Lauderdale airports; PortMiami Caribbean cruises',
    icon: '🏖️'
  },
  {
    city: 'Washington DC',
    description: 'Reagan National, Dulles, and BWI airports; Baltimore cruise port',
    icon: '🏛️'
  },
  {
    city: 'Los Angeles',
    description: 'LAX departures and San Pedro cruise terminals',
    icon: '🌴'
  },
  {
    city: 'San Francisco',
    description: 'SFO airport and Port of San Francisco cruises',
    icon: '🌉'
  },
  {
    city: 'Seattle',
    description: 'Sea-Tac airport and Port of Seattle cruise departures',
    icon: '🏔️'
  },
  {
    city: 'Chicago',
    description: "O'Hare and Midway airports serving the Midwest",
    icon: '🏢'
  },
  {
    city: 'Denver',
    description: 'Gateway to the Mountain West and Southwest',
    icon: '⛰️'
  },
  {
    city: 'Atlanta',
    description: "Hartsfield-Jackson, the South's major hub",
    icon: '🍑'
  },
  {
    city: 'Dallas',
    description: 'DFW and Love Field serving Texas and the Southwest',
    icon: '🤠'
  },
]

const services = [
  {
    icon: Plane,
    title: 'Competitive Airline Fares',
    description: 'Access to special rates and exclusive deals with major carriers',
    color: 'text-secondary-500',
    bgColor: 'bg-secondary-50'
  },
  {
    icon: TrendingUp,
    title: 'Cabin & Resort Upgrades',
    description: 'Help securing upgrades and added amenities when available',
    color: 'text-accent-500',
    bgColor: 'bg-accent-50'
  },
  {
    icon: Users,
    title: 'Group Coordination',
    description: 'Seamless booking for families and special occasions',
    color: 'text-primary-500',
    bgColor: 'bg-primary-50'
  },
  {
    icon: Clock,
    title: 'Last-Minute Planning',
    description: 'Expert availability search and rapid booking assistance',
    color: 'text-secondary-500',
    bgColor: 'bg-secondary-50'
  },
]

const benefits = [
  {
    icon: Users,
    title: 'Personalized Planning',
    description: 'Custom itineraries based on your preferences and budget',
    highlight: true
  },
  {
    icon: Shield,
    title: 'Price Protection',
    description: 'We monitor prices and rebook if rates drop',
    highlight: false
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Emergency assistance whenever you need it',
    highlight: true
  },
  {
    icon: CheckCircle,
    title: 'Change Management',
    description: 'We handle cancellations and modifications',
    highlight: false
  },
  {
    icon: Award,
    title: 'Travel Insurance',
    description: 'Comprehensive coverage options to protect your investment',
    highlight: false
  },
]

const TrustedAgencySection = () => {
  return (
    <article className="py-16 bg-gradient-to-b from-white to-gray-50" aria-label="About Next Trip Anywhere">
      <div className="container mx-auto px-4">

        {/* Hero Introduction with Gradient Background */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-2xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Globe className="w-8 h-8" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Your Trusted Nationwide Travel Agency</h2>
              </div>

              <p className="text-lg md:text-xl text-white/95 leading-relaxed max-w-4xl">
                Next Trip Anywhere is America&apos;s premier full-service travel agency, specializing
                in creating unforgettable vacations from major cities nationwide including New York
                City, Los Angeles, Chicago, Miami, Boston, Washington DC, Seattle, Denver, Atlanta,
                Dallas, Phoenix, and Las Vegas. With over 15 years of experience and exclusive
                partnerships with major airlines, cruise lines, and resorts, we deliver exceptional
                value and personalized service that online booking sites can&apos;t match.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <Star className="w-5 h-5 text-yellow-300" />
                  <span className="font-semibold">15+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">50,000+ Happy Travelers</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <Award className="w-5 h-5" />
                  <span className="font-semibold">ASTA & CLIA Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Major Cities Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold mb-4 text-gray-900">
              Expert Travel Planning from Major US Cities Nationwide
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our team of certified travel advisors specializes in departures from major cities
              nationwide, including East Coast, West Coast, Midwest, and Southern hubs:
            </p>
          </div>

          {/* Interactive City Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {majorCities.map((city) => (
              <div
                key={city.code}
                className={`group relative p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer ${
                  city.highlight
                    ? 'border-secondary-400 bg-secondary-50 hover:bg-secondary-100'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-bold text-gray-900">{city.name}</h4>
                    <span className="text-sm text-gray-500">{city.code}</span>
                  </div>
                  <MapPin className={`w-5 h-5 ${city.highlight ? 'text-secondary-500' : 'text-gray-400'}`} />
                </div>
                <p className="text-xs text-gray-600">{city.airports}</p>
                {city.highlight && (
                  <div className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                    Popular
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Detailed City Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cityDetails.map((detail) => (
              <div key={detail.city} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{detail.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-2">{detail.city}</h4>
                    <p className="text-sm text-gray-600">{detail.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Services Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold mb-4 text-gray-900">Professional Travel Services</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our relationships with travel suppliers and industry expertise provide value for you.
              We offer:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl border border-gray-200 bg-white hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className={`${service.bgColor} w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className={`w-7 h-7 ${service.color}`} />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{service.title}</h4>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold mb-4 text-gray-900">Full-Service Travel Agency Benefits</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Unlike online booking sites, we provide comprehensive support throughout your journey:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`relative p-6 rounded-xl ${
                  benefit.highlight
                    ? 'bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-primary-300'
                    : 'bg-white border border-gray-200'
                } hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-start gap-4">
                  <div className={`${benefit.highlight ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600'} p-3 rounded-lg`}>
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-2">{benefit.title}</h4>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </div>
                {benefit.highlight && (
                  <div className="absolute -top-2 -right-2">
                    <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mt-16"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mb-20"></div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">Start Planning Your Next Adventure</h3>
              <p className="text-lg md:text-xl text-white/95 mb-8 max-w-3xl mx-auto">
                Whether you&apos;re dreaming of a Caribbean cruise, European adventure, all-inclusive
                resort stay, or domestic getaway, Next Trip Anywhere makes it happen. Our nationwide
                travel experts are ready to turn your travel dreams into reality while saving you time
                and money. Contact us today for a free consultation and discover why we&apos;re
                America&apos;s most trusted travel agency.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Get Your Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/destinations"
                  className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white border-2 border-white/50 px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/30 transition-colors"
                >
                  Explore Destinations
                  <Globe className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </article>
  )
}

export default memo(TrustedAgencySection)