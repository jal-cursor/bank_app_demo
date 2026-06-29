interface AmountChipProps {
  amount: number
  active?: boolean
  onClick?: () => void
}

export function AmountChip({ amount, active = false, onClick }: AmountChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[60px] w-[100px] items-center justify-center rounded-xl text-base font-semibold transition ${
        active
          ? 'gradient-primary text-white shadow-card'
          : 'border border-slate-200 bg-white text-slate-800'
      }`}
    >
      ${amount}
    </button>
  )
}
