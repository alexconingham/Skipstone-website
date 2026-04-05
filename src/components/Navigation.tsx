'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'

interface NavigationProps {
  className?: string
}

export default function Navigation({ className = '' }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const pathname = usePathname()
  const router = useRouter()
  const isHomepage = pathname === '/'

  const navItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'trailer', label: 'Trailer', href: '#trailer' },
    { id: 'memories', label: 'Memories', href: '#memories' },
    { id: 'enemies', label: 'Enemies', href: '#enemies' },
    { id: 'arsenal', label: 'Arsenal', href: '#arsenal' },
    { id: 'mementos', label: 'Mementos', href: '#mementos' },
    { id: 'blog', label: 'Devlog', href: '/blog', route: true },
    { id: 'steam', label: 'Wishlist', href: '#steam-cta' },
    { id: 'guide', label: 'Guide', href: '/guide', route: true },
    { id: 'studio', label: 'Skipstone Studio', href: 'https://skipstone.co.nz', external: true }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = navItems.filter(i => !i.external).map(i => i.id)
      for (const section of sections) {
        const el = document.getElementById(section === 'steam' ? 'steam-cta' : section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const smoothScrollTo = (href: string, isExternal?: boolean, isRoute?: boolean) => {
    if (isExternal || href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer')
      return
    }
    if (isRoute) {
      router.push(href)
      return
    }
    // Anchor link — if not on homepage, navigate there first
    if (!isHomepage) {
      router.push(`/${href}`)
      return
    }
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/40'
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
                  className="h-8 w-auto brightness-100 group-hover:brightness-125 transition-all duration-300"
                  priority
                />
              </button>
            </div>

            {/* Desktop nav pills */}
            <div className="hidden md:flex items-baseline space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => smoothScrollTo(item.href, item.external, item.route)}
                  className={`nav-pill ${
                    (item.route && pathname.startsWith(item.href)) ||
                    (activeSection === item.id && !item.external && !item.route)
                      ? 'active'
                      : ''
                  }`}
                  aria-current={
                    (item.route && pathname.startsWith(item.href)) ||
                    (activeSection === item.id && !item.external && !item.route)
                      ? 'page'
                      : undefined
                  }
                >
                  {item.label}
                  {item.external && <span className="ml-1 text-xs opacity-40">↗</span>}
                </button>
              ))}
            </div>

            {/* Steam Wishlist CTA */}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => smoothScrollTo('#steam-cta')}
                className="group relative inline-block transition-all duration-300 transform hover:scale-105"
                aria-label="Wishlist on Steam"
              >
                <Image
                  src="/steam wishlist bw3.png"
                  alt="Wishlist on Steam"
                  width={200}
                  height={80}
                  className="w-auto h-10 md:h-12 group-hover:brightness-125 transition-all duration-300"
                  quality={90}
                />
              </button>
            </div>

            {/* Mobile menu */}
            <div className="md:hidden">
              <MobileMenu
                navItems={navItems}
                activeSection={activeSection}
                pathname={pathname}
                onNavigate={smoothScrollTo}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

function MobileMenu({
  navItems,
  activeSection,
  pathname,
  onNavigate
}: {
  navItems: any[]
  activeSection: string
  pathname: string
  onNavigate: (href: string, isExternal?: boolean, isRoute?: boolean) => void
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

      {isOpen && (
        <div className="fixed inset-0 top-16 bg-black/95 backdrop-blur-xl md:hidden z-40">
          <div className="px-4 pt-6 pb-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.href, item.external, item.route)
                  setIsOpen(false)
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                  (item.route && pathname.startsWith(item.href)) ||
                  (activeSection === item.id && !item.external && !item.route)
                    ? 'text-cyan-300 bg-cyan-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
                {item.external && <span className="ml-2 text-sm opacity-40">↗</span>}
              </button>
            ))}

            <div className="pt-4 mt-4 border-t border-white/[0.06]">
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
