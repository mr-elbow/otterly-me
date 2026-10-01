import { useCallback, useEffect, useRef, useState } from 'react'
import { Camera, RefreshCw, SkipForward, Dices, ImageOff } from 'lucide-react'
import { SELFIE_PROMPTS } from '../../data/banks.js'

/**
 * Step 2 — the daily selfie. Uses the device camera via getUserMedia,
 * downsizes the snapshot to keep localStorage happy, and degrades
 * gracefully when the camera is unavailable or permission is denied.
 */
export default function Step2Selfie({ draft, setDraft }) {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | starting | live | snapped | denied | error | unsupported

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
    if (videoRef.current) videoRef.current.srcObject = null
  }, [])

  const startCamera = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus('unsupported')
      return
    }
    setStatus('starting')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 } },
        audio: false,
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play().catch(() => {})
      }
      setStatus('live')
    } catch (err) {
      setStatus(err?.name === 'NotAllowedError' ? 'denied' : 'error')
    }
  }, [])

  useEffect(() => {
    // If there's already a saved selfie (e.g. editing), don't auto-start.
    if (!draft.selfie) startCamera()
    else setStatus('snapped')
    return () => stopStream()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const shufflePrompt = () =>
    setDraft((d) => ({ ...d, selfiePrompt: SELFIE_PROMPTS[Math.floor(Math.random() * SELFIE_PROMPTS.length)] }))

  const snap = () => {
    const video = videoRef.current
    if (!video || !video.videoWidth) return
    const maxW = 480
    const scale = Math.min(1, maxW / video.videoWidth)
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(video.videoWidth * scale)
    canvas.height = Math.round(video.videoHeight * scale)
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
    setDraft((d) => ({ ...d, selfie: canvas.toDataURL('image/jpeg', 0.82) }))
    stopStream()
    setStatus('snapped')
  }

  const retake = () => {
    setDraft((d) => ({ ...d, selfie: null }))
    startCamera()
  }

  return (
    <div className="space-y-5 text-center">
      {/* Goofy prompt banner */}
      <div className="rounded-2xl bg-splash-100 p-4">
        <p className="text-sm font-extrabold uppercase tracking-wide text-orange-500">
          Today's goofy challenge
        </p>
        <p className="mt-1 font-display text-2xl font-extrabold text-otter-900">{draft.selfiePrompt}</p>
        <button
          onClick={shufflePrompt}
          className="mt-2 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-bold text-otter-700 shadow-pop transition-transform hover:scale-105"
        >
          <Dices className="h-4 w-4" /> New challenge
        </button>
      </div>

      {/* Camera area */}
      {status === 'live' || status === 'starting' ? (
        <div className="relative overflow-hidden rounded-3xl border-4 border-otter-200 bg-slate-900">
          <video
            ref={videoRef}
            playsInline
            muted
            className="aspect-[4/3] w-full -scale-x-100 object-cover"
          />
          {status === 'starting' && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60">
              <p className="animate-pulse font-display text-xl font-bold text-white">
                Waking up the camera…
              </p>
            </div>
          )}
        </div>
      ) : status === 'snapped' && draft.selfie ? (
        <div className="overflow-hidden rounded-3xl border-4 border-otter-200">
          <img src={draft.selfie} alt="Your goofy selfie" className="aspect-[4/3] w-full object-cover" />
        </div>
      ) : (
        <div className="rounded-3xl border-4 border-dashed border-otter-200 bg-otter-50 p-8">
          <ImageOff className="mx-auto h-12 w-12 text-otter-300" />
          {status === 'denied' && (
            <>
              <p className="mt-3 font-display text-xl font-extrabold text-otter-800">
                No worries — camera shy today!
              </p>
              <p className="mt-1 font-semibold text-slate-500">
                The camera permission was blocked, so we can't take a selfie. You can still finish
                your journal without one!
              </p>
            </>
          )}
          {status === 'error' && (
            <>
              <p className="mt-3 font-display text-xl font-extrabold text-otter-800">
                Hmm, the camera didn't want to play.
              </p>
              <p className="mt-1 font-semibold text-slate-500">
                Something went wrong starting the camera. You can try again or skip the selfie.
              </p>
            </>
          )}
          {status === 'unsupported' && (
            <>
              <p className="mt-3 font-display text-xl font-extrabold text-otter-800">
                This device has no camera to use.
              </p>
              <p className="mt-1 font-semibold text-slate-500">
                No problem — your journal works great without a selfie too!
              </p>
            </>
          )}
          {(status === 'denied' || status === 'error') && (
            <button
              onClick={startCamera}
              className="btn-chunky mt-4 inline-flex items-center gap-2 bg-otter-500 text-lg text-white hover:bg-otter-600"
            >
              <RefreshCw className="h-5 w-5" /> Try the camera again
            </button>
          )}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        {(status === 'live' || status === 'starting') && (
          <button
            onClick={snap}
            disabled={status !== 'live'}
            className="btn-chunky flex items-center gap-2 bg-splash-400 text-xl text-otter-900 hover:bg-splash-500 disabled:opacity-50"
          >
            <Camera className="h-6 w-6" /> Snap it!
          </button>
        )}
        {status === 'snapped' && (
          <button
            onClick={retake}
            className="btn-chunky flex items-center gap-2 bg-white text-xl text-otter-700"
          >
            <RefreshCw className="h-6 w-6" /> Retake
          </button>
        )}
        <p className="flex w-full items-center justify-center gap-1 text-sm font-bold text-slate-400">
          <SkipForward className="h-4 w-4" /> Selfies are optional — hit Next whenever you're ready.
        </p>
      </div>
    </div>
  )
}
