"use client"

import { motion } from "framer-motion"
import type { Mood } from "@/types/mood"
import { moods } from "@/data/moods"

interface MoodSelectorProps {
  selectedMood: Mood
  onMoodChange: (mood: Mood) => void
}

export default function MoodSelector({ selectedMood, onMoodChange }: MoodSelectorProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-2xl">
      {moods.map((mood) => (
        <motion.button
          key={mood.id}
          onClick={() => onMoodChange(mood)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all text-sm sm:text-base ${
            selectedMood.id === mood.id
              ? "bg-white text-gray-900 shadow-lg scale-105"
              : "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
          }`}
        >
          {mood.emoji} {mood.name}
        </motion.button>
      ))}
    </div>
  )
}
