import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import BookingButton from '@/components/BookingButton'
import { getPost, listPosts } from '@/lib/posts'

export async function generateStaticParams() {
  const posts = await listPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: { canonical: `https://innerjourney-with-shanila.com/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      url: `https://innerjourney-with-shanila.com/blog/${slug}`,
    },
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

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <>
      {/* Hero */}
      <section className="page-hero bg-gradient-to-br from-oxford via-[#1a2d50] to-azure">
        <div className="absolute top-20 right-20 w-72 h-72 bg-carrot/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <Link href="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm uppercase tracking-widest mb-6">
              <i className="fas fa-arrow-left"></i> Back to all posts
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {post.status && (
                <span className={`px-3 py-1 ${post.badgeColor || 'bg-carrot'} text-white text-xs rounded-full font-semibold uppercase tracking-wider`}>
                  {post.status}
                </span>
              )}
              {formatDate(post.publishedAt) && (
                <span className="text-white/60 text-sm">{formatDate(post.publishedAt)}</span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl heading-primary text-white mb-4 leading-tight font-dancing font-bold">
              {post.title}
            </h1>
            {post.excerpt && <p className="text-xl text-white/90 leading-relaxed">{post.excerpt}</p>}
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="relative py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto prose prose-lg prose-headings:heading-secondary prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-azure prose-a:no-underline hover:prose-a:underline prose-strong:text-oxford prose-li:text-gray-700">
            {post.body.trim() ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
            ) : (
              <p className="text-gray-500 italic">This post is still being written — check back soon.</p>
            )}
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="py-16 brand-gradient-azure">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready for your own <span className="text-carrot font-bold">inner journey?</span>
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Book a free discovery call and let&apos;s explore how coaching can help.
          </p>
          <BookingButton variant="primaryOnDark" />
        </div>
      </section>
    </>
  )
}
