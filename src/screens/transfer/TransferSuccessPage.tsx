import { useNavigate } from 'react-router-dom'
import { useStore } from '../../data/StoreContext'
import { formatMoney } from '../../lib/format'
import { Button } from '../../components/Button'

export function TransferSuccessPage() {
  const navigate = useNavigate()
  const { transferDraft, getContact, resetTransfer } = useStore()
  const contact = transferDraft.contactId ? getContact(transferDraft.contactId) : null
  const name = contact?.name.split(' ')[0] ?? 'Jane'

  return (
    <div className="flex h-full flex-col items-center justify-center px-8 text-center">
      <div className="mb-8 flex h-36 w-36 items-center justify-center rounded-full bg-violet-50">
        <span className="text-5xl">✓</span>
      </div>
      <h2 className="text-xl font-semibold leading-snug text-slate-900">
        {formatMoney(transferDraft.amount)} has been sent to {name}!
      </h2>
      <div className="mt-8 flex w-full flex-col gap-3">
        <Button
          onClick={() => {
            resetTransfer()
            navigate('/home')
          }}
        >
          Back to Home
        </Button>
        <Button variant="ghost" onClick={() => navigate('/history')}>
          View history
        </Button>
      </div>
    </div>
  )
}
