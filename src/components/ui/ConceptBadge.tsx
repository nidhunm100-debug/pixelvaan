import { cn } from '@/lib/cn'

/** Marks fictional/demo work so it's never mistaken for a real client. */
export function ConceptBadge({ className, tone = 'dark', label = 'Concept' }: { className?: string; tone?: 'dark' | 'light'; label?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.12em]',
        tone === 'dark' ? 'border-line-strong text-muted' : 'border-ink/15 text-ink/60',
        className,
      )}
    >
      <span className="size-1.5 bg-accent" aria-hidden="true" />
      {label}
    </span>
  )
}
