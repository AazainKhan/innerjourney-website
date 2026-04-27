'use client'

import { useEffect } from 'react'
import { useTina } from 'tinacms/dist/react'

interface ThemeData {
  theme?: {
    primaryColor?: string | null
    secondaryColor?: string | null
    accentColor?: string | null
    neutralColor?: string | null
  } | null
}

interface Props {
  query: string
  variables: { relativePath: string }
  data: ThemeData
}

function hexToRgbTriplet(hex: string): string {
  const cleaned = hex.replace('#', '').trim()
  const expanded = cleaned.length === 3 ? cleaned.split('').map((c) => c + c).join('') : cleaned.slice(0, 6)
  if (!/^[0-9a-fA-F]{6}$/.test(expanded)) return '0 0 0'
  const r = parseInt(expanded.slice(0, 2), 16)
  const g = parseInt(expanded.slice(2, 4), 16)
  const b = parseInt(expanded.slice(4, 6), 16)
  return `${r} ${g} ${b}`
}

/**
 * Live-applies theme color edits to :root CSS variables while the editor is open
 * in the Tina admin iframe. Gives instant visual feedback as you drag the color
 * picker — no save / refresh required.
 *
 * On the public site the layout has already injected the same variables
 * server-side, so this just re-asserts the same values (no flash, no jank).
 */
export default function ThemeApplier(props: Props) {
  const { data } = useTina<ThemeData>(props)
  const t = data?.theme

  useEffect(() => {
    if (!t) return
    const root = document.documentElement.style
    if (t.primaryColor) {
      root.setProperty('--carrot-orange', t.primaryColor)
      root.setProperty('--carrot-rgb', hexToRgbTriplet(t.primaryColor))
      root.setProperty('--primary', t.primaryColor)
    }
    if (t.secondaryColor) {
      root.setProperty('--oxford-blue', t.secondaryColor)
      root.setProperty('--oxford-rgb', hexToRgbTriplet(t.secondaryColor))
      root.setProperty('--secondary', t.secondaryColor)
    }
    if (t.accentColor) {
      root.setProperty('--azure-blue', t.accentColor)
      root.setProperty('--azure-rgb', hexToRgbTriplet(t.accentColor))
      root.setProperty('--brand-azure', t.accentColor)
    }
    if (t.neutralColor) {
      root.setProperty('--platinum', t.neutralColor)
      root.setProperty('--platinum-rgb', hexToRgbTriplet(t.neutralColor))
      root.setProperty('--accent', t.neutralColor)
    }
  }, [t?.primaryColor, t?.secondaryColor, t?.accentColor, t?.neutralColor, t])

  return null
}
