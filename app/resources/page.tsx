import type { Metadata } from 'next'
import resourcesData from '@/content/pages/resources.json'
import ResourcesClient from './ResourcesClient'

export const metadata: Metadata = {
  title: 'Resources - Blog Posts & Podcasts for Inner Growth',
  description: 'Explore free resources including blog posts and podcasts on clarity, mindset, personal development and transformation. Start your inner journey today.',
  alternates: { canonical: 'https://innerjourney-with-shanila.com/resources' },
}

const QUERY = `
  query Resources($relativePath: String!) {
    resources(relativePath: $relativePath) {
      heroBadge
      heroHeading
      heroHeadingHighlight
      heroSubtext
      blogHeading
      blogText
      podcastHeading
      podcastText
      ctaSectionHeading
      ctaSectionSubtext
      ctaButtonLabel
    }
  }
`

export default function ResourcesPage() {
  return (
    <ResourcesClient
      query={QUERY}
      variables={{ relativePath: 'resources.json' }}
      data={{ resources: resourcesData }}
    />
  )
}
