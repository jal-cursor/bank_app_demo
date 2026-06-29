import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'
import { TopNav } from '../../components/TopNav'

export function ChangePasswordPage() {
  const navigate = useNavigate()

  return (
    <div className="flex h-full flex-col bg-app-bg px-6">
      <TopNav title="Change password" />
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="mb-6 flex h-40 w-full items-center justify-center rounded-[20px] bg-violet-50">
          <span className="text-6xl">✓</span>
        </div>
        <h2 className="text-lg font-semibold text-slate-900">Change password successfully!</h2>
        <p className="mt-3 max-w-xs text-sm text-neutral">
          You have successfully change password. Please use the new password when Sign in.
        </p>
        <div className="mt-8 w-full">
          <Button onClick={() => navigate('/signin')}>Back to Sign in</Button>
        </div>
      </div>
    </div>
  )
}
