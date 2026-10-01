/**
 * Visual pickers for the Tina editor.
 *
 * These are plain React components (no Tina imports) so they can be unit
 * tested; tina/fields/index.tsx wraps them as Tina field components. They run
 * inside the Tina admin, which does not load the site's Tailwind build, so
 * styling is inline.
 */
import React, { useEffect, useMemo, useState } from 'react'
import { ICONS, ICON_CATEGORIES, getIcon, iconClass, type IconCategory } from '../../lib/icons'
import { EMOJI_GROUPS } from '../../lib/emojis'
import {
  GRADIENT_PRESETS,
  GRADIENT_PRESET_KEYS,
  TONE_LABELS,
  TONE_THEME_ROLE,
  normalizeGradient,
  normalizeTone,
  type Tone,
} from '../../lib/design-tokens'
import theme from '../../content/theme.json'

const FA_HREF = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'

/** The admin doesn't load Font Awesome; add it once so icons render in the picker. */
function useFontAwesome() {
  useEffect(() => {
    if (typeof document === 'undefined') return
    if (document.querySelector(`link[href="${FA_HREF}"]`)) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = FA_HREF
    document.head.appendChild(link)
  }, [])
}

const C = {
  border: '#e1ddec',
  borderStrong: '#b4acc9',
  text: '#303030',
  muted: '#6b6b80',
  selected: '#0084ff',
  selectedBg: '#e6f3ff',
  surface: '#ffffff',
  subtle: '#f6f6f9',
}

const tileBase: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${C.border}`,
  borderRadius: 8,
  background: C.surface,
  cursor: 'pointer',
  color: C.text,
  padding: 0,
}

const selectedRing = (on: boolean): React.CSSProperties =>
  on ? { borderColor: C.selected, background: C.selectedBg, boxShadow: `0 0 0 2px ${C.selected}` } : {}

const linkButton: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: C.selected,
  cursor: 'pointer',
  fontSize: 13,
  fontWeight: 600,
  padding: 0,
}

/* ── Icon picker ──────────────────────────────────────────────────────── */

export interface IconPickerProps {
  value: string
  onChange: (value: string) => void
  /** Limit to some categories (e.g. only Social for footer links). */
  categories?: IconCategory[]
  /** Start with the grid open (tests / empty values). */
  defaultOpen?: boolean
}

export function IconPicker({ value, onChange, categories, defaultOpen }: IconPickerProps) {
  useFontAwesome()
  const [open, setOpen] = useState(Boolean(defaultOpen) || !value)
  const [query, setQuery] = useState('')
  const current = getIcon(value)
  const cats = categories ?? ICON_CATEGORIES

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase()
    return cats
      .map((category) => ({
        category,
        icons: ICONS.filter((i) => i.category === category && (!q || i.label.toLowerCase().includes(q))),
      }))
      .filter((g) => g.icons.length > 0)
  }, [cats, query])

  return (
    <div style={{ whiteSpace: 'normal' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span
          aria-hidden="true"
          style={{ ...tileBase, width: 44, height: 44, fontSize: 20, cursor: 'default', background: C.subtle }}
        >
          {value ? <i className={iconClass(value)} /> : <span style={{ color: C.muted, fontSize: 12 }}>None</span>}
        </span>
        <span style={{ flex: 1, fontSize: 14, color: C.text }}>
          {current?.label ?? (value ? value : 'No icon chosen')}
        </span>
        <button type="button" style={linkButton} onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          {open ? 'Done' : 'Change icon'}
        </button>
      </div>

      {open && (
        <div style={{ marginTop: 12, border: `1px solid ${C.border}`, borderRadius: 8, padding: 12, background: C.subtle }}>
          <input
            type="search"
            placeholder="Search icons…"
            aria-label="Search icons"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: `1px solid ${C.borderStrong}`, fontSize: 14, marginBottom: 8 }}
          />
          <div style={{ maxHeight: 280, overflowY: 'auto' }}>
            {groups.map((g) => (
              <div key={g.category} style={{ marginTop: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.muted, marginBottom: 6 }}>
                  {g.category}
                </div>
                <div role="listbox" aria-label={`${g.category} icons`} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(44px, 1fr))', gap: 6 }}>
                  {g.icons.map((icon) => {
                    const on = icon.id === value
                    return (
                      <button
                        key={icon.id}
                        type="button"
                        role="option"
                        aria-selected={on}
                        aria-label={icon.label}
                        title={icon.label}
                        onClick={() => onChange(icon.id)}
                        style={{ ...tileBase, height: 44, fontSize: 18, ...selectedRing(on) }}
                      >
                        <i className={iconClass(icon.id)} aria-hidden="true" />
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
            {groups.length === 0 && <p style={{ fontSize: 13, color: C.muted }}>No icons match “{query}”.</p>}
          </div>
          {value && (
            <button type="button" style={{ ...linkButton, marginTop: 10, color: C.muted }} onClick={() => onChange('')}>
              Remove icon
            </button>
          )}
        </div>
      )}
    </div>
  )
}

/* ── Tone picker ──────────────────────────────────────────────────────── */

export interface TonePickerProps {
  value: string
  onChange: (value: Tone) => void
  tones?: Tone[]
  /** Swatch colours; defaults to the live Theme Studio palette. */
  palette?: Record<string, string>
}

export function TonePicker({ value, onChange, tones = ['primary', 'accent'], palette = theme as Record<string, string> }: TonePickerProps) {
  const current = normalizeTone(value, tones[0])
  return (
    <div role="radiogroup" style={{ display: 'grid', gridTemplateColumns: `repeat(${tones.length}, 1fr)`, gap: 8, whiteSpace: 'normal' }}>
      {tones.map((tone) => {
        const on = tone === current
        const colour = palette[TONE_THEME_ROLE[tone]] ?? '#999'
        return (
          <button
            key={tone}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(tone)}
            style={{ ...tileBase, flexDirection: 'column', gap: 6, padding: '10px 6px', ...selectedRing(on) }}
          >
            <span aria-hidden="true" style={{ width: 36, height: 36, borderRadius: '50%', background: colour, border: '1px solid rgba(0,0,0,0.1)' }} />
            <span style={{ fontSize: 13, fontWeight: 600 }}>{TONE_LABELS[tone].label}</span>
            <span style={{ fontSize: 11, color: C.muted }}>{TONE_LABELS[tone].hint}</span>
          </button>
        )
      })}
    </div>
  )
}

/* ── Gradient picker ──────────────────────────────────────────────────── */

export function GradientPicker({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const current = normalizeGradient(value)
  return (
    <div role="radiogroup" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, whiteSpace: 'normal' }}>
      {GRADIENT_PRESET_KEYS.map((key) => {
        const preset = GRADIENT_PRESETS[key]
        const on = key === current
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(key)}
            style={{ ...tileBase, flexDirection: 'column', gap: 6, padding: '10px 6px', ...selectedRing(on) }}
          >
            <span aria-hidden="true" style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(to right, ${preset.from}, ${preset.to})` }} />
            <span style={{ fontSize: 13, fontWeight: 600 }}>{preset.label}</span>
          </button>
        )
      })}
    </div>
  )
}

/* ── Emoji picker ─────────────────────────────────────────────────────── */

export function EmojiPicker({ value, onChange, defaultOpen }: { value: string; onChange: (value: string) => void; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(Boolean(defaultOpen) || !value)
  return (
    <div style={{ whiteSpace: 'normal' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span aria-hidden="true" style={{ ...tileBase, width: 44, height: 44, fontSize: 24, cursor: 'default', background: C.subtle }}>
          {value || <span style={{ color: C.muted, fontSize: 12 }}>None</span>}
        </span>
        <span style={{ flex: 1 }} />
        <button type="button" style={linkButton} onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          {open ? 'Done' : 'Change emoji'}
        </button>
      </div>
      {open && (
        <div style={{ marginTop: 12, border: `1px solid ${C.border}`, borderRadius: 8, padding: 12, background: C.subtle }}>
          {EMOJI_GROUPS.map((g) => (
            <div key={g.label} style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.muted, marginBottom: 6 }}>{g.label}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))', gap: 6 }}>
                {g.emojis.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    aria-label={`Use ${emoji}`}
                    aria-pressed={emoji === value}
                    onClick={() => onChange(emoji)}
                    style={{ ...tileBase, height: 40, fontSize: 20, ...selectedRing(emoji === value) }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <label style={{ display: 'block', fontSize: 13, color: C.muted, marginTop: 8 }}>
            Or type / paste any emoji
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              style={{ display: 'block', width: 80, marginTop: 4, padding: '6px 8px', borderRadius: 6, border: `1px solid ${C.borderStrong}`, fontSize: 20 }}
            />
          </label>
        </div>
      )}
    </div>
  )
}
