import { Navigate, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuth } from '../../lib/useAuth'
import { safeNext } from '../../lib/safeNext'

/** 未登录时重定向到登录页，并带上原路径以便登录后回跳。 */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { session } = useAuth()
  const location = useLocation()

  if (!session) {
    const next = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/login?next=${next}`} replace />
  }

  return <>{children}</>
}

/**
 * 已登录用户访问登录/注册页时，直接送去控制台。
 * 注意要读 `next`：登录时 AuthForm 先 setSession 再 navigate(next)，
 * 这里会先于 navigate 渲染，若固定跳 /console 会把回跳目标覆盖掉。
 */
export function RedirectIfAuthed({ children }: { children: ReactNode }) {
  const { session } = useAuth()
  const location = useLocation()

  if (session) {
    const next = safeNext(new URLSearchParams(location.search).get('next'))
    return <Navigate to={next} replace />
  }

  return <>{children}</>
}
