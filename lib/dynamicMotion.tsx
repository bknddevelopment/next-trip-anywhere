'use client'

import dynamic from 'next/dynamic'
import React, { ComponentType } from 'react'
import type { HTMLMotionProps } from 'framer-motion'

// Create a factory function for dynamic motion elements
const createMotionElement = (element: string): ComponentType<any> => {
  return dynamic(
    () =>
      import('framer-motion').then((mod) => {
        const motionComponent = (mod.motion as any)[element]
        return motionComponent
      }),
    {
      loading: () => {
        const Element = element as any
        return <Element />
      },
      ssr: false, // Disable SSR for animations to reduce initial bundle
    }
  )
}

// Export all common motion primitives
export const DynamicMotion = {
  div: createMotionElement('div'),
  section: createMotionElement('section'),
  article: createMotionElement('article'),
  button: createMotionElement('button'),
  header: createMotionElement('header'),
  nav: createMotionElement('nav'),
  ul: createMotionElement('ul'),
  li: createMotionElement('li'),
  a: createMotionElement('a'),
  span: createMotionElement('span'),
  p: createMotionElement('p'),
  h1: createMotionElement('h1'),
  h2: createMotionElement('h2'),
  h3: createMotionElement('h3'),
  h4: createMotionElement('h4'),
  h5: createMotionElement('h5'),
  h6: createMotionElement('h6'),
  img: createMotionElement('img'),
  form: createMotionElement('form'),
  input: createMotionElement('input'),
  label: createMotionElement('label'),
  footer: createMotionElement('footer'),
  aside: createMotionElement('aside'),
  main: createMotionElement('main'),
}

// Export AnimatePresence separately
export const DynamicAnimatePresence = dynamic(
  () => import('framer-motion').then((mod) => mod.AnimatePresence),
  {
    ssr: false,
  }
)
