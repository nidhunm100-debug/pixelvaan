import type { ReactNode } from 'react'
import { m } from 'motion/react'
import { cn } from '@/lib/cn'
import { easeOutExpo, revealViewport } from './easing'

type ImageRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  /** Direction the mask opens toward. */
  from?: 'bottom' | 'left' | 'right'
}

const hiddenClip = {
  bottom: 'inset(100% 0% 0% 0%)',
  left: 'inset(0% 100% 0% 0%)',
  right: 'inset(0% 0% 0% 100%)',
}

/**
 * Reveals an image through an opening mask while the image settles from a
 * slight zoom. Uses clip-path + transform only (no layout work).
 */
export function ImageReveal({ children, className, delay = 0, from = 'bottom' }: ImageRevealProps) {
  return (
    <m.div
      className={cn('overflow-hidden', className)}
      initial={{ clipPath: hiddenClip[from] }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={revealViewport}
      transition={{ duration: 1.3, delay, ease: easeOutExpo }}
    >
      <m.div
        className="h-full w-full"
        initial={{ scale: 1.14 }}
        whileInView={{ scale: 1 }}
        viewport={revealViewport}
        transition={{ duration: 1.6, delay, ease: easeOutExpo }}
      >
        {children}
      </m.div>
    </m.div>
  )
}
