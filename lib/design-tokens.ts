/**
 * Semantic colour tokens for CMS-driven content.
 *
 * Content files store a *tone* ("primary" / "accent" / "secondary") or a
 * gradient *preset* key — never a Tailwind class. This file is the only place
 * those names become classes, and every class below is written out in full so
 * Tailwind's content scanner can see it (no string concatenation, no safelist).
 *
 * The tones follow Theme Studio's role colours, so they re-colour
 * automatically when the palette changes:
 *   primary   → carrot  (Theme Studio "Primary")
 *   accent    → azure   (Theme Studio "Accent")
 *   secondary → oxford  (Theme Studio "Secondary")
 */

export type Tone = 'primary' | 'accent' | 'secondary'

export const TONES: readonly Tone[] = ['primary', 'accent', 'secondary']

/** What Shanila sees in the Tina tone picker. */
export const TONE_LABELS: Record<Tone, { label: string; hint: string }> = {
  primary: { label: 'Warm', hint: 'Your primary colour' },
  accent: { label: 'Cool', hint: 'Your accent colour' },
  secondary: { label: 'Deep', hint: 'Your dark colour' },
}

/** Theme Studio role each tone reads its swatch colour from. */
export const TONE_THEME_ROLE: Record<Tone, 'primaryColor' | 'accentColor' | 'secondaryColor'> = {
  primary: 'primaryColor',
  accent: 'accentColor',
  secondary: 'secondaryColor',
}

export interface ToneClasses {
  /** Coloured text, e.g. step subtitles. */
  text: string
  /** Solid left/top border colour for accent bars. */
  border: string
  /** Faint border for tinted cards. */
  borderSoft: string
  /** Solid fill, e.g. numbered step circles. */
  bgSolid: string
  /** 10% tint fill, e.g. icon/emoji bubbles. */
  bgSoft: string
  /** Gradient start for a tinted card fading to white. */
  fromTint: string
}

const TONE_CLASSES: Record<Tone, ToneClasses> = {
  primary: {
    text: 'text-carrot',
    border: 'border-carrot',
    borderSoft: 'border-carrot/20',
    bgSolid: 'bg-carrot',
    bgSoft: 'bg-carrot/10',
    fromTint: 'from-carrot/5',
  },
  accent: {
    text: 'text-azure',
    border: 'border-azure',
    borderSoft: 'border-azure/20',
    bgSolid: 'bg-azure',
    bgSoft: 'bg-azure/10',
    fromTint: 'from-azure/5',
  },
  secondary: {
    text: 'text-oxford',
    border: 'border-oxford',
    borderSoft: 'border-oxford/20',
    bgSolid: 'bg-oxford',
    bgSoft: 'bg-oxford/10',
    fromTint: 'from-oxford/5',
  },
}

export function toneClasses(tone: unknown, fallback: Tone = 'primary'): ToneClasses {
  return TONE_CLASSES[normalizeTone(tone, fallback)]
}

/** Service cards (Home + Services pages) — a full "surface" bundle per tone. */
export interface CardSurface {
  surface: string
  text: string
  textSoft: string
  textMuted: string
  buttonText: string
}

const CARD_SURFACES: Record<Tone, CardSurface> = {
  secondary: {
    surface: 'brand-gradient-oxford',
    text: 'text-on-secondary',
    textSoft: 'text-on-secondary/90',
    textMuted: 'text-on-secondary/60',
    buttonText: 'text-oxford',
  },
  primary: {
    surface: 'brand-gradient-orange',
    text: 'text-on-primary',
    textSoft: 'text-on-primary/90',
    textMuted: 'text-on-primary/60',
    buttonText: 'text-carrot',
  },
  accent: {
    surface: 'brand-gradient-azure',
    text: 'text-on-accent',
    textSoft: 'text-on-accent/90',
    textMuted: 'text-on-accent/60',
    buttonText: 'text-azure',
  },
}

export function cardSurface(tone: unknown): CardSurface {
  return CARD_SURFACES[normalizeTone(tone, 'secondary')]
}

/** Blog post card look when there's no cover image. */
export interface PostCardLook {
  gradient: string
  iconColor: string
  badge: string
}

const POST_CARD_LOOKS: Record<Tone, PostCardLook> = {
  primary: { gradient: 'from-orange-100 to-orange-200', iconColor: 'text-carrot/40', badge: 'bg-carrot' },
  accent: { gradient: 'from-blue-100 to-indigo-200', iconColor: 'text-azure/40', badge: 'bg-azure' },
  secondary: { gradient: 'from-oxford/10 to-oxford/25', iconColor: 'text-oxford/40', badge: 'bg-oxford' },
}

export function postCardLook(tone: unknown): PostCardLook {
  return POST_CARD_LOOKS[normalizeTone(tone, 'primary')]
}

/** Podcast episode card glow when there's no cover image. */
const PODCAST_GLOWS: Record<Tone, string> = {
  primary: 'from-carrot/30 to-orange-500/30',
  accent: 'from-azure/30 to-blue-600/30',
  secondary: 'from-oxford/40 to-oxford/70',
}

export function podcastGlow(tone: unknown): string {
  return PODCAST_GLOWS[normalizeTone(tone, 'primary')]
}

/**
 * Accepts a tone name or any legacy class-string value that older content
 * stored (border-carrot, text-azure, bg-azure/10, carrot, orange, oxford…)
 * and returns the matching tone.
 */
export function normalizeTone(value: unknown, fallback: Tone = 'primary'): Tone {
  if (typeof value !== 'string') return fallback
  const v = value.trim().toLowerCase()
  if ((TONES as readonly string[]).includes(v)) return v as Tone
  if (/(carrot|orange|amber|primary|warm)/.test(v)) return 'primary'
  if (/(azure|blue|indigo|accent|cool)/.test(v)) return 'accent'
  if (/(oxford|navy|purple|secondary|deep)/.test(v)) return 'secondary'
  return fallback
}

/* ── Gradient presets (credential badges on the About page) ───────────── */

export type GradientPreset = 'orange' | 'blue' | 'purple' | 'amber' | 'pink' | 'teal'

export const GRADIENT_PRESETS: Record<GradientPreset, { label: string; classes: string; from: string; to: string }> = {
  orange: { label: 'Orange', classes: 'from-orange-500 to-orange-600', from: '#f97316', to: '#ea580c' },
  blue: { label: 'Blue', classes: 'from-blue-500 to-blue-600', from: '#3b82f6', to: '#2563eb' },
  purple: { label: 'Purple', classes: 'from-purple-500 to-purple-600', from: '#a855f7', to: '#9333ea' },
  amber: { label: 'Amber', classes: 'from-amber-500 to-amber-600', from: '#f59e0b', to: '#d97706' },
  pink: { label: 'Pink', classes: 'from-pink-500 to-pink-600', from: '#ec4899', to: '#db2777' },
  teal: { label: 'Teal', classes: 'from-teal-500 to-teal-600', from: '#14b8a6', to: '#0d9488' },
}

export const GRADIENT_PRESET_KEYS = Object.keys(GRADIENT_PRESETS) as GradientPreset[]

/** Accepts a preset key or a legacy "from-x-500 to-x-600" class string. */
export function normalizeGradient(value: unknown, fallback: GradientPreset = 'orange'): GradientPreset {
  if (typeof value !== 'string') return fallback
  const v = value.trim().toLowerCase()
  if (v in GRADIENT_PRESETS) return v as GradientPreset
  const m = v.match(/from-([a-z]+)-\d+/)
  if (m && m[1] in GRADIENT_PRESETS) return m[1] as GradientPreset
  return fallback
}

export function gradientClasses(value: unknown): string {
  return GRADIENT_PRESETS[normalizeGradient(value)].classes
}
