import type { Metadata } from 'next'
import clarityData from '@/content/pages/clarity-coaching.json'
import ClarityCoachingClient from './ClarityCoachingClient'

export const metadata: Metadata = {
  title: 'Clarity Coaching - Transform Your Life in 12 Weeks',
  description: "Get answers and transform your life in just 12 weeks. Discover the missing piece to achieving lasting change with Shanila's compassionate clarity coaching.",
  alternates: { canonical: 'https://innerjourney-with-shanila.com/clarity-coaching' },
  openGraph: {
    title: 'Clarity Coaching - Shanila Khan | Transform Your Life in 12 Weeks',
    description: 'Get answers and transform your life in just 12 weeks with compassionate clarity coaching.',
    url: 'https://innerjourney-with-shanila.com/clarity-coaching',
  },
}

const QUERY = `
  query ClarityCoaching($relativePath: String!) {
    clarityCoaching(relativePath: $relativePath) {
      heroBadge
      heroHeading
      heroSubtext
      sectionHeading
      sectionSubtext
      perhapsItems {
        emoji
        text
      }
      bannerQuote
      outcomesSectionHeading
      outcomes
      ctaSectionHeading
      ctaSectionSubtext
      ctaButtonLabel
    }
  }
`

export default function ClarityCoachingPage() {
  return (
    <ClarityCoachingClient
      query={QUERY}
      variables={{ relativePath: 'clarity-coaching.json' }}
      data={{ clarityCoaching: clarityData }}
    />
  )
}
