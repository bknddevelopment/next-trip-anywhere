'use client'

import { motion } from 'framer-motion'
import { Shield, Award, Users, Clock, CheckCircle, Star, Lock, Phone } from 'lucide-react'
import Image from 'next/image'

interface TrustSignal {
  id: string
  type: 'certification' | 'security' | 'social_proof' | 'guarantee' | 'award' | 'statistic'
  icon?: React.ComponentType<any>
  title: string
  description?: string
  value?: string | number
  image?: string
  link?: string
}

interface TrustSignalsProps {
  variant?: 'horizontal' | 'grid' | 'badges' | 'detailed'
  signals?: TrustSignal[]
  showAll?: boolean
  className?: string
}

const defaultTrustSignals: TrustSignal[] = [
  {
    id: 'experience',
    type: 'certification',
    icon: Award,
    title: '15+ Years Experience',
    description: 'Trusted travel expertise since 2010',
    image: '/images/badges/experience-badge.svg',
  },
  {
    id: 'licensed',
    type: 'certification',
    icon: Star,
    title: 'Licensed & Bonded',
    description: 'Fully licensed and bonded travel agency',
    image: '/images/badges/licensed-badge.svg',
  },
  {
    id: 'ssl',
    type: 'security',
    icon: Lock,
    title: '256-bit SSL Encryption',
    description: 'Your personal information is always secure',
  },
  {
    id: 'exclusive-deals',
    type: 'guarantee',
    icon: CheckCircle,
    title: 'Exclusive Travel Deals',
    description: "Access deals you won't find elsewhere!",
    value: '100%',
  },
  {
    id: 'support',
    type: 'guarantee',
    icon: Phone,
    title: '24/7 Support',
    description: 'Expert help whenever you need it',
    value: '24/7',
  },
  {
    id: 'experience',
    type: 'statistic',
    icon: Clock,
    title: 'Years of Experience',
    description: 'Serving travelers since 2010',
    value: '15+',
  },
  {
    id: 'customers',
    type: 'social_proof',
    icon: Users,
    title: 'Travelers Served',
    description: 'Customers nationwide trust us',
    value: '250K+',
  },
  {
    id: 'reviews',
    type: 'statistic',
    icon: Award,
    title: '5-Star Reviews',
    description: 'Verified customer testimonials',
    value: '10K+',
  },
  {
    id: 'partnerships',
    type: 'certification',
    icon: CheckCircle,
    title: 'Preferred Partner',
    description: 'Exclusive partnerships with major airlines & cruise lines',
  },
  {
    id: 'satisfaction',
    type: 'guarantee',
    icon: Star,
    title: 'Satisfaction Guarantee',
    description: "Not satisfied? We'll make it right or refund your money",
    value: '100%',
  },
]

const securityBadges = [
  {
    id: 'norton',
    title: 'Norton Secured',
    image: '/images/security/norton-secured.png',
  },
  {
    id: 'mcafee',
    title: 'McAfee Secure',
    image: '/images/security/mcafee-secure.png',
  },
  {
    id: 'ssl',
    title: 'SSL Certificate',
    image: '/images/security/ssl-certificate.png',
  },
  {
    id: 'pci',
    title: 'PCI Compliant',
    image: '/images/security/pci-compliant.png',
  },
]

export default function TrustSignals({
  variant = 'horizontal',
  signals = defaultTrustSignals,
  showAll = false,
  className = '',
}: TrustSignalsProps) {
  const displaySignals = showAll ? signals : signals.slice(0, 4)

  const renderSignal = (signal: TrustSignal, index: number) => {
    const Icon = signal.icon || CheckCircle

    const content = (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`
          flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300
          ${variant === 'badges' ? 'flex-col text-center space-x-0 space-y-2' : ''}
          ${signal.link ? 'cursor-pointer hover:scale-105' : ''}
        `}
      >
        {signal.image ? (
          <div className="flex-shrink-0">
            <Image
              src={signal.image}
              alt={signal.title}
              width={variant === 'badges' ? 48 : 32}
              height={variant === 'badges' ? 48 : 32}
              className="object-contain"
            />
          </div>
        ) : (
          <div
            className={`
            flex-shrink-0 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-white flex items-center justify-center
            ${variant === 'badges' ? 'w-12 h-12' : 'w-8 h-8'}
          `}
          >
            <Icon className={variant === 'badges' ? 'w-6 h-6' : 'w-4 h-4'} />
          </div>
        )}

        <div className={`flex-1 ${variant === 'badges' ? 'text-center' : ''}`}>
          <div
            className={`font-semibold text-gray-900 ${variant === 'badges' ? 'text-sm' : 'text-base'}`}
          >
            {signal.value && (
              <span className="text-primary-600 font-bold mr-1">{signal.value}</span>
            )}
            {signal.title}
          </div>
          {signal.description && variant !== 'badges' && (
            <div className="text-sm text-gray-600">{signal.description}</div>
          )}
        </div>
      </motion.div>
    )

    return signal.link ? (
      <a key={signal.id} href={signal.link} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    ) : (
      <div key={signal.id}>{content}</div>
    )
  }

  const renderVariant = () => {
    switch (variant) {
      case 'horizontal':
        return (
          <div className="flex flex-wrap justify-center items-center gap-4">
            {displaySignals.map(renderSignal)}
          </div>
        )

      case 'grid':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displaySignals.map(renderSignal)}
          </div>
        )

      case 'badges':
        return (
          <div className="flex flex-wrap justify-center items-center gap-4">
            {displaySignals.map(renderSignal)}
          </div>
        )

      case 'detailed':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {signals
                .filter((s) => s.type === 'certification' || s.type === 'guarantee')
                .map(renderSignal)}
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4 text-center">Our Track Record</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                {signals
                  .filter((s) => s.type === 'statistic' || s.type === 'social_proof')
                  .map((signal, index) => {
                    const Icon = signal.icon || Users
                    return (
                      <motion.div
                        key={signal.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-center"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-3xl font-bold text-primary-600 mb-1">
                          {signal.value}
                        </div>
                        <div className="font-semibold text-gray-900">{signal.title}</div>
                        {signal.description && (
                          <div className="text-sm text-gray-600 mt-1">{signal.description}</div>
                        )}
                      </motion.div>
                    )
                  })}
              </div>
            </div>

            {/* Security Badges */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
              <div className="flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600 mr-2" />
                <h4 className="font-semibold text-gray-900">Your Security is Our Priority</h4>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-6">
                {securityBadges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg p-3 shadow-sm"
                  >
                    <div className="w-20 h-12 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-600 font-medium">{badge.title}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-4 text-sm text-gray-600">
                <Lock className="w-4 h-4 inline mr-1" />
                256-bit SSL encryption protects all transactions
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="flex flex-wrap justify-center items-center gap-4">
            {displaySignals.map(renderSignal)}
          </div>
        )
    }
  }

  return <div className={className}>{renderVariant()}</div>
}

// Predefined trust signal components
export const TrustBar = () => (
  <TrustSignals
    variant="horizontal"
    signals={defaultTrustSignals.slice(0, 4)}
    className="py-4 bg-navy text-white"
  />
)

export const TrustBadges = () => (
  <TrustSignals
    variant="badges"
    signals={[
      defaultTrustSignals[0], // Experience
      defaultTrustSignals[1], // BBB
      defaultTrustSignals[3], // Exclusive Deals
      defaultTrustSignals[4], // 24/7 Support
    ]}
  />
)

export const DetailedTrustSection = () => (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Why Travelers Trust Next Trip Anywhere
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your peace of mind is our priority. We're committed to providing secure, reliable, and
          exceptional travel services.
        </p>
      </div>
      <TrustSignals variant="detailed" showAll />
    </div>
  </section>
)
