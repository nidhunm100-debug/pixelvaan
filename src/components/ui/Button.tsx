import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { Magnetic } from '@/animations/Magnetic'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'light' | 'dark' | 'outline-dark'
type Size = 'md' | 'lg'

const base =
  'group/btn relative inline-flex select-none items-center justify-center gap-3 whitespace-nowrap rounded-full font-medium tracking-[-0.01em] ' +
  'transition-[transform,background-color,color,border-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] ' +
  'hover:scale-[1.025] active:scale-[0.97] active:duration-150 disabled:pointer-events-none disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-ink hover:bg-accent-soft shadow-[0_10px_40px_-12px_rgb(255_90_31/0.6)]',
  secondary: 'border border-line-strong bg-fg/[0.03] text-fg hover:border-fg/40 hover:bg-fg/[0.07]',
  light: 'bg-fg text-ink hover:bg-white',
  dark: 'bg-ink text-fg hover:bg-ink-3',
  'outline-dark': 'border border-ink/20 text-ink hover:border-ink/50 hover:bg-ink/[0.04]',
}

const sizes: Record<Size, string> = {
  md: 'h-12 pl-6 pr-2 text-[0.9375rem]',
  lg: 'h-14 pl-7 pr-2 text-base',
}

const arrowWrap: Record<Variant, string> = {
  primary: 'bg-ink/10',
  secondary: 'bg-fg/10',
  light: 'bg-ink/10',
  dark: 'bg-fg/10',
  'outline-dark': 'bg-ink/10',
}

/**
 * The arrow rotates from → to ↗ on hover — the signature micro-interaction.
 */
function Arrow({ variant, size }: { variant: Variant; size: Size }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid place-items-center rounded-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-0.5',
        size === 'lg' ? 'size-10' : 'size-8',
        arrowWrap[variant],
      )}
    >
      <ArrowRight
        className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:-rotate-45"
        strokeWidth={2}
      />
    </span>
  )
}

type CommonProps = {
  children: ReactNode
  variant?: Variant
  size?: Size
  arrow?: boolean
  magnetic?: boolean
  className?: string
}

export function ButtonLink({
  children,
  variant = 'primary',
  size = 'md',
  arrow = true,
  magnetic = true,
  className,
  ...props
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const link = (
    <a {...props} className={cn(base, variants[variant], sizes[size], !arrow && 'pr-6', className)}>
      <span>{children}</span>
      {arrow && <Arrow variant={variant} size={size} />}
    </a>
  )
  return magnetic ? <Magnetic>{link}</Magnetic> : link
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  arrow = true,
  magnetic = true,
  className,
  type = 'button',
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const button = (
    <button type={type} {...props} className={cn(base, variants[variant], sizes[size], !arrow && 'pr-6', className)}>
      <span>{children}</span>
      {arrow && <Arrow variant={variant} size={size} />}
    </button>
  )
  return magnetic ? <Magnetic>{button}</Magnetic> : button
}
