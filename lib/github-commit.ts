// GitHub Contents API helper — used by /api/theme and /api/palettes to commit
// content files on Vercel (where fs is read-only and there's no git CLI).
// Requires `GITHUB_TOKEN` env var. Optional: `GITHUB_REPO` (owner/name) and
// `GITHUB_BRANCH` (defaults to 'main').

export interface GitHubCommitResult {
  ok: boolean
  commit?: string
  error?: string
}

function parseRepoFromEnv(): { owner: string; repo: string } | null {
  const explicit = process.env.GITHUB_REPO
  if (explicit && explicit.includes('/')) {
    const [owner, repo] = explicit.split('/')
    return { owner, repo }
  }
  // Vercel sets these env vars on every build / deployment.
  const owner = process.env.VERCEL_GIT_REPO_OWNER
  const repo = process.env.VERCEL_GIT_REPO_SLUG
  if (owner && repo) return { owner, repo }
  return null
}

export function isGitHubCommitAvailable(): boolean {
  return !!process.env.GITHUB_TOKEN && parseRepoFromEnv() !== null
}

export async function commitFileViaGitHub({
  path,
  content,
  message,
  branch = process.env.GITHUB_BRANCH || 'main',
}: {
  path: string
  content: string
  message: string
  branch?: string
}): Promise<GitHubCommitResult> {
  const token = process.env.GITHUB_TOKEN
  if (!token) return { ok: false, error: 'GITHUB_TOKEN not set' }

  const repoInfo = parseRepoFromEnv()
  if (!repoInfo) return { ok: false, error: 'GITHUB_REPO not set and Vercel repo metadata missing' }

  const { owner, repo } = repoInfo
  const baseUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`

  // Look up the current file's sha (required by the PUT to update an existing
  // file). 404 is fine — we'll create the file.
  let existingSha: string | undefined
  try {
    const getRes = await fetch(`${baseUrl}?ref=${branch}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
    if (getRes.ok) {
      const data = (await getRes.json()) as { sha?: string }
      existingSha = data.sha
    } else if (getRes.status !== 404) {
      return { ok: false, error: `GitHub GET ${getRes.status}: ${await getRes.text()}` }
    }
  } catch (e) {
    return { ok: false, error: `GitHub GET failed: ${(e as Error).message}` }
  }

  // Base64-encode the content for the PUT payload.
  const encoded = Buffer.from(content, 'utf8').toString('base64')

  try {
    const putRes = await fetch(baseUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        content: encoded,
        sha: existingSha,
        branch,
      }),
    })
    if (!putRes.ok) {
      return { ok: false, error: `GitHub PUT ${putRes.status}: ${await putRes.text()}` }
    }
    const result = (await putRes.json()) as { commit?: { sha?: string } }
    return { ok: true, commit: result.commit?.sha?.slice(0, 7) }
  } catch (e) {
    return { ok: false, error: `GitHub PUT failed: ${(e as Error).message}` }
  }
}
