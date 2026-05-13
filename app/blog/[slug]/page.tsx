import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
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
      <section className="page-hero brand-gradient-oxford-azure">
        <div className="absolute top-20 right-20 w-72 h-72 bg-carrot/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        {/* Cover image fills the hero with a dark overlay so the text stays
         * legible. Falls back to the gradient hero when no image is set. */}
        {post.image && (
          <>
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover opacity-30"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" aria-hidden="true" />
          </>
        )}
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <Link href="/blog" className="inline-flex items-center gap-2 text-on-secondary/70 hover:text-on-secondary text-sm uppercase tracking-widest mb-6">
              <i className="fas fa-arrow-left"></i> Back to all posts
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {post.status && (
                <span className={`px-3 py-1 ${post.badgeColor || 'bg-carrot'} text-on-primary text-xs rounded-full font-semibold uppercase tracking-wider`}>
                  {post.status}
                </span>
              )}
              {formatDate(post.publishedAt) && (
                <span className="text-on-secondary/60 text-sm">{formatDate(post.publishedAt)}</span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl heading-primary text-on-secondary mb-4 leading-tight font-dancing font-bold">
              {post.title}
            </h1>
            {post.excerpt && <p className="text-xl text-on-secondary/90 leading-relaxed">{post.excerpt}</p>}
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
    </>
  )
}
