// @vitest-environment jsdom
import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import JsonLd from '@/components/JsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { blogPostGraph, faqGraph, serviceGraph, siteGraph } from '@/lib/seo/schema'
import { socialProfiles } from '@/lib/seo/site'
import { isIndexable, isListed, relatedPosts, type Post } from '@/lib/posts'
import sitemap from '@/app/sitemap'
import robots from '@/app/robots'
import nextConfig from '@/next.config'
import { CONTENT, readJson } from './helpers'

type Node = Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any

describe('pageMetadata', () => {
  const base = { path: '/about', fallbackTitle: 'Fallback title', fallbackDescription: 'Fallback description' }

  it('uses the Tina search listing as an absolute title (no double brand suffix)', () => {
    const m = pageMetadata({ title: '  About Shanila  Khan ', description: 'Desc' }, base)
    expect(m.title).toEqual({ absolute: 'About Shanila Khan' })
    expect(m.description).toBe('Desc')
    expect(m.alternates?.canonical).toBe('https://innerjourney-with-shanila.com/about')
  })

  it('falls back when the editor leaves the fields empty', () => {
    const m = pageMetadata({ title: '', description: null }, base)
    expect(m.title).toEqual({ absolute: 'Fallback title' })
    expect(m.description).toBe('Fallback description')
  })

  it('always keeps the site-wide Open Graph fields', () => {
    const og = pageMetadata(null, base).openGraph as Node
    expect(og).toMatchObject({ siteName: 'Inner Journey with Shanila', locale: 'en_GB', type: 'website' })
    expect(og.images[0].url).toBe('/images/og-default.jpg')
  })

  it('marks articles and leaves the generated share image to the file convention', () => {
    const m = pageMetadata(null, { ...base, image: 'generated', noindex: true, article: { publishedTime: '2024-05-09', authors: ['Shanila Khan'] } })
    expect(m.openGraph).toMatchObject({ type: 'article', publishedTime: '2024-05-09', authors: ['Shanila Khan'] })
    expect((m.openGraph as Node).images).toBeUndefined()
    expect(m.robots).toEqual({ index: false, follow: true })
  })
})

describe('structured data', () => {
  const graph = siteGraph()['@graph'] as Node[]
  const business = graph.find((n) => n['@type'] === 'ProfessionalService')!
  const person = graph.find((n) => n['@type'] === 'Person')!

  it('describes a Leeds-based business serving Leeds, the UK and online clients worldwide', () => {
    expect(business.address).toMatchObject({ addressLocality: 'Leeds', addressCountry: 'GB' })
    const served = business.areaServed.map((a: Node) => a.name)
    expect(served).toEqual(expect.arrayContaining(['Leeds', 'United Kingdom', 'Worldwide (online sessions)']))
    expect(business.email).toMatch(/@/)
    expect(business.telephone).toMatch(/\+44/)
  })

  it('names Shanila with her real credentials from the About page', () => {
    const about = readJson(path.join(CONTENT, 'pages/about.json'))
    expect(person.name).toBe('Shanila Khan')
    expect(person.hasCredential.map((c: Node) => c.name)).toEqual(about.credentials.items.map((c: Node) => c.title))
    expect(person.worksFor['@id']).toBe(business['@id'])
  })

  it('lists public profiles but not the WhatsApp chat link', () => {
    expect(socialProfiles().length).toBeGreaterThan(0)
    expect(socialProfiles().some((u) => /whatsapp/.test(u))).toBe(false)
  })

  it('never marks up testimonials as ratings (self-serving reviews are not eligible)', () => {
    const all = JSON.stringify([siteGraph(), serviceGraph({ name: 'x', path: '/x', description: 'd', serviceType: 's' })])
    expect(all).not.toMatch(/aggregateRating|"Review"/)
  })

  it('offers each service in person in Leeds and online', () => {
    const svc = serviceGraph({ name: 'Numerology', path: '/numerology', description: 'd', serviceType: 'Vedic numerology' })['@graph'][0] as Node
    expect(svc.availableChannel.map((c: Node) => c.name)).toEqual(['Online video sessions', 'In person in Leeds'])
  })

  it('builds article markup with a trimmed headline and an encoded image URL', () => {
    const post = blogPostGraph({ slug: 'a', title: 'Hello ', image: '/images/Confidence Frame .jpg', publishedAt: '2026-09-22' })['@graph'][0] as Node
    expect(post.headline).toBe('Hello')
    expect(post.image).toBe('https://innerjourney-with-shanila.com/images/Confidence%20Frame%20.jpg')
    expect(post.author.name).toBe('Shanila Khan')
  })

  it('only includes complete questions in FAQ markup', () => {
    const faq = faqGraph([{ question: 'Q?', answer: 'A' }, { question: 'Half?', answer: '' }])['@graph'][0] as Node
    expect(faq.mainEntity).toHaveLength(1)
  })

  it('escapes < so content can never close the script tag', () => {
    const { container } = render(<JsonLd data={{ name: '</script><b>x' }} />)
    const script = container.querySelector('script[type="application/ld+json"]')!
    expect(script.innerHTML).not.toContain('</script>')
    expect(JSON.parse(script.textContent!.replace(/\\u003c/g, '<'))).toEqual({ name: '</script><b>x' })
  })
})

describe('search listings in content', () => {
  const files = fs.readdirSync(path.join(CONTENT, 'pages')).filter((f) => f.endsWith('.json'))
  const listings = files.map((f) => ({ f, seo: readJson(path.join(CONTENT, 'pages', f)).seo as Node }))

  it('every page has a search title and description of sensible length', () => {
    for (const { f, seo } of listings) {
      expect(seo?.title, f).toBeTruthy()
      expect(seo.title.length, `${f} title`).toBeLessThanOrEqual(65)
      expect(seo.description.length, `${f} description`).toBeGreaterThanOrEqual(70)
      expect(seo.description.length, `${f} description`).toBeLessThanOrEqual(165)
    }
  })

  it('titles are unique', () => {
    const titles = listings.map((l) => l.seo.title)
    expect(new Set(titles).size).toBe(titles.length)
  })

  it('positions Leeds as the base and online as the reach, without a Dubai push', () => {
    const home = listings.find((l) => l.f === 'home.json')!.seo
    expect(home.title).toMatch(/Leeds/)
    expect(home.description).toMatch(/online/i)
    expect(JSON.stringify(listings)).not.toMatch(/Dubai|UAE/)
  })

  it('the Leeds page covers every service, in person and online, and answers its FAQs', () => {
    const leeds = readJson(path.join(CONTENT, 'pages/leeds.json'))
    // Heading stays short and doesn't list the services; the page body covers all three.
    expect(leeds.hero.heading).toBe('Sessions in Leeds')
    expect(leeds.offerings.items.map((i: Node) => i.href)).toEqual(['/mindset-coaching', '/career-coaching', '/numerology'])
    expect(leeds.seo.title).toMatch(/Confidence & Mindset Coach in Leeds/)
    expect(leeds.howItWorks.inPerson.body).toMatch(/Leeds/)
    expect(leeds.howItWorks.online.body).toMatch(/UK|world/)
    for (const item of leeds.faq.items) expect(item.answer.length).toBeGreaterThan(20)
  })

  it('the home page keeps the brand-wide heading and shows location in its own band', () => {
    const home = readJson(path.join(CONTENT, 'pages/home.json'))
    expect(home.hero.heading).not.toMatch(/Leeds/)
    expect(home.locations.inPerson).toMatch(/Leeds/)
    expect(home.locations.online).toMatch(/online/i)
  })
})

describe('posts', () => {
  const post = (slug: string, over: Partial<Post> = {}): Post => ({ slug, title: slug, body: '', status: 'Published', ...over })

  it('lists everything except drafts, but indexes only published posts', () => {
    expect([isListed('Published'), isListed('Coming Soon'), isListed('Draft')]).toEqual([true, true, false])
    expect([isIndexable('Published'), isIndexable(undefined), isIndexable('Coming Soon'), isIndexable('Draft')]).toEqual([true, true, false, false])
  })

  it('suggests related posts: same service first, then newest, never drafts or itself', () => {
    const all = [
      post('current', { relatedService: 'numerology' }),
      post('new-mindset', { relatedService: 'mindset', publishedAt: '2026-01-01' }),
      post('old-numerology', { relatedService: 'numerology', publishedAt: '2020-01-01' }),
      post('draft', { relatedService: 'numerology', status: 'Draft', publishedAt: '2027-01-01' }),
    ]
    expect(relatedPosts(all, all[0]).map((p) => p.slug)).toEqual(['old-numerology', 'new-mindset'])
  })
})

describe('crawling', () => {
  it('the sitemap has the Leeds page, no editor routes and no build-time dates on static pages', async () => {
    const entries = await sitemap()
    const urls = entries.map((e) => e.url)
    expect(urls).toContain('https://innerjourney-with-shanila.com/sessions-in-leeds')
    expect(urls.some((u) => /preview|theme-studio|admin/.test(u))).toBe(false)
    expect(entries.find((e) => e.url.endsWith('/about'))!.lastModified).toBeUndefined()
  })

  it('robots blocks editor-only routes', () => {
    const rules = robots().rules as { disallow: string[] }[]
    expect(rules[0].disallow).toEqual(expect.arrayContaining(['/admin/', '/preview/', '/theme-studio']))
  })

  it('old podcast pages redirect to the library instead of 404ing', async () => {
    const redirects = await nextConfig.redirects!()
    expect(redirects).toContainEqual(expect.objectContaining({ source: '/podcast/:slug*', permanent: true }))
  })
})
