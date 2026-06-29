import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useStore } from '../../data/StoreContext'
import { formatMoney } from '../../lib/format'
import { Avatar } from '../../components/Avatar'
import { Button } from '../../components/Button'
import { AmountChip } from '../../components/AmountChip'
import { HeaderWithBack } from '../../components/TopNav'

const QUICK_AMOUNTS = [50, 100, 200, 500]

export function TransferAmountPage() {
  const navigate = useNavigate()
  const { transferDraft, getContact, getCard, setTransferAmount } = useStore()
  const contact = transferDraft.contactId ? getContact(transferDraft.contactId) : null
  const sourceCard = transferDraft.sourceCardId ? getCard(transferDraft.sourceCardId) : null
  const balance = sourceCard?.balance ?? 0

  const [value, setValue] = useState(() =>
    transferDraft.amount > 0 ? String(transferDraft.amount) : '',
  )

  if (!contact) {
    return <Navigate to="/transfer" replace />
  }

  const amount = Number(value)
  const isValidNumber = value !== '' && Number.isFinite(amount) && amount > 0
  const exceedsBalance = isValidNumber && amount > balance
  const canContinue = isValidNumber && !exceedsBalance

  const handleChange = (next: string) => {
    if (next === '' || /^\d*(\.\d{0,2})?$/.test(next)) {
      setValue(next)
    }
  }

  const handleContinue = () => {
    if (!canContinue) return
    setTransferAmount(amount)
    navigate('/transfer/confirm')
  }

  return (
    <div className="flex h-full flex-col px-6 pt-10">
      <HeaderWithBack title="Enter amount" />

      <div className="mt-8 flex flex-col items-center">
        <Avatar src={contact.avatarUrl} alt={contact.name} size={62} />
        <p className="mt-4 text-sm font-semibold text-slate-900">{contact.name}</p>
        <p className="text-xs text-neutral">{contact.cardMasked}</p>
      </div>

      <div className="mt-10 flex flex-col items-center">
        <div className="flex items-center justify-center text-4xl font-semibold text-slate-900">
          <span className="mr-1 text-neutral">$</span>
          <input
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            inputMode="decimal"
            aria-label="Transfer amount"
            placeholder="0"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleContinue()
            }}
            className="w-44 bg-transparent text-center outline-none placeholder:text-slate-300"
          />
        </div>
        <p
          className={`mt-2 text-xs ${exceedsBalance ? 'text-semantic-red' : 'text-neutral'}`}
        >
          {exceedsBalance
            ? 'Amount exceeds available balance'
            : `Available balance: ${formatMoney(balance)}`}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 place-items-center gap-3">
        {QUICK_AMOUNTS.map((q) => (
          <AmountChip
            key={q}
            amount={q}
            active={isValidNumber && amount === q}
            onClick={() => setValue(String(q))}
          />
        ))}
      </div>

      <div className="mt-auto pb-6">
        <Button state={canContinue ? 'active' : 'disabled'} onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  )
}
