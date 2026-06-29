import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'
import { TextField } from '../../components/TextField'
import { TopNav } from '../../components/TopNav'

export function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState<'phone' | 'code'>('phone')

  return (
    <div className="flex h-full flex-col bg-app-bg">
      <TopNav title="Forgot password" />
      <div className="px-6 pt-4">
        <div className="rounded-[20px] bg-white p-4 shadow-card">
          {step === 'phone' ? (
            <>
              <p className="text-xs text-neutral">Type your phone number</p>
              <div className="mt-3">
                <TextField
                  placeholder="+1 555 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  active={!!phone}
                />
              </div>
              <p className="mt-4 text-sm text-slate-700">
                We texted you a code to verify your phone number
              </p>
              <div className="mt-4">
                <Button state={phone ? 'active' : 'disabled'} onClick={() => setStep('code')}>
                  Continue
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-xs text-neutral">Type a code</p>
              <div className="mt-3 flex gap-2">
                <TextField
                  placeholder="123456"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  active={!!code}
                  className="flex-1"
                />
                <Button fullWidth={false} state="active" className="px-4">
                  Resend
                </Button>
              </div>
              <p className="mt-4 text-sm text-slate-700">
                We texted you a code to verify your phone number ({phone || '(+84) 0398829xxx'})
              </p>
              <p className="mt-2 text-xs text-neutral">
                This code will expired 10 minutes after this message.
              </p>
              <div className="mt-4">
                <Button
                  state={code.length >= 4 ? 'active' : 'disabled'}
                  onClick={() => navigate('/change-password')}
                >
                  Verify
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
