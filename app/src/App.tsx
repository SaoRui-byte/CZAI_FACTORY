import { MotionConfig } from 'framer-motion'
import { AppRouter } from './router'

export default function App() {
  // reducedMotion="user"：系统开启「减少动态效果」时，跳过位移/缩放等
  // 会引起不适的动画，仅保留透明度过渡。
  return (
    <MotionConfig reducedMotion="user">
      <AppRouter />
    </MotionConfig>
  )
}
