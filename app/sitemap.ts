import type { MetadataRoute } from 'next'
import { isIndexable, listPosts } from '@/lib/posts'
import { LEEDS_PAGE_PATH } from '@/lib/routes'
import { SITE_URL } from '@/lib/seo/site'

type Freq = MetadataRoute.Sitemap[number]['changeFrequency']

export const STATIC_ROUTES: Array<{ path: string; changeFrequency: Freq; priority: number }> = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/mindset-coaching', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/career-coaching', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/numerology', changeFrequency: 'monthly', priority: 0.9 },
  { path: LEEDS_PAGE_PATH, changeFrequency: 'monthly', priority: 0.9 },
  { path: '/resources', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.6 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await listPosts()
  return [
    // No lastModified on static pages: a build-time "now" changes on every
    // deploy and teaches search engines to ignore the field.
    ...STATIC_ROUTES.map((r) => ({ url: `${SITE_URL}${r.path}`, changeFrequency: r.changeFrequency, priority: r.priority })),
    ...posts
      .filter((p) => isIndexable(p.status))
      .map((p) => ({
        url: `${SITE_URL}/blog/${p.slug}`,
        lastModified: p.publishedAt ? new Date(p.publishedAt) : undefined,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
  ]
}
