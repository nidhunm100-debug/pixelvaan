import { cn } from '@/lib/cn'

/**
 * Development-only placeholder for content that must come from
 * src/config/site.ts (phone, email, social URLs…). Renders nothing in
 * production builds, so visitors never see a fake value or a dead link.
 */
export function ConfigHint({ children, className }: { children: string; className?: string }) {
  if (!import.meta.env.DEV) return null
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-md border border-dashed border-accent/50 px-2.5 py-1 font-mono text-[11px] text-accent-soft',
        className,
      )}
      title="Only visible in development"
    >
      setup: {children}
    </span>
  )
}
