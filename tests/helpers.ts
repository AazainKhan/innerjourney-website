import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export const ROOT = path.resolve(__dirname, '..')
export const CONTENT = path.join(ROOT, 'content')
export const LEGACY = path.join(ROOT, 'tests/fixtures/legacy-content')

export type Json = Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any

export const readJson = (file: string): Json => JSON.parse(fs.readFileSync(file, 'utf8'))

export function readFrontmatter(file: string): Json {
  return matter(fs.readFileSync(file, 'utf8')).data
}

export function mdFiles(dir: string): string[] {
  return fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => path.join(dir, f)) : []
}

/** Every [key, value] pair at any depth. */
export function walk(value: unknown, visit: (key: string, v: unknown) => void, key = ''): void {
  if (Array.isArray(value)) value.forEach((v) => walk(v, visit, key))
  else if (value && typeof value === 'object' && !(value instanceof Date)) {
    for (const [k, v] of Object.entries(value)) {
      visit(k, v)
      walk(v, visit, k)
    }
  }
}

/** All string leaves. */
export function strings(value: unknown): string[] {
  const out: string[] = []
  const rec = (v: unknown) => {
    if (typeof v === 'string') out.push(v)
    else if (Array.isArray(v)) v.forEach(rec)
    else if (v && typeof v === 'object' && !(v instanceof Date)) Object.values(v).forEach(rec)
  }
  rec(value)
  return out
}
