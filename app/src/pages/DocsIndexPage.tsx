import { Link } from 'react-router-dom'
import { docs } from '../data/docs'

export default function DocsIndexPage() {
  return (
    <div>
      <h2 className="text-[24px] leading-tight font-bold tracking-[-0.02em] text-mist-100">
        平台文档
      </h2>
      <p className="mt-3 max-w-[560px] text-[13px] leading-[1.9] text-mist-400">
        从第一次调用到生产集成。平台提供 OpenAI 兼容接口，已有接入经验的团队可直接迁移。
      </p>

      <div className="mt-8 flex flex-col gap-3">
        {docs.map((d) => (
          <Link
            key={d.slug}
            to={`/docs/${d.slug}`}
            className="group flex items-center gap-4 rounded-card border border-white/[0.075] bg-white/[0.025] px-6 py-5 transition-[border-color,background-color] duration-200 hover:border-cyan-glow/30 hover:bg-white/[0.04]"
          >
            <div className="min-w-0">
              <div className="text-[14px] font-medium text-mist-100">
                {d.title}
              </div>
              <div className="mt-1 text-[11.5px] text-mist-500">
                {d.summary}
              </div>
            </div>
            <span
              aria-hidden="true"
              className="ml-auto text-[13px] text-mist-600 transition-colors group-hover:text-cyan-glow"
            >
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
