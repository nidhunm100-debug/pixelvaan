import { contact } from '@/config/site'

export const hasWhatsApp = contact.whatsappNumber.trim().length > 0
export const hasPhone = contact.phoneNumber.trim().length > 0
export const hasEmail = contact.email.trim().length > 0
export const hasFormEndpoint = contact.formEndpoint.trim().length > 0

/** wa.me deep link. Returns null when no WhatsApp number is configured. */
export function whatsappUrl(message: string = contact.whatsappMessage): string | null {
  if (!hasWhatsApp) return null
  const digits = contact.whatsappNumber.replace(/\D/g, '')
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

export function phoneUrl(): string | null {
  if (!hasPhone) return null
  return `tel:${contact.phoneNumber.replace(/[^\d+]/g, '')}`
}

export function phoneLabel(): string {
  return contact.phoneDisplay || contact.phoneNumber
}

export function emailUrl(subject?: string, body?: string): string | null {
  if (!hasEmail) return null
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const query = params.toString().replace(/\+/g, '%20')
  return `mailto:${contact.email}${query ? `?${query}` : ''}`
}
