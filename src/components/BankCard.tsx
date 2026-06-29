import type { Card } from '../types'
import { formatMoney } from '../lib/format'
import { MastercardMark, VisaMark } from './icons'

const gradientClass: Record<Card['gradient'], string> = {
  dark: 'gradient-card-dark',
  blue: 'gradient-card-blue',
  violet: 'bg-gradient-to-br from-violet-500 to-purple-700',
}

interface BankCardProps {
  card: Card
  compact?: boolean
}

export function BankCard({ card, compact = false }: BankCardProps) {
  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-[20px] p-5 text-white shadow-card ${gradientClass[card.gradient]} ${
        compact ? 'h-[180px]' : 'h-[200px]'
      }`}
    >
      <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-teal-400/40 blur-sm" />
      <p className="text-sm font-medium opacity-90">{card.holder}</p>
      <p className="text-xs opacity-70">{card.tier}</p>
      <p className="mt-4 text-sm tracking-widest">{card.numberMasked}</p>
      <div className="mt-auto flex items-end justify-between pt-4">
        <p className="text-2xl font-semibold">{formatMoney(card.balance)}</p>
        {card.brand === 'visa' ? <VisaMark /> : <MastercardMark />}
      </div>
    </div>
  )
}
