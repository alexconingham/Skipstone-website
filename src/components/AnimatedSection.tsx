'use client'

import { ReactNode } from 'react'
import { motion, Variants } from 'framer-motion'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'parallax'
  delay?: number       // milliseconds
  duration?: number    // milliseconds
  threshold?: number   // kept for API compat
  rootMargin?: string  // kept for API compat
  triggerOnce?: boolean
}

// Cinematic entrance presets — snappy departure, settled arrival
const presets: Record<string, Variants> = {
  fadeIn: {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  slideUp: {
    hidden:  { opacity: 0, y: 72 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden:  { opacity: 0, x: 72 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden:  { opacity: 0, x: -72 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden:  { opacity: 0, scale: 0.88 },
    visible: { opacity: 1, scale: 1 },
  },
  parallax: {
    hidden:  { opacity: 0, y: 48, scale: 0.97 },
    visible: { opacity: 1, y: 0,  scale: 1 },
  },
}

export default function AnimatedSection({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0,
  duration = 600,
  triggerOnce = true,
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: triggerOnce, margin: '-80px 0px' }}
      variants={presets[animation] ?? presets.fadeIn}
      transition={{
        duration: duration / 1000,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],  // expo-out: fast initial movement, buttery settle
      }}
    >
      {children}
    </motion.div>
  )
}

// Kept for backwards compat — uses Framer Motion internally
export function LoadingSkeleton({ count = 3, className = '' }: { count?: number; className?: string }) {
  return (
    <div className={`flex space-x-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-gray-700 rounded-lg aspect-square w-32 h-32"
          style={{ animationDelay: `${i * 100}ms` }}
        />
      ))}
    </div>
  )
}

// Staggered grid container — use this for card grids
export function StaggerGrid({
  children,
  className = '',
  staggerDelay = 0.12,
  viewportMargin = '-80px 0px',
}: {
  children: ReactNode[]
  className?: string
  staggerDelay?: number
  viewportMargin?: string
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: viewportMargin }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={i}
              variants={{
                hidden:  { opacity: 0, y: 28 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  )
}
