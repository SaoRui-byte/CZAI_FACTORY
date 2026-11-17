import { PageShell } from '../components/layout/PageShell'
import { PageHero } from '../components/ui/PageHero'
import { news } from '../data/news'

export default function NewsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="NEWS"
        title="新闻动态"
        lead="平台进展、生态合作与协会活动。"
      />

      <section className="container-page mt-14">
        <div className="flex flex-col gap-px overflow-hidden rounded-card border border-white/[0.075] bg-white/[0.075]">
          {news.map((item) => (
            <article
              key={item.id}
              className="group bg-[#0A1119] px-7 py-6 transition-colors duration-250 hover:bg-[#0E1722]"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="tnum text-[11px] text-mist-600">
                  {item.date}
                </span>
                <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[9.5px] tracking-[0.08em] text-mist-500">
                  {item.category}
                </span>
              </div>
              <h2 className="mt-3 text-[15.5px] font-medium text-mist-100">
                {item.title}
              </h2>
              <p className="mt-2.5 max-w-[720px] text-[12.5px] leading-[1.9] text-mist-500">
                {item.summary}
              </p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
