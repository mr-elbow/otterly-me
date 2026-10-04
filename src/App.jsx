import { useCallback, useState } from 'react'
import { House } from 'lucide-react'
import Home from './components/Home.jsx'
import Wizard from './components/wizard/Wizard.jsx'
import Den from './components/Den.jsx'
import OtterMascot from './components/OtterMascot.jsx'
import { loadStore, saveStore, deleteEntry } from './lib/storage.js'

export default function App() {
  const [view, setView] = useState('home') // home | wizard | den
  const [store, setStore] = useState(loadStore)
  // Which wizard step to open at (1 = start, 4 = jump to bedtime page)
  const [wizardStep, setWizardStep] = useState(1)
  const [wizardKey, setWizardKey] = useState(0)

  const openWizard = (step = 1) => {
    setWizardStep(step)
    setWizardKey((k) => k + 1)
    setView('wizard')
  }

  // Persist helper: writes to state + localStorage, returns success boolean.
  const persist = useCallback((next) => {
    setStore(next)
    return saveStore(next)
  }, [])

  const handleWizardSave = useCallback(
    (upsertFn, key, entry) => persist(upsertFn(store, key, entry)),
    [store, persist],
  )

  const handleDelete = useCallback(
    (key) => persist(deleteEntry(store, key)),
    [store, persist],
  )

  const goHome = () => {
    setView('home')
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b-4 border-otter-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-2xl items-center justify-between px-4 py-2">
          <button onClick={goHome} className="flex items-center gap-2">
            <OtterMascot size={44} />
            <h1 className="font-display text-2xl font-extrabold text-otter-700">
              Otterly Me!
            </h1>
          </button>
          {view !== 'home' && (
            <button
              onClick={goHome}
              aria-label="Go home"
              className="rounded-full bg-otter-100 p-2.5 text-otter-700 shadow-pop transition-transform hover:scale-105"
            >
              <House className="h-6 w-6" />
            </button>
          )}
        </div>
      </header>

      <main>
        {view === 'home' && (
          <Home
            store={store}
            onStartJournal={openWizard}
            onOpenDen={() => setView('den')}
          />
        )}
        {view === 'wizard' && (
          <Wizard
            key={wizardKey}
            initialStep={wizardStep}
            store={store}
            onSave={handleWizardSave}
            onExit={goHome}
          />
        )}
        {view === 'den' && (
          <Den store={store} onBack={goHome} onDelete={handleDelete} />
        )}
      </main>

      {/* Wave footer decoration */}
      <div className="waves h-16 w-full" aria-hidden />
    </div>
  )
}
