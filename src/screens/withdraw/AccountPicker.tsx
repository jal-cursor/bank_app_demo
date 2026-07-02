import { brandLabel, formatAccountNumber, formatMoney } from '../../lib/format'
import type { Card } from '../../types'
import { CheckIcon, CloseIcon } from '../../components/icons'

interface AccountPickerProps {
  cards: Card[]
  selectedId: string | null
  onSelect: (cardId: string) => void
  onClose: () => void
}

export function AccountPicker({ cards, selectedId, onSelect, onClose }: AccountPickerProps) {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/35 px-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Choose account"
        className="w-full max-w-[327px] rounded-[15px] bg-white px-4 py-5 shadow-[0_5px_30px_rgba(0,0,0,0.15)]"
      >
        <div className="relative mb-4 flex items-center justify-center">
          <p className="text-base font-bold text-[#343434]">Choose account:</p>
          <button
            type="button"
            aria-label="Close account picker"
            onClick={onClose}
            className="absolute right-0 text-neutral"
          >
            <CloseIcon size={16} />
          </button>
        </div>
        <ul className="space-y-2">
          {cards.map((card) => {
            const selected = card.id === selectedId
            return (
              <li key={card.id}>
                <button
                  type="button"
                  onClick={() => onSelect(card.id)}
                  aria-pressed={selected}
                  className={`flex min-h-14 w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition active:scale-[0.99] ${
                    selected
                      ? 'bg-primary/10 text-primary'
                      : 'bg-transparent text-neutral hover:bg-app-bg active:bg-app-bg'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium opacity-80">{brandLabel(card.brand)}</p>
                    <p className="truncate text-base font-bold tracking-wide">
                      {formatAccountNumber(card.numberFull)}
                    </p>
                    <p className={`text-xs ${selected ? 'text-primary/80' : 'text-neutral-light'}`}>
                      Available: {formatMoney(card.balance)}
                    </p>
                  </div>
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center" aria-hidden>
                    {selected ? <CheckIcon size={16} className="text-primary" /> : null}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
