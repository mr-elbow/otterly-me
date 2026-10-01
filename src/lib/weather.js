// Kid-friendly temperature helpers. Words come first — the °F number is
// secondary detail, since young kids think in feelings, not degrees.

export function tempWord(t) {
  if (t <= 32) return 'Freezing'
  if (t <= 50) return 'Cold'
  if (t <= 65) return 'Cool'
  if (t <= 80) return 'Nice'
  if (t <= 90) return 'Warm'
  return 'Hot'
}

export function tempEmoji(t) {
  if (t <= 32) return '🥶'
  if (t <= 50) return '🧤'
  if (t <= 65) return '🧥'
  if (t <= 85) return '🩳'
  return '🥵'
}

// Clothing guide stops shown under the slider, cold → hot
export const TEMP_STOPS = [
  { temp: 0, emoji: '🥶', label: 'Freezing' },
  { temp: 25, emoji: '🧤', label: 'Chilly' },
  { temp: 50, emoji: '🧥', label: 'Sweater' },
  { temp: 75, emoji: '🩳🎽', label: 'Shorts & tank' },
  { temp: 100, emoji: '🥵', label: 'Scorching' },
]
