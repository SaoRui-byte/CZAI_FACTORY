import { motion } from 'framer-motion'
import { stats } from '../../data/site'

export function StatsBand() {
  return (
    <section aria-label="平台数据" className="container-page">
      <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.5,
              delay: i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="glass edge-light rounded-tile px-6 py-[26px]"
          >
            <div className="tnum flex items-baseline gap-1.5 text-[26px] leading-none font-medium tracking-[-0.02em] text-mist-100 md:text-[30px]">
              <span className="bg-gradient-to-br from-white to-[#A9C4E0] bg-clip-text text-transparent">
                {stat.value}
              </span>
              <span className="text-[12px] font-normal text-cyan-glow">
                {stat.unit}
              </span>
            </div>
            <div className="mt-3.5 text-[11.5px] tracking-[0.1em] text-mist-500">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
