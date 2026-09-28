import type { ReactNode } from 'react'
import { LazyMotion, MotionConfig } from 'motion/react'
import { easeOutExpo } from '@/animations/easing'

const loadFeatures = () => import('@/lib/motion-features').then((mod) => mod.default)

/**
 * Motion setup: features are lazy-loaded (use `m.*` components, not
 * `motion.*`), and `reducedMotion="user"` makes every Motion animation
 * drop transforms when the visitor prefers reduced motion.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.8, ease: easeOutExpo }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  )
}
