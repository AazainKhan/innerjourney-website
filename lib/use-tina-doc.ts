'use client'

import { useTina } from 'tinacms/dist/react'
import { formSelector } from '@/lib/tina-select'

export interface TinaDocProps<T> {
  query: string
  variables: { relativePath: string }
  data: T
}

/**
 * useTina for a page document: returns live data while editing and asks the
 * Tina sidebar to open this page's form (unless the preview URL names another
 * form — see lib/tina-select.ts).
 */
export function usePageDoc<T extends object>(props: TinaDocProps<T>, folder = 'content/pages'): T {
  const { data } = useTina<T>({
    query: props.query,
    variables: props.variables,
    data: props.data,
    experimental___selectFormByFormId: formSelector(`${folder}/${props.variables.relativePath}`),
  })
  return data
}

/** Split a textarea value into trimmed, non-empty lines. */
export function lines(value: string | null | undefined): string[] {
  return (value || '').split('\n').map((s) => s.trim()).filter(Boolean)
}

/** Drop null entries Tina can leave in lists. */
export function present<T>(items: (T | null | undefined)[] | null | undefined): T[] {
  return (items ?? []).filter((i): i is T => i != null)
}
