/**
 * "Manage posts" panel shown inside the Resources page form. Lists every blog
 * post or podcast episode with its status and Featured flag, and links
 * straight to the editor for each one, plus a "New" button — so Shanila can
 * run the whole library from the Resources page without hunting through the
 * sidebar.
 *
 * It stores no data of its own.
 */
import React, { useEffect, useState } from 'react'
import { useCMS } from 'tinacms'
import { previewRoute } from '../../lib/tina-select'

export type LibraryKind = 'post' | 'podcast'

export interface LibraryItem {
  title: string
  status?: string | null
  featured?: boolean | null
  publishedAt?: string | null
  filename: string
}

const LABELS: Record<LibraryKind, { one: string; many: string }> = {
  post: { one: 'blog post', many: 'blog posts' },
  podcast: { one: 'episode', many: 'episodes' },
}

/** Opens the side-by-side editor: a post on its own page, an episode on the Resources page. */
export function editHref(kind: LibraryKind, filename: string) {
  return kind === 'post' ? `#/~/blog/${filename}` : `#/~${previewRoute(`podcasts/${filename}.md`)}`
}

export function newHref(kind: LibraryKind) {
  return `#/collections/new/${kind}`
}

export function sortNewestFirst(items: LibraryItem[]) {
  return [...items].sort((a, b) => (Date.parse(b.publishedAt || '') || 0) - (Date.parse(a.publishedAt || '') || 0))
}

const box: React.CSSProperties = { border: '1px solid #e1ddec', borderRadius: 8, background: '#fff', overflow: 'hidden' }
const row: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderTop: '1px solid #efedf5', fontSize: 14 }
const pill = (bg: string, fg: string): React.CSSProperties => ({ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: bg, color: fg, whiteSpace: 'nowrap' })
const primaryBtn: React.CSSProperties = { display: 'inline-block', background: '#0084ff', color: '#fff', padding: '8px 14px', borderRadius: 6, fontSize: 13, fontWeight: 600, textDecoration: 'none' }

export function LibraryList({ kind, items, loading, error }: { kind: LibraryKind; items: LibraryItem[]; loading?: boolean; error?: string }) {
  const label = LABELS[kind]
  return (
    // Tina's field wrapper sets white-space: nowrap; let our text wrap.
    <div style={{ whiteSpace: 'normal', minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 13, color: '#6b6b80' }}>
          {loading ? 'Loading…' : `${items.length} ${items.length === 1 ? label.one : label.many}`}
        </span>
        <a href={newHref(kind)} style={primaryBtn}>＋ New {label.one}</a>
      </div>
      {error && <p style={{ color: '#b42318', fontSize: 13 }}>{error}</p>}
      {!loading && items.length > 0 && (
        <div style={box}>
          {sortNewestFirst(items).map((item, i) => (
            <div key={item.filename} style={{ ...row, borderTop: i === 0 ? 'none' : row.borderTop }}>
              <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={item.title}>
                {item.title || item.filename}
              </span>
              {item.featured && <span style={pill('#fff4e5', '#b54708')}>★ Featured</span>}
              {item.status && item.status !== 'Published' && <span style={pill('#f2f4f7', '#475467')}>{item.status}</span>}
              <a href={editHref(kind, item.filename)} style={{ color: '#0084ff', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}>
                Edit
              </a>
            </div>
          ))}
        </div>
      )}
      <p style={{ fontSize: 12, color: '#6b6b80', marginTop: 8 }}>
        Tip: to feature one at the top of the Resources page, open it and switch on “Feature on Resources page”.
      </p>
    </div>
  )
}

const QUERIES: Record<LibraryKind, string> = {
  post: `query { postConnection(first: 500) { edges { node { title status featured publishedAt _sys { filename } } } } }`,
  podcast: `query { podcastConnection(first: 500) { edges { node { title status featured publishedAt _sys { filename } } } } }`,
}

interface ConnectionResult {
  [key: string]: { edges: { node: { title: string; status?: string; featured?: boolean; publishedAt?: string; _sys: { filename: string } } }[] }
}

export function LibraryManager({ kind }: { kind: LibraryKind }) {
  const cms = useCMS()
  const [items, setItems] = useState<LibraryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true
    const api = cms.api.tina
    if (!api) {
      setLoading(false)
      return
    }
    api
      .request<ConnectionResult>(QUERIES[kind], { variables: {} })
      .then((res: ConnectionResult) => {
        if (!alive) return
        const conn = res[`${kind}Connection`]
        setItems((conn?.edges ?? []).map(({ node }) => ({
          title: node.title,
          status: node.status,
          featured: node.featured,
          publishedAt: node.publishedAt,
          filename: node._sys.filename,
        })))
      })
      .catch(() => alive && setError('Couldn’t load the list. Refresh the page to try again.'))
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
    }
  }, [cms, kind])

  return <LibraryList kind={kind} items={items} loading={loading} error={error} />
}
