import type { Metadata } from 'next'
import numerologyData from '@/content/pages/numerology.json'
import client from '@/tina/__generated__/client'
import NumerologyClient from './NumerologyClient'

export const metadata: Metadata = {
  title: 'Numerology for Clarity - Vedic Numerology Readings',
  description: 'Get answers fast with Numerology for Clarity. Invaluable insight into your life choices backed by ancient vedic practices. Book your personalised numerology session today.',
  alternates: { canonical: 'https://innerjourney-with-shanila.com/numerology' },
  openGraph: {
    title: 'Numerology for Clarity - Shanila Khan | Vedic Numerology Readings',
    description: 'Get answers fast with personalised numerology readings backed by ancient vedic practices.',
    url: 'https://innerjourney-with-shanila.com/numerology',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: 'Numerology for Clarity' }],
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
        data={{ numerology: numerologyData }}
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
