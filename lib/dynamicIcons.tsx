'use client'

import dynamic from 'next/dynamic'
import { LucideProps } from 'lucide-react'
import { ComponentType } from 'react'

// Generic loading component for icons
const IconLoader = ({ className }: { className?: string }) => (
  <div className={className} style={{ width: '1em', height: '1em', display: 'inline-block' }} />
)

// Lazy load commonly used icons
export const DynamicChevronDown = dynamic<LucideProps>(
  () => import('lucide-react').then((mod) => mod.ChevronDown),
  { loading: () => <IconLoader />, ssr: true }
)

export const DynamicChevronUp = dynamic<LucideProps>(
  () => import('lucide-react').then((mod) => mod.ChevronUp),
  { loading: () => <IconLoader />, ssr: true }
)

export const DynamicCheck = dynamic<LucideProps>(
  () => import('lucide-react').then((mod) => mod.Check),
  { loading: () => <IconLoader />, ssr: true }
)

export const DynamicX = dynamic<LucideProps>(() => import('lucide-react').then((mod) => mod.X), {
  loading: () => <IconLoader />,
  ssr: true,
})

export const DynamicInfo = dynamic<LucideProps>(
  () => import('lucide-react').then((mod) => mod.Info),
  { loading: () => <IconLoader />, ssr: true }
)

export const DynamicHelpCircle = dynamic<LucideProps>(
  () => import('lucide-react').then((mod) => mod.HelpCircle),
  { loading: () => <IconLoader />, ssr: true }
)

export const DynamicSparkles = dynamic<LucideProps>(
  () => import('lucide-react').then((mod) => mod.Sparkles),
  { loading: () => <IconLoader />, ssr: true }
)

export const DynamicStar = dynamic<LucideProps>(
  () => import('lucide-react').then((mod) => mod.Star),
  { loading: () => <IconLoader />, ssr: true }
)

export const DynamicMapPin = dynamic<LucideProps>(
  () => import('lucide-react').then((mod) => mod.MapPin),
  { loading: () => <IconLoader />, ssr: true }
)

export const DynamicCalendar = dynamic<LucideProps>(
  () => import('lucide-react').then((mod) => mod.Calendar),
  { loading: () => <IconLoader />, ssr: true }
)

export const DynamicClock = dynamic<LucideProps>(
  () => import('lucide-react').then((mod) => mod.Clock),
  { loading: () => <IconLoader />, ssr: true }
)

export const DynamicPhone = dynamic<LucideProps>(
  () => import('lucide-react').then((mod) => mod.Phone),
  { loading: () => <IconLoader />, ssr: true }
)

export const DynamicMail = dynamic<LucideProps>(
  () => import('lucide-react').then((mod) => mod.Mail),
  { loading: () => <IconLoader />, ssr: true }
)

// Generic icon loader for any icon
export function createDynamicIcon(iconName: string) {
  return dynamic<LucideProps>(() => import('lucide-react').then((mod) => (mod as any)[iconName]), {
    loading: () => <IconLoader />,
    ssr: true,
  })
}
