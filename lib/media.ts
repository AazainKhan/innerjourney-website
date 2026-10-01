/**
 * Tina Cloud prefixes every image field with its media CDN
 * ("https://assets.tina.io/<project-id>/…"), even when the editor pasted a
 * full external URL (e.g. a YouTube thumbnail for a podcast). That produces
 * "https://assets.tina.io/<id>https://i.ytimg.com/…", which 404s. Undo it.
 */
export function cleanImageUrl(src: string | null | undefined): string {
  if (!src) return ''
  const external = src.match(/^https:\/\/assets\.tina\.io\/[^/]+\/?(https?:\/\/.+)$/)
  return external ? external[1] : src
}
