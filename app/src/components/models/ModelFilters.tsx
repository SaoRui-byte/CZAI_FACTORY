import { filterOptions, type CapabilityFilter } from '../../data/filters'
import { cn } from '../../lib/cn'

export function ModelFilters({
  active,
  onChange,
  query,
  onQueryChange,
  total,
  shown,
}: {
  active: CapabilityFilter
  onChange: (v: CapabilityFilter) => void
  query: string
  onQueryChange: (v: string) => void
  total: number
  shown: number
}) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-6">
      <div
        role="group"
        aria-label="按能力筛选模型"
        className="flex flex-wrap gap-2"
      >
        {filterOptions.map((opt) => {
          const isActive = active === opt.id
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              aria-pressed={isActive}
              className={cn(
                'rounded-full border px-4 py-2.5 text-[12px] transition-colors duration-200',
                isActive
                  ? 'border-cyan-glow/40 bg-cyan-glow/10 text-cyan-glow'
                  : 'border-white/10 bg-white/[0.03] text-mist-400 hover:border-white/20 hover:text-mist-200',
              )}
            >
              {opt.label}
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-4 lg:ml-auto">
        <label htmlFor="model-search" className="sr-only">
          搜索模型
        </label>
        <div className="relative">
          <input
            id="model-search"
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="搜索模型或供应商"
            className="w-full rounded-full border border-white/10 bg-white/[0.035] py-3 pr-4 pl-10 text-[12.5px] text-mist-200 placeholder:text-mist-600 focus:border-cyan-glow/40 focus:outline-none lg:w-[248px]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[13px] text-mist-600"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <circle
                cx="7"
                cy="7"
                r="5"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M10.8 10.8L14 14"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
        <span className="tnum shrink-0 text-[11px] text-mist-600">
          {shown} / {total}
        </span>
      </div>
    </div>
  )
}
