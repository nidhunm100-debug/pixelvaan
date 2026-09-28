import { Fragment, type ElementType } from 'react'
import { m, type Variants } from 'motion/react'
import { cn } from '@/lib/cn'
import { easeOutExpo, revealViewport } from './easing'

/**
 * Splits text into words and reveals them from behind a mask.
 *
 * Wrap words in *asterisks* to render them in the italic serif accent:
 *   "Work That Speaks *Before We Do.*"
 *
 * Screen readers get the plain sentence once; the split words are hidden
 * from assistive tech.
 *
 * `trigger="manual"` renders the same markup without Motion so a GSAP
 * timeline can animate `.rt-word` elements (used in the hero intro).
 */
type Token = { word: string; accent: boolean }

export function parseAccentText(text: string): Token[] {
  const tokens: Token[] = []
  text.split(/(\*[^*]+\*)/g).forEach((part) => {
    if (!part) return
    const accent = part.startsWith('*') && part.endsWith('*')
    const clean = accent ? part.slice(1, -1) : part
    clean
      .split(/\s+/)
      .filter(Boolean)
      .forEach((word) => tokens.push({ word, accent }))
  })
  return tokens
}

export const plainText = (text: string) => text.replace(/\*/g, '')

const containerVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

const wordVariants: Variants = {
  hidden: { y: '108%' },
  visible: { y: '0%', transition: { duration: 1, ease: easeOutExpo } },
}

type RevealTextProps = {
  text: string
  as?: ElementType
  className?: string
  accentClassName?: string
  stagger?: number
  delay?: number
  trigger?: 'view' | 'manual'
  id?: string
}

export function RevealText({
  text,
  as: Tag = 'h2',
  className,
  accentClassName = 'serif-accent',
  stagger = 0.06,
  delay = 0,
  trigger = 'view',
  id,
}: RevealTextProps) {
  const tokens = parseAccentText(text)

  const words = tokens.map((token, i) => (
    <Fragment key={i}>
      <span className="word-mask">
        {trigger === 'view' ? (
          <m.span variants={wordVariants} className={cn(token.accent && accentClassName)}>
            {token.word}
          </m.span>
        ) : (
          <span className={cn('rt-word', token.accent && accentClassName)}>{token.word}</span>
        )}
      </span>
      {i < tokens.length - 1 ? ' ' : null}
    </Fragment>
  ))

  return (
    <Tag className={className} id={id}>
      <span className="sr-only">{plainText(text)}</span>
      {trigger === 'view' ? (
        <m.span
          aria-hidden="true"
          className="block"
          variants={containerVariants(stagger, delay)}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          {words}
        </m.span>
      ) : (
        <span aria-hidden="true" className="block">
          {words}
        </span>
      )}
    </Tag>
  )
}
