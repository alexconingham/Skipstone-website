'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'parallax'
  delay?: number
  duration?: number
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export default function AnimatedSection({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  rootMargin = '0px 0px -100px 0px',
  triggerOnce = true
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
          setTimeout(() => {
            setIsVisible(true)
            if (triggerOnce) {
              setHasTriggered(true)
            }
          }, delay)
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    const currentElement = elementRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [delay, threshold, rootMargin, triggerOnce, hasTriggered])

  const getAnimationClasses = () => {
    const baseTransition = `transition-all duration-${duration} ease-out`
    
    switch (animation) {
      case 'fadeIn':
        return `${baseTransition} ${
          isVisible 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
        }`
      
      case 'slideUp':
        return `${baseTransition} ${
          isVisible 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-16'
        }`
      
      case 'slideLeft':
        return `${baseTransition} ${
          isVisible 
            ? 'opacity-100 transform translate-x-0' 
            : 'opacity-0 transform translate-x-16'
        }`
      
      case 'slideRight':
        return `${baseTransition} ${
          isVisible 
            ? 'opacity-100 transform translate-x-0' 
            : 'opacity-0 transform -translate-x-16'
        }`
      
      case 'scaleIn':
        return `${baseTransition} ${
          isVisible 
            ? 'opacity-100 transform scale-100' 
            : 'opacity-0 transform scale-95'
        }`
      
      case 'parallax':
        return `${baseTransition} ${
          isVisible 
            ? 'opacity-100 transform translate-y-0 scale-100' 
            : 'opacity-0 transform translate-y-12 scale-98'
        }`
      
      default:
        return baseTransition
    }
  }

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClasses()} ${className}`}
    >
      {children}
    </div>
  )
}

// Loading Skeleton Component for galleries
export function LoadingSkeleton({ count = 3, className = '' }: { count?: number, className?: string }) {
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

// Progressive Image Loading Component
export function ProgressiveImage({ 
  src, 
  alt, 
  className = '',
  blurDataURL,
  ...props 
}: any) {
  const [isLoaded, setIsLoaded] = useState(false)
  
  return (
    <div className="relative overflow-hidden">
      <img
        {...props}
        src={src}
        alt={alt}
        className={`transition-all duration-500 ${
          isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
        } ${className}`}
        onLoad={() => setIsLoaded(true)}
      />
      {!isLoaded && blurDataURL && (
        <img
          src={blurDataURL}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

// Staggered Animation Container
export function StaggeredContainer({ 
  children, 
  className = '',
  staggerDelay = 100 
}: { 
  children: ReactNode[], 
  className?: string,
  staggerDelay?: number 
}) {
  return (
    <div className={className}>
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <AnimatedSection
              key={index}
              animation="fadeIn"
              delay={index * staggerDelay}
              className="w-full"
            >
              {child}
            </AnimatedSection>
          ))
        : children
      }
    </div>
  )
} 