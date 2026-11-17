import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

type Variant = 'solid' | 'ghost' | 'quiet'
type Size = 'md' | 'sm'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium whitespace-nowrap transition-[transform,box-shadow,background-color,border-color,color] duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] select-none'

const variants: Record<Variant, string> = {
  solid:
    'bg-brand-gradient text-[#04121A] shadow-[0_8px_34px_-10px_rgba(74,222,222,0.55)] hover:shadow-[0_14px_40px_-10px_rgba(74,222,222,0.75)] hover:-translate-y-0.5 active:translate-y-0',
  ghost:
    'bg-white/[0.03] text-mist-200 border border-white/15 backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/25',
  quiet:
    'text-mist-400 hover:text-mist-100 hover:bg-white/[0.05]',
}

const sizes: Record<Size, string> = {
  md: 'px-8 py-[17px] text-[13px]',
  sm: 'px-5 py-3 text-[12px]',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>

export function Button({
  variant = 'solid',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}

type LinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>

export function ButtonLink({
  variant = 'solid',
  size = 'md',
  className,
  children,
  href = '#',
  ...props
}: LinkProps) {
  return (
    <a
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </a>
  )
}

export function ButtonRouterLink({
  variant = 'solid',
  size = 'md',
  className,
  children,
  to,
}: CommonProps & { to: string }) {
  return (
    <Link
      to={to}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </Link>
  )
}
