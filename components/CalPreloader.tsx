'use client'

import { useEffect } from 'react'
import { getCalApi } from '@calcom/embed-react'

/**
 * Global Cal.com initialiser.
 *
 * Does two things, once per page load:
 *
 *  1. `cal('ui', …)` — registers the brand colour + default layout for any
 *     Cal embed that opens later. We read the current `--azure-blue` CSS var
 *     so theme changes from Theme Studio flow through automatically.
 *
 *  2. `cal('preload', …)` — warms the iframe in the background so the first
 *     "Book a Free Discovery Call" click feels instant instead of waiting on
 *     a cold connection to app.cal.com.
 *
 * Booking is triggered by BookingContext.openBooking(), which calls
 * `cal('modal', …)`. Cal handles its own modal chrome + sizing — we don't
 * try to embed it inline anymore (Cal's inline iframe auto-grows past
 * whatever container we give it, so the modal-mode native popup fits the
 * viewport much more gracefully).
 */

const DEFAULT_EVENT_SLUG = 'discovery-call'
const CAL_BRAND_FALLBACK = '#e89ab8'

function readBrandColor(): string {
  if (typeof window === 'undefined') return CAL_BRAND_FALLBACK
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--azure-blue')
    .trim()
  return raw || CAL_BRAND_FALLBACK
}

export default function CalPreloader() {
  useEffect(() => {
    const username = process.env.NEXT_PUBLIC_CAL_USERNAME
    const eventSlug = process.env.NEXT_PUBLIC_CAL_EVENT_SLUG || DEFAULT_EVENT_SLUG
    if (!username) return
    // Cal's preload pulls ~1.9 MB of scripts and fonts. Starting it during
    // page load competed with the hero heading/image on slow phones (LCP of
    // 14 s on mobile). Warm it on the visitor's first interaction instead, or
    // a few seconds after the page has finished loading.
    const INTERACTIONS = ['pointerdown', 'touchstart', 'keydown', 'scroll', 'mousemove'] as const
    let started = false
    let timer: number | undefined
    const run = () => {
      if (started) return
      started = true
      INTERACTIONS.forEach((e) => window.removeEventListener(e, run))
      window.removeEventListener('load', scheduleAfterLoad)
      window.clearTimeout(timer)
      warmCal(username, eventSlug)
    }
    const scheduleAfterLoad = () => { timer = window.setTimeout(run, 8000) }
    INTERACTIONS.forEach((e) => window.addEventListener(e, run, { once: true, passive: true }))
    if (document.readyState === 'complete') scheduleAfterLoad()
    else window.addEventListener('load', scheduleAfterLoad, { once: true })
    return () => {
      INTERACTIONS.forEach((e) => window.removeEventListener(e, run))
      window.removeEventListener('load', scheduleAfterLoad)
      window.clearTimeout(timer)
    }
  }, [])

  return null
}

function warmCal(username: string, eventSlug: string) {
  ;(async () => {
    try {
      const cal = await getCalApi({ namespace: eventSlug })
      const brand = readBrandColor()
      cal('ui', {
        cssVarsPerTheme: {
          light: { 'cal-brand': brand },
          dark: { 'cal-brand': brand },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      })
      cal('preload', { calLink: `${username}/${eventSlug}` })
    } catch {
      // Best-effort. The actual booking flow still works on cold load.
    }
  })()
}
