import { Link } from 'react-router-dom'
import { brand, footerGroups } from '../../data/site'

export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-white/[0.07]">
      <div className="container-page py-14">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)] md:gap-8">
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-6 w-6 rounded-full [background:conic-gradient(from_200deg,var(--color-cyan-glow),var(--color-azure),var(--color-violet-soft),var(--color-cyan-glow))] blur-[0.4px]"
              />
              <div className="flex flex-col gap-[5px]">
                <span className="text-[16px] leading-none font-bold tracking-[0.12em] text-mist-100">
                  {brand.short}
                </span>
                <span className="text-[8px] leading-none font-medium tracking-[0.34em] text-mist-500">
                  {brand.wordmark}
                </span>
              </div>
            </div>
            <p className="mt-6 max-w-[280px] text-[13px] leading-[1.9] text-mist-500">
              {brand.fullName}
              {brand.productName}。为长三角的每一家企业与开发者，铸造
              可计量、可追溯、可复用的智能。
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-[11px] font-medium tracking-[0.18em] text-mist-600">
                {group.title}
              </h2>
              <ul className="mt-5 flex flex-col gap-3.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                        className="text-[13px] text-mist-400 transition-colors duration-200 hover:text-mist-100"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-[13px] text-mist-400 transition-colors duration-200 hover:text-mist-100"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/[0.06] pt-7 text-[11px] tracking-[0.08em] text-mist-600 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © 2026 {brand.short} · {brand.fullName}
          </span>
          <span className="flex gap-6">
            <span>{brand.region}</span>
            <span>苏 ICP 备 00000000 号</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
