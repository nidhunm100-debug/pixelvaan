import { m, type Variants } from 'motion/react'
import { brand } from '@/config/site'
import { cn } from '@/lib/cn'
import { easeOutExpo } from '@/animations/easing'

const markVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}
const pixel: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: easeOutExpo } },
}
const letters: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03, delayChildren: 0.3 } },
}
const letter: Variants = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 0.8, ease: easeOutExpo } },
}

/**
 * The PIXELVAAN wordmark: three "rising pixels" (a nod to vaan — sky)
 * plus letter-spaced type. `animate` plays the load-in reveal once.
 */
export function Logo({ className, animate = false, size = 'md' }: { className?: string; animate?: boolean; size?: 'md' | 'lg' }) {
  const initial = animate ? 'hidden' : false
  return (
    <m.span
      className={cn('inline-flex items-center gap-2.5 select-none', className)}
      initial={initial}
      animate="visible"
      aria-label={brand.name}
      role="img"
    >
      <m.svg
        variants={markVariants}
        viewBox="0 0 20 20"
        className={cn('shrink-0', size === 'lg' ? 'size-7' : 'size-[18px]')}
        aria-hidden="true"
      >
        <m.rect variants={pixel} x="0" y="14" width="6" height="6" fill="currentColor" style={{ originX: '3px', originY: '17px' }} />
        <m.rect variants={pixel} x="7" y="7" width="6" height="6" fill="currentColor" opacity={0.75} style={{ originX: '10px', originY: '10px' }} />
        <m.rect variants={pixel} x="14" y="0" width="6" height="6" className="fill-accent" style={{ originX: '17px', originY: '3px' }} />
      </m.svg>
      <m.span
        variants={letters}
        aria-hidden="true"
        className={cn(
          'inline-flex overflow-clip font-semibold tracking-[0.2em]',
          size === 'lg' ? 'text-2xl' : 'text-[0.9375rem]',
        )}
      >
        {brand.wordmark.split('').map((char, i) => (
          <m.span key={i} variants={letter} className="inline-block">
            {char}
          </m.span>
        ))}
      </m.span>
    </m.span>
  )
}
