import { useState } from 'react'
import { Pencil, Plus, X, Check } from 'lucide-react'
import { countEntries } from '../lib/storage.js'

/** "Whose journal?" — switch between kid journals, rename one, or start a new one. */
export default function JournalSwitcher({ profiles, activeId, onSelect, onRename, onAdd, onClose }) {
  const [editingId, setEditingId] = useState(null)
  const [draftName, setDraftName] = useState('')

  const startEdit = (p) => {
    setEditingId(p.id)
    setDraftName(p.name || '')
  }

  const saveEdit = () => {
    const name = draftName.trim()
    if (name && editingId) onRename(editingId, name)
    setEditingId(null)
  }
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-otter-900/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-label="Switch journal"
    >
      <div className="card w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl font-extrabold text-otter-800">Whose journal?</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full bg-otter-100 p-2 text-otter-700 transition-transform hover:scale-105"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-4 grid gap-3">
          {profiles.map((p) => {
            const isActive = p.id === activeId
            const count = countEntries(p.id)
            return (
              <button
                key={p.id}
                onClick={() => onSelect(p.id)}
                className={`flex items-center gap-3 rounded-2xl border-4 p-3 text-left transition-transform hover:scale-[1.02] ${
                  isActive ? 'border-otter-400 bg-otter-50' : 'border-transparent bg-slate-50'
                }`}
              >
                <span className="font-handwritten flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-otter-200 text-3xl text-otter-800">
                  {(p.name || '?').charAt(0).toUpperCase()}
                </span>
                <span className="flex-1">
                  {editingId === p.id ? (
                    <span className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <input
                        autoFocus
                        value={draftName}
                        onChange={(e) => setDraftName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveEdit()
                          if (e.key === 'Escape') setEditingId(null)
                        }}
                        maxLength={24}
                        aria-label="Journal name"
                        className="font-handwritten w-full rounded-xl border-2 border-otter-300 bg-white px-2 py-1 text-3xl text-otter-800 focus:border-otter-500 focus:outline-none"
                      />
                      <button
                        onClick={saveEdit}
                        aria-label="Save name"
                        className="rounded-full bg-otter-500 p-2 text-white transition-transform hover:scale-105"
                      >
                        <Check className="h-5 w-5" />
                      </button>
                    </span>
                  ) : (
                    <>
                      <span className="font-handwritten block text-3xl leading-tight text-otter-800">
                        {p.name || 'Unnamed journal'}
                      </span>
                      <span className="text-sm font-bold text-slate-400">
                        {count} {count === 1 ? 'entry' : 'entries'}
                      </span>
                    </>
                  )}
                </span>
                {editingId !== p.id && (
                  <button
                    onClick={(e) => { e.stopPropagation(); startEdit(p) }}
                    aria-label={`Rename ${p.name || 'journal'}`}
                    className="rounded-full bg-slate-100 p-2 text-slate-500 transition-transform hover:scale-105 hover:text-otter-600"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                )}
                {isActive && editingId !== p.id && <span className="text-2xl text-otter-600">✓</span>}
              </button>
            )
          })}
        </div>
        <button
          onClick={onAdd}
          className="btn-chunky mt-4 flex w-full items-center justify-center gap-2 bg-splash-400 text-xl text-otter-900 hover:bg-splash-500"
        >
          <Plus className="h-6 w-6" /> New journal
        </button>
      </div>
    </div>
  )
}
