import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useStore } from '../../data/StoreContext'
import { formatMoney } from '../../lib/format'
import { AmountChip } from '../../components/AmountChip'
import { Avatar } from '../../components/Avatar'
import { Button } from '../../components/Button'
import { HeaderWithBack } from '../../components/TopNav'
import { ChevronDownIcon, MastercardMark } from '../../components/icons'

const AMOUNT_PRESETS = [50, 100, 320, 500]

function parseAmount(input: string): number {
  const cleaned = input.replace(/[^0-9.]/g, '')
  const parsed = Number.parseFloat(cleaned)
  return Number.isFinite(parsed) ? parsed : 0
}

export function TransferConfirmPage() {
  const navigate = useNavigate()
  const { transferDraft, getContact, getCard, setSourceCard, setTransferAmount } = useStore()
  const contact = transferDraft.contactId ? getContact(transferDraft.contactId) : null
  const sourceCard = transferDraft.sourceCardId ? getCard(transferDraft.sourceCardId) : null

  const [amountText, setAmountText] = useState(() =>
    transferDraft.amount ? String(transferDraft.amount) : '',
  )

  if (!contact) {
    return <Navigate to="/transfer" replace />
  }

  const handleAmountChange = (value: string) => {
    const sanitized = value.replace(/[^0-9.]/g, '')
    setAmountText(sanitized)
    setTransferAmount(parseAmount(sanitized))
  }

  const selectPreset = (preset: number) => {
    setAmountText(String(preset))
    setTransferAmount(preset)
  }

  return (
    <div className="flex h-full flex-col px-6 pt-10">
      <HeaderWithBack title="Transfer money to" />
      <div className="mt-8 flex flex-col items-center">
        <Avatar src={contact.avatarUrl} alt={contact.name} size={62} />
        <p className="mt-4 text-sm font-semibold text-slate-900">{contact.name}</p>
        <p className="text-xs text-neutral">{contact.cardMasked}</p>
        <div className="mt-6 flex items-baseline justify-center text-4xl font-semibold text-slate-900">
          <span>$</span>
          <input
            type="text"
            inputMode="decimal"
            aria-label="Transfer amount"
            value={amountText}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder="0.00"
            className="w-40 bg-transparent text-center outline-none placeholder:text-slate-300"
          />
        </div>
        <p className="text-xs text-neutral">No fee</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {AMOUNT_PRESETS.map((preset) => (
            <AmountChip
              key={preset}
              amount={preset}
              active={transferDraft.amount === preset}
              onClick={() => selectPreset(preset)}
            />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <p className="mb-3 text-center text-sm text-neutral">Select your account</p>
        <button
          type="button"
          onClick={() => setSourceCard('c2')}
          className="flex w-full items-center justify-between rounded-2xl bg-white p-4 shadow-card-soft"
        >
          <div className="flex items-center gap-4">
            <MastercardMark />
            <div className="text-left">
              <p className="text-sm font-semibold">{sourceCard?.numberMasked ?? '**** 2236'}</p>
              <p className="text-xs text-neutral">
                Balance: {formatMoney(sourceCard?.balance ?? 5300)}
              </p>
            </div>
          </div>
          <ChevronDownIcon size={20} className="text-neutral" />
        </button>
      </div>

      <div className="mt-auto pb-6">
        <Button onClick={() => navigate('/transfer/success')}>Send</Button>
      </div>
    </div>
  )
}
