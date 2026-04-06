'use client'

interface VideoTrailerProps {
  src: string
  className?: string
}

export default function VideoTrailer({ src, className = '' }: VideoTrailerProps) {
  return (
    <div className={`relative ${className}`} style={{ border: '1px solid rgba(0,255,65,0.25)' }}>

      {/* VHS tracking lines above video */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '3px',
          background: 'linear-gradient(to right, transparent, rgba(0,255,65,0.6) 30%, rgba(0,229,255,0.4) 60%, transparent)',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />

      {/* Corner accents */}
      <div className="video-corner video-corner-tl" />
      <div className="video-corner video-corner-tr" />
      <div className="video-corner video-corner-bl" />
      <div className="video-corner video-corner-br" />

      {/* SP badge */}
      <div
        style={{
          position: 'absolute',
          top: '8px',
          right: '10px',
          zIndex: 20,
          fontFamily: 'VT323, Courier New, monospace',
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          color: 'rgba(0,255,65,0.5)',
          pointerEvents: 'none',
        }}
      >
        SP ■ HI-FI
      </div>

      <video
        controls
        className="w-full aspect-video bg-black block"
        preload="metadata"
        style={{
          filter: 'contrast(1.05) brightness(0.95)',
        }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Bottom tracking bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '2px',
          background: 'linear-gradient(to right, transparent, rgba(0,255,65,0.4) 30%, rgba(0,229,255,0.3) 70%, transparent)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
