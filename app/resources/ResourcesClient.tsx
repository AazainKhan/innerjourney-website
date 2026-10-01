'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { tinaField, useTina } from 'tinacms/dist/react'
import HighlightedText from '@/components/HighlightedText'
import Icon from '@/components/Icon'
import { connectionNodes, isListed, sortCards, toCard, type EntryNode, type ResourceCard, type SortKey } from '@/lib/resources'
import { present, usePageDoc, type TinaDocProps } from '@/lib/use-tina-doc'
import type { PodcastConnectionQuery, PostConnectionQuery, ResourcesQuery } from '@/tina/__generated__/types'

const INITIAL_VISIBLE = 3

// Shared "kind" tag style — theme-aware and consistent on every card. Blog uses
// azure (accent), Podcast uses carrot (primary).
const BLOG_TAG_CLASS = 'bg-azure text-on-accent'
const PODCAST_TAG_CLASS = 'bg-carrot text-on-primary'

const SECTION_IDS = { featured: 'featured', blog: 'blog-library', podcast: 'podcast-library' } as const

export interface ConnectionDoc<T> {
  query: string
  variables: Record<string, unknown>
  data: T
}

type Card = ResourceCard & { field: string; titleField: string; excerptField: string }

/** Live (editable) cards from a Tina connection result. */
function useCards(doc: ConnectionDoc<PostConnectionQuery | PodcastConnectionQuery>, kind: 'post' | 'podcast'): Card[] {
  const { data } = useTina(doc)
  const conn = kind === 'post' ? (data as PostConnectionQuery).postConnection : (data as PodcastConnectionQuery).podcastConnection
  return connectionNodes<EntryNode & object>(conn).filter((node) => isListed(node.status)).map((node) => ({
    ...toCard(node, kind),
    field: tinaField(node as never),
    titleField: tinaField(node as never, 'title' as never),
    excerptField: tinaField(node as never, 'excerpt' as never),
  }))
}

interface Props extends TinaDocProps<ResourcesQuery> {
  posts: ConnectionDoc<PostConnectionQuery>
  podcasts: ConnectionDoc<PodcastConnectionQuery>
}

function CardMedia({ card, sizes, iconSize = 'text-5xl' }: { card: Card; sizes: string; iconSize?: string }) {
  return card.image ? (
    <Image
      src={card.image}
      alt={card.title}
      fill
      className="object-cover transition-transform duration-300 group-hover:scale-105"
      sizes={sizes}
    />
  ) : (
    <div className="absolute inset-0 flex items-center justify-center">
      <Icon name={card.icon} className={`${iconSize} ${card.iconColor}`} />
    </div>
  )
}

/**
 * Unified card used in the Featured row — same vertical shape for posts and
 * episodes so the 2-up grid stays balanced. Episodes open the external listen
 * URL; posts use the Next router; an episode with no link yet renders as a
 * non-clickable card so we never ship a broken anchor.
 */
function FeaturedCard({ card, kind, labels }: { card: Card; kind: 'Blog' | 'Podcast'; labels: CardLabels }) {
  const tagClass = kind === 'Podcast' ? PODCAST_TAG_CLASS : BLOG_TAG_CLASS
  const href = kind === 'Podcast' ? card.audioUrl : `/blog/${card.slug}`
  const className = 'group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 flex flex-col'
  const body = (
    <>
      <div className={`relative h-48 ${card.image ? '' : `bg-gradient-to-br ${card.gradient}`}`}>
        <CardMedia card={card} sizes="(max-width: 768px) 100vw, 50vw" />
        <span className={`absolute top-4 left-4 px-3 py-1 ${tagClass} text-xs rounded-full font-semibold inline-flex items-center gap-1 z-10`}>
          {kind === 'Podcast' && <i className="fas fa-podcast" aria-hidden="true"></i>}
          {kind}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 data-tina-field={card.titleField} className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-azure transition-colors">{card.title}</h3>
        <p data-tina-field={card.excerptField} className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3 flex-grow">{card.excerpt}</p>
        <div className="flex items-center justify-between text-sm mt-auto">
          <span className="text-gray-500">{card.status}</span>
          <span className="text-azure font-semibold">
            {kind === 'Podcast' ? (href ? `${labels.listen} ↗` : labels.comingSoon) : `${labels.readMore} →`}
          </span>
        </div>
      </div>
    </>
  )
  if (!href) return <div data-tina-field={card.field} className={`${className} cursor-not-allowed opacity-90`}>{body}</div>
  if (kind === 'Podcast') {
    return <a href={href} target="_blank" rel="noopener noreferrer" data-tina-field={card.field} className={className}>{body}</a>
  }
  return <Link href={href} data-tina-field={card.field} className={className}>{body}</Link>
}

function BlogCard({ card, labels }: { card: Card; labels: CardLabels }) {
  return (
    <Link
      href={`/blog/${card.slug}`}
      data-tina-field={card.field}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 flex flex-col"
    >
      <div className={`relative h-48 ${card.image ? '' : `bg-gradient-to-br ${card.gradient}`}`}>
        <CardMedia card={card} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        <span className={`absolute top-4 left-4 px-3 py-1 ${BLOG_TAG_CLASS} text-xs rounded-full font-semibold z-10`}>
          Blog
        </span>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 data-tina-field={card.titleField} className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-azure transition-colors">{card.title}</h3>
        <p data-tina-field={card.excerptField} className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3 flex-grow">{card.excerpt}</p>
        <div className="flex items-center justify-between text-sm mt-auto">
          <span className="text-gray-500">{card.status}</span>
          <span className="text-azure font-semibold">{labels.readMore} →</span>
        </div>
      </div>
    </Link>
  )
}

function PodcastCard({ card, labels }: { card: Card; labels: CardLabels }) {
  const cardClass = 'group block rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl brand-gradient-oxford-deep'
  const body = (
    <div className="grid md:grid-cols-3 gap-0">
      <div className={`relative h-48 md:h-auto ${card.image ? '' : `bg-gradient-to-br ${card.gradient}`} flex items-center justify-center overflow-hidden`}>
        {card.image ? (
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <Icon name={card.icon} className="text-6xl text-on-secondary/60 group-hover:scale-110 transition-transform" />
        )}
      </div>
      <div className="md:col-span-2 p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className={`px-4 py-1 ${PODCAST_TAG_CLASS} text-xs rounded-full font-semibold inline-flex items-center gap-1`}>
            <i className="fas fa-podcast" aria-hidden="true"></i> Podcast
          </span>
        </div>
        <h3 data-tina-field={card.titleField} className="text-2xl font-bold text-on-secondary mb-3 group-hover:text-carrot transition-colors">{card.title}</h3>
        <p data-tina-field={card.excerptField} className="text-on-secondary/80 mb-6 leading-relaxed line-clamp-3">{card.excerpt}</p>
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-on-secondary/60 text-sm">{card.status}</span>
          <span className="bg-on-secondary/10 group-hover:bg-on-secondary/20 text-on-secondary px-6 py-2 rounded-full text-sm font-semibold transition-all">
            {card.audioUrl ? (
              <><i className="fas fa-external-link-alt mr-2" aria-hidden="true"></i> {labels.listen}</>
            ) : (
              <><i className="fas fa-clock mr-2" aria-hidden="true"></i> {labels.comingSoon}</>
            )}
          </span>
        </div>
      </div>
    </div>
  )
  return card.audioUrl ? (
    <a href={card.audioUrl} target="_blank" rel="noopener noreferrer" data-tina-field={card.field} className={cardClass}>{body}</a>
  ) : (
    <div data-tina-field={card.field} className={`${cardClass} cursor-not-allowed opacity-90`}>{body}</div>
  )
}

interface CardLabels {
  readMore: string
  listen: string
  comingSoon: string
}

function LibraryShowAll({ showAll, total, noun, onToggle }: { showAll: boolean; total: number; noun: string; onToggle: () => void }) {
  if (total <= INITIAL_VISIBLE) return null
  return (
    <div className="text-center mt-10">
      <button
        onClick={onToggle}
        className="inline-flex items-center gap-2 rounded-full bg-azure text-on-accent px-6 py-3 text-sm font-semibold shadow-azure hover:brightness-110 transition-all"
      >
        {showAll ? (
          <>Show less <i className="fas fa-chevron-up" aria-hidden="true"></i></>
        ) : (
          <>View all {total} {noun} <i className="fas fa-chevron-down" aria-hidden="true"></i></>
        )}
      </button>
    </div>
  )
}

function countLine(total: number, visible: number, showAll: boolean, one: string, many: string, empty: string) {
  if (total === 0) return empty
  const base = `${total} ${total === 1 ? one : many}`
  return showAll || total <= INITIAL_VISIBLE ? base : `${base} · showing latest ${visible}`
}

export default function ResourcesClient(props: Props) {
  const { resources: d } = usePageDoc<ResourcesQuery>(props)
  const { hero, featured, blogLibrary, podcastLibrary, newsletter } = d
  const posts = useCards(props.posts, 'post')
  const podcasts = useCards(props.podcasts, 'podcast')

  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [newsletterError, setNewsletterError] = useState<string>('')
  const [newsletterAlreadySubscribed, setNewsletterAlreadySubscribed] = useState(false)
  const [blogSort, setBlogSort] = useState<SortKey>('newest')
  const [podcastSort, setPodcastSort] = useState<SortKey>('newest')
  const [blogShowAll, setBlogShowAll] = useState(false)
  const [podcastShowAll, setPodcastShowAll] = useState(false)

  const labels: CardLabels = {
    readMore: blogLibrary?.readMoreLabel || 'Read more',
    listen: podcastLibrary?.listenLabel || 'Listen now',
    comingSoon: podcastLibrary?.comingSoonLabel || 'Coming soon',
  }

  const featuredPosts = posts.filter((p) => p.featured)
  const featuredPodcasts = podcasts.filter((p) => p.featured)
  const hasFeatured = featuredPosts.length > 0 || featuredPodcasts.length > 0

  // Sort is client-side so visitors can switch order without a round trip.
  const sortedPosts = useMemo(() => sortCards(posts, blogSort) as Card[], [posts, blogSort])
  const sortedPodcasts = useMemo(() => sortCards(podcasts, podcastSort) as Card[], [podcasts, podcastSort])
  const visiblePosts = blogShowAll ? sortedPosts : sortedPosts.slice(0, INITIAL_VISIBLE)
  const visiblePodcasts = podcastShowAll ? sortedPodcasts : sortedPodcasts.slice(0, INITIAL_VISIBLE)

  // A jump button hides itself while the section it points at is empty.
  const sectionHasContent = { featured: hasFeatured, blog: posts.length > 0, podcast: podcasts.length > 0 }
  const navItems = present(d.sectionNav).filter((n) => n.target && sectionHasContent[n.target as keyof typeof sectionHasContent])

  return (
    <>
      {/* Hero */}
      <section className="page-hero brand-gradient-oxford-azure">
        <div className="absolute top-20 right-20 w-72 h-72 bg-carrot/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-azure/20 rounded-full blur-2xl"></div>

        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <span data-tina-field={tinaField(hero, 'eyebrow')} className="inline-block text-carrot font-semibold text-sm uppercase tracking-widest mb-6">{hero?.eyebrow}</span>
            <h1 data-tina-field={tinaField(hero, 'heading')} className="text-4xl md:text-5xl lg:text-6xl heading-primary text-on-secondary font-dancing font-bold mb-6 leading-tight">
              <HighlightedText text={hero?.heading} highlight={hero?.highlight} highlightClassName="text-carrot" />
            </h1>
            <p data-tina-field={tinaField(hero, 'subtext')} className="text-lg md:text-xl text-on-secondary/90 leading-relaxed">{hero?.subtext}</p>
            {navItems.length > 0 && (
              <nav className="mt-10 flex flex-wrap justify-center gap-4 text-sm font-semibold" aria-label="Jump to section">
                {navItems.map((item, i) => (
                  <a
                    key={`${item.target}-${i}`}
                    href={`#${SECTION_IDS[item.target as keyof typeof SECTION_IDS]}`}
                    data-tina-field={tinaField(item)}
                    className="px-5 py-2 rounded-full bg-on-secondary/10 hover:bg-on-secondary/20 text-on-secondary transition-colors backdrop-blur-sm"
                  >
                    <Icon name={item.icon} className="mr-2" /> {item.label}
                  </a>
                ))}
              </nav>
            )}
          </div>
        </div>
      </section>

      {/* Content Wrapper */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-azure/5 via-white to-azure/10"></div>
        <div className="absolute top-0 right-10 w-[30rem] h-[30rem] bg-carrot/20 rounded-full blur-3xl"></div>
        <div className="absolute top-10 left-10 w-[28rem] h-[28rem] bg-azure/20 rounded-full blur-3xl"></div>

        {/* Featured */}
        {hasFeatured && (
          <section id="featured" className="py-20 relative scroll-mt-24">
            <div className="container mx-auto px-6 relative z-10">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-12">
                  <span data-tina-field={tinaField(featured, 'heading')} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-carrot/15 text-carrot text-sm font-semibold uppercase tracking-wider">
                    <i className="fas fa-star" aria-hidden="true"></i> {featured?.heading}
                  </span>
                </div>
                <div className="grid lg:grid-cols-2 gap-8">
                  {featuredPosts.map((card) => (
                    <FeaturedCard key={`featured-blog-${card.slug}`} card={card} kind="Blog" labels={labels} />
                  ))}
                  {featuredPodcasts.map((card) => (
                    <FeaturedCard key={`featured-podcast-${card.slug}`} card={card} kind="Podcast" labels={labels} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Blog Library */}
        <section id="blog-library" className="py-20 relative scroll-mt-24">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                <div className="text-center md:text-left">
                  <h2 data-tina-field={tinaField(blogLibrary, 'heading')} className="text-3xl md:text-4xl heading-secondary text-gray-900 mb-2">{blogLibrary?.heading}</h2>
                  <p className="text-gray-500 text-sm">
                    {countLine(posts.length, visiblePosts.length, blogShowAll, 'post', 'posts', 'New posts coming soon.')}
                  </p>
                </div>
                {posts.length > 1 && (
                  <SortControl id="blog-sort" label="Sort posts" value={blogSort} onChange={setBlogSort} />
                )}
              </div>
              {posts.length === 0 ? (
                <p className="text-center text-gray-500 italic">Add one in Tina&apos;s Blog Posts collection to populate the library.</p>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {visiblePosts.map((card) => (
                      <BlogCard key={card.slug} card={card} labels={labels} />
                    ))}
                  </div>
                  <LibraryShowAll showAll={blogShowAll} total={sortedPosts.length} noun="posts" onToggle={() => setBlogShowAll((v) => !v)} />
                </>
              )}
            </div>
          </div>
        </section>

        {/* Podcast Library */}
        <section id="podcast-library" className="py-20 relative scroll-mt-24">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                <div className="text-center md:text-left">
                  <h2 data-tina-field={tinaField(podcastLibrary, 'heading')} className="text-3xl md:text-4xl heading-secondary text-gray-900 mb-2">{podcastLibrary?.heading}</h2>
                  <p className="text-gray-500 text-sm">
                    {countLine(podcasts.length, visiblePodcasts.length, podcastShowAll, 'episode', 'episodes', 'New episodes coming soon.')}
                  </p>
                </div>
                {podcasts.length > 1 && (
                  <SortControl id="podcast-sort" label="Sort episodes" value={podcastSort} onChange={setPodcastSort} />
                )}
              </div>
              {podcasts.length === 0 ? (
                <p className="text-center text-gray-500 italic">Add one in Tina&apos;s Podcast Episodes collection to populate the library.</p>
              ) : (
                <>
                  <div className="space-y-6">
                    {visiblePodcasts.map((card) => (
                      <PodcastCard key={card.slug} card={card} labels={labels} />
                    ))}
                  </div>
                  <LibraryShowAll showAll={podcastShowAll} total={sortedPodcasts.length} noun="episodes" onToggle={() => setPodcastShowAll((v) => !v)} />
                </>
              )}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="brand-gradient-oxford-azure rounded-3xl p-12 text-center shadow-2xl">
                <i className="fas fa-envelope-open-text text-5xl text-carrot mb-6" aria-hidden="true"></i>
                <h2 data-tina-field={tinaField(newsletter, 'heading')} className="text-3xl md:text-4xl font-bold text-on-secondary mb-4">{newsletter?.heading}</h2>
                <p data-tina-field={tinaField(newsletter, 'subtext')} className="text-xl text-on-secondary/90 mb-8">{newsletter?.subtext}</p>
                {newsletterStatus === 'success' ? (
                  <p className="text-on-secondary text-lg bg-on-secondary/10 rounded-lg px-6 py-3 inline-block">
                    {newsletterAlreadySubscribed
                      ? "You're already on the list. Stay tuned!"
                      : newsletter?.successMessage}
                  </p>
                ) : (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault()
                      const form = e.currentTarget
                      const email = (form.elements.namedItem('email') as HTMLInputElement)?.value
                      const website = (form.elements.namedItem('website') as HTMLInputElement)?.value
                      if (!email) return
                      setNewsletterStatus('submitting')
                      setNewsletterError('')
                      try {
                        const res = await fetch('/api/newsletter', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ email, website }),
                        })
                        const data = await res.json().catch(() => ({} as { error?: string; alreadySubscribed?: boolean }))
                        if (res.ok && data && (data as { success?: boolean }).success !== false) {
                          setNewsletterAlreadySubscribed(Boolean((data as { alreadySubscribed?: boolean }).alreadySubscribed))
                          setNewsletterStatus('success')
                          form.reset()
                        } else {
                          setNewsletterStatus('error')
                          setNewsletterError((data as { error?: string }).error || 'Something went wrong. Please try again.')
                        }
                      } catch {
                        setNewsletterStatus('error')
                        setNewsletterError('Something went wrong. Please try again.')
                      }
                    }}
                    className="flex flex-col gap-3 justify-center max-w-md mx-auto"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder={newsletter?.placeholder ?? ''}
                        className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-carrot"
                      />
                      {/* Honeypot — hidden from humans, bots fill it. */}
                      <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        className="hidden"
                        aria-hidden="true"
                      />
                      <button
                        type="submit"
                        disabled={newsletterStatus === 'submitting'}
                        className="bg-carrot hover:bg-carrot text-on-primary px-8 py-3 rounded-lg font-semibold transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {newsletterStatus === 'submitting' ? 'Subscribing…' : newsletter?.buttonLabel}
                      </button>
                    </div>
                    {newsletterStatus === 'error' && newsletterError && (
                      <p className="text-on-secondary/90 text-sm bg-red-500/20 rounded-md px-4 py-2">{newsletterError}</p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

function SortControl({ id, label, value, onChange }: { id: string; label: string; value: SortKey; onChange: (v: SortKey) => void }) {
  return (
    <div className="flex items-center gap-2 self-center md:self-end">
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-azure"
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="title">Title (A–Z)</option>
        <option value="status">Status</option>
      </select>
    </div>
  )
}
