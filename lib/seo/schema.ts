/**
 * schema.org structured data (JSON-LD) so search engines understand who
 * Shanila is, where she works, what she offers and what each article is.
 *
 * Deliberately NOT included: star ratings built from on-site testimonials.
 * Google treats self-published reviews of your own business as ineligible
 * for review snippets, so marking them up would add risk, not visibility.
 */
import about from '@/content/pages/about.json'
import {
  BRAND,
  JOB_TITLE,
  LOCATION,
  LOGO,
  PERSON_NAME,
  PORTRAIT,
  SITE_URL,
  absoluteUrl,
  contactEmail,
  contactPhone,
  socialProfiles,
} from '@/lib/seo/site'
import { LEEDS_PAGE_PATH } from '@/lib/routes'

type Node = Record<string, unknown>

export const ORG_ID = `${SITE_URL}/#business`
export const PERSON_ID = `${SITE_URL}/#shanila`
export const WEBSITE_ID = `${SITE_URL}/#website`

const address = () => ({
  '@type': 'PostalAddress',
  addressLocality: LOCATION.locality,
  addressRegion: LOCATION.region,
  addressCountry: LOCATION.country,
})

/** In person in Leeds, online across the UK and worldwide. */
export const areaServed = () => [
  { '@type': 'City', name: 'Leeds', containedInPlace: { '@type': 'AdministrativeArea', name: LOCATION.region } },
  { '@type': 'Country', name: LOCATION.countryName },
  { '@type': 'Place', name: 'Worldwide (online sessions)' },
]

export function businessNode(): Node {
  return {
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    name: BRAND,
    url: SITE_URL,
    logo: absoluteUrl(LOGO),
    image: absoluteUrl(PORTRAIT),
    description:
      'Confidence, mindset and career coaching and Vedic numerology with Shanila Khan — in person in Leeds and online for clients across the UK and worldwide.',
    email: contactEmail() || undefined,
    telephone: contactPhone() || undefined,
    address: address(),
    areaServed: areaServed(),
    founder: { '@id': PERSON_ID },
    sameAs: socialProfiles(),
    knowsLanguage: 'en',
  }
}

export function personNode(): Node {
  const credentials = (about.credentials?.items ?? [])
    .filter((c) => c?.title)
    .map((c) => ({ '@type': 'EducationalOccupationalCredential', name: c.title, credentialCategory: 'certification' }))
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: PERSON_NAME,
    jobTitle: JOB_TITLE,
    url: `${SITE_URL}/about`,
    image: absoluteUrl(PORTRAIT),
    worksFor: { '@id': ORG_ID },
    address: address(),
    hasCredential: credentials,
    knowsAbout: ['Confidence coaching', 'Mindset coaching', 'Career coaching', 'Neuro-Linguistic Programming', 'Emotional intelligence', 'Vedic numerology'],
    sameAs: socialProfiles(),
  }
}

export function websiteNode(): Node {
  return { '@type': 'WebSite', '@id': WEBSITE_ID, url: SITE_URL, name: BRAND, publisher: { '@id': ORG_ID }, inLanguage: 'en-GB' }
}

/** Site-wide graph, rendered once in the root layout. */
export function siteGraph() {
  return { '@context': 'https://schema.org', '@graph': [businessNode(), personNode(), websiteNode()] }
}

export function breadcrumbs(items: { name: string; path: string }[]): Node {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: absoluteUrl(item.path) })),
  }
}

export function serviceGraph(s: { name: string; path: string; description: string; serviceType: string }) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${absoluteUrl(s.path)}#service`,
        name: s.name,
        serviceType: s.serviceType,
        description: s.description,
        url: absoluteUrl(s.path),
        provider: { '@id': ORG_ID },
        areaServed: areaServed(),
        availableChannel: [
          { '@type': 'ServiceChannel', name: 'Online video sessions', serviceUrl: absoluteUrl(s.path) },
          { '@type': 'ServiceChannel', name: 'In person in Leeds', serviceLocation: { '@type': 'Place', address: address() } },
        ],
      },
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: s.name, path: s.path },
      ]),
    ],
  }
}

export function blogPostGraph(p: { slug: string; title: string; description?: string | null; image?: string | null; publishedAt?: string | null }) {
  const url = absoluteUrl(`/blog/${p.slug}`)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: p.title.trim(),
        description: p.description ?? undefined,
        image: p.image ? absoluteUrl(encodeURI(p.image)) : absoluteUrl(`/blog/${p.slug}/opengraph-image`),
        datePublished: p.publishedAt ?? undefined,
        author: { '@id': PERSON_ID, '@type': 'Person', name: PERSON_NAME, url: `${SITE_URL}/about` },
        publisher: { '@id': ORG_ID },
        mainEntityOfPage: url,
        inLanguage: 'en-GB',
      },
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Resources', path: '/resources' },
        { name: p.title.trim(), path: `/blog/${p.slug}` },
      ]),
    ],
  }
}

/** FAQ markup. (Google now shows FAQ rich results only for a few site types, but the Q&A still helps it understand the page.) */
export function faqGraph(items: { question?: string | null; answer?: string | null }[], path = LEEDS_PAGE_PATH) {
  const faqs = items.filter((i) => i.question && i.answer)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        '@id': `${absoluteUrl(path)}#faq`,
        mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
      },
    ],
  }
}
