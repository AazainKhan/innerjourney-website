import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'

export interface PostFrontmatter {
  title: string
  publishedAt?: string
  status?: string
  excerpt?: string
  icon?: string
  iconColor?: string
  gradient?: string
  badgeColor?: string
}

export interface Post extends PostFrontmatter {
  slug: string
  body: string
}

export interface PodcastFrontmatter {
  title: string
  episode?: string
  publishedAt?: string
  status?: string
  audioUrl?: string
  excerpt?: string
  icon?: string
  gradient?: string
  badgeColor?: string
}

export interface Podcast extends PodcastFrontmatter {
  slug: string
  body: string
}

const POSTS_DIR = path.join(process.cwd(), 'content/posts')
const PODCASTS_DIR = path.join(process.cwd(), 'content/podcasts')

async function safeReaddir(dir: string): Promise<string[]> {
  try {
    return (await fs.readdir(dir)).filter((f) => f.endsWith('.md'))
  } catch {
    return []
  }
}

function parseDate(iso?: string): number {
  if (!iso) return 0
  const t = new Date(iso).getTime()
  return Number.isFinite(t) ? t : 0
}

export async function listPosts(): Promise<Post[]> {
  const files = await safeReaddir(POSTS_DIR)
  const posts = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(POSTS_DIR, file), 'utf-8')
      const { data, content } = matter(raw)
      return {
        slug: file.replace(/\.md$/, ''),
        body: content,
        ...(data as PostFrontmatter),
      } satisfies Post
    }),
  )
  return posts.sort((a, b) => parseDate(b.publishedAt) - parseDate(a.publishedAt))
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const raw = await fs.readFile(path.join(POSTS_DIR, `${slug}.md`), 'utf-8')
    const { data, content } = matter(raw)
    return { slug, body: content, ...(data as PostFrontmatter) } satisfies Post
  } catch {
    return null
  }
}

export async function listPodcasts(): Promise<Podcast[]> {
  const files = await safeReaddir(PODCASTS_DIR)
  const podcasts = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(PODCASTS_DIR, file), 'utf-8')
      const { data, content } = matter(raw)
      return {
        slug: file.replace(/\.md$/, ''),
        body: content,
        ...(data as PodcastFrontmatter),
      } satisfies Podcast
    }),
  )
  return podcasts.sort((a, b) => parseDate(b.publishedAt) - parseDate(a.publishedAt))
}

export async function getPodcast(slug: string): Promise<Podcast | null> {
  try {
    const raw = await fs.readFile(path.join(PODCASTS_DIR, `${slug}.md`), 'utf-8')
    const { data, content } = matter(raw)
    return { slug, body: content, ...(data as PodcastFrontmatter) } satisfies Podcast
  } catch {
    return null
  }
}
