/**
 * Which form the Tina sidebar opens when a page loads in the editor preview.
 *
 * Pages ask for their own document by default. Documents without a page of
 * their own (Footer, Testimonials, Navigation, Fonts, Booking form, podcast
 * episodes) preview at /preview/<document>, which renders the page that shows
 * them and opens *their* form instead — otherwise opening "Footer" would land
 * on the Home Page form.
 *
 * It has to be the path: Tina's preview only passes the path through to the
 * iframe, dropping any ?query or #hash.
 */
const PREVIEW_PREFIX = '/preview/'

/** "/preview/footer.json" → "content/footer.json"; null for any other path. */
export function formFromPath(pathname: string): string | null {
  if (!pathname.startsWith(PREVIEW_PREFIX)) return null
  const doc = decodeURIComponent(pathname.slice(PREVIEW_PREFIX.length)).replace(/^\/+|\/+$/g, '')
  if (!doc || doc.includes('..')) return null
  return `content/${doc}`
}

export function formSelector(defaultFormId: string) {
  return () => {
    if (typeof window === 'undefined') return defaultFormId
    return formFromPath(window.location.pathname) ?? defaultFormId
  }
}

/** Preview route for a document under /content, e.g. "footer.json" or "podcasts/episode.md". */
export function previewRoute(doc: string) {
  return `${PREVIEW_PREFIX}${doc}`
}
