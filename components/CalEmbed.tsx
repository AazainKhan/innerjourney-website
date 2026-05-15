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
// Fallback colour used if the CSS variable somehow isn't readable at mount
// (SSR, the layout style block hasn't been applied yet, etc.). Mirrors the
// current default accent.
const CAL_BRAND_FALLBACK = '#e89ab8'

// Read the current accent colour off the live `<html>` element. This is set
// by layout.tsx from `content/theme.json` AND updated in real-time by
// ThemePreviewListener when an editor is dragging colours around in Theme
// Studio, so the Cal widget colour will always track the rest of the site.
function readBrandColor(): string {
  if (typeof window === 'undefined') return CAL_BRAND_FALLBACK
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--azure-blue')
    .trim()
  return raw || CAL_BRAND_FALLBACK
}

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
      const brand = readBrandColor()
      cal('ui', {
        cssVarsPerTheme: {
          light: { 'cal-brand': brand },
          dark: { 'cal-brand': brand },
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
