'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Navigation() {
  const [isScrolled, setIsScrolled]   = useState(false)
  const [activeSection, setActive]    = useState('home')
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [scrollPct, setScrollPct]     = useState(0)

  const navItems = [
    { id: 'home',     label: 'HOME',    href: '#home' },
    { id: 'trailer',  label: 'TRAILER', href: '#trailer' },
    { id: 'memories', label: 'WORLD',   href: '#memories' },
    { id: 'enemies',  label: 'ENEMIES', href: '#enemies' },
    { id: 'arsenal',  label: 'ARSENAL', href: '#arsenal' },
    { id: 'mementos', label: 'LOOT',    href: '#mementos' },
    { id: 'devlog',   label: 'DEVLOG',     href: '/blog' },
    { id: 'studio',   label: 'SKIPSTONE ↗', href: 'https://skipstone.co.nz', external: true },
  ]

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      const maxY    = document.body.scrollHeight - window.innerHeight
      setIsScrolled(scrollY > 60)
      setScrollPct(maxY > 0 ? scrollY / maxY : 0)

      for (const item of navItems) {
        const el = document.getElementById(item.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActive(item.id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string, isExternal?: boolean) => {
    if (isExternal || href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer')
      return
    }
    if (href.startsWith('/')) {
      window.location.href = href
      return
    }
    const el = document.getElementById(href.replace('#', ''))
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMobileOpen(false)
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Scroll progress bar */}
      <div
        className="scroll-progress-bar"
        style={{ width: '100%', transform: `scaleX(${scrollPct})` }}
      />

      <div
        style={{
          background: isScrolled ? 'rgba(5,5,5,0.98)' : 'rgba(5,5,5,0.82)',
          backdropFilter: 'blur(14px)',
          borderBottom: isScrolled ? '1px solid rgba(0,255,65,0.12)' : '1px solid rgba(0,255,65,0.05)',
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <button
              onClick={() => scrollTo('#home')}
              className="flex-shrink-0 transition-opacity duration-200 hover:opacity-80"
              aria-label="Remember to Die — Home"
            >
              <Image
                src="/Skipstone_logo.png"
                alt="Skipstone Studios"
                width={260}
                height={52}
                style={{ height: '52px', width: 'auto', filter: 'brightness(0.9)', opacity: 0.9 }}
                priority
              />
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center">
              {navItems.map((item) => {
                const isActive = activeSection === item.id && !item.external
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.href, item.external)}
                    className="nav-underline"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 500,
                      fontSize: '0.7rem',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: isActive
                        ? 'rgba(232,232,232,0.9)'
                        : 'rgba(232,232,232,0.38)',
                      padding: '8px 11px',
                      transition: 'color 0.2s ease',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      position: 'relative',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(232,232,232,0.75)'
                    }}
                    onMouseLeave={e => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(232,232,232,0.38)'
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                    {/* Underline indicator */}
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 2, left: '50%',
                        transform: 'translateX(-50%)',
                        height: '1px',
                        width: isActive ? '80%' : '0%',
                        background: 'linear-gradient(90deg, transparent, #00ff41, transparent)',
                        boxShadow: '0 0 6px rgba(0,255,65,0.5)',
                        transition: 'width 0.3s ease',
                        pointerEvents: 'none',
                      }}
                    />
                  </button>
                )
              })}
            </div>

            {/* Steam CTA */}
            <div className="hidden md:block">
              <a
                href="https://store.steampowered.com/app/4340400/Remember_to_Die/"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-60 hover:opacity-90 transition-opacity duration-200 inline-block"
                aria-label="Wishlist on Steam"
              >
                <Image
                  src="/steam wishlist bw3.png"
                  alt="Wishlist on Steam"
                  width={260}
                  height={104}
                  className="w-auto h-12"
                  quality={90}
                />
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.2rem',
                color: 'rgba(232,232,232,0.5)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.05em',
              }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? '✕' : '≡'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-16 md:hidden z-40"
          style={{
            background: 'rgba(5,5,5,0.98)',
            borderTop: '1px solid rgba(0,255,65,0.08)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div className="px-8 pt-10 pb-8 space-y-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id && !item.external
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.href, item.external)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    letterSpacing: '0.08em',
                    color: isActive ? '#00ff41' : 'rgba(232,232,232,0.45)',
                    padding: '10px 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {item.label}
                </button>
              )
            })}
            <div className="pt-8">
              <a
                href="https://store.steampowered.com/app/4340400/Remember_to_Die/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-block', opacity: 0.7 }}
              >
                <Image src="/steam wishlist bw3.png" alt="Wishlist on Steam" width={320} height={128} className="w-auto h-16" quality={90} />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
