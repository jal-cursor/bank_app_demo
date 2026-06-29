import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface CategoryTileProps {
  label: string
  icon: ReactNode
  to: string
}

export function CategoryTile({ label, icon, to }: CategoryTileProps) {
  return (
    <Link
      to={to}
      className="flex h-[100px] w-[100px] flex-col items-center justify-center gap-2 rounded-[16px] bg-white shadow-card-soft transition hover:shadow-card"
    >
      <div className="flex h-10 w-10 items-center justify-center">{icon}</div>
      <span className="px-1 text-center text-[11px] font-medium leading-tight text-neutral">
        {label}
      </span>
    </Link>
  )
}
