'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useTina } from 'tinacms/dist/react'
import RichText from '@/components/RichText'

type SortKey = 'newest' | 'oldest' | 'title' | 'status'

const INITIAL_VISIBLE = 3

// Shared "kind" tag style — theme-aware, consistent across every card so the
// per-item badgeColor doesn't introduce contrast issues. Blog uses azure
// (accent), Podcast uses carrot (primary).
const BLOG_TAG_CLASS = 'bg-azure text-on-accent'
const PODCAST_TAG_CLASS = 'bg-carrot text-on-primary'

function sortByKey<T extends { title: string; publishedAt?: string; status?: string }>(items: T[], key: SortKey, featured?: Set<string>, slugOf?: (item: T) => string): T[] {
  const next = [...items]
  if (key === 'newest') {
    next.sort((a, b) => Date.parse(b.publishedAt || '') - Date.parse(a.publishedAt || ''))
  } else if (key === 'oldest') {
    next.sort((a, b) => Date.parse(a.publishedAt || '') - Date.parse(b.publishedAt || ''))
  } else if (key === 'title') {
    next.sort((a, b) => a.title.localeCompare(b.title))
  } else if (key === 'status') {
    // Published → Coming Soon → Draft (or any unknown)
    const rank = (s?: string) => (s === 'Published' ? 0 : s === 'Coming Soon' ? 1 : 2)
    next.sort((a, b) => rank(a.status) - rank(b.status) || Date.parse(b.publishedAt || '') - Date.parse(a.publishedAt || ''))
  }
  // If featured set provided, hoist featured items to the top while preserving the chosen sort within each group
  if (featured && featured.size > 0 && slugOf) {
    next.sort((a, b) => {
      const af = featured.has(slugOf(a)) ? 0 : 1
      const bf = featured.has(slugOf(b)) ? 0 : 1
      return af - bf
    })
  }
  return next
}

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  status: string
  image: string
  icon: string
  iconColor: string
  gradient: string
  badgeColor: string
}

interface Podcast {
  slug: string
  episode: string
  title: string
  excerpt: string
  status: string
  audioUrl: string
  image: string
  icon: string
  gradient: string
  badgeColor: string
}

interface ResourcesData {
  resources: {
    heroBadge: string
    heroHeading: string
    heroHeadingHighlight: string
    heroSubtext: string
    featuredHeading: string
    blogLibraryHeading: string
    podcastLibraryHeading: string
    newsletterHeading: string
    newsletterSubtext: string
    newsletterPlaceholder: string
    newsletterButton: string
    newsletterSuccessMessage: string
  }
}

interface Props {
  query: string
  variables: { relativePath: string }
  data: ResourcesData
  posts: BlogPost[]
  podcasts: Podcast[]
  /** Slugs resolved server-side from `resources.featuredPosts` references. */
  featuredPostSlugs: string[]
  /** Slugs resolved server-side from `resources.featuredPodcasts` references. */
  featuredPodcastSlugs: string[]
}

/**
 * Unified card used in the Featured row — same vertical shape for both blog
 * posts and podcast episodes, so the 2-up grid stays balanced. Library
 * sections below render their own type-specific shapes (BlogCard / PodcastCard).
 *
 * Podcast cards open the external listen URL in a new tab (Spotify / Apple /
 * YouTube). Blog cards use the internal Next router via <Link>.
 */
function FeaturedCard({
  href,
  external,
  kind,
  title,
  excerpt,
  status,
  image,
  icon,
  iconColor,
  gradient,
}: {
  href: string
  external?: boolean
  kind: 'Blog' | 'Podcast'
  title: string
  excerpt: string
  status: string
  image?: string
  icon: string
  iconColor: string
  gradient: string
}) {
  const tagClass = kind === 'Podcast' ? PODCAST_TAG_CLASS : BLOG_TAG_CLASS
  const isPlaceholderHref = !href || href === '#'
  // External + has a real URL → open in new tab. Internal → Next router. No
  // href (podcasts without a listen link yet) → non-clickable div so we don't
  // ship a broken anchor.
  const Wrapper = isPlaceholderHref
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? ({ children, className }: any) => (
        <div className={`${className} cursor-not-allowed opacity-90`}>{children}</div>
      )
    : external
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? ({ children, ...rest }: any) => (
        <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>
      )
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    : ({ children, ...rest }: any) => (
        <Link href={href} {...rest}>{children}</Link>
      )
  return (
    <Wrapper
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 flex flex-col"
    >
      <div className={`relative h-48 ${image ? '' : `bg-gradient-to-br ${gradient}`}`}>
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <i className={`fas ${icon} text-5xl ${iconColor}`}></i>
          </div>
        )}
        <span className={`absolute top-4 left-4 px-3 py-1 ${tagClass} text-xs rounded-full font-semibold inline-flex items-center gap-1 z-10`}>
          {kind === 'Podcast' && <i className="fas fa-podcast"></i>}
          {kind}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-azure transition-colors">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3 flex-grow">{excerpt}</p>
        <div className="flex items-center justify-between text-sm mt-auto">
          <span className="text-gray-500">{status}</span>
          <span className="text-azure font-semibold">
            {kind === 'Podcast'
              ? (isPlaceholderHref ? 'Coming soon' : 'Listen now ↗')
              : 'Read more →'}
          </span>
        </div>
      </div>
    </Wrapper>
  )
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 flex flex-col"
    >
      <div className={`relative h-48 ${post.image ? '' : `bg-gradient-to-br ${post.gradient}`}`}>
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <i className={`fas ${post.icon} text-5xl ${post.iconColor}`}></i>
          </div>
        )}
        <span className={`absolute top-4 left-4 px-3 py-1 ${BLOG_TAG_CLASS} text-xs rounded-full font-semibold z-10`}>
          Blog
        </span>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-azure transition-colors">{post.title}</h3>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3 flex-grow">{post.excerpt}</p>
        <div className="flex items-center justify-between text-sm mt-auto">
          <span className="text-gray-500">{post.status}</span>
          <span className="text-azure font-semibold">Read more →</span>
        </div>
      </div>
    </Link>
  )
}

function PodcastCard({ episode }: { episode: Podcast }) {
  const hasAudio = Boolean(episode.audioUrl && episode.audioUrl.trim())
  const cardClass = 'group block rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl brand-gradient-oxford-deep'
  const Wrapper = hasAudio
    ? ({ children }: { children: React.ReactNode }) => (
        <a href={episode.audioUrl} target="_blank" rel="noopener noreferrer" className={cardClass}>{children}</a>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <div className={`${cardClass} cursor-not-allowed opacity-90`}>{children}</div>
      )
  return (
    <Wrapper>
      <div className="grid md:grid-cols-3 gap-0">
        <div className={`relative h-48 md:h-auto ${episode.image ? '' : `bg-gradient-to-br ${episode.gradient}`} flex items-center justify-center overflow-hidden`}>
          {episode.image ? (
            <Image
              src={episode.image}
              alt={episode.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <i className={`fas ${episode.icon} text-6xl text-on-secondary/60 group-hover:scale-110 transition-transform`}></i>
          )}
        </div>
        <div className="md:col-span-2 p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-4 py-1 ${PODCAST_TAG_CLASS} text-xs rounded-full font-semibold inline-flex items-center gap-1`}>
              <i className="fas fa-podcast"></i> Podcast
            </span>
          </div>
          <h3 className="text-2xl font-bold text-on-secondary mb-3 group-hover:text-carrot transition-colors">{episode.title}</h3>
          <p className="text-on-secondary/80 mb-6 leading-relaxed line-clamp-3">{episode.excerpt}</p>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-on-secondary/60 text-sm">{episode.status}</span>
            <span className="bg-on-secondary/10 group-hover:bg-on-secondary/20 text-on-secondary px-6 py-2 rounded-full text-sm font-semibold transition-all">
              {hasAudio ? (
                <><i className="fas fa-external-link-alt mr-2"></i> Listen now</>
              ) : (
                <><i className="fas fa-clock mr-2"></i> Coming soon</>
              )}
            </span>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default function ResourcesClient(props: Props) {
  const { data } = useTina<ResourcesData>({
    query: props.query,
    variables: props.variables,
    data: props.data,
    experimental___selectFormByFormId() {
      return `content/pages/${props.variables.relativePath}`
    },
  })
  const d = data.resources
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [newsletterError, setNewsletterError] = useState<string>('')
  const [newsletterAlreadySubscribed, setNewsletterAlreadySubscribed] = useState(false)
  const [blogSort, setBlogSort] = useState<SortKey>('newest')
  const [podcastSort, setPodcastSort] = useState<SortKey>('newest')
  const [blogShowAll, setBlogShowAll] = useState(false)
  const [podcastShowAll, setPodcastShowAll] = useState(false)

  // Resolve featured slugs against the all-posts/all-podcasts lists. Drop slugs
  // that don't match anything (typo / deleted post) so the section never breaks.
  const postBySlug = new Map(props.posts.map((p) => [p.slug, p]))
  const podcastBySlug = new Map(props.podcasts.map((p) => [p.slug, p]))

  const featuredPosts = props.featuredPostSlugs
    .map((slug) => postBySlug.get(slug))
    .filter((p): p is BlogPost => Boolean(p))

  const featuredPodcasts = props.featuredPodcastSlugs
    .map((slug) => podcastBySlug.get(slug))
    .filter((p): p is Podcast => Boolean(p))

  const hasFeatured = featuredPosts.length > 0 || featuredPodcasts.length > 0

  const featuredPostSlugSet = useMemo(() => new Set(props.featuredPostSlugs), [props.featuredPostSlugs])
  const featuredPodcastSlugSet = useMemo(() => new Set(props.featuredPodcastSlugs), [props.featuredPodcastSlugs])

  // Sorted lists for the library sections — sort is applied client-side so the
  // user can switch ordering without a roundtrip. Featured items are hoisted to
  // the top for any sort, then the chosen sort applies within each group.
  const sortedPosts = useMemo(
    () => sortByKey(props.posts, blogSort, featuredPostSlugSet, (p) => p.slug),
    [props.posts, blogSort, featuredPostSlugSet],
  )
  const sortedPodcasts = useMemo(
    () => sortByKey(props.podcasts, podcastSort, featuredPodcastSlugSet, (p) => p.slug),
    [props.podcasts, podcastSort, featuredPodcastSlugSet],
  )

  const visiblePosts = blogShowAll ? sortedPosts : sortedPosts.slice(0, INITIAL_VISIBLE)
  const visiblePodcasts = podcastShowAll ? sortedPodcasts : sortedPodcasts.slice(0, INITIAL_VISIBLE)

  return (
    <>
      {/* Hero */}
      <section className="page-hero brand-gradient-oxford-azure">
        <div className="absolute top-20 right-20 w-72 h-72 bg-carrot/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-azure/20 rounded-full blur-2xl"></div>

        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block text-carrot font-semibold text-sm uppercase tracking-widest mb-6">{d.heroBadge}</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl heading-primary text-on-secondary font-dancing font-bold mb-6 leading-tight">
              <RichText>{d.heroHeading}</RichText> <span className="text-carrot"><RichText>{d.heroHeadingHighlight}</RichText></span>
            </h1>
            <RichText as="p" className="text-lg md:text-xl text-on-secondary/90 leading-relaxed">{d.heroSubtext}</RichText>
            {(props.posts.length > 0 || props.podcasts.length > 0) && (
              <nav className="mt-10 flex flex-wrap justify-center gap-4 text-sm font-semibold">
                {hasFeatured && (
                  <a href="#featured" className="px-5 py-2 rounded-full bg-on-secondary/10 hover:bg-on-secondary/20 text-on-secondary transition-colors backdrop-blur-sm">
                    <i className="fas fa-star mr-2"></i> Featured
                  </a>
                )}
                {props.posts.length > 0 && (
                  <a href="#blog-library" className="px-5 py-2 rounded-full bg-on-secondary/10 hover:bg-on-secondary/20 text-on-secondary transition-colors backdrop-blur-sm">
                    <i className="fas fa-pen-fancy mr-2"></i> Blog Library
                  </a>
                )}
                {props.podcasts.length > 0 && (
                  <a href="#podcast-library" className="px-5 py-2 rounded-full bg-on-secondary/10 hover:bg-on-secondary/20 text-on-secondary transition-colors backdrop-blur-sm">
                    <i className="fas fa-podcast mr-2"></i> Podcast Library
                  </a>
                )}
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
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-carrot/15 text-carrot text-sm font-semibold uppercase tracking-wider">
                    <i className="fas fa-star"></i> {d.featuredHeading}
                  </span>
                </div>
                <div className="grid lg:grid-cols-2 gap-8">
                  {featuredPosts.map((post) => (
                    <FeaturedCard
                      key={`featured-blog-${post.slug}`}
                      href={`/blog/${post.slug}`}
                      kind="Blog"
                      title={post.title}
                      excerpt={post.excerpt}
                      status={post.status}
                      image={post.image}
                      icon={post.icon}
                      iconColor={post.iconColor}
                      gradient={post.gradient}
                    />
                  ))}
                  {featuredPodcasts.map((episode) => (
                    <FeaturedCard
                      key={`featured-podcast-${episode.slug}`}
                      href={episode.audioUrl || '#'}
                      external
                      kind="Podcast"
                      title={episode.title}
                      excerpt={episode.excerpt}
                      status={episode.status}
                      image={episode.image}
                      icon={episode.icon}
                      iconColor="text-white/60"
                      gradient={episode.gradient}
                    />
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
                  <h2 className="text-3xl md:text-4xl heading-secondary text-gray-900 mb-2">{d.blogLibraryHeading}</h2>
                  <p className="text-gray-500 text-sm">
                    {props.posts.length === 0
                      ? 'New posts coming soon.'
                      : `${props.posts.length} ${props.posts.length === 1 ? 'post' : 'posts'}${blogShowAll || props.posts.length <= INITIAL_VISIBLE ? '' : ` · showing latest ${visiblePosts.length}`}`}
                  </p>
                </div>
                {props.posts.length > 1 && (
                  <SortControl id="blog-sort" label="Sort posts" value={blogSort} onChange={setBlogSort} />
                )}
              </div>
              {props.posts.length === 0 ? (
                <p className="text-center text-gray-500 italic">Add one in Tina&apos;s Blog Posts collection to populate the library.</p>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {visiblePosts.map((post) => (
                      <BlogCard key={post.slug} post={post} />
                    ))}
                  </div>
                  {sortedPosts.length > INITIAL_VISIBLE && (
                    <div className="text-center mt-10">
                      <button
                        onClick={() => setBlogShowAll((v) => !v)}
                        className="inline-flex items-center gap-2 rounded-full bg-azure text-on-accent px-6 py-3 text-sm font-semibold shadow-azure hover:brightness-110 transition-all"
                      >
                        {blogShowAll ? (
                          <>Show less <i className="fas fa-chevron-up"></i></>
                        ) : (
                          <>View all {sortedPosts.length} posts <i className="fas fa-chevron-down"></i></>
                        )}
                      </button>
                    </div>
                  )}
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
                  <h2 className="text-3xl md:text-4xl heading-secondary text-gray-900 mb-2">{d.podcastLibraryHeading}</h2>
                  <p className="text-gray-500 text-sm">
                    {props.podcasts.length === 0
                      ? 'New episodes coming soon.'
                      : `${props.podcasts.length} ${props.podcasts.length === 1 ? 'episode' : 'episodes'}${podcastShowAll || props.podcasts.length <= INITIAL_VISIBLE ? '' : ` · showing latest ${visiblePodcasts.length}`}`}
                  </p>
                </div>
                {props.podcasts.length > 1 && (
                  <SortControl id="podcast-sort" label="Sort episodes" value={podcastSort} onChange={setPodcastSort} />
                )}
              </div>
              {props.podcasts.length === 0 ? (
                <p className="text-center text-gray-500 italic">Add one in Tina&apos;s Podcast Episodes collection to populate the library.</p>
              ) : (
                <>
                  <div className="space-y-6">
                    {visiblePodcasts.map((episode) => (
                      <PodcastCard key={episode.slug} episode={episode} />
                    ))}
                  </div>
                  {sortedPodcasts.length > INITIAL_VISIBLE && (
                    <div className="text-center mt-10">
                      <button
                        onClick={() => setPodcastShowAll((v) => !v)}
                        className="inline-flex items-center gap-2 rounded-full bg-azure text-on-accent px-6 py-3 text-sm font-semibold shadow-azure hover:brightness-110 transition-all"
                      >
                        {podcastShowAll ? (
                          <>Show less <i className="fas fa-chevron-up"></i></>
                        ) : (
                          <>View all {sortedPodcasts.length} episodes <i className="fas fa-chevron-down"></i></>
                        )}
                      </button>
                    </div>
                  )}
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
                <i className="fas fa-envelope-open-text text-5xl text-carrot mb-6"></i>
                <h2 className="text-3xl md:text-4xl font-bold text-on-secondary mb-4">{d.newsletterHeading}</h2>
                <p className="text-xl text-on-secondary/90 mb-8">{d.newsletterSubtext}</p>
                {newsletterStatus === 'success' ? (
                  <p className="text-on-secondary text-lg bg-on-secondary/10 rounded-lg px-6 py-3 inline-block">
                    {newsletterAlreadySubscribed
                      ? "You're already on the list. Stay tuned!"
                      : d.newsletterSuccessMessage}
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
                        placeholder={d.newsletterPlaceholder}
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
                        {newsletterStatus === 'submitting' ? 'Subscribing…' : d.newsletterButton}
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
