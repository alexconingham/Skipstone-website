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
  { title: 'Neon Shadows (Synthpop)', src: '/audio/Neon Shadows (synthpop).mp3' }
]

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  // Trigger pop-in animation and auto-play on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      // Try to auto-play after the animation
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch((error) => {
          console.log('Autoplay prevented:', error)
        })
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => {
      setIsPlaying(false)
      // Auto-play next track if available
      if (currentTrackIndex < playlist.length - 1) {
        nextTrack()
      } else {
        // Loop back to first track
        setCurrentTrackIndex(0)
        setCurrentTime(0)
        setTimeout(() => {
          audio.play()
          setIsPlaying(true)
        }, 100)
      }
    }

    const handleCanPlay = () => {
      // Auto-play when audio is ready
      audio.play().then(() => {
        setIsPlaying(true)
      }).catch((error) => {
        console.log('Autoplay prevented:', error)
      })
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('canplay', handleCanPlay)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('canplay', handleCanPlay)
    }
  }, [currentTrackIndex])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const nextTrack = () => {
    const nextIndex = currentTrackIndex < playlist.length - 1 ? currentTrackIndex + 1 : 0
    setCurrentTrackIndex(nextIndex)
    setCurrentTime(0)
    if (audioRef.current) {
      setTimeout(() => {
        if (isPlaying) {
          audioRef.current?.play()
        }
      }, 100)
    }
  }

  const previousTrack = () => {
    const prevIndex = currentTrackIndex > 0 ? currentTrackIndex - 1 : playlist.length - 1
    setCurrentTrackIndex(prevIndex)
    setCurrentTime(0)
    if (audioRef.current) {
      setTimeout(() => {
        if (isPlaying) {
          audioRef.current?.play()
        }
      }, 100)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const newTime = (clickX / rect.width) * duration
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time) || time < 0) return '0:00'
    const totalSeconds = Math.floor(time)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0

  return (
    <div 
      className={`fixed top-4 left-4 z-50 transition-all duration-700 ease-out transform ${
        isVisible 
          ? 'translate-x-0 translate-y-0 opacity-100' 
          : '-translate-x-full -translate-y-full opacity-0'
      } ${isHovered ? 'scale-105' : 'scale-100'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Retro Cassette Player Design */}
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black border-4 border-gray-600 rounded-lg p-4 shadow-2xl">
        {/* Retro Display Screen */}
        <div className="bg-black border-2 border-gray-700 rounded p-2 mb-3">
          <div className="text-green-400 font-mono text-xs text-center">
            ♪ {playlist[currentTrackIndex].title.replace('Neon Shadows', 'NEON SHADOWS').slice(0, 25)} ♪
          </div>
          <div className="text-green-300 font-mono text-xs text-center mt-1">
            {isPlaying ? '► PLAYING' : '⏸ PAUSED'} | VOL: {Math.round(volume * 100)}%
          </div>
        </div>

        {/* Control Buttons - Retro Style */}
        <div className="flex items-center justify-center space-x-2 mb-3">
          {/* Previous Button */}
          <button
            onClick={previousTrack}
            className="w-8 h-8 bg-gray-700 border-2 border-gray-500 rounded-sm flex items-center justify-center hover:bg-gray-600 transition-colors duration-200 shadow-inner"
          >
            <span className="text-gray-200 text-sm font-bold">⏮</span>
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-12 h-12 bg-red-600 border-2 border-red-400 rounded-sm flex items-center justify-center hover:bg-red-500 transition-colors duration-200 shadow-inner"
          >
            <span className="text-white text-lg font-bold">
              {isPlaying ? '⏸' : '▶'}
            </span>
          </button>

          {/* Next Button */}
          <button
            onClick={nextTrack}
            className="w-8 h-8 bg-gray-700 border-2 border-gray-500 rounded-sm flex items-center justify-center hover:bg-gray-600 transition-colors duration-200 shadow-inner"
          >
            <span className="text-gray-200 text-sm font-bold">⏭</span>
          </button>
        </div>

        {/* Volume Knob Style Control */}
        <div className="flex items-center justify-center space-x-2">
          <span className="text-gray-400 text-xs font-mono">VOL</span>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-16 h-2 bg-gray-800 border border-gray-600 rounded appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
              }}
            />
          </div>
          <span className="text-gray-400 text-xs font-mono">{Math.round(volume * 100)}</span>
        </div>

        {/* Retro Speaker Grilles */}
        <div className="flex justify-between mt-3">
          <div className="w-3 h-8 bg-gray-700 border border-gray-600 rounded-sm">
            <div className="grid grid-cols-2 gap-px p-1 h-full">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-full"></div>
              ))}
            </div>
          </div>
          <div className="w-3 h-8 bg-gray-700 border border-gray-600 rounded-sm">
            <div className="grid grid-cols-2 gap-px p-1 h-full">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Audio Element */}
      <audio 
        ref={audioRef}
        src={playlist[currentTrackIndex].src}
        preload="auto"
      />
    </div>
  )
} 