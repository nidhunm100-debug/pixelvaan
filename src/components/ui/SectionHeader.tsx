import type { ReactNode } from 'react'
import { RevealText } from '@/animations/RevealText'
import { FadeIn } from '@/animations/FadeIn'
import { cn } from '@/lib/cn'

type SectionHeaderProps = {
  index: string
  label: string
  title: string
  intro?: ReactNode
  id?: string
  className?: string
  tone?: 'dark' | 'light'
  align?: 'split' | 'stack'
}

/**
 * Editorial section header: numbered eyebrow, word-revealed H2 and an
 * optional intro that sits beside the title on large screens.
 */
export function SectionHeader({ index, label, title, intro, id, className, tone = 'dark', align = 'split' }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'grid gap-8',
        align === 'split' && 'lg:grid-cols-12 lg:items-end lg:gap-12',
        className,
      )}
    >
      <div className={cn(align === 'split' && 'lg:col-span-8')}>
        <FadeIn y={12}>
          <p className={cn('eyebrow', tone === 'light' && 'text-ink/60')}>
            <span className="tabular-nums">{index}</span>
            <span aria-hidden="true">—</span>
            {label}
          </p>
        </FadeIn>
        <RevealText
          id={id}
          text={title}
          className={cn(
            'display mt-6 text-balance text-[clamp(2.5rem,6vw,5.75rem)]',
            tone === 'light' ? 'text-ink' : 'text-fg',
          )}
        />
      </div>
      {intro && (
        <FadeIn delay={0.15} className={cn(align === 'split' && 'lg:col-span-4 lg:pb-3')}>
          <div className={cn('max-w-md text-lg leading-relaxed', tone === 'light' ? 'text-ink/70' : 'text-muted')}>{intro}</div>
        </FadeIn>
      )}
    </div>
  )
}
