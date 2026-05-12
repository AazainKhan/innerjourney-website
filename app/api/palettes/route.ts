import { NextResponse } from 'next/server'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { randomUUID } from 'node:crypto'

const HEX_RE = /^#[0-9a-fA-F]{6}$/
const ROLE_KEYS = ['primaryColor', 'secondaryColor', 'accentColor', 'neutralColor'] as const

interface CustomPalette {
  id: string
  name: string
  colors: { primaryColor: string; secondaryColor: string; accentColor: string; neutralColor: string }
  createdAt: string
  updatedAt?: string
}

const FILE_PATH = join(process.cwd(), 'content', 'custom-palettes.json')

function devGuard() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'palettes API is disabled in production' }, { status: 403 })
  }
  return null
}

async function loadPalettes(): Promise<CustomPalette[]> {
  try {
    const raw = await readFile(FILE_PATH, 'utf8')
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

async function savePalettes(palettes: CustomPalette[]): Promise<void> {
  await mkdir(dirname(FILE_PATH), { recursive: true })
  await writeFile(FILE_PATH, JSON.stringify(palettes, null, 2) + '\n', 'utf8')
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
  const blocked = devGuard()
  if (blocked) return blocked
  const palettes = await loadPalettes()
  return NextResponse.json({ palettes })
}

export async function POST(req: Request) {
  const blocked = devGuard()
  if (blocked) return blocked

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
  await savePalettes(palettes)
  return NextResponse.json({ palette })
}

export async function PUT(req: Request) {
  const blocked = devGuard()
  if (blocked) return blocked

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

  // Allow partial updates: name and/or colors
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
  await savePalettes(palettes)
  return NextResponse.json({ palette: updated })
}

export async function DELETE(req: Request) {
  const blocked = devGuard()
  if (blocked) return blocked

  const url = new URL(req.url)
  const id = url.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id query param is required' }, { status: 400 })

  const palettes = await loadPalettes()
  const next = palettes.filter((p) => p.id !== id)
  if (next.length === palettes.length) {
    return NextResponse.json({ error: 'palette not found' }, { status: 404 })
  }
  await savePalettes(next)
  return NextResponse.json({ ok: true })
}
