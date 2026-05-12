'use client'

import { useEffect, useRef, useState } from 'react'

interface RoleColors {
  primaryColor: string
  secondaryColor: string
  accentColor: string
  neutralColor: string
}

interface Swatch {
  label: string
  hex: string
  role: keyof RoleColors | null
}

interface Palette {
  id: string
  name: string
  tagline: string
  swatches: Swatch[]
  colors: RoleColors
  note?: string
}

interface CustomPalette {
  id: string
  name: string
  colors: RoleColors
  createdAt: string
  updatedAt?: string
}

const ROLE_LABEL: Record<keyof RoleColors, string> = {
  accentColor: 'Accent (CTA buttons, links)',
  primaryColor: 'Primary (warm highlights, icons)',
  secondaryColor: 'Secondary (dark surfaces — navbar, footer, hero)',
  neutralColor: 'Neutral (soft backgrounds)',
}

const ROLE_SHORT: Record<keyof RoleColors, string> = {
  accentColor: 'CTA',
  primaryColor: 'Pop',
  secondaryColor: 'Surfaces',
  neutralColor: 'Soft bg',
}

const PALETTES: Palette[] = [
  {
    id: 'sage-garden',
    name: 'Sage Garden',
    tagline: 'Soft greens and cream — calm, organic, grounded.',
    note: 'Lightest "surfaces" of the three — navbar/footer will look noticeably brighter than today.',
    swatches: [
      { label: 'eggshell', hex: '#faf3dd', role: 'neutralColor' },
      { label: 'tea-green', hex: '#c8d5b9', role: 'primaryColor' },
      { label: 'muted-teal', hex: '#8fc0a9', role: 'secondaryColor' },
      { label: 'tropical-teal', hex: '#68b0ab', role: 'accentColor' },
    ],
    colors: {
      neutralColor: '#faf3dd',
      primaryColor: '#c8d5b9',
      secondaryColor: '#8fc0a9',
      accentColor: '#68b0ab',
    },
  },
  {
    id: 'sunny-coral',
    name: 'Sunny Coral',
    tagline: 'Warm yellows with a tangerine pop — bright, optimistic.',
    note: 'Tangerine is the only true CTA color — best palette if you want a single warm pop against soft backgrounds.',
    swatches: [
      { label: 'light-yellow', hex: '#f6f4d2', role: 'neutralColor' },
      { label: 'tea-green', hex: '#cbdfbd', role: 'primaryColor' },
      { label: 'vanilla-custard', hex: '#d4e09b', role: 'secondaryColor' },
      { label: 'tangerine-dream', hex: '#f19c79', role: 'accentColor' },
    ],
    colors: {
      neutralColor: '#f6f4d2',
      primaryColor: '#cbdfbd',
      secondaryColor: '#d4e09b',
      accentColor: '#f19c79',
    },
  },
  {
    id: 'coastal-earth',
    name: 'Coastal Earth',
    tagline: 'Muted teal grounding with a salmon CTA — refined, mature.',
    note: 'Best of the three light palettes for keeping legible white-on-color text — muted-teal is dark enough for surfaces.',
    swatches: [
      { label: 'parchment', hex: '#fbf7f4', role: 'neutralColor' },
      { label: 'almond-silk', hex: '#eed2cc', role: 'primaryColor' },
      { label: 'muted-teal', hex: '#6c9a8b', role: 'secondaryColor' },
      { label: 'sweet-salmon', hex: '#e8998d', role: 'accentColor' },
    ],
    colors: {
      neutralColor: '#fbf7f4',
      primaryColor: '#eed2cc',
      secondaryColor: '#6c9a8b',
      accentColor: '#e8998d',
    },
  },
  {
    id: 'midnight-bloom',
    name: 'Midnight Bloom',
    tagline: 'Deep navy surfaces with a rose CTA — sophisticated, luxe.',
    note: 'Dark secondary keeps the original moody hero/footer aesthetic. Rose CTA reads as a warm, premium pop.',
    swatches: [
      { label: 'cream-blush', hex: '#fdf6f0', role: 'neutralColor' },
      { label: 'dusty-rose', hex: '#e8b3a8', role: 'primaryColor' },
      { label: 'midnight-navy', hex: '#1a2742', role: 'secondaryColor' },
      { label: 'rose-pop', hex: '#f582ae', role: 'accentColor' },
    ],
    colors: {
      neutralColor: '#fdf6f0',
      primaryColor: '#e8b3a8',
      secondaryColor: '#1a2742',
      accentColor: '#f582ae',
    },
  },
  {
    id: 'twilight-forest',
    name: 'Twilight Forest',
    tagline: 'Deep forest with a warm peach CTA — earthy, grounded, premium.',
    note: 'Forest-green secondary feels rich + organic. Peach CTA pops without screaming.',
    swatches: [
      { label: 'warm-cream', hex: '#f7efe5', role: 'neutralColor' },
      { label: 'dusty-mauve', hex: '#c89b9b', role: 'primaryColor' },
      { label: 'pine-forest', hex: '#1f3933', role: 'secondaryColor' },
      { label: 'peach-pop', hex: '#e8a87c', role: 'accentColor' },
    ],
    colors: {
      neutralColor: '#f7efe5',
      primaryColor: '#c89b9b',
      secondaryColor: '#1f3933',
      accentColor: '#e8a87c',
    },
  },
  {
    id: 'sapphire-sage',
    name: 'Sapphire Sage',
    tagline: 'Deep sapphire blue surfaces, soft sage primary, violet CTA, warm cream.',
    note: 'Blue grounds the page in trust + calm; the violet CTA reads as a confident, modern pop. Calm overall, bright where it counts.',
    swatches: [
      { label: 'warm-cream', hex: '#f7f0e6', role: 'neutralColor' },
      { label: 'sage-soft', hex: '#a8c4a2', role: 'primaryColor' },
      { label: 'deep-sapphire', hex: '#1e3a5f', role: 'secondaryColor' },
      { label: 'violet-pop', hex: '#8b5cf6', role: 'accentColor' },
    ],
    colors: {
      neutralColor: '#f7f0e6',
      primaryColor: '#a8c4a2',
      secondaryColor: '#1e3a5f',
      accentColor: '#8b5cf6',
    },
  },
  {
    id: 'plum-garden',
    name: 'Plum Garden',
    tagline: 'Deep plum surfaces, sage primary, royal-blue CTA, soft cream.',
    note: 'Purple secondary leans introspective + creative — fitting for inner-journey work. Royal blue CTA cuts through cleanly.',
    swatches: [
      { label: 'soft-cream', hex: '#faf5ee', role: 'neutralColor' },
      { label: 'sage-mist', hex: '#b8d4c4', role: 'primaryColor' },
      { label: 'deep-plum', hex: '#3d2e5c', role: 'secondaryColor' },
      { label: 'royal-blue', hex: '#3b82f6', role: 'accentColor' },
    ],
    colors: {
      neutralColor: '#faf5ee',
      primaryColor: '#b8d4c4',
      secondaryColor: '#3d2e5c',
      accentColor: '#3b82f6',
    },
  },
  {
    id: 'forest-mist',
    name: 'Forest Mist',
    tagline: 'Deep emerald surfaces, soft lilac primary, sky-blue CTA, ivory cream.',
    note: 'Green grounding for growth + balance, lilac softens it, sky-blue CTA stays uplifting and visible. Most "outdoorsy" of the four-hue trio.',
    swatches: [
      { label: 'ivory-cream', hex: '#f5f1ea', role: 'neutralColor' },
      { label: 'soft-lilac', hex: '#c4b5d4', role: 'primaryColor' },
      { label: 'deep-emerald', hex: '#2d4a3f', role: 'secondaryColor' },
      { label: 'sky-blue', hex: '#60a5fa', role: 'accentColor' },
    ],
    colors: {
      neutralColor: '#f5f1ea',
      primaryColor: '#c4b5d4',
      secondaryColor: '#2d4a3f',
      accentColor: '#60a5fa',
    },
  },
]

interface Props {
  current: RoleColors
  initialCustomPalettes: CustomPalette[]
}

function colorsEqual(a: RoleColors, b: RoleColors) {
  return (
    a.primaryColor.toLowerCase() === b.primaryColor.toLowerCase() &&
    a.secondaryColor.toLowerCase() === b.secondaryColor.toLowerCase() &&
    a.accentColor.toLowerCase() === b.accentColor.toLowerCase() &&
    a.neutralColor.toLowerCase() === b.neutralColor.toLowerCase()
  )
}

const HEX_RE = /^#[0-9a-fA-F]{6}$/

export default function ThemeStudioClient({ current, initialCustomPalettes }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const editedRef = useRef<RoleColors | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [edited, setEdited] = useState<RoleColors | null>(null)
  const [previewPath, setPreviewPath] = useState('/')
  const [status, setStatus] = useState<{ kind: 'idle' | 'saving' | 'success' | 'error'; msg?: string }>({ kind: 'idle' })
  const [hasEyeDropper, setHasEyeDropper] = useState(false)
  const [customPalettes, setCustomPalettes] = useState<CustomPalette[]>(initialCustomPalettes)
  const [savePromptOpen, setSavePromptOpen] = useState(false)
  const [savePromptName, setSavePromptName] = useState('')
  const [savePromptStatus, setSavePromptStatus] = useState<{ kind: 'idle' | 'saving' | 'error'; msg?: string }>({ kind: 'idle' })

  // Sync refs so the iframe onLoad handler always sees current edits
  editedRef.current = edited

  useEffect(() => {
    setHasEyeDropper(typeof window !== 'undefined' && 'EyeDropper' in window)
  }, [])

  // Resolve activeId against both preset palettes and custom palettes.
  function findActive(): { kind: 'preset' | 'custom'; palette: { id: string; name: string; colors: RoleColors } } | null {
    if (!activeId) return null
    const preset = PALETTES.find((p) => p.id === activeId)
    if (preset) return { kind: 'preset', palette: preset }
    const custom = customPalettes.find((p) => p.id === activeId)
    if (custom) return { kind: 'custom', palette: custom }
    return null
  }

  function postPreview(colors: RoleColors | null) {
    const w = iframeRef.current?.contentWindow
    if (!w) return
    if (colors == null) {
      w.postMessage({ type: 'theme-preview-reset' }, window.location.origin)
    } else {
      w.postMessage({ type: 'theme-preview', colors }, window.location.origin)
    }
  }

  function selectAnyPalette(id: string, colors: RoleColors) {
    setActiveId(id)
    setEdited({ ...colors })
    setStatus({ kind: 'idle' })
    setSavePromptOpen(false)
    postPreview(colors)
  }

  function startFromCurrent() {
    setActiveId(null)
    setEdited({ ...current })
    setStatus({ kind: 'idle' })
    setSavePromptOpen(false)
    postPreview(current)
  }

  function clearPreview() {
    setActiveId(null)
    setEdited(null)
    setStatus({ kind: 'idle' })
    setSavePromptOpen(false)
    postPreview(null)
  }

  function updateColor(role: keyof RoleColors, value: string) {
    if (!HEX_RE.test(value)) return
    const next = { ...(edited || current), [role]: value.toLowerCase() }
    setEdited(next)
    postPreview(next)
  }

  function resetEdits() {
    const active = findActive()
    const source = active ? active.palette.colors : current
    setEdited({ ...source })
    postPreview(source)
  }

  function handleIframeLoad() {
    const e = editedRef.current
    if (e) postPreview(e)
  }

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== window.location.origin) return
      if (e.data?.type !== 'theme-preview-ready') return
      const cur = editedRef.current
      if (cur) postPreview(cur)
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  async function applyTheme() {
    if (!edited) return
    setStatus({ kind: 'saving' })
    try {
      const res = await fetch('/api/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(edited),
      })
      const j = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus({ kind: 'error', msg: j.error || `HTTP ${res.status}` })
        return
      }
      const active = findActive()
      const sourceName = active ? active.palette.name : 'custom theme'
      const suffix = active && !colorsEqual(edited, active.palette.colors) ? ' (edited)' : ''
      const deploy = j.deploy as { attempted: boolean; ok: boolean; message: string; commit?: string } | undefined
      let msg = `Saved “${sourceName}${suffix}” to content/theme.json.`
      if (deploy?.attempted && deploy.ok) {
        msg += ` ${deploy.message}.`
      } else if (deploy?.attempted && !deploy.ok) {
        setStatus({ kind: 'error', msg: `Saved locally, but deploy failed: ${deploy.message}` })
        return
      } else if (deploy && !deploy.attempted) {
        msg += ` ${deploy.message}.`
      }
      setStatus({ kind: 'success', msg })
    } catch (e) {
      setStatus({ kind: 'error', msg: e instanceof Error ? e.message : 'request failed' })
    }
  }

  function openSavePrompt() {
    const active = findActive()
    const defaultName = active ? `${active.palette.name} – Custom` : 'My Custom Palette'
    setSavePromptName(defaultName)
    setSavePromptOpen(true)
    setSavePromptStatus({ kind: 'idle' })
  }

  async function submitNewCustomPalette() {
    if (!edited) return
    const name = savePromptName.trim()
    if (!name) {
      setSavePromptStatus({ kind: 'error', msg: 'name is required' })
      return
    }
    setSavePromptStatus({ kind: 'saving' })
    try {
      const res = await fetch('/api/palettes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, colors: edited }),
      })
      const j = await res.json().catch(() => ({}))
      if (!res.ok) {
        setSavePromptStatus({ kind: 'error', msg: j.error || `HTTP ${res.status}` })
        return
      }
      const newPalette: CustomPalette = j.palette
      setCustomPalettes((prev) => [...prev, newPalette])
      // Switch active to the new custom palette — edits are now "saved"
      setActiveId(newPalette.id)
      setEdited({ ...newPalette.colors })
      setSavePromptOpen(false)
      setSavePromptStatus({ kind: 'idle' })
      setStatus({ kind: 'success', msg: `Saved custom palette “${newPalette.name}”. Click Apply to write it to theme.json.` })
    } catch (e) {
      setSavePromptStatus({ kind: 'error', msg: e instanceof Error ? e.message : 'request failed' })
    }
  }

  async function updateCurrentCustomPalette() {
    const active = findActive()
    if (!active || active.kind !== 'custom' || !edited) return
    setStatus({ kind: 'saving' })
    try {
      const res = await fetch('/api/palettes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: active.palette.id, colors: edited }),
      })
      const j = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus({ kind: 'error', msg: j.error || `HTTP ${res.status}` })
        return
      }
      const updated: CustomPalette = j.palette
      setCustomPalettes((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
      setEdited({ ...updated.colors })
      setStatus({ kind: 'success', msg: `Updated “${updated.name}”.` })
    } catch (e) {
      setStatus({ kind: 'error', msg: e instanceof Error ? e.message : 'request failed' })
    }
  }

  async function renameCustomPalette(id: string, nextName: string) {
    const trimmed = nextName.trim()
    if (!trimmed) return
    try {
      const res = await fetch('/api/palettes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name: trimmed }),
      })
      const j = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus({ kind: 'error', msg: j.error || `HTTP ${res.status}` })
        return
      }
      const updated: CustomPalette = j.palette
      setCustomPalettes((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
    } catch (e) {
      setStatus({ kind: 'error', msg: e instanceof Error ? e.message : 'rename failed' })
    }
  }

  async function deleteCustomPalette(id: string, name: string) {
    if (!window.confirm(`Delete custom palette “${name}”? This can't be undone.`)) return
    try {
      const res = await fetch(`/api/palettes?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
      const j = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus({ kind: 'error', msg: j.error || `HTTP ${res.status}` })
        return
      }
      setCustomPalettes((prev) => prev.filter((p) => p.id !== id))
      if (activeId === id) {
        clearPreview()
      }
    } catch (e) {
      setStatus({ kind: 'error', msg: e instanceof Error ? e.message : 'delete failed' })
    }
  }

  const active = findActive()
  const sourceColors = active ? active.palette.colors : (edited ? current : null)
  const hasEdits = edited != null && sourceColors != null && !colorsEqual(edited, sourceColors)
  const sourceLabel = active ? active.palette.name : 'Current saved theme'

  // Detect whether writes will work in this environment. On Vercel
  // (production-deployed) the fs+git pipeline can't run, so Apply will 403.
  // We surface that up front instead of waiting for the user to hit the wall.
  const isProd = typeof window !== 'undefined' && !/localhost|127\.0\.0\.1/.test(window.location.host)

  return (
    <div className="fixed inset-0 z-[60] flex h-screen w-screen overflow-hidden bg-gray-100">
      <aside className="w-[420px] flex-shrink-0 overflow-y-auto border-r border-gray-200 bg-white">
        <header className="sticky top-0 z-10 border-b border-gray-200 bg-white p-5">
          <div className="flex items-baseline justify-between">
            <h1 className="text-xl font-bold text-gray-900">Theme Studio</h1>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${isProd ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
              {isProd ? 'Preview only' : 'Live edit'}
            </span>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Pick a palette, then tweak any role with the color wheel or eyedropper. <b>Apply</b> writes to <code className="rounded bg-gray-100 px-1">content/theme.json</code>.
          </p>
          {isProd && (
            <p className="mt-2 rounded-md bg-amber-50 px-2 py-1.5 text-[11px] text-amber-900">
              You&apos;re viewing this on the live site. Preview works, but <b>Apply</b> needs a Vercel-side <code>GITHUB_TOKEN</code> to commit via the GitHub API. For now, run <code>npm run dev</code> locally to save changes.
            </p>
          )}
        </header>

        <div className="p-5 space-y-4">
          <CurrentCard current={current} isActive={activeId === null && edited != null} onClick={startFromCurrent} />

          {customPalettes.length > 0 && (
            <div className="space-y-2 pt-2">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Your custom palettes</h2>
              {customPalettes.map((cp) => (
                <CustomPaletteCard
                  key={cp.id}
                  palette={cp}
                  isActive={activeId === cp.id}
                  onClick={() => selectAnyPalette(cp.id, cp.colors)}
                  onRename={(name) => renameCustomPalette(cp.id, name)}
                  onDelete={() => deleteCustomPalette(cp.id, cp.name)}
                />
              ))}
            </div>
          )}

          <div className="space-y-2 pt-2">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Preset palettes</h2>
            {PALETTES.map((p) => (
              <PaletteCard
                key={p.id}
                palette={p}
                isActive={activeId === p.id}
                onClick={() => selectAnyPalette(p.id, p.colors)}
              />
            ))}
          </div>
        </div>

        {edited && (
          <div className="border-t-2 border-gray-200 bg-gray-50 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-gray-900">Edit colors</h2>
                <p className="text-[11px] text-gray-500">Click a swatch for the color wheel. Eyedropper picks from anywhere on screen.</p>
              </div>
              {hasEdits && (
                <button onClick={resetEdits} className="text-[11px] font-semibold text-gray-700 underline hover:text-gray-900">
                  Reset to {sourceLabel}
                </button>
              )}
            </div>
            <div className="space-y-2">
              {(Object.keys(ROLE_LABEL) as Array<keyof RoleColors>).map((role) => (
                <ColorEditorRow
                  key={role}
                  role={role}
                  value={edited[role]}
                  onChange={(v) => updateColor(role, v)}
                  hasEyeDropper={hasEyeDropper}
                />
              ))}
            </div>

            {/* Save-as-custom action */}
            <div className="border-t border-gray-200 pt-3">
              {active?.kind === 'custom' ? (
                <div className="space-y-2">
                  <button
                    onClick={updateCurrentCustomPalette}
                    disabled={!hasEdits || status.kind === 'saving'}
                    className="w-full rounded-md border border-gray-900 bg-white px-3 py-2 text-xs font-semibold text-gray-900 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {hasEdits ? `Save changes to “${active.palette.name}”` : `Saved — no changes since last save`}
                  </button>
                  <button
                    onClick={openSavePrompt}
                    disabled={status.kind === 'saving'}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Save as new custom palette…
                  </button>
                </div>
              ) : !savePromptOpen ? (
                <button
                  onClick={openSavePrompt}
                  disabled={!hasEdits && active != null}
                  className="w-full rounded-md border border-gray-900 bg-white px-3 py-2 text-xs font-semibold text-gray-900 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                  title={!hasEdits && active != null ? 'Edit at least one color first' : ''}
                >
                  {active ? `Save as custom palette…` : `Save current as custom palette…`}
                </button>
              ) : null}

              {savePromptOpen && (
                <div className="mt-2 space-y-2 rounded-md border border-gray-300 bg-white p-3">
                  <label className="block text-[11px] font-semibold uppercase tracking-wide text-gray-600">
                    Palette name
                  </label>
                  <input
                    type="text"
                    value={savePromptName}
                    onChange={(e) => setSavePromptName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') submitNewCustomPalette()
                      if (e.key === 'Escape') setSavePromptOpen(false)
                    }}
                    placeholder="e.g. Sapphire Sage – Brighter"
                    maxLength={60}
                    autoFocus
                    spellCheck={false}
                    className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={submitNewCustomPalette}
                      disabled={!savePromptName.trim() || savePromptStatus.kind === 'saving'}
                      className="flex-1 rounded-md bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {savePromptStatus.kind === 'saving' ? 'Saving…' : 'Save'}
                    </button>
                    <button
                      onClick={() => { setSavePromptOpen(false); setSavePromptStatus({ kind: 'idle' }) }}
                      className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                  {savePromptStatus.kind === 'error' && (
                    <p className="rounded-md bg-red-50 px-2 py-1 text-[11px] text-red-800">{savePromptStatus.msg}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="sticky bottom-0 border-t border-gray-200 bg-white p-5 space-y-3">
          <div className="rounded-lg bg-gray-50 p-3 text-xs text-gray-600">
            Previewing: <b>{edited ? `${sourceLabel}${hasEdits ? ' (edited)' : ''}` : 'Current saved theme (no preview)'}</b>
          </div>
          <div className="flex gap-2">
            <select
              value={previewPath}
              onChange={(e) => setPreviewPath(e.target.value)}
              className="flex-1 rounded-md border border-gray-300 px-2 py-2 text-sm"
            >
              <option value="/">Home (/)</option>
              <option value="/mindset-coaching">Mindset Coaching</option>
              <option value="/career-coaching">Career Coaching</option>
              <option value="/numerology">Numerology</option>
              <option value="/services">Services</option>
              <option value="/about">About</option>
              <option value="/resources">Resources</option>
              <option value="/contact">Contact</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={applyTheme}
              disabled={!edited || status.kind === 'saving'}
              className="flex-1 rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {status.kind === 'saving' ? 'Saving…' : edited ? `Apply ${sourceLabel}${hasEdits ? ' (edited)' : ''}` : 'Pick a palette to start'}
            </button>
            {edited && (
              <button
                onClick={clearPreview}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                title="Clear preview, show current saved theme"
              >
                Clear
              </button>
            )}
          </div>
          {status.kind === 'success' && (
            <p className="rounded-md bg-green-50 px-3 py-2 text-xs text-green-800">{status.msg}</p>
          )}
          {status.kind === 'error' && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-800">{status.msg}</p>
          )}
        </div>
      </aside>

      <main className="flex-1 overflow-hidden bg-white">
        <iframe
          ref={iframeRef}
          src={previewPath}
          onLoad={handleIframeLoad}
          className="h-full w-full border-0"
          title="Live theme preview"
        />
      </main>
    </div>
  )
}

function ColorEditorRow({
  role,
  value,
  onChange,
  hasEyeDropper,
}: {
  role: keyof RoleColors
  value: string
  onChange: (hex: string) => void
  hasEyeDropper: boolean
}) {
  const [text, setText] = useState(value)
  const colorInputRef = useRef<HTMLInputElement>(null)

  // Keep local text in sync when the external value changes (palette swap, reset, eyedropper)
  useEffect(() => { setText(value) }, [value])

  function commitText(v: string) {
    const normalized = v.startsWith('#') ? v : `#${v}`
    if (HEX_RE.test(normalized)) {
      onChange(normalized.toLowerCase())
    } else {
      setText(value) // revert to last valid
    }
  }

  async function pickWithEyedropper() {
    if (typeof window === 'undefined' || !('EyeDropper' in window)) return
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const eyeDropper = new (window as any).EyeDropper()
      const result = await eyeDropper.open()
      if (result?.sRGBHex && HEX_RE.test(result.sRGBHex)) {
        onChange(result.sRGBHex.toLowerCase())
      }
    } catch {
      // User canceled — no-op
    }
  }

  return (
    <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-white p-2">
      {/* Live swatch — clicking opens the native color wheel picker */}
      <label className="relative flex-shrink-0 cursor-pointer" title="Open color wheel">
        <span
          className="block h-10 w-10 rounded border border-gray-300 shadow-inner"
          style={{ backgroundColor: value }}
        />
        <input
          ref={colorInputRef}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value.toLowerCase())}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          aria-label={`${ROLE_LABEL[role]} color wheel`}
        />
      </label>

      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">{ROLE_SHORT[role]}</div>
        <div className="text-[10px] text-gray-500 leading-tight">{ROLE_LABEL[role].replace(/^[^(]+\(/, '').replace(/\)$/, '')}</div>
      </div>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={(e) => commitText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            commitText((e.target as HTMLInputElement).value)
            ;(e.target as HTMLInputElement).blur()
          }
        }}
        spellCheck={false}
        className="w-[88px] rounded border border-gray-300 px-2 py-1 font-mono text-xs"
        aria-label={`${ROLE_LABEL[role]} hex value`}
      />

      {hasEyeDropper && (
        <button
          onClick={pickWithEyedropper}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded border border-gray-300 text-gray-700 hover:border-gray-500 hover:bg-gray-100"
          title="Eyedropper — pick color from screen"
          aria-label="Pick color from screen with eyedropper"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="m2 22 1-1h3l9-9" />
            <path d="M3 21v-3l9-9" />
            <path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z" />
          </svg>
        </button>
      )}
    </div>
  )
}

function CurrentCard({ current, isActive, onClick }: { current: RoleColors; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
        isActive ? 'border-gray-900 bg-gray-50' : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className="mb-1 flex items-center justify-between">
        <span className="text-sm font-bold text-gray-900">Current saved theme</span>
        {isActive && <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-700">Active</span>}
      </div>
      <p className="mb-3 text-xs text-gray-500">Whatever&apos;s in content/theme.json right now.</p>
      <div className="grid grid-cols-4 gap-2">
        {(Object.keys(ROLE_SHORT) as Array<keyof RoleColors>).map((role) => (
          <div key={role} className="space-y-1">
            <div className="h-10 w-full rounded border border-gray-200" style={{ backgroundColor: current[role] }} />
            <div className="text-[10px] font-medium text-gray-600">{ROLE_SHORT[role]}</div>
            <div className="text-[9px] font-mono text-gray-400">{current[role].toLowerCase()}</div>
          </div>
        ))}
      </div>
    </button>
  )
}

function PaletteCard({ palette, isActive, onClick }: { palette: Palette; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
        isActive ? 'border-gray-900 bg-gray-50 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className="mb-1 flex items-center justify-between">
        <span className="text-sm font-bold text-gray-900">{palette.name}</span>
        {isActive && <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-700">Previewing</span>}
      </div>
      <p className="mb-3 text-xs text-gray-500">{palette.tagline}</p>
      <div className="grid grid-cols-4 gap-2">
        {palette.swatches.map((s) => (
          <div key={s.hex} className="space-y-1">
            <div className="h-10 w-full rounded border border-gray-200" style={{ backgroundColor: s.hex }} />
            <div className="text-[10px] font-medium text-gray-600 truncate" title={s.label}>{s.label}</div>
            <div className="text-[9px] font-semibold uppercase tracking-wide text-gray-500">
              {s.role ? ROLE_SHORT[s.role] : '—'}
            </div>
          </div>
        ))}
      </div>
      {palette.note && <p className="mt-3 rounded-md bg-amber-50 px-2 py-1.5 text-[11px] text-amber-900">{palette.note}</p>}
      <details className="mt-3 text-[11px] text-gray-500">
        <summary className="cursor-pointer hover:text-gray-700">Role mapping</summary>
        <ul className="mt-2 space-y-1">
          {(Object.keys(ROLE_LABEL) as Array<keyof RoleColors>).map((role) => (
            <li key={role} className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded border border-gray-200" style={{ backgroundColor: palette.colors[role] }} />
              <span className="font-medium text-gray-700">{ROLE_LABEL[role]}</span>
            </li>
          ))}
        </ul>
      </details>
    </button>
  )
}

function CustomPaletteCard({
  palette,
  isActive,
  onClick,
  onRename,
  onDelete,
}: {
  palette: CustomPalette
  isActive: boolean
  onClick: () => void
  onRename: (name: string) => void
  onDelete: () => void
}) {
  const [editingName, setEditingName] = useState(false)
  const [draftName, setDraftName] = useState(palette.name)

  useEffect(() => { setDraftName(palette.name) }, [palette.name])

  function commitRename() {
    const trimmed = draftName.trim()
    if (trimmed && trimmed !== palette.name) {
      onRename(trimmed)
    } else {
      setDraftName(palette.name)
    }
    setEditingName(false)
  }

  return (
    <div
      className={`relative w-full rounded-lg border-2 p-4 text-left transition-all ${
        isActive ? 'border-gray-900 bg-gray-50 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      {/* Click target — covers the swatches area but not the controls */}
      <button
        onClick={onClick}
        aria-label={`Preview ${palette.name}`}
        className="absolute inset-0 z-0 cursor-pointer rounded-lg"
      />

      <div className="relative z-10 mb-3 flex items-start justify-between gap-2">
        {editingName ? (
          <input
            type="text"
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            onBlur={commitRename}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitRename()
              if (e.key === 'Escape') { setDraftName(palette.name); setEditingName(false) }
            }}
            autoFocus
            spellCheck={false}
            maxLength={60}
            className="min-w-0 flex-1 rounded border border-gray-300 px-2 py-1 text-sm font-bold"
          />
        ) : (
          <button
            onDoubleClick={() => setEditingName(true)}
            onClick={(e) => { e.stopPropagation(); setEditingName(true) }}
            className="min-w-0 flex-1 text-left text-sm font-bold text-gray-900 hover:underline"
            title="Click to rename"
          >
            {palette.name}
          </button>
        )}
        <div className="flex flex-shrink-0 items-center gap-1">
          {isActive && <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-700">Previewing</span>}
          <button
            onClick={(e) => { e.stopPropagation(); onDelete() }}
            aria-label={`Delete ${palette.name}`}
            title="Delete this custom palette"
            className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M3 6h18" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative z-10 pointer-events-none grid grid-cols-4 gap-2">
        {(Object.keys(ROLE_SHORT) as Array<keyof RoleColors>).map((role) => (
          <div key={role} className="space-y-1">
            <div className="h-10 w-full rounded border border-gray-200" style={{ backgroundColor: palette.colors[role] }} />
            <div className="text-[10px] font-medium text-gray-600">{ROLE_SHORT[role]}</div>
            <div className="text-[9px] font-mono text-gray-400">{palette.colors[role].toLowerCase()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
