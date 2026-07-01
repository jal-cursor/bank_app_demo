import { useNavigate } from 'react-router-dom'
import { BillCard } from '../../components/BillCard'
import { TopNav } from '../../components/TopNav'
import { ElectricBillArt, InternetBillArt, WaterBillArt } from '../../components/icons'

const bills = [
  {
    id: 'electric',
    title: 'Electric bill',
    subtitle: 'Pay electric bill this month',
    illustration: <ElectricBillArt />,
  },
  {
    id: 'water',
    title: 'Water bill',
    subtitle: 'Pay water bill this month',
    illustration: <WaterBillArt />,
  },
  {
    id: 'internet',
    title: 'Internet bill',
    subtitle: 'Pay internet bill this month',
    illustration: <InternetBillArt />,
  },
] as const

export function PayBillPage() {
  const navigate = useNavigate()

  return (
    <div className="pt-8">
      <TopNav title="Pay the bill" size="large" />
      <div className="mt-4 flex flex-col gap-5 px-6">
        {bills.map((bill) => (
          <BillCard
            key={bill.id}
            title={bill.title}
            subtitle={bill.subtitle}
            illustration={bill.illustration}
            onClick={() => navigate('/history')}
          />
        ))}
      </div>
      <div className="mt-6 px-6">
        <button
          type="button"
          onClick={() => navigate('/history')}
          className="text-sm font-semibold text-slate-900 hover:opacity-80"
        >
          Check Payment history
        </button>
      </div>
    </div>
  )
}
