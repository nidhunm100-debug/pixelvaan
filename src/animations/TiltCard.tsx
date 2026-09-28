import { useRef, type PointerEvent, type ReactNode } from 'react'
import { m, useMotionValue, useSpring, useTransform } from 'motion/react'
import { usePreferences } from '@/hooks/usePreferences'
import { cn } from '@/lib/cn'

type TiltCardProps = {
  children: ReactNode
  className?: string
  /** Maximum rotation in degrees. */
  max?: number
  /** Adds the pointer-following spotlight (see `.spotlight` in CSS). */
  spotlight?: boolean
  /** Set false for a flat card that keeps the pointer light (e.g. in tiled grids). */
  tilt?: boolean
  as?: 'div' | 'article' | 'li'
}

/**
 * Card that tilts in 3D toward the pointer and exposes --mx / --my CSS
 * variables for a cursor-following light. Disabled for touch and reduced
 * motion (the card simply renders flat).
 */
export function TiltCard({ children, className, max = 6, spotlight = true, tilt = true, as = 'div' }: TiltCardProps) {
  const ref = useRef<HTMLElement>(null)
  const { pointerEffects } = usePreferences()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 160, damping: 20 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 160, damping: 20 })

  const onMove = (event: PointerEvent<HTMLElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
    el.style.setProperty('--px', x.toFixed(3))
    el.style.setProperty('--py', y.toFixed(3))
    if (pointerEffects && tilt) {
      px.set(x)
      py.set(y)
    }
  }
  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
    ref.current?.style.setProperty('--px', '0.5')
    ref.current?.style.setProperty('--py', '0.5')
  }

  const Component = m[as]
  return (
    <Component
      ref={ref as never}
      className={cn(spotlight && 'spotlight', className)}
      style={pointerEffects && tilt ? { rotateX, rotateY, transformPerspective: 1100 } : undefined}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </Component>
  )
}
