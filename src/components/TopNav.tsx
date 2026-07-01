import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon } from './icons'

interface TopNavProps {
  title: string
  variant?: 'black' | 'white' | 'gradient'
  size?: 'default' | 'large'
  onBack?: () => void
  showBack?: boolean
}

export function TopNav({
  title,
  variant = 'black',
  size = 'default',
  onBack,
  showBack = true,
}: TopNavProps) {
  const navigate = useNavigate()

  const textColor =
    variant === 'white' ? 'text-white' : variant === 'gradient' ? 'text-white' : 'text-slate-900'

  const isLarge = size === 'large'

  return (
    <header
      className={`flex items-center px-6 ${textColor} ${isLarge ? 'h-16 gap-3' : 'h-[53px]'}`}
    >
      {showBack ? (
        <button
          type="button"
          aria-label="Go back"
          onClick={onBack ?? (() => navigate(-1))}
          className={`flex items-center ${isLarge ? 'gap-3' : 'gap-2'}`}
        >
          <ChevronLeftIcon size={isLarge ? 24 : 20} />
          <span className={isLarge ? 'text-2xl font-semibold' : 'text-base font-medium'}>
            {title}
          </span>
        </button>
      ) : (
        <h1 className={isLarge ? 'text-2xl font-semibold' : 'text-xl font-semibold'}>{title}</h1>
      )}
    </header>
  )
}

interface HeaderWithBackProps {
  title: string
}

export function HeaderWithBack({ title }: HeaderWithBackProps) {
  const navigate = useNavigate()
  return (
    <div className="flex items-center gap-3">
      <button type="button" aria-label="Go back" onClick={() => navigate(-1)}>
        <ChevronLeftIcon size={20} className="text-slate-800" />
      </button>
      <h1 className="flex-1 text-center text-base font-semibold text-slate-900 pr-8">{title}</h1>
    </div>
  )
}
