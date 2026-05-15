'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'newsletter_popup_state_v1'
const DISMISS_DURATION_MS = 14 * 24 * 60 * 60 * 1000 // 14 days
const APPEAR_DELAY_MS = 8000

type PopupState =
  | { kind: 'subscribed'; at: number }
  | { kind: 'dismissed'; at: number }

function readState(): PopupState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as PopupState
    if (parsed && typeof parsed.at === 'number') return parsed
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
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    const state = readState()
    // Subscribers are silenced forever; dismissals expire after the window.
    if (state?.kind === 'subscribed') return
    if (state?.kind === 'dismissed' && Date.now() - state.at < DISMISS_DURATION_MS) return

    const timer = window.setTimeout(() => setVisible(true), APPEAR_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [])

  // Escape key closes the popup.
  useEffect(() => {
    if (!visible) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  function close() {
    setClosing(true)
    writeState({ kind: 'dismissed', at: Date.now() })
    window.setTimeout(() => {
      setVisible(false)
      setClosing(false)
    }, 250)
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
      const data = await res.json().catch(() => ({} as { error?: string }))
      if (res.ok && (data as { success?: boolean }).success !== false) {
        setStatus('success')
        writeState({ kind: 'subscribed', at: Date.now() })
      } else {
        setStatus('error')
        setError((data as { error?: string }).error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setError('Something went wrong. Please try again.')
    }
  }

  if (!visible) return null

  return (
    <div
      className={`fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 z-50 max-w-sm w-auto sm:w-[22rem] transition-all duration-300 ease-out ${
        closing ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
      }`}
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
            onClick={close}
            aria-label="Close newsletter popup"
            className="text-on-secondary/70 hover:text-on-secondary text-lg leading-none -mt-1 -mr-1 px-2 py-1"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="p-5">
          {status === 'success' ? (
            <div className="text-center py-2">
              <i className="fas fa-check-circle text-carrot text-2xl mb-2"></i>
              <p className="text-gray-800 font-semibold mb-1">You&apos;re on the list</p>
              <p className="text-gray-600 text-sm">
                Watch your inbox for new resources, blog posts, and podcast drops.
              </p>
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
