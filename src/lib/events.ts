/** Lightweight cross-component events (no global store needed). */
export const SELECT_SERVICE_EVENT = 'pixelvaan:select-service'

/** Pre-selects a website type in the contact form. */
export function selectService(serviceTitle: string) {
  window.dispatchEvent(new CustomEvent<string>(SELECT_SERVICE_EVENT, { detail: serviceTitle }))
}
