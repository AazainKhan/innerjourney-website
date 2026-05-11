import type { Metadata } from 'next'
import clarityData from '@/content/pages/clarity-coaching.json'
import client from '@/tina/__generated__/client'
import MindsetCoachingClient from './MindsetCoachingClient'

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
        data={{ clarityCoaching: clarityData }}
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
