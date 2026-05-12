import { NextResponse } from 'next/server'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { randomUUID } from 'node:crypto'
import { commitFileViaGitHub, isGitHubCommitAvailable } from '@/lib/github-commit'

const HEX_RE = /^#[0-9a-fA-F]{6}$/
const ROLE_KEYS = ['primaryColor', 'secondaryColor', 'accentColor', 'neutralColor'] as const

interface CustomPalette {
  id: string
  name: string
  colors: { primaryColor: string; secondaryColor: string; accentColor: string; neutralColor: string }
  createdAt: string
  updatedAt?: string
}

const FILE_REL_PATH = 'content/custom-palettes.json'
const FILE_ABS_PATH = join(process.cwd(), 'content', 'custom-palettes.json')

function shouldUseGitHubApi(): boolean {
  return !!process.env.VERCEL || (process.env.NODE_ENV === 'production' && isGitHubCommitAvailable())
}

// On Vercel the filesystem is read-only — `loadPalettes` would only see the
// bundled-at-build version. So in production we read from GitHub directly
// (raw API) to get the latest state including writes made after the last
// deploy.
async function loadPalettesFromGitHub(): Promise<CustomPalette[]> {
  const token = process.env.GITHUB_TOKEN
  if (!token) return []
  const owner = process.env.GITHUB_REPO?.split('/')[0] || process.env.VERCEL_GIT_REPO_OWNER
  const repo = process.env.GITHUB_REPO?.split('/')[1] || process.env.VERCEL_GIT_REPO_SLUG
  const branch = process.env.GITHUB_BRANCH || 'main'
  if (!owner || !repo) return []
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${FILE_REL_PATH}?ref=${branch}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      // Bypass any aggressive Next.js caching layers — we want fresh content
      cache: 'no-store',
    })
    if (!res.ok) return []
    const data = (await res.json()) as { content?: string; encoding?: string }
    if (!data.content) return []
    const raw = Buffer.from(data.content, (data.encoding || 'base64') as BufferEncoding).toString('utf8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

async function loadPalettes(): Promise<CustomPalette[]> {
  if (shouldUseGitHubApi()) {
    return loadPalettesFromGitHub()
  }
  try {
    const raw = await readFile(FILE_ABS_PATH, 'utf8')
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

async function savePalettes(palettes: CustomPalette[], commitMessage: string): Promise<{ ok: boolean; error?: string }> {
  const content = JSON.stringify(palettes, null, 2) + '\n'
  if (shouldUseGitHubApi()) {
    const result = await commitFileViaGitHub({
      path: FILE_REL_PATH,
      content,
      message: commitMessage,
    })
    if (!result.ok) return { ok: false, error: result.error }
    return { ok: true }
  }
  try {
    await mkdir(dirname(FILE_ABS_PATH), { recursive: true })
    await writeFile(FILE_ABS_PATH, content, 'utf8')
    return { ok: true }
  } catch (e) {
    return { ok: false, error: (e as Error).message }
  }
}

function validateColors(input: unknown): { ok: true; colors: CustomPalette['colors'] } | { ok: false; error: string } {
  if (!input || typeof input !== 'object') return { ok: false, error: 'colors must be an object' }
  const out: Record<string, string> = {}
  for (const k of ROLE_KEYS) {
    const v = (input as Record<string, unknown>)[k]
    if (typeof v !== 'string' || !HEX_RE.test(v)) {
      return { ok: false, error: `invalid ${k}` }
    }
    out[k] = v.toLowerCase()
  }
  return { ok: true, colors: out as CustomPalette['colors'] }
}

function validateName(input: unknown): { ok: true; name: string } | { ok: false; error: string } {
  if (typeof input !== 'string') return { ok: false, error: 'name must be a string' }
  const trimmed = input.trim()
  if (trimmed.length === 0) return { ok: false, error: 'name is required' }
  if (trimmed.length > 60) return { ok: false, error: 'name max 60 chars' }
  return { ok: true, name: trimmed }
}

export async function GET() {
  const palettes = await loadPalettes()
  return NextResponse.json({ palettes })
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid JSON body' }, { status: 400 })
  }

  const nameResult = validateName(body.name)
  if (!nameResult.ok) return NextResponse.json({ error: nameResult.error }, { status: 400 })

  const colorsResult = validateColors(body.colors)
  if (!colorsResult.ok) return NextResponse.json({ error: colorsResult.error }, { status: 400 })

  const palettes = await loadPalettes()
  if (palettes.some((p) => p.name.toLowerCase() === nameResult.name.toLowerCase())) {
    return NextResponse.json({ error: 'a palette with that name already exists' }, { status: 409 })
  }

  const palette: CustomPalette = {
    id: randomUUID(),
    name: nameResult.name,
    colors: colorsResult.colors,
    createdAt: new Date().toISOString(),
  }
  palettes.push(palette)
  const saveRes = await savePalettes(palettes, `Theme Studio: add custom palette "${palette.name}"`)
  if (!saveRes.ok) return NextResponse.json({ error: saveRes.error || 'save failed' }, { status: 502 })
  return NextResponse.json({ palette })
}

export async function PUT(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid JSON body' }, { status: 400 })
  }

  if (typeof body.id !== 'string' || !body.id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 })
  }

  const palettes = await loadPalettes()
  const idx = palettes.findIndex((p) => p.id === body.id)
  if (idx === -1) return NextResponse.json({ error: 'palette not found' }, { status: 404 })

  const updated: CustomPalette = { ...palettes[idx] }

  if (body.name !== undefined) {
    const nameResult = validateName(body.name)
    if (!nameResult.ok) return NextResponse.json({ error: nameResult.error }, { status: 400 })
    if (palettes.some((p) => p.id !== body.id && p.name.toLowerCase() === nameResult.name.toLowerCase())) {
      return NextResponse.json({ error: 'a palette with that name already exists' }, { status: 409 })
    }
    updated.name = nameResult.name
  }

  if (body.colors !== undefined) {
    const colorsResult = validateColors(body.colors)
    if (!colorsResult.ok) return NextResponse.json({ error: colorsResult.error }, { status: 400 })
    updated.colors = colorsResult.colors
  }

  updated.updatedAt = new Date().toISOString()
  palettes[idx] = updated
  const saveRes = await savePalettes(palettes, `Theme Studio: update custom palette "${updated.name}"`)
  if (!saveRes.ok) return NextResponse.json({ error: saveRes.error || 'save failed' }, { status: 502 })
  return NextResponse.json({ palette: updated })
}

export async function DELETE(req: Request) {
  const url = new URL(req.url)
  const id = url.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id query param is required' }, { status: 400 })

  const palettes = await loadPalettes()
  const target = palettes.find((p) => p.id === id)
  const next = palettes.filter((p) => p.id !== id)
  if (next.length === palettes.length) {
    return NextResponse.json({ error: 'palette not found' }, { status: 404 })
  }
  const saveRes = await savePalettes(next, `Theme Studio: delete custom palette "${target?.name || id}"`)
  if (!saveRes.ok) return NextResponse.json({ error: saveRes.error || 'save failed' }, { status: 502 })
  return NextResponse.json({ ok: true })
}
