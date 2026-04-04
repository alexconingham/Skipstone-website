'use client'

import { useEffect, useRef } from 'react'

export default function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const COUNT = 20
    const particles: HTMLDivElement[] = []

    for (let i = 0; i < COUNT; i++) {
      const p = document.createElement('div')
      p.className = 'particle'
      const size = Math.random() * 2 + 1
      p.style.width = `${size}px`
      p.style.height = `${size}px`
      p.style.left = `${Math.random() * 100}%`
      p.style.bottom = `-${Math.random() * 20}%`
      p.style.animationDuration = `${Math.random() * 12 + 8}s`
      p.style.animationDelay = `${Math.random() * 10}s`
      container.appendChild(p)
      particles.push(p)
    }

    return () => {
      particles.forEach(p => p.remove())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-[4] overflow-hidden"
      aria-hidden="true"
    />
  )
}
