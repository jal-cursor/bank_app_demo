import { useStore } from '../../data/StoreContext'
import { TransactionRow } from '../../components/TransactionRow'
import { SearchIcon } from '../../components/icons'
import { TopNav } from '../../components/TopNav'

export function TransactionHistoryPage() {
  const { transactions } = useStore()

  return (
    <div className="px-4 pt-10">
      <div className="flex items-center justify-between px-2">
        <h1 className="text-lg font-semibold text-slate-900">Recent Transactions</h1>
        <button type="button" aria-label="Search transactions" className="text-neutral">
          <SearchIcon size={22} />
        </button>
      </div>
      <div className="mt-4 rounded-[24px] bg-white px-4 py-2 shadow-card-soft">
        {transactions.map((tx) => (
          <TransactionRow key={tx.id} transaction={tx} />
        ))}
      </div>
    </div>
  )
}

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="px-6 pt-12">
      <TopNav title={title} showBack={false} />
      <p className="mt-8 text-center text-sm text-neutral">Coming in a future phase.</p>
    </div>
  )
}
