import { Link } from 'react-router-dom'
import { capabilityLabels, type ModelEntry } from '../../data/models'
import { cn } from '../../lib/cn'

export function ModelIcon({
  initials,
  size = 'md',
}: {
  initials: string
  size?: 'md' | 'lg'
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid shrink-0 place-items-center rounded-icon border border-white/12 font-sans font-semibold text-[#CFE9F5] [background:linear-gradient(135deg,rgba(74,222,222,0.22),rgba(91,124,250,0.22))]',
        size === 'md' ? 'h-8 w-8 text-[12px]' : 'h-10 w-10 text-[13px]',
      )}
    >
      {initials}
    </span>
  )
}

export function ModelCard({ model }: { model: ModelEntry }) {
  const coming = model.status === 'coming'
  const shared = cn(
    'group relative block overflow-hidden rounded-card border border-white/[0.075] bg-white/[0.033] p-6 pb-5 transition-[transform,border-color,background-color] duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
    'hover:border-cyan-glow/35 hover:bg-white/[0.05] motion-safe:hover:-translate-y-[3px]',
    coming && 'cursor-default opacity-70',
  )
  const inner = <ModelCardBody model={model} coming={coming} />

  // 即将上线的模型不可点击；已上线的直接进对话测试台并带上该模型
  if (coming) {
    return (
      <div className={shared} aria-label={`${model.name}（即将上线）`}>
        {inner}
      </div>
    )
  }

  return (
    <Link
      to={`/console/playground?model=${encodeURIComponent(model.id)}`}
      className={shared}
      aria-label={`使用 ${model.name} 进行对话测试`}
    >
      {inner}
    </Link>
  )
}

function ModelCardBody({
  model,
  coming,
}: {
  model: ModelEntry
  coming: boolean
}) {
  return (
    <>
      {/* hover 光晕 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-card opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(400px_160px_at_20%_0%,rgba(74,222,222,0.13),transparent_70%)]"
      />

      <div className="relative z-10 flex items-center gap-3">
        <ModelIcon initials={model.initials} />
        <h3 className="font-sans text-[15px] leading-tight font-medium text-mist-100">
          {model.name}
        </h3>
        <span className="tnum ml-auto rounded-full border border-white/10 px-2.5 py-1.5 text-[10px] leading-none text-mist-500">
          {model.context}
        </span>
      </div>

      <p className="relative z-10 mt-3.5 line-clamp-2 text-[12.5px] leading-[1.7] text-mist-500">
        {model.description}
      </p>

      <div className="relative z-10 mt-4 flex flex-wrap gap-1.5">
        {model.capabilities.map((c) => (
          <span
            key={c}
            className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[10px] leading-none text-mist-400"
          >
            {capabilityLabels[c]}
          </span>
        ))}
        {coming && (
          <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] leading-none text-mist-600">
            即将上线
          </span>
        )}
      </div>

      <div className="relative z-10 mt-[18px] flex items-baseline gap-1.5 border-t border-white/[0.07] pt-4">
        <span className="tnum text-[17px] leading-none font-medium text-[#E8F4FA]">
          ¥{model.priceInput.toFixed(2)}
        </span>
        <span className="text-[10px] leading-none text-mist-600">
          / 百万 tokens
        </span>
        {!coming && (
          <span
            aria-hidden="true"
            className="ml-auto text-[12px] text-cyan-glow opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          >
            调用 →
          </span>
        )}
      </div>
    </>
  )
}
