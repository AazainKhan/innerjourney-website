import type { Metadata } from 'next'
import numerologyData from '@/content/pages/numerology.json'
import client from '@/tina/__generated__/client'
import NumerologyClient from './NumerologyClient'

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
  title: 'Numerology - Vedic Numerology Readings',
  description: 'Get answers fast with a personalised numerology reading. Invaluable insight into your life choices, backed by ancient vedic practices. Book your session today.',
  alternates: { canonical: 'https://innerjourney-with-shanila.com/numerology' },
  openGraph: {
    title: 'Numerology - Shanila Khan | Vedic Numerology Readings',
    description: 'Get answers fast with personalised numerology readings backed by ancient vedic practices.',
    url: 'https://innerjourney-with-shanila.com/numerology',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: 'Numerology with Shanila' }],
  },
}

export default async function NumerologyPage() {
  const res = await client.queries
    .numerology({ relativePath: 'numerology.json' })
    .catch(() => null)

  if (!res) {
    return (
      <NumerologyClient
        query=""
        variables={{ relativePath: 'numerology.json' }}
        data={{
          numerology: {
            ...numerologyData,
            heroSubtext: richText(numerologyData.heroSubtext),
            whatIsIsBody: richText(numerologyData.whatIsIsBody),
            philosophyBody: richText(numerologyData.philosophyBody),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any,
        }}
      />
    )
  }

  return (
    <NumerologyClient
      query={res.query}
      variables={res.variables}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data={res.data as any}
    />
  )
}
