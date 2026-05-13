import type { MetadataRoute } from 'next'
import { listPosts } from '@/lib/posts'

const SITE_URL = 'https://innerjourney-with-shanila.com'

const STATIC_ROUTES: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }> = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/mindset-coaching', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/career-coaching', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/numerology', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/resources', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.6 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await listPosts()
  const now = new Date()

  return [
    ...STATIC_ROUTES.map((r) => ({
      url: `${SITE_URL}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: p.publishedAt ? new Date(p.publishedAt) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
