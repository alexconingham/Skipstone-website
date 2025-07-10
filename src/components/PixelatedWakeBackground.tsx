'use client'

import { useRef, useEffect, useState } from 'react'

interface TrailPoint {
  x: number
  y: number
  timestamp: number
}

export default function PixelatedWakeBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [trailPoints, setTrailPoints] = useState<TrailPoint[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationFrame: number

    const handleMouseMove = (e: MouseEvent) => {
      const newPoint: TrailPoint = {
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      }

      setTrailPoints(prev => {
        const updated = [newPoint, ...prev.slice(0, 19)] // Keep last 20 points
        
        // Update CSS variables for trail positions
        updated.forEach((point, index) => {
          container.style.setProperty(`--trail-x-${index}`, `${point.x}px`)
          container.style.setProperty(`--trail-y-${index}`, `${point.y}px`)
        })
        
        return updated
      })
    }

    // Cleanup old trail points
    const cleanupTrail = () => {
      const now = Date.now()
      setTrailPoints(prev => prev.filter(point => now - point.timestamp < 2000))
      animationFrame = requestAnimationFrame(cleanupTrail)
    }

    document.addEventListener('mousemove', handleMouseMove)
    cleanupTrail()
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="pixelated-wake-trail"
    >
      {/* Create multiple trail elements */}
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          className="trail-segment"
          style={{
            '--segment-index': i,
            '--trail-x': `var(--trail-x-${i}, -100px)`,
            '--trail-y': `var(--trail-y-${i}, -100px)`
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
} 