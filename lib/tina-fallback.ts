/**
 * Static-JSON fallback for Tina documents.
 *
 * Tina stores rich-text fields as markdown strings on disk. GraphQL parses
 * them into an AST for <TinaMarkdown>; when GraphQL is unreachable we read the
 * JSON file directly and must do that parse ourselves. The generated schema
 * tells us which fields are rich-text, at any depth, so pages no longer list
 * their rich-text fields by hand.
 */
import generatedSchema from '@/tina/__generated__/_schema.json'

interface SchemaField {
  name: string
  type: string
  list?: boolean
  fields?: SchemaField[]
}

interface SchemaCollection {
  name: string
  fields: SchemaField[]
}

type Inline = { type: 'text'; text: string; bold?: boolean }

function parseInline(s: string): Inline[] {
  const parts: Inline[] = []
  const regex = /\*\*([^*]+)\*\*/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = regex.exec(s)) !== null) {
    if (m.index > last) parts.push({ type: 'text', text: s.slice(last, m.index) })
    parts.push({ type: 'text', text: m[1], bold: true })
    last = m.index + m[0].length
  }
  if (last < s.length) parts.push({ type: 'text', text: s.slice(last) })
  return parts.length > 0 ? parts : [{ type: 'text', text: s }]
}

/** Markdown string → minimal TinaMarkdown AST (paragraphs + **bold**). */
export function markdownToAst(s: unknown) {
  if (s && typeof s === 'object') return s // already parsed
  const text = (typeof s === 'string' ? s : '').trim()
  if (!text) return { type: 'root', children: [] }
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.replace(/\n/g, ' ').trim())
    .filter(Boolean)
  return { type: 'root', children: paragraphs.map((para) => ({ type: 'p', children: parseInline(para) })) }
}

function hydrateFields(fields: SchemaField[], value: unknown): unknown {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return value
  const out: Record<string, unknown> = { ...(value as Record<string, unknown>) }
  for (const field of fields) {
    const v = out[field.name]
    if (v === undefined || v === null) continue
    if (field.type === 'rich-text') {
      out[field.name] = field.list && Array.isArray(v) ? v.map(markdownToAst) : markdownToAst(v)
    } else if (field.type === 'object' && field.fields) {
      out[field.name] = field.list && Array.isArray(v)
        ? v.map((item) => hydrateFields(field.fields!, item))
        : hydrateFields(field.fields, v)
    }
  }
  return out
}

export function hydrateRichText<T>(
  collection: string,
  doc: T,
  schema: { collections: SchemaCollection[] } = generatedSchema as unknown as { collections: SchemaCollection[] },
): T {
  const def = schema.collections.find((c) => c.name === collection)
  if (!def) return doc
  return hydrateFields(def.fields, doc) as T
}
