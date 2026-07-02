import type { Card } from '../types'

export function formatMoney(amount: number, signed = false): string {
  const prefix = signed && amount >= 0 ? '+ ' : signed && amount < 0 ? '- ' : ''
  const value = Math.abs(amount)
  const formatted = value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `${prefix}$ ${formatted}`
}

export function greetingName(firstName: string): string {
  const hour = new Date().getHours()
  const period = hour < 12 ? 'Morning' : hour < 17 ? 'Afternoon' : 'Evening'
  return `Good ${period}, ${firstName}!`
}

export function brandLabel(brand: Card['brand']): string {
  return brand === 'visa' ? 'Visa' : 'Mastercard'
}

export function cardSelectionLabel(card: Card): string {
  return `${brandLabel(card.brand)} ****${card.numberFull.slice(-4)}`
}

export function formatAccountNumber(digits: string): string {
  return digits.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim()
}

export function formatAmountField(amount: number): string {
  if (!amount) return ''
  return amount % 1 === 0 ? `$${amount}` : `$${amount.toFixed(2)}`
}

export function parseAmountField(value: string): number {
  const n = Number.parseFloat(value.replace(/[^0-9.]/g, ''))
  return Number.isFinite(n) ? n : 0
}
