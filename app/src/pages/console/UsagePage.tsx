import { useMemo, useState } from 'react'
import { ConsoleShell } from '../../components/console/ConsoleShell'
import { usageByRange } from '../../data/console'
import { cn } from '../../lib/cn'

type Range = '7d' | '30d' | '90d'

const RANGE_LABEL: Record<Range, string> = {
  '7d': '近 7 天',
  '30d': '近 30 天',
  '90d': '近 90 天',
}

function compact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

export default function UsagePage() {
  const [range, setRange] = useState<Range>('30d')
  const rows = usageByRange[range]

  const totals = useMemo(
    () =>
      rows.reduce(
        (acc, r) => ({
          calls: acc.calls + r.calls,
          tokensIn: acc.tokensIn + r.tokensIn,
          tokensOut: acc.tokensOut + r.tokensOut,
          cost: acc.cost + r.cost,
        }),
        { calls: 0, tokensIn: 0, tokensOut: 0, cost: 0 },
      ),
    [rows],
  )

  return (
    <ConsoleShell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[24px] leading-none font-bold tracking-[-0.02em] text-mist-100">
            用量明细
          </h1>
          <p className="mt-2.5 text-[12px] text-mist-500">
            按模型分组的调用与消耗统计，费用单位：元。
          </p>
        </div>

        <div
          role="group"
          aria-label="选择时间范围"
          className="flex gap-1.5 rounded-full border border-white/10 bg-white/[0.03] p-1"
        >
          {(Object.keys(RANGE_LABEL) as Range[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              aria-pressed={range === r}
              className={cn(
                'rounded-full px-4 py-2 text-[11.5px] transition-colors duration-200',
                range === r
                  ? 'bg-white/[0.1] text-mist-100'
                  : 'text-mist-500 hover:text-mist-200',
              )}
            >
              {RANGE_LABEL[r]}
            </button>
          ))}
        </div>
      </div>

      {/* 汇总 */}
      <div className="mt-6 grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        {[
          { label: '调用次数', value: totals.calls.toLocaleString('zh-CN') },
          { label: '输入 tokens', value: compact(totals.tokensIn) },
          { label: '输出 tokens', value: compact(totals.tokensOut) },
          { label: '费用合计', value: `¥${totals.cost.toFixed(2)}` },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-tile border border-white/[0.075] bg-white/[0.028] px-5 py-4"
          >
            <div className="text-[10.5px] tracking-[0.06em] text-mist-500">
              {s.label}
            </div>
            <div className="tnum mt-2 text-[20px] leading-none font-medium text-mist-100">
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* 明细表 */}
      <div className="mt-4 overflow-hidden rounded-card border border-white/[0.075] bg-[#0A1018]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-white/[0.07] bg-white/[0.02] text-[10.5px] tracking-[0.06em] text-mist-600">
                <th className="px-5 py-3 font-normal">模型</th>
                <th className="px-5 py-3 text-right font-normal">调用次数</th>
                <th className="px-5 py-3 text-right font-normal">输入 tokens</th>
                <th className="px-5 py-3 text-right font-normal">输出 tokens</th>
                <th className="px-5 py-3 text-right font-normal">费用</th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-14 text-center">
                    <p className="text-[12.5px] text-mist-400">
                      该时间段暂无调用
                    </p>
                    <p className="mt-1.5 text-[11px] text-mist-600">
                      换个时间范围，或先在对话测试台发起一次调用。
                    </p>
                  </td>
                </tr>
              )}
              {rows.map((r) => (
                <tr
                  key={r.model}
                  className="border-b border-white/[0.045] transition-colors hover:bg-white/[0.02]"
                >
                  <td className="px-5 py-3.5 text-mist-200">{r.model}</td>
                  <td className="tnum px-5 py-3.5 text-right text-mist-300">
                    {r.calls.toLocaleString('zh-CN')}
                  </td>
                  <td className="tnum px-5 py-3.5 text-right text-mist-400">
                    {r.tokensIn.toLocaleString('zh-CN')}
                  </td>
                  <td className="tnum px-5 py-3.5 text-right text-mist-400">
                    {r.tokensOut.toLocaleString('zh-CN')}
                  </td>
                  <td className="tnum px-5 py-3.5 text-right text-mist-200">
                    ¥{r.cost.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-white/[0.1] bg-white/[0.03] text-[12px]">
                <td className="px-5 py-3.5 font-medium text-mist-100">合计</td>
                <td className="tnum px-5 py-3.5 text-right font-medium text-mist-100">
                  {totals.calls.toLocaleString('zh-CN')}
                </td>
                <td className="tnum px-5 py-3.5 text-right text-mist-300">
                  {totals.tokensIn.toLocaleString('zh-CN')}
                </td>
                <td className="tnum px-5 py-3.5 text-right text-mist-300">
                  {totals.tokensOut.toLocaleString('zh-CN')}
                </td>
                <td className="tnum px-5 py-3.5 text-right font-medium text-mist-100">
                  ¥{totals.cost.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <p className="mt-5 text-[11px] leading-[1.75] text-mist-600">
        数据为演示值。真实环境下每次调用的输入输出 token 均逐条留痕，可导出 CSV。
      </p>
    </ConsoleShell>
  )
}
