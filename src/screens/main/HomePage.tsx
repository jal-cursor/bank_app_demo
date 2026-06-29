import { useStore } from '../../data/StoreContext'
import { greetingName } from '../../lib/format'
import { BankCard } from '../../components/BankCard'
import { CategoryTile } from '../../components/CategoryTile'
import {
  BillIcon,
  CreditCardIcon,
  RechargeIcon,
  ReportIcon,
  TransferIcon,
  WalletIcon,
  WithdrawIcon,
} from '../../components/icons'

const categories = [
  { label: 'Account and Card', icon: <WalletIcon />, to: '/account' },
  { label: 'Transfer', icon: <TransferIcon />, to: '/transfer' },
  { label: 'Withdraw', icon: <WithdrawIcon />, to: '/withdraw' },
  { label: 'Mobile recharge', icon: <RechargeIcon />, to: '/recharge' },
  { label: 'Pay the bill', icon: <BillIcon />, to: '/paybill' },
  { label: 'Credit card', icon: <CreditCardIcon />, to: '/cards' },
  { label: 'Transaction report', icon: <ReportIcon />, to: '/report' },
]

export function HomePage() {
  const { user, cards } = useStore()
  const primaryCard = cards[0]

  return (
    <div className="px-6 pt-12">
      <h1 className="text-2xl font-semibold leading-tight text-slate-900">
        {greetingName(user.firstName)}
      </h1>
      <div className="mt-6">
        <BankCard card={primaryCard} />
      </div>
      <div className="mt-8 grid grid-cols-3 gap-3">
        {categories.map((cat) => (
          <CategoryTile key={cat.label} label={cat.label} icon={cat.icon} to={cat.to} />
        ))}
      </div>
    </div>
  )
}
