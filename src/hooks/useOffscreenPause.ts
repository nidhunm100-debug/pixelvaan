import { useEffect, type RefObject } from 'react'

/**
 * Sets data-offscreen="true" on the element while it's outside the
 * viewport; CSS pauses every ambient animation inside it.
 */
export function useOffscreenPause(ref: RefObject<HTMLElement | null>, rootMargin = '120px') {
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.dataset.offscreen = entry.isIntersecting ? 'false' : 'true'
      },
      { rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, rootMargin])
}
