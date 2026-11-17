import { PageShell } from '../components/layout/PageShell'
import { PageHero } from '../components/ui/PageHero'
import { ButtonRouterLink } from '../components/ui/Button'
import { brand, stats } from '../data/site'

const duties = [
  {
    title: '统筹区域算力',
    text: '整合本地智算中心与第三方算力资源，建立统一的调度与计量标准，降低企业获取算力的门槛。',
  },
  {
    title: '推动模型落地',
    text: '联合高校与企业共建行业模型，为制造、政务、医疗、教育等场景提供可复用的模型能力。',
  },
  {
    title: '制定应用规范',
    text: '牵头制定区域人工智能应用与数据安全规范，确保模型应用可审计、可追溯。',
  },
  {
    title: '培育产业生态',
    text: '组织技术交流、人才培训与产学研对接，支持本地人工智能企业成长。',
  },
]

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="ABOUT"
        title={brand.fullName}
        lead="协会是常州地区人工智能领域的行业组织，由本地高校、科研机构、算力服务商与制造业企业共同组成，致力于推动人工智能技术在区域产业中的落地。"
      />

      <section className="container-page mt-14">
        <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-tile border border-white/[0.075] bg-white/[0.028] px-6 py-[26px]"
            >
              <div className="tnum flex items-baseline gap-1.5 text-[24px] leading-none font-medium text-mist-100">
                {s.value}
                <span className="text-[11px] font-normal text-cyan-glow">
                  {s.unit}
                </span>
              </div>
              <div className="mt-3 text-[11px] tracking-[0.1em] text-mist-500">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page mt-16">
        <h2 className="text-[20px] font-semibold tracking-[-0.01em] text-mist-100">
          协会职责
        </h2>
        <div className="mt-6 grid gap-px overflow-hidden rounded-card border border-white/[0.075] bg-white/[0.075] md:grid-cols-2">
          {duties.map((d, i) => (
            <div key={d.title} className="bg-[#0A1119] p-7">
              <span className="tnum text-[10px] tracking-[0.2em] text-cyan-glow/70">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3.5 text-[15px] font-medium text-mist-100">
                {d.title}
              </h3>
              <p className="mt-3 text-[12.5px] leading-[1.9] text-mist-500">
                {d.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page mt-16">
        <div className="glass-strong edge-light relative overflow-hidden rounded-card px-8 py-12 md:px-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 right-0 h-[280px] w-[400px] [background:radial-gradient(closest-side,rgba(91,124,250,0.14),transparent)]"
          />
          <div className="relative z-10 flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-[22px] font-bold tracking-[-0.02em] text-mist-100">
                加入协会
              </h2>
              <p className="mt-3 max-w-[460px] text-[12.5px] leading-[1.9] text-mist-500">
                面向人工智能相关企业、高校与科研机构开放。会员可优先获得算力配额、
                技术对接与政策申报支持。
              </p>
            </div>
            <ButtonRouterLink to="/contact">申请入会</ButtonRouterLink>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
