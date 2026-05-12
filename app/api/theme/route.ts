import { NextResponse } from 'next/server'
import { writeFile, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { commitFileViaGitHub, isGitHubCommitAvailable } from '@/lib/github-commit'

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
  via?: 'github-api' | 'local-git'
}

function summarizeColors(colors: Record<string, string>): string {
  return FIELDS.map((f) => `${f.replace('Color', '')}=${colors[f]}`).join(', ')
}

// In Vercel's serverless runtime the filesystem is read-only and there's no
// git CLI. Detect that and route through the GitHub Contents API instead.
function shouldUseGitHubApi(): boolean {
  return !!process.env.VERCEL || (process.env.NODE_ENV === 'production' && isGitHubCommitAvailable())
}

async function commitAndPushLocally(content: string, summary: string): Promise<DeployResult> {
  // Bail if not a git repo (e.g. a deploy that doesn't include .git)
  try {
    await git(['rev-parse', '--is-inside-work-tree'])
  } catch {
    return { attempted: false, ok: false, message: 'not a git repo — theme.json written locally only', via: 'local-git' }
  }

  try {
    await git(['add', FILE_REL_PATH])
  } catch (e) {
    return { attempted: true, ok: false, message: `git add failed: ${(e as Error).message}`, via: 'local-git' }
  }

  try {
    await git(['diff', '--cached', '--quiet', '--exit-code'])
    return { attempted: false, ok: true, message: 'theme already matches HEAD — nothing to commit', via: 'local-git' }
  } catch {
    // diffs present — proceed
  }

  let commitSha = ''
  try {
    await git(['commit', '-m', `Apply theme via Theme Studio: ${summary}`])
    const { stdout } = await git(['rev-parse', 'HEAD'])
    commitSha = stdout.trim().slice(0, 7)
  } catch (e) {
    return { attempted: true, ok: false, message: `git commit failed: ${(e as Error).message}`, via: 'local-git' }
  }

  try { await git(['fetch', 'origin', 'main']) } catch { /* non-fatal */ }
  try {
    await git(['rebase', '--autostash', 'origin/main'])
  } catch (e) {
    try { await git(['rebase', '--abort']) } catch { /* noop */ }
    return {
      attempted: true,
      ok: false,
      commit: commitSha,
      message: `rebase against origin/main failed: ${(e as Error).message}. Commit was created locally; resolve manually.`,
      via: 'local-git',
    }
  }

  try {
    await git(['push', 'origin', 'HEAD:main'])
  } catch (e) {
    return {
      attempted: true,
      ok: false,
      commit: commitSha,
      message: `git push failed: ${(e as Error).message}. Commit exists locally; push manually.`,
      via: 'local-git',
    }
  }

  try { await git(['update-ref', 'refs/heads/main', 'HEAD']) } catch { /* non-fatal */ }

  // content arg is unused for local path but kept for symmetry with the GitHub
  // version (which doesn't get to read the on-disk file in serverless).
  void content
  return {
    attempted: true,
    ok: true,
    commit: commitSha,
    message: `Committed ${commitSha} and pushed to origin/main — Vercel will deploy shortly`,
    via: 'local-git',
  }
}

async function commitViaGitHub(content: string, summary: string): Promise<DeployResult> {
  const result = await commitFileViaGitHub({
    path: FILE_REL_PATH,
    content,
    message: `Apply theme via Theme Studio: ${summary}`,
  })
  if (!result.ok) {
    return { attempted: true, ok: false, message: result.error || 'GitHub API failed', via: 'github-api' }
  }
  return {
    attempted: true,
    ok: true,
    commit: result.commit,
    message: `Committed ${result.commit} via GitHub API — Vercel will redeploy shortly`,
    via: 'github-api',
  }
}

export async function POST(req: Request) {
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

  const newContent = JSON.stringify(out, null, 2) + '\n'
  const summary = summarizeColors(out)

  if (shouldUseGitHubApi()) {
    // Vercel: skip the fs write entirely (read-only filesystem) and go
    // straight through the GitHub Contents API. The new commit triggers a
    // Vercel deploy which picks up the new theme.json.
    const deploy = await commitViaGitHub(newContent, summary)
    return NextResponse.json({ ok: deploy.ok, wrote: false, deploy }, { status: deploy.ok ? 200 : 502 })
  }

  // Dev: write locally first, then short-circuit if no changes, otherwise
  // commit + push via local git.
  try {
    const current = JSON.parse(await readFile(FILE_ABS_PATH, 'utf8'))
    const same = FIELDS.every((f) => (current?.[f] || '').toLowerCase() === out[f].toLowerCase())
    if (same) {
      return NextResponse.json({
        ok: true,
        wrote: false,
        deploy: { attempted: false, ok: true, message: 'theme.json already matches — nothing changed', via: 'local-git' },
      })
    }
  } catch {
    // file might be missing — proceed to write
  }

  await writeFile(FILE_ABS_PATH, newContent, 'utf8')
  const deploy = await commitAndPushLocally(newContent, summary)
  return NextResponse.json({ ok: true, wrote: true, deploy })
}
