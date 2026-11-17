# CZAI TOKEN FOUNDRY — 前端设计与实现规格

日期：2026-11-17
状态：已确认（用户选定方向 C · 涌流，原版青蓝配色）

---

## 1. 项目定位

常州市人工智能协会（CZAI）旗下的 AI 算力 / 模型服务平台，对标硅基流动（SiliconFlow）。

平台对外提供统一的大模型 API 调用与算力供给，服务长三角地区的企业与开发者。

### 1.1 品牌标识（lockup）

协会作为品牌主体，CZAI 是主标，TOKEN FOUNDRY 为品类定语。

```
CZAI
TOKEN FOUNDRY
常州市人工智能协会 · 词元工厂
```

- 主标：`CZAI`（字重 700，字距 +0.12em）
- 副标：`TOKEN FOUNDRY`（字重 500，字距 +0.34em，字号约主标 50%，青灰色）
- 中文配角：`常州市人工智能协会 · 词元工厂`（12px 级别，用于页脚与页头小字）

### 1.2 品牌叙事

主标语：**让算力，如江入海。**

释义：算力应当像江水一样自由流动、可计量、随取随用。呼应常州地处长江与太湖之间、
大运河穿城而过的地理意象。副文案强调「可计量、可追溯、随取随用」。

---

## 2. 视觉系统（方向 C · 涌流 FLOW）

### 2.1 色彩

| 角色 | 值 | 用途 |
|---|---|---|
| 背景基准 | `#07090D` | 页面底色 |
| 背景径向渐变 | `#12263D` → `#0A1018` → `#07090D` | 右上角 1200×700px 径向光晕 |
| 主文字 | `#E8EEF5` | 标题、正文强调 |
| 次级文字 | `#8B9BB0` | 正文、描述 |
| 弱化文字 | `#7A8CA3` | 标签、注释 |
| 极弱文字 | `#5A6B80` | 页脚 |
| 玻璃面板 | `rgba(255,255,255,0.035)` | 卡片底 |
| 玻璃描边 | `rgba(255,255,255,0.075)` | 卡片边框 |
| 强调色 1 | `#4ADEDE`（青） | 渐变起点、hover、pip 光点 |
| 强调色 2 | `#5B7CFA`（蓝） | 渐变中段 |
| 强调色 3 | `#9B8CFF`（紫） | 渐变终点 |

**品牌渐变**：`linear-gradient(100deg, #4ADEDE 0%, #5B7CFA 55%, #9B8CFF 100%)`

**禁用**：不得新增其他强调色。所有高亮必须来自上述三色渐变或青色单色。

### 2.2 字体

| 角色 | 字体 | 字重 | 备注 |
|---|---|---|---|
| 拉丁标题/正文 | Inter | 400 / 500 / 600 / 700 | 主字体 |
| 中文 | Noto Sans SC | 400 / 500 / 900 | 与 Inter 混排 |
| 数字/代码 | Space Grotesk | 400 / 500 | 所有数据、价格、上下文长度 |

数字必须使用 `Space Grotesk`，全站一致。禁止用 Inter 渲染数字。

### 2.3 圆角与阴影

- 大容器（卡片、统计块）：`border-radius: 14–16px`
- 徽章 / 按钮 / 标签：`border-radius: 999px`
- 图标方块：`9px`
- 阴影仅用于主 CTA：`0 8px 34px -10px rgba(74,222,222,0.55)`，hover 加强至 `0 14px 40px -10px rgba(74,222,222,0.75)`
- 卡片不得使用实心阴影，只允许 `backdrop-filter: blur(14px)` + 半透明描边

### 2.4 动效

1. **背景流线（canvas）**：18 条正弦波叠加，缓慢横向漂移。
   - 线宽 0.6–1.7px，透明度 0.05–0.18
   - 渐变描边：青 → 蓝 → 紫，两端透明
   - 必须监听 `prefers-reduced-motion: reduce`，命中时静态渲染一帧后停止
   - 页面不可见时（tab 切走）暂停 rAF
2. **pip 光点**：6px 圆点，`box-shadow` 泛光，2.4s 呼吸
3. **卡片 hover**：`translateY(-3px)` + 边框转青色 + 径向光晕淡入，240ms
4. **主 CTA hover**：`translateY(-2px)` + 阴影加强，220ms
5. **入场**：首屏元素 stagger 淡入上移，60ms 间隔，总时长不超过 600ms

### 2.5 交互规则

- 所有可点击元素必须有 hover 反馈与 `focus-visible` 焦点环（青色 2px，offset 3px）
- 触摸设备（`@media (hover: none)`）不施加位移型 hover，避免残留态
- 导航与页脚链接使用真实 `<a>` 元素

---

## 3. 页面范围（首期）

### 3.1 首页 `/`

区块顺序：

1. **Nav** — logo lockup / 5 个导航项 / 「控制台 →」按钮
2. **Hero** — 状态徽章（协会标识 + pip）/ H1「让算力，如江入海。」/ 引导文案 / 双 CTA
3. **Stats** — 4 个统计块（算力规模、模型数、开发者数、可用性）
4. **Models** — 模型广场预览，2×2 或 2×N 玻璃卡片，卡片含模型名、上下文徽章、一句话描述、价格、hover 箭头
5. **Capability** — 三项平台能力（统一 API / 弹性算力 / 可计量计费），横向三栏，细线分隔
6. **CTA Band** — 底部转化区「开始接入」
7. **Footer** — 品牌 lockup / 链接分组 / 备案信息占位

### 3.2 模型广场 `/models`

- 顶部标题区：标题 + 模型总数 + 一句话说明
- 筛选栏：能力标签（全部 / 对话 / 推理 / 代码 / 多模态 / 智能体）+ 搜索框
- 模型卡片网格：响应式 1 / 2 / 3 列
- 每张卡片：图标字标、模型名、供应商、上下文徽章、能力标签、描述、输入/输出价格、调用按钮
- 空状态：筛选无结果时的提示
- 数据来自 `src/data/models.ts`，筛选为纯前端

### 3.3 明确不做（首期）

- 登录注册、控制台、API Key 管理
- Playground（对话测试台）
- 计费与充值
- 文档站
- 真实 API 接入（全部为静态数据）

---

## 4. 技术栈

- React 19 + TypeScript
- Vite 7
- Tailwind CSS v4（`@theme` 配置，不使用 tailwind.config.js）
- Framer Motion（入场与 hover 动效）
- 字体自托管或通过 CSS `@import` 加载 Google Fonts（Inter / Noto Sans SC / Space Grotesk）
- 路由：React Router v7（`/` 与 `/models`）

不使用 shadcn/ui —— 本设计为定制视觉，通用组件库会引入不需要的默认样式。

---

## 5. 项目结构

```
src/
  main.tsx
  App.tsx
  index.css              # Tailwind + @theme 设计令牌
  router.tsx
  components/
    layout/
      SiteHeader.tsx
      SiteFooter.tsx
      PageShell.tsx      # 提供背景渐变 + 流线画布
    flow/
      FlowCanvas.tsx     # 背景流线动画
    ui/
      GlassCard.tsx
      Badge.tsx
      Button.tsx
      StatTile.tsx
      SectionHeading.tsx
    home/
      Hero.tsx
      StatsBand.tsx
      ModelPreview.tsx
      CapabilityBand.tsx
      CtaBand.tsx
    models/
      ModelCard.tsx
      ModelFilters.tsx
  data/
    site.ts              # 品牌文案、导航、统计数字（可配置）
    models.ts            # 模型清单（占位数据）
  lib/
    cn.ts                # className 合并
```

### 5.1 可配置数据（重点）

`src/data/site.ts` 导出：

```ts
export const brand = {
  short: 'CZAI',
  wordmark: 'TOKEN FOUNDRY',
  fullName: '常州市人工智能协会',
  productName: '词元工厂',
}

export const hero = {
  badge: '常州市人工智能协会 · 词元工厂',
  titleLines: ['让算力，', '如江入海。'],
  lead: '统一的模型调用与算力供给，让智能像江水一样自由流动 —— 可计量、可追溯、随取随用。',
}

export const stats = [
  { value: '12,480', unit: 'PFLOPS', label: '智能算力总规模' },
  { value: '38', unit: '个', label: '可调用大模型' },
  { value: '2,600', unit: '+', label: '注册开发者' },
  { value: '99.95', unit: '%', label: '服务可用性' },
]
```

所有占位数字集中在此文件，改一处即全站生效。

---

## 6. 数据模型

```ts
export type ModelCapability =
  | 'chat' | 'reasoning' | 'code' | 'multimodal' | 'agent'

export interface ModelEntry {
  id: string
  name: string          // 显示名，如 DeepSeek-V3.2
  vendor: string        // 供应商，如 深度求索
  initials: string      // 图标字标，2 字
  context: string       // 上下文，如 128K
  capabilities: ModelCapability[]
  description: string
  priceInput: number    // 元 / 百万 tokens
  priceOutput: number
  featured?: boolean
  status: 'online' | 'coming'
}
```

---

## 7. 响应式断点

| 断点 | 宽度 | 变化 |
|---|---|---|
| 桌面 | ≥ 1024px | 基准设计（1440 内容宽度上限 1240px） |
| 平板 | 768–1023px | 统计 2 列，模型网格 2 列，导航收起为抽屉 |
| 手机 | < 768px | 全部单列，字号降档，内边距 20px，导航抽屉 |

移动端导航：汉堡按钮 → 全屏或下拉面板，含焦点陷阱与 Esc 关闭。

---

## 8. 无障碍

- 页面 `lang="zh-CN"`
- 所有图片/图标有替代文本或 `aria-hidden`
- 装饰性 canvas 标记 `aria-hidden="true"`
- 颜色对比：正文 `#8B9BB0` on `#07090D` 对比度约 7.4:1，符合 AA
- 焦点样式不可移除
- 尊重 `prefers-reduced-motion`

---

## 9. 验收标准

1. `npm run build` 零错误、零 TypeScript 报错
2. 首页与模型广场在 1440 / 1024 / 768 / 375 四个宽度下无横向滚动、无文字截断
3. canvas 流线在 `prefers-reduced-motion` 下停止
4. 所有统计数字与模型数据来自 `src/data/`，组件内无硬编码数字
5. 模型广场筛选（能力标签 + 搜索）可用，空状态正确
6. 键盘可完整遍历所有交互元素，焦点环可见
7. Lighthouse 性能与无障碍均 ≥ 90（本地构建产物）

---

## 10. 后续（不在本期）

- Playground 对话测试台
- 控制台与 API Key
- 文档站
- 真实后端对接
