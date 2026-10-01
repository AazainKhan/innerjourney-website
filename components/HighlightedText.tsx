import { splitHighlight } from '@/lib/highlight'

interface HighlightedTextProps {
  text: string | null | undefined
  highlight: string | null | undefined
  /** Classes for the coloured span, e.g. "text-carrot font-bold". */
  highlightClassName?: string
  /** Put the highlighted words on their own line (used by banners). */
  breakBefore?: boolean
}

/**
 * Renders a sentence with some of its words coloured. Place it *inside* the
 * heading element so the heading keeps its own classes and Tina click target.
 */
export default function HighlightedText({ text, highlight, highlightClassName, breakBefore }: HighlightedTextProps) {
  const parts = splitHighlight(text, highlight)
  if (!parts.highlight) return <>{parts.before}</>
  return (
    <>
      {breakBefore ? parts.before.trimEnd() : parts.before}
      {breakBefore && parts.before.trim() && <br />}
      <span className={highlightClassName}>{parts.highlight}</span>
      {parts.after}
    </>
  )
}
