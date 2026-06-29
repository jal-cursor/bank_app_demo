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
