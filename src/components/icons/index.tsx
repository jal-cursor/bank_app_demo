import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function base({ size = 24, className, ...props }: IconProps) {
  return { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', className, ...props }
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function EyeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function HomeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M4 10.5L12 4L20 10.5V19C20 19.55 19.55 20 19 20H5C4.45 20 4 19.55 4 19V10.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 20V14H15V20" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

export function MessageIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 8L12 13L21 8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

export function SettingsIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function WalletIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <rect x="2" y="6" width="20" height="14" rx="2" fill="#3629B7" opacity="0.15" />
      <path d="M2 8C2 6.9 2.9 6 4 6H18C19.1 6 20 6.9 20 8V10H4C2.9 10 2 9.1 2 8Z" fill="#3629B7" />
      <rect x="14" y="12" width="8" height="6" rx="1" fill="#3629B7" />
    </svg>
  )
}

export function TransferIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <rect x="3" y="4" width="8" height="14" rx="2" fill="#FF4267" opacity="0.2" />
      <rect x="13" y="6" width="8" height="14" rx="2" fill="#FF4267" opacity="0.35" />
      <path d="M10 10H14M14 10L12 8M14 10L12 12" stroke="#FF4267" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function WithdrawIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <rect x="4" y="3" width="16" height="18" rx="2" fill="#0890FE" opacity="0.2" />
      <rect x="7" y="7" width="10" height="6" rx="1" fill="#0890FE" />
      <rect x="9" y="16" width="6" height="2" rx="1" fill="#0890FE" />
    </svg>
  )
}

export function RechargeIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <rect x="7" y="2" width="10" height="20" rx="2" fill="#FB6B18" opacity="0.2" />
      <rect x="9" y="4" width="6" height="16" rx="1" fill="#FB6B18" />
      <path d="M12 8V14M9.5 11H14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function BillIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M6 3H18C19.1 3 20 3.9 20 5V21L12 17L4 21V5C4 3.9 4.9 3 6 3Z" fill="#52D5BA" opacity="0.25" />
      <path d="M8 8H16M8 12H14" stroke="#52D5BA" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function CreditCardIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <rect x="2" y="5" width="20" height="14" rx="2" fill="#FB6B18" opacity="0.2" />
      <rect x="2" y="9" width="20" height="4" fill="#FB6B18" />
      <rect x="5" y="15" width="6" height="2" rx="1" fill="#FB6B18" />
    </svg>
  )
}

export function ReportIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <rect x="4" y="3" width="16" height="18" rx="2" fill="#3629B7" opacity="0.15" />
      <path d="M8 16V11M12 16V8M16 16V13" stroke="#3629B7" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function VisaMark({ className }: { className?: string }) {
  return (
    <span className={`font-semibold italic tracking-wide text-white ${className ?? ''}`} style={{ fontSize: 18 }}>
      VISA
    </span>
  )
}

export function MastercardMark({ className }: { className?: string }) {
  return (
    <span className={`inline-flex ${className ?? ''}`}>
      <span className="h-5 w-5 rounded-full bg-[#EB001B]" />
      <span className="-ml-2 h-5 w-5 rounded-full bg-[#F79E1B]" />
    </span>
  )
}

export function TrendUpIcon(props: IconProps) {
  return (
    <svg {...base({ size: 16, ...props })}>
      <path d="M2 12L6 8L10 10L14 4L22 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M5 12L10 17L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

