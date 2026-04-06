'use client'

import { motion } from 'framer-motion'

const tracks = [
  {
    num:   '01',
    label: 'TRACK 01',
    title: 'TACTICAL DICE COMBAT',
    body:  'Strategic dice-based battles with endless depth.',
    code:  'T-01/SP',
  },
  {
    num:   '02',
    label: 'TRACK 02',
    title: 'MEMORY FRAGMENTS',
    body:  'Unlock haunting memories that shape your destiny.',
    code:  'T-02/SP',
  },
  {
    num:   '03',
    label: 'TRACK 03',
    title: 'INFINITE REPLAYABILITY',
    body:  'Every run tells a different story.',
    code:  'T-03/SP',
  },
]

export default function FeatureCallouts() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-16"
      style={{ border: '1px solid rgba(0,255,65,0.12)' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px 0px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.14 } },
      }}
    >
      {tracks.map((t, i) => (
        <motion.div
          key={t.num}
          style={{
            position: 'relative',
            background: '#070707',
            borderRight: i < 2 ? '1px solid rgba(0,255,65,0.12)' : 'none',
            overflow: 'hidden',
          }}
          variants={{
            hidden:  { opacity: 0, y: 36 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          whileHover="hover"
        >
          {/* Left accent stripe */}
          <motion.div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '3px',
              background: 'linear-gradient(to bottom, #00ff41 0%, rgba(0,255,65,0.3) 100%)',
            }}
            variants={{
              hover: { boxShadow: '0 0 12px rgba(0,255,65,0.6)' },
            }}
          />

          {/* Header strip */}
          <div
            style={{
              borderBottom: '1px solid rgba(0,255,65,0.1)',
              background: 'rgba(0,255,65,0.04)',
              padding: '7px 14px 7px 18px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.22em',
                color: 'rgba(0,255,65,0.55)',
              }}
            >
              {t.label}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                color: 'rgba(0,255,65,0.22)',
              }}
            >
              {t.code}
            </span>
          </div>

          {/* Body */}
          <div style={{ padding: '1.4rem 1.4rem 1.6rem 1.8rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.55rem',
                letterSpacing: '0.07em',
                color: '#e8e8e8',
                display: 'block',
                marginBottom: '0.7rem',
                lineHeight: 1.1,
              }}
            >
              {t.title}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1rem',
                color: 'rgba(232,232,232,0.5)',
                lineHeight: 1.55,
                display: 'block',
              }}
            >
              {t.body}
            </span>
          </div>

          {/* Bottom-right corner reticle */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 16,
              height: 16,
              borderBottom: '2px solid rgba(0,255,65,0.35)',
              borderRight: '2px solid rgba(0,255,65,0.35)',
              pointerEvents: 'none',
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
