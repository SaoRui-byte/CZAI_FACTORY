const { chromium } = require('playwright')

/**
 * 视觉走查截图工具（开发用，不参与构建）
 *   npm run shots
 * 输出到 ../preview/
 */
const VIEWPORTS = [
  { name: 'home-1440', path: '/', w: 1440, h: 900 },
  { name: 'models-1440', path: '/models', w: 1440, h: 900 },
  { name: 'home-768', path: '/', w: 768, h: 1024 },
  { name: 'home-375', path: '/', w: 375, h: 812, mobile: true },
  { name: 'models-375', path: '/models', w: 375, h: 812, mobile: true },
]

const BASE = process.env.BASE_URL || 'http://localhost:5173'

;(async () => {
  const browser = await chromium.launch()
  for (const v of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: v.w, height: v.h },
      isMobile: !!v.mobile,
      hasTouch: !!v.mobile,
      deviceScaleFactor: v.mobile ? 2 : 1,
    })
    const page = await ctx.newPage()
    await page.goto(BASE + v.path, { waitUntil: 'networkidle' })
    await page.waitForTimeout(900)

    // 以真实节奏滚动，触发 whileInView 入场动画
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.75
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 120))
      }
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(700)

    await page.screenshot({ path: `../preview/${v.name}.png` })

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    console.log(`${v.name}: overflowX=${overflow}px`)
    await ctx.close()
  }
  await browser.close()
})()
