'use client'

import { useState } from 'react'
import { useTina } from 'tinacms/dist/react'
import BookingButton from '@/components/BookingButton'

interface BlogPost {
  title: string
  excerpt: string
  status: string
  icon: string
  iconColor: string
  gradient: string
  badgeColor: string
}

interface Podcast {
  episode: string
  title: string
  excerpt: string
  status: string
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
    blogSectionHeading: string
    blogPosts: BlogPost[]
    podcastSectionHeading: string
    podcasts: Podcast[]
    newsletterHeading: string
    newsletterSubtext: string
    newsletterPlaceholder: string
    newsletterButton: string
    ctaSectionHeading: string
    ctaSectionSubtext: string
    ctaButtonLabel: string
  }
}

interface Props {
  query: string
  variables: { relativePath: string }
  data: ResourcesData
}

type Filter = 'all' | 'blog' | 'podcast'

export default function ResourcesClient(props: Props) {
  const { data } = useTina<ResourcesData>(props)
  const d = data.resources
  const [filter, setFilter] = useState<Filter>('all')

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-oxford via-[#1a2d50] to-azure">
        <div className="absolute top-20 right-20 w-72 h-72 bg-carrot/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-azure/20 rounded-full blur-2xl"></div>

        <div className="container mx-auto px-6 relative z-20 py-32">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block text-carrot font-semibold text-sm uppercase tracking-widest mb-6">{d.heroBadge}</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl heading-primary text-white mb-6 leading-tight font-dancing font-bold">
              {d.heroHeading} <span className="text-carrot">{d.heroHeadingHighlight}</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              {d.heroSubtext}
            </p>
          </div>
        </div>
      </section>

      {/* Content Wrapper with Gradients */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-100"></div>
        <div className="absolute top-0 right-10 w-[30rem] h-[30rem] bg-orange-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-10 left-10 w-[28rem] h-[28rem] bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-[25%] right-[35%] w-96 h-96 bg-purple-400/15 rounded-full blur-3xl"></div>

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
                      ? 'bg-gradient-to-br from-azure to-blue-600 text-white scale-105'
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
                    <div className="relative h-64 lg:h-auto bg-gradient-to-br from-azure/20 to-blue-100">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-8">
                          <i className="fas fa-newspaper text-6xl text-azure/40 mb-4"></i>
                          <p className="text-gray-600">Featured Image</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-4 py-1 bg-gradient-to-r from-azure to-blue-500 text-white text-sm rounded-full font-semibold">
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
                        <button className="btn-azure-outline px-6 py-2 text-sm">
                          {d.featuredBlogCTA} <i className="fas fa-arrow-right ml-2"></i>
                        </button>
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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(d.blogPosts ?? []).map((post) => (
                    <div key={post.title} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2">
                      <div className={`relative h-48 bg-gradient-to-br ${post.gradient}`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <i className={`fas ${post.icon} text-5xl ${post.iconColor}`}></i>
                        </div>
                        <span className={`absolute top-4 left-4 px-3 py-1 ${post.badgeColor} text-white text-xs rounded-full font-semibold`}>
                          Blog
                        </span>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">{post.status}</span>
                          <button className="text-azure hover:text-blue-700 font-semibold">Read More →</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                <div className="space-y-6">
                  {(d.podcasts ?? []).map((p) => (
                    <div key={p.title} className="rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-2" style={{ background: 'linear-gradient(135deg, #14213d 0%, #1a2d50 100%)' }}>
                      <div className="grid md:grid-cols-3 gap-0">
                        <div className={`relative h-48 md:h-auto bg-gradient-to-br ${p.gradient} flex items-center justify-center`}>
                          <i className={`fas ${p.icon} text-6xl text-white/60`}></i>
                        </div>
                        <div className="md:col-span-2 p-8">
                          <div className="flex items-center gap-3 mb-4">
                            <span className={`px-4 py-1 ${p.badgeColor} text-white text-xs rounded-full font-semibold`}>
                              <i className="fas fa-podcast mr-1"></i> Podcast
                            </span>
                            <span className="text-white/70 text-sm">{p.episode}</span>
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-3">{p.title}</h3>
                          <p className="text-white/80 mb-6 leading-relaxed">{p.excerpt}</p>
                          <div className="flex items-center gap-4">
                            <span className="text-white/60 text-sm">{p.status}</span>
                            <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all">
                              <i className="fas fa-play mr-2"></i> Play Episode
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
                >
                  <input type="email" placeholder={d.newsletterPlaceholder} className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-carrot" />
                  <button type="submit" className="bg-carrot hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all">
                    {d.newsletterButton}
                  </button>
                </form>
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
          <BookingButton label={d.ctaButtonLabel} className="bg-white text-azure hover:bg-blue-50 px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-azure border border-white/40" />
        </div>
      </section>
    </>
  )
}
