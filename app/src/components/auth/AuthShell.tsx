import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { brand } from '../../data/site'
import { FlowCanvas } from '../flow/FlowCanvas'

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle: string
  children: ReactNode
  footer?: ReactNode
}) {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-ink-950"
      >
        <div className="absolute inset-0 [background:radial-gradient(1100px_680px_at_50%_-10%,#12263D_0%,#0A1018_48%,#07090D_100%)]" />
        <FlowCanvas className="opacity-50" />
      </div>

      <header className="container-page flex h-[76px] shrink-0 items-center">
        <Link
          to="/"
          className="flex items-center gap-3"
          aria-label={`${brand.short} — 返回首页`}
        >
          <span
            aria-hidden="true"
            className="h-[24px] w-[24px] rounded-full [background:conic-gradient(from_200deg,var(--color-cyan-glow),var(--color-azure),var(--color-violet-soft),var(--color-cyan-glow))] blur-[0.4px]"
          />
          <span className="flex flex-col gap-[4px]">
            <span className="text-[15px] leading-none font-bold tracking-[0.12em] text-mist-100">
              {brand.short}
            </span>            <span className="text-[7.5px] leading-none font-medium tracking-[0.34em] text-mist-500">
              {brand.wordmark}
            </span>
          </span>
        </Link>
      </header>

      <main id="main" className="flex flex-1 items-center justify-center px-5 py-10">
        <div className="w-full max-w-[400px]">
          <div className="glass-strong edge-light rounded-card px-7 py-8 md:px-8">
            <h1 className="text-[22px] leading-tight font-bold tracking-[-0.01em] text-mist-100">
              {title}
            </h1>
            <p className="mt-2.5 text-[12.5px] leading-[1.75] text-mist-500">
              {subtitle}
            </p>
            <div className="mt-7">{children}</div>
          </div>
          {footer && (
            <div className="mt-6 text-center text-[11px] tracking-[0.08em] text-mist-600">
              {footer}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
