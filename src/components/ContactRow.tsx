import { ChevronRightIcon } from './icons'
import { Avatar } from './Avatar'
import type { Contact } from '../types'

interface ContactRowProps {
  contact: Contact
  onSelect?: () => void
}

export function ContactRow({ contact, onSelect }: ContactRowProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full items-center gap-4 py-3 text-left"
    >
      <Avatar src={contact.avatarUrl} alt={contact.name} />
      <span className="flex-1 text-sm font-medium text-slate-900">{contact.name}</span>
      <ChevronRightIcon size={20} className="text-neutral" />
    </button>
  )
}
