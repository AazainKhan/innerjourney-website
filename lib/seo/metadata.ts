/**
 * Page metadata from the "Google search listing" fields editors fill in Tina.
 *
 * Next.js merges metadata shallowly, so a page's `openGraph` object replaces
 * the layout's entirely. Every page goes through here so the shared fields
 * (site name, locale, type) are never lost.
 */
import type { Metadata } from 'next'
import { BRAND, DEFAULT_OG_IMAGE, absoluteUrl } from '@/lib/seo/site'

export interface SeoFields {
  title?: string | null
  description?: string | null
}

interface PageMetaOptions {
  path: string
  /** Used when the editor leaves the search title empty. */
  fallbackTitle: string
  fallbackDescription: string
  image?: string
  imageAlt?: string
  noindex?: boolean
  article?: { publishedTime?: string | null; authors?: string[] }
}

const clean = (s: string | null | undefined) => (s ?? '').replace(/\s+/g, ' ').trim()

export function pageMetadata(seo: SeoFields | null | undefined, opts: PageMetaOptions): Metadata {
  const title = clean(seo?.title) || clean(opts.fallbackTitle)
  const description = clean(seo?.description) || clean(opts.fallbackDescription)
  const url = absoluteUrl(opts.path)
  const image = { url: opts.image || DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: opts.imageAlt || title }
  return {
    // Absolute: the search title is written in full in Tina, so the layout's
    // "%s | Shanila Khan" template must not add a second brand suffix.
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: opts.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: BRAND,
      locale: 'en_GB',
      images: opts.image === 'generated' ? undefined : [image],
      ...(opts.article
        ? { type: 'article', publishedTime: opts.article.publishedTime ?? undefined, authors: opts.article.authors }
        : { type: 'website' }),
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}
