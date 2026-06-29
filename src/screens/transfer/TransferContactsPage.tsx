import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../data/StoreContext'
import { ContactRow } from '../../components/ContactRow'
import { HeaderWithBack } from '../../components/TopNav'
import { TextField } from '../../components/TextField'
import { SearchIcon } from '../../components/icons'

export function TransferContactsPage() {
  const navigate = useNavigate()
  const { contacts, setTransferContact } = useStore()
  const [query, setQuery] = useState('')

  const filtered = useMemo(
    () =>
      contacts.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())),
    [contacts, query],
  )

  return (
    <div className="px-6 pt-10">
      <HeaderWithBack title="Transfer money to" />
      <div className="relative mt-6">
        <TextField
          placeholder="Search contact"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rightIcon={<SearchIcon size={18} />}
        />
      </div>
      <div className="mt-6 divide-y divide-slate-100">
        {filtered.map((contact) => (
          <ContactRow
            key={contact.id}
            contact={contact}
            onSelect={() => {
              setTransferContact(contact.id)
              navigate('/transfer/confirm')
            }}
          />
        ))}
      </div>
    </div>
  )
}
