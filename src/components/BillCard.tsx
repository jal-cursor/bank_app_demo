import type { ReactNode } from 'react'

interface BillCardProps {
  title: string
  subtitle: string
  illustration: ReactNode
  onClick?: () => void
}

export function BillCard({ title, subtitle, illustration, onClick }: BillCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between gap-3 rounded-card bg-white px-5 py-6 text-left shadow-card transition hover:opacity-95"
    >
      <div className="min-w-0">
        <p className="text-base font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-xs text-neutral-light">{subtitle}</p>
      </div>
      <div className="shrink-0">{illustration}</div>
    </button>
  )
}
