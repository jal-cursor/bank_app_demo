import { useStore } from '../../data/StoreContext'
import { BankCard } from '../../components/BankCard'
import { Button } from '../../components/Button'
import { TopNav } from '../../components/TopNav'

export function CardsPage() {
  const { cards } = useStore()

  return (
    <div className="px-6 pt-12">
      <TopNav title="Cards" showBack={false} />
      <div className="mt-4">
        <Button fullWidth={false} className="px-6 text-sm">
          Add new card
        </Button>
      </div>
      <div className="mt-6 space-y-4">
        {cards.map((card) => (
          <BankCard key={card.id} card={card} compact />
        ))}
      </div>
      <div className="mt-8">
        <Button>Manage cards</Button>
      </div>
    </div>
  )
}
