import { motion } from 'framer-motion'
import { FlowCanvas } from '../flow/FlowCanvas'
import { ButtonRouterLink } from '../ui/Button'
import { StatusPip } from '../ui/Badge'
import { hero } from '../../data/site'

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.06,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* 首屏专属流线层 */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <FlowCanvas className="opacity-70" />
        <div className="absolute inset-0 [background:radial-gradient(760px_420px_at_18%_42%,rgba(74,222,222,0.07),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950/80" />
      </div>

      <div className="container-page relative pt-24 pb-20 md:pt-28 lg:pt-32 lg:pb-24">
        <motion.div
          initial="hidden"
          animate="show"
          className="max-w-[820px]"
        >
          <motion.div variants={fadeUp} custom={0}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2.5 text-[11px] font-medium tracking-[0.14em] text-mist-300 backdrop-blur-md">
              <StatusPip />
              {hero.badge}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="mt-8 text-[clamp(44px,7.6vw,92px)] leading-[1.06] font-bold tracking-[-0.035em] text-balance"
          >
            {hero.titleLead}
            <br />
            <span className="text-brand-gradient">{hero.titleAccent}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-7 max-w-[520px] text-[14px] leading-[1.9] text-mist-400 md:text-[15px]"
          >
            {hero.lead}
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="mt-10 flex flex-wrap items-center gap-3.5"
          >
            <ButtonRouterLink to={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </ButtonRouterLink>
            <ButtonRouterLink to={hero.secondaryCta.href} variant="ghost">
              {hero.secondaryCta.label}
              <span aria-hidden="true" className="text-[11px] opacity-70">
                ↗
              </span>
            </ButtonRouterLink>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            custom={4}
            className="mt-11 flex flex-wrap items-center gap-x-7 gap-y-2.5 text-[11px] tracking-[0.12em] text-mist-600"
          >
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-cyan-glow/50" />
              OpenAI 兼容
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-cyan-glow/50" />
              按量计费
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-cyan-glow/50" />
              企业月结
            </li>
          </motion.ul>
        </motion.div>
      </div>
    </section>
  )
}
