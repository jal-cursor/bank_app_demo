import type { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { PhoneFrame } from '../components/PhoneFrame'
import { BottomTabBar } from '../components/BottomTabBar'

interface MainLayoutProps {
  children?: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <PhoneFrame>
      <div className="relative flex h-full flex-col overflow-hidden bg-app-bg">
        <div className="flex-1 overflow-y-auto pb-[100px]">{children ?? <Outlet />}</div>
        <BottomTabBar />
      </div>
    </PhoneFrame>
  )
}
