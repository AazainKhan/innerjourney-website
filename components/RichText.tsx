/**
 * Inline markdown renderer for short Tina text fields (headings, subtexts).
 *
 * Editors can type these directly in any Tina string field — the syntax stays
 * visible in the form input but renders as styled HTML on the public site:
 *
 *   **bold**        → <strong>
 *   *italic*        → <em>
 *   __underline__   → <u>
 *   [text](url)     → <a>
 *
 * Designed for one-line content. Does NOT process newlines, lists, or block
 * elements — for long-form prose use ReactMarkdown directly.
 */

import { Fragment, type ReactNode } from 'react'

type Token =
  | { type: 'text'; value: string }
  | { type: 'bold' | 'italic' | 'underline' | 'link'; children: Token[]; href?: string }

type InlineTag = 'bold' | 'italic' | 'underline' | 'link'

const PATTERNS: Array<{ regex: RegExp; type: InlineTag }> = [
  { regex: /\*\*([^*]+)\*\*/, type: 'bold' },
  { regex: /__([^_]+)__/, type: 'underline' },
  { regex: /\*([^*]+)\*/, type: 'italic' },
  { regex: /\[([^\]]+)\]\(([^)]+)\)/, type: 'link' },
]

function parse(input: string): Token[] {
  const out: Token[] = []
  let cursor = 0
  while (cursor < input.length) {
    let earliest: { index: number; match: RegExpExecArray; type: InlineTag } | null = null
    for (const { regex, type } of PATTERNS) {
      regex.lastIndex = 0
      const m = regex.exec(input.slice(cursor))
      if (m && (earliest === null || m.index < earliest.index)) {
        earliest = { index: m.index, match: m, type }
      }
    }
    if (!earliest) {
      out.push({ type: 'text', value: input.slice(cursor) })
      break
    }
    if (earliest.index > 0) {
      out.push({ type: 'text', value: input.slice(cursor, cursor + earliest.index) })
    }
    if (earliest.type === 'link') {
      const [, label, url] = earliest.match
      out.push({ type: 'link', href: url, children: parse(label) })
    } else {
      out.push({ type: earliest.type, children: parse(earliest.match[1]) })
    }
    cursor += earliest.index + earliest.match[0].length
  }
  return out
}

function render(tokens: Token[]): ReactNode {
  return tokens.map((t, i) => {
    if (t.type === 'text') return <Fragment key={i}>{t.value}</Fragment>
    if (t.type === 'bold') return <strong key={i}>{render(t.children)}</strong>
    if (t.type === 'italic') return <em key={i}>{render(t.children)}</em>
    if (t.type === 'underline') return <u key={i}>{render(t.children)}</u>
    if (t.type === 'link') return <a key={i} href={t.href} className="underline hover:no-underline">{render(t.children)}</a>
    return null
  })
}

type AllowedTag = 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'strong' | 'em'

interface RichTextProps {
  children: string | null | undefined
  as?: AllowedTag
  className?: string
}

export default function RichText({ children, as: Tag = 'span', className }: RichTextProps) {
  if (!children) return null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = Tag as any
  return <Component className={className}>{render(parse(children))}</Component>
}
