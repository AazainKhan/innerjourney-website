import type { Metadata } from 'next'
import aboutData from '@/content/pages/about.json'
import client from '@/tina/__generated__/client'
import AboutPageClient from './AboutPageClient'

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
        data={{ about: aboutData }}
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
