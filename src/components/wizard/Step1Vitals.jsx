import { CloudSun, Croissant, Smile, Thermometer } from 'lucide-react'
import { WEATHER_OPTIONS, MOOD_OPTIONS, BREAKFAST_SUGGESTIONS } from '../../data/banks.js'
import { tempWord, tempEmoji, TEMP_STOPS } from '../../lib/weather.js'

export default function Step1Vitals({ draft, setDraft }) {
  const set = (patch) => setDraft((d) => ({ ...d, ...patch }))

  return (
    <div className="space-y-8">
      <p className="text-center text-lg font-semibold text-slate-500">
        Let's check in! Tell Ollie about your day. 🦦
      </p>

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

      {/* Temperature slider */}
      <div>
        <label className="mb-2 flex items-center gap-2 font-display text-xl font-extrabold text-otter-800">
          <Thermometer className="h-6 w-6 text-otter-600" /> How does it feel outside?
        </label>
        <div className="rounded-2xl bg-otter-50 p-4">
          <div className="flex items-center justify-center gap-3">
            <span className="text-6xl">{tempEmoji(draft.temperature)}</span>
            <div className="text-left">
              <div className="font-display text-4xl font-extrabold text-otter-800">
                {tempWord(draft.temperature)}!
              </div>
              <div className="text-sm font-bold text-slate-400">
                {draft.temperature}°F
              </div>
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={draft.temperature}
            onChange={(e) => set({ temperature: Number(e.target.value) })}
            aria-label="How the weather feels, from freezing to scorching"
            className="mt-3 w-full accent-teal-500"
          />
          <div className="mt-2 flex items-start justify-between">
            {TEMP_STOPS.map((s) => {
              const active = Math.round(draft.temperature / 25) * 25 === s.temp
              return (
                <button
                  key={s.temp}
                  type="button"
                  onClick={() => set({ temperature: s.temp })}
                  aria-label={`${s.label}, ${s.temp} degrees`}
                  className={`flex w-16 flex-col items-center rounded-xl p-1 transition-all ${
                    active ? 'scale-110 bg-white shadow-pop' : 'opacity-60'
                  }`}
                >
                  <span className="text-2xl leading-none">{s.emoji}</span>
                  <span className="mt-1 text-center text-[11px] font-extrabold leading-tight text-slate-500">
                    {s.label}
                  </span>
                </button>
              )
            })}
          </div>
          <p className="mt-2 text-center text-sm font-bold text-slate-400">
            Slide it — or just tap how it feels! 👆
          </p>
        </div>
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
