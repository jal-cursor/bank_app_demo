import { useStore } from '../../data/StoreContext'
import { formatMoney } from '../../lib/format'
import { SpendingBarChart } from '../../components/SpendingBarChart'
import { TrendUpIcon } from '../../components/icons'

export function TransactionReportPage() {
  const { moneyInTotal, moneyOutTotal, spending, budgets } = useStore()

  return (
    <div className="px-6 pt-12 pb-6">
      <h1 className="text-xl font-semibold text-slate-900">Transaction Report</h1>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-[16px] bg-card-muted p-4 text-white">
          <p className="text-xs opacity-80">Money In</p>
          <div className="mt-2 flex items-end justify-between">
            <p className="text-lg font-semibold">{formatMoney(moneyInTotal, true)}</p>
            <TrendUpIcon className="text-white/80" />
          </div>
        </div>
        <div className="gradient-primary rounded-[16px] p-4 text-white">
          <p className="text-xs opacity-80">Money Out</p>
          <div className="mt-2 flex items-end justify-between">
            <p className="text-lg font-semibold">- {formatMoney(moneyOutTotal).replace('$ ', '$')}</p>
            <TrendUpIcon className="text-white/80" />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <SpendingBarChart data={spending} />
      </div>

      <div className="mt-4 space-y-3">
        {budgets.map((b) => (
          <div
            key={b.category}
            className={`flex items-center justify-between rounded-[16px] p-4 text-white ${
              b.inBudget ? 'gradient-primary' : 'bg-card-muted'
            }`}
          >
            <div>
              <p className="font-semibold">{b.label}</p>
              <p className="text-sm opacity-80">{b.category}</p>
            </div>
            <p className="text-sm font-medium">
              {formatMoney(b.spent)} / {formatMoney(b.cap)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
