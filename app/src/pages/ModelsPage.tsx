import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { PageShell } from '../components/layout/PageShell'
import { ModelCard } from '../components/models/ModelCard'
import { ModelFilters } from '../components/models/ModelFilters'
import { models } from '../data/models'
import { ALL_CAPABILITY, type CapabilityFilter } from '../data/filters'
import { StatusPip } from '../components/ui/Badge'
import { ButtonRouterLink } from '../components/ui/Button'

export default function ModelsPage() {
  const [active, setActive] = useState<CapabilityFilter>(ALL_CAPABILITY)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return models.filter((m) => {
      const matchCap =
        active === ALL_CAPABILITY || m.capabilities.includes(active)
      const matchQuery =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.vendor.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
      return matchCap && matchQuery
    })
  }, [active, query])

  return (
    <PageShell>
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [background:radial-gradient(760px_340px_at_50%_-40%,rgba(74,222,222,0.1),transparent_70%)]"
        />
        <div className="container-page relative pt-16 pb-12 md:pt-20">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2.5 text-[11px] tracking-[0.14em] text-mist-300">
              <StatusPip />
              实时在线 · {models.filter((m) => m.status === 'online').length}{' '}
              个模型
            </span>
          </div>

          <h1 className="mt-7 text-[clamp(32px,5vw,52px)] leading-[1.12] font-bold tracking-[-0.03em]">
            模型广场
          </h1>
          <p className="mt-5 max-w-[560px] text-[14px] leading-[1.9] text-mist-400">
            统一入口调用主流大模型。同一套 OpenAI 兼容接口，按量计费，
            输入输出 token 逐条留痕。
          </p>
        </div>
      </section>

      <section className="container-page pt-10">
        <ModelFilters
          active={active}
          onChange={setActive}
          query={query}
          onQueryChange={setQuery}
          total={models.length}
          shown={filtered.length}
        />

        {filtered.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-3.5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((model, i) => (
              <motion.div
                key={model.id}
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(i * 0.04, 0.24),
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ModelCard model={model} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center gap-5 rounded-card border border-white/[0.075] bg-white/[0.025] px-8 py-20 text-center">
            <span className="tnum text-[15px] text-mist-300">
              没有匹配的模型
            </span>
            <p className="max-w-[320px] text-[12.5px] leading-[1.85] text-mist-500">
              试试换个关键词，或切换到「全部」查看完整清单。
            </p>
            <button
              type="button"
              onClick={() => {
                setActive(ALL_CAPABILITY)
                setQuery('')
              }}
              className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-[12px] text-mist-200 transition-colors duration-200 hover:bg-white/[0.09]"
            >
              重置筛选
            </button>
          </div>
        )}

        <div className="mt-16 flex flex-col items-start gap-6 rounded-card border border-white/[0.075] bg-white/[0.028] px-8 py-9 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-[16px] font-medium text-mist-100">
              没有找到需要的模型？
            </h2>
            <p className="mt-2.5 text-[12.5px] leading-[1.8] text-mist-500">
              协会可协助企业用户接入私有模型或申请专属算力配额。
            </p>
          </div>
          <ButtonRouterLink to="/contact" variant="ghost" size="sm">
            联系商务
          </ButtonRouterLink>
        </div>
      </section>
    </PageShell>
  )
}
