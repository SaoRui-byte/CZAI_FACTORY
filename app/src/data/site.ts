/**
 * 站点文案与数据配置
 * ------------------------------------------------------------
 * 首页首屏的所有数字都集中在此文件。替换真实口径时只改这里，
 * 全站自动生效。严禁在组件内硬编码统计数字。
 */

export const brand = {
  short: 'CZAI',
  wordmark: 'TOKEN FOUNDRY',
  fullName: '常州市人工智能协会',
  productName: '词元工厂',
  /** 页头小字与页脚副标 */
  lockupSub: '常州市人工智能协会 · 词元工厂',
  region: '常州 · 江苏',
} as const

export const hero = {
  badge: '常州市人工智能协会 · 词元工厂',
  titleLead: '让算力，',
  titleAccent: '如江入海。',
  lead: '统一的模型调用与算力供给，让智能像江水一样自由流动 —— 可计量、可追溯、随取随用。',
  primaryCta: { label: '进入模型广场', href: '/models' },
  secondaryCta: { label: '阅读文档', href: '/docs' },
}

export interface StatItem {
  value: string
  unit: string
  label: string
}

/** 首页统计条 —— 占位数据，待替换为真实口径 */
export const stats: StatItem[] = [
  { value: '12,480', unit: 'PFLOPS', label: '智能算力总规模' },
  { value: '38', unit: '个', label: '可调用大模型' },
  { value: '2,600', unit: '+', label: '注册开发者' },
  { value: '99.95', unit: '%', label: '服务可用性' },
]

export interface Capability {
  index: string
  title: string
  description: string
  points: string[]
}

export const capabilities: Capability[] = [
  {
    index: '01',
    title: '统一 API',
    description:
      '一套接口兼容主流模型协议，切换模型不改代码。OpenAI 兼容端点开箱即用。',
    points: ['OpenAI 兼容', '流式输出', '多模型热切换'],
  },
  {
    index: '02',
    title: '弹性算力',
    description:
      '按需伸缩的推理集群，峰值自动扩容。无需自建机房，也无需提前承诺用量。',
    points: ['按量计费', '自动扩容', '多可用区'],
  },
  {
    index: '03',
    title: '可计量计费',
    description:
      '每次调用的输入输出 token 逐条留痕，账单可追溯到请求级，支持企业月结。',
    points: ['请求级留痕', '用量看板', '企业月结'],
  },
]

export const ctaBand = {
  eyebrow: 'GET STARTED',
  title: '开始接入',
  description:
    '注册即可获得免费额度。企业用户可申请专属算力配额与技术对接支持。',
  primary: { label: '创建 API Key', href: '/console/keys' },
  secondary: { label: '联系商务', href: '/contact' },
}

export const nav = [
  { label: '模型广场', href: '/models' },
  { label: '解决方案', href: '/solutions' },
  { label: '价格', href: '/pricing' },
  { label: '文档', href: '/docs' },
  { label: '服务状态', href: '/status' },
]

export const footerGroups = [
  {
    title: '产品',
    links: [
      { label: '模型广场', href: '/models' },
      { label: '解决方案', href: '/solutions' },
      { label: '价格', href: '/pricing' },
    ],
  },
  {
    title: '开发者',
    links: [
      { label: '文档', href: '/docs' },
      { label: 'API 参考', href: '/docs/api-reference' },
      { label: '服务状态', href: '/status' },
    ],
  },
  {
    title: '关于',
    links: [
      { label: '协会介绍', href: '/about' },
      { label: '新闻动态', href: '/news' },
      { label: '联系方式', href: '/contact' },
    ],
  },
]
