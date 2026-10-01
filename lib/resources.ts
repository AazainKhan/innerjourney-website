/**
 * Shapes blog posts and podcast episodes into the cards shown on /resources.
 * Pure functions — shared by the page and its tests.
 */
import { getIcon } from '@/lib/icons'
import { podcastGlow, postCardLook } from '@/lib/design-tokens'

export function parseDate(iso?: string | Date | null): number {
  if (!iso) return 0
  const t = new Date(iso).getTime()
  return Number.isFinite(t) ? t : 0
}

/**
 * Draft posts/episodes are never listed or put in the sitemap, and draft /
 * "Coming Soon" posts carry noindex. Their pages still render so the Tina
 * preview works while they're being written.
 */
export const isListed = (status?: string | null) => status !== 'Draft'
export const isIndexable = (status?: string | null) => !status || status === 'Published'

export type SortKey = 'newest' | 'oldest' | 'title' | 'status'

export interface EntryNode {
  title?: string | null
  publishedAt?: string | null
  status?: string | null
  featured?: boolean | null
  excerpt?: string | null
  image?: string | null
  episode?: string | null
  audioUrl?: string | null
  cardStyle?: { icon?: string | null; tone?: string | null } | null
  _sys?: { filename: string } | null
}

export interface ResourceCard {
  slug: string
  title: string
  excerpt: string
  status: string
  publishedAt: string
  featured: boolean
  image: string
  icon: string
  gradient: string
  iconColor: string
  episode: string
  audioUrl: string
}

export function toCard(node: EntryNode, kind: 'post' | 'podcast'): ResourceCard {
  const tone = node.cardStyle?.tone
  const look = postCardLook(tone)
  return {
    slug: node._sys?.filename ?? '',
    title: node.title ?? '',
    excerpt: node.excerpt ?? '',
    status: node.status ?? '',
    publishedAt: node.publishedAt ?? '',
    featured: Boolean(node.featured),
    image: node.image ?? '',
    icon: getIcon(node.cardStyle?.icon)?.id ?? (kind === 'post' ? 'fa-pen-fancy' : 'fa-microphone-alt'),
    gradient: kind === 'post' ? look.gradient : podcastGlow(tone),
    iconColor: kind === 'post' ? look.iconColor : 'text-white/60',
    episode: node.episode ?? '',
    audioUrl: (node.audioUrl ?? '').trim(),
  }
}

const STATUS_RANK: Record<string, number> = { Published: 0, 'Coming Soon': 1 }

/** Sort a library; featured items always stay on top, the chosen order applies within each group. */
export function sortCards(items: ResourceCard[], key: SortKey): ResourceCard[] {
  const byKey = (a: ResourceCard, b: ResourceCard) => {
    switch (key) {
      case 'oldest':
        return parseDate(a.publishedAt) - parseDate(b.publishedAt)
      case 'title':
        return a.title.localeCompare(b.title)
      case 'status':
        return (STATUS_RANK[a.status] ?? 2) - (STATUS_RANK[b.status] ?? 2) || parseDate(b.publishedAt) - parseDate(a.publishedAt)
      default:
        return parseDate(b.publishedAt) - parseDate(a.publishedAt)
    }
  }
  return [...items].sort((a, b) => Number(b.featured) - Number(a.featured) || byKey(a, b))
}

/** Nodes out of a Tina connection result, skipping nulls. */
export function connectionNodes<T>(conn: { edges?: ({ node?: T | null } | null)[] | null } | null | undefined): T[] {
  return (conn?.edges ?? []).map((e) => e?.node).filter((n): n is T => n != null)
}
