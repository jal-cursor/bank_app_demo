import type {
  BudgetLine,
  Card,
  Contact,
  SpendingPoint,
  Transaction,
  TransferDraft,
  User,
} from '../types'

export const mockUser: User = {
  id: 'u1',
  firstName: 'Gega',
  lastName: 'Lee',
  email: 'yourmail@mail.com',
  phone: '+62 85944123550',
  address: 'Thamrin Ave 17, Bali, Korea',
  avatarUrl: 'https://i.pravatar.cc/150?u=gega',
}

export const mockCards: Card[] = [
  {
    id: 'c1',
    holder: 'Gega Smith',
    brand: 'visa',
    numberMasked: '4756 •••• •••• 9018',
    numberFull: '12345678912356',
    expiry: '02/30',
    balance: 3469.52,
    tier: 'OverBridge Expert',
    gradient: 'dark',
  },
  {
    id: 'c2',
    holder: 'Gega Lee',
    brand: 'mastercard',
    numberMasked: '**** 2236',
    numberFull: '3246223623422',
    expiry: '08/28',
    balance: 5300.0,
    tier: 'Standard',
    gradient: 'blue',
  },
  {
    id: 'c3',
    holder: 'Gega Lee',
    brand: 'visa',
    numberMasked: '**** 8891',
    numberFull: '4532889123456789',
    expiry: '11/29',
    balance: 1200.0,
    tier: 'Premium',
    gradient: 'violet',
  },
]

export const mockContacts: Contact[] = [
  { id: 'p1', name: 'Jane Cooper', cardMasked: '3246 **** **** 3422', avatarUrl: 'https://i.pravatar.cc/150?u=jane' },
  { id: 'p2', name: 'Jacob Jones', cardMasked: '4532 **** **** 1122', avatarUrl: 'https://i.pravatar.cc/150?u=jacob' },
  { id: 'p3', name: 'Esther Howard', cardMasked: '6011 **** **** 4455', avatarUrl: 'https://i.pravatar.cc/150?u=esther' },
  { id: 'p4', name: 'Cameron Williamson', cardMasked: '3782 **** **** 9900', avatarUrl: 'https://i.pravatar.cc/150?u=cameron' },
  { id: 'p5', name: 'Robert Fox', cardMasked: '5105 **** **** 7788', avatarUrl: 'https://i.pravatar.cc/150?u=robert' },
  { id: 'p6', name: 'Leslie Alexander', cardMasked: '4111 **** **** 2233', avatarUrl: 'https://i.pravatar.cc/150?u=leslie' },
  { id: 'p7', name: 'Jenny Wilson', cardMasked: '5500 **** **** 6611', avatarUrl: 'https://i.pravatar.cc/150?u=jenny' },
  { id: 'p8', name: 'Jacob Jones', cardMasked: '4024 **** **** 3399', avatarUrl: 'https://i.pravatar.cc/150?u=jacob2' },
]

export const mockTransactions: Transaction[] = [
  { id: 't1', title: 'Transfer to Jane', subtitle: 'Today, 9:41 AM', date: '2026-06-28', amount: 320, kind: 'reduction', category: 'transfer', icon: 'transfer' },
  { id: 't2', title: 'Salary deposit', subtitle: 'Yesterday', date: '2026-06-27', amount: 3456.98, kind: 'increase', category: 'account', icon: 'account' },
  { id: 't3', title: 'Mobile recharge', subtitle: 'Jun 26', date: '2026-06-26', amount: 25, kind: 'reduction', category: 'recharge', icon: 'recharge' },
  { id: 't4', title: 'Internet bill', subtitle: 'Jun 25', date: '2026-06-25', amount: 60, kind: 'reduction', category: 'paybill', icon: 'paybill' },
  { id: 't5', title: 'ATM withdrawal', subtitle: 'Jun 24', date: '2026-06-24', amount: 200, kind: 'reduction', category: 'withdraw', icon: 'withdraw' },
  { id: 't6', title: 'Refund', subtitle: 'Jun 23', date: '2026-06-23', amount: 45.5, kind: 'increase', category: 'account', icon: 'account' },
  { id: 't7', title: 'Electric bill', subtitle: 'Jun 22', date: '2026-06-22', amount: 460, kind: 'reduction', category: 'paybill', icon: 'paybill' },
  { id: 't8', title: 'Transfer from Robert', subtitle: 'Jun 21', date: '2026-06-21', amount: 150, kind: 'increase', category: 'transfer', icon: 'transfer' },
  { id: 't9', title: 'Shopping', subtitle: 'Jun 20', date: '2026-06-20', amount: 89.99, kind: 'reduction', category: 'creditcard', icon: 'creditcard' },
  { id: 't10', title: 'Subscription', subtitle: 'Jun 19', date: '2026-06-19', amount: 14.99, kind: 'reduction', category: 'report', icon: 'report' },
  { id: 't11', title: 'Cashback', subtitle: 'Jun 18', date: '2026-06-18', amount: 12, kind: 'increase', category: 'account', icon: 'account' },
  { id: 't12', title: 'Water bill', subtitle: 'Jun 17', date: '2026-06-17', amount: 35, kind: 'reduction', category: 'paybill', icon: 'paybill' },
]

export const mockSpending: SpendingPoint[] = [
  { month: 'JAN', amount: 370 },
  { month: 'FEB', amount: 490 },
  { month: 'MAR', amount: 260 },
  { month: 'APR', amount: 300 },
  { month: 'MAY', amount: 550 },
  { month: 'JUN', amount: 300 },
]

export const mockBudgets: BudgetLine[] = [
  { label: 'In Budget', category: 'Shopping', spent: 50, cap: 100, inBudget: true },
  { label: 'Out of Budget', category: 'Subscriptions', spent: 50, cap: 100, inBudget: false },
]

export const moneyInTotal = 3456.98
export const moneyOutTotal = 567.25

export const defaultTransferDraft: TransferDraft = {
  contactId: null,
  amount: 0,
  sourceCardId: 'c2',
}
