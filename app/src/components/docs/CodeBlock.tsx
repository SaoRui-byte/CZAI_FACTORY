import { useState } from 'react'
import { cn } from '../../lib/cn'

/** 代码块：等宽字体 + 关键字着色 + 复制按钮。不引入高亮库。 */
export function CodeBlock({
  code,
  lang,
}: {
  code: string
  lang?: string
}) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="relative overflow-hidden rounded-lg border border-white/[0.08] bg-[#07090D]">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2">
        <span className="font-mono text-[10px] tracking-[0.1em] text-mist-600">
          {lang ?? 'text'}
        </span>
        <button
          type="button"
          onClick={copy}
          className="text-[10.5px] text-mist-500 transition-colors hover:text-cyan-glow"
        >
          {copied ? '已复制 ✓' : '复制'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[11.5px] leading-[1.85]">
        <code className={cn('font-mono text-mist-300')}>{code}</code>
      </pre>
    </div>
  )
}
