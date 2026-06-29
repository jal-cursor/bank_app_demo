import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'
import { TextField } from '../../components/TextField'
import { TopNav } from '../../components/TopNav'
import { ChevronDownIcon } from '../../components/icons'

export function SignUpPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agreed, setAgreed] = useState(false)
  const canSubmit = name && email && password && agreed

  return (
    <div className="flex h-full flex-col">
      <div className="gradient-primary pb-16 pt-12">
        <TopNav title="Sign up" variant="white" onBack={() => navigate('/signin')} />
      </div>
      <div className="-mt-10 flex flex-1 flex-col rounded-t-[32px] bg-white px-8 pt-8">
        <h2 className="text-xl font-semibold text-slate-900">Welcome to us,</h2>
        <p className="mt-1 text-sm text-neutral">Hello there, create New account</p>

        <div className="my-6 flex justify-center">
          <div className="relative flex h-36 w-52 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-violet-100" />
            <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary text-white text-xl">
              ✉
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <TextField placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} active={!!name} />
          <TextField placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} active={!!email} />
          <TextField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            active={!!password}
            rightIcon={<ChevronDownIcon size={16} />}
          />
        </div>

        <label className="mt-4 flex items-start gap-3 text-xs text-neutral">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 accent-primary"
          />
          By creating an account your agree to our Term and Conditions
        </label>

        <div className="mt-6">
          <Button state={canSubmit ? 'active' : 'disabled'} onClick={() => navigate('/home')}>
            Sign up
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-neutral">
          Already have an account?{' '}
          <Link to="/signin" className="font-semibold text-primary">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
