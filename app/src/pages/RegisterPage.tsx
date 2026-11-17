import { AuthForm } from '../components/auth/AuthForm'
import { AuthShell } from '../components/auth/AuthShell'
import { RedirectIfAuthed } from '../components/console/guards'

export default function RegisterPage() {
  return (
    <RedirectIfAuthed>
      <AuthShell
        title="注册"
        subtitle="注册即可获得免费试用额度。新用户默认开通按量计费。"
        footer="注册即表示同意协会平台服务条款"
      >
        <AuthForm mode="register" />
      </AuthShell>
    </RedirectIfAuthed>
  )
}
