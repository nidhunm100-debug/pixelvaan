import { useEffect, type RefObject } from 'react'
import { useLenis } from 'lenis/react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Shared behaviour for modal overlays (mobile menu, case-study dialog):
 *  - locks page scroll (stops Lenis and native scroll)
 *  - traps Tab focus inside the overlay
 *  - closes on Escape
 *  - restores focus to the element that opened it
 */
export function useOverlay(open: boolean, containerRef: RefObject<HTMLElement | null>, onClose: () => void) {
  const lenis = useLenis()

  // Scroll lock
  useEffect(() => {
    if (!open) return
    const html = document.documentElement
    const scrollbar = window.innerWidth - html.clientWidth
    lenis?.stop()
    html.style.overflow = 'hidden'
    if (scrollbar > 0) html.style.paddingRight = `${scrollbar}px`
    return () => {
      html.style.overflow = ''
      html.style.paddingRight = ''
      lenis?.start()
    }
  }, [open, lenis])

  // Focus management + keyboard
  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    const container = containerRef.current
    const focusFirst = () => {
      const first = container?.querySelector<HTMLElement>('[data-autofocus]') ?? container?.querySelector<HTMLElement>(FOCUSABLE)
      first?.focus({ preventScroll: true })
    }
    const raf = requestAnimationFrame(focusFirst)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab' || !container) return
      const items = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      )
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      } else if (!container.contains(document.activeElement)) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', onKeyDown)
      // Restore focus unless an action inside the overlay already moved it
      // somewhere meaningful (e.g. a menu link focusing its section).
      const current = document.activeElement
      if (!current || current === document.body || container?.contains(current)) {
        previouslyFocused?.focus?.({ preventScroll: true })
      }
    }
  }, [open, containerRef, onClose])
}
