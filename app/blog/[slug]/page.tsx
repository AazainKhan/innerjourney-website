import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import resourcesData from '@/content/pages/resources.json'
import client from '@/tina/__generated__/client'
import JsonLd from '@/components/JsonLd'
import { getPost, isIndexable, isSlug, listPosts, relatedPosts } from '@/lib/posts'
import { pageMetadata } from '@/lib/seo/metadata'
import { blogPostGraph } from '@/lib/seo/schema'
import { PERSON_NAME } from '@/lib/seo/site'
import type { PostQuery } from '@/tina/__generated__/types'
import BlogPostClient, { type RelatedPost } from './BlogPostClient'

export async function generateStaticParams() {
  const posts = await listPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Post Not Found' }
  return pageMetadata(post.seo, {
    path: `/blog/${slug}`,
    fallbackTitle: `${post.title} | ${PERSON_NAME}`,
    fallbackDescription: post.excerpt ?? '',
    // The share image is generated per post by ./opengraph-image.tsx.
    image: 'generated',
    noindex: !isIndexable(post.status),
    article: { publishedTime: post.publishedAt, authors: [PERSON_NAME] },
  })
}

/**
 * Posts load through Tina so the editor can open the post it is looking at
 * (the sidebar shows this post's form). If Tina is unreachable, fall back to
 * the markdown file; the body then renders from raw markdown.
 */
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!isSlug(slug)) notFound()
  const [post, all] = await Promise.all([getPost(slug), listPosts()])
  if (!post) notFound()

  const labels = {
    backLink: resourcesData.blogLibrary?.backLinkLabel || 'Back to all posts',
    empty: resourcesData.blogLibrary?.emptyPostMessage || 'This post is still being written — check back soon.',
    readMore: resourcesData.blogLibrary?.readMoreLabel || 'Read more',
    ending: resourcesData.blogLibrary?.postEnding ?? {},
  }
  const related: RelatedPost[] = relatedPosts(all, post).map((p) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt ?? '', image: p.image ?? '' }))
  const schema = <JsonLd data={blogPostGraph({ slug, title: post.title, description: post.seo?.description || post.excerpt, image: post.image, publishedAt: post.publishedAt })} />

  const res = await client.queries.post({ relativePath: `${slug}.md` }).catch(() => null)
  if (res) {
    return (
      <>
        {schema}
        <BlogPostClient query={res.query} variables={res.variables} data={res.data} labels={labels} related={related} />
      </>
    )
  }

  const { body, slug: _slug, ...fields } = post
  const data = { post: { ...fields, body, _sys: { filename: slug } } } as unknown as PostQuery
  return (
    <>
      {schema}
      <BlogPostClient query="" variables={{ relativePath: `${slug}.md` }} data={data} labels={labels} related={related} />
    </>
  )
}
