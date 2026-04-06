'use client'

import { useState, useRef, useEffect } from 'react'

const playlist = [
  { title: 'Neon Shadows', src: '/audio/Neon Shadows.mp3' },
  { title: 'Neon Shadows (Americana)', src: '/audio/Neon Shadows (americana).mp3' },
  { title: 'Neon Shadows (Alt Metal)', src: '/audio/Neon Shadows (altmetal).mp3' },
  { title: 'Neon Shadows (Chippy Nu Metal)', src: '/audio/Neon Shadows (chippynumetal).mp3' },
  { title: 'Neon Shadows (Chiptune)', src: '/audio/Neon Shadows (chiptune).mp3' },
  { title: 'Neon Shadows (Credits)', src: '/audio/Neon Shadows (credits).mp3' },
  { title: 'Neon Shadows (Deathcore)', src: '/audio/Neon Shadows (deathcore).mp3' },
  { title: 'Neon Shadows (Djent)', src: '/audio/Neon Shadows (djent).mp3' },
  { title: 'Neon Shadows (DNB1)', src: '/audio/Neon Shadows (dnb1).mp3' },
  { title: 'Neon Shadows (DNB2)', src: '/audio/Neon Shadows (dnb2).mp3' },
  { title: 'Neon Shadows (Doom Synth)', src: '/audio/Neon Shadows (doomsynth).mp3' },
  { title: 'Neon Shadows (Elect Chill)', src: '/audio/Neon Shadows (electchill).mp3' },
  { title: 'Neon Shadows (Metalcore)', src: '/audio/Neon Shadows (metalcore).mp3' },
  { title: 'Neon Shadows (Metalcore 2)', src: '/audio/Neon Shadows (metalcore2).mp3' },
  { title: 'Neon Shadows (Midwest)', src: '/audio/Neon Shadows (midwest).mp3' },
  { title: 'Neon Shadows (Pink)', src: '/audio/Neon Shadows (pink).mp3' },
  { title: 'Neon Shadows (Pink 2)', src: '/audio/Neon Shadows (pink2).mp3' },
  { title: 'Neon Shadows (Post Electronica)', src: '/audio/Neon Shadows (post electronica).mp3' },
  { title: 'Neon Shadows (Synthpop)', src: '/audio/Neon Shadows (synthpop).mp3' },
]

// Short display labels for the marquee
const shortLabel = (title: string) =>
  title.replace('Neon Shadows', 'NSH').replace('(', '[').replace(')', ']').toUpperCase()

function formatTime(t: number) {
  if (!isFinite(t) || isNaN(t) || t < 0) return '0:00'
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying]     = useState(false)
  const [volume, setVolume]           = useState(0.5)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration]       = useState(0)
  const [trackIdx, setTrackIdx]       = useState(0)
  const [visible, setVisible]         = useState(false)
  const [collapsed, setCollapsed]     = useState(false)

  // Pop in + try autoplay
  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(true)
      audioRef.current?.play().then(() => setIsPlaying(true)).catch(() => {
        const start = () => {
          audioRef.current?.play().then(() => setIsPlaying(true)).catch(console.error)
          document.removeEventListener('click', start)
          document.removeEventListener('keydown', start)
        }
        document.addEventListener('click', start, { once: true })
        document.addEventListener('keydown', start, { once: true })
      })
    }, 500)
    return () => clearTimeout(t)
  }, [])

  // Audio events
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => setCurrentTime(audio.currentTime)
    const onMeta = () => setDuration(audio.duration)
    const onEnd = () => {
      setIsPlaying(false)
      const next = (trackIdx + 1) % playlist.length
      setTrackIdx(next)
      setCurrentTime(0)
    }
    const onCanPlay = () => {
      audio.play().then(() => setIsPlaying(true)).catch(() => {
        const start = () => {
          audio.play().then(() => setIsPlaying(true)).catch(console.error)
          document.removeEventListener('click', start)
        }
        document.addEventListener('click', start, { once: true })
      })
    }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('ended', onEnd)
    audio.addEventListener('canplay', onCanPlay)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('ended', onEnd)
      audio.removeEventListener('canplay', onCanPlay)
    }
  }, [trackIdx])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false) }
    else { audioRef.current.play(); setIsPlaying(true) }
  }

  const prevTrack = () => {
    const i = trackIdx > 0 ? trackIdx - 1 : playlist.length - 1
    setTrackIdx(i); setCurrentTime(0)
    setTimeout(() => { if (isPlaying) audioRef.current?.play() }, 100)
  }

  const nextTrack = () => {
    const i = (trackIdx + 1) % playlist.length
    setTrackIdx(i); setCurrentTime(0)
    setTimeout(() => { if (isPlaying) audioRef.current?.play() }, 100)
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const t = ((e.clientX - rect.left) / rect.width) * duration
    audioRef.current.currentTime = t
    setCurrentTime(t)
  }

  const progress = duration ? (currentTime / duration) * 100 : 0
  const volPct   = Math.round(volume * 10)            // 0–10 segments
  const trackNum = String(trackIdx + 1).padStart(2, '0')

  const mono: React.CSSProperties = { fontFamily: 'VT323, Courier New, monospace' }
  const green = '#00ff41'
  const dimGreen = 'rgba(0,255,65,0.35)'
  const panelBg = '#060d06'

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1rem',
        left: '1rem',
        zIndex: 50,
        width: collapsed ? 'auto' : '240px',
        transition: 'all 0.4s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(120%)',
      }}
    >
      <audio ref={audioRef} src={playlist[trackIdx].src} preload="auto" />

      {/* Outer casing */}
      <div
        style={{
          background: 'linear-gradient(160deg, #1a1a1a 0%, #0d0d0d 60%, #111 100%)',
          border: `1px solid rgba(0,255,65,0.25)`,
          boxShadow: `0 0 0 1px #000, 0 8px 32px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)`,
        }}
      >
        {/* Top bar — VHS label strip */}
        <div
          style={{
            background: '#111',
            borderBottom: '1px solid rgba(0,255,65,0.15)',
            padding: '4px 8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ ...mono, fontSize: '0.7rem', letterSpacing: '0.2em', color: dimGreen }}>
            ▓ VHS DECK
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {isPlaying && (
              <span style={{ ...mono, fontSize: '0.6rem', color: '#ff2200', letterSpacing: '0.1em' }}>
                ● REC
              </span>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              style={{ ...mono, fontSize: '0.65rem', color: dimGreen, background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.1em', padding: '0 2px' }}
            >
              {collapsed ? '[+]' : '[–]'}
            </button>
          </div>
        </div>

        {!collapsed && (
          <>
            {/* Phosphor screen */}
            <div
              style={{
                background: panelBg,
                margin: '6px',
                padding: '6px 8px',
                border: '1px solid rgba(0,255,65,0.2)',
                boxShadow: `inset 0 0 12px rgba(0,255,65,0.06)`,
              }}
            >
              {/* Track ID + status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                <span style={{ ...mono, fontSize: '0.7rem', color: dimGreen, letterSpacing: '0.12em' }}>
                  T-{trackNum} / SP
                </span>
                <span style={{ ...mono, fontSize: '0.7rem', color: isPlaying ? green : dimGreen, letterSpacing: '0.1em' }}>
                  {isPlaying ? '▶ PLAY' : '■ STOP'}
                </span>
              </div>

              {/* Track name */}
              <div
                style={{
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  marginBottom: '4px',
                }}
              >
                <span
                  style={{
                    ...mono,
                    fontSize: '0.85rem',
                    color: green,
                    letterSpacing: '0.08em',
                    textShadow: `0 0 8px ${green}`,
                    display: 'inline-block',
                    animation: isPlaying ? 'marquee-scroll 10s linear infinite' : 'none',
                  }}
                >
                  {shortLabel(playlist[trackIdx].title)}
                </span>
              </div>

              {/* Time */}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ ...mono, fontSize: '0.8rem', color: green, letterSpacing: '0.1em' }}>
                  {formatTime(currentTime)}
                </span>
                <span style={{ ...mono, fontSize: '0.8rem', color: dimGreen, letterSpacing: '0.1em' }}>
                  {formatTime(duration)}
                </span>
              </div>

              {/* Progress bar — clickable */}
              <div
                onClick={handleSeek}
                style={{
                  marginTop: '5px',
                  height: '4px',
                  background: 'rgba(0,255,65,0.1)',
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: green,
                    boxShadow: `0 0 6px ${green}`,
                    transition: 'width 0.5s linear',
                  }}
                />
              </div>
            </div>

            {/* Transport buttons */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '4px 6px' }}>
              {[
                { label: '◄◄', action: () => { if (audioRef.current) audioRef.current.currentTime = Math.max(0, currentTime - 10) }, title: 'REW' },
                { label: '◄',  action: prevTrack, title: 'PREV' },
                { label: isPlaying ? '■' : '▶', action: togglePlay, isMain: true, title: isPlaying ? 'STOP' : 'PLAY' },
                { label: '►',  action: nextTrack, title: 'NEXT' },
                { label: '▶▶', action: () => { if (audioRef.current) audioRef.current.currentTime = Math.min(duration, currentTime + 10) }, title: 'FF' },
              ].map((btn) => (
                <button
                  key={btn.label}
                  onClick={btn.action}
                  title={btn.title}
                  style={{
                    ...mono,
                    fontSize: btn.isMain ? '1rem' : '0.75rem',
                    background: btn.isMain ? 'rgba(0,255,65,0.12)' : 'rgba(0,0,0,0.6)',
                    border: btn.isMain ? `1px solid rgba(0,255,65,0.4)` : '1px solid rgba(0,255,65,0.15)',
                    color: btn.isMain ? green : dimGreen,
                    cursor: 'pointer',
                    padding: btn.isMain ? '5px 10px' : '4px 6px',
                    letterSpacing: '0.05em',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,255,65,0.7)'; (e.currentTarget as HTMLElement).style.color = green }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = btn.isMain ? 'rgba(0,255,65,0.4)' : 'rgba(0,255,65,0.15)'; (e.currentTarget as HTMLElement).style.color = btn.isMain ? green : dimGreen }}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Volume bar + label */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 8px 6px',
                borderTop: '1px solid rgba(0,255,65,0.08)',
              }}
            >
              <span style={{ ...mono, fontSize: '0.65rem', color: dimGreen, letterSpacing: '0.15em', flexShrink: 0 }}>VOL</span>

              {/* Segmented volume display */}
              <div style={{ display: 'flex', gap: '2px', flex: 1 }}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setVolume((i + 1) / 10)}
                    style={{
                      flex: 1,
                      height: '10px',
                      background: i < volPct ? green : 'rgba(0,255,65,0.12)',
                      boxShadow: i < volPct ? `0 0 4px ${green}` : 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'background 0.1s',
                    }}
                  />
                ))}
              </div>

              <span style={{ ...mono, fontSize: '0.6rem', color: dimGreen, letterSpacing: '0.1em', flexShrink: 0 }}>
                HI-FI
              </span>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          40%  { transform: translateX(0); }
          90%  { transform: translateX(-60%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}
