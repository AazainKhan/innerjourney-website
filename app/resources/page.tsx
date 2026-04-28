import type { Metadata } from 'next'
import resourcesData from '@/content/pages/resources.json'
import client from '@/tina/__generated__/client'
import { listPosts, listPodcasts } from '@/lib/posts'
import ResourcesClient from './ResourcesClient'

export const metadata: Metadata = {
  title: 'Resources - Blog Posts & Podcasts for Inner Growth',
  description: 'Explore free resources including blog posts and podcasts on clarity, mindset, personal development and transformation. Start your inner journey today.',
  alternates: { canonical: 'https://innerjourney-with-shanila.com/resources' },
  openGraph: {
    title: 'Resources - Shanila Khan | Blog Posts & Podcasts',
    description: 'Free resources on clarity, mindset, and personal development. Start your inner journey today.',
    url: 'https://innerjourney-with-shanila.com/resources',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: 'Resources from Inner Journey' }],
  },
}

export default async function ResourcesPage() {
  const [res, allPosts, allPodcasts] = await Promise.all([
    client.queries.resources({ relativePath: 'resources.json' }).catch(() => null),
    listPosts(),
    listPodcasts(),
  ])

  const posts = allPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? '',
    status: p.status ?? '',
    icon: p.icon ?? 'fa-pen-fancy',
    iconColor: p.iconColor ?? 'text-carrot/40',
    gradient: p.gradient ?? 'from-carrot/10 to-carrot/20',
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
    gradient: p.gradient ?? 'from-carrot/30 to-carrot/50/30',
    badgeColor: p.badgeColor ?? 'bg-carrot',
  }))

  if (!res) {
    return (
      <ResourcesClient
        query=""
        variables={{ relativePath: 'resources.json' }}
        data={{ resources: resourcesData }}
        posts={posts}
        podcasts={podcasts}
      />
    )
  }

  return (
    <ResourcesClient
      query={res.query}
      variables={res.variables}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data={res.data as any}
      posts={posts}
      podcasts={podcasts}
    />
  )
}
