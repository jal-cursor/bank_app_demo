import { useState } from 'react'
import type { Card } from '../types'
import { EyeIcon } from './icons'
import { MastercardMark, VisaMark } from './icons'

interface AccountCardProps {
  card: Card
}

export function AccountCard({ card }: AccountCardProps) {
  const [revealed, setRevealed] = useState(false)
  const [enabled, setEnabled] = useState(false)

  return (
    <div className="gradient-card-blue relative overflow-hidden rounded-[20px] px-6 py-8 text-white shadow-card">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold tracking-wide">
          {revealed ? card.numberFull : card.numberMasked.replace(/•/g, '*')}
        </p>
        <button
          type="button"
          aria-label={revealed ? 'Hide card number' : 'Show card number'}
          onClick={() => setRevealed((v) => !v)}
          className="opacity-90"
        >
          <EyeIcon size={22} />
        </button>
      </div>
      <div className="mt-8 flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase opacity-70">Card Holder Name</p>
          <p className="text-sm font-medium">{card.holder}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase opacity-70">Expiry date</p>
          <p className="text-sm font-medium">{card.expiry}</p>
        </div>
        <div className="flex items-center gap-2">
          {card.brand === 'visa' ? <VisaMark className="text-sm" /> : <MastercardMark />}
          <button
            type="button"
            role="switch"
            aria-checked={enabled}
            onClick={() => setEnabled((v) => !v)}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              enabled ? 'bg-white/40' : 'bg-white/20'
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                enabled ? 'left-5' : 'left-0.5'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
