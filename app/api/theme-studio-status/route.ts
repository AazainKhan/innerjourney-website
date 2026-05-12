import { NextResponse } from 'next/server'
import { isGitHubCommitAvailable } from '@/lib/github-commit'

/**
 * Reports whether the Theme Studio's Apply / Save endpoints can persist
 * changes from this runtime. Used by the studio UI to decide whether to
 * surface a "configure GITHUB_TOKEN" banner.
 */
export async function GET() {
  const isVercel = !!process.env.VERCEL
  const isDev = process.env.NODE_ENV !== 'production'
  const githubAvailable = isGitHubCommitAvailable()

  const canApply = isDev || githubAvailable

  let pathUsed: 'local-git' | 'github-api' | 'none' = 'none'
  if (canApply) {
    pathUsed = isVercel || (process.env.NODE_ENV === 'production' && githubAvailable) ? 'github-api' : 'local-git'
  }

  return NextResponse.json({
    canApply,
    pathUsed,
    isVercel,
    isDev,
    githubConfigured: githubAvailable,
  })
}
