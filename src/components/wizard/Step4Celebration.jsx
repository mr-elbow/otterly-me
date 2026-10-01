import { useMemo, useState } from 'react'
import { Save, PartyPopper, Home, AlertTriangle, ScrollText } from 'lucide-react'
import OtterMascot from '../OtterMascot.jsx'
import { upsertEntry } from '../../lib/storage.js'
import { MOOD_OPTIONS, WEATHER_OPTIONS } from '../../data/banks.js'
import { historyFactFor, historyDateLabel } from '../../data/history.js'
import { tempWord } from '../../lib/weather.js'

const CONFETTI_COLORS = ['#14b8a6', '#fbbf24', '#f472b6', '#60a5fa', '#a78bfa', '#34d399', '#fb923c']

/**
 * Step 4 — review, save, and celebrate. The entry object is assembled here
 * and persisted to localStorage via the onSave callback.
 */
export default function Step4Celebration({ draft, questions, entryKey, existing, onSave, onDone }) {
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState(false)

  const confetti = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 2.5}s`,
        duration: `${2.4 + Math.random() * 2.4}s`,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        size: 8 + Math.random() * 10,
        round: Math.random() > 0.5,
      })),
    [],
  )

  const mood = MOOD_OPTIONS.find((m) => m.id === draft.mood)
  const weather = WEATHER_OPTIONS.find((w) => w.id === draft.weather)

  const handleSave = () => {
    const entry = {
      date: entryKey,
      weather: draft.weather,
      temperature: draft.temperature,
      breakfast: draft.breakfast.trim(),
      mood: draft.mood,
      selfie: draft.selfie,
      selfiePrompt: draft.selfiePrompt,
      questions: {
        mc: questions.mc,
        reflection: questions.reflection,
        reflection2: questions.reflection2,
        fun: questions.fun,
        fav1: questions.fav1,
        fav2: questions.fav2,
      },
      answers: {
        mc: { q: questions.mc.q, options: questions.mc.options, choice: draft.mc },
        reflection: { q: questions.reflection, text: draft.reflection.trim() },
        reflection2: { q: questions.reflection2, text: draft.reflection2.trim() },
        fun: { q: questions.fun, text: draft.fun.trim() },
        favorites: [
          { q: questions.fav1, text: draft.fav1.trim() },
          { q: questions.fav2, text: draft.fav2.trim() },
        ],
      },
      createdAt: existing?.createdAt ?? Date.now(),
      updatedAt: Date.now(),
    }
    const ok = onSave(upsertEntry, entryKey, entry)
    if (ok) {
      setSaved(true)
      setSaveError(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setSaveError(true)
    }
  }

  if (saved) {
    return (
      <div className="relative overflow-hidden text-center">
        {/* Confetti */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {confetti.map((c) => (
            <span
              key={c.id}
              className="confetti-piece"
              style={{
                left: c.left,
                width: c.size,
                height: c.size * (c.round ? 1 : 0.5),
                backgroundColor: c.color,
                borderRadius: c.round ? '50%' : '2px',
                animationDelay: c.delay,
                animationDuration: c.duration,
              }}
            />
          ))}
        </div>

        <div className="relative py-6">
          <OtterMascot size={110} wave className="mx-auto animate-float" />
          <h2 className="mt-4 font-display text-4xl font-extrabold text-otter-800">
            You did it! 🎉
          </h2>
          <p className="mx-auto mt-3 max-w-md text-lg font-semibold text-slate-500">
            Today's journal page is saved in your Den. Ollie is doing a happy wiggle just for
            you!
          </p>
          <div className="mx-auto mt-5 flex max-w-sm items-center justify-center gap-4 rounded-2xl bg-otter-50 p-4">
            <span className="text-5xl">{mood?.emoji}</span>
            {draft.selfie && (
              <img
                src={draft.selfie}
                alt="Today's selfie"
                className="h-20 w-20 rounded-2xl border-4 border-white object-cover shadow-pop"
              />
            )}
            <span className="text-5xl">{weather?.emoji}</span>
          </div>

          {/* On this day in history */}
          <div className="mx-auto mt-6 max-w-md rounded-2xl bg-splash-100 p-5 text-left">
            <p className="flex items-center gap-2 font-display text-xl font-extrabold text-amber-700">
              <ScrollText className="h-6 w-6" /> On this day in history…
            </p>
            <p className="mt-2 text-lg font-bold text-slate-700">{historyFactFor(entryKey)}</p>
            <p className="mt-1 text-sm font-extrabold uppercase tracking-wide text-amber-600">
              📅 {historyDateLabel(entryKey)}
            </p>
          </div>

          <button
            onClick={onDone}
            className="btn-chunky mt-6 inline-flex items-center gap-2 bg-otter-500 text-xl text-white hover:bg-otter-600"
          >
            <Home className="h-6 w-6" /> Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <p className="text-center text-lg font-semibold text-slate-500">
        Let's peek at today's page before we tuck it into your Den! 👀
      </p>

      {/* Review card */}
      <div className="rounded-2xl bg-otter-50 p-5">
        <div className="flex items-center gap-4">
          {draft.selfie ? (
            <img
              src={draft.selfie}
              alt="Today's selfie"
              className="h-24 w-24 rounded-2xl border-4 border-white object-cover shadow-pop"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-otter-100 text-4xl">
              🦦
            </div>
          )}
          <div className="font-bold text-slate-600">
            <p className="font-display text-xl font-extrabold text-otter-800">
              {mood?.emoji} {mood?.label} {weather?.emoji} {weather?.label}
            </p>
            {draft.breakfast && <p>🍽️ Breakfast: {draft.breakfast}</p>}
            <p>🌡️ {tempWord(draft.temperature)} ({draft.temperature}°F)</p>
            <p className="mt-1 text-sm italic text-slate-400">"{draft.selfiePrompt}"</p>
          </div>
        </div>
        <div className="mt-4 space-y-3 text-left">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-wide text-otter-600">
              You picked
            </p>
            <p className="font-bold text-slate-700">{draft.mc}</p>
          </div>
          <div>
            <p className="text-sm font-extrabold uppercase tracking-wide text-otter-600">
              {questions.reflection}
            </p>
            <p className="font-bold text-slate-700">{draft.reflection}</p>
          </div>
          <div>
            <p className="text-sm font-extrabold uppercase tracking-wide text-otter-600">
              {questions.reflection2}
            </p>
            <p className="font-bold text-slate-700">{draft.reflection2}</p>
          </div>
          <div>
            <p className="text-sm font-extrabold uppercase tracking-wide text-otter-600">
              {questions.fun}
            </p>
            <p className="font-bold text-slate-700">{draft.fun}</p>
          </div>
          <div>
            <p className="text-sm font-extrabold uppercase tracking-wide text-otter-600">
              ⭐ Quick favorites
            </p>
            <p className="font-bold text-slate-700">
              {questions.fav1} — {draft.fav1}
            </p>
            <p className="font-bold text-slate-700">
              {questions.fav2} — {draft.fav2}
            </p>
          </div>
        </div>
      </div>

      {saveError && (
        <p className="flex items-center justify-center gap-2 rounded-2xl bg-red-100 px-4 py-3 font-bold text-red-700">
          <AlertTriangle className="h-5 w-5" />
          Oh no — the page wouldn't save (storage might be full). Try removing an old selfie from
          the Den, then save again.
        </p>
      )}

      <div className="text-center">
        <button
          onClick={handleSave}
          className="btn-chunky inline-flex items-center gap-2 bg-splash-400 text-2xl text-otter-900 hover:bg-splash-500"
        >
          <Save className="h-7 w-7" /> Save my journal!
        </button>
        <p className="mt-3 flex items-center justify-center gap-1 text-sm font-bold text-slate-400">
          <PartyPopper className="h-4 w-4" /> Something worth celebrating is coming…
        </p>
      </div>
    </div>
  )
}
