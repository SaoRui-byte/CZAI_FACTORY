# CZAI TOKEN FOUNDRY — 词元工厂前端

常州市人工智能协会（CZAI）的 AI 算力与模型服务平台前端。
对标硅基流动，提供统一的大模型调用与算力供给入口。

**纯前端演示项目**：没有后端，登录态与密钥存在浏览器 localStorage，
所有业务数据为静态模拟。详见 [安全边界](#安全边界)。

---

## 快速开始

```bash
cd app
npm install
npm run dev          # http://localhost:5173
```

打开后点页头右上角「登录 / 控制台 →」，再点「一键进入演示账号」，
即可看到预置了用量、密钥与调用记录的控制台。

其他命令：

```bash
npm run build        # 类型检查 + 生产构建
npm run lint         # oxlint
npm run shots        # 多断点截图，输出到 preview/
npm run audit        # 全站路由与流程审计（需先启动 dev）
```

技术栈：React 19 · TypeScript · Vite 8 · Tailwind CSS v4 · Framer Motion · React Router 7。

---

## 目录

```
.
├─ app/                         前端工程（详见 app/README.md）
│  ├─ src/
│  │  ├─ components/            图表 / 控制台 / 认证 / 布局 / 首页 / 模型 / 基础组件
│  │  ├─ data/                  所有文案与模拟数据（改这里即可换内容）
│  │  ├─ lib/                   认证、会话、工具函数
│  │  ├─ pages/                 页面组件
│  │  ├─ router.tsx             全部路由
│  │  └─ index.css              设计令牌（Tailwind @theme）
│  └─ scripts/                  截图与审计脚本（开发用）
├─ docs/superpowers/specs/      设计与实现规格
└─ preview/                     视觉走查截图（由 npm run shots 生成）
```

---

## 页面

### 公开

| 路径 | 说明 |
|---|---|
| `/` | 首页 |
| `/models` | 模型广场（能力筛选 + 搜索） |
| `/pricing` | 价格（套餐 + 模型单价 + FAQ） |
| `/solutions` | 解决方案（4 个行业场景） |
| `/docs` | 文档（快速开始 / API 参考 / SDK） |
| `/status` | 服务状态（30 天可用性 + 事件） |
| `/about` | 协会介绍 |
| `/news` | 新闻动态 |
| `/contact` | 联系我们（表单） |
| `/login` `/register` | 登录 / 注册 |

### 控制台（需登录）

| 路径 | 说明 |
|---|---|
| `/console` | 总览：KPI、30 天趋势图、模型占比、调用记录 |
| `/console/keys` | API Key：新建 / 撤销 / 删除 |
| `/console/usage` | 用量明细：7 / 30 / 90 天 |
| `/console/playground` | 对话测试台：模拟流式输出 |

未登录访问任一 `/console/*` 会重定向到 `/login?next=<原路径>`，登录后自动回跳。

---

## 演示数据

### 演示账号

登录页顶部「一键进入演示账号」，点击即登录，无需输入手机号或验证码。
预置内容：

- 3 个 API Key（其中 1 个已撤销）
- 30 天 Token 调用趋势
- 模型调用占比（6 项）
- 7 / 30 / 90 天三档用量明细
- 5 条最近调用记录

手动登录时验证码固定为 `123456`，页面上有明确标注。

### 替换为真实数据

所有文案与数据都在 `app/src/data/`，组件内无硬编码：

| 文件 | 内容 |
|---|---|
| `site.ts` | 品牌文案、导航、**首页统计数字** |
| `models.ts` | 模型清单与价格 |
| `pricing.ts` | 套餐、FAQ |
| `console.ts` | 控制台 KPI、趋势、占比、用量 |
| `news.ts` | 新闻 |
| `docs.ts` | 文档正文 |
| `status.ts` | 组件状态与事件 |
| `solutions.ts` | 解决方案场景 |

**当前全部是占位数据。** 上线前必须替换，尤其是首页首屏的
`12,480 PFLOPS`、`38 个模型` 这类数字——首页数据对不上比设计不好看更伤。

---

## 设计概要

- **视觉方向**：深色底 + 青蓝紫渐变 + 玻璃卡片 + canvas 流线动效
- **品牌标识**：`CZAI` 主标 + `TOKEN FOUNDRY` 副标 + 「常州市人工智能协会 · 词元工厂」
- **主标语**：让算力，如江入海。
- **字体**：Inter（拉丁）· Noto Sans SC（中文）· Space Grotesk（所有数字）
- **配色令牌**：定义在 `app/src/index.css` 的 `@theme` 块

### 图表配色是独立的一套

品牌青蓝紫**不能**用作分类色。实测（色盲可达性验证器，表面 `#0A1018`）：
紫 `#9B8CFF` 与蓝 `#5B7CFA` 的 CVD ΔE 仅 6.4、正常视力 ΔE 仅 9.8，
低于 15 的硬门槛——正常视力都难以分辨。

因此图表使用经校验的色板：

```
series-1 #3987E5    series-2 #D95926
series-3 #199E70    series-4 #C98500
```

见 `app/src/components/charts/palette.ts`。改动图表配色请重新跑验证器。

图表为手写 SVG，未引入图表库。已落实：2px 折线、10% 面积填充、
1px 实线网格、仅端点标注、hover 准线 + tooltip、独立数据表视图。

---

## 无障碍

- 全站键盘可遍历，`:focus-visible` 青色焦点环
- 「跳到主要内容」跳转链接
- 背景画布 `aria-hidden`
- 图表带 `role="img"` + `aria-label`，并提供表格视图
- 尊重 `prefers-reduced-motion`

---

## 验证

```bash
cd app
npm run dev            # 另一个终端
npm run audit          # 17 个路由 + 登录流程 + 溢出检查
```

最近一次结果：TypeScript 零错误、oxlint 零警告、构建通过、
所有路由横向溢出 0px、控制台无报错、登录重定向与回跳正常。

---

## 安全边界

**这是纯前端演示，以下任一都不能用于生产：**

1. 验证码是固定值 `123456`，没有短信网关
2. 登录态明文存在 `localStorage`，可被任意脚本读取、篡改
3. 没有服务端校验，前端说登录了就登录了
4. API Key 明文存在 `localStorage`，可反复读取（界面上「只显示一次」是真的，但密钥在浏览器里）
5. 联系表单不发请求，数据显示「成功」但数据未离开浏览器

真实实现需要：验证码由服务端下发并校验、会话用 HttpOnly Cookie 或服务端
签发 JWT、所有权限判断在服务端完成、密钥由服务端生成并存哈希且只在创建时返回一次。

---

## 未实现

真实后端与数据库、短信网关、支付与开票、OAuth 登录、多语言。

---

## 相关文档

- [app/README.md](app/README.md) — 前端工程细节
- [docs/superpowers/specs/2026-11-17-czai-token-foundry-design.md](docs/superpowers/specs/2026-11-17-czai-token-foundry-design.md) — 首页与模型广场设计规格
- [docs/superpowers/specs/2026-11-17-czai-pages-expansion-design.md](docs/superpowers/specs/2026-11-17-czai-pages-expansion-design.md) — 页面补齐规格
