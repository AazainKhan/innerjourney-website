export interface HighlightParts {
  before: string
  highlight: string
  after: string
}

/**
 * Split `text` around the words to colour. Headings store the full sentence
 * plus the words to highlight, so an editor always reads (and edits) the whole
 * heading in one place.
 *
 * Uses the last occurrence, because highlights almost always close the
 * sentence ("A Compassionate Coaching Experience" → "Experience"). Matching is
 * case-sensitive first, then case-insensitive. If the highlight isn't in the
 * text, the whole text renders plain.
 */
export function splitHighlight(text: string | null | undefined, highlight: string | null | undefined): HighlightParts {
  const t = text ?? ''
  const h = (highlight ?? '').trim()
  if (!t || !h) return { before: t, highlight: '', after: '' }
  let i = t.lastIndexOf(h)
  if (i === -1) i = t.toLowerCase().lastIndexOf(h.toLowerCase())
  if (i === -1) return { before: t, highlight: '', after: '' }
  return { before: t.slice(0, i), highlight: t.slice(i, i + h.length), after: t.slice(i + h.length) }
}

/** Join a legacy prefix + highlight pair into one sentence. */
export function joinHighlight(prefix: string | null | undefined, highlight: string | null | undefined): string {
  return [prefix ?? '', highlight ?? ''].map((s) => s.trim()).filter(Boolean).join(' ')
}
