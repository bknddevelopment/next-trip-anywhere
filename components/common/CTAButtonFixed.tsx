/**
 * @fileoverview Fixed CTA button component that ensures clicks work properly
 * @module components/common/CTAButtonFixed
 *
 * This component provides a reliable CTA button that works correctly
 * in static export builds by using both onClick and href attributes.
 */

'use client'

import { ButtonHTMLAttributes, ReactNode, useEffect, useRef } from 'react'
import { ArrowRight, Phone } from 'lucide-react'

interface CTAButtonFixedProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'medium' | 'large'
  icon?: 'arrow' | 'phone' | 'none'
  fullWidth?: boolean
  href?: string
  phoneNumber?: string
}

/**
 * Fixed CTAButton component that ensures proper functionality in static builds
 *
 * @example
 * <CTAButtonFixed variant="primary" size="large">
 *   Book Your Trip
 * </CTAButtonFixed>
 */
export default function CTAButtonFixed({
  children,
  variant = 'primary',
  size = 'medium',
  icon = 'arrow',
  fullWidth = false,
  className = '',
  href = 'https://n8n.nexttripanywhere.com/form/8e062c4b-08d0-4b48-9e33-09ae4c2e7098',
  phoneNumber,
  ...props
}: CTAButtonFixedProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Ensure button clicks work even if JavaScript is partially loaded
  useEffect(() => {
    const button = buttonRef.current
    if (!button) {
      return
    }

    const handleClick = (e: MouseEvent) => {
      e.stopPropagation() // Prevent any parent handlers from interfering

      if (phoneNumber) {
        window.location.href = `tel:${phoneNumber}`
      } else {
        // Use window.open with fallback to location change
        const newWindow = window.open(href, '_blank', 'noopener,noreferrer')
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          // Fallback if popup blocked
          window.location.href = href
        }
      }
    }

    button.addEventListener('click', handleClick, { capture: true })

    return () => {
      button.removeEventListener('click', handleClick, { capture: true })
    }
  }, [href, phoneNumber])

  // Size classes
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  }

  // Variant classes
  const variantClasses = {
    primary:
      'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl',
    secondary:
      'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
  }

  // Icon components
  const IconComponent = () => {
    if (icon === 'none') {
      return null
    }
    if (icon === 'phone') {
      return <Phone className="w-5 h-5" />
    }
    return <ArrowRight className="w-5 h-5" />
  }

  return (
    <button
      ref={buttonRef}
      className={`
        inline-flex items-center justify-center gap-2
        font-semibold rounded-full cursor-pointer
        transition-all duration-300 transform hover:scale-105
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      type="button"
      {...props}
    >
      {children}
      <IconComponent />
    </button>
  )
}
