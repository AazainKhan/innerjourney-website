import type { Metadata } from 'next'
import clarityData from '@/content/pages/clarity-coaching.json'
import client from '@/tina/__generated__/client'
import MindsetCoachingClient from './MindsetCoachingClient'

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
  title: 'Mindset Coaching - Transform Your Life in 12 Weeks',
  description: "Get answers and transform your life in just 12 weeks. Discover the missing piece to achieving lasting change with Shanila's compassionate mindset coaching.",
  alternates: { canonical: 'https://innerjourney-with-shanila.com/mindset-coaching' },
  openGraph: {
    title: 'Mindset Coaching - Shanila Khan | Transform Your Life in 12 Weeks',
    description: 'Get answers and transform your life in just 12 weeks with compassionate mindset coaching.',
    url: 'https://innerjourney-with-shanila.com/mindset-coaching',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: 'Mindset Coaching with Shanila' }],
  },
}

export default async function MindsetCoachingPage() {
  const res = await client.queries
    .clarityCoaching({ relativePath: 'clarity-coaching.json' })
    .catch(() => null)

  if (!res) {
    return (
      <MindsetCoachingClient
        query=""
        variables={{ relativePath: 'clarity-coaching.json' }}
        data={{
          clarityCoaching: {
            ...clarityData,
            heroSubtext: richText(clarityData.heroSubtext),
            problemBody: richText(clarityData.problemBody),
            solutionBody: richText(clarityData.solutionBody),
            philosophyBody: richText(clarityData.philosophyBody),
            ctaSectionBody: richText(clarityData.ctaSectionBody),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any,
        }}
      />
    )
  }

  return (
    <MindsetCoachingClient
      query={res.query}
      variables={res.variables}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data={res.data as any}
    />
  )
}
