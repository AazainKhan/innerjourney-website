import { ImageResponse } from 'next/og'
import { getPost } from '@/lib/posts'
import themeData from '@/content/theme.json'

export const alt = 'Inner Journey with Shanila — Blog'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  const title = post?.title ?? 'Blog'
  const excerpt = post?.excerpt ?? ''

  const primary = themeData.primaryColor
  const secondary = themeData.secondaryColor
  const accent = themeData.accentColor

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          backgroundImage: `linear-gradient(135deg, ${secondary} 0%, ${accent} 100%)`,
          color: 'white',
          fontFamily: '"Georgia", serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: primary,
            }}
          />
          <span style={{ fontSize: '24px', textTransform: 'uppercase', letterSpacing: '4px', color: 'rgba(255,255,255,0.85)' }}>
            Inner Journey · Blog
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h1 style={{ fontSize: '72px', lineHeight: 1.1, margin: 0, fontWeight: 700, color: 'white' }}>
            {title}
          </h1>
          {excerpt && (
            <p
              style={{
                fontSize: '28px',
                lineHeight: 1.4,
                margin: 0,
                color: 'rgba(255,255,255,0.85)',
                maxWidth: '900px',
                fontFamily: '"Helvetica", sans-serif',
              }}
            >
              {excerpt.length > 160 ? excerpt.slice(0, 157) + '…' : excerpt}
            </p>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '22px', color: 'rgba(255,255,255,0.7)' }}>
          <span>innerjourney-with-shanila.com</span>
          <span style={{ color: primary, fontWeight: 600 }}>Read the post →</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
