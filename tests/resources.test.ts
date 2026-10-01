import { describe, expect, it } from 'vitest'
import { connectionNodes, parseDate, sortCards, toCard, type ResourceCard } from '@/lib/resources'

const card = (over: Partial<ResourceCard>): ResourceCard => ({
  slug: 's',
  title: 'T',
  excerpt: '',
  status: 'Published',
  publishedAt: '2024-01-01T00:00:00.000Z',
  featured: false,
  image: '',
  icon: 'fa-pen-fancy',
  gradient: '',
  iconColor: '',
  episode: '',
  audioUrl: '',
  ...over,
})

describe('toCard', () => {
  it('turns a post into a card using its tone', () => {
    const c = toCard({ title: 'Hi', _sys: { filename: 'hi' }, featured: true, cardStyle: { icon: 'fa-comments', tone: 'accent' } }, 'post')
    expect(c).toMatchObject({ slug: 'hi', title: 'Hi', featured: true, icon: 'fa-comments', gradient: 'from-blue-100 to-indigo-200', iconColor: 'text-azure/40' })
  })

  it('falls back to a default icon per kind', () => {
    expect(toCard({ _sys: { filename: 'a' } }, 'post').icon).toBe('fa-pen-fancy')
    expect(toCard({ _sys: { filename: 'b' }, cardStyle: { icon: 'fa-not-real' } }, 'podcast').icon).toBe('fa-microphone-alt')
  })

  it('repairs external images that Tina Cloud prefixed with its CDN', () => {
    const c = toCard({ _sys: { filename: 'ep' }, image: 'https://assets.tina.io/88bc3f44-ecdf-4f23-bb2a-117721f2da57https://i.ytimg.com/vi/x/hqdefault.jpg' }, 'podcast')
    expect(c.image).toBe('https://i.ytimg.com/vi/x/hqdefault.jpg')
    expect(toCard({ _sys: { filename: 'p' }, image: 'https://assets.tina.io/abc/images/blog/a.jpg' }, 'post').image).toBe('https://assets.tina.io/abc/images/blog/a.jpg')
    expect(toCard({ _sys: { filename: 'p' }, image: '/images/a.jpg' }, 'post').image).toBe('/images/a.jpg')
  })

  it('uses the podcast glow for episodes and trims the listen link', () => {
    const c = toCard({ _sys: { filename: 'ep' }, audioUrl: '  https://youtu.be/x ', cardStyle: { tone: 'primary' } }, 'podcast')
    expect(c.gradient).toBe('from-carrot/30 to-orange-500/30')
    expect(c.audioUrl).toBe('https://youtu.be/x')
  })
})

describe('sortCards', () => {
  const items = [
    card({ slug: 'old', title: 'B', publishedAt: '2023-01-01' }),
    card({ slug: 'new', title: 'C', publishedAt: '2025-01-01' }),
    card({ slug: 'feat', title: 'A', publishedAt: '2020-01-01', featured: true }),
    card({ slug: 'soon', title: 'D', publishedAt: '2026-01-01', status: 'Coming Soon' }),
  ]

  it('keeps featured items first for every sort', () => {
    for (const key of ['newest', 'oldest', 'title', 'status'] as const) expect(sortCards(items, key)[0].slug).toBe('feat')
  })

  it('orders the rest by the chosen key', () => {
    expect(sortCards(items, 'newest').map((c) => c.slug)).toEqual(['feat', 'soon', 'new', 'old'])
    expect(sortCards(items, 'oldest').map((c) => c.slug)).toEqual(['feat', 'old', 'new', 'soon'])
    expect(sortCards(items, 'title').map((c) => c.slug)).toEqual(['feat', 'old', 'new', 'soon'])
    expect(sortCards(items, 'status').map((c) => c.slug)).toEqual(['feat', 'new', 'old', 'soon'])
  })

  it('does not mutate its input', () => {
    const copy = [...items]
    sortCards(items, 'title')
    expect(items).toEqual(copy)
  })
})

describe('helpers', () => {
  it('parses dates defensively', () => {
    expect(parseDate('2024-05-09T00:00:00.000Z')).toBe(Date.UTC(2024, 4, 9))
    expect(parseDate('not a date')).toBe(0)
    expect(parseDate(undefined)).toBe(0)
  })

  it('pulls nodes out of a connection, skipping nulls', () => {
    expect(connectionNodes({ edges: [{ node: { a: 1 } }, null, { node: null }] })).toEqual([{ a: 1 }])
    expect(connectionNodes(null)).toEqual([])
  })
})
