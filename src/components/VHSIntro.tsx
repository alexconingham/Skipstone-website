'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function VHSIntro() {
  const [show, setShow] = useState(false)
  const [phase, setPhase] = useState(0) // 0=black 1=label 2=title 3=bar 4=exit

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('rtd-intro-v2')) return
    setShow(true)
    const t1 = setTimeout(() => setPhase(1), 350)
    const t2 = setTimeout(() => setPhase(2), 1100)
    const t3 = setTimeout(() => setPhase(3), 1700)
    const t4 = setTimeout(() => setPhase(4), 2600)
    const t5 = setTimeout(() => {
      setShow(false)
      sessionStorage.setItem('rtd-intro-v2', '1')
    }, 3200)
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="vhs-intro"
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#000',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Noise layer */}
          <div
            aria-hidden
            style={{
              position: 'absolute', inset: 0,
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
              backgroundSize: '200px 200px',
              opacity: 0.04,
              animation: 'noise-shift 0.08s steps(1) infinite',
              mixBlendMode: 'screen',
              pointerEvents: 'none',
            }}
          />

          {/* VHS tracking bar — top */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={phase >= 1 ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: '5px',
              background: 'linear-gradient(90deg, transparent 0%, #00ff41 15%, #00e5ff 40%, #ff00ff 65%, #00ff41 85%, transparent 100%)',
              transformOrigin: 'left',
            }}
          />

          {/* VHS tracking bar — bottom */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={phase >= 1 ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, transparent 0%, #00ff41 20%, #00e5ff 50%, #00ff41 80%, transparent 100%)',
              transformOrigin: 'left',
            }}
          />

          {/* Content */}
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>

            {/* Studio label */}
            <AnimatePresence>
              {phase >= 1 && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: 'VT323, monospace',
                    fontSize: '0.85rem',
                    letterSpacing: '0.4em',
                    color: 'rgba(0,255,65,0.55)',
                    marginBottom: '1.5rem',
                    textTransform: 'uppercase',
                  }}
                >
                  Skipstone Studios Presents
                </motion.p>
              )}
            </AnimatePresence>

            {/* Game title */}
            <AnimatePresence>
              {phase >= 2 && (
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: "'Bebas Neue', Impact, sans-serif",
                    fontSize: 'clamp(3.5rem, 12vw, 8rem)',
                    letterSpacing: '0.08em',
                    color: '#e8e8e8',
                    lineHeight: 1,
                    textShadow: '3px 0 rgba(255,0,255,0.7), -3px 0 rgba(0,229,255,0.7)',
                    animation: 'chroma-burst 9s step-end infinite',
                    margin: '0 0 2rem',
                  }}
                >
                  Remember to Die
                </motion.h1>
              )}
            </AnimatePresence>

            {/* Progress bar */}
            <AnimatePresence>
              {phase >= 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: '240px',
                    height: '2px',
                    background: 'rgba(0,255,65,0.12)',
                    margin: '0 auto',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(90deg, #00ff41, #00e5ff)',
                      transformOrigin: 'left',
                      boxShadow: '0 0 8px rgba(0,255,65,0.6)',
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Static sweep */}
          <div className="vhs-static-sweep" />

          {/* Corner brackets */}
          {[
            { top: 24, left: 24, borderTop: true, borderLeft: true },
            { top: 24, right: 24, borderTop: true, borderRight: true },
            { bottom: 24, left: 24, borderBottom: true, borderLeft: true },
            { bottom: 24, right: 24, borderBottom: true, borderRight: true },
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={phase >= 1 ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                width: 24, height: 24,
                ...pos,
                borderTop: pos.borderTop ? '2px solid rgba(0,255,65,0.5)' : undefined,
                borderBottom: pos.borderBottom ? '2px solid rgba(0,255,65,0.5)' : undefined,
                borderLeft: pos.borderLeft ? '2px solid rgba(0,255,65,0.5)' : undefined,
                borderRight: pos.borderRight ? '2px solid rgba(0,255,65,0.5)' : undefined,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
