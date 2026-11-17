import { ConsoleShell } from '../../components/console/ConsoleShell'
import { TrendChart } from '../../components/charts/TrendChart'
import { ModelShareBars } from '../../components/charts/ModelShareBars'
import { Sparkline } from '../../components/charts/Sparkline'
import {
  kpis,
  modelShare,
  recentCalls,
  tokenTrend,
} from '../../data/console'
import { useAuth } from '../../lib/useAuth'
import { cn } from '../../lib/cn'

function Panel({
  title,
  hint,
  children,
  className,
}: {
  title: string
  hint?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        'rounded-card border border-white/[0.075] bg-[#0A1018] p-6',
        className,
      )}
    >
      <div className="flex items-baseline gap-3">
        <h2 className="text-[14px] font-medium text-mist-100">{title}</h2>
        {hint && (
          <span className="text-[10.5px] tracking-[0.1em] text-mist-600">
            {hint}
          </span>
        )}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  )
}

export default function ConsoleHome() {
  const { session } = useAuth()

  return (
    <ConsoleShell>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <h1 className="text-[24px] leading-none font-bold tracking-[-0.02em] text-mist-100">
          总览
        </h1>
        <p className="text-[12px] text-mist-500">
          欢迎回来，{session?.name}。数据统计截至今日 14:35。
        </p>
      </div>

      {/* KPI 行 */}
      <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => {
          const positive = kpi.delta >= 0
          const good = positive === kpi.upIsGood
          return (
            <div
              key={kpi.label}
              className="rounded-tile border border-white/[0.075] bg-white/[0.028] p-5"
            >
              <div className="text-[11px] tracking-[0.06em] text-mist-500">
                {kpi.label}
              </div>
              <div className="mt-2.5 flex items-baseline gap-1.5">
                <span className="tnum text-[24px] leading-none font-medium text-mist-100">
                  {kpi.value}
                </span>
                {kpi.unit && (
                  <span className="text-[11px] text-mist-500">{kpi.unit}</span>
                )}
              </div>
              <div className="mt-3.5 flex items-end justify-between gap-3">
                <span className="tnum flex items-baseline gap-1.5 whitespace-nowrap text-[10.5px]">
                  <span className={good ? 'text-[#0CA30C]' : 'text-[#E66767]'}>
                    {positive ? '↑' : '↓'} {Math.abs(kpi.delta).toFixed(1)}%
                  </span>
                  <span className="font-sans text-mist-600">环比</span>
                </span>
                <Sparkline data={kpi.spark} />
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 grid grid-cols-1 items-start gap-4 xl:grid-cols-[1.55fr_1fr]">
        <Panel title="Token 调用量趋势" hint="近 30 天 · 万 tokens">
          <TrendChart data={tokenTrend} />
        </Panel>

        <Panel title="模型调用占比" hint="按调用次数 · 近 30 天">
          <ModelShareBars rows={modelShare} />
        </Panel>
      </div>

      <div className="mt-4">
        <Panel title="最近调用记录" hint="最近 5 条">
          <div className="-mx-6 overflow-x-auto px-6">
            <table className="w-full min-w-[620px] text-left">
              <thead>
                <tr className="border-b border-white/[0.07] text-[10.5px] tracking-[0.06em] text-mist-600">
                  <th className="pb-2.5 font-normal">请求 ID</th>
                  <th className="pb-2.5 font-normal">时间</th>
                  <th className="pb-2.5 font-normal">模型</th>
                  <th className="pb-2.5 text-right font-normal">输入</th>
                  <th className="pb-2.5 text-right font-normal">输出</th>
                  <th className="pb-2.5 text-right font-normal">耗时</th>
                  <th className="pb-2.5 text-right font-normal">状态</th>
                </tr>
              </thead>
              <tbody className="tnum text-[12px] text-mist-300">
                {recentCalls.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-white/[0.045] last:border-0"
                  >
                    <td className="py-3 font-mono text-[11px] text-mist-400">
                      {c.id}
                    </td>
                    <td className="py-3 text-mist-400">{c.time}</td>
                    <td className="py-3 font-sans text-mist-200">{c.model}</td>
                    <td className="py-3 text-right">
                      {c.tokensIn.toLocaleString('zh-CN')}
                    </td>
                    <td className="py-3 text-right">
                      {c.tokensOut.toLocaleString('zh-CN')}
                    </td>
                    <td className="py-3 text-right">{c.latencyMs} ms</td>
                    <td className="py-3 text-right">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px]',
                          c.status === 'ok'
                            ? 'bg-[#0CA30C]/12 text-[#5FD35F]'
                            : 'bg-[#E66767]/12 text-[#F0A0A0]',
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={cn(
                            'h-1 w-1 rounded-full',
                            c.status === 'ok' ? 'bg-[#5FD35F]' : 'bg-[#F0A0A0]',
                          )}
                        />
                        {c.status === 'ok' ? '成功' : '失败'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </ConsoleShell>
  )
}
