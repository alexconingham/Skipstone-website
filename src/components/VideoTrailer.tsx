'use client'

interface VideoTrailerProps {
  src: string
  className?: string
}

export default function VideoTrailer({ src, className = '' }: VideoTrailerProps) {
  return (
    <div className={`video-frame relative ${className}`}>
      {/* Glitch line sweep */}
      <div className="video-glitch-line" />

      {/* Corner accents */}
      <div className="video-corner video-corner-tl" />
      <div className="video-corner video-corner-tr" />
      <div className="video-corner video-corner-bl" />
      <div className="video-corner video-corner-br" />

      <video
        controls
        className="w-full aspect-video bg-black block relative z-[1]"
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
