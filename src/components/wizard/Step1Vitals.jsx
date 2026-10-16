import { CloudSun, Croissant, Smile, School } from 'lucide-react'
import { WEATHER_OPTIONS, MOOD_OPTIONS, BREAKFAST_SUGGESTIONS } from '../../data/banks.js'

export default function Step1Vitals({ draft, setDraft, showSchoolQ }) {
  const set = (patch) => setDraft((d) => ({ ...d, ...patch }))

  return (
    <div className="space-y-8">
      <p className="text-center text-lg font-semibold text-slate-500">
        Let's check in! Tell Ollie about your day. 🦦
      </p>

      {/* School day check — weekdays only */}
      {showSchoolQ && (
        <div>
          <label className="mb-2 flex items-center gap-2 font-display text-xl font-extrabold text-otter-800">
            <School className="h-6 w-6 text-otter-600" /> Did you go to school today?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'yes', emoji: '🎒', label: 'Yes!' },
              { id: 'no', emoji: '🏠', label: 'Nope' },
            ].map((o) => {
              const active = draft.wentToSchool === o.id
              return (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => set({ wentToSchool: o.id })}
                  aria-pressed={active}
                  className={`flex items-center justify-center gap-2 rounded-2xl border-4 px-4 py-4 font-display text-2xl font-extrabold transition-all active:translate-y-0.5 ${
                    active
                      ? 'border-splash-400 bg-splash-100 text-otter-900 shadow-pop'
                      : 'border-white bg-white text-slate-600 shadow-pop hover:border-otter-200'
                  }`}
                >
                  <span className="text-3xl">{o.emoji}</span> {o.label}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Weather dropdown */}
      <div>
        <label className="mb-2 flex items-center gap-2 font-display text-xl font-extrabold text-otter-800">
          <CloudSun className="h-6 w-6 text-otter-600" /> What's the weather like?
        </label>
        <select
          value={draft.weather}
          onChange={(e) => set({ weather: e.target.value })}
          className="input-chunky cursor-pointer appearance-none text-xl"
        >
          <option value="" disabled>
            Pick one… ⛅
          </option>
          {WEATHER_OPTIONS.map((w) => (
            <option key={w.id} value={w.id}>
              {w.emoji} {w.label}
            </option>
          ))}
        </select>
      </div>

      {/* Breakfast input + suggestions */}
      <div>
        <label className="mb-2 flex items-center gap-2 font-display text-xl font-extrabold text-otter-800">
          <Croissant className="h-6 w-6 text-otter-600" /> What did you have for breakfast?
        </label>
        <input
          type="text"
          value={draft.breakfast}
          onChange={(e) => set({ breakfast: e.target.value })}
          placeholder="Yummy pancakes with syrup…"
          maxLength={80}
          className="input-chunky"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {BREAKFAST_SUGGESTIONS.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => set({ breakfast: b.replace(/^\S+\s/, '') })}
              className="rounded-full bg-otter-100 px-4 py-2 font-bold text-otter-800 transition-transform hover:scale-105 active:scale-95"
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Mood picker */}
      <div>
        <label className="mb-2 flex items-center gap-2 font-display text-xl font-extrabold text-otter-800">
          <Smile className="h-6 w-6 text-otter-600" /> How are you feeling right now?
        </label>
        <div className="grid grid-cols-4 gap-3">
          {MOOD_OPTIONS.map((m) => {
            const active = draft.mood === m.id
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => set({ mood: m.id })}
                title={m.label}
                aria-label={m.label}
                aria-pressed={active}
                className={`mood-btn flex flex-col items-center gap-1 ${
                  active
                    ? 'border-splash-400 bg-splash-100 scale-105'
                    : 'border-otter-100 hover:border-otter-300'
                }`}
              >
                <span>{m.emoji}</span>
                <span className="text-xs font-extrabold text-slate-500">{m.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
