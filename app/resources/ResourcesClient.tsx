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
    featuredBlogCategory: string
    featuredBlogStatus: string
    featuredBlogTitle: string
    featuredBlogExcerpt: string
    featuredBlogReadTime: string
    featuredBlogCTA: string
    featuredBlogSlug?: string | null
    blogSectionHeading: string
    podcastSectionHeading: string
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
}

type Filter = 'all' | 'blog' | 'podcast'

export default function ResourcesClient(props: Props) {
  const { data } = useTina<ResourcesData>({ query: props.query, variables: props.variables, data: props.data })
  const d = data.resources
  const [filter, setFilter] = useState<Filter>('all')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success'>('idle')

  const featuredHref = d.featuredBlogSlug ? `/blog/${d.featuredBlogSlug}` : null

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
          </div>
        </div>
      </section>

      {/* Content Wrapper */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-azure/5 via-white to-azure/10"></div>
        <div className="absolute top-0 right-10 w-[30rem] h-[30rem] bg-carrot/20 rounded-full blur-3xl"></div>
        <div className="absolute top-10 left-10 w-[28rem] h-[28rem] bg-azure/20 rounded-full blur-3xl"></div>

        {/* Filter Tabs */}
        <section className="py-16 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {([
                { key: 'all', label: 'All Resources', icon: null },
                { key: 'blog', label: 'Blog Posts', icon: 'fa-pen-fancy' },
                { key: 'podcast', label: 'Podcasts', icon: 'fa-podcast' },
              ] as const).map((t) => (
                <button
                  key={t.key}
                  onClick={() => setFilter(t.key)}
                  className={`px-8 py-3 rounded-full shadow-md hover:shadow-lg font-semibold border border-gray-200 transition-all ${
                    filter === t.key
                      ? 'bg-gradient-to-br from-azure to-azure text-white scale-105'
                      : 'bg-white text-gray-700'
                  }`}
                >
                  {t.icon && <i className={`fas ${t.icon} mr-2`}></i>}
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Content */}
        {filter !== 'podcast' && (
          <section className="py-12 relative">
            <div className="container mx-auto px-6 relative z-10">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl heading-secondary text-gray-900 mb-8 text-center">
                  {d.featuredHeading}
                </h2>
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="relative h-64 lg:h-auto bg-gradient-to-br from-azure/20 to-azure/10">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-8">
                          <i className="fas fa-newspaper text-6xl text-azure/40 mb-4"></i>
                          <p className="text-gray-600">Featured Image</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-4 py-1 bg-gradient-to-r from-azure to-azure/50 text-white text-sm rounded-full font-semibold">
                          {d.featuredBlogCategory}
                        </span>
                        <span className="text-gray-500 text-sm">{d.featuredBlogStatus}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        {d.featuredBlogTitle}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {d.featuredBlogExcerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{d.featuredBlogReadTime}</span>
                        {featuredHref ? (
                          <Link href={featuredHref} className="btn-azure-outline px-6 py-2 text-sm">
                            {d.featuredBlogCTA} <i className="fas fa-arrow-right ml-2"></i>
                          </Link>
                        ) : (
                          <span className="text-sm text-gray-400 italic">Link a post by setting Featured Blog Slug in Tina</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        {filter !== 'podcast' && (
          <section className="py-20 relative">
            <div className="container mx-auto px-6 relative z-10">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl heading-secondary text-gray-900 mb-12 text-center">
                  {d.blogSectionHeading}
                </h2>
                {props.posts.length === 0 ? (
                  <p className="text-center text-gray-500 italic">New posts coming soon — add one in Tina&apos;s Blog Posts collection.</p>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {props.posts.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 flex flex-col"
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
                          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                          <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3 flex-grow">{post.excerpt}</p>
                          <div className="flex items-center justify-between text-sm mt-auto">
                            <span className="text-gray-500">{post.status}</span>
                            <span className="text-azure font-semibold">Read more →</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Podcasts */}
        {filter !== 'blog' && (
          <section className="py-20 relative">
            <div className="container mx-auto px-6 relative z-10">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl heading-secondary text-gray-900 mb-12 text-center">
                  {d.podcastSectionHeading}
                </h2>
                {props.podcasts.length === 0 ? (
                  <p className="text-center text-gray-500 italic">New episodes coming soon — add one in Tina&apos;s Podcast Episodes collection.</p>
                ) : (
                  <div className="space-y-6">
                    {props.podcasts.map((p) => (
                      <div key={p.slug} className="rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-2" style={{ background: 'linear-gradient(135deg, #14213d 0%, #1a2d50 100%)' }}>
                        <div className="grid md:grid-cols-3 gap-0">
                          <Link href={`/podcast/${p.slug}`} className={`relative h-48 md:h-auto bg-gradient-to-br ${p.gradient} flex items-center justify-center group`}>
                            <i className={`fas ${p.icon} text-6xl text-white/60 group-hover:scale-110 transition-transform`}></i>
                          </Link>
                          <div className="md:col-span-2 p-8">
                            <div className="flex items-center gap-3 mb-4">
                              <span className={`px-4 py-1 ${p.badgeColor} text-white text-xs rounded-full font-semibold`}>
                                <i className="fas fa-podcast mr-1"></i> Podcast
                              </span>
                              <span className="text-white/70 text-sm">{p.episode}</span>
                            </div>
                            <Link href={`/podcast/${p.slug}`} className="block group">
                              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-carrot transition-colors">{p.title}</h3>
                            </Link>
                            <p className="text-white/80 mb-6 leading-relaxed">{p.excerpt}</p>
                            <div className="flex items-center gap-4 flex-wrap">
                              <span className="text-white/60 text-sm">{p.status}</span>
                              {p.audioUrl ? (
                                <a
                                  href={p.audioUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all"
                                >
                                  <i className="fas fa-play mr-2"></i> Play Episode
                                </a>
                              ) : (
                                <Link
                                  href={`/podcast/${p.slug}`}
                                  className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all"
                                >
                                  <i className="fas fa-arrow-right mr-2"></i> View episode
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

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
