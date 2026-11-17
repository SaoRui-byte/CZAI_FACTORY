/** 控制台模拟数据。全部为演示值，未接入真实后端。 */

export interface Kpi {
  label: string
  value: string
  unit: string
  /** 环比变化，百分比；正为增长 */
  delta: number
  /** 增长是否为好事（延迟上升是坏事） */
  upIsGood: boolean
  spark: number[]
}

export const kpis: Kpi[] = [
  {
    label: '本月调用次数',
    value: '48,210',
    unit: '次',
    delta: 12.4,
    upIsGood: true,
    spark: [22, 26, 24, 31, 29, 35, 38, 34, 41, 44, 43, 48],
  },
  {
    label: '消耗 tokens',
    value: '126.8',
    unit: 'M',
    delta: 8.7,
    upIsGood: true,
    spark: [60, 68, 65, 74, 79, 76, 84, 91, 88, 97, 104, 112],
  },
  {
    label: '可用额度',
    value: '¥2,340',
    unit: '',
    delta: -18.2,
    upIsGood: false,
    spark: [100, 96, 92, 88, 85, 81, 78, 74, 70, 67, 64, 61],
  },
  {
    label: '平均首字延迟',
    value: '0.38',
    unit: 's',
    delta: -6.1,
    upIsGood: false,
    spark: [48, 46, 47, 44, 45, 42, 43, 41, 40, 39, 40, 38],
  },
]

/** 30 天 token 调用量（单位：万 tokens） */
export const tokenTrend: { day: string; value: number }[] = Array.from(
  { length: 30 },
  (_, i) => {
    // 用确定性伪随机，避免每次渲染数据跳动
    const wave = Math.sin(i * 0.62) * 12 + Math.sin(i * 0.21) * 8
    const drift = i * 0.9
    const base = 62 + wave + drift
    return {
      day: `${i + 1}日`,
      value: Math.round(base * 10) / 10,
    }
  },
)

/** 模型调用占比（按调用次数） */
export const modelShare: { name: string; calls: number }[] = [
  { name: 'DeepSeek-V3.2', calls: 18400 },
  { name: 'Qwen3-235B-A22B', calls: 12150 },
  { name: 'GLM-4.6', calls: 8300 },
  { name: 'Kimi-K2-Instruct', calls: 5200 },
  { name: 'DeepSeek-Coder-V2', calls: 2980 },
  { name: '其他', calls: 1180 },
]

export interface CallRecord {
  id: string
  time: string
  model: string
  tokensIn: number
  tokensOut: number
  latencyMs: number
  status: 'ok' | 'error'
}

export const recentCalls: CallRecord[] = [
  {
    id: 'req_8f2a1c',
    time: '14:32:08',
    model: 'DeepSeek-V3.2',
    tokensIn: 1240,
    tokensOut: 386,
    latencyMs: 412,
    status: 'ok',
  },
  {
    id: 'req_7d9b03',
    time: '14:31:52',
    model: 'Qwen3-235B-A22B',
    tokensIn: 860,
    tokensOut: 512,
    latencyMs: 638,
    status: 'ok',
  },
  {
    id: 'req_6c4e77',
    time: '14:31:19',
    model: 'GLM-4.6',
    tokensIn: 2100,
    tokensOut: 274,
    latencyMs: 355,
    status: 'ok',
  },
  {
    id: 'req_5a1f82',
    time: '14:30:47',
    model: 'DeepSeek-V3.2',
    tokensIn: 340,
    tokensOut: 156,
    latencyMs: 298,
    status: 'ok',
  },
  {
    id: 'req_4b8d21',
    time: '14:29:55',
    model: 'Kimi-K2-Instruct',
    tokensIn: 4820,
    tokensOut: 640,
    latencyMs: 1240,
    status: 'error',
  },
]

/** 用量明细（按模型分组） */
export interface UsageRow {
  model: string
  calls: number
  tokensIn: number
  tokensOut: number
  cost: number
}

export const usageByRange: Record<'7d' | '30d' | '90d', UsageRow[]> = {
  '7d': [
    { model: 'DeepSeek-V3.2', calls: 4620, tokensIn: 5_240_000, tokensOut: 1_180_000, cost: 7.6 },
    { model: 'Qwen3-235B-A22B', calls: 2840, tokensIn: 3_120_000, tokensOut: 860_000, cost: 15.7 },
    { model: 'GLM-4.6', calls: 1960, tokensIn: 2_050_000, tokensOut: 540_000, cost: 7.6 },
    { model: 'Kimi-K2-Instruct', calls: 1120, tokensIn: 1_840_000, tokensOut: 310_000, cost: 9.9 },
    { model: 'DeepSeek-Coder-V2', calls: 780, tokensIn: 920_000, tokensOut: 240_000, cost: 1.7 },
  ],
  '30d': [
    { model: 'DeepSeek-V3.2', calls: 18400, tokensIn: 21_400_000, tokensOut: 4_820_000, cost: 31.0 },
    { model: 'Qwen3-235B-A22B', calls: 12150, tokensIn: 13_650_000, tokensOut: 3_940_000, cost: 70.6 },
    { model: 'GLM-4.6', calls: 8300, tokensIn: 8_920_000, tokensOut: 2_310_000, cost: 32.7 },
    { model: 'Kimi-K2-Instruct', calls: 5200, tokensIn: 8_140_000, tokensOut: 1_350_000, cost: 43.3 },
    { model: 'DeepSeek-Coder-V2', calls: 2980, tokensIn: 3_620_000, tokensOut: 980_000, cost: 6.8 },
    { model: '其他', calls: 1180, tokensIn: 1_240_000, tokensOut: 320_000, cost: 4.2 },
  ],
  '90d': [
    { model: 'DeepSeek-V3.2', calls: 52400, tokensIn: 61_200_000, tokensOut: 13_800_000, cost: 88.8 },
    { model: 'Qwen3-235B-A22B', calls: 34800, tokensIn: 39_100_000, tokensOut: 11_300_000, cost: 202.4 },
    { model: 'GLM-4.6', calls: 23900, tokensIn: 25_600_000, tokensOut: 6_620_000, cost: 93.8 },
    { model: 'Kimi-K2-Instruct', calls: 14900, tokensIn: 23_300_000, tokensOut: 3_870_000, cost: 124.1 },
    { model: 'DeepSeek-Coder-V2', calls: 8600, tokensIn: 10_400_000, tokensOut: 2_810_000, cost: 19.5 },
    { model: '其他', calls: 3400, tokensIn: 3_560_000, tokensOut: 920_000, cost: 12.1 },
  ],
}
