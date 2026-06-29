import type { Transaction } from '../types'
import { formatMoney } from '../lib/format'
import {
  BillIcon,
  CreditCardIcon,
  RechargeIcon,
  ReportIcon,
  TransferIcon,
  WalletIcon,
  WithdrawIcon,
} from './icons'

import type { ReactNode } from 'react'

const iconMap: Record<string, ReactNode> = {
  account: <WalletIcon size={20} />,
  transfer: <TransferIcon size={20} />,
  withdraw: <WithdrawIcon size={20} />,
  recharge: <RechargeIcon size={20} />,
  paybill: <BillIcon size={20} />,
  creditcard: <CreditCardIcon size={20} />,
  report: <ReportIcon size={20} />,
}

interface TransactionRowProps {
  transaction: Transaction
}

export function TransactionRow({ transaction }: TransactionRowProps) {
  const sign = transaction.kind === 'increase' ? '+' : '-'
  const color = transaction.kind === 'increase' ? 'text-semantic-teal' : 'text-semantic-red'

  return (
    <div className="flex items-center gap-3 py-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50">
        {iconMap[transaction.icon] ?? iconMap.account}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-slate-900">{transaction.title}</p>
        <p className="text-xs text-neutral">{transaction.subtitle}</p>
      </div>
      <p className={`text-sm font-semibold ${color}`}>
        {sign} {formatMoney(transaction.amount).replace('$ ', '$')}
      </p>
    </div>
  )
}
