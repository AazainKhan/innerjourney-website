import type { Metadata } from 'next'
import servicesData from '@/content/pages/services.json'
import client from '@/tina/__generated__/client'
import ServicesPageClient from './ServicesPageClient'

export const metadata: Metadata = {
  title: 'Services - Coaching & Numerology',
  description: 'Explore Shanila\'s coaching services including Clarity Coaching, Career Coaching, and Numerology for Clarity. Find the right path for your transformation.',
  alternates: { canonical: 'https://innerjourney-with-shanila.com/services' },
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
        data={{ services: servicesData }}
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
