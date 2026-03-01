'use client'

interface VideoTrailerProps {
  src: string
  className?: string
}

export default function VideoTrailer({ src, className = '' }: VideoTrailerProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Glow border */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          border: '1px solid rgba(0,255,255,0.25)',
          boxShadow: '0 0 40px rgba(0,255,255,0.15), 0 0 80px rgba(0,255,255,0.07), inset 0 0 40px rgba(0,255,255,0.04)',
        }}
      />

      {/* Corner accents */}
      <div className="video-corner video-corner-tl" />
      <div className="video-corner video-corner-tr" />
      <div className="video-corner video-corner-bl" />
      <div className="video-corner video-corner-br" />

      <video
        controls
        className="w-full aspect-video bg-black block"
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
