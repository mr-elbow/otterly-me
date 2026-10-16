import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Step1Vitals from './Step1Vitals.jsx'
import Step2Selfie from './Step2Selfie.jsx'
import Step3Questions from './Step3Questions.jsx'
import Step4Evening from './Step4Evening.jsx'
import Step5Celebration from './Step5Celebration.jsx'
import {
  MC_QUESTIONS,
  REFLECTION_QUESTIONS,
  FUN_QUESTIONS,
  FAVORITES_QUESTIONS,
  SELFIE_PROMPTS,
  DAY_OFF_QUESTIONS,
  qText,
  noSchoolBank,
} from '../../data/banks.js'
import { pickForDay, todayKey, loadDraft, saveDraft } from '../../lib/storage.js'

const STEP_META = [
  { title: 'The Vitals', emoji: '🌤️' },
  { title: 'Selfie Time', emoji: '📸' },
  { title: "Today's Questions", emoji: '💭' },
  { title: 'Bedtime', emoji: '🌙' },
  { title: 'Celebrate!', emoji: '🎉' },
]

function randomPrompt() {
  return SELFIE_PROMPTS[Math.floor(Math.random() * SELFIE_PROMPTS.length)]
}

// The bedtime page asks this same question every single day.
const BEDTIME_QUESTION = 'What is one thing from today you want to remember when you are grown up?'

export default function Wizard({ store, onSave, onExit, initialStep = 1, profileId }) {
  const key = todayKey()
  const existing = store.entries[key]

  // A draft saved earlier today (then the kid left mid-page) wins over both
  // a saved entry and a fresh start — it's the newest unsaved work.
  // Stale drafts from previous days are ignored by loadDraft.
  const [savedDraft] = useState(() => (profileId ? loadDraft(profileId) : null))
  const d0 = savedDraft?.draft // today's unfinished answers, if any
  const e0 = existing // today's saved entry, if any (reopening to edit)

  // School-day awareness: weekends never ask about school and never show
  // school-tagged questions. On weekdays the kid answers "Did you go to
  // school today?" — "no" filters school questions out and swaps in a
  // day-off follow-up question on the questions page.
  const isWeekend = [0, 6].includes(new Date().getDay())

  const [draft, setDraft] = useState(() => ({
    weather: d0?.weather ?? e0?.weather ?? '',
    breakfast: d0?.breakfast ?? e0?.breakfast ?? '',
    mood: d0?.mood ?? e0?.mood ?? '',
    wentToSchool: d0?.wentToSchool ?? e0?.wentToSchool ?? '',
    selfie: d0?.selfie ?? e0?.selfie ?? null,
    selfiePrompt: d0?.selfiePrompt ?? e0?.selfiePrompt ?? randomPrompt(),
    mc: d0?.mc ?? e0?.answers?.mc?.choice ?? '',
    reflection: d0?.reflection ?? e0?.answers?.reflection?.text ?? '',
    reflection2: d0?.reflection2 ?? e0?.answers?.reflection2?.text ?? '',
    fun: d0?.fun ?? e0?.answers?.fun?.text ?? '',
    fav1: d0?.fav1 ?? e0?.answers?.favorites?.[0]?.text ?? '',
    fav2: d0?.fav2 ?? e0?.answers?.favorites?.[1]?.text ?? '',
  }))

  // True on weekends, or on a weekday the kid said they stayed home.
  // Drives school-question filtering and the day-off follow-up.
  const isNonSchoolDay = isWeekend || draft.wentToSchool === 'no'
  // The day-off follow-up only makes sense on a weekday answered "no"
  // (weekends get the normal mix, just without school questions).
  const showDayOffQ = !isWeekend && draft.wentToSchool === 'no'

  // Questions rotate daily; an in-progress edit keeps the original questions.
  const questions = useMemo(() => {
    const dayOff = qText(pickForDay(DAY_OFF_QUESTIONS, 3))
    // On non-school days, school-tagged questions are filtered out of every bank.
    const pool = (bank) => (isNonSchoolDay ? noSchoolBank(bank) : bank)
    if (existing?.questions) return { ...existing.questions, dayOff }
    return {
      mc: pickForDay(pool(MC_QUESTIONS)),
      reflection: qText(pickForDay(pool(REFLECTION_QUESTIONS), 5)),
      reflection2: qText(pickForDay(pool(REFLECTION_QUESTIONS), 9)),
      fun: qText(pickForDay(pool(FUN_QUESTIONS), 11)),
      fav1: qText(pickForDay(pool(FAVORITES_QUESTIONS), 2)),
      fav2: qText(pickForDay(pool(FAVORITES_QUESTIONS), 8)),
      dayOff,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNonSchoolDay])

  // What the kid actually sees: on a day off, the second reflection slot
  // becomes the day-off follow-up question.
  const displayQuestions = {
    ...questions,
    reflection2: showDayOffQ ? questions.dayOff : questions.reflection2,
  }

  // If the school-day answer flips after questions were picked (the kid went
  // back to step 1 and changed it), the question set changed — clear step-3
  // answers so a stale answer can't be saved under a new question.
  const prevNonSchoolDay = useRef(isNonSchoolDay)
  useEffect(() => {
    if (prevNonSchoolDay.current !== isNonSchoolDay && !existing) {
      setDraft((d) => ({ ...d, mc: '', reflection: '', reflection2: '', fun: '', fav1: '', fav2: '' }))
      setExtraQs([])
    }
    prevNonSchoolDay.current = isNonSchoolDay
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNonSchoolDay])
  // Explicit navigation (e.g. the bedtime shortcut) wins; otherwise resume
  // where the draft left off.
  const [step, setStep] = useState(initialStep !== 1 ? initialStep : (savedDraft?.step ?? 1))
  const [nudge, setNudge] = useState('')

  // Bonus questions added with the "+" button — each is { q, kind, text }.
  // kind alternates: thoughtful, silly, thoughtful, silly…
  // Bonus questions added with the "+" button — each is { q, kind, text }.
  // kind alternates: thoughtful, silly, thoughtful, silly…
  const [extraQs, setExtraQs] = useState(() => savedDraft?.extraQs ?? existing?.extraQuestions ?? [])

  // Bedtime page: starts with one evening question; more can be added.
  // Nothing here is required. Reopening a saved entry keeps answered ones.
  const [eveningQs, setEveningQs] = useState(() =>
    savedDraft?.eveningQs ??
    (existing?.eveningQuestions?.length
      ? existing.eveningQuestions
      : [{ q: BEDTIME_QUESTION, kind: 'evening', text: '' }]),
  )

  // Autosave: every change — a tap, a typed letter, a page turn — is written
  // straight to this journal's draft slot so nothing is ever lost mid-page.
  useEffect(() => {
    if (!profileId) return
    saveDraft(profileId, { step, draft, extraQs, eveningQs })
  }, [profileId, step, draft, extraQs, eveningQs])

  const usedQuestionTexts = () =>
    new Set([
      displayQuestions.mc.q,
      displayQuestions.reflection,
      displayQuestions.reflection2,
      displayQuestions.fun,
      displayQuestions.fav1,
      displayQuestions.fav2,
      ...extraQs.map((e) => e.q),
      ...eveningQs.map((e) => e.q),
    ])

  // Pick the next bonus question for a list, alternating thoughtful/silly
  // based on what's already there so removals never break the cycle.
  // Bonus picks respect the school-day filter too.
  const pickBonusQuestion = (list) => {
    const reflectionCount = list.filter((e) => e.kind === 'reflection').length
    const funCount = list.filter((e) => e.kind === 'fun').length
    const kind = reflectionCount <= funCount ? 'reflection' : 'fun'
    const rawBank = kind === 'reflection' ? REFLECTION_QUESTIONS : FUN_QUESTIONS
    const bank = isNonSchoolDay ? noSchoolBank(rawBank) : rawBank
    const used = usedQuestionTexts()
    let offset = kind === 'reflection' ? 13 : 17
    let q = qText(pickForDay(bank, offset + list.length * 7))
    let guard = 0
    while (used.has(q) && guard < bank.length) {
      offset += 1
      q = qText(pickForDay(bank, offset + list.length * 7))
      guard += 1
    }
    return { q, kind, text: '' }
  }

  const addExtraQuestion = () => setExtraQs((prev) => [...prev, pickBonusQuestion(prev)])
  const removeExtraQuestion = (index) => setExtraQs((prev) => prev.filter((_, i) => i !== index))
  const setExtraText = (index, text) =>
    setExtraQs((prev) => prev.map((e, i) => (i === index ? { ...e, text } : e)))

  const addEveningQuestion = () => setEveningQs((prev) => [...prev, pickBonusQuestion(prev)])
  const removeEveningQuestion = (index) => setEveningQs((prev) => prev.filter((_, i) => i !== index))
  const setEveningText = (index, text) =>
    setEveningQs((prev) => prev.map((e, i) => (i === index ? { ...e, text } : e)))

  const canContinue = () => {
    if (step === 1)
      return draft.weather !== '' && draft.mood !== '' && (isWeekend || draft.wentToSchool !== '')
    if (step === 2) return true // selfie is optional — skipping is okay
    if (step === 3)
      return (
        draft.mc !== '' &&
        draft.reflection.trim() !== '' &&
        draft.reflection2.trim() !== '' &&
        draft.fun.trim() !== '' &&
        draft.fav1.trim() !== '' &&
        draft.fav2.trim() !== '' &&
        extraQs.every((e) => e.text.trim() !== '')
      )
    if (step === 4) return true // bedtime page is all optional
    return true
  }

  const next = () => {
    if (!canContinue()) {
      setNudge(
        step === 1
          ? !isWeekend && draft.wentToSchool === ''
            ? 'Did you go to school today? Tap Yes or No! 🏫'
            : 'Pick the weather and your mood to keep going! 🌤️'
          : 'Answer all the questions to keep going! 💭',
      )
      return
    }
    setNudge('')
    setStep((s) => Math.min(5, s + 1))
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
        {step === 1 && <Step1Vitals draft={draft} setDraft={setDraft} showSchoolQ={!isWeekend} />}
        {step === 2 && <Step2Selfie draft={draft} setDraft={setDraft} />}
        {step === 3 && (
          <Step3Questions
            draft={draft}
            setDraft={setDraft}
            questions={displayQuestions}
            extraQs={extraQs}
            onAddExtra={addExtraQuestion}
            onRemoveExtra={removeExtraQuestion}
            onExtraText={setExtraText}
          />
        )}
        {step === 4 && (
          <Step4Evening
            eveningQs={eveningQs}
            onAdd={addEveningQuestion}
            onRemove={removeEveningQuestion}
            onText={setEveningText}
          />
        )}
        {step === 5 && (
          <Step5Celebration
            draft={draft}
            questions={displayQuestions}
            extraQs={extraQs}
            eveningQs={eveningQs}
            entryKey={key}
            existing={existing}
            onSave={onSave}
            onDone={onExit}
          />
        )}
      </div>

      {/* Nav buttons */}
      {step < 5 && (
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
