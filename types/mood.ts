export interface Mood {
  id: string
  name: string
  emoji: string
  quote: string
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  animation: "float" | "pulse" | "wave"
  sound: {
    frequency: number
    type: OscillatorType
  }
}
