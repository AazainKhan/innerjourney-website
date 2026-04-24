import type { Metadata } from 'next'
import aboutData from '@/content/pages/about.json'
import AboutPageClient from './AboutPageClient'

export const metadata: Metadata = {
  title: 'About Shanila - Clarity and Mindset Coach',
  description: 'Learn more about Shanila, a certified Clarity and Mindset Coach with over 10 years of experience helping people rewrite their story with clarity and confidence.',
  alternates: { canonical: 'https://innerjourney-with-shanila.com/about' },
  openGraph: {
    title: 'About Shanila - Clarity and Mindset Coach | Your Journey to Success',
    description: 'Learn more about Shanila, a certified Clarity and Mindset Coach with years of experience helping people build clarity and confidence.',
    url: 'https://innerjourney-with-shanila.com/about',
    images: [{ url: '/images/about-image.jpg' }],
  },
}

const QUERY = `
  query About($relativePath: String!) {
    about(relativePath: $relativePath) {
      heroHeading
      heroSubtext
      storyHeading
      storyParagraph1
      storyParagraph2
      credentialsHeading
      credentialsSubtext
      credentials {
        icon
        title
        description
        gradient
      }
      valuesHeading
      valuesSubtext
      values {
        icon
        title
        description
      }
      ctaHeading
      ctaSubtext
      ctaButtonLabel
    }
  }
`

export default function AboutPage() {
  return (
    <AboutPageClient
      query={QUERY}
      variables={{ relativePath: 'about.json' }}
      data={{ about: aboutData }}
    />
  )
}
