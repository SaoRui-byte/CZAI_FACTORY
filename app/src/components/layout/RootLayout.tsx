import { useEffect } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'

/**
 * 全站根布局：
 * - 路由切换后回到顶部
 * - 提供「跳到主要内容」无障碍链接
 */
export function RootLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-[13px] focus:text-ink-950"
      >
        跳到主要内容
      </a>
      <Outlet />
      <ScrollRestoration />
    </>
  )
}
