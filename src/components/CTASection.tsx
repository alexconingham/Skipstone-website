'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

export default function CTASection({ className = '' }: { className?: string }) {
  const [email, setEmail]             = useState('')
  const [isSubscribed, setSubscribed] = useState(false)
  const [isLoading, setLoading]       = useState(false)
  const [error, setError]             = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isLoading) return
    setLoading(true); setError('')
    try {
      const res  = await fetch('/api/subscribe', {
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

  const body: React.CSSProperties    = { fontFamily: 'var(--font-body)', fontWeight: 300 }
  const display: React.CSSProperties = { fontFamily: 'var(--font-display)' }
  const mono: React.CSSProperties    = { fontFamily: 'var(--font-mono)' }
  const green = '#00ff41'

  return (
    <section
      id="steam-cta"
      className={`relative overflow-hidden ${className}`}
      style={{ background: '#080808' }}
      aria-labelledby="cta-heading"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/backgrounds/alt_the_void_bg.PNG"
          alt=""
          fill
          style={{ objectFit: 'cover', objectPosition: 'center', filter: 'grayscale(0.9) brightness(0.2)' }}
          quality={70}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(8,8,8,0.88)' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">

        {/* Stats grid — cleaner, editorial */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            marginBottom: '5rem',
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px 0px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {[
            { num: '32',  label: 'Dice' },
            { num: '117', label: 'Mementos' },
            { num: '∞',   label: 'Replayability' },
          ].map((s, i) => (
            <motion.div
              key={i}
              style={{
                textAlign: 'center',
                padding: '2rem 1rem',
                borderRight: i < 2 ? '1px solid rgba(0,255,65,0.08)' : 'none',
                borderTop: '1px solid rgba(0,255,65,0.08)',
                borderBottom: '1px solid rgba(0,255,65,0.08)',
                position: 'relative',
              }}
              variants={{
                hidden:  { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              {/* Corner dots */}
              <span style={{ position: 'absolute', top: -1, left: -1, width: 3, height: 3, background: 'rgba(0,255,65,0.3)' }} />
              {i === 2 && <span style={{ position: 'absolute', top: -1, right: -1, width: 3, height: 3, background: 'rgba(0,255,65,0.3)' }} />}
              {i === 0 && <span style={{ position: 'absolute', bottom: -1, left: -1, width: 3, height: 3, background: 'rgba(0,255,65,0.3)' }} />}
              {i === 2 && <span style={{ position: 'absolute', bottom: -1, right: -1, width: 3, height: 3, background: 'rgba(0,255,65,0.3)' }} />}

              <span style={{
                ...display,
                fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                color: green,
                textShadow: '0 0 24px rgba(0,255,65,0.35)',
                display: 'block',
                lineHeight: 1,
                letterSpacing: '0.04em',
              }}>
                {s.num}
              </span>
              <span style={{
                ...body,
                fontSize: '0.75rem',
                fontWeight: 400,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(232,232,232,0.35)',
                display: 'block',
                marginTop: '0.6rem',
              }}>
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Main CTA */}
        <div className="text-center">
          <AnimatedSection animation="clipReveal" delay={200}>
            <h2
              id="cta-heading"
              className="vhs-glitch"
              style={{
                ...display,
                fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                letterSpacing: '0.06em',
                lineHeight: 1.0,
                color: '#e8e8e8',
                marginBottom: '1.25rem',
              }}
            >
              BEGIN YOUR JOURNEY
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="fadeIn" delay={400}>
            <p style={{ ...body, fontSize: '1rem', color: 'rgba(232,232,232,0.45)', maxWidth: '440px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
              Wishlist Remember to Die on Steam and be the first to experience this haunting tactical roguelike.
            </p>
          </AnimatedSection>

          {/* Steam button */}
          <AnimatedSection animation="slideUp" delay={500}>
            <div style={{ marginBottom: '3.5rem' }}>
              <a
                href="https://store.steampowered.com/app/4340400/Remember_to_Die/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-block', opacity: 0.85 }}
                className="hover:opacity-100 transition-all duration-200 hover:scale-[1.03]"
                aria-label="Wishlist Remember to Die on Steam"
              >
                <Image
                  src="/steam wishlist bw3.png"
                  alt="Wishlist on Steam"
                  width={520}
                  height={208}
                  className="w-auto h-28 md:h-32"
                  quality={90}
                />
              </a>
            </div>
          </AnimatedSection>

          {/* Newsletter */}
          <AnimatedSection animation="fadeIn" delay={700}>
            <div
              style={{
                maxWidth: '360px',
                margin: '0 auto',
                border: '1px solid rgba(0,255,65,0.12)',
                background: 'rgba(6,10,6,0.95)',
                padding: '1.75rem',
                backdropFilter: 'blur(8px)',
              }}
            >
              <p style={{ ...display, fontSize: '1.1rem', letterSpacing: '0.12em', color: 'rgba(232,232,232,0.8)', marginBottom: '0.3rem' }}>
                STAY IN THE LOOP
              </p>
              <p style={{ ...body, fontSize: '0.8rem', color: 'rgba(232,232,232,0.35)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                Exclusive updates &amp; early access opportunities.
              </p>

              {!isSubscribed ? (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    disabled={isLoading}
                    style={{
                      ...body,
                      fontSize: '0.9rem',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(0,255,65,0.18)',
                      color: 'rgba(232,232,232,0.8)',
                      padding: '9px 14px',
                      outline: 'none',
                      width: '100%',
                      transition: 'border-color 0.2s ease',
                    }}
                    onFocus={e => (e.target.style.borderColor = 'rgba(0,255,65,0.45)')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(0,255,65,0.18)')}
                  />
                  {error && (
                    <p style={{ ...body, fontSize: '0.8rem', color: '#ff2200', letterSpacing: '0.05em' }}>{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={isLoading || !email}
                    style={{
                      ...display,
                      fontSize: '0.95rem',
                      letterSpacing: '0.18em',
                      background: isLoading ? 'rgba(0,255,65,0.04)' : 'rgba(0,255,65,0.08)',
                      border: '1px solid rgba(0,255,65,0.25)',
                      color: isLoading ? 'rgba(0,255,65,0.3)' : green,
                      padding: '9px 12px',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s ease',
                      width: '100%',
                    }}
                    onMouseEnter={e => { if (!isLoading && email) (e.currentTarget.style.background = 'rgba(0,255,65,0.14)') }}
                    onMouseLeave={e => { if (!isLoading) (e.currentTarget.style.background = 'rgba(0,255,65,0.08)') }}
                  >
                    {isLoading ? 'SENDING...' : 'SUBSCRIBE'}
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <p style={{ ...display, fontSize: '1.2rem', letterSpacing: '0.15em', color: green, textShadow: `0 0 12px ${green}` }}>
                    SUBSCRIBED
                  </p>
                  <p style={{ ...body, fontSize: '0.8rem', color: 'rgba(232,232,232,0.35)', marginTop: '6px' }}>
                    You'll be first to know.
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
