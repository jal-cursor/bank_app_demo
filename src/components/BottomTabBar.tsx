import { NavLink } from 'react-router-dom'
import { HomeIcon, MessageIcon, SearchIcon, SettingsIcon } from './icons'

const tabs = [
  { to: '/home', label: 'Home', icon: HomeIcon, end: true },
  { to: '/search', label: 'Search', icon: SearchIcon, end: false },
  { to: '/messages', label: 'Messages', icon: MessageIcon, end: false },
  { to: '/settings', label: 'Settings', icon: SettingsIcon, end: false },
] as const

export function BottomTabBar() {
  return (
    <nav className="absolute bottom-0 left-0 right-0 flex h-[91px] items-start justify-around border-t border-slate-100 bg-white px-4 pt-3">
      {tabs.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          aria-label={label}
          className={({ isActive }) =>
            isActive
              ? 'gradient-primary flex items-center justify-center rounded-full p-2.5 text-white shadow-card'
              : 'flex items-center justify-center p-2.5 text-neutral'
          }
        >
          <Icon size={22} />
        </NavLink>
      ))}
    </nav>
  )
}
