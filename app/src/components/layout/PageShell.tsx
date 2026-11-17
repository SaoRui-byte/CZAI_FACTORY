import type { ReactNode } from 'react'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'

/**
 * 全站外壳。
 * 背景分两层：
 *  1. 固定的深色径向渐变（提供整体基调）
 *  2. 由各页面首屏自行渲染的流线画布（只在首屏出现，避免全站过亮）
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-dvh">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-ink-950"
      >
        <div className="absolute inset-0 [background:radial-gradient(1200px_700px_at_72%_-8%,#12263D_0%,#0A1018_45%,#07090D_100%)]" />
      </div>

      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </div>
  )
}
