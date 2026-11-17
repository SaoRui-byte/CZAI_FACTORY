import { PageShell } from '../components/layout/PageShell'
import { PageHero } from '../components/ui/PageHero'
import { ButtonRouterLink } from '../components/ui/Button'
import { solutionList, solutions } from '../data/solutions'

export default function SolutionsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow={solutions.eyebrow}
        title={solutions.title}
        lead={solutions.lead}
      />

      <section className="container-page mt-14">
        <div className="grid gap-3.5 md:grid-cols-2">
          {solutionList.map((s, i) => (
            <article
              key={s.id}
              className="group relative overflow-hidden rounded-card border border-white/[0.075] bg-white/[0.025] p-7 transition-[border-color,background-color] duration-300 hover:border-cyan-glow/30 hover:bg-white/[0.04]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -right-10 h-[200px] w-[260px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(closest-side,rgba(74,222,222,0.1),transparent)]"
              />
              <div className="relative z-10 flex items-baseline gap-3">
                <span className="tnum text-[10px] tracking-[0.2em] text-cyan-glow/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[10px] tracking-[0.18em] text-mist-600">
                  {s.subtitle}
                </span>
              </div>
              <h2 className="relative z-10 mt-4 text-[20px] font-medium text-mist-100">
                {s.title}
              </h2>
              <p className="relative z-10 mt-3.5 text-[12.5px] leading-[1.9] text-mist-500">
                {s.description}
              </p>
              <ul className="relative z-10 mt-6 flex flex-col gap-2.5 border-t border-white/[0.06] pt-5">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-2.5 text-[12px] text-mist-400"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 shrink-0 rounded-full bg-cyan-glow/60"
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page mt-14">
        <div className="glass-strong edge-light relative overflow-hidden rounded-card px-8 py-12 md:px-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 right-0 h-[280px] w-[400px] [background:radial-gradient(closest-side,rgba(91,124,250,0.14),transparent)]"
          />
          <div className="relative z-10 flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-[22px] font-bold tracking-[-0.02em] text-mist-100">
                没有找到匹配的场景？
              </h2>
              <p className="mt-3 max-w-[460px] text-[12.5px] leading-[1.9] text-mist-500">
                协会可协助企业梳理业务需求，提供模型选型、私有化部署与算力配额的综合方案。
              </p>
            </div>
            <ButtonRouterLink to="/contact">联系协会</ButtonRouterLink>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
