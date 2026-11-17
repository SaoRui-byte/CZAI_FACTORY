import { useState } from 'react'
import { PageShell } from '../components/layout/PageShell'
import { PageHero } from '../components/ui/PageHero'
import { ButtonLink } from '../components/ui/Button'
import { billing, faqs, plans } from '../data/pricing'
import { models } from '../data/models'
import { cn } from '../lib/cn'

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <PageShell>
      <PageHero
        eyebrow={billing.eyebrow}
        title={billing.title}
        lead={billing.lead}
      />

      <section className="container-page mt-14">
        <div className="grid items-stretch gap-3.5 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                'relative flex h-full flex-col rounded-card border p-7',
                plan.highlighted
                  ? 'border-cyan-glow/30 bg-cyan-glow/[0.045]'
                  : 'border-white/[0.075] bg-white/[0.025]',
              )}
            >
              {plan.highlighted && (
                <span className="absolute top-5 right-5 rounded-full bg-cyan-glow/15 px-2.5 py-1 text-[9.5px] tracking-[0.1em] text-cyan-glow">
                  推荐
                </span>
              )}
              <h2 className="text-[17px] font-medium text-mist-100">
                {plan.name}
              </h2>
              <p className="mt-2 text-[11.5px] text-mist-500">{plan.tagline}</p>
              <div className="mt-6">
                <span className="tnum text-[28px] leading-none font-medium text-mist-100">
                  {plan.price}
                </span>
                <p className="mt-2.5 text-[11px] text-mist-500">
                  {plan.priceNote}
                </p>
              </div>
              <ul className="mt-6 flex flex-1 flex-col gap-2.5 border-t border-white/[0.06] pt-5">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-[12px] leading-[1.6] text-mist-400"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-cyan-glow/60"
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <ButtonLink
                href="/register"
                variant={plan.highlighted ? 'solid' : 'ghost'}
                size="sm"
                className="mt-7 w-full"
              >
                {plan.cta}
              </ButtonLink>
            </div>
          ))}
        </div>
      </section>

      {/* 模型价格表 */}
      <section className="container-page mt-20">
        <h2 className="text-[20px] font-semibold tracking-[-0.01em] text-mist-100">
          模型价格
        </h2>
        <p className="mt-2.5 text-[12px] text-mist-500">
          单位：元 / 百万 tokens。输入与输出分开计价，以实际用量结算。
        </p>

        <div className="mt-6 overflow-hidden rounded-card border border-white/[0.075] bg-[#0A1018]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left">
              <thead>
                <tr className="border-b border-white/[0.07] bg-white/[0.02] text-[10.5px] tracking-[0.06em] text-mist-600">
                  <th className="px-5 py-3 font-normal">模型</th>
                  <th className="px-5 py-3 font-normal">供应商</th>
                  <th className="px-5 py-3 text-right font-normal">上下文</th>
                  <th className="px-5 py-3 text-right font-normal">输入</th>
                  <th className="px-5 py-3 text-right font-normal">输出</th>
                </tr>
              </thead>
              <tbody className="text-[12px]">
                {models.map((m) => (
                  <tr
                    key={m.id}
                    className="border-b border-white/[0.045] transition-colors last:border-0 hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-3.5">
                      <span className="text-mist-200">{m.name}</span>
                      {m.status === 'coming' && (
                        <span className="ml-2 rounded-full border border-white/10 px-2 py-0.5 text-[9.5px] text-mist-600">
                          即将上线
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-mist-500">{m.vendor}</td>
                    <td className="tnum px-5 py-3.5 text-right text-mist-400">
                      {m.context}
                    </td>
                    <td className="tnum px-5 py-3.5 text-right text-mist-200">
                      ¥{m.priceInput.toFixed(2)}
                    </td>
                    <td className="tnum px-5 py-3.5 text-right text-mist-200">
                      ¥{m.priceOutput.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-page mt-20">
        <h2 className="text-[20px] font-semibold tracking-[-0.01em] text-mist-100">
          常见问题
        </h2>
        <div className="mt-6 divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {faqs.map((faq, i) => {
            const open = openFaq === i
            return (
              <div key={faq.q}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center gap-4 py-5 text-left"
                >
                  <span className="text-[13.5px] text-mist-200">{faq.q}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'ml-auto text-[15px] text-mist-500 transition-transform duration-200',
                      open && 'rotate-45',
                    )}
                  >
                    +
                  </span>
                </button>
                {open && (
                  <p className="max-w-[720px] pb-5 text-[12.5px] leading-[1.9] text-mist-500">
                    {faq.a}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </PageShell>
  )
}
