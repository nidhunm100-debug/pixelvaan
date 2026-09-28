import { Check, MousePointer2, RefreshCw, ShoppingCart } from 'lucide-react'
import type { ServiceVisual as VisualKind } from '@/data/services'
import { cn } from '@/lib/cn'

/**
 * Small illustrations for each service card. Static by default; they come
 * alive on hover (the parent card is a Tailwind `group`) and drift slightly
 * with the pointer via the --px/--py variables set by <TiltCard>.
 * Pure CSS transforms/opacity — no JavaScript animation loop.
 */
const t = 'transition-all duration-700 ease-[var(--ease-out-expo)]'

function Business() {
  return (
    <div className="absolute inset-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="h-2 w-10 rounded-sm bg-fg/40" />
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-1.5 w-6 rounded-sm bg-fg/15" />
          ))}
        </div>
      </div>
      <div className={cn('mt-1 h-11 rounded-md bg-gradient-to-r from-accent/80 to-accent-soft/30', t, 'group-hover:-translate-y-0.5')} />
      <div className="grid flex-1 grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn('rounded-md bg-fg/[0.08] opacity-60', t, 'translate-y-2 group-hover:translate-y-0 group-hover:opacity-100')}
            style={{ transitionDelay: `${i * 70}ms` }}
          />
        ))}
      </div>
    </div>
  )
}

function Landing() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="flex flex-col items-center gap-2.5">
        <div className="h-2 w-28 rounded-sm bg-fg/40" />
        <div className="h-1.5 w-20 rounded-sm bg-fg/15" />
        <div className={cn('relative mt-2 rounded-full bg-accent px-5 py-2 text-[11px] font-semibold text-ink', t, 'group-hover:scale-105')}>
          Get started
          <span className={cn('absolute inset-0 rounded-full ring-2 ring-accent/60 opacity-0', t, 'group-hover:scale-150 group-hover:opacity-0 group-hover:[transition-delay:350ms]')} />
          <span className="absolute inset-0 rounded-full ring-2 ring-accent/0 group-hover:animate-ping-soft group-hover:ring-accent/50" />
        </div>
      </div>
      <MousePointer2
        className={cn('absolute size-5 fill-fg text-ink', t, 'left-[68%] top-[72%] group-hover:left-[54%] group-hover:top-[60%]')}
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </div>
  )
}

const tiles = ['#D9A441', '#E0703A', '#8FB39A', '#3DE0C5', '#FF6B4A', '#7C8CFF']
function Portfolio() {
  return (
    <div className="absolute inset-4 grid grid-cols-3 grid-rows-2 gap-2">
      {tiles.map((color, i) => (
        <div
          key={color}
          className={cn('rounded-md', t, i % 2 ? 'group-hover:translate-y-1.5' : 'group-hover:-translate-y-1.5', i === 1 && 'group-hover:scale-105')}
          style={{ background: `linear-gradient(140deg, ${color}, ${color}55)`, transitionDelay: `${i * 40}ms` }}
        />
      ))}
    </div>
  )
}

function Ecommerce() {
  return (
    <div className="absolute inset-4">
      <div className="absolute right-0 top-0 grid size-9 place-items-center rounded-full bg-fg/[0.08]">
        <ShoppingCart className="size-4 text-fg/80" aria-hidden="true" />
        <span className={cn('absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-accent text-[9px] font-bold text-ink', t, 'scale-0 group-hover:scale-100 group-hover:[transition-delay:450ms]')}>
          1
        </span>
      </div>
      <div className="absolute bottom-0 left-0 top-0 flex w-[46%] flex-col gap-2 rounded-lg bg-fg/[0.06] p-2.5">
        <div className="relative flex-1 rounded-md bg-gradient-to-br from-[#C98B4E] to-[#6B3A12]">
          <span className={cn('absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-0', t, 'group-hover:left-[190%] group-hover:top-[-10%] group-hover:opacity-100')} />
        </div>
        <div className="h-1.5 w-3/4 rounded-sm bg-fg/30" />
        <div className="h-4 rounded bg-accent/90" />
      </div>
    </div>
  )
}

function Redesign() {
  return (
    <div className="absolute inset-4 overflow-hidden rounded-lg">
      {/* Before */}
      <div className="absolute inset-0 flex flex-col gap-1.5 bg-[#2A2A2E] p-3">
        <div className="h-2 w-16 rounded-none bg-[#6B6B72]" />
        <div className="h-8 bg-[#3B3B42]" />
        <div className="grid flex-1 grid-cols-4 gap-1">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="bg-[#3B3B42]" />
          ))}
        </div>
      </div>
      {/* After */}
      <div className={cn('absolute inset-0 flex flex-col gap-2 bg-ink-3 p-3 [clip-path:inset(0_0_0_52%)]', t, 'group-hover:[clip-path:inset(0_0_0_0%)]')}>
        <div className="h-2 w-12 rounded-sm bg-fg/60" />
        <div className="h-8 rounded-md bg-gradient-to-r from-accent to-accent-soft/40" />
        <div className="grid flex-1 grid-cols-2 gap-2">
          <div className="rounded-md bg-fg/10" />
          <div className="rounded-md bg-fg/[0.06]" />
        </div>
      </div>
      <div className={cn('absolute bottom-0 top-0 left-[52%] w-px bg-fg/70', t, 'group-hover:left-0 group-hover:opacity-0')}>
        <span className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-fg/70 bg-ink" />
      </div>
    </div>
  )
}

function Maintenance() {
  return (
    <div className="absolute inset-4 flex items-center gap-4">
      <div className="grid size-14 shrink-0 place-items-center rounded-full border border-line-strong">
        <RefreshCw className={cn('size-6 text-accent-soft', 'transition-transform duration-1000 ease-[var(--ease-out-expo)] group-hover:rotate-180')} aria-hidden="true" />
      </div>
      <ul className="flex flex-1 flex-col gap-2.5">
        {['w-[80%]', 'w-[62%]', 'w-[72%]'].map((width, i) => (
          <li key={width} className="flex items-center gap-2">
            <span
              className={cn('grid size-4 place-items-center rounded-full border border-line-strong', t, 'group-hover:border-accent group-hover:bg-accent')}
              style={{ transitionDelay: `${i * 140}ms` }}
            >
              <Check className={cn('size-2.5 text-ink opacity-0', t, 'group-hover:opacity-100')} strokeWidth={3} style={{ transitionDelay: `${i * 140}ms` }} />
            </span>
            <span className={cn('h-1.5 rounded-sm bg-fg/20', width)} />
          </li>
        ))}
      </ul>
    </div>
  )
}

const visuals: Record<VisualKind, () => React.JSX.Element> = {
  business: Business,
  landing: Landing,
  portfolio: Portfolio,
  ecommerce: Ecommerce,
  redesign: Redesign,
  maintenance: Maintenance,
}

export function ServiceVisual({ kind }: { kind: VisualKind }) {
  const Visual = visuals[kind]
  return (
    <div aria-hidden="true" className="relative h-36 overflow-hidden rounded-xl border border-line bg-ink-2 sm:h-40">
      <div className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out-expo)] [transform:translate3d(calc((var(--px,0.5)-0.5)*14px),calc((var(--py,0.5)-0.5)*10px),0)]">
        <Visual />
      </div>
    </div>
  )
}
