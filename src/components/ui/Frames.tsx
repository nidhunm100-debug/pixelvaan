import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Minimal browser chrome around a website preview. */
export function BrowserFrame({
  children,
  label,
  className,
  tone = 'dark',
}: {
  children: ReactNode
  label?: string
  className?: string
  tone?: 'dark' | 'light'
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[10px] ring-1 sm:rounded-xl',
        tone === 'dark' ? 'bg-ink-3 ring-line-strong' : 'bg-white ring-ink/10',
        className,
      )}
    >
      <div
        className={cn(
          'flex h-6 items-center gap-1.5 px-2.5 sm:h-8 sm:px-3.5',
          tone === 'dark' ? 'bg-ink-3' : 'bg-[#EEEBE4]',
        )}
        aria-hidden="true"
      >
        <span className="size-[7px] rounded-full bg-[#FF5F57] sm:size-2.5" />
        <span className="size-[7px] rounded-full bg-[#FEBC2E] sm:size-2.5" />
        <span className="size-[7px] rounded-full bg-[#28C840] sm:size-2.5" />
        {label && (
          <span
            className={cn(
              'mx-auto hidden max-w-[60%] truncate rounded-md px-3 py-0.5 text-[10px] font-medium sm:block',
              tone === 'dark' ? 'bg-fg/[0.06] text-muted' : 'bg-white text-ink/60',
            )}
          >
            {label}
          </span>
        )}
      </div>
      <div className="relative overflow-hidden">{children}</div>
    </div>
  )
}

/** Simple phone bezel for mobile previews. */
export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[1.9rem] bg-ink p-[5px] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)] ring-1 ring-line-strong',
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[1.6rem]">
        {children}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-2 h-[14px] w-[30%] -translate-x-1/2 rounded-full bg-ink"
        />
      </div>
    </div>
  )
}
