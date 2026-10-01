/**
 * Facts about the business used in search metadata and structured data.
 * Contact details come from the same content files the site shows, so a
 * change in Tina (Footer / Contact page) flows into what Google sees.
 */
import footer from '@/content/footer.json'
import contact from '@/content/pages/contact.json'

export const SITE_URL = 'https://innerjourney-with-shanila.com'
export const BRAND = 'Inner Journey with Shanila'
export const PERSON_NAME = 'Shanila Khan'
export const JOB_TITLE = 'Confidence and Mindset Coach'
export const LOGO = '/images/logo_transparent-480.png'
export const PORTRAIT = '/images/about-image-1200.webp'
export const DEFAULT_OG_IMAGE = '/images/og-default.jpg'

/** Where the business is, and who it serves. In person in Leeds; online everywhere. */
export const LOCATION = {
  locality: 'Leeds',
  region: 'West Yorkshire',
  country: 'GB',
  countryName: 'United Kingdom',
}

export { LEEDS_PAGE_PATH } from '@/lib/routes'

export const absoluteUrl = (path: string) => (/^https?:\/\//.test(path) ? path : `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`)

export const contactEmail = () => contact.details?.email || footer.email || ''
export const contactPhone = () => contact.details?.phone || footer.phone || ''

/** Public profiles (Facebook, Instagram, YouTube…) for `sameAs`. WhatsApp chat links aren't profiles. */
export function socialProfiles(): string[] {
  return (footer.socialLinks ?? [])
    .map((s) => s?.href ?? '')
    .filter((href) => /^https?:\/\//.test(href) && !/whatsapp\.com|wa\.me/.test(href))
}
