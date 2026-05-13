import type { Metadata } from 'next'
import resourcesData from '@/content/pages/resources.json'
import client from '@/tina/__generated__/client'
import { listPosts, listPodcasts } from '@/lib/posts'
import ResourcesClient from './ResourcesClient'

// References can come back from Tina as either:
//   - the raw file path stored on disk: "content/posts/foo.md"
//   - an expanded document object with `_sys.filename`
//   - a bare slug (when read directly from the static JSON fallback)
// This collapses all three to the slug we use in URLs.
function refToSlug(ref: unknown): string | null {
  if (typeof ref === 'string') {
    const m = ref.match(/(?:^|\/)([^/]+)\.md$/)
    return m ? m[1] : ref
  }
  if (ref && typeof ref === 'object') {
    const sys = (ref as { _sys?: { filename?: string } })._sys
    if (sys?.filename) return sys.filename
  }
  return null
}

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
    image: p.image ?? '',
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
    image: p.image ?? '',
    icon: p.icon ?? 'fa-microphone-alt',
    gradient: p.gradient ?? 'from-carrot/30 to-carrot/50/30',
    badgeColor: p.badgeColor ?? 'bg-carrot',
  }))

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resourcesPayload: any = res?.data?.resources ?? resourcesData
  const featuredPostSlugs = ((resourcesPayload.featuredPosts ?? []) as { post?: unknown }[])
    .map((item) => refToSlug(item?.post))
    .filter((s): s is string => Boolean(s))
  const featuredPodcastSlugs = ((resourcesPayload.featuredPodcasts ?? []) as { podcast?: unknown }[])
    .map((item) => refToSlug(item?.podcast))
    .filter((s): s is string => Boolean(s))

  if (!res) {
    return (
      <ResourcesClient
        query=""
        variables={{ relativePath: 'resources.json' }}
        data={{ resources: resourcesData }}
        posts={posts}
        podcasts={podcasts}
        featuredPostSlugs={featuredPostSlugs}
        featuredPodcastSlugs={featuredPodcastSlugs}
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
      featuredPostSlugs={featuredPostSlugs}
      featuredPodcastSlugs={featuredPodcastSlugs}
    />
  )
}
