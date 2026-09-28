import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { easeOutExpo } from './easing'

type AnimatedCounterProps = {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

const format = (n: number) => new Intl.NumberFormat('en-IN').format(Math.round(n))

/**
 * Counts up to `value` when it enters the viewport. The final value is
 * rendered from the start (so it's correct for SEO, no-JS and screen
 * readers); the animation only rewrites the visible text.
 */
export function AnimatedCounter({ value, prefix = '', suffix = '', duration = 1.8, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || !inView || reduce) return
    const controls = animate(0, value, {
      duration,
      ease: easeOutExpo,
      onUpdate: (latest) => {
        el.textContent = `${prefix}${format(latest)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, reduce, value, prefix, suffix, duration])

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {`${prefix}${format(value)}${suffix}`}
    </span>
  )
}
