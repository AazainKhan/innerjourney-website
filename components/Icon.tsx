import { iconClass } from '@/lib/icons'

interface IconProps extends React.HTMLAttributes<HTMLElement> {
  /** Icon id from lib/icons.ts, e.g. "fa-brain". Brand icons get "fab" automatically. */
  name: string | null | undefined
}

/** Font Awesome icon from the curated registry. Renders nothing for an empty value. */
export default function Icon({ name, className, ...rest }: IconProps) {
  const cls = iconClass(name)
  if (!cls) return null
  return <i className={className ? `${cls} ${className}` : cls} aria-hidden="true" {...rest} />
}
