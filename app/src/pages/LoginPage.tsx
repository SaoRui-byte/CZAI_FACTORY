import { AuthForm } from '../components/auth/AuthForm'
import { AuthShell } from '../components/auth/AuthShell'
import { RedirectIfAuthed } from '../components/console/guards'

export default function LoginPage() {
  return (
    <RedirectIfAuthed>
      <AuthShell
        title="登录"
        subtitle="使用手机号验证码登录，继续使用算力与模型服务。"
        footer="常州市人工智能协会 · 词元工厂"
      >
        <AuthForm mode="login" />
      </AuthShell>
    </RedirectIfAuthed>
  )
}
