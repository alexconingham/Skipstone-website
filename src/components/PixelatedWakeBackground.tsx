'use client'

import { useRef, useEffect, useState, useCallback } from 'react'

interface WakePoint {
  x: number
  y: number
  timestamp: number
  intensity: number
}

export default function PixelatedWakeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>()
  const [wakePoints, setWakePoints] = useState<WakePoint[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseActive, setIsMouseActive] = useState(false)

  const WAKE_LIFETIME = 3000 // 3 seconds
  const PIXEL_SIZE = 8 // Size of pixelation effect
  const WAKE_SPREAD = 60 // How wide the wake spreads
  const MAX_INTENSITY = 0.8 // Maximum pixelation intensity

  // Handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePosition({ x, y })
    setIsMouseActive(true)

    // Check if mouse is over a carousel image (reduce intensity)
    const elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY)
    const isOverCarouselImage = elementUnderMouse?.tagName === 'IMG' && 
                               elementUnderMouse?.closest('.gallery-scroll')
    
    // Reduce intensity when over carousel images
    const intensity = isOverCarouselImage ? MAX_INTENSITY * 0.3 : MAX_INTENSITY

    // Add new wake point
    const newWakePoint: WakePoint = {
      x,
      y,
      timestamp: Date.now(),
      intensity
    }

    setWakePoints(prev => {
      const filtered = prev.filter(point => 
        Date.now() - point.timestamp < WAKE_LIFETIME
      )
      return [...filtered, newWakePoint]
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsMouseActive(false)
  }, [])

  // Setup canvas and event listeners
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [handleMouseMove, handleMouseLeave])

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const currentTime = Date.now()

      // Clean up old wake points
      setWakePoints(prev => 
        prev.filter(point => currentTime - point.timestamp < WAKE_LIFETIME)
      )

      // Draw pixelated wake effect
      wakePoints.forEach(point => {
        const age = currentTime - point.timestamp
        const ageRatio = age / WAKE_LIFETIME
        
        // Fade out over time
        const alpha = (1 - ageRatio) * point.intensity
        if (alpha <= 0) return

        // Create spreading wake pattern
        const spread = WAKE_SPREAD * ageRatio * 2
        const wakeWidth = Math.max(PIXEL_SIZE, spread)
        const wakeHeight = Math.max(PIXEL_SIZE, spread * 0.6)

        // Draw pixelated effect
        ctx.save()
        ctx.globalAlpha = alpha
        ctx.filter = `blur(${ageRatio * 2}px)`

        // Create multiple pixelated circles for wake effect
        for (let i = 0; i < 5; i++) {
          const offsetX = (Math.random() - 0.5) * wakeWidth
          const offsetY = (Math.random() - 0.5) * wakeHeight
          
          const pixelX = Math.floor((point.x + offsetX) / PIXEL_SIZE) * PIXEL_SIZE
          const pixelY = Math.floor((point.y + offsetY) / PIXEL_SIZE) * PIXEL_SIZE
          
          // Gradient from blue to white for wake effect
          const intensity = 1 - ageRatio
          const hue = 200 + (intensity * 60) // Blue to cyan
          const saturation = 70 + (intensity * 30)
          const lightness = 30 + (intensity * 50)
          
          ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha * 0.6})`
          ctx.fillRect(pixelX, pixelY, PIXEL_SIZE, PIXEL_SIZE)
        }

        ctx.restore()
      })

      // Draw current cursor position with stronger effect
      if (isMouseActive) {
        ctx.save()
        ctx.globalAlpha = 0.9
        
        const pixelX = Math.floor(mousePosition.x / PIXEL_SIZE) * PIXEL_SIZE
        const pixelY = Math.floor(mousePosition.y / PIXEL_SIZE) * PIXEL_SIZE
        
        // Bright white/cyan center
        ctx.fillStyle = 'rgba(0, 255, 255, 0.8)'
        ctx.fillRect(pixelX - PIXEL_SIZE, pixelY - PIXEL_SIZE, PIXEL_SIZE * 3, PIXEL_SIZE * 3)
        
        // Surrounding pixelated glow
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2
          const distance = PIXEL_SIZE * 2
          const glowX = Math.floor((mousePosition.x + Math.cos(angle) * distance) / PIXEL_SIZE) * PIXEL_SIZE
          const glowY = Math.floor((mousePosition.y + Math.sin(angle) * distance) / PIXEL_SIZE) * PIXEL_SIZE
          
          ctx.fillStyle = 'rgba(100, 200, 255, 0.5)'
          ctx.fillRect(glowX, glowY, PIXEL_SIZE, PIXEL_SIZE)
        }
        
        ctx.restore()
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [wakePoints, mousePosition, isMouseActive])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-full z-10"
      style={{ 
        mixBlendMode: 'screen',
        opacity: 0.6,
        pointerEvents: 'auto'
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pixelated-canvas"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  )
} 