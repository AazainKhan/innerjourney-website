/** Renders structured data. `<` is escaped so content can never close the script tag. */
export default function JsonLd({ data }: { data: unknown }) {
  const json = JSON.stringify(data, (_k, v) => (v === undefined || (Array.isArray(v) && v.length === 0) ? undefined : v))
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json.replace(/</g, '\\u003c') }} />
}
