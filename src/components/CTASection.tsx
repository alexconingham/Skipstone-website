'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

export default function CTASection({ className = '' }: { className?: string }) {
  const [email, setEmail]           = useState('')
  const [isSubscribed, setSubscribed] = useState(false)
  const [isLoading, setLoading]     = useState(false)
  const [error, setError]           = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isLoading) return
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) { setSubscribed(true); setEmail('') }
      else setError(data.error || 'Something went wrong. Please try again.')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const mono: React.CSSProperties = { fontFamily: 'VT323, Courier New, monospace' }
  const display: React.CSSProperties = { fontFamily: 'Bebas Neue, Impact, sans-serif' }
  const green = '#00ff41'

  return (
    <section
      id="steam-cta"
      className={`relative overflow-hidden ${className}`}
      style={{ background: '#080808' }}
      aria-labelledby="cta-heading"
    >
      {/* Background image with heavy vhs scrim */}
      <div className="absolute inset-0">
        <Image
          src="/backgrounds/alt_the_void_bg.PNG"
          alt=""
          fill
          style={{ objectFit: 'cover', objectPosition: 'center', filter: 'grayscale(0.8) brightness(0.3)' }}
          quality={70}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(8,8,8,0.82)' }} />
        <div
          className="absolute inset-0"
          style={{ background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 1px, transparent 1px, transparent 3px)' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">

        {/* Stats — VHS spec stickers */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            borderTop: '1px solid rgba(0,255,65,0.12)',
            borderBottom: '1px solid rgba(0,255,65,0.12)',
            marginBottom: '4rem',
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px 0px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.18 } } }}
        >
          {[
            { num: '1000+', label: 'WISHLISTS' },
            { num: '50+',   label: 'HRS OF CONTENT' },
            { num: '∞',     label: 'REPLAYABILITY' },
          ].map((s, i) => (
            <motion.div
              key={i}
              className="vhs-stat"
              style={{ borderRight: i < 2 ? '1px solid rgba(0,255,65,0.1)' : 'none' }}
              variants={{
                hidden:  { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <span className="vhs-stat__num">{s.num}</span>
              <span className="vhs-stat__label">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Main CTA */}
        <div className="text-center">
          <AnimatedSection animation="fadeIn" delay={300}>
            <div style={{ ...mono, fontSize: '0.8rem', letterSpacing: '0.25em', color: 'rgba(0,255,65,0.5)', marginBottom: '1rem' }}>
              ■ PRESS PLAY TO BEGIN
            </div>
            <h2
              id="cta-heading"
              className="vhs-glitch"
              style={{
                ...display,
                fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                letterSpacing: '0.06em',
                lineHeight: 1.0,
                color: '#e8e8e8',
                marginBottom: '1.5rem',
              }}
            >
              BEGIN YOUR JOURNEY
            </h2>
            <p style={{ ...mono, fontSize: '1rem', color: 'rgba(232,232,232,0.5)', maxWidth: '480px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
              Wishlist Remember to Die on Steam and be the first to experience this haunting tactical roguelike.
            </p>
          </AnimatedSection>

          {/* Steam button */}
          <AnimatedSection animation="slideUp" delay={500}>
            <div style={{ marginBottom: '3.5rem' }}>
              <a
                href="https://store.steampowered.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-block', opacity: 0.9 }}
                className="hover:opacity-100 transition-opacity duration-200 hover:scale-[1.03]"
                aria-label="Wishlist Remember to Die on Steam"
              >
                <Image
                  src="/steam wishlist bw3.png"
                  alt="Wishlist on Steam"
                  width={360}
                  height={144}
                  className="w-auto h-20 md:h-24"
                  quality={90}
                />
              </a>
            </div>
          </AnimatedSection>

          {/* Newsletter — VHS terminal style */}
          <AnimatedSection animation="fadeIn" delay={700}>
            <div
              style={{
                maxWidth: '380px',
                margin: '0 auto',
                border: '1px solid rgba(0,255,65,0.18)',
                background: 'rgba(6,13,6,0.9)',
                padding: '1.5rem',
              }}
            >
              <div style={{ ...mono, fontSize: '0.75rem', color: green, letterSpacing: '0.2em', marginBottom: '0.35rem' }}>
                ■ STAY UPDATED
              </div>
              <p style={{ ...mono, fontSize: '0.85rem', color: 'rgba(0,255,65,0.4)', marginBottom: '1rem', lineHeight: 1.5 }}>
                Get exclusive updates, behind-the-scenes content, and early access opportunities.
              </p>

              {!isSubscribed ? (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="USER@EMAIL.COM"
                    required
                    disabled={isLoading}
                    style={{
                      ...mono,
                      fontSize: '0.9rem',
                      letterSpacing: '0.1em',
                      background: 'rgba(0,255,65,0.04)',
                      border: '1px solid rgba(0,255,65,0.2)',
                      color: green,
                      padding: '8px 12px',
                      outline: 'none',
                      width: '100%',
                    }}
                  />
                  {error && (
                    <p style={{ ...mono, fontSize: '0.8rem', color: '#ff2200', letterSpacing: '0.1em' }}>{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={isLoading || !email}
                    style={{
                      ...mono,
                      fontSize: '0.85rem',
                      letterSpacing: '0.2em',
                      background: isLoading ? 'rgba(0,255,65,0.05)' : 'rgba(0,255,65,0.1)',
                      border: '1px solid rgba(0,255,65,0.3)',
                      color: isLoading ? 'rgba(0,255,65,0.3)' : green,
                      padding: '8px 12px',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s ease',
                      width: '100%',
                    }}
                  >
                    {isLoading ? 'LOADING...' : '► SUBSCRIBE'}
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <p style={{ ...mono, fontSize: '1rem', color: green, letterSpacing: '0.15em', textShadow: `0 0 10px ${green}` }}>
                    ✓ SUBSCRIBED
                  </p>
                  <p style={{ ...mono, fontSize: '0.8rem', color: 'rgba(0,255,65,0.4)', marginTop: '4px' }}>
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
