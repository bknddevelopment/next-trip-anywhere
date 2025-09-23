'use client'

import React from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'gradient'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  children: React.ReactNode
}

/**
 * Standardized Card Component
 * Replaces inconsistent card implementations across the site
 * Ensures proper shadow, padding, and hover states
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', hover = true, children, ...props }, ref) => {
    const baseStyles = 'rounded-lg overflow-hidden transition-all duration-300'

    const variants = {
      default: 'bg-white dark:bg-gray-800 shadow-lg',
      elevated: 'bg-white dark:bg-gray-800 shadow-xl',
      bordered: 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700',
      gradient:
        'bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-900 shadow-lg',
    }

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    }

    const hoverStyles = hover ? 'hover:shadow-xl hover:-translate-y-1' : ''

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], paddings[padding], hoverStyles, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

/**
 * Card Header Component
 */
export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { gradient?: boolean }
>(({ className, gradient = false, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      gradient
        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-4'
        : 'border-b border-gray-200 dark:border-gray-700 pb-4 mb-4',
      className
    )}
    {...props}
  >
    {children}
  </div>
))

CardHeader.displayName = 'CardHeader'

/**
 * Card Title Component
 */
export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-xl font-semibold text-gray-900 dark:text-gray-100', className)}
    {...props}
  >
    {children}
  </h3>
))

CardTitle.displayName = 'CardTitle'

/**
 * Card Description Component
 */
export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-gray-600 dark:text-gray-400 mt-1', className)}
    {...props}
  >
    {children}
  </p>
))

CardDescription.displayName = 'CardDescription'

/**
 * Card Content Component
 */
export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('text-gray-700 dark:text-gray-300', className)} {...props}>
      {children}
    </div>
  )
)

CardContent.displayName = 'CardContent'

/**
 * Card Footer Component
 */
export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('border-t border-gray-200 dark:border-gray-700 pt-4 mt-4', className)}
      {...props}
    >
      {children}
    </div>
  )
)

CardFooter.displayName = 'CardFooter'
