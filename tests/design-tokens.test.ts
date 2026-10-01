import { describe, expect, it } from 'vitest'
import {
  GRADIENT_PRESETS,
  GRADIENT_PRESET_KEYS,
  TONES,
  cardSurface,
  gradientClasses,
  normalizeGradient,
  normalizeTone,
  podcastGlow,
  postCardLook,
  toneClasses,
} from '@/lib/design-tokens'

describe('normalizeTone', () => {
  it('passes tone names through', () => {
    for (const t of TONES) expect(normalizeTone(t)).toBe(t)
  })

  // Every class-string value older content stored, and the tone it means.
  it.each([
    ['border-carrot', 'primary'],
    ['border-azure', 'accent'],
    ['carrot', 'primary'],
    ['azure', 'accent'],
    ['text-carrot', 'primary'],
    ['text-azure', 'accent'],
    ['bg-carrot/10', 'primary'],
    ['bg-azure/10', 'accent'],
    ['bg-carrot', 'primary'],
    ['bg-azure', 'accent'],
    ['text-carrot/40', 'primary'],
    ['text-azure/40', 'accent'],
    ['from-orange-100 to-orange-200', 'primary'],
    ['from-blue-100 to-indigo-200', 'accent'],
    ['from-orange-50 to-white', 'primary'],
    ['from-blue-50 to-white', 'accent'],
    ['from-carrot/30 to-orange-500/30', 'primary'],
    ['oxford', 'secondary'],
  ])('maps legacy %s → %s', (legacy, tone) => {
    expect(normalizeTone(legacy)).toBe(tone)
  })

  it('falls back for empty or unknown values', () => {
    expect(normalizeTone(undefined)).toBe('primary')
    expect(normalizeTone('', 'accent')).toBe('accent')
    expect(normalizeTone('chartreuse', 'secondary')).toBe('secondary')
  })
})

describe('tone class bundles', () => {
  it('gives every tone a full set of literal classes', () => {
    for (const t of TONES) {
      const c = toneClasses(t)
      for (const v of Object.values(c)) expect(v).toMatch(/^[a-z]+-[a-z0-9/-]+$/)
      expect(cardSurface(t).surface).toMatch(/^brand-gradient-/)
      expect(postCardLook(t).gradient).toMatch(/^from-\S+ to-\S+$/)
      expect(podcastGlow(t)).toMatch(/^from-\S+ to-\S+$/)
    }
  })

  it('keeps the service card colours the site already used', () => {
    expect(cardSurface('secondary').surface).toBe('brand-gradient-oxford')
    expect(cardSurface('primary').surface).toBe('brand-gradient-orange')
  })
})

describe('gradient presets', () => {
  it('passes preset keys through and maps legacy class strings', () => {
    for (const k of GRADIENT_PRESET_KEYS) expect(normalizeGradient(k)).toBe(k)
    expect(normalizeGradient('from-orange-500 to-orange-600')).toBe('orange')
    expect(normalizeGradient('from-blue-500 to-blue-600')).toBe('blue')
    expect(normalizeGradient('from-purple-500 to-purple-600')).toBe('purple')
    expect(normalizeGradient('from-amber-500 to-amber-600')).toBe('amber')
    expect(normalizeGradient('nonsense')).toBe('orange')
  })

  it('renders the same classes the About page used before', () => {
    expect(gradientClasses('blue')).toBe(GRADIENT_PRESETS.blue.classes)
    expect(gradientClasses('from-blue-500 to-blue-600')).toBe('from-blue-500 to-blue-600')
  })
})
