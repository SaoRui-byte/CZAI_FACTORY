export interface ComponentStatus {
  name: string
  description: string
  /** 30 天可用性，true 为正常 */
  days: boolean[]
  uptime: number
}

function days(incidentIndexes: number[] = []): boolean[] {
  return Array.from({ length: 30 }, (_, i) => !incidentIndexes.includes(i))
}

export const components: ComponentStatus[] = [
  {
    name: '模型推理 API',
    description: 'chat/completions 端点',
    days: days([17]),
    uptime: 99.96,
  },
  {
    name: '流式输出服务',
    description: 'SSE 流式响应',
    days: days(),
    uptime: 100,
  },
  {
    name: '控制台',
    description: 'Web 控制台与用量查询',
    days: days([4, 5]),
    uptime: 99.91,
  },
  {
    name: '模型广场',
    description: '模型目录与文档',
    days: days(),
    uptime: 100,
  },
]

export interface StatusEvent {
  date: string
  title: string
  status: 'resolved' | 'monitoring' | 'investigating'
  detail: string
}

export const events: StatusEvent[] = [
  {
    date: '2026-11-03',
    title: '模型推理 API 延迟升高',
    status: 'resolved',
    detail:
      '部分请求首字延迟升至 1.2 秒，持续约 14 分钟。已通过扩容推理节点解决，期间请求未计费。',
  },
  {
    date: '2026-10-21',
    title: '控制台用量查询短时不可用',
    status: 'resolved',
    detail: '用量统计查询接口返回 502，影响约 8 分钟。模型调用未受影响。',
  },
  {
    date: '2026-10-09',
    title: '计划内维护',
    status: 'resolved',
    detail: '完成推理集群升级，新增两个可用区。维护窗口内服务无中断。',
  },
]

export const statusLabel: Record<StatusEvent['status'], string> = {
  resolved: '已解决',
  monitoring: '观察中',
  investigating: '排查中',
}
