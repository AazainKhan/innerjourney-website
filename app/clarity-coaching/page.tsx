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
      heroCTALabel
      heroSideEmoji
      heroSideWeeks
      heroSideSubtext
      resultsHeadingPrefix
      resultsHeadingHighlight
      resultsSubtext
      perhapsLabel
      perhapsItems { emoji text borderColor }
      bannerText
      bannerHighlight
      missingPieceHeadingPrefix
      missingPieceHeadingHighlight
      problemTitle
      problemParagraph1
      problemQuestion
      problemParagraph2
      problemParagraph3
      solutionTitle
      solutionParagraph1
      solutionEmphasis
      solutionParagraph2
      solutionWord
      philosophyLabel
      philosophyHeadingPrefix
      philosophyHeadingHighlight
      philosophyQuote
      philosophyParagraph1
      philosophyParagraph2
      philosophyBannerPrefix
      philosophyBannerHighlight
      philosophyClosingPrefix
      philosophyClosingHighlight
      timelineLabel
      timelineHeadingPrefix
      timelineHeadingHighlight
      timelineSubtext
      timelineSteps { number weeks title subtitle description accent }
      timelineCTALabel
      experienceLabel
      experienceHeadingPrefix
      experienceHeadingHighlight
      experienceItems { emoji title subtitle bg }
      bonusEmoji
      bonusPrefix
      bonusText
      ctaSectionHeadingPrefix
      ctaSectionHeadingHighlight
      ctaSectionParagraph1
      ctaSectionParagraph2
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
