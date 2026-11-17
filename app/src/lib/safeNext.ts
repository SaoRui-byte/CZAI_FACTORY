/**
 * 登录后的回跳目标校验。
 *
 * 只接受站内绝对路径：必须以单个 `/` 开头，并排除 `//host` 与 `/\host`
 * —— 浏览器会把这两种形式当作协议相对 URL 或反斜杠归一化后的站外地址，
 * 直接把用户带去第三方站点。
 *
 * 同时排除登录/注册页自身：已登录用户访问 /login?next=/login 时，
 * RedirectIfAuthed 会再跳回 /login，形成无限重定向。
 */
export function safeNext(raw: string | null): string {
  const FALLBACK = '/console'
  if (!raw) return FALLBACK
  if (!raw.startsWith('/')) return FALLBACK
  if (raw.startsWith('//') || raw.startsWith('/\\')) return FALLBACK

  const path = raw.split('?')[0].split('#')[0]
  if (path === '/login' || path === '/register') return FALLBACK

  return raw
}
