'use client'

import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { tinaField } from 'tinacms/dist/react'
import { TinaMarkdown, type TinaMarkdownContent } from 'tinacms/dist/rich-text'
import { postCardLook } from '@/lib/design-tokens'
import { SERVICE_PAGES, type ServiceKey } from '@/lib/routes'
import { usePageDoc, type TinaDocProps } from '@/lib/use-tina-doc'
import type { PostQuery } from '@/tina/__generated__/types'

function formatDate(iso?: string | null) {
  if (!iso) return null
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? null : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

/** True when a Tina rich-text AST (or raw markdown fallback) has any content. */
function hasBody(body: unknown) {
  if (typeof body === 'string') return body.trim().length > 0
  return Boolean((body as { children?: unknown[] } | null)?.children?.length)
}

export interface RelatedPost {
  slug: string
  title: string
  excerpt: string
  image: string
}

interface Props extends TinaDocProps<PostQuery> {
  labels: {
    backLink: string
    empty: string
    readMore: string
    ending: { serviceEyebrow?: string; serviceHeading?: string; serviceText?: string; serviceButton?: string; relatedHeading?: string }
  }
  related: RelatedPost[]
}

export default function BlogPostClient({ labels, related, ...props }: Props) {
  const { post } = usePageDoc<PostQuery>(props, 'content/posts')
  const date = formatDate(post.publishedAt)
  const badge = postCardLook(post.cardStyle?.tone).badge
  const service = SERVICE_PAGES[post.relatedService as ServiceKey]
  // Editors write {service} where the service name goes (Resources › Blog library › End of each post).
  const withService = (text: string | undefined, fallback: string, casing: 'title' | 'lower') =>
    (text || fallback).replace(/\{service\}/g, service ? (casing === 'lower' ? service.title.toLowerCase() : service.title) : '')
  const ending = labels.ending

  return (
    <>
      {/* Hero */}
      <section className="page-hero brand-gradient-oxford-azure">
        <div className="absolute top-20 right-20 w-72 h-72 bg-carrot/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        {/* Cover image fills the hero with a dark overlay so the text stays
         * legible. Falls back to the gradient hero when no image is set. */}
        {post.image && (
          <>
            <Image src={post.image} alt="" fill priority className="object-cover opacity-30" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" aria-hidden="true" />
          </>
        )}
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <Link href="/resources#blog-library" className="inline-flex items-center gap-2 text-on-secondary/70 hover:text-on-secondary text-sm uppercase tracking-widest mb-6">
              <i className="fas fa-arrow-left" aria-hidden="true"></i> {labels.backLink}
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {post.status && (
                <span data-tina-field={tinaField(post, 'status')} className={`px-3 py-1 ${badge} text-on-primary text-xs rounded-full font-semibold uppercase tracking-wider`}>
                  {post.status}
                </span>
              )}
              {date && <span data-tina-field={tinaField(post, 'publishedAt')} className="text-on-secondary/60 text-sm">{date}</span>}
              <span className="text-on-secondary/60 text-sm">
                by{' '}
                <Link href="/about" rel="author" className="underline hover:text-on-secondary">
                  Shanila Khan
                </Link>
              </span>
            </div>
            <h1 data-tina-field={tinaField(post, 'title')} className="text-4xl md:text-5xl lg:text-6xl heading-primary text-on-secondary mb-4 leading-tight font-dancing font-bold">
              {post.title}
            </h1>
            {post.excerpt && <p data-tina-field={tinaField(post, 'excerpt')} className="text-xl text-on-secondary/90 leading-relaxed">{post.excerpt}</p>}
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="relative py-20 bg-white">
        <div className="container mx-auto px-6">
          <div data-tina-field={tinaField(post, 'body')} className="max-w-3xl mx-auto prose prose-lg prose-headings:heading-secondary prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-azure prose-a:no-underline hover:prose-a:underline prose-strong:text-oxford prose-li:text-gray-700">
            {!hasBody(post.body) ? (
              <p className="text-gray-500 italic">{labels.empty}</p>
            ) : typeof post.body === 'string' ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
            ) : (
              <TinaMarkdown content={post.body as TinaMarkdownContent} />
            )}
          </div>

          {/* Next step: the service this post relates to */}
          {service && (
            <aside data-tina-field={tinaField(post, 'relatedService')} className="max-w-3xl mx-auto mt-16 rounded-2xl brand-gradient-oxford p-8 md:p-10 text-on-secondary">
              {ending.serviceEyebrow && <p className="text-sm uppercase tracking-widest text-carrot font-semibold mb-2">{ending.serviceEyebrow}</p>}
              <h2 className="text-2xl md:text-3xl font-bold mb-3">{withService(ending.serviceHeading, 'Ready to go further with {service}?', 'lower')}</h2>
              {ending.serviceText && <p className="text-on-secondary/85 mb-6">{ending.serviceText}</p>}
              <Link href={service.path} className="btn-azure inline-block font-semibold">
                {withService(ending.serviceButton, 'Explore {service}', 'title')}
              </Link>
            </aside>
          )}
        </div>
      </article>

      {/* More articles */}
      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 id="related-heading" className="text-3xl md:text-4xl heading-secondary text-gray-900 mb-8 text-center">{ending.relatedHeading || 'Keep reading'}</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {related.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className="group bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col">
                    {r.image && (
                      <div className="relative h-40">
                        <Image src={r.image} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-azure transition-colors">{r.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-grow">{r.excerpt}</p>
                      <span className="text-azure font-semibold text-sm mt-4">{labels.readMore} →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
