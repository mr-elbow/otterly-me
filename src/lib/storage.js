// ---------------------------------------------------------------------------
// Local storage helpers — everything stays on this device, nothing is sent
// anywhere. Entries are stored under a single versioned key.
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'otterly-me-v1'

/** Load the whole store; always returns { entries: {...} } even if corrupt. */
export function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { entries: {} }
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object' && parsed.entries && typeof parsed.entries === 'object') {
      return { entries: parsed.entries }
    }
    return { entries: {} }
  } catch {
    return { entries: {} }
  }
}

/** Persist the store. Returns true on success, false if the quota blew up. */
export function saveStore(store) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
    return true
  } catch {
    return false
  }
}

export function upsertEntry(store, key, entry) {
  return { entries: { ...store.entries, [key]: entry } }
}

export function deleteEntry(store, key) {
  const entries = { ...store.entries }
  delete entries[key]
  return { entries }
}

/** Local date key like "2026-10-01". */
export function todayKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function shiftKey(key, days) {
  const [y, m, d] = key.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  date.setDate(date.getDate() + days)
  return todayKey(date)
}

/** Friendly label like "Thursday, October 1, 2026". */
export function dateLabel(key) {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/** Short label like "Thu, Oct 1". */
export function shortDateLabel(key) {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Count consecutive journaled days. The streak includes today if it is done,
 * otherwise it starts from yesterday (so missing today doesn't zero it out).
 */
export function calcStreak(entries) {
  let streak = 0
  let key = todayKey()
  if (!entries[key]) key = shiftKey(key, -1)
  while (entries[key]) {
    streak += 1
    key = shiftKey(key, -1)
  }
  return streak
}

/** Deterministic day-of-year index used to rotate the daily question banks. */
export function dayIndex(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0)
  return Math.floor((date - start) / 86400000)
}

/** Pick an item from an array deterministically by day, with an offset. */
export function pickForDay(arr, offset = 0) {
  if (!arr.length) return null
  return arr[(dayIndex() + offset) % arr.length]
}
