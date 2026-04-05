'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'

const PAGE_LINKS = [
  { id: 'guide', label: 'Guide', href: '/guide' },
  { id: 'blog', label: 'Devlog', href: '/blog' },
]

const SECTION_LINKS = [
  { id: 'home', label: 'Home', href: '#home', key: '1' },
  { id: 'trailer', label: 'Trailer', href: '#trailer', key: '2' },
  { id: 'memories', label: 'Memories', href: '#memories', key: '3' },
  { id: 'enemies', label: 'Enemies', href: '#enemies', key: '4' },
  { id: 'arsenal', label: 'Arsenal', href: '#arsenal', key: '5' },
  { id: 'mementos', label: 'Mementos', href: '#mementos', key: '6' },
  { id: 'steam', label: 'Wishlist on Steam', href: '#steam-cta', key: '7' },
]

const EXTERNAL_LINKS = [
  { id: 'studio', label: 'Skipstone Studio', href: 'https://skipstone.co.nz' },
]

export default function Navigation({ className = '' }: { className?: string }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const isHomepage = pathname === '/'

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50)
      if (!isHomepage) return
      for (const s of SECTION_LINKS) {
        const el = document.getElementById(s.href.replace('#', ''))
        if (el) {
          const r = el.getBoundingClientRect()
          if (r.top <= 120 && r.bottom >= 120) {
            setActiveSection(s.id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHomepage])

  // Close on outside click
  useEffect(() => {
    if (!panelOpen) return
    const onClick = (e: MouseEvent) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) {
        setPanelOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [panelOpen])

  // Keyboard: Escape to close, number keys to navigate
  useEffect(() => {
    if (!panelOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setPanelOpen(false); return }
      const match = SECTION_LINKS.find(s => s.key === e.key)
      if (match) {
        navigateTo(match.href)
        setPanelOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panelOpen])

  const navigateTo = useCallback((href: string, isExternal?: boolean) => {
    if (isExternal || href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer')
      return
    }
    if (href.startsWith('/')) { router.push(href); return }
    if (!isHomepage) { router.push(`/${href}`); return }
    const el = document.getElementById(href.replace('#', ''))
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [isHomepage, router])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${className}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className={`transition-all duration-500 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/40'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ── Left: Logo + Page links ── */}
            <div className="flex items-center gap-1 sm:gap-3">
              <button
                onClick={() => navigateTo('#home')}
                className="flex items-center group transition-transform duration-300 hover:scale-105 mr-1 sm:mr-3"
                aria-label="Home"
              >
                <Image
                  src="/Skipstone_logo.png"
                  alt="Skipstone Studios"
                  width={120}
                  height={24}
                  className="h-7 sm:h-8 w-auto brightness-100 group-hover:brightness-125 transition-all duration-300"
                  priority
                />
              </button>

              {PAGE_LINKS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => navigateTo(p.href)}
                  className={`nav-pill hidden sm:inline-flex ${pathname.startsWith(p.href) ? 'active' : ''}`}
                  aria-current={pathname.startsWith(p.href) ? 'page' : undefined}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* ── Center: Terminal trigger ── */}
            <div className="relative">
              <button
                ref={triggerRef}
                onClick={() => setPanelOpen(v => !v)}
                className={`cmd-trigger ${panelOpen ? 'active' : ''}`}
                aria-expanded={panelOpen}
                aria-haspopup="true"
                aria-label="Navigate sections"
              >
                <span className="cmd-trigger-prompt" aria-hidden="true">&gt;_</span>
                <span className="hidden sm:inline">Navigate</span>
                <span className="sm:hidden">Menu</span>
                <kbd className="cmd-trigger-kbd hidden md:inline-flex">
                  <span className="text-[0.5rem]">ESC</span>
                </kbd>
              </button>

              {/* ── Command palette dropdown ── */}
              {panelOpen && (
                <div
                  ref={panelRef}
                  className="cmd-panel"
                  role="menu"
                >
                  <div className="cmd-panel-scanline" aria-hidden="true" />

                  {/* Terminal chrome */}
                  <div className="cmd-panel-chrome">
                    <span className="terminal-dot dot-red" />
                    <span className="terminal-dot dot-yellow" />
                    <span className="terminal-dot dot-green" />
                    <span className="cmd-panel-title">NAV.sh</span>
                  </div>

                  {/* Section links */}
                  <div className="cmd-panel-body">
                    {isHomepage && (
                      <div className="cmd-panel-group">
                        <div className="cmd-panel-group-label">Sections</div>
                        {SECTION_LINKS.map((item, i) => (
                          <button
                            key={item.id}
                            onClick={() => { navigateTo(item.href); setPanelOpen(false) }}
                            className={`cmd-panel-item ${activeSection === item.id ? 'active' : ''}`}
                            style={{ animationDelay: `${i * 40}ms` }}
                            role="menuitem"
                          >
                            <span className="cmd-panel-item-index">{item.key}</span>
                            <span className="cmd-panel-item-prompt" aria-hidden="true">&gt;</span>
                            <span className="cmd-panel-item-label">{item.label}</span>
                            {activeSection === item.id && (
                              <span className="cmd-panel-item-active" aria-hidden="true">●</span>
                            )}
                            <kbd className="cmd-panel-item-key">{item.key}</kbd>
                          </button>
                        ))}
                      </div>
                    )}

                    {!isHomepage && (
                      <div className="cmd-panel-group">
                        <div className="cmd-panel-group-label">Navigation</div>
                        <button
                          onClick={() => { navigateTo('/'); setPanelOpen(false) }}
                          className="cmd-panel-item"
                          style={{ animationDelay: '0ms' }}
                          role="menuitem"
                        >
                          <span className="cmd-panel-item-index">0</span>
                          <span className="cmd-panel-item-prompt" aria-hidden="true">&gt;</span>
                          <span className="cmd-panel-item-label">← Back to Home</span>
                        </button>
                      </div>
                    )}

                    {/* Pages (visible on mobile where pills are hidden) */}
                    <div className="cmd-panel-group sm:hidden">
                      <div className="cmd-panel-group-label">Pages</div>
                      {PAGE_LINKS.map((item, i) => (
                        <button
                          key={item.id}
                          onClick={() => { navigateTo(item.href); setPanelOpen(false) }}
                          className={`cmd-panel-item ${pathname.startsWith(item.href) ? 'active' : ''}`}
                          style={{ animationDelay: `${(SECTION_LINKS.length + i) * 40}ms` }}
                          role="menuitem"
                        >
                          <span className="cmd-panel-item-prompt" aria-hidden="true">&gt;</span>
                          <span className="cmd-panel-item-label">{item.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* External */}
                    <div className="cmd-panel-group">
                      <div className="cmd-panel-group-label">External</div>
                      {EXTERNAL_LINKS.map((item, i) => (
                        <button
                          key={item.id}
                          onClick={() => { navigateTo(item.href, true); setPanelOpen(false) }}
                          className="cmd-panel-item"
                          style={{ animationDelay: `${(SECTION_LINKS.length + PAGE_LINKS.length + i) * 40}ms` }}
                          role="menuitem"
                        >
                          <span className="cmd-panel-item-prompt" aria-hidden="true">&gt;</span>
                          <span className="cmd-panel-item-label">{item.label}</span>
                          <span className="text-[0.6rem] text-gray-600 ml-auto">↗</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── Right: Steam wishlist ── */}
            <div className="hidden sm:flex items-center">
              <button
                onClick={() => navigateTo('#steam-cta')}
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
          </div>
        </div>
      </div>
    </nav>
  )
}
