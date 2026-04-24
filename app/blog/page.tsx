import type { Metadata } from 'next'
import Link from 'next/link'
import BookingButton from '@/components/BookingButton'
import { listPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Blog - Insights on Clarity, Mindset & Purpose',
  description: 'Stories, ideas, and practical guidance on clarity, mindset, and personal transformation from Shanila Khan.',
  alternates: { canonical: 'https://innerjourney-with-shanila.com/blog' },
}

export default async function BlogIndexPage() {
  const posts = await listPosts()

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-oxford via-[#1a2d50] to-azure overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-carrot/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block text-carrot font-semibold text-sm uppercase tracking-widest mb-6">Blog</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl heading-primary text-white mb-6 leading-tight font-dancing font-bold">
              Stories for your <span className="text-carrot">Inner Journey</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Ideas and practical guidance on clarity, mindset, and transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-100"></div>
        <div className="absolute top-0 right-10 w-[30rem] h-[30rem] bg-orange-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-10 left-10 w-[28rem] h-[28rem] bg-blue-400/20 rounded-full blur-3xl"></div>

        <section className="py-20 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-7xl mx-auto">
              {posts.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">No posts yet — check back soon.</p>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 flex flex-col"
                    >
                      <div className={`relative h-48 bg-gradient-to-br ${post.gradient ?? 'from-orange-100 to-orange-200'}`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <i className={`fas ${post.icon ?? 'fa-pen-fancy'} text-5xl ${post.iconColor ?? 'text-carrot/40'}`}></i>
                        </div>
                        <span className={`absolute top-4 left-4 px-3 py-1 ${post.badgeColor ?? 'bg-carrot'} text-white text-xs rounded-full font-semibold`}>
                          Blog
                        </span>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h2>
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3 flex-grow">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-sm mt-auto">
                          <span className="text-gray-500">{post.status ?? ''}</span>
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
      </div>

      {/* CTA */}
      <section className="py-16 brand-gradient-azure">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to go deeper?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Book a free clarity call and we&apos;ll explore what&apos;s next for you.
          </p>
          <BookingButton label="Book A Free Clarity Call" className="bg-white text-azure hover:bg-blue-50 px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-azure border border-white/40" />
        </div>
      </section>
    </>
  )
}
