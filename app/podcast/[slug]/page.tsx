import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import BookingButton from '@/components/BookingButton'
import { getPodcast, listPodcasts } from '@/lib/posts'

export async function generateStaticParams() {
  const items = await listPodcasts()
  return items.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = await getPodcast(slug)
  if (!p) return { title: 'Episode Not Found' }
  return {
    title: `${p.title} — Inner Journey Podcast`,
    description: p.excerpt ?? undefined,
    alternates: { canonical: `https://innerjourney-with-shanila.com/podcast/${slug}` },
  }
}

function formatDate(iso?: string) {
  if (!iso) return null
  try {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch {
    return null
  }
}

export default async function PodcastEpisodePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = await getPodcast(slug)
  if (!p) notFound()
  const hasAudio = Boolean(p.audioUrl && p.audioUrl.trim())

  return (
    <>
      {/* Hero */}
      <section className="page-hero" style={{ background: 'linear-gradient(135deg, #14213d 0%, #1a2d50 100%)' }}>
        <div className="absolute top-20 right-20 w-72 h-72 bg-carrot/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-20 w-64 h-64 bg-azure/20 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <Link href="/resources" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm uppercase tracking-widest mb-6">
              <i className="fas fa-arrow-left"></i> Back to resources
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`px-3 py-1 ${p.badgeColor || 'bg-carrot'} text-white text-xs rounded-full font-semibold`}>
                <i className="fas fa-podcast mr-1"></i> Podcast
              </span>
              {p.episode && <span className="text-white/70 text-sm">{p.episode}</span>}
              {formatDate(p.publishedAt) && (
                <span className="text-white/60 text-sm">{formatDate(p.publishedAt)}</span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl heading-primary text-white mb-4 leading-tight font-dancing font-bold">
              {p.title}
            </h1>
            {p.excerpt && <p className="text-xl text-white/90 leading-relaxed mb-6">{p.excerpt}</p>}
            {hasAudio ? (
              <a
                href={p.audioUrl!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-carrot hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-all"
              >
                <i className="fas fa-play"></i> Listen now
              </a>
            ) : (
              <span className="inline-flex items-center gap-3 bg-white/10 text-white/70 px-8 py-3 rounded-full font-semibold">
                <i className="fas fa-clock"></i> {p.status || 'Coming soon'}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="relative py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto prose prose-lg prose-headings:heading-secondary prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-azure prose-a:no-underline hover:prose-a:underline prose-strong:text-oxford prose-li:text-gray-700">
            {p.body.trim() ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{p.body}</ReactMarkdown>
            ) : (
              <p className="text-gray-500 italic">Show notes coming soon.</p>
            )}
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="py-16 brand-gradient-azure">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Want to go deeper?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Book a free clarity call and let&apos;s talk about what&apos;s holding you back.
          </p>
          <BookingButton variant="primaryOnDark" />
        </div>
      </section>
    </>
  )
}
