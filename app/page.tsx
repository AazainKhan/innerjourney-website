import type { Metadata } from 'next'
import homeData from '@/content/pages/home.json'
import client from '@/tina/__generated__/client'
import HomePageClient from './HomePageClient'

// Tina stores rich-text fields as markdown strings on disk. When GraphQL is
// available it parses them into AST objects; when we fall back to the static
// JSON import we have to do the parse ourselves so <TinaMarkdown> doesn't
// receive a raw string. Handles blank-line paragraph breaks and **bold** spans.
function richText(s: string | null | undefined) {
  const text = (s || '').trim()
  if (!text) return { type: 'root', children: [] }
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.replace(/\n/g, ' ').trim())
    .filter(Boolean)
  return {
    type: 'root',
    children: paragraphs.map((para) => ({ type: 'p', children: parseInline(para) })),
  }
}

function parseInline(s: string) {
  const parts: { type: 'text'; text: string; bold?: boolean }[] = []
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

export const metadata: Metadata = {
  title: 'Shanila - Confidence and Mindset Coach | Transform Your Journey',
  description: 'Transform your life with Shanila\'s expert Confidence and Mindset Coaching. Book A Consultation today and start your journey to success.',
  alternates: { canonical: 'https://innerjourney-with-shanila.com/' },
  openGraph: {
    title: 'Shanila - Confidence and Mindset Coach | Transform Your Journey',
    description: 'Transform your journey with Shanila\'s Confidence and Mindset Coaching.',
    url: 'https://innerjourney-with-shanila.com/',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: 'Your Path back to Purpose' }],
  },
}

export default async function HomePage() {
  const res = await client.queries
    .home({ relativePath: 'home.json' })
    .catch(() => null)

  // Fall back to static JSON if Tina Cloud is unreachable or schema is still indexing.
  // Rich-text fields are stored as plain markdown strings on disk; wrap them in the
  // AST shape that <TinaMarkdown> expects so the client component renders identically
  // whether the data comes from GraphQL (parsed) or the JSON import (raw).
  if (!res) {
    return (
      <HomePageClient
        query=""
        variables={{ relativePath: 'home.json' }}
        data={{
          home: {
            ...homeData,
            heroHeading: richText(homeData.heroHeading),
            heroSubtext: richText(homeData.heroSubtext),
            ctaBody: richText(homeData.ctaBody),
            aboutBody: richText(homeData.aboutBody),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any,
        }}
      />
    )
  }

  return (
    <HomePageClient
      query={res.query}
      variables={res.variables}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data={res.data as any}
    />
  )
}
