import client from '@/tina/__generated__/client'
import { hydrateRichText } from '@/lib/tina-fallback'

export interface TinaDoc<T> {
  query: string
  variables: { relativePath: string }
  data: T
}

type QueryFn = (args: { relativePath: string }) => Promise<{ query: string; variables: object; data: unknown }>

/**
 * Load one Tina document for a page. Falls back to the JSON on disk (with
 * rich-text parsed) when Tina Cloud is unreachable or still indexing, so the
 * site always renders.
 */
export async function loadTinaDoc<T>(collection: string, relativePath: string, fallback: unknown): Promise<TinaDoc<T>> {
  const query = (client.queries as unknown as Record<string, QueryFn>)[collection]
  const res = query ? await query({ relativePath }).catch(() => null) : null
  if (res) {
    return { query: res.query, variables: res.variables as { relativePath: string }, data: res.data as T }
  }
  return {
    query: '',
    variables: { relativePath },
    data: { [collection]: hydrateRichText(collection, fallback) } as T,
  }
}
