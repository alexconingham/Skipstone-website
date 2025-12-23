'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface NavigationProps {
  className?: string
}

export default function Navigation({ className = '' }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const navItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'memories', label: 'Memories', href: '#memories' },
    { id: 'enemies', label: 'Enemies', href: '#enemies' },
    { id: 'arsenal', label: 'Arsenal', href: '#arsenal' },
    { id: 'mementos', label: 'Mementos', href: '#mementos' },
    { id: 'steam', label: 'Wishlist', href: '#steam-cta' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.id)
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const smoothScrollTo = (href: string) => {
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${className}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div 
        className={`transition-all duration-500 ${
          isScrolled 
            ? 'bg-black/80 backdrop-blur-lg border-b border-white/10 shadow-2xl' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={() => smoothScrollTo('#home')}
                className="flex items-center space-x-2 group transition-transform duration-300 hover:scale-105"
                aria-label="Remember to Die - Home"
              >
                <Image
                  src="/Skipstone_logo.png"
                  alt="Skipstone Studios"
                  width={120}
                  height={24}
                  className="h-8 w-auto brightness-100 group-hover:brightness-110 transition-all duration-300"
                  priority
                />
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => smoothScrollTo(item.href)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group ${
                      activeSection === item.id
                        ? 'text-cyan-300 bg-cyan-500/20'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    {item.label}
                    {/* Active indicator */}
                    <div 
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-cyan-400 transition-all duration-300 ${
                        activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Steam Wishlist CTA */}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => smoothScrollTo('#steam-cta')}
                className="group relative inline-block transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
                aria-label="Wishlist on Steam"
              >
                <Image
                  src="/steam wishlist bw3.png"
                  alt="Wishlist on Steam"
                  width={200}
                  height={80}
                  className="w-auto h-10 md:h-12 group-hover:brightness-110 transition-all duration-300"
                  quality={90}
                />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <MobileMenu 
                navItems={navItems} 
                activeSection={activeSection}
                onNavigate={smoothScrollTo}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

// Mobile Menu Component
function MobileMenu({ 
  navItems, 
  activeSection, 
  onNavigate 
}: { 
  navItems: any[], 
  activeSection: string,
  onNavigate: (href: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-300"
        aria-expanded={isOpen}
        aria-label="Toggle mobile menu"
      >
        <svg
          className={`h-6 w-6 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-16 bg-black/95 backdrop-blur-lg md:hidden z-40">
          <div className="px-4 pt-6 pb-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.href)
                  setIsOpen(false)
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-cyan-300 bg-cyan-500/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile Steam CTA */}
            <div className="pt-4 mt-4 border-t border-white/10">
              <button
                onClick={() => {
                  onNavigate('#steam-cta')
                  setIsOpen(false)
                }}
                className="group w-full flex justify-center transition-all duration-300 transform hover:scale-105"
                aria-label="Wishlist on Steam"
              >
                <Image
                  src="/steam wishlist bw3.png"
                  alt="Wishlist on Steam"
                  width={300}
                  height={120}
                  className="w-auto h-16 group-hover:brightness-110 transition-all duration-300"
                  quality={90}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 