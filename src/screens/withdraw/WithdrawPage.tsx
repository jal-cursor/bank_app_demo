import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { withdrawAmounts } from '../../data/mock'
import { useStore } from '../../data/StoreContext'
import { AmountChip } from '../../components/AmountChip'
import { Button } from '../../components/Button'
import { TextField } from '../../components/TextField'
import { HeaderWithBack } from '../../components/TopNav'
import { ChevronDownIcon } from '../../components/icons'
import {
  cardSelectionLabel,
  formatAmountField,
  formatMoney,
  parseAmountField,
} from '../../lib/format'
import { AccountPicker } from './AccountPicker'
import { RequestWithdrawIllustration } from './WithdrawIllustrations'

export function WithdrawPage() {
  const navigate = useNavigate()
  const { cards, withdrawDraft, setWithdrawCard, setWithdrawAmount, getCard } =
    useStore()
  const [pickerOpen, setPickerOpen] = useState(false)
  const [otherActive, setOtherActive] = useState(false)
  const amountInputRef = useRef<HTMLInputElement>(null)

  const selectedCard = withdrawDraft.cardId ? getCard(withdrawDraft.cardId) : null
  const amount = withdrawDraft.amount
  const presetActive = useMemo(
    () => (otherActive ? null : (withdrawAmounts.find((v) => v === amount) ?? null)),
    [amount, otherActive],
  )

  const exceedsBalance = Boolean(selectedCard && amount > selectedCard.balance)
  const canVerify = Boolean(selectedCard && amount > 0 && !exceedsBalance)

  return (
    <div className="relative flex h-full flex-col px-6 pt-10">
      <HeaderWithBack title="Request Withdraw" />
      <div className="mt-4">
        <RequestWithdrawIllustration />
      </div>

      <div className="mt-2 space-y-4">
        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className={`relative flex h-11 w-full items-center rounded-full border bg-white px-4 text-left text-sm outline-none ${
            selectedCard ? 'border-primary text-slate-800' : 'border-slate-200 text-neutral'
          }`}
        >
          <span className="flex-1 truncate">
            {selectedCard ? cardSelectionLabel(selectedCard) : 'Select Bank Account'}
          </span>
          <ChevronDownIcon size={18} className="text-neutral" />
        </button>

        <TextField
          ref={amountInputRef}
          placeholder="Amount"
          inputMode="decimal"
          value={formatAmountField(amount)}
          active={amount > 0}
          onChange={(e) => {
            setOtherActive(true)
            setWithdrawAmount(parseAmountField(e.target.value))
          }}
          onFocus={() => setOtherActive(true)}
        />
        {selectedCard && (
          <p className="px-1 text-xs text-neutral">
            Available: {formatMoney(selectedCard.balance)}
          </p>
        )}
        {exceedsBalance && (
          <p className="px-1 text-xs text-semantic-red">Amount exceeds available balance</p>
        )}
      </div>

      <p className="mt-5 text-sm font-medium text-neutral">Choose amount</p>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {withdrawAmounts.map((value) => (
          <AmountChip
            key={value}
            amount={value}
            active={presetActive === value}
            onClick={() => {
              setOtherActive(false)
              setWithdrawAmount(value)
            }}
          />
        ))}
        <button
          type="button"
          onClick={() => {
            setOtherActive(true)
            amountInputRef.current?.focus()
          }}
          className={`flex h-[60px] w-full items-center justify-center rounded-xl text-base font-semibold transition ${
            otherActive && presetActive === null
              ? 'gradient-primary text-white shadow-card'
              : 'border border-slate-200 bg-white text-slate-800'
          }`}
        >
          Other
        </button>
      </div>

      <div className="mt-auto pb-6 pt-8">
        <Button
          state={canVerify ? 'active' : 'disabled'}
          disabled={!canVerify}
          onClick={() => navigate('/withdraw/confirm')}
        >
          {canVerify ? 'Verify' : 'Confirm'}
        </Button>
      </div>

      {pickerOpen && (
        <AccountPicker
          cards={cards}
          selectedId={withdrawDraft.cardId}
          onSelect={(cardId) => {
            setWithdrawCard(cardId)
            setPickerOpen(false)
          }}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </div>
  )
}
