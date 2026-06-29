import { Navigate, useNavigate } from 'react-router-dom'
import { useStore } from '../../data/StoreContext'
import { formatMoney } from '../../lib/format'
import { Avatar } from '../../components/Avatar'
import { Button } from '../../components/Button'
import { HeaderWithBack } from '../../components/TopNav'
import { ChevronDownIcon, MastercardMark } from '../../components/icons'

export function TransferConfirmPage() {
  const navigate = useNavigate()
  const { transferDraft, getContact, getCard, setSourceCard } = useStore()
  const contact = transferDraft.contactId ? getContact(transferDraft.contactId) : null
  const sourceCard = transferDraft.sourceCardId ? getCard(transferDraft.sourceCardId) : null

  if (!contact) {
    return <Navigate to="/transfer" replace />
  }

  return (
    <div className="flex h-full flex-col px-6 pt-10">
      <HeaderWithBack title="Transfer money to" />
      <div className="mt-8 flex flex-col items-center">
        <Avatar src={contact.avatarUrl} alt={contact.name} size={62} />
        <p className="mt-4 text-sm font-semibold text-slate-900">{contact.name}</p>
        <p className="text-xs text-neutral">{contact.cardMasked}</p>
        <p className="mt-6 text-4xl font-semibold text-slate-900">
          {formatMoney(transferDraft.amount)}
        </p>
        <p className="text-xs text-neutral">No fee</p>
      </div>

      <div className="mt-10">
        <p className="mb-3 text-center text-sm text-neutral">Select your account</p>
        <button
          type="button"
          onClick={() => setSourceCard('c2')}
          className="flex w-full items-center justify-between rounded-2xl bg-white p-4 shadow-card-soft"
        >
          <div className="flex items-center gap-4">
            <MastercardMark />
            <div className="text-left">
              <p className="text-sm font-semibold">{sourceCard?.numberMasked ?? '**** 2236'}</p>
              <p className="text-xs text-neutral">
                Balance: {formatMoney(sourceCard?.balance ?? 5300)}
              </p>
            </div>
          </div>
          <ChevronDownIcon size={20} className="text-neutral" />
        </button>
      </div>

      <div className="mt-auto pb-6">
        <Button onClick={() => navigate('/transfer/success')}>Send</Button>
      </div>
    </div>
  )
}
