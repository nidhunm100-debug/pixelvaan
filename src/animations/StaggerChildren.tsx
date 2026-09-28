import type { ReactNode } from 'react'
import { m, type Variants } from 'motion/react'
import { easeOutExpo, revealViewport } from './easing'

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOutExpo } },
}

type StaggerProps = {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
  as?: 'div' | 'ul' | 'ol'
}

/** Reveals its <StaggerItem> children one after another when scrolled into view. */
export function StaggerChildren({ children, className, stagger = 0.08, delay = 0, as = 'div' }: StaggerProps) {
  const Component = m[as]
  return (
    <Component
      className={className}
      variants={container(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      {children}
    </Component>
  )
}

export function StaggerItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'li' | 'article'
}) {
  const Component = m[as]
  return (
    <Component className={className} variants={item}>
      {children}
    </Component>
  )
}
