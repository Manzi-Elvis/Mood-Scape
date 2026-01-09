import type { Mood } from "@/types/mood"

export const moods: Mood[] = [
  {
    id: "happy",
    name: "Happy",
    emoji: "😊",
    quote: "Happiness is not something ready made. It comes from your own actions.",
    colors: {
      primary: "#FFC857",
      secondary: "#F24236",
      accent: "#FF6B6B",
    },
    animation: "float",
    sound: {
      frequency: 528,
      type: "sine",
    },
  },
  {
    id: "chill",
    name: "Chill",
    emoji: "😌",
    quote: "Peace comes from within. Do not seek it without.",
    colors: {
      primary: "#2E86AB",
      secondary: "#A23B72",
      accent: "#F18F01",
    },
    animation: "wave",
    sound: {
      frequency: 432,
      type: "sine",
    },
  },
  {
    id: "focused",
    name: "Focused",
    emoji: "🎯",
    quote: "Focus on being productive instead of busy.",
    colors: {
      primary: "#6A0572",
      secondary: "#AB063B",
      accent: "#C41E3A",
    },
    animation: "pulse",
    sound: {
      frequency: 639,
      type: "sine",
    },
  },
  {
    id: "energetic",
    name: "Energetic",
    emoji: "⚡",
    quote: "Believe you can and you are halfway there.",
    colors: {
      primary: "#FF006E",
      secondary: "#FB5607",
      accent: "#FFBE0B",
    },
    animation: "float",
    sound: {
      frequency: 852,
      type: "sine",
    },
  },
  {
    id: "anxious",
    name: "Anxious",
    emoji: "😰",
    quote: "Breathe. You are going to be okay.",
    colors: {
      primary: "#7209B7",
      secondary: "#3A0CA3",
      accent: "#560BAD",
    },
    animation: "pulse",
    sound: {
      frequency: 396,
      type: "sine",
    },
  },
]
