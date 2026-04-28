'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useTina } from 'tinacms/dist/react'
import BookingButton from '@/components/BookingButton'
import RichText from '@/components/RichText'

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  status: string
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
    ctaSectionHeading: string
    ctaSectionSubtext: string
    ctaButtonLabel: string
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
 */
function FeaturedCard({
  href,
  kind,
  meta,
  title,
  excerpt,
  status,
  icon,
  iconColor,
  gradient,
  badgeColor,
}: {
  href: string
  kind: 'Blog' | 'Podcast'
  meta?: string
  title: string
  excerpt: string
  status: string
  icon: string
  iconColor: string
  gradient: string
  badgeColor: string
}) {
  return (
    <Link
      href={href}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 flex flex-col"
    >
      <div className={`relative h-48 bg-gradient-to-br ${gradient}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <i className={`fas ${icon} text-5xl ${iconColor}`}></i>
        </div>
        <span className={`absolute top-4 left-4 px-3 py-1 ${badgeColor} text-white text-xs rounded-full font-semibold`}>
          {kind === 'Podcast' && <i className="fas fa-podcast mr-1"></i>}
          {kind}
        </span>
        {meta && (
          <span className="absolute top-4 right-4 px-3 py-1 bg-black/30 text-white text-xs rounded-full font-semibold backdrop-blur-sm">
            {meta}
          </span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-azure transition-colors">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3 flex-grow">{excerpt}</p>
        <div className="flex items-center justify-between text-sm mt-auto">
          <span className="text-gray-500">{status}</span>
          <span className="text-azure font-semibold">{kind === 'Podcast' ? 'View episode →' : 'Read more →'}</span>
        </div>
      </div>
    </Link>
  )
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 flex flex-col"
    >
      <div className={`relative h-48 bg-gradient-to-br ${post.gradient}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <i className={`fas ${post.icon} text-5xl ${post.iconColor}`}></i>
        </div>
        <span className={`absolute top-4 left-4 px-3 py-1 ${post.badgeColor} text-white text-xs rounded-full font-semibold`}>
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
  return (
    <Link
      href={`/podcast/${episode.slug}`}
      className="group block rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      style={{ background: 'linear-gradient(135deg, #14213d 0%, #1a2d50 100%)' }}
    >
      <div className="grid md:grid-cols-3 gap-0">
        <div className={`relative h-48 md:h-auto bg-gradient-to-br ${episode.gradient} flex items-center justify-center`}>
          <i className={`fas ${episode.icon} text-6xl text-white/60 group-hover:scale-110 transition-transform`}></i>
        </div>
        <div className="md:col-span-2 p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-4 py-1 ${episode.badgeColor} text-white text-xs rounded-full font-semibold`}>
              <i className="fas fa-podcast mr-1"></i> Podcast
            </span>
            <span className="text-white/70 text-sm">{episode.episode}</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-carrot transition-colors">{episode.title}</h3>
          <p className="text-white/80 mb-6 leading-relaxed line-clamp-3">{episode.excerpt}</p>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-white/60 text-sm">{episode.status}</span>
            <span className="bg-white/20 group-hover:bg-white/30 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all">
              <i className="fas fa-arrow-right mr-2"></i> View episode
            </span>
          </div>
        </div>
      </div>
    </Link>
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
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success'>('idle')

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

  return (
    <>
      {/* Hero */}
      <section className="page-hero bg-gradient-to-br from-oxford via-[#1a2d50] to-azure">
        <div className="absolute top-20 right-20 w-72 h-72 bg-carrot/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-azure/20 rounded-full blur-2xl"></div>

        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block text-carrot font-semibold text-sm uppercase tracking-widest mb-6">{d.heroBadge}</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl heading-primary text-white font-dancing font-bold mb-6 leading-tight">
              <RichText>{d.heroHeading}</RichText> <span className="text-carrot"><RichText>{d.heroHeadingHighlight}</RichText></span>
            </h1>
            <RichText as="p" className="text-lg md:text-xl text-white/90 leading-relaxed">{d.heroSubtext}</RichText>
            {(props.posts.length > 0 || props.podcasts.length > 0) && (
              <nav className="mt-10 flex flex-wrap justify-center gap-4 text-sm font-semibold">
                {hasFeatured && (
                  <a href="#featured" className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm">
                    <i className="fas fa-star mr-2"></i> Featured
                  </a>
                )}
                {props.posts.length > 0 && (
                  <a href="#blog-library" className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm">
                    <i className="fas fa-pen-fancy mr-2"></i> Blog Library
                  </a>
                )}
                {props.podcasts.length > 0 && (
                  <a href="#podcast-library" className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm">
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
                      icon={post.icon}
                      iconColor={post.iconColor}
                      gradient={post.gradient}
                      badgeColor={post.badgeColor}
                    />
                  ))}
                  {featuredPodcasts.map((episode) => (
                    <FeaturedCard
                      key={`featured-podcast-${episode.slug}`}
                      href={`/podcast/${episode.slug}`}
                      kind="Podcast"
                      meta={episode.episode}
                      title={episode.title}
                      excerpt={episode.excerpt}
                      status={episode.status}
                      icon={episode.icon}
                      iconColor="text-white/60"
                      gradient={episode.gradient}
                      badgeColor={episode.badgeColor}
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
              <h2 className="text-3xl md:text-4xl heading-secondary text-gray-900 mb-3 text-center">
                {d.blogLibraryHeading}
              </h2>
              <p className="text-center text-gray-500 mb-12">
                {props.posts.length === 0
                  ? 'New posts coming soon.'
                  : `${props.posts.length} ${props.posts.length === 1 ? 'post' : 'posts'}`}
              </p>
              {props.posts.length === 0 ? (
                <p className="text-center text-gray-500 italic">Add one in Tina&apos;s Blog Posts collection to populate the library.</p>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {props.posts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Podcast Library */}
        <section id="podcast-library" className="py-20 relative scroll-mt-24">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl heading-secondary text-gray-900 mb-3 text-center">
                {d.podcastLibraryHeading}
              </h2>
              <p className="text-center text-gray-500 mb-12">
                {props.podcasts.length === 0
                  ? 'New episodes coming soon.'
                  : `${props.podcasts.length} ${props.podcasts.length === 1 ? 'episode' : 'episodes'}`}
              </p>
              {props.podcasts.length === 0 ? (
                <p className="text-center text-gray-500 italic">Add one in Tina&apos;s Podcast Episodes collection to populate the library.</p>
              ) : (
                <div className="space-y-6">
                  {props.podcasts.map((episode) => (
                    <PodcastCard key={episode.slug} episode={episode} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-oxford to-azure rounded-3xl p-12 text-center shadow-2xl">
                <i className="fas fa-envelope-open-text text-5xl text-carrot mb-6"></i>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{d.newsletterHeading}</h2>
                <p className="text-xl text-white/90 mb-8">{d.newsletterSubtext}</p>
                {newsletterStatus === 'success' ? (
                  <p className="text-white text-lg bg-white/10 rounded-lg px-6 py-3 inline-block">
                    {d.newsletterSuccessMessage}
                  </p>
                ) : (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault()
                      const form = e.currentTarget
                      const email = (form.elements.namedItem('email') as HTMLInputElement)?.value
                      if (!email) return
                      try {
                        await fetch('/api/contact', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ email, name: 'Newsletter signup', message: 'Newsletter subscription request', form_type: 'newsletter' }),
                        })
                      } catch {
                        // non-fatal
                      }
                      setNewsletterStatus('success')
                      form.reset()
                    }}
                    className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
                  >
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder={d.newsletterPlaceholder}
                      className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-carrot"
                    />
                    <button
                      type="submit"
                      className="bg-carrot hover:bg-carrot text-white px-8 py-3 rounded-lg font-semibold transition-all"
                    >
                      {d.newsletterButton}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom CTA */}
      <section className="py-20 brand-gradient-azure">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {d.ctaSectionHeading}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">{d.ctaSectionSubtext}</p>
          <BookingButton label={d.ctaButtonLabel} variant="primaryOnDark" />
        </div>
      </section>
    </>
  )
}
