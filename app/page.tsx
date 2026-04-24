import type { Metadata } from 'next'
import homeData from '@/content/pages/home.json'
import HomePageClient from './HomePageClient'

export const metadata: Metadata = {
  title: 'Shanila - Clarity and Mindset Coach | Transform Your Journey',
  description: 'Transform your life with Shanila\'s expert Clarity and Mindset Coaching. Book A Consultation today and start your journey to success.',
  alternates: { canonical: 'https://innerjourney-with-shanila.com/' },
  openGraph: {
    title: 'Shanila - Clarity and Mindset Coach | Transform Your Journey',
    description: 'Transform your journey with Shanila\'s Clarity and Mindset Coaching.',
    url: 'https://innerjourney-with-shanila.com/',
    images: [{ url: '/images/hero_img.jpg' }],
  },
}

const QUERY = `
  query Home($relativePath: String!) {
    home(relativePath: $relativePath) {
      heroHeading
      heroSubtext
      heroCTALabel
      heroBottomCTALabel
      ctaHeading
      ctaLine1
      ctaLine2
      ctaLine3
      ctaMessage1
      ctaMessage2
      aboutHeading
      aboutCredentialTitle
      aboutParagraph1
      aboutParagraph2
      feelLikeYouQuestion1
      feelLikeYouQuestion2
      feelLikeYouQuestion3
      feelLikeYouQuestion4
      feelLikeYouHeading
      feelLikeYouTagline
      servicesHeading
      servicesSubtext
      bottomCTAText
    }
  }
`

export default function HomePage() {
  return (
    <HomePageClient
      query={QUERY}
      variables={{ relativePath: 'home.json' }}
      data={{ home: homeData }}
    />
  )
}
