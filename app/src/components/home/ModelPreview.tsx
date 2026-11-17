import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { featuredModels } from '../../data/models'
import { ModelCard } from '../models/ModelCard'

export function ModelPreview() {
  return (
    <section aria-labelledby="models-heading" className="container-page mt-24 md:mt-28">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <h2
          id="models-heading"
          className="text-[22px] leading-none font-semibold tracking-[-0.01em] text-mist-100 md:text-[26px]"
        >
          模型广场
        </h2>
        <span className="text-[11px] tracking-[0.16em] text-mist-600">
          FEATURED MODELS
        </span>
        <Link
          to="/models"
          className="ml-auto text-[12px] text-mist-500 transition-colors duration-200 hover:text-cyan-glow"
        >
          查看全部 →
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3.5 md:grid-cols-2">
        {featuredModels.map((model, i) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.5,
              delay: i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ModelCard model={model} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
