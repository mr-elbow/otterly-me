import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Step1Vitals from './Step1Vitals.jsx'
import Step2Selfie from './Step2Selfie.jsx'
import Step3Questions from './Step3Questions.jsx'
import Step4Celebration from './Step4Celebration.jsx'
import { MC_QUESTIONS, REFLECTION_QUESTIONS, FUN_QUESTIONS, FAVORITES_QUESTIONS, SELFIE_PROMPTS } from '../../data/banks.js'
import { pickForDay, todayKey } from '../../lib/storage.js'

const STEP_META = [
  { title: 'The Vitals', emoji: '🌤️' },
  { title: 'Selfie Time', emoji: '📸' },
  { title: "Today's Questions", emoji: '💭' },
  { title: 'Celebrate!', emoji: '🎉' },
]

function randomPrompt() {
  return SELFIE_PROMPTS[Math.floor(Math.random() * SELFIE_PROMPTS.length)]
}

export default function Wizard({ store, onSave, onExit }) {
  const key = todayKey()
  const existing = store.entries[key]

  // Questions rotate daily; an in-progress edit keeps the original questions.
  const questions = useMemo(
    () =>
      existing?.questions ?? {
        mc: pickForDay(MC_QUESTIONS),
        reflection: pickForDay(REFLECTION_QUESTIONS, 5),
        reflection2: pickForDay(REFLECTION_QUESTIONS, 9),
        fun: pickForDay(FUN_QUESTIONS, 11),
        fav1: pickForDay(FAVORITES_QUESTIONS, 2),
        fav2: pickForDay(FAVORITES_QUESTIONS, 8),
      },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const [draft, setDraft] = useState(() => ({
    weather: existing?.weather ?? '',
    breakfast: existing?.breakfast ?? '',
    mood: existing?.mood ?? '',
    selfie: existing?.selfie ?? null,
    selfiePrompt: existing?.selfiePrompt ?? randomPrompt(),
    mc: existing?.answers?.mc?.choice ?? '',
    reflection: existing?.answers?.reflection?.text ?? '',
    reflection2: existing?.answers?.reflection2?.text ?? '',
    fun: existing?.answers?.fun?.text ?? '',
    fav1: existing?.answers?.favorites?.[0]?.text ?? '',
    fav2: existing?.answers?.favorites?.[1]?.text ?? '',
  }))
  const [step, setStep] = useState(1)
  const [nudge, setNudge] = useState('')

  const canContinue = () => {
    if (step === 1) return draft.weather !== '' && draft.mood !== ''
    if (step === 2) return true // selfie is optional — skipping is okay
    if (step === 3)
      return (
        draft.mc !== '' &&
        draft.reflection.trim() !== '' &&
        draft.reflection2.trim() !== '' &&
        draft.fun.trim() !== '' &&
        draft.fav1.trim() !== '' &&
        draft.fav2.trim() !== ''
      )
    return true
  }

  const next = () => {
    if (!canContinue()) {
      setNudge(
        step === 1
          ? 'Pick the weather and your mood to keep going! 🌤️'
          : 'Answer all the questions to keep going! 💭',
      )
      return
    }
    setNudge('')
    setStep((s) => Math.min(4, s + 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const back = () => {
    setNudge('')
    setStep((s) => Math.max(1, s - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-16">
      {/* Header row */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={onExit}
          className="flex items-center gap-1 rounded-full bg-white px-4 py-2 font-bold text-slate-500 shadow-pop transition-transform hover:scale-105"
        >
          <ArrowLeft className="h-5 w-5" /> Home
        </button>
        <span className="rounded-full bg-otter-100 px-4 py-2 font-display text-lg font-extrabold text-otter-800">
          {STEP_META[step - 1].emoji} {STEP_META[step - 1].title}
        </span>
      </div>

      {/* Progress dots */}
      <div className="mt-4 flex items-center justify-center gap-3">
        {STEP_META.map((s, i) => (
          <div key={s.title} className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full font-display text-lg font-extrabold transition-all ${
                i + 1 < step
                  ? 'bg-otter-500 text-white'
                  : i + 1 === step
                    ? 'scale-110 bg-splash-400 text-otter-900 shadow-pop'
                    : 'bg-white text-slate-300'
              }`}
            >
              {i + 1 < step ? '✓' : i + 1}
            </div>
            {i < STEP_META.length - 1 && <div className="h-1 w-8 rounded-full bg-otter-100" />}
          </div>
        ))}
      </div>

      {/* Step body */}
      <div className="card mt-6 animate-pop-in p-6 sm:p-8" key={step}>
        {step === 1 && <Step1Vitals draft={draft} setDraft={setDraft} />}
        {step === 2 && <Step2Selfie draft={draft} setDraft={setDraft} />}
        {step === 3 && <Step3Questions draft={draft} setDraft={setDraft} questions={questions} />}
        {step === 4 && (
          <Step4Celebration
            draft={draft}
            questions={questions}
            entryKey={key}
            existing={existing}
            onSave={onSave}
            onDone={onExit}
          />
        )}
      </div>

      {/* Nav buttons */}
      {step < 4 && (
        <div className="mt-6">
          {nudge && (
            <p className="mb-3 animate-pop-in rounded-2xl bg-splash-100 px-4 py-3 text-center font-bold text-orange-700">
              {nudge}
            </p>
          )}
          <div className="flex justify-between">
            <button
              onClick={back}
              disabled={step === 1}
              className="btn-chunky flex items-center gap-2 bg-white text-xl text-slate-500 disabled:opacity-40"
            >
              <ArrowLeft className="h-6 w-6" /> Back
            </button>
            <button
              onClick={next}
              className="btn-chunky flex items-center gap-2 bg-otter-500 text-xl text-white hover:bg-otter-600"
            >
              Next <ArrowRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
