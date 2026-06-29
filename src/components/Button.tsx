import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'ghost'
type ButtonState = 'active' | 'disabled'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  state?: ButtonState
  fullWidth?: boolean
}

export function Button({
  variant = 'primary',
  state = 'active',
  fullWidth = true,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || state === 'disabled'

  const base =
    'inline-flex h-11 items-center justify-center rounded-full px-6 text-base font-medium transition-opacity'

  const variants: Record<ButtonVariant, string> = {
    primary: isDisabled
      ? 'bg-input text-white/80 cursor-not-allowed'
      : 'gradient-primary text-white shadow-card hover:opacity-95',
    ghost: isDisabled
      ? 'text-neutral-light cursor-not-allowed'
      : 'text-primary font-semibold hover:opacity-80',
  }

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
