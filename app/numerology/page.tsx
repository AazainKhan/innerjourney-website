import type { Metadata } from 'next'
import numerologyData from '@/content/pages/numerology.json'
import NumerologyClient from './NumerologyClient'

export const metadata: Metadata = {
  title: 'Numerology for Clarity - Vedic Numerology Readings',
  description: 'Get answers fast with Numerology for Clarity. Invaluable insight into your life choices backed by ancient vedic practices. Book your personalised numerology session today.',
  alternates: { canonical: 'https://innerjourney-with-shanila.com/numerology' },
  openGraph: {
    title: 'Numerology for Clarity - Shanila Khan | Vedic Numerology Readings',
    description: 'Get answers fast with personalised numerology readings backed by ancient vedic practices.',
    url: 'https://innerjourney-with-shanila.com/numerology',
  },
}

const QUERY = `
  query Numerology($relativePath: String!) {
    numerology(relativePath: $relativePath) {
      heroBadge
      heroHeading
      heroTagline
      heroSubtext
      heroCTALabel
      whatIsHeading
      whatIsSubtext
      comparisonText
      powerText
      sessionIncludes
      ctaSectionHeading
      ctaSectionSubtext
      ctaButtonLabel
    }
  }
`

export default function NumerologyPage() {
  return (
    <NumerologyClient
      query={QUERY}
      variables={{ relativePath: 'numerology.json' }}
      data={{ numerology: numerologyData }}
    />
  )
}
