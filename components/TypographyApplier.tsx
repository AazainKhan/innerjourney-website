'use client'

import { useEffect } from 'react'
import { useTina } from 'tinacms/dist/react'

interface TypographyData {
  typography?: {
    headingFont?: string | null
    headingWeight?: string | null
    headingStyle?: string | null
    bodyFont?: string | null
    bodyWeight?: string | null
    baseFontSize?: number | null
  } | null
}

interface Props {
  query: string
  variables: { relativePath: string }
  data: TypographyData
}

const FONT_VAR: Record<string, string> = {
  caslon: 'var(--font-caslon)',
  dancing: 'var(--font-dancing)',
  titillium: 'var(--font-titillium)',
}

/**
 * Live-applies typography edits to :root CSS variables while the editor is open
 * in the Tina admin iframe. Mirrors ThemeApplier so dragging dropdowns / changing
 * fonts updates the iframe instantly — no save / refresh required.
 */
export default function TypographyApplier(props: Props) {
  const { data } = useTina<TypographyData>(props)
  const t = data?.typography

  useEffect(() => {
    if (!t) return
    const root = document.documentElement.style
    const heading = FONT_VAR[(t.headingFont || 'caslon') as keyof typeof FONT_VAR] || FONT_VAR.caslon
    const body = FONT_VAR[(t.bodyFont || 'titillium') as keyof typeof FONT_VAR] || FONT_VAR.titillium
    root.setProperty('--heading-font', heading)
    root.setProperty('--heading-weight', t.headingWeight || '400')
    root.setProperty('--heading-style', t.headingStyle || 'normal')
    root.setProperty('--body-font', body)
    root.setProperty('--body-weight', t.bodyWeight || '400')
    root.setProperty('--body-size', `${t.baseFontSize || 16}px`)
  }, [t?.headingFont, t?.headingWeight, t?.headingStyle, t?.bodyFont, t?.bodyWeight, t?.baseFontSize, t])

  return null
}
