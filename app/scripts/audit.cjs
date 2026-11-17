const { chromium } = require('playwright')

/**
 * 全站审计（开发用，不参与构建）
 *   npm run audit
 *
 * 检查：所有路由可访问、无横向溢出、无运行时报错、
 * 未登录重定向、登录后回跳、登录态持久化。
 * 截图输出到 ../preview/p-<name>.png
 */
const BASE = process.env.BASE_URL || 'http://localhost:5173'

const PUBLIC_PAGES = [
  ['home', '/'],
  ['models', '/models'],
  ['pricing', '/pricing'],
  ['solutions', '/solutions'],
  ['docs', '/docs'],
  ['docs-quickstart', '/docs/quickstart'],
  ['docs-api', '/docs/api-reference'],
  ['status', '/status'],
  ['about', '/about'],
  ['news', '/news'],
  ['contact', '/contact'],
  ['login', '/login'],
  ['register', '/register'],
]

;(async () => {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message))
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push('CONSOLE ' + m.text())
  })

  let failed = 0

  const check = async (name, path) => {
    await page.goto(BASE + path, { waitUntil: 'networkidle' })
    await page.waitForTimeout(700)
    await page.screenshot({ path: `../preview/p-${name}.png` })
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    if (overflow > 0) failed++
    console.log(`${name.padEnd(20)} overflowX=${overflow}`)
  }

  for (const [name, path] of PUBLIC_PAGES) await check(name, path)

  // 未登录访问控制台应重定向
  await page.goto(BASE + '/console', { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  const redirectUrl = new URL(page.url())
  const guarded = redirectUrl.pathname === '/login'
  if (!guarded) failed++
  console.log(`unauth /console -> ${redirectUrl.pathname}${redirectUrl.search}`)

  // 登录
  await page.fill('#phone', '13800138000')
  await page.fill('#code', '123456')
  await page.waitForTimeout(200)
  await page.click('button[type=submit]')
  await page.waitForTimeout(1100)
  const afterLogin = new URL(page.url()).pathname
  if (afterLogin !== '/console') failed++
  console.log(`after login -> ${afterLogin}`)

  // 刷新保持
  await page.reload({ waitUntil: 'networkidle' })
  await page.waitForTimeout(700)
  const afterReload = new URL(page.url()).pathname
  if (afterReload !== '/console') failed++
  console.log(`after reload -> ${afterReload}`)

  for (const [name, path] of [
    ['console', '/console'],
    ['console-keys', '/console/keys'],
    ['console-usage', '/console/usage'],
    ['console-playground', '/console/playground'],
  ]) {
    await check(name, path)
  }

  if (errors.length) failed++
  console.log('ERRORS:', errors.slice(0, 8))
  console.log(failed === 0 ? '\n✓ 全部通过' : `\n✗ ${failed} 项未通过`)
  await browser.close()
  process.exit(failed === 0 ? 0 : 1)
})()
