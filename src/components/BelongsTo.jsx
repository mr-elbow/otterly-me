import { useState } from 'react'
import OtterMascot from './OtterMascot.jsx'

/**
 * "This journal belongs to ____" — the kid writes their name on the dotted
 * line (in a handwritten font, like signing a real diary) and claims the journal.
 */
export default function BelongsTo({ heading, submitLabel, onSubmit, onCancel }) {
  const [name, setName] = useState('')
  const trimmed = name.trim()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (trimmed) onSubmit(trimmed)
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 items-center justify-center px-4 py-10">
      <form onSubmit={handleSubmit} className="card w-full p-8 text-center sm:p-10">
        <OtterMascot size={96} wave className="mx-auto animate-float" />
        {heading && (
          <h2 className="mt-3 font-display text-2xl font-extrabold text-otter-800 sm:text-3xl">
            {heading}
          </h2>
        )}
        <p className="mt-5 text-sm font-bold uppercase tracking-[0.3em] text-slate-400">
          This journal belongs to
        </p>
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="write your name here"
          maxLength={24}
          aria-label="Your name"
          autoComplete="off"
          className="font-handwritten mt-3 w-full border-b-4 border-dashed border-otter-300 bg-transparent pb-1 text-center text-6xl text-otter-700 placeholder:text-slate-300 focus:border-otter-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!trimmed}
          className="btn-chunky mt-8 bg-otter-500 text-2xl text-white hover:bg-otter-600 disabled:opacity-40"
        >
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="mt-4 block w-full text-lg font-bold text-slate-400 hover:text-slate-600"
          >
            ← Never mind
          </button>
        )}
        <p className="mt-6 text-sm font-semibold text-slate-400">
          🔒 This name stays on this device, just like everything in your journal.
        </p>
      </form>
    </div>
  )
}
