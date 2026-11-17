import { PageShell } from '../components/layout/PageShell'
import { Hero } from '../components/home/Hero'
import { StatsBand } from '../components/home/StatsBand'
import { ModelPreview } from '../components/home/ModelPreview'
import { CapabilityBand } from '../components/home/CapabilityBand'
import { CtaBand } from '../components/home/CtaBand'

export default function HomePage() {
  return (
    <PageShell>
      <Hero />
      <StatsBand />
      <ModelPreview />
      <CapabilityBand />
      <CtaBand />
    </PageShell>
  )
}
