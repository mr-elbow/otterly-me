import { ListChecks, PenLine, PartyPopper } from 'lucide-react'

export default function Step3Questions({ draft, setDraft, questions }) {
  const set = (patch) => setDraft((d) => ({ ...d, ...patch }))

  return (
    <div className="space-y-8">
      <p className="text-center text-lg font-semibold text-slate-500">
        Three questions, picked fresh just for today! 💭
      </p>

      {/* Multiple choice */}
      <div className="rounded-2xl bg-otter-50 p-5">
        <p className="mb-3 flex items-start gap-2 font-display text-xl font-extrabold text-otter-800">
          <ListChecks className="mt-1 h-6 w-6 shrink-0 text-otter-600" />
          {questions.mc.q}
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {questions.mc.options.map((opt) => {
            const active = draft.mc === opt
            return (
              <button
                key={opt}
                type="button"
                onClick={() => set({ mc: opt })}
                aria-pressed={active}
                className={`rounded-2xl border-4 px-4 py-3 text-left font-bold transition-all active:translate-y-0.5 ${
                  active
                    ? 'border-splash-400 bg-splash-100 text-otter-900 shadow-pop'
                    : 'border-white bg-white text-slate-600 shadow-pop hover:border-otter-200'
                }`}
              >
                {opt}
              </button>
            )
          })}
        </div>
      </div>

      {/* Reflection */}
      <div className="rounded-2xl bg-otter-50 p-5">
        <p className="mb-3 flex items-start gap-2 font-display text-xl font-extrabold text-otter-800">
          <PenLine className="mt-1 h-6 w-6 shrink-0 text-otter-600" />
          {questions.reflection}
        </p>
        <textarea
          value={draft.reflection}
          onChange={(e) => set({ reflection: e.target.value })}
          placeholder="Write a sentence or two…"
          rows={3}
          maxLength={500}
          className="input-chunky resize-none"
        />
      </div>

      {/* Fun prompt */}
      <div className="rounded-2xl bg-otter-50 p-5">
        <p className="mb-3 flex items-start gap-2 font-display text-xl font-extrabold text-otter-800">
          <PartyPopper className="mt-1 h-6 w-6 shrink-0 text-otter-600" />
          {questions.fun}
        </p>
        <textarea
          value={draft.fun}
          onChange={(e) => set({ fun: e.target.value })}
          placeholder="Let your imagination run wild…"
          rows={3}
          maxLength={500}
          className="input-chunky resize-none"
        />
      </div>
    </div>
  )
}
