"use client"

import { useEffect, useRef } from "react"
import type { Mood } from "@/types/mood"

interface SoundPlayerProps {
  mood: Mood
  enabled: boolean
}

export default function SoundPlayer({ mood, enabled }: SoundPlayerProps) {
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  useEffect(() => {
    if (!enabled) {
      // Stop sound if disabled
      if (oscillatorRef.current && gainRef.current) {
        gainRef.current.gain.setTargetAtTime(0, audioContextRef.current?.currentTime || 0, 0.015)
      }
      return
    }

    // Initialize Web Audio API
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    const audioContext = audioContextRef.current

    // Stop previous oscillator if exists
    if (oscillatorRef.current) {
      oscillatorRef.current.stop()
    }

    // Create new oscillator
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    // Set frequency based on mood
    const frequencies: Record<string, number> = {
      happy: 528, // Love frequency
      chill: 432, // Earth frequency
      focused: 639, // Communication
      energetic: 852, // Third eye
      anxious: 396, // Root frequency
    }

    oscillator.frequency.value = frequencies[mood.id] || 440
    oscillator.type = "sine"
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)

    oscillator.start()

    oscillatorRef.current = oscillator
    gainRef.current = gainNode

    return () => {
      // Cleanup on unmount or mood change
      if (gainRef.current) {
        gainRef.current.gain.setTargetAtTime(0, audioContext.currentTime, 0.015)
      }
      setTimeout(() => {
        if (oscillatorRef.current) {
          try {
            oscillatorRef.current.stop()
          } catch (e) {
            // Already stopped
          }
        }
      }, 100)
    }
  }, [mood, enabled])

  return null // This component only handles audio, no visual output
}
