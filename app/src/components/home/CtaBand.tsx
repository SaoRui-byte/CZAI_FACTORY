import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ctaBand } from '../../data/site'
import { ButtonRouterLink } from '../ui/Button'

export function CtaBand() {
  return (
    <section id="pricing" className="container-page mt-24 md:mt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="glass-strong edge-light relative overflow-hidden rounded-card px-8 py-12 md:px-14 md:py-16"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-0 h-[340px] w-[460px] [background:radial-gradient(closest-side,rgba(91,124,250,0.16),transparent)]"
        />
        <div className="relative z-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-[10px] tracking-[0.26em] text-cyan-glow/80">
              {ctaBand.eyebrow}
            </span>
            <h2 className="mt-5 text-[clamp(28px,4vw,42px)] leading-[1.15] font-bold tracking-[-0.02em] text-mist-100">
              {ctaBand.title}
            </h2>
            <p className="mt-4 max-w-[440px] text-[13.5px] leading-[1.9] text-mist-500">
              {ctaBand.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3.5">
            <ButtonRouterLink to={ctaBand.primary.href}>
              {ctaBand.primary.label}
            </ButtonRouterLink>
            <ButtonRouterLink to={ctaBand.secondary.href} variant="ghost">
              {ctaBand.secondary.label}
            </ButtonRouterLink>
          </div>
        </div>
        <p className="relative z-10 mt-8 border-t border-white/[0.07] pt-5 text-[11px] text-mist-600">
          想先看看控制台？
          <Link
            to="/login"
            className="ml-1.5 text-cyan-glow underline-offset-4 hover:underline"
          >
            用演示账号一键进入
          </Link>
          ，已预置用量、密钥与调用记录。
        </p>
      </motion.div>
    </section>
  )
}
