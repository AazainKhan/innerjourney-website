import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'

type Variant = 'primary' | 'primaryOnDark' | 'secondary' | 'ghostOnDark'
type Size = 'sm' | 'md' | 'lg'

const variantClass: Record<Variant, string> = {
  // Filled azure on light backgrounds — main CTA
  primary: 'bg-azure text-white hover:brightness-110 shadow-azure',
  // White-filled on azure/dark backgrounds — for sections that already use brand-gradient-azure
  primaryOnDark: 'bg-white text-azure hover:bg-blue-50 shadow-azure border border-white/40',
  // Outlined azure on light backgrounds — secondary action
  secondary: 'bg-transparent text-azure border-2 border-azure hover:bg-azure/10',
  // White outline on dark backgrounds — tertiary action on heroes
  ghostOnDark: 'bg-transparent text-white border-2 border-white/60 hover:bg-white/10',
}

const sizeClass: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-base',
  lg: 'px-8 py-3 text-lg',
}

const baseClass =
  'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none button-text'

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never }
type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export default function Button(props: ButtonProps | LinkProps) {
  const { variant = 'primary', size = 'lg', className = '', children, ...rest } = props
  const classes = `${baseClass} ${variantClass[variant]} ${sizeClass[size]} ${className}`.trim()

  if ('href' in rest && rest.href) {
    return (
      <Link {...(rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} className={classes}>
      {children}
    </button>
  )
}
