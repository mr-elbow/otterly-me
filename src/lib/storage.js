// ---------------------------------------------------------------------------
// Local storage helpers — everything stays on this device, nothing is sent
// anywhere. Each journal profile keeps its own entries under its own key.
// ---------------------------------------------------------------------------

const LEGACY_KEY = 'otterly-me-v1'

function readStore(key) {
  try {
    const raw = localStorage.getItem(key)
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

const entriesKey = (profileId) => `otterly-me-entries-${profileId}`

/** Load a journal profile's store; always returns { entries: {...} } even if corrupt. */
export function loadStore(profileId) {
  return readStore(entriesKey(profileId))
}

/** Persist a journal profile's store. Returns true on success, false if the quota blew up. */
export function saveStore(profileId, store) {
  try {
    localStorage.setItem(entriesKey(profileId), JSON.stringify(store))
    return true
  } catch {
    return false
  }
}

// ---------------------------------------------------------------------------
// Journal profiles — each kid gets their own journal with their own entries.
// ---------------------------------------------------------------------------

const PROFILES_KEY = 'otterly-me-profiles'
const ACTIVE_PROFILE_KEY = 'otterly-me-active-profile'

export function newProfileId() {
  return 'journal-' + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36)
}

/**
 * Load journal profiles. On the first run after journals were introduced,
 * any entries saved under the old single-journal key are moved into the
 * first journal so nothing is lost.
 */
export function loadProfiles() {
  let profiles = null
  try {
    const raw = localStorage.getItem(PROFILES_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) profiles = parsed.filter((p) => p && typeof p.id === 'string')
    }
  } catch {
    // fall through to migration
  }
  if (profiles) return profiles

  profiles = [{ id: newProfileId(), name: '', createdAt: Date.now() }]
  const legacy = readStore(LEGACY_KEY)
  if (Object.keys(legacy.entries).length > 0) {
    try {
      localStorage.setItem(entriesKey(profiles[0].id), JSON.stringify(legacy))
      localStorage.removeItem(LEGACY_KEY)
    } catch {
      // non-fatal: entries stay under the legacy key and simply won't load
    }
  }
  saveProfiles(profiles)
  return profiles
}

export function saveProfiles(profiles) {
  try {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles))
    return true
  } catch {
    return false
  }
}

export function getActiveProfileId() {
  try {
    return localStorage.getItem(ACTIVE_PROFILE_KEY)
  } catch {
    return null
  }
}

export function setActiveProfileId(id) {
  try {
    localStorage.setItem(ACTIVE_PROFILE_KEY, id)
  } catch {
    // non-fatal
  }
}

/** Entry count for a profile, for the journal switcher. */
export function countEntries(profileId) {
  return Object.keys(readStore(entriesKey(profileId)).entries).length
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
