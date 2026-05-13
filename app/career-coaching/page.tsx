import type { Metadata } from 'next'
import careerData from '@/content/pages/career-coaching.json'
import client from '@/tina/__generated__/client'
import CareerCoachingClient from './CareerCoachingClient'

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
  title: 'Career Coaching - Feel Clear and Confident in Your Career',
  description: "Feel clear and confident in your career again. Transform your career in just 12 weeks with Shanila's compassionate career coaching programme.",
  alternates: { canonical: 'https://innerjourney-with-shanila.com/career-coaching' },
  openGraph: {
    title: 'Career Coaching - Shanila Khan | Transform Your Career in 12 Weeks',
    description: 'Feel clear and confident in your career again. Transform your career in just 12 weeks.',
    url: 'https://innerjourney-with-shanila.com/career-coaching',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: 'Career Coaching with Shanila' }],
  },
}

export default async function CareerCoachingPage() {
  const res = await client.queries
    .careerCoaching({ relativePath: 'career-coaching.json' })
    .catch(() => null)

  if (!res) {
    return (
      <CareerCoachingClient
        query=""
        variables={{ relativePath: 'career-coaching.json' }}
        data={{
          careerCoaching: {
            ...careerData,
            heroSubtext: richText(careerData.heroSubtext),
            clarityBody: richText(careerData.clarityBody),
            philosophyBody: richText(careerData.philosophyBody),
            ctaSectionBody: richText(careerData.ctaSectionBody),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any,
        }}
      />
    )
  }

  return (
    <CareerCoachingClient
      query={res.query}
      variables={res.variables}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data={res.data as any}
    />
  )
}
