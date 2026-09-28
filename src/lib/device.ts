/**
 * Coarse capability detection used to scale visual effects down on devices
 * that would struggle with them. Evaluated once at startup.
 */
type NavigatorWithHints = Navigator & {
  deviceMemory?: number
  connection?: { saveData?: boolean; effectiveType?: string }
}

export function detectLowPower(): boolean {
  if (typeof navigator === 'undefined') return false
  const nav = navigator as NavigatorWithHints
  const fewCores = typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 4
  const lowMemory = typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4
  const saveData = nav.connection?.saveData === true
  const slowNetwork = /(^|-)2g$/.test(nav.connection?.effectiveType ?? '')
  return saveData || slowNetwork || (fewCores && lowMemory)
}

/**
 * Marks <html> with the effect tier so CSS can drop expensive effects
 * (backdrop blur, large filters) without any JavaScript in the render path.
 */
export function applyEffectsTier(): 'full' | 'lite' {
  const small = window.matchMedia('(max-width: 767px)').matches
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const tier = detectLowPower() || (small && coarse) ? 'lite' : 'full'
  document.documentElement.dataset.effects = tier
  return tier
}
