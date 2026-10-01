import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { hydrateRichText, markdownToAst } from '@/lib/tina-fallback'
import { formFromPath, previewRoute } from '@/lib/tina-select'
import { isSlug, parseEntry } from '@/lib/posts'
import { CONTENT, readJson } from './helpers'

const schema = {
  collections: [
    {
      name: 'page',
      fields: [
        { name: 'hero', type: 'object', fields: [{ name: 'subtext', type: 'rich-text' }, { name: 'heading', type: 'string' }] },
        { name: 'cards', type: 'object', list: true, fields: [{ name: 'body', type: 'rich-text' }] },
        { name: 'body', type: 'rich-text' },
      ],
    },
  ],
}

describe('rich-text fallback', () => {
  it('parses paragraphs and bold text', () => {
    expect(markdownToAst('One\n\n**Two** three')).toEqual({
      type: 'root',
      children: [
        { type: 'p', children: [{ type: 'text', text: 'One' }] },
        { type: 'p', children: [{ type: 'text', text: 'Two', bold: true }, { type: 'text', text: ' three' }] },
      ],
    })
  })

  it('hydrates rich-text at any depth and leaves other fields alone', () => {
    const out = hydrateRichText('page', { hero: { subtext: 'Hi', heading: 'H' }, cards: [{ body: 'A' }, { body: 'B' }], body: 'Top' }, schema)
    expect(out.hero.heading).toBe('H')
    expect(out.hero.subtext).toMatchObject({ type: 'root' })
    expect(out.cards.map((c) => (c.body as unknown as { type: string }).type)).toEqual(['root', 'root'])
    expect(out.body).toMatchObject({ type: 'root' })
  })

  it('works against the real generated schema', () => {
    const home = hydrateRichText('home', readJson(path.join(CONTENT, 'pages/home.json')))
    expect(home.hero.subtext).toMatchObject({ type: 'root' })
    expect(typeof home.services.heading).toBe('string')
  })
})

describe('preview routes', () => {
  it('maps /preview paths to document form ids', () => {
    expect(formFromPath('/preview/footer.json')).toBe('content/footer.json')
    expect(formFromPath('/preview/podcasts/intro.md')).toBe('content/podcasts/intro.md')
    expect(formFromPath('/')).toBeNull()
    expect(formFromPath('/preview/')).toBeNull()
    expect(formFromPath('/preview/../secrets')).toBeNull()
  })

  it('round-trips with previewRoute', () => {
    expect(formFromPath(previewRoute('testimonials.json'))).toBe('content/testimonials.json')
  })
})

describe('posts', () => {
  it('accepts only slug-shaped names', () => {
    expect(isSlug('numbers-are-story-tellers')).toBe(true)
    expect(isSlug('../package')).toBe(false)
    expect(isSlug('')).toBe(false)
  })

  it('keeps publish dates as ISO strings', () => {
    const e = parseEntry('x', '---\ntitle: X\npublishedAt: 2024-05-09T00:00:00.000Z\nfeatured: true\n---\nBody')
    expect(e).toMatchObject({ slug: 'x', title: 'X', publishedAt: '2024-05-09T00:00:00.000Z', featured: true, body: 'Body' })
  })
})
