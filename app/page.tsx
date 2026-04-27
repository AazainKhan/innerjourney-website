import type { Metadata } from 'next'
import homeData from '@/content/pages/home.json'
import client from '@/tina/__generated__/client'
import HomePageClient from './HomePageClient'

export const metadata: Metadata = {
  title: 'Shanila - Clarity and Mindset Coach | Transform Your Journey',
  description: 'Transform your life with Shanila\'s expert Clarity and Mindset Coaching. Book A Consultation today and start your journey to success.',
  alternates: { canonical: 'https://innerjourney-with-shanila.com/' },
  openGraph: {
    title: 'Shanila - Clarity and Mindset Coach | Transform Your Journey',
    description: 'Transform your journey with Shanila\'s Clarity and Mindset Coaching.',
    url: 'https://innerjourney-with-shanila.com/',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: 'Your Path back to Purpose' }],
  },
}

export default async function HomePage() {
  const res = await client.queries
    .home({ relativePath: 'home.json' })
    .catch(() => null)

  // Fall back to static JSON if Tina Cloud is unreachable or schema is still indexing
  if (!res) {
    return (
      <HomePageClient
        query=""
        variables={{ relativePath: 'home.json' }}
        data={{ home: homeData }}
      />
    )
  }

  return (
    <HomePageClient
      query={res.query}
      variables={res.variables}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data={res.data as any}
    />
  )
}
