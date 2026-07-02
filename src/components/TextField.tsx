import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  active?: boolean
  rightIcon?: ReactNode
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, active = false, rightIcon, className = '', ...props },
  ref,
) {
  if (label) {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-neutral">{label}</label>
        <div className="relative">
          <input
            ref={ref}
            className={`h-11 w-full rounded-xl border bg-input px-4 text-sm text-slate-800 outline-none ${
              active ? 'border-primary' : 'border-transparent'
            } ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral">
              {rightIcon}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <input
        ref={ref}
        className={`h-11 w-full rounded-full border bg-white px-4 text-sm text-slate-800 outline-none ${
          active ? 'border-primary' : 'border-slate-200'
        } ${className}`}
        {...props}
      />
      {rightIcon && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral">{rightIcon}</div>
      )}
    </div>
  )
})
