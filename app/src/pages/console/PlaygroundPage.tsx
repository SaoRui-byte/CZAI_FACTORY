import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ConsoleShell } from '../../components/console/ConsoleShell'
import { models } from '../../data/models'
import { demoReplies } from '../../data/playground'
import { cn } from '../../lib/cn'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  streaming?: boolean
}

const online = models.filter((m) => m.status === 'online')

export default function PlaygroundPage() {
  const [params] = useSearchParams()
  const requested = params.get('model')
  const initial =
    requested && online.some((m) => m.id === requested)
      ? requested
      : (online[0]?.id ?? '')

  const [model, setModel] = useState(initial)
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(2048)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [busy, setBusy] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const timersRef = useRef<number[]>([])

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages])

  useEffect(() => {
    const timers = timersRef.current
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [])

  const send = () => {
    const text = input.trim()
    if (!text || busy) return

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
    }
    const replyId = crypto.randomUUID()
    setMessages((m) => [
      ...m,
      userMsg,
      { id: replyId, role: 'assistant', content: '', streaming: true },
    ])
    setInput('')
    setBusy(true)

    // 模拟流式输出：逐段追加
    const full = demoReplies(text)
    const chunks = full.match(/[\s\S]{1,3}/g) ?? [full]
    let i = 0

    const tick = () => {
      i += 1
      const partial = chunks.slice(0, i).join('')
      const done = i >= chunks.length
      setMessages((m) =>
        m.map((msg) =>
          msg.id === replyId
            ? { ...msg, content: partial, streaming: !done }
            : msg,
        ),
      )
      if (done) {
        setBusy(false)
        return
      }
      const t = window.setTimeout(tick, 18)
      timersRef.current.push(t)
    }
    const t = window.setTimeout(tick, 320)
    timersRef.current.push(t)
  }

  const clear = () => {
    if (busy) return
    setMessages([])
  }

  const currentModel = online.find((m) => m.id === model)

  return (
    <ConsoleShell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[24px] leading-none font-bold tracking-[-0.02em] text-mist-100">
            对话测试台
          </h1>
          <p className="mt-2.5 text-[12px] text-mist-500">
            快速验证模型表现。当前为演示模式，回复为预设文本。
          </p>
        </div>
        <button
          type="button"
          onClick={clear}
          disabled={busy || messages.length === 0}
          className="rounded-full border border-white/12 px-5 py-2.5 text-[12px] text-mist-400 transition-colors hover:border-white/25 hover:text-mist-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          清空对话
        </button>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[260px_1fr]">
        {/* 参数面板 */}
        <aside className="flex flex-col gap-4">
          <div className="rounded-card border border-white/[0.075] bg-[#0A1018] p-5">
            <label
              htmlFor="pg-model"
              className="block text-[11px] tracking-[0.06em] text-mist-500"
            >
              模型
            </label>
            <select
              id="pg-model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="mt-2.5 w-full appearance-none rounded-lg border border-white/12 bg-white/[0.04] px-3.5 py-2.5 text-[12px] text-mist-200 focus:border-cyan-glow/45 focus:outline-none"
            >
              {online.map((m) => (
                <option key={m.id} value={m.id} className="bg-[#0D1620]">
                  {m.name}
                </option>
              ))}
            </select>
            {currentModel && (
              <p className="mt-2.5 text-[10.5px] leading-[1.7] text-mist-600">
                上下文 {currentModel.context} · ¥
                {currentModel.priceInput.toFixed(2)} / 百万 tokens
              </p>
            )}
          </div>

          <div className="rounded-card border border-white/[0.075] bg-[#0A1018] p-5">
            <div className="flex items-baseline justify-between">
              <label
                htmlFor="pg-temp"
                className="text-[11px] tracking-[0.06em] text-mist-500"
              >
                Temperature
              </label>
              <span className="tnum text-[12px] text-mist-200">
                {temperature.toFixed(1)}
              </span>
            </div>
            <input
              id="pg-temp"
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="mt-3 w-full accent-cyan-glow"
            />
            <p className="mt-2 text-[10px] text-mist-600">
              值越低越确定，越高越有创造性
            </p>

            <div className="mt-5 flex items-baseline justify-between">
              <label
                htmlFor="pg-maxtok"
                className="text-[11px] tracking-[0.06em] text-mist-500"
              >
                Max tokens
              </label>
              <span className="tnum text-[12px] text-mist-200">{maxTokens}</span>
            </div>
            <input
              id="pg-maxtok"
              type="range"
              min="256"
              max="8192"
              step="256"
              value={maxTokens}
              onChange={(e) => setMaxTokens(Number(e.target.value))}
              className="mt-3 w-full accent-cyan-glow"
            />
          </div>

          <p className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-3.5 py-3 text-[10.5px] leading-[1.7] text-mist-600">
            演示数据，未接入真实模型。参数仅影响界面展示。
          </p>
        </aside>

        {/* 对话区 */}
        <div className="flex min-h-[520px] flex-col overflow-hidden rounded-card border border-white/[0.075] bg-[#0A1018]">
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-5"
            style={{ maxHeight: 560 }}
          >
            {messages.length === 0 ? (
              <div className="flex h-full min-h-[420px] flex-col items-center justify-center gap-3 text-center">
                <span
                  aria-hidden="true"
                  className="h-8 w-8 rounded-full [background:conic-gradient(from_200deg,var(--color-cyan-glow),var(--color-azure),var(--color-violet-soft),var(--color-cyan-glow))] opacity-70 blur-[0.5px]"
                />
                <p className="text-[13px] text-mist-300">开始一段对话</p>
                <p className="max-w-[300px] text-[11.5px] leading-[1.8] text-mist-600">
                  在下方输入内容，选择模型后发送。回复将以流式方式逐字呈现。
                </p>
              </div>
            ) : (
              <ul className="flex flex-col gap-5">
                {messages.map((m) => (
                  <li
                    key={m.id}
                    className={cn(
                      'flex gap-3',
                      m.role === 'user' && 'flex-row-reverse',
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        'mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg border text-[10px] font-medium',
                        m.role === 'user'
                          ? 'border-white/12 bg-white/[0.06] text-mist-300'
                          : 'border-cyan-glow/25 bg-cyan-glow/[0.1] text-cyan-glow',
                      )}
                    >
                      {m.role === 'user' ? '我' : 'AI'}
                    </span>
                    <div
                      className={cn(
                        'max-w-[85%] rounded-xl px-4 py-3 text-[12.5px] leading-[1.85] whitespace-pre-wrap',
                        m.role === 'user'
                          ? 'bg-white/[0.06] text-mist-100'
                          : 'border border-white/[0.07] bg-white/[0.025] text-mist-300',
                      )}
                    >
                      {m.content}
                      {m.streaming && (
                        <span
                          aria-hidden="true"
                          className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-[2px] bg-cyan-glow motion-safe:animate-pulse"
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t border-white/[0.07] p-4">
            <div className="flex items-end gap-2.5">
              <label htmlFor="pg-input" className="sr-only">
                输入消息
              </label>
              <textarea
                id="pg-input"
                rows={2}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    send()
                  }
                }}
                placeholder="输入消息，Enter 发送，Shift + Enter 换行"
                className="max-h-[140px] min-h-[52px] min-w-0 flex-1 resize-y rounded-xl border border-white/12 bg-white/[0.035] px-4 py-3 text-[12.5px] text-mist-100 placeholder:text-mist-600 focus:border-cyan-glow/45 focus:outline-none"
              />
              <button
                type="button"
                onClick={send}
                disabled={!input.trim() || busy}
                className={cn(
                  'shrink-0 rounded-xl px-5 py-3.5 text-[12px] font-medium transition-[background,opacity,transform] duration-200',
                  input.trim() && !busy
                    ? 'bg-brand-gradient text-[#04121A] hover:-translate-y-0.5'
                    : 'cursor-not-allowed bg-white/[0.06] text-mist-600',
                )}
              >
                {busy ? '生成中' : '发送'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ConsoleShell>
  )
}
