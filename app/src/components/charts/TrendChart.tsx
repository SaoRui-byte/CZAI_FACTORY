import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { SERIES, GRID_COLOR, AXIS_TEXT, SURFACE_COLOR } from './palette'

interface Point {
  day: string
  value: number
}

/**
 * 单序列趋势折线图。
 * 规范落实：2px 线 · 10% 面积 · 1px 实线网格 · 仅端点直接标注 ·
 * 端点 8px 带 2px 表面色描边 · hover 十字准线 + tooltip · 独立表格视图。
 * 单序列不需要图例（标题即说明）。
 *
 * 用 ResizeObserver 实测容器宽度，SVG 以 1:1 像素绘制，
 * 避免 viewBox 等比缩放导致图偏小或文字被拉伸。
 */
export function TrendChart({
  data,
  unit = '万 tokens',
  height = 260,
}: {
  data: Point[]
  unit?: string
  height?: number
}) {
  const uid = useId().replace(/:/g, '')
  const wrapRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(720)
  const [hover, setHover] = useState<number | null>(null)
  const [showTable, setShowTable] = useState(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setWidth(Math.max(280, Math.floor(entry.contentRect.width)))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const W = width
  const H = height
  const pad = { top: 20, right: 52, bottom: 28, left: 40 }
  const innerW = W - pad.left - pad.right
  const innerH = H - pad.top - pad.bottom

  const { maxY, ticks, path, areaPath, points } = useMemo(() => {
    const values = data.map((d) => d.value)
    const rawMax = Math.max(...values)
    const maxY = Math.ceil(rawMax / 20) * 20
    const tickCount = 4
    const ticks = Array.from({ length: tickCount + 1 }, (_, i) =>
      Math.round((maxY / tickCount) * i),
    )

    const xAt = (i: number) =>
      pad.left +
      (data.length === 1 ? innerW / 2 : (i / (data.length - 1)) * innerW)
    const yAt = (v: number) => pad.top + innerH - (v / maxY) * innerH

    const pts = data.map((d, i) => ({ ...d, x: xAt(i), y: yAt(d.value) }))
    const path = pts
      .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
      .join(' ')

    const baseline = pad.top + innerH
    const areaPath = `${path} L${pts[pts.length - 1].x.toFixed(1)},${baseline} L${pts[0].x.toFixed(1)},${baseline} Z`

    return { maxY, ticks, path, areaPath, points: pts }
  }, [data, innerW, innerH, pad.left, pad.top])

  const handleMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    let nearest = 0
    let best = Infinity
    points.forEach((p, i) => {
      const d = Math.abs(p.x - x)
      if (d < best) {
        best = d
        nearest = i
      }
    })
    setHover(nearest)
  }

  const active = hover !== null ? points[hover] : null
  const last = points[points.length - 1]

  return (
    <div ref={wrapRef} className="relative w-full">
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto max-w-full"
        style={{ width: '100%' }}
        role="img"
        aria-label={`Token 调用量趋势，${data.length} 天，最高 ${maxY} ${unit}`}
        onMouseMove={handleMove}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id={`fill-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={SERIES[0]} stopOpacity="0.16" />
            <stop offset="100%" stopColor={SERIES[0]} stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {ticks.map((t) => {
          const y = pad.top + innerH - (t / maxY) * innerH
          return (
            <g key={t}>
              <line
                x1={pad.left}
                x2={W - pad.right}
                y1={y}
                y2={y}
                stroke={GRID_COLOR}
                strokeWidth="1"
              />
              <text
                x={pad.left - 10}
                y={y + 4}
                textAnchor="end"
                fontSize="10"
                fill={AXIS_TEXT}
                fontFamily="'Space Grotesk', monospace"
              >
                {t}
              </text>
            </g>
          )
        })}

        <path d={areaPath} fill={`url(#fill-${uid})`} />

        <path
          d={path}
          fill="none"
          stroke={SERIES[0]}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        <circle
          cx={last.x}
          cy={last.y}
          r="4"
          fill={SERIES[0]}
          stroke={SURFACE_COLOR}
          strokeWidth="2"
        />

        <text
          x={last.x + 9}
          y={last.y + 4}
          fontSize="11"
          fill="#E8EEF5"
          fontFamily="'Space Grotesk', monospace"
        >
          {last.value}
        </text>

        {active && (
          <>
            <line
              x1={active.x}
              x2={active.x}
              y1={pad.top}
              y2={pad.top + innerH}
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1"
            />
            <circle
              cx={active.x}
              cy={active.y}
              r="4.5"
              fill={SERIES[0]}
              stroke={SURFACE_COLOR}
              strokeWidth="2"
            />
          </>
        )}

        {[0, Math.floor(points.length / 2), points.length - 1].map((i) => (
          <text
            key={i}
            x={points[i].x}
            y={H - 8}
            textAnchor={
              i === 0 ? 'start' : i === points.length - 1 ? 'end' : 'middle'
            }
            fontSize="10"
            fill={AXIS_TEXT}
          >
            {points[i].day}
          </text>
        ))}
      </svg>

      {active && (
        <div
          className="pointer-events-none absolute z-10 rounded-lg border border-white/12 bg-[#0D1620]/95 px-3 py-2 shadow-[0_8px_28px_-8px_rgba(0,0,0,0.8)] backdrop-blur-sm"
          style={{
            left: active.x,
            top: active.y,
            transform: 'translate(-50%, -125%)',
          }}
        >
          <div className="text-[10px] tracking-[0.08em] text-mist-500">
            {active.day}
          </div>
          <div className="tnum mt-1 flex items-baseline gap-1.5 text-[13px] text-mist-100">
            {active.value}
            <span className="text-[9.5px] text-mist-500">{unit}</span>
          </div>
        </div>
      )}

      <div className="mt-2">
        <button
          type="button"
          onClick={() => setShowTable((v) => !v)}
          aria-expanded={showTable}
          className="text-[11px] text-mist-500 transition-colors hover:text-cyan-glow"
        >
          {showTable ? '收起数据表' : '查看数据表'}
        </button>
        {showTable && (
          <div className="mt-3 max-h-[220px] overflow-y-auto rounded-lg border border-white/[0.08]">
            <table className="w-full text-left text-[11.5px]">
              <thead className="sticky top-0 bg-[#0D1620] text-mist-500">
                <tr>
                  <th className="px-3 py-2 font-normal">日期</th>
                  <th className="px-3 py-2 text-right font-normal">{unit}</th>
                </tr>
              </thead>
              <tbody className="tnum text-mist-300">
                {data.map((d) => (
                  <tr key={d.day} className="border-t border-white/[0.05]">
                    <td className="px-3 py-1.5">{d.day}</td>
                    <td className="px-3 py-1.5 text-right">{d.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
