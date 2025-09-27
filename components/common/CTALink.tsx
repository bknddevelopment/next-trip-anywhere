/**
 * @fileoverview Simple CTA Link component using anchor tags for reliability
 * @module components/common/CTALink
 *
 * This component uses standard anchor tags which are more reliable
 * in static exports than JavaScript-based buttons.
 */

import { AnchorHTMLAttributes, ReactNode } from 'react'
import { ArrowRight, Phone, Sparkles } from 'lucide-react'

interface CTALinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'outline'
  size?: 'small' | 'medium' | 'large'
  icon?: 'arrow' | 'phone' | 'sparkles' | 'none'
  fullWidth?: boolean
}

/**
 * CTALink component using anchor tags for maximum reliability
 *
 * @example
 * <CTALink variant="primary" size="large" icon="arrow">
 *   Get Your Quote
 * </CTALink>
 */
export default function CTALink({
  children,
  variant = 'primary',
  size = 'medium',
  icon = 'arrow',
  fullWidth = false,
  className = '',
  href = 'https://n8n.nexttripanywhere.com/form/8e062c4b-08d0-4b48-9e33-09ae4c2e7098',
  target = '_blank',
  rel = 'noopener noreferrer',
  ...props
}: CTALinkProps) {
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
    accent:
      'bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-600 hover:to-accent-700 shadow-lg hover:shadow-xl',
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
    if (icon === 'sparkles') {
      return <Sparkles className="w-5 h-5" />
    }
    return <ArrowRight className="w-5 h-5" />
  }

  return (
    <a
      href={href}
      target={target}
      rel={rel}
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
    </a>
  )
}
