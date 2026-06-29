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
  mockBudgets,
  mockCards,
  mockContacts,
  mockSpending,
  mockTransactions,
  mockUser,
  moneyInTotal,
  moneyOutTotal,
} from './mock'
import type { Card, Contact, TransferDraft } from '../types'

interface StoreValue {
  user: typeof mockUser
  cards: Card[]
  contacts: Contact[]
  transactions: typeof mockTransactions
  spending: typeof mockSpending
  budgets: typeof mockBudgets
  moneyInTotal: number
  moneyOutTotal: number
  transferDraft: TransferDraft
  setTransferContact: (contactId: string) => void
  setTransferAmount: (amount: number) => void
  setSourceCard: (cardId: string) => void
  resetTransfer: () => void
  getContact: (id: string) => Contact | undefined
  getCard: (id: string) => Card | undefined
}

const StoreContext = createContext<StoreValue | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [transferDraft, setTransferDraft] = useState<TransferDraft>(defaultTransferDraft)

  const setTransferContact = useCallback((contactId: string) => {
    setTransferDraft((d) => ({ ...d, contactId, amount: 0 }))
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

  const getContact = useCallback(
    (id: string) => mockContacts.find((c) => c.id === id),
    [],
  )

  const getCard = useCallback(
    (id: string) => mockCards.find((c) => c.id === id),
    [],
  )

  const value = useMemo<StoreValue>(
    () => ({
      user: mockUser,
      cards: mockCards,
      contacts: mockContacts,
      transactions: mockTransactions,
      spending: mockSpending,
      budgets: mockBudgets,
      moneyInTotal,
      moneyOutTotal,
      transferDraft,
      setTransferContact,
      setTransferAmount,
      setSourceCard,
      resetTransfer,
      getContact,
      getCard,
    }),
    [
      transferDraft,
      setTransferContact,
      setTransferAmount,
      setSourceCard,
      resetTransfer,
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
