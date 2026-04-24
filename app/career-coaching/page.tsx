import type { Metadata } from 'next'
import careerData from '@/content/pages/career-coaching.json'
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

const QUERY = `
  query CareerCoaching($relativePath: String!) {
    careerCoaching(relativePath: $relativePath) {
      heroHeading
      heroSubtext
      heroCTALabel
      sectionHeading
      sectionSubtext
      situations
      bannerQuote
      outcomesSectionHeading
      outcomes
      ctaSectionHeading
      ctaSectionSubtext
      ctaButtonLabel
    }
  }
`

export default function CareerCoachingPage() {
  return (
    <CareerCoachingClient
      query={QUERY}
      variables={{ relativePath: 'career-coaching.json' }}
      data={{ careerCoaching: careerData }}
    />
  )
}
