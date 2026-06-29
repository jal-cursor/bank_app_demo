import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'
import { TextField } from '../../components/TextField'
import { TopNav } from '../../components/TopNav'
import { ChevronDownIcon } from '../../components/icons'

export function SignInPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const canSubmit = email.length > 0 && password.length > 0

  return (
    <div className="flex h-full flex-col">
      <div className="gradient-primary pb-16 pt-12">
        <TopNav title="Sign in" variant="white" onBack={() => navigate('/')} />
      </div>
      <div className="-mt-10 flex flex-1 flex-col rounded-t-[32px] bg-white px-8 pt-8">
        <h2 className="text-xl font-semibold text-slate-900">Welcome Back</h2>
        <p className="mt-1 text-sm text-neutral">Hello there, sign in to continue</p>

        <div className="my-8 flex justify-center">
          <div className="relative flex h-40 w-52 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-violet-100" />
            <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary">
              <span className="text-2xl text-white">🔒</span>
            </div>
            <span className="absolute left-2 top-4 h-3 w-3 rounded-full bg-primary" />
            <span className="absolute right-4 top-8 h-3 w-3 rounded-full bg-semantic-red" />
            <span className="absolute bottom-6 left-6 h-3 w-3 rounded-full bg-semantic-teal" />
            <span className="absolute bottom-10 right-2 h-3 w-3 rounded-full bg-semantic-amber" />
          </div>
        </div>

        <div className="space-y-4">
          <TextField
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rightIcon={<ChevronDownIcon size={16} />}
          />
        </div>

        <Link to="/forgot-password" className="mt-3 block text-right text-xs text-neutral">
          Forgot your password ?
        </Link>

        <div className="mt-6">
          <Button state={canSubmit ? 'active' : 'disabled'} onClick={() => navigate('/home')}>
            Sign in
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-neutral">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="font-semibold text-primary">
            Sign Up
          </Link>
        </p>
      </div>
      <div className="pointer-events-none h-16 gradient-primary [clip-path:ellipse(90%_100%_at_50%_100%)]" />
    </div>
  )
}
