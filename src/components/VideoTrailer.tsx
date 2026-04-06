'use client'

import { useState } from 'react'

interface VideoTrailerProps {
  src: string
  className?: string
}

export default function VideoTrailer({ src, className = '' }: VideoTrailerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div
      className={`relative ${className}`}
      style={{
        background: '#000',
        boxShadow: '0 0 0 1px rgba(0,255,65,0.18), 0 0 40px rgba(0,0,0,0.8)',
      }}
    >
      {/* ── Outer VHS border frame ── */}
      {/* Top edge with tracking lines */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '6px',
          background: [
            'linear-gradient(to right,',
            '  transparent 0%,',
            '  rgba(0,255,65,0.7) 15%,',
            '  rgba(0,229,255,0.5) 35%,',
            '  rgba(255,0,255,0.4) 55%,',
            '  rgba(0,255,65,0.6) 80%,',
            '  transparent 100%',
            ')',
          ].join(''),
          zIndex: 20,
          pointerEvents: 'none',
        }}
      />
      {/* Thin noise line just below tracking */}
      <div
        style={{
          position: 'absolute',
          top: '6px', left: 0, right: 0,
          height: '1px',
          background: 'rgba(255,255,255,0.06)',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      />

      {/* Bottom tracking bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '4px',
          background: [
            'linear-gradient(to right,',
            '  transparent 0%,',
            '  rgba(0,255,65,0.5) 20%,',
            '  rgba(0,229,255,0.35) 60%,',
            '  rgba(0,255,65,0.4) 85%,',
            '  transparent 100%',
            ')',
          ].join(''),
          zIndex: 20,
          pointerEvents: 'none',
        }}
      />

      {/* ── Large corner brackets ── */}
      {/* Top-left */}
      <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 25, pointerEvents: 'none' }}>
        <div style={{ width: 28, height: 28, borderTop: '2px solid #00ff41', borderLeft: '2px solid #00ff41' }} />
      </div>
      {/* Top-right */}
      <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 25, pointerEvents: 'none' }}>
        <div style={{ width: 28, height: 28, borderTop: '2px solid #00ff41', borderRight: '2px solid #00ff41' }} />
      </div>
      {/* Bottom-left */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 25, pointerEvents: 'none' }}>
        <div style={{ width: 28, height: 28, borderBottom: '2px solid #00ff41', borderLeft: '2px solid #00ff41' }} />
      </div>
      {/* Bottom-right */}
      <div style={{ position: 'absolute', bottom: 0, right: 0, zIndex: 25, pointerEvents: 'none' }}>
        <div style={{ width: 28, height: 28, borderBottom: '2px solid #00ff41', borderRight: '2px solid #00ff41' }} />
      </div>

      {/* ── Camcorder HUD overlay ── */}
      {/* Top-right: format badge */}
      <div
        style={{
          position: 'absolute',
          top: 14, right: 14,
          zIndex: 30,
          fontFamily: 'VT323, Courier New, monospace',
          fontSize: '0.7rem',
          letterSpacing: '0.18em',
          color: 'rgba(0,255,65,0.6)',
          background: 'rgba(0,0,0,0.55)',
          padding: '2px 7px',
          border: '1px solid rgba(0,255,65,0.2)',
          pointerEvents: 'none',
          lineHeight: 1.4,
          textAlign: 'right',
        }}
      >
        <div>SP ■ HI-FI</div>
        <div style={{ color: 'rgba(0,255,65,0.35)', fontSize: '0.6rem' }}>VHS-C</div>
      </div>

      {/* Bottom-left: PLAY / STOP indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 14, left: 14,
          zIndex: 30,
          fontFamily: 'VT323, Courier New, monospace',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          color: isPlaying ? '#00ff41' : 'rgba(0,255,65,0.35)',
          background: 'rgba(0,0,0,0.6)',
          padding: '2px 8px',
          border: `1px solid ${isPlaying ? 'rgba(0,255,65,0.4)' : 'rgba(0,255,65,0.12)'}`,
          pointerEvents: 'none',
          transition: 'all 0.3s ease',
        }}
      >
        {isPlaying ? '▶ PLAY' : '■ STOP'}
      </div>

      {/* Bottom-right: tape counter */}
      <div
        style={{
          position: 'absolute',
          bottom: 14, right: 14,
          zIndex: 30,
          fontFamily: 'VT323, Courier New, monospace',
          fontSize: '0.75rem',
          letterSpacing: '0.12em',
          color: 'rgba(0,255,65,0.4)',
          background: 'rgba(0,0,0,0.6)',
          padding: '2px 8px',
          border: '1px solid rgba(0,255,65,0.1)',
          pointerEvents: 'none',
        }}
      >
        00:00:00
      </div>

      {/* ── Video element ── */}
      <video
        controls
        className="w-full aspect-video bg-black block relative z-[1]"
        preload="metadata"
        style={{
          filter: 'contrast(1.05) brightness(0.92) saturate(0.95)',
          display: 'block',
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
