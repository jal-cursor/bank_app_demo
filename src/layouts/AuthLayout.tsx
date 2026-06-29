import type { ReactNode } from 'react'
import { PhoneFrame } from '../components/PhoneFrame'

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <PhoneFrame>
      <div className="relative h-full overflow-hidden bg-white">{children}</div>
    </PhoneFrame>
  )
}
