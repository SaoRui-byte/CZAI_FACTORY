import type { ModelCapability } from './models'
import { capabilityLabels } from './models'

export const ALL_CAPABILITY = 'all' as const
export type CapabilityFilter = typeof ALL_CAPABILITY | ModelCapability

export const filterOptions: {
  id: CapabilityFilter
  label: string
}[] = [
  { id: ALL_CAPABILITY, label: '全部' },
  ...(Object.keys(capabilityLabels) as ModelCapability[]).map((c) => ({
    id: c,
    label: capabilityLabels[c],
  })),
]
