import type { Metadata } from 'next'
import servicesData from '@/content/pages/services.json'
import client from '@/tina/__generated__/client'
import ServicesPageClient from './ServicesPageClient'

// Markdown-string → TinaMarkdown AST for the JSON fallback path. Same shape as
// app/page.tsx and app/about/page.tsx.
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
  title: 'Services - Coaching & Numerology',
  description: 'Explore Shanila\'s coaching services including Mindset Coaching, Career Coaching, and Numerology. Find the right path for your transformation.',
  alternates: { canonical: 'https://innerjourney-with-shanila.com/services' },
  openGraph: {
    title: 'Services - Shanila Khan | Coaching & Numerology',
    description: 'Mindset Coaching, Career Coaching, and Numerology — find the right path for your transformation.',
    url: 'https://innerjourney-with-shanila.com/services',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: 'Services with Shanila' }],
  },
}

export default async function ServicesPage() {
  const res = await client.queries
    .services({ relativePath: 'services.json' })
    .catch(() => null)

  if (!res) {
    return (
      <ServicesPageClient
        query=""
        variables={{ relativePath: 'services.json' }}
        data={{
          services: {
            ...servicesData,
            heroSubtext: richText(servicesData.heroSubtext),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any,
        }}
      />
    )
  }

  return (
    <ServicesPageClient
      query={res.query}
      variables={res.variables}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data={res.data as any}
    />
  )
}
