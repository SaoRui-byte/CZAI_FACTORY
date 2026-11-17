import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../lib/useAuth'
import { CODE_TTL_SECONDS, DEMO_ACCOUNT, DEMO_CODE, isValidPhone } from '../../lib/auth'
import { cn } from '../../lib/cn'

type Mode = 'login' | 'register'

export function AuthForm({ mode }: { mode: Mode }) {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const next = params.get('next') || '/console'

  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [agreed, setAgreed] = useState(mode === 'login')
  const [countdown, setCountdown] = useState(0)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [])

  const startCountdown = () => {
    setCountdown(CODE_TTL_SECONDS)
    if (timerRef.current) window.clearInterval(timerRef.current)
    timerRef.current = window.setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          if (timerRef.current) window.clearInterval(timerRef.current)
          return 0
        }
        return c - 1
      })
    }, 1000)
  }

  const handleSendCode = () => {
    setError(null)
    if (!isValidPhone(phone)) {
      setError('请输入有效的 11 位手机号')
      return
    }
    setSent(true)
    startCountdown()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!isValidPhone(phone)) {
      setError('请输入有效的 11 位手机号')
      return
    }
    if (code.length !== 6) {
      setError('请输入 6 位验证码')
      return
    }
    if (code !== DEMO_CODE) {
      setError('验证码不正确')
      return
    }
    if (!agreed) {
      setError('请先阅读并同意服务协议')
      return
    }

    setSubmitting(true)
    // 模拟网络延迟，让状态切换可见
    window.setTimeout(() => {
      signIn(phone)
      navigate(next, { replace: true })
    }, 420)
  }

  const phoneOk = isValidPhone(phone)
  const canSubmit = phoneOk && code.length === 6 && agreed && !submitting

  /** 演示账号一键登录，跳过全部输入 */
  const handleDemoLogin = () => {
    setSubmitting(true)
    window.setTimeout(() => {
      signIn(DEMO_ACCOUNT.phone, DEMO_ACCOUNT.name)
      navigate(next, { replace: true })
    }, 280)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {mode === 'login' && (
        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={submitting}
          className="group flex w-full items-center gap-3 rounded-lg border border-cyan-glow/30 bg-cyan-glow/[0.07] px-4 py-3.5 text-left transition-colors duration-200 hover:bg-cyan-glow/[0.12] disabled:opacity-60"
        >
          <span
            aria-hidden="true"
            className="h-6 w-6 shrink-0 rounded-full [background:conic-gradient(from_200deg,var(--color-cyan-glow),var(--color-azure),var(--color-violet-soft),var(--color-cyan-glow))] blur-[0.4px]"
          />
          <span className="min-w-0 flex-1">
            <span className="block text-[12.5px] font-medium text-mist-100">
              一键进入演示账号
            </span>
            <span className="mt-0.5 block text-[10.5px] text-mist-500">
              已预置用量、密钥与调用记录
            </span>
          </span>
          <span
            aria-hidden="true"
            className="shrink-0 text-[12px] text-cyan-glow transition-transform duration-200 group-hover:translate-x-0.5"
          >
            →
          </span>
        </button>
      )}

      {mode === 'login' && (
        <div className="flex items-center gap-3 text-[10.5px] tracking-[0.1em] text-mist-600">
          <span className="h-px flex-1 bg-white/[0.08]" />
          或使用手机号
          <span className="h-px flex-1 bg-white/[0.08]" />
        </div>
      )}
      <div>
        <label
          htmlFor="phone"
          className="mb-2 block text-[11.5px] tracking-[0.06em] text-mist-500"
        >
          手机号
        </label>
        <div className="flex gap-2.5">
          <span className="grid shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.03] px-3.5 text-[12.5px] text-mist-400">
            +86
          </span>
          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            maxLength={11}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))
              setError(null)
            }}
            placeholder="请输入手机号"
            aria-invalid={!!error && !phoneOk}
            className="tnum min-w-0 flex-1 rounded-lg border border-white/10 bg-white/[0.035] px-4 py-3.5 text-[13px] text-mist-100 placeholder:font-sans placeholder:text-mist-600 focus:border-cyan-glow/45 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="code"
          className="mb-2 block text-[11.5px] tracking-[0.06em] text-mist-500"
        >
          验证码
        </label>
        <div className="flex gap-2.5">
          <input
            id="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={code}
            onChange={(e) => {
              setCode(e.target.value.replace(/\D/g, '').slice(0, 6))
              setError(null)
            }}
            placeholder="6 位数字"
            className="tnum min-w-0 flex-1 rounded-lg border border-white/10 bg-white/[0.035] px-4 py-3.5 text-[13px] tracking-[0.3em] text-mist-100 placeholder:font-sans placeholder:tracking-normal placeholder:text-mist-600 focus:border-cyan-glow/45 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleSendCode}
            disabled={countdown > 0 || !phoneOk}
            className={cn(
              'shrink-0 rounded-lg border px-4 text-[12px] transition-colors duration-200',
              countdown > 0 || !phoneOk
                ? 'cursor-not-allowed border-white/8 text-mist-600'
                : 'border-cyan-glow/35 text-cyan-glow hover:bg-cyan-glow/10',
            )}
          >
            {countdown > 0 ? `${countdown}s 后重发` : '获取验证码'}
          </button>
        </div>
      </div>

      <p className="rounded-lg border border-white/[0.08] bg-white/[0.025] px-3.5 py-2.5 text-[11px] leading-[1.7] text-mist-500">
        演示环境：验证码固定为{' '}
        <span className="tnum text-cyan-glow">{DEMO_CODE}</span>
        {sent && '，请直接填入上方输入框'}
      </p>

      <label className="flex cursor-pointer items-start gap-2.5 text-[11.5px] leading-[1.6] text-mist-500">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => {
            setAgreed(e.target.checked)
            setError(null)
          }}
          className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-cyan-glow"
        />
        <span>
          我已阅读并同意
          <span className="mx-0.5 text-mist-300 underline underline-offset-2 decoration-mist-600">
            服务协议
          </span>
          与
          <span className="mx-0.5 text-mist-300 underline underline-offset-2 decoration-mist-600">
            隐私政策
          </span>
        </span>
      </label>

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-[#E66767]/30 bg-[#E66767]/[0.08] px-3.5 py-2.5 text-[11.5px] text-[#F0A0A0]"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className={cn(
          'mt-1 rounded-full py-4 text-[13px] font-medium transition-[background-color,opacity,transform] duration-200',
          canSubmit
            ? 'bg-brand-gradient text-[#04121A] hover:-translate-y-0.5'
            : 'cursor-not-allowed bg-white/[0.06] text-mist-600',
        )}
      >
        {submitting ? '正在登录…' : mode === 'login' ? '登录' : '注册并登录'}
      </button>

      <p className="text-center text-[12px] text-mist-500">
        {mode === 'login' ? (
          <>
            还没有账号？
            <Link
              to={`/register${next !== '/console' ? `?next=${encodeURIComponent(next)}` : ''}`}
              className="ml-1 text-cyan-glow hover:underline"
            >
              立即注册
            </Link>
          </>
        ) : (
          <>
            已有账号？
            <Link
              to={`/login${next !== '/console' ? `?next=${encodeURIComponent(next)}` : ''}`}
              className="ml-1 text-cyan-glow hover:underline"
            >
              直接登录
            </Link>
          </>
        )}
      </p>
    </form>
  )
}
