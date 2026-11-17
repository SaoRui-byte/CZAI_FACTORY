export type ModelCapability =
  | 'chat'
  | 'reasoning'
  | 'code'
  | 'multimodal'
  | 'agent'

export const capabilityLabels: Record<ModelCapability, string> = {
  chat: '对话',
  reasoning: '推理',
  code: '代码',
  multimodal: '多模态',
  agent: '智能体',
}

export interface ModelEntry {
  id: string
  name: string
  vendor: string
  initials: string
  context: string
  capabilities: ModelCapability[]
  description: string
  /** 元 / 百万 tokens */
  priceInput: number
  priceOutput: number
  featured?: boolean
  status: 'online' | 'coming'
}

/** 占位数据 —— 待接入真实模型清单 */
export const models: ModelEntry[] = [
  {
    id: 'deepseek-v3-2',
    name: 'DeepSeek-V3.2',
    vendor: '深度求索',
    initials: 'DS',
    context: '128K',
    capabilities: ['chat', 'code', 'reasoning'],
    description: '通用对话与代码生成，旗舰级综合能力，长上下文稳定。',
    priceInput: 1.0,
    priceOutput: 2.0,
    featured: true,
    status: 'online',
  },
  {
    id: 'qwen3-235b',
    name: 'Qwen3-235B-A22B',
    vendor: '阿里通义',
    initials: 'QW',
    context: '256K',
    capabilities: ['reasoning', 'chat', 'multimodal'],
    description: '强推理与多语言能力，适合复杂任务编排与长文档理解。',
    priceInput: 2.4,
    priceOutput: 9.6,
    featured: true,
    status: 'online',
  },
  {
    id: 'glm-4-6',
    name: 'GLM-4.6',
    vendor: '智谱 AI',
    initials: 'GL',
    context: '200K',
    capabilities: ['agent', 'chat', 'code'],
    description: '工具调用与长程任务，智能体场景的稳定选择。',
    priceInput: 1.8,
    priceOutput: 7.2,
    featured: true,
    status: 'online',
  },
  {
    id: 'kimi-k2',
    name: 'Kimi-K2-Instruct',
    vendor: '月之暗面',
    initials: 'KM',
    context: '256K',
    capabilities: ['chat', 'reasoning'],
    description: '超长文本理解与研究辅助，适合大规模文档分析。',
    priceInput: 3.2,
    priceOutput: 12.8,
    featured: true,
    status: 'online',
  },
  {
    id: 'ernie-4-5',
    name: 'ERNIE-4.5-Turbo',
    vendor: '百度文心',
    initials: 'EB',
    context: '128K',
    capabilities: ['chat', 'multimodal'],
    description: '中文语义理解扎实，适合政务与企业知识问答。',
    priceInput: 1.2,
    priceOutput: 4.8,
    status: 'online',
  },
  {
    id: 'doubao-pro',
    name: 'Doubao-Pro-32K',
    vendor: '字节豆包',
    initials: 'DB',
    context: '32K',
    capabilities: ['chat', 'code'],
    description: '低延迟通用对话，适合高并发在线业务。',
    priceInput: 0.8,
    priceOutput: 2.0,
    status: 'online',
  },
  {
    id: 'minimax-m2',
    name: 'MiniMax-M2',
    vendor: 'MiniMax',
    initials: 'MM',
    context: '200K',
    capabilities: ['agent', 'reasoning'],
    description: '多步工具编排与规划能力突出，适合自动化流程。',
    priceInput: 2.0,
    priceOutput: 8.0,
    status: 'online',
  },
  {
    id: 'step-3',
    name: 'Step-3',
    vendor: '阶跃星辰',
    initials: 'ST',
    context: '128K',
    capabilities: ['multimodal', 'reasoning'],
    description: '原生多模态理解，支持图文混合输入。',
    priceInput: 2.6,
    priceOutput: 10.4,
    status: 'coming',
  },
  {
    id: 'hunyuan-t1',
    name: 'Hunyuan-T1',
    vendor: '腾讯混元',
    initials: 'HY',
    context: '128K',
    capabilities: ['reasoning', 'chat'],
    description: '深度推理链路可视化，适合分析与论证类任务。',
    priceInput: 1.6,
    priceOutput: 6.4,
    status: 'coming',
  },
  {
    id: 'deepseek-coder',
    name: 'DeepSeek-Coder-V2',
    vendor: '深度求索',
    initials: 'DC',
    context: '128K',
    capabilities: ['code'],
    description: '代码补全与仓库级重构，覆盖主流编程语言。',
    priceInput: 0.9,
    priceOutput: 3.6,
    status: 'online',
  },
  {
    id: 'internlm-3',
    name: 'InternLM3-8B',
    vendor: '上海 AI Lab',
    initials: 'IL',
    context: '32K',
    capabilities: ['chat', 'code'],
    description: '轻量高性价比，适合边缘部署与批量任务。',
    priceInput: 0.4,
    priceOutput: 1.2,
    status: 'online',
  },
  {
    id: 'glm-4v',
    name: 'GLM-4V-Plus',
    vendor: '智谱 AI',
    initials: 'GV',
    context: '64K',
    capabilities: ['multimodal'],
    description: '图像与视频理解，适合质检、票据与场景识别。',
    priceInput: 3.0,
    priceOutput: 12.0,
    status: 'online',
  },
]

export const featuredModels = models.filter((m) => m.featured)
