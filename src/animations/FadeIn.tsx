import type { ReactNode } from 'react'
import { m } from 'motion/react'
import { easeOutExpo, revealViewport } from './easing'

type FadeInProps = {
  children: ReactNode
  className?: string
  delay?: number
  /** Vertical offset in px to rise from. */
  y?: number
  duration?: number
  as?: 'div' | 'li' | 'p' | 'span' | 'section' | 'article'
}

/** Fades and rises content into place the first time it enters the viewport. */
export function FadeIn({ children, className, delay = 0, y = 28, duration = 0.9, as = 'div' }: FadeInProps) {
  const Component = m[as]
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ duration, delay, ease: easeOutExpo }}
    >
      {children}
    </Component>
  )
}
