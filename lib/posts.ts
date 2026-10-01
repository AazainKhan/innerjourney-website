/**
 * Reads blog posts and podcast episodes straight from the markdown files.
 *
 * Pages prefer Tina's GraphQL (so edits show live in the editor); this is the
 * fallback when Tina is unreachable, and the source for the sitemap and
 * social-share images.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import { isListed, parseDate } from '@/lib/resources'

export { isIndexable, isListed } from '@/lib/resources'

export interface CardStyle {
  icon?: string
  tone?: string
}

interface Frontmatter {
  title: string
  publishedAt?: string
  status?: string
  featured?: boolean
  excerpt?: string
  image?: string
  cardStyle?: CardStyle
  relatedService?: string
  seo?: { title?: string; description?: string }
}

export type PostFrontmatter = Frontmatter

export interface PodcastFrontmatter extends Frontmatter {
  episode?: string
  audioUrl?: string
}

export type Post = PostFrontmatter & { slug: string; body: string }
export type Podcast = PodcastFrontmatter & { slug: string; body: string }

const POSTS_DIR = path.join(process.cwd(), 'content/posts')
const PODCASTS_DIR = path.join(process.cwd(), 'content/podcasts')

/** YAML turns ISO timestamps into Dates; keep them as strings like Tina does. */
function normalise<T extends Frontmatter>(data: Record<string, unknown>): T {
  const out = { ...data } as Record<string, unknown>
  if (out.publishedAt instanceof Date) out.publishedAt = out.publishedAt.toISOString()
  return out as unknown as T
}

export function parseEntry<T extends Frontmatter>(slug: string, raw: string): T & { slug: string; body: string } {
  const { data, content } = matter(raw)
  return { ...normalise<T>(data), slug, body: content }
}

async function readDir<T extends Frontmatter>(dir: string) {
  let files: string[] = []
  try {
    files = (await fs.readdir(dir)).filter((f) => f.endsWith('.md'))
  } catch {
    return []
  }
  const entries = await Promise.all(
    files.map(async (file) => parseEntry<T>(file.replace(/\.md$/, ''), await fs.readFile(path.join(dir, file), 'utf-8'))),
  )
  return entries.sort((a, b) => parseDate(b.publishedAt) - parseDate(a.publishedAt))
}

export const listPosts = () => readDir<PostFrontmatter>(POSTS_DIR)
export const listPodcasts = () => readDir<PodcastFrontmatter>(PODCASTS_DIR)

/** Up to `limit` other listed posts, same suggested service first, then newest. */
export function relatedPosts<T extends Post>(all: T[], current: { slug: string; relatedService?: string | null }, limit = 3): T[] {
  const others = all.filter((p) => p.slug !== current.slug && isListed(p.status))
  const same = (p: T) => (current.relatedService && p.relatedService === current.relatedService ? 0 : 1)
  return [...others].sort((a, b) => same(a) - same(b) || parseDate(b.publishedAt) - parseDate(a.publishedAt)).slice(0, limit)
}

/** Filenames come from Tina's slugify; anything else can't be a post. */
export const isSlug = (slug: string) => /^[a-z0-9][a-z0-9-]*$/i.test(slug)

export async function getPost(slug: string): Promise<Post | null> {
  if (!isSlug(slug)) return null
  try {
    return parseEntry<PostFrontmatter>(slug, await fs.readFile(path.join(POSTS_DIR, `${slug}.md`), 'utf-8'))
  } catch {
    return null
  }
}
