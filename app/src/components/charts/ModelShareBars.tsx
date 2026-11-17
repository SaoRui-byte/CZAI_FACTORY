import { SERIES } from './palette'

interface Row {
  name: string
  calls: number
}

/**
 * 模型调用占比 —— 排序横向条形图。
 * 规范要求：比较接近值不能用饼图/环形图；单序列用单色（slot 1），
 * 不按大小做色阶（那会把长度重复编码成色相）。
 * 每条直接标数值与占比，文字用文本色。
 */
export function ModelShareBars({ rows }: { rows: Row[] }) {
  const sorted = [...rows].sort((a, b) => b.calls - a.calls)
  const total = sorted.reduce((s, r) => s + r.calls, 0)
  const max = sorted[0]?.calls ?? 1

  return (
    <div className="flex flex-col gap-4">
      {sorted.map((row) => {
        const pct = (row.calls / total) * 100
        const widthPct = (row.calls / max) * 100
        return (
          <div key={row.name}>
            <div className="mb-1.5 flex items-baseline gap-3">
              <span className="min-w-0 flex-1 truncate text-[12px] text-mist-300">
                {row.name}
              </span>
              <span className="tnum text-[11.5px] text-mist-100">
                {row.calls.toLocaleString('zh-CN')}
              </span>
              <span className="tnum w-[44px] shrink-0 text-right text-[10.5px] text-mist-500">
                {pct.toFixed(1)}%
              </span>
            </div>
            <div
              className="h-2 w-full overflow-hidden rounded-full bg-white/[0.05]"
              role="img"
              aria-label={`${row.name}：${row.calls.toLocaleString('zh-CN')} 次，占 ${pct.toFixed(1)}%`}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${widthPct}%`,
                  backgroundColor: SERIES[0],
                  // 数据端圆角、基线端直角 —— 用右侧圆角实现
                  borderTopRightRadius: 999,
                  borderBottomRightRadius: 999,
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
