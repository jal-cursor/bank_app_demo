import { useNavigate } from 'react-router-dom'
import { useStore } from '../../data/StoreContext'
import { Button } from '../../components/Button'
import { SuccessWithdrawIllustration } from './WithdrawIllustrations'

export function WithdrawSuccessPage() {
  const navigate = useNavigate()
  const { resetWithdraw } = useStore()

  return (
    <div className="flex h-full flex-col items-center px-8 pt-20 text-center">
      <SuccessWithdrawIllustration />
      <h2 className="mt-8 text-base font-semibold text-slate-900">Successful withdrawal!</h2>
      <p className="mt-4 text-sm leading-relaxed text-neutral">
        You have successfully withdrawn money! Please check the balance in the card management
        section.
      </p>
      <div className="mt-10 w-full">
        <Button
          onClick={() => {
            resetWithdraw()
            navigate('/cards')
          }}
        >
          Confirm
        </Button>
      </div>
    </div>
  )
}
