import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  defaultTransferDraft,
  defaultWithdrawDraft,
  mockBudgets,
  mockCards,
  mockContacts,
  mockSpending,
  mockTransactions,
  mockUser,
  moneyInTotal,
  moneyOutTotal,
} from './mock'
import type { Card, Contact, Transaction, TransferDraft, WithdrawDraft } from '../types'

interface StoreValue {
  user: typeof mockUser
  cards: Card[]
  contacts: Contact[]
  transactions: Transaction[]
  spending: typeof mockSpending
  budgets: typeof mockBudgets
  moneyInTotal: number
  moneyOutTotal: number
  transferDraft: TransferDraft
  withdrawDraft: WithdrawDraft
  setTransferContact: (contactId: string) => void
  setTransferAmount: (amount: number) => void
  setSourceCard: (cardId: string) => void
  resetTransfer: () => void
  setWithdrawCard: (cardId: string) => void
  setWithdrawAmount: (amount: number) => void
  resetWithdraw: () => void
  confirmWithdraw: () => boolean
  getContact: (id: string) => Contact | undefined
  getCard: (id: string) => Card | undefined
}

const StoreContext = createContext<StoreValue | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [transferDraft, setTransferDraft] = useState<TransferDraft>(defaultTransferDraft)
  const [withdrawDraft, setWithdrawDraft] = useState<WithdrawDraft>(defaultWithdrawDraft)
  const [cards, setCards] = useState<Card[]>(mockCards)
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [moneyOut, setMoneyOut] = useState(moneyOutTotal)

  const setTransferContact = useCallback((contactId: string) => {
    setTransferDraft((d) => ({ ...d, contactId }))
  }, [])

  const setTransferAmount = useCallback((amount: number) => {
    setTransferDraft((d) => ({ ...d, amount }))
  }, [])

  const setSourceCard = useCallback((cardId: string) => {
    setTransferDraft((d) => ({ ...d, sourceCardId: cardId }))
  }, [])

  const resetTransfer = useCallback(() => {
    setTransferDraft(defaultTransferDraft)
  }, [])

  const setWithdrawCard = useCallback((cardId: string) => {
    setWithdrawDraft((d) => ({ ...d, cardId }))
  }, [])

  const setWithdrawAmount = useCallback((amount: number) => {
    setWithdrawDraft((d) => ({ ...d, amount }))
  }, [])

  const resetWithdraw = useCallback(() => {
    setWithdrawDraft(defaultWithdrawDraft)
  }, [])

  const confirmWithdraw = useCallback(() => {
    const { cardId, amount } = withdrawDraft
    if (!cardId || amount <= 0) return false

    const card = cards.find((c) => c.id === cardId)
    if (!card || amount > card.balance) return false

    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, balance: Number((c.balance - amount).toFixed(2)) } : c)),
    )

    const now = new Date()
    const txn: Transaction = {
      id: `w-${now.getTime()}`,
      title: 'ATM withdrawal',
      subtitle: 'Today, Just now',
      date: now.toISOString().slice(0, 10),
      amount,
      kind: 'reduction',
      category: 'withdraw',
      icon: 'withdraw',
    }
    setTransactions((prev) => [txn, ...prev])
    setMoneyOut((prev) => Number((prev + amount).toFixed(2)))
    setWithdrawDraft(defaultWithdrawDraft)
    return true
  }, [cards, withdrawDraft])

  const getContact = useCallback(
    (id: string) => mockContacts.find((c) => c.id === id),
    [],
  )

  const getCard = useCallback((id: string) => cards.find((c) => c.id === id), [cards])

  const value = useMemo<StoreValue>(
    () => ({
      user: mockUser,
      cards,
      contacts: mockContacts,
      transactions,
      spending: mockSpending,
      budgets: mockBudgets,
      moneyInTotal,
      moneyOutTotal: moneyOut,
      transferDraft,
      withdrawDraft,
      setTransferContact,
      setTransferAmount,
      setSourceCard,
      resetTransfer,
      setWithdrawCard,
      setWithdrawAmount,
      resetWithdraw,
      confirmWithdraw,
      getContact,
      getCard,
    }),
    [
      cards,
      transactions,
      moneyOut,
      transferDraft,
      withdrawDraft,
      setTransferContact,
      setTransferAmount,
      setSourceCard,
      resetTransfer,
      setWithdrawCard,
      setWithdrawAmount,
      resetWithdraw,
      confirmWithdraw,
      getContact,
      getCard,
    ],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
