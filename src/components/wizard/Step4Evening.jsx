import { MoonStar, PenLine, PartyPopper, Plus, X } from 'lucide-react'

const KIND_ICON = {
  evening: MoonStar,
  reflection: PenLine,
  fun: PartyPopper,
}

/**
 * Bedtime page — the optional 4th page of questions. Starts with one
 * evening question; more can be added with "+". Nothing here is required.
 */
export default function Step4Evening({ eveningQs, onAdd, onRemove, onText }) {
  return (
    <div className="space-y-8">
      <p className="text-center text-lg font-semibold text-slate-500">
        One last question before you go 🌙
        <br />
        <span className="text-base">None of these are required — answer whatever you like!</span>
      </p>

      {eveningQs.map((e, i) => {
        const Icon = KIND_ICON[e.kind] ?? MoonStar
        return (
          <div key={`${e.q}-${i}`} className="rounded-2xl bg-otter-50 p-5">
            <div className="mb-3 flex items-start justify-between gap-2">
              <p className="flex items-start gap-2 font-display text-xl font-extrabold text-otter-800">
                <Icon className="mt-1 h-6 w-6 shrink-0 text-otter-600" />
                {e.q}
              </p>
              <button
                type="button"
                onClick={() => onRemove(i)}
                aria-label="Remove this question"
                title="Remove this question"
                className="shrink-0 rounded-full bg-white p-1.5 text-slate-300 shadow-sm transition-colors hover:text-red-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <textarea
              value={e.text}
              onChange={(ev) => onText(i, ev.target.value)}
              placeholder={
                e.kind === 'fun' ? 'Let your imagination run wild…' : 'Write a sentence or two…'
              }
              rows={3}
              maxLength={500}
              className="input-chunky resize-none"
            />
          </div>
        )
      })}

      <div>
        <button
          type="button"
          onClick={onAdd}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border-4 border-dashed border-otter-200 bg-white/60 p-5 font-display text-xl font-extrabold text-otter-500 transition-all hover:scale-[1.01] hover:border-otter-400 hover:text-otter-700 active:scale-[0.99]"
        >
          <Plus className="h-7 w-7" /> Add another question
        </button>
        <p className="mt-2 text-center text-sm font-bold text-slate-400">
          Ollie will pick one — sometimes thoughtful, sometimes silly!
        </p>
      </div>
    </div>
  )
}
