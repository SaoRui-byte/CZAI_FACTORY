import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

/** 公开页统一的标题区。 */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  className,
}: {
  eyebrow?: string
  title: string
  lead?: string
  children?: ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        'relative overflow-hidden border-b border-white/[0.06]',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(760px_340px_at_50%_-40%,rgba(74,222,222,0.1),transparent_70%)]"
      />
      <div className="container-page relative pt-16 pb-12 md:pt-20">
        {eyebrow && (
          <div className="text-[10.5px] tracking-[0.26em] text-cyan-glow/80">
            {eyebrow}
          </div>
        )}
        <h1
          className={cn(
            'text-[clamp(30px,4.6vw,48px)] leading-[1.14] font-bold tracking-[-0.03em] text-mist-100',
            eyebrow && 'mt-5',
          )}
        >
          {title}
        </h1>
        {lead && (
          <p className="mt-5 max-w-[580px] text-[13.5px] leading-[1.9] text-mist-400">
            {lead}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}
