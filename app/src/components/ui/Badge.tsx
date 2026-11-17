import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export function Badge({
  children,
  tone = 'glass',
  className,
}: {
  children: ReactNode
  tone?: 'glass' | 'outline' | 'gradient'
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[11px] font-medium tracking-[0.14em]',
        tone === 'glass' && 'border border-white/10 bg-white/[0.045] text-mist-300',
        tone === 'outline' && 'border border-white/10 text-mist-500',
        tone === 'gradient' &&
          'border border-cyan-glow/25 bg-cyan-glow/[0.08] text-cyan-glow',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function StatusPip({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'block h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-glow shadow-[0_0_12px_var(--color-cyan-glow)] motion-safe:animate-pip',
        className,
      )}
    />
  )
}
