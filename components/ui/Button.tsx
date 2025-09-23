'use client'

import React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
  children: React.ReactNode
}

/**
 * Standardized Button Component
 * Ensures consistent design tokens across all CTAs
 * Replaces hardcoded button styles throughout the app
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'lg', fullWidth = false, children, ...props }, ref) => {
    const baseStyles =
      'font-semibold transition-all duration-300 transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary:
        'bg-primary-500 hover:bg-primary-600 text-white hover:shadow-lg focus:ring-primary-500 dark:bg-primary-400 dark:hover:bg-primary-500',
      secondary:
        'bg-secondary-500 hover:bg-secondary-600 text-white hover:shadow-lg focus:ring-secondary-500 dark:bg-secondary-400 dark:hover:bg-secondary-500',
      accent:
        'bg-accent-500 hover:bg-accent-600 text-white hover:shadow-lg focus:ring-accent-500 dark:bg-accent-400 dark:hover:bg-accent-500',
      ghost:
        'bg-transparent hover:bg-gray-100 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 focus:ring-gray-500',
      outline:
        'bg-white border-2 border-primary-500 text-primary-600 hover:bg-primary-50 dark:bg-gray-900 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-gray-800 focus:ring-primary-500',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
      xl: 'px-10 py-5 text-xl',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], fullWidth && 'w-full', className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

/**
 * Phone Call Button - Standardized CTA for phone conversions
 */
export const PhoneButton = ({ className, ...props }: Omit<ButtonProps, 'children'>) => (
  <Button variant="primary" size="lg" className={className} {...props}>
    <span className="mr-2">📞</span>
    Call 833-874-1019
  </Button>
)

/**
 * Quote Request Button - Secondary CTA for form fills
 */
export const QuoteButton = ({ className, ...props }: Omit<ButtonProps, 'children'>) => (
  <Button variant="outline" size="lg" className={className} {...props}>
    Get Free Quote
  </Button>
)
