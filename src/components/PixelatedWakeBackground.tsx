'use client'

import { useRef, useEffect, useState } from 'react'

interface TrailPoint {
  x: number
  y: number
  timestamp: number
  id: number
}

export default function PixelatedWakeBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [trailPoints, setTrailPoints] = useState<TrailPoint[]>([])
  const pointIdRef = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationFrame: number

    const handleMouseMove = (e: MouseEvent) => {
      const newPoint: TrailPoint = {
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
        id: pointIdRef.current++
      }

      setTrailPoints(prev => {
        // Add new point and keep maximum 25 points
        return [newPoint, ...prev].slice(0, 25)
      })
    }

    // Continuous animation loop to update trail and clean up old points
    const updateTrail = () => {
      const now = Date.now()
      
      setTrailPoints(prev => {
        // Remove points older than 1.5 seconds
        const filtered = prev.filter(point => now - point.timestamp < 1500)
        
        // Update CSS variables for all current trail positions
        filtered.forEach((point, index) => {
          if (index < 20) { // Only update first 20 for performance
            const age = now - point.timestamp
            const opacity = Math.max(0, 1 - (age / 1500)) // Fade out over 1.5s
            
            container.style.setProperty(`--trail-x-${index}`, `${point.x}px`)
            container.style.setProperty(`--trail-y-${index}`, `${point.y}px`)
            container.style.setProperty(`--trail-opacity-${index}`, opacity.toString())
          }
        })
        
        // Clear unused trail segments
        for (let i = filtered.length; i < 20; i++) {
          container.style.setProperty(`--trail-x-${i}`, '-200px')
          container.style.setProperty(`--trail-y-${i}`, '-200px')
          container.style.setProperty(`--trail-opacity-${i}`, '0')
        }
        
        return filtered
      })
      
      animationFrame = requestAnimationFrame(updateTrail)
    }

    document.addEventListener('mousemove', handleMouseMove)
    updateTrail()
    
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
            '--trail-x': `var(--trail-x-${i}, -200px)`,
            '--trail-y': `var(--trail-y-${i}, -200px)`,
            '--trail-opacity': `var(--trail-opacity-${i}, 0)`
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
} 