import { useParams, Link } from 'react-router-dom'
import { findDoc } from '../data/docs'
import { CodeBlock } from '../components/docs/CodeBlock'

export default function DocDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const doc = slug ? findDoc(slug) : undefined

  if (!doc) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-card border border-white/[0.075] bg-white/[0.025] px-8 py-16">
        <p className="text-[15px] text-mist-200">文档不存在</p>
        <p className="text-[12px] text-mist-500">
          请从左侧目录选择一篇文档。
        </p>
        <Link
          to="/docs"
          className="text-[12px] text-cyan-glow hover:underline"
        >
          返回文档首页 →
        </Link>
      </div>
    )
  }

  return (
    <article>
      <h2 className="text-[24px] leading-tight font-bold tracking-[-0.02em] text-mist-100">
        {doc.title}
      </h2>
      <p className="mt-3 max-w-[580px] text-[13px] leading-[1.9] text-mist-400">
        {doc.summary}
      </p>

      <div className="mt-10 flex flex-col gap-10">
        {doc.sections.map((section) => (
          <section key={section.heading}>
            <h3 className="text-[15px] font-medium text-mist-100">
              {section.heading}
            </h3>
            <div className="mt-4 flex flex-col gap-4">
              {section.blocks.map((block, i) => {
                if (block.type === 'p') {
                  return (
                    <p
                      key={i}
                      className="max-w-[640px] text-[12.5px] leading-[1.95] text-mist-400"
                    >
                      {block.text}
                    </p>
                  )
                }
                if (block.type === 'note') {
                  return (
                    <p
                      key={i}
                      className="max-w-[640px] rounded-lg border-l-2 border-cyan-glow/40 bg-cyan-glow/[0.04] px-4 py-3 text-[11.5px] leading-[1.85] text-mist-400"
                    >
                      {block.text}
                    </p>
                  )
                }
                if (block.type === 'list') {
                  return (
                    <ul key={i} className="flex max-w-[640px] flex-col gap-2">
                      {block.items?.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-[12.5px] leading-[1.8] text-mist-400"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-mist-600"
                          />
                          <span className="font-mono text-[11.5px]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )
                }
                return (
                  <CodeBlock
                    key={i}
                    code={block.text ?? ''}
                    lang={block.lang}
                  />
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </article>
  )
}
