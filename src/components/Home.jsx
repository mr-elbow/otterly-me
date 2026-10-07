import { useState } from 'react'
import { Flame, PencilLine, BookOpenText, Camera, Sparkles, Lock } from 'lucide-react'
import OtterMascot from './OtterMascot.jsx'
import JournalSwitcher from './JournalSwitcher.jsx'
import { calcStreak, shortDateLabel, todayKey } from '../lib/storage.js'
import { MOOD_OPTIONS, WEATHER_OPTIONS } from '../data/banks.js'

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function Home({ store, profile, profiles, onSelectProfile, onAddJournal, onStartJournal, onOpenDen }) {
  const key = todayKey()
  const today = store.entries[key]
  const streak = calcStreak(store.entries)
  const total = Object.keys(store.entries).length
  const selfies = Object.values(store.entries).filter((e) => e.selfie).length
  const todayMood = MOOD_OPTIONS.find((m) => m.id === today?.mood)
  const todayWeather = WEATHER_OPTIONS.find((w) => w.id === today?.weather)
  const [showSwitcher, setShowSwitcher] = useState(false)

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-16">
      {/* Hero */}
      <section className="card mt-6 p-6 text-center sm:p-8">
        {/* Bookplate */}
        <div className="mb-3">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">
            This journal belongs to
          </p>
          <p className="font-handwritten -rotate-2 text-5xl leading-tight text-otter-700">
            {profile?.name}
          </p>
        </div>
        <div className="flex justify-center">
          <OtterMascot size={110} wave className="animate-float" />
        </div>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-otter-800 sm:text-4xl">
          {greeting()}, superstar!
        </h2>
        <p className="mt-2 text-lg font-semibold text-slate-500">
          Ready to make today's page <span className="text-otter-600">otterly</span> amazing?
        </p>

        {/* Streak */}
        <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full bg-splash-100 px-5 py-2 shadow-pop">
          <Flame className="h-6 w-6 text-orange-500" fill="#fdba74" />
          <span className="font-display text-xl font-extrabold text-orange-600">
            {streak} day{streak === 1 ? '' : 's'} in a row!
          </span>
        </div>

        {/* Big action buttons */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <button
            onClick={() => onStartJournal(1)}
            className="btn-chunky flex items-center justify-center gap-3 bg-otter-500 text-2xl text-white hover:bg-otter-600"
          >
            <PencilLine className="h-7 w-7" />
            {today ? "Today's Journal ✓" : "Start Today's Journal"}
          </button>
          <button
            onClick={onOpenDen}
            className="btn-chunky flex items-center justify-center gap-3 bg-splash-400 text-2xl text-otter-900 hover:bg-splash-500"
          >
            <BookOpenText className="h-7 w-7" />
            The Den
          </button>
        </div>

        {today && (
          <div className="mt-5 rounded-2xl bg-otter-50 p-4 text-left">
            <p className="font-display text-lg font-bold text-otter-800">
              <Sparkles className="mr-1 inline h-5 w-5" />
              You already journaled today — nice work!
            </p>
            <p className="mt-1 text-slate-600">
              {todayMood ? `${todayMood.emoji} Feeling ${todayMood.label.toLowerCase()}` : ''}
              {todayWeather ? ` · ${todayWeather.emoji} ${todayWeather.label}` : ''}
              {today.breakfast ? ` · Breakfast: ${today.breakfast}` : ''}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-400">
              Tap the journal button above if you want to add or change anything.
            </p>
            <button
              onClick={() => onStartJournal(4)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-100 px-4 py-3 font-display text-lg font-extrabold text-indigo-700 transition-transform hover:scale-[1.02] active:scale-95"
            >
              🌙 Add bedtime thoughts
            </button>
          </div>
        )}
      </section>

      {/* Stats */}
      <section className="mt-6 grid grid-cols-3 gap-3">
        {[
          { icon: <PencilLine className="h-6 w-6" />, value: total, label: 'Entries' },
          { icon: <Camera className="h-6 w-6" />, value: selfies, label: 'Selfies' },
          { icon: <Flame className="h-6 w-6" />, value: streak, label: 'Day streak' },
        ].map((s) => (
          <div key={s.label} className="card flex flex-col items-center p-4 text-otter-700">
            {s.icon}
            <span className="font-display text-3xl font-extrabold">{s.value}</span>
            <span className="text-sm font-bold text-slate-500">{s.label}</span>
          </div>
        ))}
      </section>

      {/* Recent mini-strip */}
      {total > 0 && (
        <section className="card mt-6 p-5">
          <h3 className="font-display text-xl font-extrabold text-otter-800">Recent pages</h3>
          <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
            {Object.keys(store.entries)
              .sort()
              .reverse()
              .slice(0, 6)
              .map((k) => {
                const e = store.entries[k]
                const mood = MOOD_OPTIONS.find((m) => m.id === e.mood)
                return (
                  <button
                    key={k}
                    onClick={onOpenDen}
                    className="flex w-24 shrink-0 flex-col items-center rounded-2xl bg-otter-50 p-3 transition-transform hover:scale-105"
                  >
                    {e.selfie ? (
                      <img src={e.selfie} alt="selfie" className="h-16 w-16 rounded-xl object-cover" />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-otter-100 text-3xl">
                        {mood?.emoji ?? '🦦'}
                      </div>
                    )}
                    <span className="mt-1 text-xs font-bold text-slate-500">{shortDateLabel(k)}</span>
                  </button>
                )
              })}
          </div>
        </section>
      )}

      <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm font-semibold text-slate-400">
        <Lock className="h-4 w-4" />
        Your journal lives only on this device. No accounts, no uploads — just you.
      </p>

      <div className="mt-4 text-center">
        <button
          onClick={() => setShowSwitcher(true)}
          className="text-base font-bold text-slate-400 underline decoration-dotted underline-offset-4 hover:text-otter-600"
        >
          📚 Switch journal
        </button>
      </div>

      {showSwitcher && (
        <JournalSwitcher
          profiles={profiles}
          activeId={profile?.id}
          onSelect={(id) => { setShowSwitcher(false); onSelectProfile(id) }}
          onAdd={() => { setShowSwitcher(false); onAddJournal() }}
          onClose={() => setShowSwitcher(false)}
        />
      )}
    </div>
  )
}
