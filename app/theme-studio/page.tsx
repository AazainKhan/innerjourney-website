import type { Metadata } from 'next'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import themeData from '@/content/theme.json'
import ThemeStudioClient from './ThemeStudioClient'

export const metadata: Metadata = {
  title: 'Theme Studio',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

interface CustomPalette {
  id: string
  name: string
  colors: { primaryColor: string; secondaryColor: string; accentColor: string; neutralColor: string }
  createdAt: string
  updatedAt?: string
}

async function loadCustomPalettes(): Promise<CustomPalette[]> {
  try {
    const raw = await readFile(join(process.cwd(), 'content', 'custom-palettes.json'), 'utf8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export default async function ThemeStudioPage() {
  // Page itself is open — gating is handled by the underlying API routes,
  // which only allow writes when the deployment has the right env vars set.
  // The page surfaces a banner if writes won't succeed in the current env.
  const customPalettes = await loadCustomPalettes()
  return <ThemeStudioClient current={themeData} initialCustomPalettes={customPalettes} />
}
