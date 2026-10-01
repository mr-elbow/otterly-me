import { useState } from 'react'
import { ArrowLeft, Trash2, BookOpenText, CalendarDays } from 'lucide-react'
import OtterMascot from './OtterMascot.jsx'
import { dateLabel, shortDateLabel } from '../lib/storage.js'
import { MOOD_OPTIONS, WEATHER_OPTIONS } from '../data/banks.js'

/**
 * The Den — the archive of past journal entries. Browse the shelf,
 * open any page to re-read it, or remove one.
 */
export default function Den({ store, onBack, onDelete }) {
  const [openKey, setOpenKey] = useState(null)
  const keys = Object.keys(store.entries).sort().reverse()

  const confirmDelete = (key) => {
    if (window.confirm('Really remove this journal page? It will be gone forever! 🦦💦')) {
      onDelete(key)
      setOpenKey(null)
    }
  }

  const moodOf = (e) => MOOD_OPTIONS.find((m) => m.id === e.mood)
  const weatherOf = (e) => WEATHER_OPTIONS.find((w) => w.id === e.weather)

  // Detail view for one entry
  if (openKey && store.entries[openKey]) {
    const e = store.entries[openKey]
    const mood = moodOf(e)
    const weather = weatherOf(e)
    return (
      <div className="mx-auto w-full max-w-2xl px-4 pb-16">
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => setOpenKey(null)}
            className="flex items-center gap-1 rounded-full bg-white px-4 py-2 font-bold text-slate-500 shadow-pop transition-transform hover:scale-105"
          >
            <ArrowLeft className="h-5 w-5" /> The Den
          </button>
          <button
            onClick={() => confirmDelete(openKey)}
            className="flex items-center gap-1 rounded-full bg-red-100 px-4 py-2 font-bold text-red-600 shadow-pop transition-transform hover:scale-105"
          >
            <Trash2 className="h-5 w-5" /> Remove
          </button>
        </div>

        <article className="card mt-6 animate-pop-in p-6 sm:p-8">
          <p className="flex items-center gap-2 font-bold text-slate-400">
            <CalendarDays className="h-5 w-5" /> {dateLabel(openKey)}
          </p>
          <h2 className="mt-1 font-display text-3xl font-extrabold text-otter-800">
            {mood?.emoji} {mood?.label} day {weather?.emoji}
          </h2>

          {e.selfie && (
            <figure className="mt-5">
              <img
                src={e.selfie}
                alt={`Selfie from ${shortDateLabel(openKey)}`}
                className="w-full rounded-3xl border-4 border-otter-100 object-cover"
              />
              <figcaption className="mt-2 text-center font-bold italic text-slate-400">
                Challenge was: "{e.selfiePrompt}"
              </figcaption>
            </figure>
          )}

          <dl className="mt-6 space-y-4">
            <div className="rounded-2xl bg-otter-50 p-4">
              <dt className="text-sm font-extrabold uppercase tracking-wide text-otter-600">
                🌤️ Weather
              </dt>
              <dd className="font-display text-xl font-bold text-slate-700">
                {weather ? `${weather.emoji} ${weather.label}` : '—'}
              </dd>
            </div>
            {e.breakfast && (
              <div className="rounded-2xl bg-otter-50 p-4">
                <dt className="text-sm font-extrabold uppercase tracking-wide text-otter-600">
                  🍽️ Breakfast
                </dt>
                <dd className="font-display text-xl font-bold text-slate-700">{e.breakfast}</dd>
              </div>
            )}
            <div className="rounded-2xl bg-otter-50 p-4">
              <dt className="text-sm font-extrabold uppercase tracking-wide text-otter-600">
                {e.answers.mc.q}
              </dt>
              <dd className="mt-1 font-display text-xl font-bold text-slate-700">
                {e.answers.mc.choice}
              </dd>
            </div>
            <div className="rounded-2xl bg-otter-50 p-4">
              <dt className="text-sm font-extrabold uppercase tracking-wide text-otter-600">
                {e.answers.reflection.q}
              </dt>
              <dd className="mt-1 font-bold text-slate-700">{e.answers.reflection.text}</dd>
            </div>
            <div className="rounded-2xl bg-otter-50 p-4">
              <dt className="text-sm font-extrabold uppercase tracking-wide text-otter-600">
                {e.answers.fun.q}
              </dt>
              <dd className="mt-1 font-bold text-slate-700">{e.answers.fun.text}</dd>
            </div>
          </dl>
        </article>
      </div>
    )
  }

  // Shelf view
  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-16">
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1 rounded-full bg-white px-4 py-2 font-bold text-slate-500 shadow-pop transition-transform hover:scale-105"
        >
          <ArrowLeft className="h-5 w-5" /> Home
        </button>
        <span className="rounded-full bg-splash-100 px-4 py-2 font-display text-lg font-extrabold text-orange-600">
          <BookOpenText className="mr-1 inline h-5 w-5" /> The Den
        </span>
      </div>

      {keys.length === 0 ? (
        <div className="card mt-6 p-10 text-center">
          <OtterMascot size={100} className="mx-auto animate-float" />
          <h2 className="mt-4 font-display text-2xl font-extrabold text-otter-800">
            The Den is empty… for now!
          </h2>
          <p className="mt-2 font-semibold text-slate-500">
            Finish your first journal page and it will appear here, cozy and safe. 🦦
          </p>
        </div>
      ) : (
        <>
          <p className="mt-6 text-center font-bold text-slate-500">
            {keys.length} page{keys.length === 1 ? '' : 's'} tucked away safely. Tap one to re-read it!
          </p>
          <div className="den-scroll mt-4 grid max-h-[60vh] gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
            {keys.map((k) => {
              const e = store.entries[k]
              const mood = moodOf(e)
              const weather = weatherOf(e)
              return (
                <button
                  key={k}
                  onClick={() => setOpenKey(k)}
                  className="card flex items-center gap-4 p-4 text-left transition-transform hover:scale-[1.02]"
                >
                  {e.selfie ? (
                    <img
                      src={e.selfie}
                      alt=""
                      className="h-16 w-16 shrink-0 rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-otter-100 text-4xl">
                      {mood?.emoji ?? '🦦'}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-display text-lg font-extrabold text-otter-800">
                      {shortDateLabel(k)}
                    </p>
                    <p className="truncate text-sm font-bold text-slate-500">
                      {mood?.emoji} {mood?.label} · {weather?.emoji} {weather?.label}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
