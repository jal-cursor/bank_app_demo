import { Navigate, useNavigate } from 'react-router-dom'
import { useStore } from '../../data/StoreContext'
import { Button } from '../../components/Button'
import { TextField } from '../../components/TextField'
import { HeaderWithBack } from '../../components/TopNav'
import { brandLabel, formatAmountField } from '../../lib/format'
import { ConfirmWithdrawIllustration } from './WithdrawIllustrations'

export function WithdrawConfirmPage() {
  const navigate = useNavigate()
  const { withdrawDraft, getCard, confirmWithdraw } = useStore()
  const card = withdrawDraft.cardId ? getCard(withdrawDraft.cardId) : null

  if (!card || withdrawDraft.amount <= 0) {
    return <Navigate to="/withdraw" replace />
  }

  const canConfirm = withdrawDraft.amount > 0 && withdrawDraft.amount <= card.balance

  return (
    <div className="flex h-full flex-col px-6 pt-10">
      <HeaderWithBack title="Confirm" />
      <div className="mt-6">
        <ConfirmWithdrawIllustration />
      </div>

      <div className="mt-4 space-y-4">
        <TextField
          placeholder="Bank account"
          value={brandLabel(card.brand)}
          active
          readOnly
        />
        <TextField
          placeholder="Account number"
          value={card.numberFull}
          active
          readOnly
        />
        <div>
          <p className="mb-2 text-sm font-medium text-neutral">Choose amount</p>
          <TextField
            placeholder="Amount"
            value={formatAmountField(withdrawDraft.amount)}
            active
            readOnly
          />
        </div>
      </div>

      <div className="mt-auto pb-6 pt-8">
        <Button
          state={canConfirm ? 'active' : 'disabled'}
          disabled={!canConfirm}
          onClick={() => {
            if (confirmWithdraw()) {
              navigate('/withdraw/success')
            }
          }}
        >
          Confirm
        </Button>
      </div>
    </div>
  )
}
