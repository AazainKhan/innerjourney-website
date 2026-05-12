import { NextResponse } from 'next/server'
import { writeFile, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)

const FIELDS = ['primaryColor', 'secondaryColor', 'accentColor', 'neutralColor'] as const
const HEX_RE = /^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/
const FILE_REL_PATH = 'content/theme.json'
const FILE_ABS_PATH = join(process.cwd(), FILE_REL_PATH)

async function git(args: string[]): Promise<{ stdout: string; stderr: string }> {
  return execFileAsync('git', args, { cwd: process.cwd(), maxBuffer: 1024 * 1024 })
}

interface DeployResult {
  attempted: boolean
  ok: boolean
  message: string
  commit?: string
}

async function commitAndPush(summary: string): Promise<DeployResult> {
  // Bail early if not inside a git repo
  try {
    await git(['rev-parse', '--is-inside-work-tree'])
  } catch {
    return { attempted: false, ok: false, message: 'not a git repo — file written locally only' }
  }

  // Stage the theme file
  try {
    await git(['add', FILE_REL_PATH])
  } catch (e) {
    return { attempted: true, ok: false, message: `git add failed: ${(e as Error).message}` }
  }

  // Bail if no staged changes (theme.json unchanged from HEAD)
  try {
    await git(['diff', '--cached', '--quiet', '--exit-code'])
    return { attempted: false, ok: true, message: 'theme already matches HEAD — nothing to commit' }
  } catch {
    // exit code 1 = there are staged diffs — proceed
  }

  // Commit
  let commitSha = ''
  try {
    await git(['commit', '-m', `Apply theme via Theme Studio: ${summary}`])
    const { stdout } = await git(['rev-parse', 'HEAD'])
    commitSha = stdout.trim().slice(0, 7)
  } catch (e) {
    return { attempted: true, ok: false, message: `git commit failed: ${(e as Error).message}` }
  }

  // Rebase against latest origin/main in case other commits landed.
  // --autostash stashes any in-progress source/screenshot edits the dev has
  // unstaged so the rebase doesn't refuse to run, then pops them back after.
  try {
    await git(['fetch', 'origin', 'main'])
  } catch {
    // Non-fatal: we'll attempt the push anyway
  }
  try {
    await git(['rebase', '--autostash', 'origin/main'])
  } catch (e) {
    try { await git(['rebase', '--abort']) } catch { /* noop */ }
    return {
      attempted: true,
      ok: false,
      commit: commitSha,
      message: `rebase against origin/main failed: ${(e as Error).message}. Commit was created locally; resolve and push manually.`,
    }
  }

  // Push HEAD to origin main (this works regardless of whether the current
  // branch is main or a feature/worktree branch — we always want the new
  // theme on the deployed branch)
  try {
    await git(['push', 'origin', 'HEAD:main'])
  } catch (e) {
    return {
      attempted: true,
      ok: false,
      commit: commitSha,
      message: `git push failed: ${(e as Error).message}. Commit exists locally; push manually.`,
    }
  }

  // Update local main ref so other worktrees see the new tip
  try {
    await git(['update-ref', 'refs/heads/main', 'HEAD'])
  } catch {
    // Non-fatal: the push succeeded, this just keeps the local refs tidy
  }

  return {
    attempted: true,
    ok: true,
    commit: commitSha,
    message: `Committed ${commitSha} and pushed to origin/main — Vercel will deploy shortly`,
  }
}

function summarizeColors(colors: Record<string, string>): string {
  // Compact one-liner: "primary=#xxx, secondary=#xxx, ..."
  return FIELDS.map((f) => `${f.replace('Color', '')}=${colors[f]}`).join(', ')
}

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

  // Short-circuit: if file already matches, skip write + commit
  try {
    const current = JSON.parse(await readFile(FILE_ABS_PATH, 'utf8'))
    const same = FIELDS.every((f) => (current?.[f] || '').toLowerCase() === out[f].toLowerCase())
    if (same) {
      return NextResponse.json({
        ok: true,
        wrote: false,
        deploy: { attempted: false, ok: true, message: 'theme.json already matches — nothing changed' },
      })
    }
  } catch {
    // file might not exist or be invalid JSON — proceed to write it
  }

  await writeFile(FILE_ABS_PATH, JSON.stringify(out, null, 2) + '\n', 'utf8')

  const deploy = await commitAndPush(summarizeColors(out))

  return NextResponse.json({ ok: true, wrote: true, deploy })
}
