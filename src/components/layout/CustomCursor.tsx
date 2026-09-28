import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/cn'

type CursorState = 'default' | 'hover' | 'label' | 'image' | 'hidden'

const INTERACTIVE = 'a, button, [role="button"], summary, label, select, [data-cursor="hover"]'
const TEXT_FIELD = 'input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]), textarea, [contenteditable="true"]'

/**
 * Desktop-only custom cursor. A dot tracks the pointer precisely and a ring
 * follows with a little inertia (gsap.quickTo, per the gsap-performance
 * skill). It reacts to:
 *   - links & buttons      → ring grows, dot hides
 *   - [data-cursor="…"]    → filled ring with a label (e.g. "View")
 *   - images               → soft enlarged ring
 *   - text fields          → hides so the native caret is used
 * Only mounted for fine pointers without reduced-motion preference.
 */
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<CursorState>('hidden')
  const [label, setLabel] = useState('')
  const [pressed, setPressed] = useState(false)

  const container = useRef<HTMLDivElement>(null)

  useGSAP((_, contextSafe) => {
    const safe = contextSafe!
    const root = document.documentElement
    root.classList.add('has-custom-cursor')

    const dotX = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3' })
    const dotY = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3' })
    const ringX = gsap.quickTo(ring.current, 'x', { duration: 0.5, ease: 'power3' })
    const ringY = gsap.quickTo(ring.current, 'y', { duration: 0.5, ease: 'power3' })

    let visible = false
    const onMove = safe((e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      if (!visible) {
        visible = true
        gsap.set([dot.current, ring.current], { x: e.clientX, y: e.clientY })
        setState((s) => (s === 'hidden' ? 'default' : s))
      }
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    })

    const onOver = (e: PointerEvent) => {
      if (!visible || e.pointerType !== 'mouse') return
      const target = e.target as Element | null
      if (!target?.closest) return
      if (target.closest(TEXT_FIELD)) return setState('hidden')
      const labelled = target.closest<HTMLElement>('[data-cursor-label]')
      if (labelled) {
        setLabel(labelled.dataset.cursorLabel ?? '')
        return setState('label')
      }
      if (target.closest(INTERACTIVE)) return setState('hover')
      if (target.closest('img, picture, [data-cursor="image"]')) return setState('image')
      setState('default')
    }

    const onLeaveWindow = () => {
      visible = false
      setState('hidden')
    }
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeaveWindow)
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    return () => {
      root.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.documentElement.removeEventListener('pointerleave', onLeaveWindow)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, { scope: container })

  return (
    <div ref={container} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <div ref={ring} className="absolute left-0 top-0 will-change-transform">
        <div
          className={cn(
            'grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition-[width,height,background-color,border-color,opacity,scale] duration-500 ease-[var(--ease-out-expo)]',
            state === 'default' && 'size-9 border border-fg/40 mix-blend-difference',
            state === 'hover' && 'size-16 border border-fg/70 bg-fg/[0.06] mix-blend-difference',
            state === 'image' && 'size-24 border border-fg/25 bg-fg/[0.04]',
            state === 'label' && 'size-24 bg-accent',
            state === 'hidden' && 'size-9 opacity-0',
            pressed && 'scale-[0.85]',
          )}
        >
          <span
            className={cn(
              'text-[13px] font-semibold tracking-tight text-ink transition-opacity duration-300',
              state === 'label' ? 'opacity-100' : 'opacity-0',
            )}
          >
            {label}
          </span>
        </div>
      </div>
      <div ref={dot} className="absolute left-0 top-0 will-change-transform">
        <div
          className={cn(
            'size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg mix-blend-difference transition-opacity duration-200',
            state === 'default' || state === 'image' ? 'opacity-100' : 'opacity-0',
          )}
        />
      </div>
    </div>
  )
}
