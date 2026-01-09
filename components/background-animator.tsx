"use client"

import { motion } from "framer-motion"
import type { Mood } from "@/types/mood"

interface BackgroundAnimatorProps {
  mood: Mood
}

export default function BackgroundAnimator({ mood }: BackgroundAnimatorProps) {
  const getAnimationType = (type: string) => {
    switch (type) {
      case "float":
        return {
          y: [0, -20, 0],
          transition: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }
      case "pulse":
        return {
          opacity: [1, 0.7, 1],
          scale: [1, 1.05, 1],
          transition: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }
      case "wave":
        return {
          x: [-100, 100, -100],
          transition: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
        }
      default:
        return {}
    }
  }

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${mood.colors.primary} 0%, ${mood.colors.secondary} 100%)`,
      }}
    >
      {/* Animated Elements */}
      <motion.div
        className="absolute top-10 right-10 w-40 sm:w-60 h-40 sm:h-60 rounded-full opacity-30 blur-3xl"
        style={{
          background: mood.colors.accent,
          filter: "blur(60px)",
        }}
        animate={getAnimationType(mood.animation)}
      />

      <motion.div
        className="absolute bottom-10 left-10 w-40 sm:w-60 h-40 sm:h-60 rounded-full opacity-30 blur-3xl"
        style={{
          background: mood.colors.secondary,
          filter: "blur(60px)",
        }}
        animate={getAnimationType(mood.animation)}
        transition={{
          ...getAnimationType(mood.animation).transition,
          delay: 1,
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 sm:w-72 h-40 sm:h-72 rounded-full opacity-20 blur-3xl"
        style={{
          background: mood.colors.primary,
          filter: "blur(80px)",
        }}
        animate={getAnimationType(mood.animation)}
        transition={{
          ...getAnimationType(mood.animation).transition,
          delay: 2,
        }}
      />
    </div>
  )
}
