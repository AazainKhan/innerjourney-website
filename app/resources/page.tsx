import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/metadata'
import resourcesData from '@/content/pages/resources.json'
import client from '@/tina/__generated__/client'
import { loadTinaDoc } from '@/lib/tina-page'
import { listPodcasts, listPosts, type Podcast, type Post } from '@/lib/posts'
import type { PodcastConnectionQuery, PostConnectionQuery, ResourcesQuery } from '@/tina/__generated__/types'
import ResourcesClient, { type ConnectionDoc } from './ResourcesClient'

export function generateMetadata(): Metadata {
  return pageMetadata(resourcesData.seo, {
    path: '/resources',
    fallbackTitle: 'Resources - Blog Posts & Podcasts for Inner Growth',
    fallbackDescription: 'Explore free resources including blog posts and podcasts on clarity, mindset, personal development and transformation. Start your inner journey today.',
    image: '/images/og-default.jpg',
    imageAlt: 'Resources from Inner Journey',
  })
}

/** Posts/episodes via Tina (so each card is click-to-edit), else straight from the markdown files. */
async function loadLibrary<T>(kind: 'post' | 'podcast'): Promise<ConnectionDoc<T>> {
  const query = kind === 'post' ? client.queries.postConnection : client.queries.podcastConnection
  const res = await query({ first: 500 }).catch(() => null)
  if (res) return { query: res.query, variables: res.variables as Record<string, unknown>, data: res.data as T }
  const entries: (Post | Podcast)[] = kind === 'post' ? await listPosts() : await listPodcasts()
  const edges = entries.map(({ slug, body: _body, ...fm }) => ({ node: { ...fm, _sys: { filename: slug } } }))
  return { query: '', variables: {}, data: { [`${kind}Connection`]: { edges } } as T }
}

export default async function ResourcesPage() {
  const [page, posts, podcasts] = await Promise.all([
    loadTinaDoc<ResourcesQuery>('resources', 'resources.json', resourcesData),
    loadLibrary<PostConnectionQuery>('post'),
    loadLibrary<PodcastConnectionQuery>('podcast'),
  ])
  return <ResourcesClient {...page} posts={posts} podcasts={podcasts} />
}
