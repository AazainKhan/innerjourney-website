'use client'

import { useEffect } from 'react'
import { getCalApi } from '@calcom/embed-react'
import Cal from '@calcom/embed-react'

/**
 * Inline Cal.com booking widget.
 *
 * Activated when NEXT_PUBLIC_CAL_USERNAME is set. The widget renders inside
 * the existing BookingOverlay modal (which is what every BookingButton across
 * the site opens), so every booking touchpoint flows through the same Cal
 * calendar + availability rules.
 *
 * Required env vars on Vercel (Production + Preview):
 *   NEXT_PUBLIC_CAL_USERNAME    e.g. "innerjourneywithshanila-aqysvs"
 *   NEXT_PUBLIC_CAL_EVENT_SLUG  e.g. "discovery-call" (defaults to this)
 *
 * To add more event types later (recurring sessions, paid sessions, etc.):
 * create them in Cal.com → Event Types, then either swap NEXT_PUBLIC_CAL_EVENT_SLUG
 * or extend this component to pick between several event slugs.
 *
 * When NEXT_PUBLIC_CAL_USERNAME is unset, this component renders nothing —
 * the legacy email form in BookingOverlay continues to handle bookings.
 */
const DEFAULT_EVENT_SLUG = 'discovery-call'
// Mirrors the current theme's accent (peach/pink) so the Cal widget visually
// matches the rest of the site. Update if the brand palette changes.
const CAL_BRAND = '#e89ab8'

export default function CalEmbed() {
  const username = process.env.NEXT_PUBLIC_CAL_USERNAME
  const eventSlug = process.env.NEXT_PUBLIC_CAL_EVENT_SLUG || DEFAULT_EVENT_SLUG
  // Use the event slug as the embed namespace so multiple Cal embeds on
  // different pages don't fight over a single namespace registration.
  const namespace = eventSlug

  useEffect(() => {
    if (!username) return
    ;(async () => {
      const cal = await getCalApi({ namespace })
      cal('ui', {
        cssVarsPerTheme: {
          light: { 'cal-brand': CAL_BRAND },
          dark: { 'cal-brand': CAL_BRAND },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      })
    })()
  }, [username, namespace])

  if (!username) return null

  return (
    <Cal
      namespace={namespace}
      calLink={`${username}/${eventSlug}`}
      style={{ width: '100%', height: '600px', overflow: 'scroll' }}
      config={{ layout: 'month_view' }}
    />
  )
}
