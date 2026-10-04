import { ListChecks, PenLine, PartyPopper, Heart, Plus, X } from 'lucide-react'

export default function Step3Questions({
  draft,
  setDraft,
  questions,
  extraQs,
  onAddExtra,
  onRemoveExtra,
  onExtraText,
}) {
  const set = (patch) => setDraft((d) => ({ ...d, ...patch }))

  return (
    <div className="space-y-8">
      <p className="text-center text-lg font-semibold text-slate-500">
        Today's questions, picked fresh just for you! 💭
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

      {/* Reflection 2 */}
      <div className="rounded-2xl bg-otter-50 p-5">
        <p className="mb-3 flex items-start gap-2 font-display text-xl font-extrabold text-otter-800">
          <PenLine className="mt-1 h-6 w-6 shrink-0 text-otter-600" />
          {questions.reflection2}
        </p>
        <textarea
          value={draft.reflection2}
          onChange={(e) => set({ reflection2: e.target.value })}
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

      {/* Quick favorites */}
      <div className="rounded-2xl bg-otter-50 p-5">
        <p className="mb-1 flex items-center gap-2 font-display text-xl font-extrabold text-otter-800">
          <Heart className="h-6 w-6 text-otter-600" /> Quick favorites
        </p>
        <p className="mb-4 text-sm font-bold text-slate-400">
          Answer in just a word or two — fun to look back on these later!
        </p>
        <label className="mb-1 block font-bold text-slate-600">{questions.fav1}</label>
        <input
          type="text"
          value={draft.fav1}
          onChange={(e) => set({ fav1: e.target.value })}
          placeholder="Type it here…"
          maxLength={80}
          className="input-chunky"
        />
        <label className="mb-1 mt-4 block font-bold text-slate-600">{questions.fav2}</label>
        <input
          type="text"
          value={draft.fav2}
          onChange={(e) => set({ fav2: e.target.value })}
          placeholder="Type it here…"
          maxLength={80}
          className="input-chunky"
        />
      </div>

      {/* Bonus questions added with "+" */}
      {extraQs.map((e, i) => (
        <div key={`${e.q}-${i}`} className="rounded-2xl bg-otter-50 p-5">
          <div className="mb-3 flex items-start justify-between gap-2">
            <p className="flex items-start gap-2 font-display text-xl font-extrabold text-otter-800">
              {e.kind === 'reflection' ? (
                <PenLine className="mt-1 h-6 w-6 shrink-0 text-otter-600" />
              ) : (
                <PartyPopper className="mt-1 h-6 w-6 shrink-0 text-otter-600" />
              )}
              {e.q}
            </p>
            <button
              type="button"
              onClick={() => onRemoveExtra(i)}
              aria-label="Remove this question"
              title="Remove this question"
              className="shrink-0 rounded-full bg-white p-1.5 text-slate-300 shadow-sm transition-colors hover:text-red-400"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <textarea
            value={e.text}
            onChange={(ev) => onExtraText(i, ev.target.value)}
            placeholder={e.kind === 'reflection' ? 'Write a sentence or two…' : 'Let your imagination run wild…'}
            rows={3}
            maxLength={500}
            className="input-chunky resize-none"
          />
        </div>
      ))}

      {/* Add another question */}
      <div>
        <button
          type="button"
          onClick={onAddExtra}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border-4 border-dashed border-otter-200 bg-white/60 p-5 font-display text-xl font-extrabold text-otter-500 transition-all hover:scale-[1.01] hover:border-otter-400 hover:text-otter-700 active:scale-[0.99]"
        >
          <Plus className="h-7 w-7" /> Add another question
        </button>
        <p className="mt-2 text-center text-sm font-bold text-slate-400">
          Ollie will pick one for you — sometimes thoughtful, sometimes silly!
        </p>
      </div>
    </div>
  )
}
