import { useMediaQuery } from './useMediaQuery'

/**
 * The visitor's motion / input capabilities, used to decide which effects
 * to enable. Everything here is reactive to media-query changes.
 */
export function usePreferences() {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const lite = typeof document !== 'undefined' && document.documentElement.dataset.effects === 'lite'
  return {
    reducedMotion,
    finePointer,
    isDesktop,
    /** Pointer-driven effects (tilt, magnetic, cursor, mouse parallax). */
    pointerEffects: finePointer && !reducedMotion && !lite,
    /** Scroll-scrubbed and ambient effects. */
    richMotion: !reducedMotion,
  }
}
