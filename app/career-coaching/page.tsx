import type { Metadata } from 'next'
import careerData from '@/content/pages/career-coaching.json'
import client from '@/tina/__generated__/client'
import CareerCoachingClient from './CareerCoachingClient'

export const metadata: Metadata = {
  title: 'Career Coaching - Feel Clear and Confident in Your Career',
  description: "Feel clear and confident in your career again. Transform your career in just 12 weeks with Shanila's compassionate career coaching programme.",
  alternates: { canonical: 'https://innerjourney-with-shanila.com/career-coaching' },
  openGraph: {
    title: 'Career Coaching - Shanila Khan | Transform Your Career in 12 Weeks',
    description: 'Feel clear and confident in your career again. Transform your career in just 12 weeks.',
    url: 'https://innerjourney-with-shanila.com/career-coaching',
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
        data={{ careerCoaching: careerData }}
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
