'use client'

import { useState } from 'react'
import Image from 'next/image'
import AnimatedSection from './AnimatedSection'

interface CTASectionProps {
  className?: string
}

export default function CTASection({ className = '' }: CTASectionProps) {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isLoading) return
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      if (response.ok) {
        setIsSubscribed(true)
        setEmail('')
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section
      id="steam-cta"
      className={`relative overflow-hidden ${className}`}
      aria-labelledby="cta-heading"
    >
      {/* Background — world art behind dark scrim */}
      <div className="absolute inset-0">
        <Image
          src="/backgrounds/alt_the_void_bg.PNG"
          alt=""
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          quality={80}
        />
        <div className="absolute inset-0 bg-[#0e0c0c]/88" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0c0c] via-transparent to-[#0e0c0c]" />
      </div>

      <div className="scanlines absolute inset-0 pointer-events-none z-[2]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-28">

        {/* Stats — earned, not boastful */}
        <AnimatedSection animation="fadeIn" delay={100}>
          <div className="grid grid-cols-3 gap-0 border-t border-b border-[rgba(196,163,90,0.1)] mb-20 divide-x divide-[rgba(196,163,90,0.08)]">
            <div className="stat-callout">
              <span className="stat-callout__number">1000<span style={{ fontSize: '0.45em', verticalAlign: 'super', opacity: 0.5 }}>+</span></span>
              <span className="stat-callout__label">Wishlists & counting</span>
            </div>
            <div className="stat-callout">
              <span className="stat-callout__number">50<span style={{ fontSize: '0.45em', verticalAlign: 'super', opacity: 0.5 }}>+</span></span>
              <span className="stat-callout__label">Hours of content</span>
            </div>
            <div className="stat-callout">
              <span className="stat-callout__number" style={{ fontStyle: 'italic' }}>∞</span>
              <span className="stat-callout__label">Replayability</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Main CTA */}
        <div className="text-center">
          <AnimatedSection animation="fadeIn" delay={300}>
            <span className="chapter-label">Join the Wishlist</span>
            <h2
              id="cta-heading"
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#e8dcc8] leading-[1.05] mb-6"
              style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
            >
              Begin Your Journey
            </h2>
            <div className="section-rule" />
            <p
              className="text-[#7a6a58] text-base max-w-xl mx-auto leading-relaxed mb-12 mt-6"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Wishlist Remember to Die on Steam and be the first to experience this haunting tactical roguelike.
            </p>
          </AnimatedSection>

          {/* Steam wishlist button */}
          <AnimatedSection animation="slideUp" delay={500}>
            <div className="mb-16">
              <a
                href="https://store.steampowered.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-[1.04]"
                aria-label="Wishlist Remember to Die on Steam"
              >
                <Image
                  src="/steam wishlist bw3.png"
                  alt="Wishlist on Steam"
                  width={380}
                  height={152}
                  className="w-auto h-20 md:h-24"
                  quality={90}
                />
              </a>
            </div>
          </AnimatedSection>

          {/* Newsletter */}
          <AnimatedSection animation="fadeIn" delay={700}>
            <div
              className="max-w-md mx-auto border border-[rgba(196,163,90,0.1)] p-8"
              style={{ background: 'rgba(14,12,12,0.7)' }}
            >
              <h3
                className="text-xl font-bold text-[#c9b99a] mb-2"
                style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
              >
                Stay Updated
              </h3>
              <p
                className="text-[#4a3e35] text-sm mb-6 leading-relaxed"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Get exclusive updates, behind-the-scenes content, and early access opportunities.
              </p>

              {!isSubscribed ? (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-transparent border border-[rgba(196,163,90,0.15)] text-[#c9b99a] placeholder-[#4a3e35] focus:outline-none focus:border-[rgba(196,163,90,0.4)] transition-colors duration-200 text-sm"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
                    required
                    disabled={isLoading}
                  />
                  {error && (
                    <p className="text-[#7a1c1c] text-xs" style={{ fontFamily: 'var(--font-body)' }}>
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={isLoading || !email}
                    className="w-full py-3 border border-[rgba(196,163,90,0.25)] text-[#c4a35a] text-xs tracking-[0.2em] uppercase hover:border-[rgba(196,163,90,0.5)] hover:bg-[rgba(196,163,90,0.05)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
                  >
                    {isLoading ? 'Subscribing…' : 'Subscribe for Updates'}
                  </button>
                </form>
              ) : (
                <div className="py-8 text-center">
                  <p
                    className="text-[#e8dcc8] text-xl font-bold mb-2"
                    style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
                  >
                    Thank You!
                  </p>
                  <p className="text-[#4a3e35] text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                    You're now subscribed to our updates.
                  </p>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
