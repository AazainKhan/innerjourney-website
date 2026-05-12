'use client'

import { useEffect } from 'react'
import { hexToRgbTriplet, pickForeground } from '@/lib/color-utils'

interface PreviewPayload {
  type: 'theme-preview' | 'theme-preview-reset'
  colors?: {
    primaryColor?: string
    secondaryColor?: string
    accentColor?: string
    neutralColor?: string
  }
}

const ALL_VARS = [
  '--carrot-orange', '--carrot-rgb', '--primary',
  '--oxford-blue', '--oxford-rgb', '--secondary',
  '--azure-blue', '--azure-rgb', '--brand-azure',
  '--platinum', '--platinum-rgb', '--accent',
  '--text-on-primary', '--text-on-secondary', '--text-on-accent',
  '--text-on-primary-rgb', '--text-on-secondary-rgb', '--text-on-accent-rgb',
]

export default function ThemePreviewListener() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window === window.top) return

    function onMessage(e: MessageEvent<PreviewPayload>) {
      if (e.origin !== window.location.origin) return
      const data = e.data
      if (!data || (data.type !== 'theme-preview' && data.type !== 'theme-preview-reset')) return

      const root = document.documentElement.style

      if (data.type === 'theme-preview-reset') {
        for (const p of ALL_VARS) root.removeProperty(p)
        return
      }

      const c = data.colors || {}
      if (c.primaryColor) {
        const fg = pickForeground(c.primaryColor)
        root.setProperty('--carrot-orange', c.primaryColor)
        root.setProperty('--carrot-rgb', hexToRgbTriplet(c.primaryColor))
        root.setProperty('--primary', c.primaryColor)
        root.setProperty('--text-on-primary', fg)
        root.setProperty('--text-on-primary-rgb', hexToRgbTriplet(fg))
      }
      if (c.secondaryColor) {
        const fg = pickForeground(c.secondaryColor)
        root.setProperty('--oxford-blue', c.secondaryColor)
        root.setProperty('--oxford-rgb', hexToRgbTriplet(c.secondaryColor))
        root.setProperty('--secondary', c.secondaryColor)
        root.setProperty('--text-on-secondary', fg)
        root.setProperty('--text-on-secondary-rgb', hexToRgbTriplet(fg))
      }
      if (c.accentColor) {
        const fg = pickForeground(c.accentColor)
        root.setProperty('--azure-blue', c.accentColor)
        root.setProperty('--azure-rgb', hexToRgbTriplet(c.accentColor))
        root.setProperty('--brand-azure', c.accentColor)
        root.setProperty('--text-on-accent', fg)
        root.setProperty('--text-on-accent-rgb', hexToRgbTriplet(fg))
      }
      if (c.neutralColor) {
        root.setProperty('--platinum', c.neutralColor)
        root.setProperty('--platinum-rgb', hexToRgbTriplet(c.neutralColor))
        root.setProperty('--accent', c.neutralColor)
      }
    }

    window.addEventListener('message', onMessage)
    // Handshake: tell the parent we're ready to receive previews. Without this,
    // the parent's iframe.onLoad can fire before this listener mounts (React
    // hydration happens after HTML load), and the first postMessage gets lost.
    try {
      window.top?.postMessage({ type: 'theme-preview-ready' }, window.location.origin)
    } catch {
      // top might be cross-origin; safe to ignore
    }
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return null
}
