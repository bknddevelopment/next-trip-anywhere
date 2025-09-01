/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { HTMLMotionProps } from 'framer-motion'

// Helper to strip motion props for SSG
function stripMotionProps(props: any) {
  const {
    initial,
    animate,
    exit,
    transition,
    variants,
    whileHover,
    whileTap,
    whileInView,
    whileDrag,
    whileFocus,
    drag,
    dragConstraints,
    dragElastic,
    dragMomentum,
    dragTransition,
    dragPropagation,
    dragListener,
    onDragStart,
    onDrag,
    onDragEnd,
    onDirectionLock,
    onDragTransitionEnd,
    viewport,
    onViewportEnter,
    onViewportLeave,
    layoutId,
    layout,
    onLayoutAnimationStart,
    onLayoutAnimationComplete,
    ...htmlProps
  } = props

  return htmlProps
}

// Safe Motion wrapper that handles SSG/SSR issues
function SafeMotionDiv(props: HTMLMotionProps<'div'>) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // For SSG, render without animations initially
  if (!isClient) {
    return <div {...stripMotionProps(props)} />
  }

  // Once hydrated, render with animations
  return <motion.div {...props} />
}

function SafeMotionSection(props: HTMLMotionProps<'section'>) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <section {...stripMotionProps(props)} />
  }

  return <motion.section {...props} />
}

function SafeMotionArticle(props: HTMLMotionProps<'article'>) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <article {...stripMotionProps(props)} />
  }

  return <motion.article {...props} />
}

function SafeMotionButton(props: HTMLMotionProps<'button'>) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <button {...stripMotionProps(props)} />
  }

  return <motion.button {...props} />
}

// Export configured motion components that handle SSG properly
export const Motion = {
  div: SafeMotionDiv,
  section: SafeMotionSection,
  article: SafeMotionArticle,
  button: SafeMotionButton,
}

// Export AnimatePresence as is
export { AnimatePresence }
