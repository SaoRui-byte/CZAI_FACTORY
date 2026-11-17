import type { ReactNode } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../lib/useAuth'
import { maskPhone } from '../../lib/auth'
import { cn } from '../../lib/cn'
import { SiteHeader } from '../layout/SiteHeader'

const items = [
  { to: '/console', label: '总览', end: true },
  { to: '/console/keys', label: 'API Key' },
  { to: '/console/usage', label: '用量明细' },
  { to: '/console/playground', label: '对话测试台' },
]

export function ConsoleShell({ children }: { children: ReactNode }) {
  const { session, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut()
    navigate('/')
  }

  return (
    <>
      <SiteHeader />
      <div className="container-page flex flex-col gap-8 pt-8 pb-20 lg:flex-row lg:gap-10">
        {/* 侧栏 / 移动端横向条 */}
        <aside className="lg:w-[210px] lg:shrink-0">
          <nav
            aria-label="控制台导航"
            className="flex gap-1.5 overflow-x-auto rounded-xl border border-white/[0.075] bg-white/[0.028] p-1.5 lg:sticky lg:top-24 lg:flex-col lg:overflow-visible lg:bg-transparent lg:p-0 lg:border-0"
          >
            {items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'shrink-0 rounded-lg px-4 py-2.5 text-[12.5px] whitespace-nowrap transition-colors duration-200',
                    isActive
                      ? 'bg-white/[0.07] text-mist-100'
                      : 'text-mist-400 hover:bg-white/[0.04] hover:text-mist-200',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-6 hidden lg:block">
            <div className="rounded-xl border border-white/[0.075] bg-white/[0.025] p-4">
              <div className="text-[11px] text-mist-600">当前账号</div>
              <div className="mt-1.5 text-[12.5px] text-mist-200">
                {session ? session.name : '—'}
              </div>
              <div className="tnum mt-1 text-[11px] text-mist-500">
                {session ? maskPhone(session.phone) : ''}
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="mt-4 w-full rounded-lg border border-white/10 py-2 text-[11.5px] text-mist-400 transition-colors hover:border-white/20 hover:text-mist-200"
              >
                退出登录
              </button>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </>
  )
}
