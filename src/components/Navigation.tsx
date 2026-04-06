'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { id: 'home',     label: 'HOME',    href: '#home' },
    { id: 'trailer',  label: 'TRAILER', href: '#trailer' },
    { id: 'memories', label: 'WORLD',   href: '#memories' },
    { id: 'enemies',  label: 'ENEMIES', href: '#enemies' },
    { id: 'arsenal',  label: 'ARSENAL', href: '#arsenal' },
    { id: 'mementos', label: 'LOOT',    href: '#mementos' },
    { id: 'studio',   label: 'SKIPSTONE ↗', href: 'https://skipstone.co.nz', external: true },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60)
      for (const item of navItems) {
        const el = document.getElementById(item.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(item.id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string, isExternal?: boolean) => {
    if (isExternal || href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer')
      return
    }
    const el = document.getElementById(href.replace('#', ''))
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      role="navigation"
      aria-label="Main navigation"
    >
      <div
        style={{
          background: isScrolled ? 'rgba(5,5,5,0.95)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(8px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(0,255,65,0.15)' : '1px solid transparent',
          transition: 'all 0.3s ease',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-14">

            {/* Logo */}
            <button
              onClick={() => scrollTo('#home')}
              className="flex-shrink-0 transition-opacity duration-200 hover:opacity-70"
              aria-label="Remember to Die — Home"
            >
              <Image
                src="/Skipstone_logo.png"
                alt="Skipstone Studios"
                width={100}
                height={20}
                className="h-6 w-auto"
                style={{ filter: 'grayscale(1) brightness(0.6)' }}
                priority
              />
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-0">
              {navItems.map((item) => {
                const isActive = activeSection === item.id && !item.external
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.href, item.external)}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.18em',
                      color: isActive ? '#00ff41' : 'rgba(232,232,232,0.45)',
                      textShadow: isActive ? '0 0 8px rgba(0,255,65,0.6)' : 'none',
                      padding: '6px 10px',
                      transition: 'all 0.2s ease',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => { if (!isActive) (e.target as HTMLElement).style.color = 'rgba(232,232,232,0.85)' }}
                    onMouseLeave={e => { if (!isActive) (e.target as HTMLElement).style.color = 'rgba(232,232,232,0.45)' }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                )
              })}
            </div>

            {/* Steam CTA */}
            <div className="hidden md:block">
              <button
                onClick={() => scrollTo('#steam-cta')}
                className="opacity-75 hover:opacity-100 transition-opacity duration-200 hover:scale-[1.03]"
                style={{ transform: 'scale(1)', transition: 'all 0.2s ease' }}
                aria-label="Wishlist on Steam"
              >
                <Image
                  src="/steam wishlist bw3.png"
                  alt="Wishlist on Steam"
                  width={160}
                  height={64}
                  className="w-auto h-8"
                  quality={90}
                />
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden transition-colors duration-200 p-2"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', color: 'rgba(0,255,65,0.6)', background: 'none', border: 'none', cursor: 'pointer' }}
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
          className="fixed inset-0 top-14 md:hidden z-40"
          style={{ background: 'rgba(5,5,5,0.97)', borderTop: '1px solid rgba(0,255,65,0.15)' }}
        >
          <div className="px-8 pt-8 pb-8 space-y-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id && !item.external
              return (
                <button
                  key={item.id}
                  onClick={() => { scrollTo(item.href, item.external); setMobileOpen(false) }}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.1rem',
                    letterSpacing: '0.2em',
                    color: isActive ? '#00ff41' : 'rgba(232,232,232,0.5)',
                    textShadow: isActive ? '0 0 8px rgba(0,255,65,0.5)' : 'none',
                    padding: '12px 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    borderBottom: '1px solid rgba(0,255,65,0.06)',
                  }}
                >
                  {item.label}
                </button>
              )
            })}
            <div className="pt-6">
              <button
                onClick={() => { scrollTo('#steam-cta'); setMobileOpen(false) }}
                className="opacity-80"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <Image src="/steam wishlist bw3.png" alt="Wishlist on Steam" width={220} height={88} className="w-auto h-12" quality={90} />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
