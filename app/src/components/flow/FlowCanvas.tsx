import { useEffect, useRef } from 'react'

interface Line {
  y: number
  amp: number
  freq: number
  phase: number
  speed: number
  alpha: number
  width: number
}

const LINE_COUNT = 18

function buildLines(): Line[] {
  return Array.from({ length: LINE_COUNT }, (_, i) => {
    // 用索引派生的伪随机量，保证每次渲染分布一致但看起来自然
    const r = (n: number) => {
      const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453
      return x - Math.floor(x)
    }
    return {
      y: 0.08 + r(1) * 0.84,
      amp: 18 + r(2) * 46,
      freq: 0.0016 + r(3) * 0.0026,
      phase: r(4) * Math.PI * 2,
      speed: 0.0006 + r(5) * 0.0012,
      alpha: 0.05 + r(6) * 0.13,
      width: 0.6 + r(7) * 1.1,
    }
  })
}

/**
 * 背景流线 —— 品牌核心视觉资产。
 * 18 条正弦波叠加，青→蓝→紫渐变描边，两端透明。
 * 尊重 prefers-reduced-motion；页面不可见时暂停。
 */
export function FlowCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let rafId = 0
    let running = true
    let t = 0

    const lines = buildLines()

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      width = rect?.width ?? window.innerWidth
      height = rect?.height ?? window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const paint = () => {
      ctx.clearRect(0, 0, width, height)

      for (const l of lines) {
        ctx.beginPath()
        const baseY = l.y * height
        for (let x = 0; x <= width; x += 6) {
          const y =
            baseY +
            Math.sin(x * l.freq + l.phase + t * l.speed) * l.amp +
            Math.sin(x * l.freq * 2.3 + l.phase * 1.7) * l.amp * 0.3
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        const grad = ctx.createLinearGradient(0, 0, width, 0)
        grad.addColorStop(0, 'rgba(74, 222, 222, 0)')
        grad.addColorStop(0.25, `rgba(74, 222, 222, ${l.alpha})`)
        grad.addColorStop(0.65, `rgba(91, 124, 250, ${l.alpha})`)
        grad.addColorStop(1, 'rgba(155, 140, 255, 0)')
        ctx.strokeStyle = grad
        ctx.lineWidth = l.width
        ctx.lineCap = 'round'
        ctx.stroke()
      }
    }

    const loop = () => {
      if (!running) return
      t += 1
      paint()
      rafId = requestAnimationFrame(loop)
    }

    const start = () => {
      if (rafId) return
      running = true
      rafId = requestAnimationFrame(loop)
    }

    const stop = () => {
      running = false
      if (rafId) cancelAnimationFrame(rafId)
      rafId = 0
    }

    const onVisibility = () => {
      if (document.hidden) stop()
      else if (!reduceMotion) start()
    }

    resize()
    paint()

    if (!reduceMotion) start()
    else {
      // 静态渲染一帧即可
      stop()
    }

    const ro = new ResizeObserver(() => {
      resize()
      paint()
    })
    if (canvas.parentElement) ro.observe(canvas.parentElement)

    document.addEventListener('visibilitychange', onVisibility)
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMq = () => {
      if (mq.matches) {
        stop()
        paint()
      } else start()
    }
    mq.addEventListener('change', onMq)

    return () => {
      stop()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      mq.removeEventListener('change', onMq)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    />
  )
}
