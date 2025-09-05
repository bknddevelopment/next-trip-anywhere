'use client'

import { memo } from 'react'
import { Shield, DollarSign, HeadphonesIcon, Award, Users, MapPin, Sparkles } from 'lucide-react'

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
    title: 'Best Price Guarantee',
    description: 'Find a lower price? We&apos;ll match it and give you an additional 5% off.',
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
    <section className="py-20 bg-gradient-to-b from-white to-warm-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-navy mb-4">
            Why Choose <span className="text-gradient">Next Trip Anywhere</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We&apos;re not just another travel agency. We&apos;re your trusted partner in creating
            unforgettable memories.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-12 text-white animate-fade-in">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>

        {/* Special Offer Banner */}
        <div className="mt-16 bg-gradient-to-r from-accent-500 to-accent-600 rounded-3xl p-8 md:p-12 text-white text-center animate-fade-in">
          <Sparkles className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl md:text-3xl font-bold mb-4">First-Time Traveler Special</h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            New customers get an extra $100 off their first booking plus free travel insurance!
          </p>
          <button className="bg-white text-accent-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300">
            Claim Your Discount
          </button>
        </div>
      </div>
    </section>
  )
}

export default memo(WhyChooseUs)
