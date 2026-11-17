/** 极简 sparkline：无坐标轴、无标签，仅表现形状。末点用强调色标出当前期。 */
export function Sparkline({
  data,
  width = 96,
  height = 28,
  color = 'rgba(139,155,176,0.5)',
  accent = '#4ADEDE',
}: {
  data: number[]
  width?: number
  height?: number
  color?: string
  accent?: string
}) {
  if (data.length < 2) return null
  const min = Math.min(...data)
  const max = Math.max(...data)
  const span = max - min || 1

  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * (width - 2) + 1
    return { x, y: height - 2 - ((v - min) / span) * (height - 4) }
  })
  const last = pts[pts.length - 1]

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      className="overflow-visible"
    >
      <polyline
        points={pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={last.x} cy={last.y} r="2" fill={accent} />
    </svg>
  )
}
