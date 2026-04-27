'use client'

import { useEffect } from 'react'
import { getCalApi } from '@calcom/embed-react'
import Cal from '@calcom/embed-react'

/**
 * Inline Cal.com booking widget.
 *
 * Activated when NEXT_PUBLIC_CAL_USERNAME is set. Visit cal.com, create a
 * Free Clarity Call event type (e.g. "free-clarity-call"), then set:
 *   NEXT_PUBLIC_CAL_USERNAME=shanila
 *   NEXT_PUBLIC_CAL_EVENT_SLUG=free-clarity-call
 * in Vercel project Environment Variables (Production + Preview).
 *
 * When unset, this component renders nothing — the legacy email form in
 * BookingOverlay continues to handle bookings.
 */
export default function CalEmbed() {
  const username = process.env.NEXT_PUBLIC_CAL_USERNAME
  const eventSlug = process.env.NEXT_PUBLIC_CAL_EVENT_SLUG || 'free-clarity-call'

  useEffect(() => {
    if (!username) return
    ;(async () => {
      const cal = await getCalApi({ namespace: 'free-clarity-call' })
      cal('ui', {
        cssVarsPerTheme: {
          light: { 'cal-brand': '#237bea' },
          dark: { 'cal-brand': '#237bea' },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      })
    })()
  }, [username])

  if (!username) return null

  return (
    <Cal
      namespace="free-clarity-call"
      calLink={`${username}/${eventSlug}`}
      style={{ width: '100%', height: '600px', overflow: 'scroll' }}
      config={{ layout: 'month_view' }}
    />
  )
}
