"use client"

import { useEffect, useState } from "react"
import MoodSelector from "@/components/mood-selector"
import BackgroundAnimator from "@/components/background-animator"
import MoodQuote from "@/components/mood-quote"
import SoundPlayer from "@/components/sound-player"
import type { Mood } from "@/types/mood"
import { moods } from "@/data/moods"

export default function Home() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null)
  const [soundEnabled, setSoundEnabled] = useState(true)

  // Load mood from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const moodFromUrl = params.get("mood")

    if (moodFromUrl) {
      const mood = moods.find((m) => m.id === moodFromUrl)
      if (mood) {
        setSelectedMood(mood)
      }
    } else {
      // Load from localStorage
      const savedMood = localStorage.getItem("lastMood")
      if (savedMood) {
        const mood = moods.find((m) => m.id === savedMood)
        if (mood) {
          setSelectedMood(mood)
        }
      } else {
        // Default to first mood
        setSelectedMood(moods[0])
      }
    }
  }, [])

  // Save mood to localStorage and URL
  const handleMoodChange = (mood: Mood) => {
    setSelectedMood(mood)
    localStorage.setItem("lastMood", mood.id)

    // Update URL
    const params = new URLSearchParams()
    params.set("mood", mood.id)
    window.history.pushState({}, "", `?${params.toString()}`)
  }

  if (!selectedMood) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground/60">Loading MoodScape...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* Animated Background */}
      <BackgroundAnimator mood={selectedMood} />

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 py-8">
        {/* Sound Toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          title={soundEnabled ? "Mute" : "Unmute"}
        >
          {soundEnabled ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.26 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.6 14.89l-2.5-2.5c.1-.23.16-.48.16-.74 0-1.66-1.34-3-3-3-.26 0-.51.05-.74.15l-2.5-2.5c.67-.33 1.41-.65 2.24-.65 4.01 0 7 2.99 7 7 0 .83-.32 1.57-.65 2.24zm2.07-7.07c-.9-1.77-2.65-3.12-4.64-3.56v2.06c1.35.36 2.55 1.19 3.31 2.31l1.33-1.33zM2.41 2.41L1 3.82l2 2V4L7 9h4v2H5.82l8.11 8.11c.74.14 1.48.09 2.23-.25v2.06c-1.42.5-2.95.49-4.44-.05L3.82 21 5.23 19.59l.88-.88C3.85 17.75 2 15.04 2 12s1.85-5.75 4.11-7.46l.3-.3zm6.35 6.35l-1.76-1.76c-.05.25-.09.5-.09.76 0 1.66 1.34 3 3 3 .26 0 .51-.04.76-.09l-1.76-1.76z" />
            </svg>
          )}
        </button>

        {/* Share Button */}
        <button
          onClick={() => {
            const url = `${window.location.origin}?mood=${selectedMood.id}`
            navigator.clipboard.writeText(url)
            alert("Link copied to clipboard!")
          }}
          className="absolute top-6 left-6 z-20 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors text-sm font-medium"
        >
          Share
        </button>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center gap-12 sm:gap-16 max-w-2xl w-full">
          {/* Mood Quote */}
          <MoodQuote mood={selectedMood} />

          {/* Mood Selector */}
          <MoodSelector selectedMood={selectedMood} onMoodChange={handleMoodChange} />

          {/* Sound Player */}
          <SoundPlayer mood={selectedMood} enabled={soundEnabled} />
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 text-center text-white/40 text-xs sm:text-sm">
          <p>MoodScape • Track your emotional state with ambient soundscapes</p>
        </div>
      </div>
    </main>
  )
}
