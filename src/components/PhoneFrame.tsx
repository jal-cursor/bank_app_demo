import type { ReactNode } from 'react'

interface PhoneFrameProps {
  children: ReactNode
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-200 p-4">
      <div className="relative h-[932px] w-[430px] overflow-hidden rounded-[40px] bg-app-bg shadow-2xl">
        {children}
      </div>
    </div>
  )
}
