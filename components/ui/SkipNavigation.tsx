'use client'

import React from 'react'

/**
 * Skip Navigation Component for Accessibility
 * Allows keyboard users to skip to main content
 * WCAG 2.1 Level A requirement
 */
export const SkipNavigation = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-500 text-white px-6 py-3 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
    >
      Skip to main content
    </a>
  )
}

/**
 * Main Content Anchor
 * Place this at the beginning of main content area
 */
export const MainContentAnchor = () => {
  return <div id="main-content" className="sr-only" aria-label="Main content starts here" />
}
