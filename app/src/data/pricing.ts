export const billing = {
  eyebrow: 'PRICING',
  title: '按量计费，用多少算多少',
  lead: '输入与输出 token 分开计价，账单可追溯到单条请求。企业用户可申请月结与专属配额。',
}

export interface Plan {
  name: string
  tagline: string
  price: string
  priceNote: string
  features: string[]
  cta: string
  highlighted?: boolean
}

export const plans: Plan[] = [
  {
    name: '按量付费',
    tagline: '适合个人开发者与小型项目',
    price: '¥0',
    priceNote: '无月费，按实际用量结算',
    features: [
      '全部公开模型',
      'OpenAI 兼容接口',
      '输入 / 输出分开计价',
      '请求级用量明细',
      '社区支持',
    ],
    cta: '免费开始',
  },
  {
    name: '企业版',
    tagline: '适合有稳定调用量的团队',
    price: '按月结算',
    priceNote: '阶梯折扣，用量越大单价越低',
    features: [
      '按量付费全部权益',
      '价格阶梯折扣',
      '月度账单与发票',
      '多成员与权限管理',
      '专属技术对接',
    ],
    cta: '联系商务',
    highlighted: true,
  },
  {
    name: '专属算力',
    tagline: '适合对隔离与合规有要求的机构',
    price: '定制',
    priceNote: '独占算力配额，可私有部署',
    features: [
      '企业版全部权益',
      '独占推理集群',
      '私有模型接入',
      'SLA 99.95% 保障',
      '驻场支持',
    ],
    cta: '咨询方案',
  },
]

export const faqs = [
  {
    q: 'token 是怎么计算的？',
    a: 'token 是模型处理文本的基本单位。中文大约 1 个字对应 1～2 个 token，英文约 4 个字符对应 1 个 token。输入（你的提问）与输出（模型的回答）分别计价。',
  },
  {
    q: '免费额度怎么领取？',
    a: '注册并完成手机号验证后自动到账。免费额度仅适用于按量付费模式，有效期为 30 天。',
  },
  {
    q: '调用失败会扣费吗？',
    a: '不会。只有成功返回完整响应的请求才会计费。超时或服务端错误不计入账单。',
  },
  {
    q: '支持哪些支付方式？',
    a: '个人用户支持在线支付。企业用户可申请对公转账与月结，需提供营业执照与开票信息。',
  },
  {
    q: '可以开具发票吗？',
    a: '可以。充值或月结后可申请增值税普通发票或专用发票，在控制台提交开票信息即可。',
  },
]
