'use client'

import { useState } from 'react'
import { DynamicMotion as motion } from '@/lib/dynamicMotion'
import { Mail, Gift, Download, CheckCircle, X } from 'lucide-react'

interface NewsletterSignupProps {
  variant?: 'inline' | 'popup' | 'sidebar' | 'footer'
  title?: string
  subtitle?: string
  leadMagnet?: {
    title: string
    description: string
    downloadUrl: string
    type: 'pdf' | 'guide' | 'checklist' | 'ebook'
  }
  onSubmit?: (email: string, preferences?: string[]) => Promise<void>
  onClose?: () => void
  className?: string
}

const defaultLeadMagnets = {
  travelGuide: {
    title: 'Ultimate Travel Planning Guide',
    description: 'FREE 27-page guide with insider secrets to save up to 50% on your next vacation',
    downloadUrl: '/downloads/ultimate-travel-guide.pdf',
    type: 'pdf' as const,
  },
  budgetChecklist: {
    title: 'Travel Budget Checklist',
    description: 'Never overspend again! Complete checklist with hidden costs to watch for',
    downloadUrl: '/downloads/travel-budget-checklist.pdf',
    type: 'checklist' as const,
  },
  packingGuide: {
    title: 'Smart Packing Guide',
    description: 'Pack like a pro and avoid airline fees with our comprehensive packing strategies',
    downloadUrl: '/downloads/smart-packing-guide.pdf',
    type: 'guide' as const,
  },
}

export default function NewsletterSignup({
  variant = 'inline',
  title,
  subtitle,
  leadMagnet = defaultLeadMagnets.travelGuide,
  onSubmit,
  onClose,
  className = '',
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [preferences, setPreferences] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const preferenceOptions = [
    { id: 'flights', label: 'Flight Deals' },
    { id: 'cruises', label: 'Cruise Specials' },
    { id: 'resorts', label: 'Resort Packages' },
    { id: 'international', label: 'International Travel' },
    { id: 'domestic', label: 'Domestic Destinations' },
    { id: 'lastminute', label: 'Last-Minute Deals' },
  ]

  const handlePreferenceChange = (prefId: string) => {
    setPreferences((prev) =>
      prev.includes(prefId) ? prev.filter((p) => p !== prefId) : [...prev, prefId]
    )
  }

  const handleSignupClick = () => {
    // Redirect to Google Forms
    window.location.href =
      'https://docs.google.com/forms/d/e/1FAIpQLSe5Wy5yxW42FXTyFDsBPK7A0eqqcP_XKYCf-PHhd9vmlfvVWQ/viewform'
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'popup':
        return 'bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full'
      case 'sidebar':
        return 'bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6'
      case 'footer':
        return 'bg-gray-800 text-white rounded-xl p-6'
      default:
        return 'bg-white rounded-2xl shadow-xl p-8'
    }
  }

  const getTitle = () => {
    if (title) {
      return title
    }

    switch (variant) {
      case 'popup':
        return 'Get Exclusive Travel Deals!'
      case 'sidebar':
        return 'Stay in the Loop'
      case 'footer':
        return 'Join Our Travel Community'
      default:
        return 'Unlock Exclusive Travel Savings'
    }
  }

  const getSubtitle = () => {
    if (subtitle) {
      return subtitle
    }

    return 'Get insider deals, travel tips, and exclusive offers delivered straight to your inbox'
  }

  if (isSuccess && variant !== 'popup') {
    return (
      <div className={`${getVariantStyles()} ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome Aboard!</h3>
          <p className="text-gray-600 mb-4">
            Check your email for your free {leadMagnet.title} and exclusive deals!
          </p>
          <a
            href={leadMagnet.downloadUrl}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Download className="w-5 h-5" />
            <span>Download Your Guide</span>
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className={`${getVariantStyles()} ${className}`}>
      {variant === 'popup' && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close newsletter signup"
        >
          <X className="w-6 h-6" />
        </button>
      )}

      {isSuccess && variant === 'popup' ? (
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Success!</h3>
          <p className="text-gray-600 mb-4">
            Your free guide is downloading and exclusive deals are on the way!
          </p>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{getTitle()}</h3>
            <p className="text-gray-600">{getSubtitle()}</p>
          </div>

          {/* Lead Magnet Highlight */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Download className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">{leadMagnet.title}</h4>
                <p className="text-sm text-gray-600">{leadMagnet.description}</p>
              </div>
            </div>
          </div>

          {/* Sign Up Button */}
          <div className="space-y-4">
            <motion.button
              onClick={handleSignupClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-xl"
            >
              Get My Free{' '}
              {leadMagnet.type === 'pdf'
                ? 'Guide'
                : leadMagnet.type === 'checklist'
                  ? 'Checklist'
                  : 'Download'}
            </motion.button>
            <p className="text-center text-sm text-gray-500">
              Click to sign up for exclusive deals and travel tips
            </p>
          </div>

          {/* Trust Signals */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-col items-center space-y-2 text-xs text-gray-500">
              <div className="flex items-center space-x-4">
                <span>✓ No spam, ever</span>
                <span>✓ Unsubscribe anytime</span>
                <span>✓ 50,000+ subscribers</span>
              </div>
              <p className="text-center">
                We respect your privacy and never share your information
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// Predefined newsletter variants
export const InlineNewsletterSignup = (props: Partial<NewsletterSignupProps>) => (
  <NewsletterSignup variant="inline" {...props} />
)

export const PopupNewsletterSignup = (props: Partial<NewsletterSignupProps>) => (
  <NewsletterSignup variant="popup" {...props} />
)

export const SidebarNewsletterSignup = (props: Partial<NewsletterSignupProps>) => (
  <NewsletterSignup
    variant="sidebar"
    title="Travel Deals Insider"
    subtitle="Get weekly deals & tips"
    {...props}
  />
)

export const FooterNewsletterSignup = (props: Partial<NewsletterSignupProps>) => (
  <NewsletterSignup
    variant="footer"
    title="Stay Connected"
    subtitle="Exclusive deals for subscribers only"
    {...props}
  />
)
