export const solutions = {
  eyebrow: 'SOLUTIONS',
  title: '解决方案',
  lead: '面向长三角的产业场景，把算力与模型能力落到具体的业务问题上。',
}

export interface Solution {
  id: string
  title: string
  subtitle: string
  description: string
  points: string[]
}

export const solutionList: Solution[] = [
  {
    id: 'manufacturing',
    title: '智能制造',
    subtitle: 'MANUFACTURING',
    description:
      '为常州及周边的装备制造、新能源企业提供质检、工艺优化与设备运维的模型能力，数据不出园区。',
    points: ['视觉质检与缺陷识别', '设备日志智能诊断', '工艺知识库问答'],
  },
  {
    id: 'government',
    title: '政务服务',
    subtitle: 'GOVERNMENT',
    description:
      '面向政务大厅与便民热线，提供政策问答、工单分派与材料预审能力，支持私有化部署与审计留痕。',
    points: ['政策智能问答', '工单自动分派', '办事材料预检'],
  },
  {
    id: 'healthcare',
    title: '医疗健康',
    subtitle: 'HEALTHCARE',
    description:
      '辅助病历结构化、医学文献检索与随访管理，符合医疗数据合规要求，模型可院内私有部署。',
    points: ['病历结构化抽取', '医学文献检索', '随访内容生成'],
  },
  {
    id: 'education',
    title: '教育培训',
    subtitle: 'EDUCATION',
    description:
      '为院校与培训机构提供学科答疑、作业批改与个性化学习路径规划，支持校内统一认证接入。',
    points: ['学科智能答疑', '作业自动批改', '学习路径规划'],
  },
]
