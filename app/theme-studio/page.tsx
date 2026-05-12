import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import themeData from '@/content/theme.json'
import ThemeStudioClient from './ThemeStudioClient'

export const metadata: Metadata = {
  title: 'Theme Studio (dev)',
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
  if (process.env.NODE_ENV === 'production') notFound()
  const customPalettes = await loadCustomPalettes()
  return <ThemeStudioClient current={themeData} initialCustomPalettes={customPalettes} />
}
