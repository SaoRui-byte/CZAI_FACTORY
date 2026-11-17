# CZAI TOKEN FOUNDRY — 前端

常州市人工智能协会（CZAI）词元工厂平台前端。
对标硅基流动，提供统一的大模型调用与算力供给入口。

**纯前端演示项目**：无后端，登录态与密钥存在浏览器 localStorage，
所有数据为静态模拟。详见文末「安全边界」。

---

## 快速开始

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 类型检查 + 生产构建
npm run audit    # 全站路由与流程审计（需先启动 dev）
```

技术栈：React 19 · TypeScript · Vite 8 · Tailwind CSS v4 · Framer Motion · React Router 7。

---

## 页面清单

### 公开页面

| 路径 | 说明 |
|---|---|
| `/` | 首页 |
| `/models` | 模型广场（筛选 + 搜索） |
| `/pricing` | 价格（套餐 + 模型单价 + FAQ） |
| `/solutions` | 解决方案（4 个场景） |
| `/docs` | 文档首页 |
| `/docs/quickstart` | 快速开始 |
| `/docs/api-reference` | API 参考 |
| `/docs/sdk` | SDK 与示例 |
| `/status` | 服务状态（30 天可用性 + 事件） |
| `/about` | 协会介绍 |
| `/news` | 新闻动态 |
| `/contact` | 联系我们（表单） |

### 账号

| 路径 | 说明 |
|---|---|
| `/login` | 登录（含「一键进入演示账号」） |
| `/register` | 注册 |

**演示账号**：登录页顶部有「一键进入演示账号」按钮，点击即登录，
预置了 3 个 API Key（含 1 个已撤销）、30 天用量趋势与调用记录，
无需输入手机号或验证码。

手动登录时验证码固定为 `123456`，页面上有明确标注。

### 控制台（需登录）

| 路径 | 说明 |
|---|---|
| `/console` | 总览（KPI + 趋势图 + 占比 + 调用记录） |
| `/console/keys` | API Key 管理 |
| `/console/usage` | 用量明细（7 / 30 / 90 天） |
| `/console/playground` | 对话测试台（模拟流式输出） |

未登录访问任一 `/console/*` 会重定向到 `/login?next=<原路径>`，登录后自动回跳。
页头右上角的「控制台 →」在未登录时显示为「登录 / 控制台 →」。

---

## 目录结构

```
src/
├─ components/
│  ├─ charts/        TrendChart · ModelShareBars · Sparkline · palette
│  ├─ console/       ConsoleShell · guards
│  ├─ auth/          AuthForm · AuthShell
│  ├─ docs/          CodeBlock
│  ├─ flow/          FlowCanvas（背景流线）
│  ├─ layout/        SiteHeader · SiteFooter · PageShell · RootLayout
│  ├─ home/          首页各区块
│  ├─ models/        ModelCard · ModelFilters
│  └─ ui/            Button · Badge · PageHero
├─ data/             site · models · pricing · solutions · docs
│                    status · news · console · playground · filters
├─ lib/              auth · authContext · AuthProvider · useAuth · cn
├─ pages/            HomePage · ModelsPage · … · console/*
├─ router.tsx        全部路由
└─ index.css         Tailwind 主题与设计令牌
```

### 需要你维护的数据文件

| 文件 | 内容 |
|---|---|
| `src/data/site.ts` | 品牌文案、导航、**首页统计数字** |
| `src/data/models.ts` | 模型清单与价格 |
| `src/data/pricing.ts` | 套餐、FAQ |
| `src/data/console.ts` | 控制台 KPI、趋势、占比、用量 |
| `src/data/news.ts` | 新闻 |
| `src/data/docs.ts` | 文档正文 |
| `src/data/status.ts` | 组件状态与事件 |

**都是占位数据。** 上线前必须替换为真实口径，尤其是首页首屏数字与模型价格。

---

## 设计系统

配色、字体、圆角、动效定义在 `src/index.css` 的 `@theme` 块。

| 令牌 | 值 | 用途 |
|---|---|---|
| `--color-ink-950` | `#07090D` | 页面底色 |
| `--color-mist-400` | `#8B9BB0` | 次级文字 |
| `--color-cyan-glow` | `#4ADEDE` | 渐变起点 / 强调 |
| `--color-azure` | `#5B7CFA` | 渐变中段 |
| `--color-violet-soft` | `#9B8CFF` | 渐变终点 |

品牌渐变 `linear-gradient(100deg, #4ADEDE, #5B7CFA 55%, #9B8CFF)`
字体：Inter（拉丁）· Noto Sans SC（中文）· Space Grotesk（所有数字）

**约定**：数字一律用 `tnum` 类；卡片不用实心阴影，只用半透明描边 + `backdrop-filter`。

### 图表配色是独立的一套

品牌青蓝紫**不能**用作分类色。实测（dataviz 的 `validate_palette.js`，
表面 `#0A1018`）：紫 `#9B8CFF` 与蓝 `#5B7CFA` 的 CVD ΔE 仅 6.4，
正常视力 ΔE 仅 9.8 —— 低于 15 的硬门槛，正常视力都难分辨。

图表改用经校验的色板（四项检查全部 PASS）：

```
series-1 #3987E5   series-2 #D95926
series-3 #199E70   series-4 #C98500
```

见 `src/components/charts/palette.ts`。修改图表配色请重新跑验证器。

图表为手写 SVG，未引入图表库（避免 200KB+ 包体与样式冲突）。
已落实：2px 折线、10% 面积填充、1px 实线网格、仅端点标注、
hover 准线 + tooltip、独立数据表视图。

---

## 无障碍

- 全站键盘可遍历，`:focus-visible` 青色焦点环
- 「跳到主要内容」跳转链接
- 背景画布 `aria-hidden`
- 图表均带 `role="img"` + `aria-label`，并提供表格视图
- 尊重 `prefers-reduced-motion`（`MotionConfig reducedMotion="user"`）

---

## 安全边界

**本项目是纯前端演示，以下任一都不能用于生产：**

1. 验证码是固定值 `123456`，没有短信网关
2. 登录态明文存在 `localStorage`，可被任意脚本读取、篡改
3. 没有服务端校验，前端说登录了就登录了
4. API Key 明文存在 `localStorage`，可反复读取
5. 联系表单不发请求，数据显示「成功」但数据未离开浏览器

真实实现需要：验证码由服务端下发并校验、会话用 HttpOnly Cookie 或
服务端签发 JWT、所有权限判断在服务端完成、密钥由服务端生成并存哈希
且只在创建时返回一次。

---

## 未实现

真实后端与数据库、短信网关、支付与开票、OAuth 登录、多语言。
