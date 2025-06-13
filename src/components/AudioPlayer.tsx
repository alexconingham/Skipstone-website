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
      className={`fixed top-6 left-6 z-50 transition-all duration-300 ease-out ${
        isHovered ? 'scale-105' : 'scale-100'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700/50 rounded-xl p-4 shadow-2xl">
        <div className="flex flex-col items-center space-y-3">
          {/* Control Buttons Row */}
          <div className="flex items-center space-x-3">
            {/* Previous Button */}
            <button
              onClick={previousTrack}
              className="w-8 h-8 bg-gradient-to-r from-red-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-lg"
            >
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="w-10 h-10 bg-gradient-to-r from-red-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-lg"
            >
              {isPlaying ? (
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            {/* Next Button */}
            <button
              onClick={nextTrack}
              className="w-8 h-8 bg-gradient-to-r from-red-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-lg"
            >
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414zm6 0a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L14.586 10l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Volume Control Row */}
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.785L4.88 13.37A1 1 0 014 12.348V7.652a1 1 0 01.88-1.02l3.503-2.416A1 1 0 019.383 3.076zM12.863 5.18a.5.5 0 01.707 0 4.97 4.97 0 010 7.64.5.5 0 01-.707-.708 3.97 3.97 0 000-5.224.5.5 0 010-.708z" clipRule="evenodd" />
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-white"
              style={{
                '--slider-progress': `${volume * 100}%`
              } as React.CSSProperties}
            />
          </div>
        </div>
      </div>

      {/* Audio Element */}
      <audio 
        ref={audioRef}
        src={playlist[currentTrackIndex].src}
        loop
        preload="auto"
      />
    </div>
  )
} 