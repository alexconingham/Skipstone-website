'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface NavigationProps {
  className?: string
}

export default function Navigation({ className = '' }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { id: 'home',     label: 'Home',     href: '#home' },
    { id: 'trailer',  label: 'Trailer',  href: '#trailer' },
    { id: 'memories', label: 'Memories', href: '#memories' },
    { id: 'enemies',  label: 'Enemies',  href: '#enemies' },
    { id: 'arsenal',  label: 'Arsenal',  href: '#arsenal' },
    { id: 'mementos', label: 'Mementos', href: '#mementos' },
    { id: 'studio',   label: 'Skipstone Studio', href: 'https://skipstone.co.nz', external: true },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${className}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div
        className={`transition-all duration-500 border-b ${
          isScrolled
            ? 'bg-[#0e0c0c]/92 backdrop-blur-md border-[rgba(196,163,90,0.1)]'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-14">

            {/* Logo */}
            <button
              onClick={() => scrollTo('#home')}
              className="flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-300"
              aria-label="Remember to Die — Home"
            >
              <Image
                src="/Skipstone_logo.png"
                alt="Skipstone Studios"
                width={110}
                height={22}
                className="h-7 w-auto"
                priority
              />
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-0.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.href, item.external)}
                  className={`nav-link ${activeSection === item.id && !item.external ? 'active' : ''}`}
                  aria-current={activeSection === item.id && !item.external ? 'page' : undefined}
                >
                  {item.label}
                  {item.external && <span className="ml-1 opacity-40 text-[0.55rem]">↗</span>}
                </button>
              ))}
            </div>

            {/* Steam CTA — desktop */}
            <div className="hidden md:block">
              <button
                onClick={() => scrollTo('#steam-cta')}
                className="opacity-85 hover:opacity-100 transition-all duration-300 hover:scale-[1.03]"
                aria-label="Wishlist on Steam"
              >
                <Image
                  src="/steam wishlist bw3.png"
                  alt="Wishlist on Steam"
                  width={180}
                  height={72}
                  className="w-auto h-9"
                  quality={90}
                />
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-[#7a6a58] hover:text-[#c4a35a] transition-colors duration-200 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 top-14 bg-[#0e0c0c]/97 backdrop-blur-lg md:hidden z-40 border-t border-[rgba(196,163,90,0.08)]">
          <div className="px-8 pt-8 pb-8 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { scrollTo(item.href, item.external); setMobileOpen(false) }}
                className={`block w-full text-left nav-link py-3 ${
                  activeSection === item.id && !item.external ? 'active' : ''
                }`}
              >
                {item.label}
                {item.external && <span className="ml-2 opacity-40 text-[0.55rem]">↗</span>}
              </button>
            ))}
            <div className="pt-6 mt-6 border-t border-[rgba(196,163,90,0.08)]">
              <button
                onClick={() => { scrollTo('#steam-cta'); setMobileOpen(false) }}
                className="opacity-85 hover:opacity-100 transition-opacity duration-200"
                aria-label="Wishlist on Steam"
              >
                <Image
                  src="/steam wishlist bw3.png"
                  alt="Wishlist on Steam"
                  width={240}
                  height={96}
                  className="w-auto h-14"
                  quality={90}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
