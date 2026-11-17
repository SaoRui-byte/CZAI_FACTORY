import { useState } from 'react'
import { PageShell } from '../components/layout/PageShell'
import { PageHero } from '../components/ui/PageHero'
import { brand } from '../data/site'
import { cn } from '../lib/cn'

const contactInfo = [
  { label: '地址', value: '江苏省常州市新北区太湖东路 9 号' },
  { label: '电话', value: '0519-8888 8888' },
  { label: '邮箱', value: 'contact@czai.example.com' },
  { label: '工作时间', value: '周一至周五 09:00 – 17:30' },
]

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    org: '',
    phone: '',
    message: '',
  })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [k]: e.target.value })
    setError(null)
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) return setError('请填写联系人姓名')
    if (!/^1[3-9]\d{9}$/.test(form.phone)) return setError('请填写有效的手机号')
    if (!form.message.trim()) return setError('请填写需求描述')
    setSent(true)
  }

  return (
    <PageShell>
      <PageHero
        eyebrow="CONTACT"
        title="联系我们"
        lead="商务合作、算力申请、技术咨询，欢迎随时联系协会秘书处。"
      />

      <section className="container-page mt-14 grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
        <div>
          <h2 className="text-[18px] font-semibold text-mist-100">
            联系信息
          </h2>
          <dl className="mt-6 flex flex-col gap-5">
            {contactInfo.map((c) => (
              <div key={c.label} className="border-b border-white/[0.06] pb-4">
                <dt className="text-[10.5px] tracking-[0.16em] text-mist-600">
                  {c.label}
                </dt>
                <dd className="mt-1.5 text-[13px] text-mist-200">{c.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-[11.5px] leading-[1.9] text-mist-600">
            以上为演示信息。正式上线前请替换为协会真实联系方式。
          </p>
        </div>

        <div className="rounded-card border border-white/[0.075] bg-white/[0.025] p-7">
          {sent ? (
            <div className="flex flex-col items-start gap-4 py-10">
              <span
                aria-hidden="true"
                className="grid h-10 w-10 place-items-center rounded-full bg-[#0CA30C]/15 text-[16px] text-[#5FD35F]"
              >
                ✓
              </span>
              <h3 className="text-[16px] font-medium text-mist-100">
                已收到你的信息
              </h3>
              <p className="max-w-[380px] text-[12.5px] leading-[1.9] text-mist-500">
                协会秘书处将在 1–2 个工作日内与你联系。
                （演示环境下不会真实发送，数据未离开浏览器。）
              </p>
              <button
                type="button"
                onClick={() => {
                  setSent(false)
                  setForm({ name: '', org: '', phone: '', message: '' })
                }}
                className="rounded-full border border-white/15 px-5 py-2.5 text-[12px] text-mist-300 hover:bg-white/[0.06]"
              >
                再填一份
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
              <h2 className="text-[16px] font-medium text-mist-100">
                提交需求
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="c-name"
                    className="mb-1.5 block text-[11px] text-mist-500"
                  >
                    联系人 *
                  </label>
                  <input
                    id="c-name"
                    value={form.name}
                    onChange={update('name')}
                    placeholder="你的姓名"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.035] px-3.5 py-3 text-[12.5px] text-mist-100 placeholder:text-mist-600 focus:border-cyan-glow/45 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="c-org"
                    className="mb-1.5 block text-[11px] text-mist-500"
                  >
                    单位名称
                  </label>
                  <input
                    id="c-org"
                    value={form.org}
                    onChange={update('org')}
                    placeholder="选填"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.035] px-3.5 py-3 text-[12.5px] text-mist-100 placeholder:text-mist-600 focus:border-cyan-glow/45 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="c-phone"
                  className="mb-1.5 block text-[11px] text-mist-500"
                >
                  手机号 *
                </label>
                <input
                  id="c-phone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={11}
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value.replace(/\D/g, '') })
                  }
                  placeholder="11 位手机号"
                  className="tnum w-full rounded-lg border border-white/10 bg-white/[0.035] px-3.5 py-3 text-[12.5px] text-mist-100 placeholder:font-sans placeholder:text-mist-600 focus:border-cyan-glow/45 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="c-msg"
                  className="mb-1.5 block text-[11px] text-mist-500"
                >
                  需求描述 *
                </label>
                <textarea
                  id="c-msg"
                  rows={5}
                  value={form.message}
                  onChange={update('message')}
                  placeholder="请简要描述你的场景、预期用量或合作方式"
                  className="w-full resize-y rounded-lg border border-white/10 bg-white/[0.035] px-3.5 py-3 text-[12.5px] text-mist-100 placeholder:text-mist-600 focus:border-cyan-glow/45 focus:outline-none"
                />
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-lg border border-[#E66767]/30 bg-[#E66767]/[0.08] px-3.5 py-2.5 text-[11.5px] text-[#F0A0A0]"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                className={cn(
                  'mt-1 rounded-full bg-brand-gradient py-3.5 text-[12.5px] font-medium text-[#04121A]',
                  'transition-transform duration-200 hover:-translate-y-0.5',
                )}
              >
                提交
              </button>
              <p className="text-[10.5px] leading-[1.7] text-mist-600">
                提交即表示同意 {brand.fullName} 就本次咨询与你联系。
              </p>
            </form>
          )}
        </div>
      </section>
    </PageShell>
  )
}
