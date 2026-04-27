import type { Metadata } from 'next'
import clarityData from '@/content/pages/clarity-coaching.json'
import client from '@/tina/__generated__/client'
import ClarityCoachingClient from './ClarityCoachingClient'

export const metadata: Metadata = {
  title: 'Clarity Coaching - Transform Your Life in 12 Weeks',
  description: "Get answers and transform your life in just 12 weeks. Discover the missing piece to achieving lasting change with Shanila's compassionate clarity coaching.",
  alternates: { canonical: 'https://innerjourney-with-shanila.com/clarity-coaching' },
  openGraph: {
    title: 'Clarity Coaching - Shanila Khan | Transform Your Life in 12 Weeks',
    description: 'Get answers and transform your life in just 12 weeks with compassionate clarity coaching.',
    url: 'https://innerjourney-with-shanila.com/clarity-coaching',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: 'Clarity Coaching with Shanila' }],
  },
}

export default async function ClarityCoachingPage() {
  const res = await client.queries
    .clarityCoaching({ relativePath: 'clarity-coaching.json' })
    .catch(() => null)

  if (!res) {
    return (
      <ClarityCoachingClient
        query=""
        variables={{ relativePath: 'clarity-coaching.json' }}
        data={{ clarityCoaching: clarityData }}
      />
    )
  }

  return (
    <ClarityCoachingClient
      query={res.query}
      variables={res.variables}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data={res.data as any}
    />
  )
}
