/**
 * Schema ↔ content contract.
 *
 * Every value in content/ must have a field in the Tina schema (or Shanila
 * can't see or edit it), and picker fields must hold values the pickers
 * understand. Catches a schema edit that silently orphans content.
 */
import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it, vi } from 'vitest'
import { GRADIENT_PRESET_KEYS, TONES } from '@/lib/design-tokens'
import { getIcon } from '@/lib/icons'
import { CONTENT, mdFiles, readFrontmatter, readJson, type Json } from './helpers'

// The schema imports Tina's admin UI for its pickers; stub it for Node.
vi.mock('tinacms', () => ({ defineConfig: (c: unknown) => c, wrapFieldsWithMeta: (c: unknown) => c, useCMS: () => ({ api: {} }) }))

const { default: config } = await import('@/tina/config')

interface Field {
  name: string
  type: string
  list?: boolean
  fields?: Field[]
}

function check(fields: Field[], value: Json, where: string, problems: string[]) {
  const byName = new Map(fields.map((f) => [f.name, f]))
  for (const [key, v] of Object.entries(value)) {
    if (key === 'body' || key === '_template') continue
    const field = byName.get(key)
    if (!field) {
      problems.push(`${where}.${key} has no field in the Tina schema`)
      continue
    }
    const here = `${where}.${key}`
    if (field.type === 'object' && field.fields) {
      const items = field.list ? (Array.isArray(v) ? v : []) : [v]
      items.forEach((item, i) => item && typeof item === 'object' && check(field.fields!, item as Json, field.list ? `${here}[${i}]` : here, problems))
    }
    if (typeof v === 'string' && v) {
      if (key === 'tone' && !(TONES as readonly string[]).includes(v)) problems.push(`${here} = "${v}" is not a tone`)
      if (key === 'gradient' && !(GRADIENT_PRESET_KEYS as string[]).includes(v)) problems.push(`${here} = "${v}" is not a gradient preset`)
      if (key === 'icon' && !getIcon(v)) problems.push(`${here} = "${v}" is not in the icon registry`)
    }
  }
}

const collections = config.schema.collections as unknown as (Field & { path: string; match?: { include?: string }; format: string; fields: Field[] })[]

describe('Tina schema ↔ content', () => {
  it.each(collections.filter((c) => c.match?.include).map((c) => [c.name, c] as const))('%s', (_name, c) => {
    const file = path.join(c.path, `${c.match!.include}.${c.format}`)
    const problems: string[] = []
    check(c.fields, readJson(path.join(CONTENT, '..', file)), file, problems)
    expect(problems).toEqual([])
  })

  it.each(collections.filter((c) => !c.match?.include).map((c) => [c.name, c] as const))('every %s document', (_name, c) => {
    const problems: string[] = []
    for (const f of mdFiles(path.join(CONTENT, '..', c.path))) check(c.fields, readFrontmatter(f), path.relative(CONTENT, f), problems)
    expect(problems).toEqual([])
  })

  it('has a collection for every content file', () => {
    const covered = new Set(collections.filter((c) => c.match?.include).map((c) => path.join(c.path, `${c.match!.include}.${c.format}`)))
    const files = [
      ...fs.readdirSync(CONTENT).filter((f) => f.endsWith('.json')).map((f) => path.join('content', f)),
      ...fs.readdirSync(path.join(CONTENT, 'pages')).map((f) => path.join('content/pages', f)),
    ]
    // theme.json / custom-palettes.json are edited in Theme Studio, not Tina.
    const orphans = files.filter((f) => !covered.has(f) && !/theme\.json|custom-palettes\.json/.test(f))
    expect(orphans).toEqual([])
  })

  it('flags orphaned keys and bad picker values (guards the guard)', () => {
    const home = collections.find((c) => c.name === 'home')!
    const problems: string[] = []
    check(home.fields, { heroHeading: 'old flat field', services: { cards: [{ tone: 'border-carrot', icon: 'fa-nope' }] } }, 'home', problems)
    expect(problems).toEqual([
      'home.heroHeading has no field in the Tina schema',
      'home.services.cards[0].tone = "border-carrot" is not a tone',
      'home.services.cards[0].icon = "fa-nope" is not in the icon registry',
    ])
  })

  it('never names a field after the words it currently holds', () => {
    const names: string[] = []
    const rec = (fs: Field[]) => fs.forEach((f) => (names.push(f.name), f.fields && rec(f.fields)))
    collections.forEach((c) => rec(c.fields))
    expect(names.filter((n) => /feelLikeYou|isThisForYou|perhaps|solutionWord|BigWord|clarityHeading/i.test(n))).toEqual([])
  })
})
