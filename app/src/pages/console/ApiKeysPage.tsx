import { useState } from 'react'
import { ConsoleShell } from '../../components/console/ConsoleShell'
import {
  createKey,
  deleteKey,
  displayKey,
  listKeys,
  revokeKey,
  type ApiKey,
} from '../../lib/auth'
import { cn } from '../../lib/cn'

function formatDate(iso: string): string {
  const d = new Date(iso)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>(() => listKeys())
  const [creating, setCreating] = useState(false)
  const [name, setName] = useState('')
  /** 新建后仅展示一次的完整 Key */
  const [secret, setSecret] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [confirmRevoke, setConfirmRevoke] = useState<string | null>(null)

  const handleCreate = () => {
    const { key, secret } = createKey(name)
    setKeys(listKeys())
    setSecret(secret)
    setName('')
    setCreating(false)
    setCopied(false)
    // 标记该 key 已展示过
    void key
  }

  const handleCopy = async () => {
    if (!secret) return
    try {
      await navigator.clipboard.writeText(secret)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const active = keys.filter((k) => !k.revoked)

  return (
    <ConsoleShell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[24px] leading-none font-bold tracking-[-0.02em] text-mist-100">
            API Key
          </h1>
          <p className="mt-2.5 text-[12px] text-mist-500">
            共 {keys.length} 个密钥，其中 {active.length} 个生效中。
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setCreating(true)
            setSecret(null)
          }}
          className="rounded-full bg-brand-gradient px-6 py-3 text-[12.5px] font-medium text-[#04121A] transition-transform duration-200 hover:-translate-y-0.5"
        >
          新建 API Key
        </button>
      </div>

      {/* 新建表单 */}
      {creating && (
        <div className="mt-6 rounded-card border border-cyan-glow/25 bg-cyan-glow/[0.04] p-5">
          <label
            htmlFor="key-name"
            className="block text-[11.5px] tracking-[0.06em] text-mist-500"
          >
            密钥名称（用于区分用途，如「生产环境」「测试机」）
          </label>
          <div className="mt-2.5 flex flex-col gap-2.5 sm:flex-row">
            <input
              id="key-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如：生产环境"
              maxLength={32}
              className="min-w-0 flex-1 rounded-lg border border-white/12 bg-white/[0.04] px-4 py-3 text-[12.5px] text-mist-100 placeholder:text-mist-600 focus:border-cyan-glow/45 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleCreate}
              className="rounded-lg bg-cyan-glow px-5 py-3 text-[12px] font-medium text-[#04121A]"
            >
              生成
            </button>
            <button
              type="button"
              onClick={() => setCreating(false)}
              className="rounded-lg border border-white/12 px-5 py-3 text-[12px] text-mist-400"
            >
              取消
            </button>
          </div>
        </div>
      )}

      {/* 一次性展示 */}
      {secret && (
        <div className="mt-6 rounded-card border border-[#C98500]/40 bg-[#C98500]/[0.07] p-5">
          <div className="flex items-start gap-2.5">
            <span aria-hidden="true" className="mt-0.5 text-[13px]">
              ⚠
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[12.5px] font-medium text-[#F0C674]">
                密钥已生成。请立即复制保存 —— 关闭后将无法再次查看完整内容。
              </p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                <code className="min-w-0 flex-1 overflow-x-auto rounded-lg border border-white/12 bg-ink-950/70 px-3.5 py-3 font-mono text-[11.5px] whitespace-nowrap text-mist-100">
                  {secret}
                </code>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="shrink-0 rounded-lg border border-white/15 px-4 py-3 text-[11.5px] text-mist-200 transition-colors hover:bg-white/[0.08]"
                >
                  {copied ? '已复制 ✓' : '复制'}
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSecret(null)}
              aria-label="关闭提示"
              className="shrink-0 rounded-md px-2 py-1 text-[14px] text-mist-500 hover:text-mist-200"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* 列表 */}
      <div className="mt-6 overflow-hidden rounded-card border border-white/[0.075]">
        {keys.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <p className="text-[13px] text-mist-300">还没有 API Key</p>
            <p className="max-w-[300px] text-[11.5px] leading-[1.8] text-mist-500">
              创建后即可在代码中调用平台模型，密钥只在创建时完整显示一次。
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left">
              <thead>
                <tr className="border-b border-white/[0.07] bg-white/[0.02] text-[10.5px] tracking-[0.06em] text-mist-600">
                  <th className="px-5 py-3 font-normal">名称</th>
                  <th className="px-5 py-3 font-normal">密钥</th>
                  <th className="px-5 py-3 font-normal">创建时间</th>
                  <th className="px-5 py-3 font-normal">最后使用</th>
                  <th className="px-5 py-3 text-right font-normal">操作</th>
                </tr>
              </thead>
              <tbody className="text-[12px]">
                {keys.map((k) => (
                  <tr
                    key={k.id}
                    className="border-b border-white/[0.045] last:border-0"
                  >
                    <td className="px-5 py-3.5">
                      <span className={cn('text-mist-200', k.revoked && 'line-through opacity-50')}>
                        {k.name}
                      </span>
                      {k.revoked && (
                        <span className="ml-2 rounded-full bg-[#E66767]/12 px-2 py-0.5 text-[9.5px] text-[#F0A0A0]">
                          已撤销
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-[11px] text-mist-400">
                      {displayKey(k)}
                    </td>
                    <td className="tnum px-5 py-3.5 text-mist-400">
                      {formatDate(k.createdAt)}
                    </td>
                    <td className="px-5 py-3.5 text-mist-500">
                      {k.lastUsedAt ? formatDate(k.lastUsedAt) : '从未使用'}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      {k.revoked ? (
                        <button
                          type="button"
                          onClick={() => {
                            deleteKey(k.id)
                            setKeys(listKeys())
                          }}
                          className="text-[11.5px] text-mist-500 hover:text-[#F0A0A0]"
                        >
                          删除
                        </button>
                      ) : confirmRevoke === k.id ? (
                        <span className="flex items-center justify-end gap-2">
                          <span className="text-[10.5px] text-mist-500">
                            确定撤销？
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              revokeKey(k.id)
                              setKeys(listKeys())
                              setConfirmRevoke(null)
                            }}
                            className="text-[11.5px] text-[#F0A0A0] hover:underline"
                          >
                            确定
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmRevoke(null)}
                            className="text-[11.5px] text-mist-500"
                          >
                            取消
                          </button>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmRevoke(k.id)}
                          className="text-[11.5px] text-mist-500 hover:text-mist-200"
                        >
                          撤销
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="mt-5 rounded-lg border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-[11px] leading-[1.75] text-mist-600">
        演示说明：密钥以明文保存在浏览器 localStorage 中，仅供界面演示。
        生产环境必须由服务端生成并存储哈希值，密钥仅在创建时展示一次。
      </p>
    </ConsoleShell>
  )
}
