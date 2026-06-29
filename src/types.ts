export type Money = number

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  avatarUrl: string
}

export interface Card {
  id: string
  holder: string
  brand: 'visa' | 'mastercard'
  numberMasked: string
  numberFull: string
  expiry: string
  balance: Money
  tier: string
  gradient: 'dark' | 'blue' | 'violet'
}

export type TxnKind = 'increase' | 'reduction'

export type CategoryId =
  | 'account'
  | 'transfer'
  | 'withdraw'
  | 'recharge'
  | 'paybill'
  | 'creditcard'
  | 'report'

export interface Transaction {
  id: string
  title: string
  subtitle: string
  date: string
  amount: Money
  kind: TxnKind
  category: CategoryId
  icon: string
}

export interface Contact {
  id: string
  name: string
  cardMasked: string
  avatarUrl: string
}

export interface SpendingPoint {
  month: string
  amount: Money
}

export interface BudgetLine {
  label: string
  category: string
  spent: Money
  cap: Money
  inBudget: boolean
}

export interface TransferDraft {
  contactId: string | null
  amount: Money
  sourceCardId: string | null
}
