import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { brand, nav } from '../../data/site'
import { useAuth } from '../../lib/useAuth'
import { cn } from '../../lib/cn'

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      className="group flex items-center gap-3"
      aria-label={`${brand.short} ${brand.wordmark} — 返回首页`}
    >
      <span
        aria-hidden="true"
        className="h-[26px] w-[26px] shrink-0 rounded-full [background:conic-gradient(from_200deg,var(--color-cyan-glow),var(--color-azure),var(--color-violet-soft),var(--color-cyan-glow))] blur-[0.4px] transition-transform duration-500 group-hover:rotate-90"
      />
      <span className="flex flex-col gap-[5px]">
        <span className="font-sans text-[17px] leading-none font-bold tracking-[0.12em] text-mist-100">
          {brand.short}
        </span>
        {!compact && (
          <span className="font-sans text-[8px] leading-none font-medium tracking-[0.34em] text-mist-500">
            {brand.wordmark}
          </span>
        )}
      </span>
    </Link>
  )
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const { session } = useAuth()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [lastPath, setLastPath] = useState(location.pathname)

  // 路由变化时收起抽屉。这是 React 官方推荐的「渲染期间调整 state」模式，
  // 比在 effect 里 setState 少一次渲染，也不会产生闪烁。
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname)
    setOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-colors duration-300',
        scrolled
          ? 'border-b border-white/[0.07] bg-ink-950/80 backdrop-blur-xl'
          : 'border-b border-transparent',
      )}
    >
      <div className="container-page flex h-[76px] items-center gap-10">
        <Logo />

        <nav
          aria-label="主导航"
          className="ml-auto hidden items-center gap-8 lg:flex"
        >
          {nav.map((item) => {
            const isRoute = item.href.startsWith('/')
            const active =
              isRoute && location.pathname === item.href
            const cls = cn(
              'text-[13px] transition-colors duration-200',
              active ? 'text-mist-100' : 'text-mist-400 hover:text-mist-100',
            )
            return isRoute ? (
              <Link key={item.label} to={item.href} className={cls}>
                {item.label}
              </Link>
            ) : (
              <a key={item.label} href={item.href} className={cls}>
                {item.label}
              </a>
            )
          })}
        </nav>

        <Link
          to="/console"
          className="ml-auto hidden rounded-full border border-white/15 bg-white/[0.06] px-5 py-[11px] text-[12px] font-medium text-mist-200 backdrop-blur-md transition-colors duration-200 hover:bg-white/[0.12] lg:ml-0 lg:inline-flex"
        >
          {session ? '控制台 →' : '登录 / 控制台 →'}
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? '关闭菜单' : '打开菜单'}
          className="ml-auto grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[0.04] lg:hidden"
        >
          <span className="relative block h-[10px] w-[16px]">
            <span
              className={cn(
                'absolute left-0 block h-px w-full bg-mist-200 transition-transform duration-300',
                open ? 'top-[5px] rotate-45' : 'top-0',
              )}
            />
            <span
              className={cn(
                'absolute left-0 block h-px w-full bg-mist-200 transition-transform duration-300',
                open ? 'top-[5px] -rotate-45' : 'top-[9px]',
              )}
            />
          </span>
        </button>
      </div>

      {/* 移动端抽屉 */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-x-0 top-[76px] bottom-0 z-40 overflow-y-auto border-t border-white/[0.07] bg-ink-950/95 backdrop-blur-2xl lg:hidden"
      >
        <nav aria-label="移动端导航" className="container-page flex flex-col py-6">
          {nav.map((item) => {
            const isRoute = item.href.startsWith('/')
            const cls =
              'border-b border-white/[0.06] py-5 text-[15px] text-mist-200'
            return isRoute ? (
              <Link key={item.label} to={item.href} className={cls}>
                {item.label}
              </Link>
            ) : (
              <a key={item.label} href={item.href} className={cls}>
                {item.label}
              </a>
            )
          })}
          <Link
            to="/models"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-gradient px-6 py-4 text-[13px] font-medium text-[#04121A]"
          >
            进入模型广场
          </Link>
          <Link
            to="/console"
            className="mt-3 inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-6 py-4 text-[13px] font-medium text-mist-200"
          >
            {session ? '控制台 →' : '登录 / 控制台 →'}
          </Link>
        </nav>
      </div>
    </header>
  )
}
