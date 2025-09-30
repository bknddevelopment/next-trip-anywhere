/**
 * @fileoverview Reusable CTA button component
 * @module components/common/CTAButton
 *
 * This component provides a consistent CTA button that integrates with
 * the Google Forms system used throughout the site.
 */

'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowRight, Phone } from 'lucide-react'

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'medium' | 'large'
  icon?: 'arrow' | 'phone' | 'none'
  fullWidth?: boolean
}

/**
 * CTAButton component for consistent call-to-action buttons
 *
 * @example
 * <CTAButton variant="primary" size="large">
 *   Book Your Trip
 * </CTAButton>
 */
export default function CTAButton({
  children,
  variant = 'primary',
  size = 'medium',
  icon = 'arrow',
  fullWidth = false,
  className = '',
  onClick,
  ...props
}: CTAButtonProps) {
  // Handle CTA click - opens Google Forms
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e)
    } else {
      // Default behavior - open Google Forms
      window.open(
        'https://docs.google.com/forms/d/e/1FAIpQLSe5Wy5yxW42FXTyFDsBPK7A0eqqcP_XKYCf-PHhd9vmlfvVWQ/viewform',
        '_blank'
      )
    }
  }

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
      onClick={handleClick}
      className={`
        inline-flex items-center justify-center gap-2
        font-semibold rounded-full
        transition-all duration-300 transform hover:scale-105
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
      <IconComponent />
    </button>
  )
}
