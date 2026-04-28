import { ImageResponse } from 'next/og'
import { getPodcast } from '@/lib/posts'
import themeData from '@/content/theme.json'

export const alt = 'Inner Journey with Shanila — Podcast'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const ep = await getPodcast(slug)
  const title = ep?.title ?? 'Podcast'
  const episode = ep?.episode ?? ''
  const excerpt = ep?.excerpt ?? ''

  const primary = themeData.primaryColor
  const secondary = themeData.secondaryColor

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
          backgroundImage: `linear-gradient(135deg, ${secondary} 0%, #1a2d50 100%)`,
          color: 'white',
          fontFamily: '"Georgia", serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              padding: '12px 24px',
              borderRadius: '999px',
              backgroundColor: primary,
              fontSize: '20px',
              fontWeight: 700,
              letterSpacing: '2px',
              fontFamily: '"Helvetica", sans-serif',
            }}
          >
            🎙 PODCAST
          </div>
          {episode && (
            <span style={{ fontSize: '22px', color: 'rgba(255,255,255,0.7)' }}>{episode}</span>
          )}
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
          <span style={{ color: primary, fontWeight: 600 }}>Listen now →</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
