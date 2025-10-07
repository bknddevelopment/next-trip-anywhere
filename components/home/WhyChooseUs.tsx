'use client'

import { memo } from 'react'
import { Shield, DollarSign, HeadphonesIcon, Award, Users, MapPin } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: '100% Secure Booking',
    description:
      'Your payments and personal information are always protected with bank-level encryption.',
    color: 'text-primary-500',
    bgColor: 'bg-primary-50',
  },
  {
    icon: DollarSign,
    title: 'Exclusive Travel Deals',
    description: 'Access insider rates and special offers you won&apos;t find anywhere else.',
    color: 'text-accent-500',
    bgColor: 'bg-accent-50',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Expert Support',
    description:
      'Our travel experts are available around the clock to assist you before, during, and after your trip.',
    color: 'text-secondary-500',
    bgColor: 'bg-secondary-50',
  },
  {
    icon: Award,
    title: '15+ Years Experience',
    description: 'Trusted by over 50,000 happy travelers since 2010. ASTA and CLIA certified.',
    color: 'text-primary-500',
    bgColor: 'bg-primary-50',
  },
  {
    icon: Users,
    title: 'Personalized Service',
    description: 'Every trip is tailored to your preferences, budget, and travel style.',
    color: 'text-accent-500',
    bgColor: 'bg-accent-50',
  },
  {
    icon: MapPin,
    title: 'Nationwide Coverage',
    description:
      'Local experts across America with insider knowledge of all major US airports and departure cities.',
    color: 'text-secondary-500',
    bgColor: 'bg-secondary-50',
  },
]

const stats = [
  { number: '50,000+', label: 'Happy Travelers' },
  { number: '15+', label: 'Years Experience' },
  { number: '4.9/5', label: 'Average Rating' },
  { number: '24/7', label: 'Support Available' },
]

// Memoized feature card component
const FeatureCard = memo(({ feature, index }: { feature: (typeof features)[0]; index: number }) => (
  <div className="group animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
      <div
        className={`inline-flex p-3 rounded-lg ${feature.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}
      >
        <feature.icon className={`w-6 h-6 ${feature.color}`} />
      </div>
      <h3 className="text-xl font-bold text-navy mb-2">{feature.title}</h3>
      <p className="text-gray-600">{feature.description}</p>
    </div>
  </div>
))
FeatureCard.displayName = 'FeatureCard'

// Memoized stat card component
const StatCard = memo(({ stat, index }: { stat: (typeof stats)[0]; index: number }) => (
  <div className="text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
    <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
    <div className="text-sm md:text-base opacity-90">{stat.label}</div>
  </div>
))
StatCard.displayName = 'StatCard'

function WhyChooseUs() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-500 mb-4 font-display">
            Why Choose Next Trip Anywhere
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We&apos;re not just another travel agency. We&apos;re your trusted partner in creating
            unforgettable memories.
          </p>
        </div>

        {/* Features Grid - Improved Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Stats Section - Professional Navy Gradient */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-12 md:p-16 text-white shadow-2xl animate-fade-in">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(WhyChooseUs)
