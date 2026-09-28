import { useRef, type PointerEvent, type ReactNode } from 'react'
import { m, useMotionValue, useSpring } from 'motion/react'
import { usePreferences } from '@/hooks/usePreferences'
import { cn } from '@/lib/cn'

type MagneticProps = {
  children: ReactNode
  className?: string
  /** 0–1: how far the element follows the pointer. */
  strength?: number
}

/**
 * Pulls its child gently toward the pointer while hovered. Motion values +
 * springs, so pointer moves never re-render React. Inert on touch devices
 * and when reduced motion is requested.
 */
export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const { pointerEffects } = usePreferences()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 })

  const onMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (!pointerEffects || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <m.span
      ref={ref}
      className={cn('inline-flex', className)}
      style={pointerEffects ? { x: springX, y: springY } : undefined}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </m.span>
  )
}
