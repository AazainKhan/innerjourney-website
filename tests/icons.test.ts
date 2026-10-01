import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { ICONS, getIcon, iconClass } from '@/lib/icons'
import { CONTENT, mdFiles, readFrontmatter, readJson, walk } from './helpers'

function iconValuesInContent(): { file: string; value: string }[] {
  const found: { file: string; value: string }[] = []
  const collect = (file: string, data: unknown) =>
    walk(data, (k, v) => {
      if (k === 'icon' && typeof v === 'string' && v) found.push({ file, value: v })
    })
  const jsonFiles = [
    ...fs.readdirSync(CONTENT).filter((f) => f.endsWith('.json')).map((f) => path.join(CONTENT, f)),
    ...fs.readdirSync(path.join(CONTENT, 'pages')).map((f) => path.join(CONTENT, 'pages', f)),
  ]
  for (const f of jsonFiles) collect(f, readJson(f))
  for (const f of [...mdFiles(path.join(CONTENT, 'posts')), ...mdFiles(path.join(CONTENT, 'podcasts'))]) collect(f, readFrontmatter(f))
  return found
}

describe('icon registry', () => {
  it('has unique ids', () => {
    const ids = ICONS.map((i) => i.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('covers every icon used in content (so the picker can show the current choice)', () => {
    const missing = iconValuesInContent().filter(({ value }) => !getIcon(value))
    expect(missing).toEqual([])
  })

  it('uses the brands style for social icons and solid for the rest', () => {
    expect(iconClass('fa-instagram')).toBe('fab fa-instagram')
    expect(iconClass('fa-brain')).toBe('fas fa-brain')
  })

  it('tolerates legacy prefixed values and empties', () => {
    expect(iconClass('fas fa-star')).toBe('fas fa-star')
    expect(iconClass('')).toBe('')
    expect(iconClass(null)).toBe('')
  })
})
