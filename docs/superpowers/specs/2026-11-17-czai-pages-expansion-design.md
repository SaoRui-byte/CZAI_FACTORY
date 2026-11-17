# CZAI TOKEN FOUNDRY — 页面补齐规格

日期：2026-11-17
状态：已确认
前置：`2026-11-17-czai-token-foundry-design.md`

---

## 1. 目标

消除全站所有空链接，把前端补成一套可完整演示的产品。
用户要求：「做一个前端出来」——即所有入口都能点进去看到真实页面，
无需后端，数据为本地模拟。

---

## 2. 路由清单

| 路径 | 页面 | 权限 |
|---|---|---|
| `/` | 首页 | 公开 |
| `/models` | 模型广场 | 公开 |
| `/pricing` | 价格 | 公开 |
| `/solutions` | 解决方案 | 公开 |
| `/docs` | 文档 | 公开 |
| `/docs/:slug` | 文档详情（快速开始 / API 参考 / SDK） | 公开 |
| `/status` | 状态页 | 公开 |
| `/about` | 协会介绍 | 公开 |
| `/news` | 新闻动态 | 公开 |
| `/contact` | 联系我们 | 公开 |
| `/login` | 登录 | 公开（已登录则跳转控制台） |
| `/register` | 注册 | 公开（已登录则跳转控制台） |
| `/console` | 控制台总览 | **需登录** |
| `/console/keys` | API Key 管理 | **需登录** |
| `/console/usage` | 用量明细 | **需登录** |
| `/console/playground` | 对话测试台 | **需登录** |

旧锚点 `#compute` / `#pricing` 等在导航中改指向真实路由。

---

## 3. 认证模型

### 3.1 登录方式

手机号 + 短信验证码。

- 手机号校验：`/^1[3-9]\d{9}$/`
- 验证码输入：6 位数字
- 「获取验证码」点击后进入 60 秒倒计时，倒计时内禁用
- **演示环境固定验证码：`123456`**（页面上明确标注这是演示值，不掩盖）

### 3.2 登录态存储

`localStorage` key：`czai.session`

```ts
interface Session {
  phone: string        // 掩码显示 138****8000
  name: string         // 默认「开发者 + 手机尾号4位」
  createdAt: string    // ISO 字符串
}
```

- 登录成功写入，退出清除
- 刷新后保持
- 路由守卫：`/console/*` 未登录时重定向到 `/login?next=<原路径>`，登录后跳回

### 3.3 安全边界（必须在代码注释中写明）

这是**纯前端演示**。验证码固定值、session 存在 localStorage、
API Key 明文保存在浏览器——**任何一项都不能用于生产**。
真实实现需要服务端签发 JWT、验证码走短信网关、Key 只在创建时显示一次且服务端存哈希。

---

## 4. 控制台

### 4.1 布局

左侧固定侧栏（220px）+ 右侧内容区。
移动端侧栏收起为顶部下拉。

侧栏导航：总览 / API Key / 用量明细 / 对话测试台。
底部：用户信息 + 退出登录。

### 4.2 总览页

1. **KPI 行** — 4 个 stat tile
   - 本月调用次数、消耗 tokens、可用额度、平均延迟
   - 每个含 value + delta（vs 上月）+ 12 点 sparkline
2. **Token 调用量趋势** — 折线图，30 天，单序列
   - 单序列不加图例，标题即说明
   - 末尾点直接标注数值
   - hover 十字准线 + tooltip
3. **模型调用占比** — 排序横向条形图，单色（slot 1）
   - 不用饼图/环形图（规范明令禁止用于比较接近值）
   - 每条含名称、条、数值、占比
4. **最近调用记录** — 表格，5 行，含时间/模型/tokens/耗时/状态

### 4.3 图表配色契约

**品牌青蓝紫三色不能用作分类色**——已用验证器实测：
紫 `#9B8CFF` 与蓝 `#5B7CFA` 的 CVD ΔE 仅 6.4、正常视力 ΔE 仅 9.8（低于 15 硬门槛）。

因此图表使用经校验的参考色板（在 `#0A1018` 底上全部 PASS）：

| 槽位 | 色值 | 用途 |
|---|---|---|
| series-1 | `#3987E5` | 主序列（单序列图表就用它） |
| series-2 | `#D95926` | 第二序列 |
| series-3 | `#199E70` | 第三序列 |
| series-4 | `#C98500` | 第四序列 |

文字一律用文本色（`mist-100/400/500`），**绝不给文字上数据色**。

### 4.4 图形规范

- 折线 2px，圆角端点；面积填充为序列色 10% 透明度
- 网格线 1px 实线，比表面色高一档，弱化
- 数据点标记 ≥ 8px，带 2px 表面色描边
- 条形 ≤ 24px 厚，数据端 4px 圆角，基线端直角
- 不给每个点标数值，只标端点/极值
- 图表下方提供「查看数据表」可展开的表格视图（无障碍要求）

### 4.5 API Key 页

- 列表：名称、Key 前缀（`sk-czai-••••••••3f2a`）、创建时间、最后使用、状态
- **新建**：弹窗输入名称 → 生成 → **完整 Key 只显示这一次**，带复制按钮与醒目警告
- 撤销：二次确认
- 存储：`localStorage` key `czai.apikeys`，明文（演示用，注释说明）

### 4.6 用量明细页

- 时间范围筛选（7 天 / 30 天 / 90 天）
- 按模型分组的用量表格：模型、调用次数、输入 tokens、输出 tokens、费用
- 合计行

### 4.7 Playground

- 左侧模型选择 + 参数（temperature、max_tokens 滑块）
- 右侧对话区
- 发送后**模拟流式输出**（逐字追加，带打字光标）
- 回复内容为预设的演示文本，明确标注「演示数据，未接入真实模型」
- 支持清空对话

---

## 5. 公开页面

### 5.1 价格页

- 计费说明区
- 价格表：全部模型，按输入/输出分别计价
- 三档套餐卡（按量 / 企业 / 专属）
- FAQ 折叠列表

### 5.2 解决方案页

- 4 个场景卡：智能制造 / 政务服务 / 医疗健康 / 教育培训
- 每卡含场景描述 + 3 个要点
- 底部 CTA

### 5.3 文档页

- 左侧目录树，右侧内容
- 三篇：快速开始 / API 参考 / SDK 与示例
- 代码块带语法高亮外观（不引入高亮库，用等宽 + 着色 span）
- 复制按钮

### 5.4 状态页

- 总体状态横幅（全部正常）
- 各组件的可用性条（30 天，每天一个小方块）
- 近期事件列表

### 5.5 协会介绍 / 新闻 / 联系

- 协会介绍：定位、职责、数据、加入方式
- 新闻：列表，6 条，含日期与摘要
- 联系：地址、电话、邮箱、商务合作表单（提交后本地提示成功，不发请求）

---

## 6. 数据结构新增

```
src/
├─ data/
│  ├─ pricing.ts        套餐与计费说明
│  ├─ solutions.ts      解决方案场景
│  ├─ docs.ts           文档内容
│  ├─ status.ts         组件状态与事件
│  ├─ news.ts           新闻列表
│  ├─ console.ts        KPI、趋势、占比、调用记录（全部模拟）
│  └─ playground.ts     预设回复文本
├─ lib/
│  └─ auth.ts           session 读写、手机号校验、Key 生成
├─ components/
│  ├─ console/          ConsoleShell / StatTile / Sparkline / TrendChart / ModelShareBars / UsageTable / KeyDialog
│  ├─ auth/             AuthShell / PhoneForm / CodeInput
│  └─ docs/             DocSidebar / CodeBlock
└─ pages/
   ├─ PricingPage.tsx  SolutionsPage.tsx  DocsPage.tsx  DocDetailPage.tsx
   ├─ StatusPage.tsx   AboutPage.tsx  NewsPage.tsx  ContactPage.tsx
   ├─ LoginPage.tsx    RegisterPage.tsx
   └─ console/         ConsoleHome.tsx  ApiKeysPage.tsx  UsagePage.tsx  PlaygroundPage.tsx
```

---

## 7. 图表实现方式

**不引入图表库**（Recharts / ECharts 会让包体膨胀 200KB+，且默认样式与本设计冲突）。
用 SVG 手绘：

- 折线图：`<path>` 计算路径 + `<line>` 网格 + `<circle>` 端点
- 条形图：`<rect>` + `rx` 圆角
- sparkline：极简 `<polyline>`
- tooltip：绝对定位的 HTML div，随 mousemove 更新

好处：完全可控、零依赖、SSR 友好、体积仅几 KB。

---

## 8. 验收标准

1. `npm run build` 零错误
2. 全站无 `href="#"` 空链接（`#main` 跳转除外）
3. 所有导航项点击后到达真实页面
4. 未登录访问 `/console` 重定向到登录页，登录后回跳原路径
5. 登录态刷新后保持；退出后清除
6. 新建 API Key 后完整 Key 只显示一次，关闭后无法再看到
7. 图表配色通过 `validate_palette.js` 校验（已实测 PASS）
8. 图表有表格视图、hover tooltip、图例（≥2 序列时）
9. 四断点（1440/1024/768/375）无横向溢出
10. 键盘可完成登录、新建 Key、切换用量范围

---

## 9. 明确不做

- 真实后端 / 短信网关 / 支付
- 数据持久化到服务器
- OAuth、第三方登录
- 多语言
