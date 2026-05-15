'use client'

import { useEffect, useRef, useState } from 'react'

// Storage key bumped from v1 → v2 because the state shape changed: v1 stored
// `dismissed` with a 14-day window; v2 stores `minimized` (no expiry — visitor
// can re-open from the sticky button any time) or `subscribed` (permanent
// silence). Old v1 values are left in storage harmlessly; they no longer drive
// any logic.
const STORAGE_KEY = 'newsletter_popup_state_v2'
const AUTO_OPEN_DELAY_MS = 8000

type PopupState =
  | { kind: 'subscribed' }
  | { kind: 'minimized' }

// The sticky pill is visible from the first frame so visitors aren't staring
// at a blank corner during the auto-open delay. After AUTO_OPEN_DELAY_MS the
// full panel auto-opens (once per browser, then 'minimized' is persisted).
type Mode = 'hidden' | 'open' | 'minimized'

function readState(): PopupState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as PopupState
    if (parsed && (parsed.kind === 'subscribed' || parsed.kind === 'minimized')) return parsed
    return null
  } catch {
    return null
  }
}

function writeState(state: PopupState) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Storage may be disabled; the popup will just reappear next session,
    // which is acceptable degraded behaviour.
  }
}

export default function NewsletterPopup() {
  // Default to 'minimized' so the sticky pill is visible from the first
  // render — no flash-of-nothing during the auto-open delay. On mount we may
  // demote to 'hidden' (already subscribed) or schedule the auto-open.
  const [mode, setMode] = useState<Mode>('minimized')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [alreadySubscribed, setAlreadySubscribed] = useState(false)
  const [error, setError] = useState('')
  // Timer ref so manual interaction (open/minimize/subscribe) can cancel the
  // pending auto-open and avoid reopening a panel the user just closed.
  const autoOpenTimer = useRef<number | null>(null)

  function clearAutoOpenTimer() {
    if (autoOpenTimer.current !== null) {
      window.clearTimeout(autoOpenTimer.current)
      autoOpenTimer.current = null
    }
  }

  // Decide initial mode on mount:
  // - subscribed → stay hidden forever
  // - minimized  → already showing as the sticky button; no auto-open
  // - first visit → keep the sticky button, schedule auto-open after the delay
  useEffect(() => {
    const state = readState()
    if (state?.kind === 'subscribed') {
      setMode('hidden')
      return
    }
    if (state?.kind === 'minimized') {
      // Sticky pill stays — already the default state, nothing to schedule.
      return
    }
    autoOpenTimer.current = window.setTimeout(() => {
      // Record the "we've used our auto-open chance" persistently so a
      // returning visitor doesn't get another surprise pop-open.
      writeState({ kind: 'minimized' })
      setMode('open')
      autoOpenTimer.current = null
    }, AUTO_OPEN_DELAY_MS)
    return () => clearAutoOpenTimer()
  }, [])

  // Escape minimises the open panel (rather than dismissing outright — the
  // sticky button is still there for re-entry).
  useEffect(() => {
    if (mode !== 'open') return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') minimize()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  function minimize() {
    clearAutoOpenTimer()
    writeState({ kind: 'minimized' })
    setMode('minimized')
  }

  function open() {
    clearAutoOpenTimer()
    setMode('open')
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value
    const website = (form.elements.namedItem('website') as HTMLInputElement)?.value
    if (!email) return
    setStatus('submitting')
    setError('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website }),
      })
      const data = await res.json().catch(() => ({} as { error?: string; alreadySubscribed?: boolean }))
      if (res.ok && (data as { success?: boolean }).success !== false) {
        clearAutoOpenTimer()
        setAlreadySubscribed(Boolean((data as { alreadySubscribed?: boolean }).alreadySubscribed))
        setStatus('success')
        writeState({ kind: 'subscribed' })
      } else {
        setStatus('error')
        setError((data as { error?: string }).error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setError('Something went wrong. Please try again.')
    }
  }

  if (mode === 'hidden') return null

  if (mode === 'minimized') {
    return (
      <button
        type="button"
        onClick={open}
        aria-label="Open newsletter signup"
        title="Stay in the loop"
        className="group fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 bg-carrot text-on-primary rounded-full shadow-2xl ring-1 ring-black/10 px-4 py-3 sm:px-5 sm:py-3 transition-all duration-200 hover:scale-105 hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.4)]"
      >
        <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-base">
          <i className="fas fa-envelope-open-text"></i>
        </span>
        <span className="text-sm font-semibold tracking-tight">Subscribe</span>
      </button>
    )
  }

  // mode === 'open'
  return (
    <div
      className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 z-50 max-w-sm w-auto sm:w-[22rem] transition-all duration-300 ease-out"
      role="dialog"
      aria-labelledby="newsletter-popup-title"
    >
      <div className="bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-hidden">
        <div className="brand-gradient-oxford-azure px-5 py-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-carrot/20 flex items-center justify-center text-carrot">
              <i className="fas fa-envelope-open-text"></i>
            </span>
            <h2 id="newsletter-popup-title" className="text-on-secondary font-semibold text-base leading-tight">
              Stay in the loop
            </h2>
          </div>
          <button
            onClick={minimize}
            aria-label="Minimise newsletter popup"
            className="text-on-secondary/70 hover:text-on-secondary text-lg leading-none -mt-1 -mr-1 px-2 py-1"
          >
            <i className="fas fa-minus"></i>
          </button>
        </div>

        <div className="p-5">
          {status === 'success' ? (
            <div className="text-center py-2">
              <i className="fas fa-check-circle text-carrot text-2xl mb-2"></i>
              {alreadySubscribed ? (
                <>
                  <p className="text-gray-800 font-semibold mb-1">You&apos;re already on the list</p>
                  <p className="text-gray-600 text-sm">Stay tuned — new resources are on the way.</p>
                </>
              ) : (
                <>
                  <p className="text-gray-800 font-semibold mb-1">You&apos;re on the list</p>
                  <p className="text-gray-600 text-sm">
                    Watch your inbox for new resources, blog posts, and podcast drops.
                  </p>
                </>
              )}
            </div>
          ) : (
            <>
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                Get new blog posts, podcast episodes, and tools for your inner journey delivered straight to your inbox.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent"
                />
                {/* Honeypot — hidden from humans, bots fill it. */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-carrot hover:brightness-110 text-on-primary px-4 py-2.5 rounded-lg text-sm font-semibold transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
                </button>
                {status === 'error' && error && (
                  <p className="text-red-600 text-xs">{error}</p>
                )}
                <p className="text-gray-400 text-[11px] text-center mt-1">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
