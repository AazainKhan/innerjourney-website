import type { Metadata } from 'next'
import resourcesData from '@/content/pages/resources.json'
import { listPosts, listPodcasts } from '@/lib/posts'
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
      featuredHeading
      featuredBlogCategory
      featuredBlogStatus
      featuredBlogTitle
      featuredBlogExcerpt
      featuredBlogReadTime
      featuredBlogCTA
      featuredBlogSlug
      blogSectionHeading
      podcastSectionHeading
      newsletterHeading
      newsletterSubtext
      newsletterPlaceholder
      newsletterButton
      newsletterSuccessMessage
      ctaSectionHeading
      ctaSectionSubtext
      ctaButtonLabel
    }
  }
`

export default async function ResourcesPage() {
  const [allPosts, allPodcasts] = await Promise.all([listPosts(), listPodcasts()])

  const posts = allPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? '',
    status: p.status ?? '',
    icon: p.icon ?? 'fa-pen-fancy',
    iconColor: p.iconColor ?? 'text-carrot/40',
    gradient: p.gradient ?? 'from-orange-100 to-orange-200',
    badgeColor: p.badgeColor ?? 'bg-carrot',
  }))

  const podcasts = allPodcasts.map((p) => ({
    slug: p.slug,
    episode: p.episode ?? '',
    title: p.title,
    excerpt: p.excerpt ?? '',
    status: p.status ?? '',
    audioUrl: p.audioUrl ?? '',
    icon: p.icon ?? 'fa-microphone-alt',
    gradient: p.gradient ?? 'from-carrot/30 to-orange-500/30',
    badgeColor: p.badgeColor ?? 'bg-carrot',
  }))

  return (
    <ResourcesClient
      query={QUERY}
      variables={{ relativePath: 'resources.json' }}
      data={{ resources: resourcesData }}
      posts={posts}
      podcasts={podcasts}
    />
  )
}
