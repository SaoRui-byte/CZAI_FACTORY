import { PageShell } from '../components/layout/PageShell'
import { PageHero } from '../components/ui/PageHero'
import { components, events, statusLabel } from '../data/status'
import { cn } from '../lib/cn'

const allOperational = components.every((c) => c.days[c.days.length - 1])

/** 按「组件-天」统计异常格子数量 */
const incidentDays = components.reduce(
  (n, c) => n + c.days.filter((ok) => !ok).length,
  0,
)

export default function StatusPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="STATUS"
        title="服务状态"
        lead="平台各组件的实时可用性与历史事件记录。"
      >
        <div
          className={cn(
            'mt-8 inline-flex items-center gap-3 rounded-full border px-5 py-3',
            allOperational
              ? 'border-[#0CA30C]/30 bg-[#0CA30C]/[0.08]'
              : 'border-[#C98500]/30 bg-[#C98500]/[0.08]',
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              'h-2 w-2 rounded-full',
              allOperational ? 'bg-[#0CA30C]' : 'bg-[#C98500]',
            )}
          />
          <span className="text-[12.5px] text-mist-200">
            {allOperational ? '当前所有系统运行正常' : '部分系统存在异常'}
          </span>
          <span className="text-[11px] text-mist-500">
            {allOperational
              ? `近 30 天共 ${incidentDays} 个组件日出现异常`
              : '更新于 14:35'}
          </span>
        </div>
      </PageHero>

      <section className="container-page mt-14">
        <h2 className="text-[18px] font-semibold text-mist-100">组件状态</h2>

        <div className="mt-6 divide-y divide-white/[0.06] rounded-card border border-white/[0.075] bg-[#0A1018]">
          {components.map((c) => (
            <div key={c.name} className="p-6">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-[13.5px] font-medium text-mist-100">
                  {c.name}
                </span>
                <span className="text-[11px] text-mist-600">
                  {c.description}
                </span>
                <span className="tnum ml-auto text-[11.5px] text-mist-400">
                  {c.uptime.toFixed(2)}%
                  <span className="ml-1.5 text-[10px] text-mist-600">
                    30 天可用性
                  </span>
                </span>
              </div>

              {/* 30 天方块条 */}
              <div
                className="mt-4 flex gap-[3px]"
                role="img"
                aria-label={`${c.name} 近 30 天可用性 ${c.uptime}%`}
              >
                {c.days.map((ok, i) => (
                  <span
                    key={i}
                    className={cn(
                      'h-7 flex-1 rounded-[2px]',
                      ok ? 'bg-[#0CA30C]/55' : 'bg-[#E66767]/70',
                    )}
                    title={`第 ${i + 1} 天：${ok ? '正常' : '异常'}`}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-mist-600">
                <span>30 天前</span>
                <span>今天</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page mt-14">
        <h2 className="text-[18px] font-semibold text-mist-100">历史事件</h2>
        <div className="mt-6 flex flex-col gap-3">
          {events.map((e) => (
            <div
              key={e.title}
              className="rounded-card border border-white/[0.075] bg-white/[0.025] px-6 py-5"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="tnum text-[11px] text-mist-600">{e.date}</span>
                <span className="text-[13px] font-medium text-mist-200">
                  {e.title}
                </span>
                <span className="ml-auto rounded-full bg-[#0CA30C]/12 px-2.5 py-1 text-[10px] text-[#5FD35F]">
                  {statusLabel[e.status]}
                </span>              </div>
              <p className="mt-2.5 text-[12px] leading-[1.85] text-mist-500">
                {e.detail}
              </p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
