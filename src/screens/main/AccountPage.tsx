import { useStore } from '../../data/StoreContext'
import { AccountCard } from '../../components/AccountCard'
import { TextField } from '../../components/TextField'

export function AccountPage() {
  const { user, cards } = useStore()
  const card = cards[0]

  return (
    <div className="px-6 pt-12">
      <h1 className="text-2xl font-semibold text-slate-900">Account</h1>
      <div className="mt-6">
        <AccountCard card={card} />
      </div>
      <p className="mt-8 text-[10px] font-medium uppercase tracking-wider text-neutral">
        Detail Information
      </p>
      <div className="mt-4 space-y-4">
        <TextField label="Name" value={`${user.firstName} ${user.lastName}`} readOnly />
        <TextField label="Phone Number" value={user.phone} readOnly />
        <TextField label="E-mail" value={user.email} readOnly />
        <TextField label="Home Address" value={user.address} readOnly />
      </div>
    </div>
  )
}
