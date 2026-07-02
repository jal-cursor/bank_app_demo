export function RequestWithdrawIllustration() {
  return (
    <div className="mx-auto flex h-[188px] w-full max-w-[342px] items-center justify-center" aria-hidden>
      <svg viewBox="0 0 280 160" className="h-full w-full">
        <ellipse cx="140" cy="140" rx="70" ry="10" fill="#E8EEFF" />
        <circle cx="88" cy="78" r="34" fill="#D6E4FF" />
        <circle cx="88" cy="64" r="16" fill="#F5C6A0" />
        <rect x="72" y="80" width="32" height="36" rx="10" fill="#4D8DF6" />
        <rect x="130" y="48" width="90" height="70" rx="16" fill="#F0F4FF" stroke="#3629B7" strokeWidth="3" />
        <circle cx="175" cy="83" r="22" fill="#FFAF2A" />
        <text x="175" y="90" textAnchor="middle" fontSize="22" fontWeight="700" fill="#FFFFFF">
          $
        </text>
        <path d="M155 118H195" stroke="#6C4BF4" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export function ConfirmWithdrawIllustration() {
  return (
    <div className="mx-auto flex h-[188px] w-full max-w-[342px] items-center justify-center" aria-hidden>
      <svg viewBox="0 0 280 160" className="h-full w-full">
        <ellipse cx="140" cy="140" rx="70" ry="10" fill="#E8EEFF" />
        <rect x="90" y="30" width="100" height="100" rx="12" fill="#FFFFFF" stroke="#3629B7" strokeWidth="3" />
        <path d="M115 55H165M115 75H160M115 95H145" stroke="#C5C5C5" strokeWidth="4" strokeLinecap="round" />
        <circle cx="190" cy="110" r="20" fill="#52D5BA" />
        <path d="M182 110L188 116L200 102" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export function SuccessWithdrawIllustration() {
  return (
    <div className="mx-auto flex h-[188px] w-full max-w-[342px] items-center justify-center" aria-hidden>
      <svg viewBox="0 0 280 160" className="h-full w-full">
        <ellipse cx="140" cy="140" rx="70" ry="10" fill="#E8EEFF" />
        <circle cx="110" cy="70" r="28" fill="#D6E4FF" />
        <circle cx="110" cy="58" r="14" fill="#F5C6A0" />
        <rect x="96" y="74" width="28" height="32" rx="8" fill="#6C4BF4" />
        <rect x="150" y="50" width="72" height="54" rx="12" fill="#FFF7E6" stroke="#FFAF2A" strokeWidth="3" />
        <text x="186" y="84" textAnchor="middle" fontSize="26" fontWeight="700" fill="#FFAF2A">
          $
        </text>
        <path d="M168 115C176 125 196 125 204 115" stroke="#52D5BA" strokeWidth="4" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  )
}
