'use client'

import { useRef, useEffect, useCallback } from 'react'

interface TrailPoint {
  x: number
  y: number
  timestamp: number
  id: number
}

export default function PixelatedWakeBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trailPointsRef = useRef<TrailPoint[]>([])
  const pointIdRef = useRef(0)
  const lastUpdateRef = useRef(0)
  const animationFrameRef = useRef<number>()

  const updateTrailDisplay = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const now = Date.now()
    
    // Filter out old points (older than 1.2 seconds for faster dissipation)
    trailPointsRef.current = trailPointsRef.current.filter(point => now - point.timestamp < 1200)
    
    // Update CSS variables for first 15 trail segments (reduced for performance)
    const maxSegments = 15
    for (let i = 0; i < maxSegments; i++) {
      if (i < trailPointsRef.current.length) {
        const point = trailPointsRef.current[i]
        const age = now - point.timestamp
        const opacity = Math.max(0, 1 - (age / 1200)) // Faster fade over 1.2s
        
        container.style.setProperty(`--trail-x-${i}`, `${point.x}px`)
        container.style.setProperty(`--trail-y-${i}`, `${point.y}px`)
        container.style.setProperty(`--trail-opacity-${i}`, opacity.toString())
      } else {
        // Clear unused segments
        container.style.setProperty(`--trail-x-${i}`, '-200px')
        container.style.setProperty(`--trail-y-${i}`, '-200px')
        container.style.setProperty(`--trail-opacity-${i}`, '0')
      }
    }
  }, [])

  const animate = useCallback(() => {
    updateTrailDisplay()
    animationFrameRef.current = requestAnimationFrame(animate)
  }, [updateTrailDisplay])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Throttled mouse move handler for better performance
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      
      // Throttle to max 60fps
      if (now - lastUpdateRef.current < 16) return
      lastUpdateRef.current = now

      // Check if mouse is over an interactive element that might have tooltips
      const target = e.target as HTMLElement
      if (target && (
        target.closest('[role="button"]') ||
        target.closest('.group') ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[data-tooltip]') ||
        target.matches('img') ||
        target.closest('.gallery-scroll')
      )) {
        // Don't add trail points over interactive elements
        return
      }

      const newPoint: TrailPoint = {
        x: e.clientX,
        y: e.clientY,
        timestamp: now,
        id: pointIdRef.current++
      }

      // Keep maximum 20 points, add new point to beginning
      trailPointsRef.current = [newPoint, ...trailPointsRef.current.slice(0, 19)]
    }

    // Re-enable wake effect
    document.addEventListener('mousemove', handleMouseMove, { passive: true, capture: false })
    animate()
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [animate])

  return (
    <div 
      ref={containerRef}
      className="pixelated-wake-trail"
    >
      {/* Create 15 trail elements for better performance */}
      {Array.from({ length: 15 }, (_, i) => (
        <div
          key={i}
          className="trail-segment"
          style={{
            '--segment-index': i,
            '--trail-x': `var(--trail-x-${i}, -200px)`,
            '--trail-y': `var(--trail-y-${i}, -200px)`,
            '--trail-opacity': `var(--trail-opacity-${i}, 0)`
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
} 