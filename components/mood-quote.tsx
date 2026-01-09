"use client"

import { motion } from "framer-motion"
import type { Mood } from "@/types/mood"

interface MoodQuoteProps {
  mood: Mood
}

export default function MoodQuote({ mood }: MoodQuoteProps) {
  return (
    <motion.div
      key={mood.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg">{mood.name}</h1>
      <p className="text-lg sm:text-xl text-white/80 max-w-md leading-relaxed drop-shadow-md">"{mood.quote}"</p>
    </motion.div>
  )
}
