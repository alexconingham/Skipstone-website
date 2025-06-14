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
  const [isClosed, setIsClosed] = useState(false)

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

  const handleClose = () => {
    setIsClosed(true)
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  if (isClosed) return null

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
      {/* Compact Retro Player Design */}
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black border-2 border-gray-600 rounded-lg p-2 shadow-2xl relative">
        {/* Close Tab */}
        <button
          onClick={handleClose}
          className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 border border-red-400 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors duration-200 text-white text-xs font-bold"
        >
          ×
        </button>

        {/* Compact Display */}
        <div className="bg-black border border-gray-700 rounded p-1 mb-2">
          <div className="text-green-400 font-mono text-xs text-center">
            {playlist[currentTrackIndex].title.replace('Neon Shadows', 'NEON').slice(0, 15)}
          </div>
          <div className="text-green-300 font-mono text-xs text-center">
            {isPlaying ? '►' : '⏸'} {Math.round(volume * 100)}%
          </div>
        </div>

        {/* Compact Controls */}
        <div className="flex items-center justify-center space-x-1 mb-2">
          <button
            onClick={previousTrack}
            className="w-6 h-6 bg-gray-700 border border-gray-500 rounded flex items-center justify-center hover:bg-gray-600 transition-colors duration-200"
          >
            <span className="text-gray-200 text-xs">⏮</span>
          </button>

          <button
            onClick={togglePlay}
            className="w-8 h-8 bg-red-600 border border-red-400 rounded flex items-center justify-center hover:bg-red-500 transition-colors duration-200"
          >
            <span className="text-white text-sm">
              {isPlaying ? '⏸' : '▶'}
            </span>
          </button>

          <button
            onClick={nextTrack}
            className="w-6 h-6 bg-gray-700 border border-gray-500 rounded flex items-center justify-center hover:bg-gray-600 transition-colors duration-200"
          >
            <span className="text-gray-200 text-xs">⏭</span>
          </button>
        </div>

        {/* Compact Volume */}
        <div className="flex items-center justify-center space-x-1">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-12 h-1 bg-gray-800 border border-gray-600 rounded appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
            }}
          />
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