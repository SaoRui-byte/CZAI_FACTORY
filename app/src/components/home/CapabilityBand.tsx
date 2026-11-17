import { motion } from 'framer-motion'
import { capabilities } from '../../data/site'

export function CapabilityBand() {
  return (
    <section
      id="compute"
      aria-labelledby="capability-heading"
      className="container-page mt-24 md:mt-32"
    >
      <div className="flex flex-wrap items-baseline gap-x-4">
        <h2
          id="capability-heading"
          className="text-[22px] leading-none font-semibold tracking-[-0.01em] text-mist-100 md:text-[26px]"
        >
          平台能力
        </h2>
        <span className="text-[11px] tracking-[0.16em] text-mist-600">
          CAPABILITIES
        </span>
      </div>

      <div className="mt-8 grid gap-px overflow-hidden rounded-card border border-white/[0.075] bg-white/[0.075] md:grid-cols-3">        {capabilities.map((cap, i) => (
          <motion.div
            key={cap.index}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.5,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative bg-[#0A1119] p-8 transition-colors duration-300 hover:bg-[#0E1722]"
          >
            <span className="tnum text-[10px] tracking-[0.2em] text-cyan-glow/70">
              {cap.index}
            </span>
            <h3 className="mt-5 text-[19px] leading-none font-medium text-mist-100">
              {cap.title}
            </h3>
            <p className="mt-4 text-[13px] leading-[1.85] text-mist-500">
              {cap.description}
            </p>
            <ul className="mt-6 flex flex-col gap-2.5 border-t border-white/[0.06] pt-5">
              {cap.points.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-2.5 text-[12px] text-mist-400"
                >
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 rounded-full bg-cyan-glow/60"
                  />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
