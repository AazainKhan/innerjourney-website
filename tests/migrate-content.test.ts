import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { featuredSlugs, migrateFrontmatter, migrateJson, migrators } from '@/scripts/migrate-content'
import { CONTENT, LEGACY, mdFiles, readFrontmatter, readJson, strings } from './helpers'

// Style values that are *converted* (to tone / preset names), not carried over as text.
const STYLE_KEYS = new Set(['borderColor', 'bg', 'accent', 'subtitleColor', 'colorScheme', 'gradient', 'iconColor', 'badgeColor'])

function textValues(doc: Record<string, unknown>): string[] {
  const out: string[] = []
  for (const [k, v] of Object.entries(doc)) {
    if (STYLE_KEYS.has(k) || k === 'featuredPosts' || k === 'featuredPodcasts') continue
    if (Array.isArray(v)) v.forEach((item) => (item && typeof item === 'object' ? out.push(...textValues(item as Record<string, unknown>)) : typeof item === 'string' && out.push(item)))
    else if (v && typeof v === 'object') out.push(...textValues(v as Record<string, unknown>))
    else if (typeof v === 'string') out.push(v)
  }
  return out.map((s) => s.trim()).filter(Boolean)
}

describe.each(Object.keys(migrators))('migrating %s', (rel) => {
  const legacy = readJson(path.join(LEGACY, rel))
  const migrated = migrateJson(rel, legacy)!

  it('converts the legacy shape', () => {
    expect(migrated).not.toBeNull()
  })

  it('is idempotent', () => {
    expect(migrateJson(rel, migrated)).toBeNull()
  })

  it('keeps every piece of wording', () => {
    const after = strings(migrated).join('\n')
    const lost = textValues(legacy).filter((s) => !after.includes(s))
    expect(lost).toEqual([])
  })

  it('stores no CSS classes', () => {
    const classy = strings(migrated).filter((s) => /\b(border|text|bg|from|to)-[a-z]+(-\d+)?(\/\d+)?\b/.test(s) && !s.includes(' '))
    expect(classy).toEqual([])
  })

  // Later work adds fields (e.g. the Google search listing), so the committed
  // file must contain everything the migration produced, not equal it.
  it('agrees with the committed content file', () => {
    expect(readJson(path.join(CONTENT, rel))).toMatchObject(migrated)
  })
})

describe('markdown front matter', () => {
  const legacyResources = readJson(path.join(LEGACY, 'pages/resources.json'))
  const featured = featuredSlugs(legacyResources)

  it('reads featured slugs from the old Resources references', () => {
    expect([...featured.posts]).toEqual(['numbers-are-story-tellers'])
    expect([...featured.podcasts]).toEqual(['introduction-to-your-inner-journey'])
  })

  it.each([
    ...mdFiles(path.join(LEGACY, 'posts')).map((f) => ['posts', path.basename(f), f] as const),
    ...mdFiles(path.join(LEGACY, 'podcasts')).map((f) => ['podcasts', path.basename(f), f] as const),
  ])('%s/%s agrees with committed front matter', (dir, _name, file) => {
    const slug = path.basename(file, '.md')
    const set = dir === 'posts' ? featured.posts : featured.podcasts
    const next = migrateFrontmatter(readFrontmatter(file), set.has(slug))!
    expect(next).not.toBeNull()
    expect(migrateFrontmatter(next, false)).toBeNull()
    const committed = readFrontmatter(path.join(CONTENT, dir, path.basename(file)))
    expect(JSON.parse(JSON.stringify(committed))).toMatchObject(JSON.parse(JSON.stringify(next)))
  })

  it('derives the card colour from the badge the editor picked', () => {
    const next = migrateFrontmatter({ title: 'x', icon: 'fa-comments', iconColor: 'text-azure/40', gradient: 'from-blue-100 to-indigo-200', badgeColor: 'bg-azure' }, false)
    expect(next).toEqual({ title: 'x', featured: false, cardStyle: { icon: 'fa-comments', tone: 'accent' } })
  })
})
