import type { Metadata } from 'next'
import aboutData from '@/content/pages/about.json'
import client from '@/tina/__generated__/client'
import AboutPageClient from './AboutPageClient'

// Same shim as app/page.tsx: rich-text fields are stored as markdown strings on
// disk. When GraphQL is available it parses them into AST objects; the JSON
// fallback path has to convert them itself so <TinaMarkdown> doesn't receive a
// raw string. Handles blank-line paragraph breaks and **bold** spans.
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
  title: 'About Shanila - Confidence and Mindset Coach',
  description: 'Learn more about Shanila, a certified Confidence and Mindset Coach with over 10 years of experience helping people rewrite their story with clarity and confidence.',
  alternates: { canonical: 'https://innerjourney-with-shanila.com/about' },
  openGraph: {
    title: 'About Shanila - Confidence and Mindset Coach | Your Journey to Success',
    description: 'Learn more about Shanila, a certified Confidence and Mindset Coach with years of experience helping people build clarity and confidence.',
    url: 'https://innerjourney-with-shanila.com/about',
    images: [{ url: '/images/og-about.jpg', width: 1200, height: 630, alt: 'Meet Shanila Khan' }],
  },
}

export default async function AboutPage() {
  const res = await client.queries
    .about({ relativePath: 'about.json' })
    .catch(() => null)

  if (!res) {
    return (
      <AboutPageClient
        query=""
        variables={{ relativePath: 'about.json' }}
        data={{
          about: {
            ...aboutData,
            heroSubtext: richText(aboutData.heroSubtext),
            storyBody: richText(aboutData.storyBody),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any,
        }}
      />
    )
  }

  return (
    <AboutPageClient
      query={res.query}
      variables={res.variables}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data={res.data as any}
    />
  )
}
