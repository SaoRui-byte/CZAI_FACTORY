import { NavLink, Outlet } from 'react-router-dom'
import { PageShell } from '../components/layout/PageShell'
import { docs } from '../data/docs'
import { cn } from '../lib/cn'

export function DocsLayout() {
  return (
    <PageShell>
      <div className="container-page flex flex-col gap-10 pt-12 pb-20 lg:flex-row lg:gap-14">
        <aside className="lg:w-[200px] lg:shrink-0">
          <div className="text-[10.5px] tracking-[0.24em] text-mist-600">
            DOCUMENTATION
          </div>
          <h1 className="mt-3 text-[18px] font-bold text-mist-100">文档</h1>

          <nav
            aria-label="文档目录"
            className="mt-6 flex gap-1.5 overflow-x-auto lg:flex-col lg:overflow-visible"
          >
            {docs.map((d) => (
              <NavLink
                key={d.slug}
                to={`/docs/${d.slug}`}
                className={({ isActive }) =>
                  cn(
                    'shrink-0 rounded-lg px-3.5 py-2.5 text-[12.5px] whitespace-nowrap transition-colors duration-200',
                    isActive
                      ? 'bg-white/[0.07] text-mist-100'
                      : 'text-mist-400 hover:bg-white/[0.04] hover:text-mist-200',
                  )
                }
              >
                {d.title}
              </NavLink>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
    </PageShell>
  )
}
