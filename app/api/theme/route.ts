import { NextResponse } from 'next/server'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const FIELDS = ['primaryColor', 'secondaryColor', 'accentColor', 'neutralColor'] as const
const HEX_RE = /^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/

export async function POST(req: Request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'theme studio is disabled in production' }, { status: 403 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid JSON body' }, { status: 400 })
  }

  const out: Record<string, string> = {}
  for (const f of FIELDS) {
    const v = body[f]
    if (typeof v !== 'string' || !HEX_RE.test(v)) {
      return NextResponse.json({ error: `invalid ${f}` }, { status: 400 })
    }
    out[f] = v.length === 9 ? v.slice(0, 7) : v
  }

  const filePath = join(process.cwd(), 'content', 'theme.json')
  await writeFile(filePath, JSON.stringify(out, null, 2) + '\n', 'utf8')
  return NextResponse.json({ ok: true })
}
