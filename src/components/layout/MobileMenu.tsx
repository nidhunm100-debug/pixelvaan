import { useRef } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { ArrowUpRight, X } from 'lucide-react'
import { navItems, primaryCta } from '@/data/navigation'
import { brand, contact } from '@/config/site'
import { useOverlay } from '@/hooks/useOverlay'
import { emailUrl, whatsappUrl } from '@/lib/contact'
import { formatINR } from '@/lib/format'
import { cn } from '@/lib/cn'
import { Logo } from '@/components/ui/Logo'
import { ButtonLink } from '@/components/ui/Button'
import { easeInOutQuint, easeOutExpo } from '@/animations/easing'

type MobileMenuProps = { open: boolean; onClose: () => void; active: string }

const ORIGIN = 'calc(100% - 2.75rem) 2.75rem'

/**
 * Full-screen menu for tablet & mobile. Opens with a circular reveal from
 * the menu button, then staggers in the links, CTA and contact options.
 * Accessible dialog: focus trap, Escape to close, scroll lock.
 */
export function MobileMenu({ open, onClose, active }: MobileMenuProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  useOverlay(open, ref, onClose)

  const wa = whatsappUrl()
  const mail = emailUrl()

  return (
    <AnimatePresence>
      {open && (
        <m.div
          ref={ref}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[65] flex flex-col overflow-y-auto bg-ink"
          data-lenis-prevent
          initial={reduce ? { opacity: 0 } : { clipPath: `circle(0% at ${ORIGIN})` }}
          animate={reduce ? { opacity: 1 } : { clipPath: `circle(150% at ${ORIGIN})` }}
          exit={reduce ? { opacity: 0 } : { clipPath: `circle(0% at ${ORIGIN})` }}
          transition={{ duration: 0.75, ease: easeInOutQuint }}
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 pixel-grid opacity-60 [mask-image:radial-gradient(80%_60%_at_100%_0%,black,transparent)]" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-1/4 -top-1/4 size-[70vmax] rounded-full bg-[radial-gradient(circle,rgb(255_90_31/0.18),transparent_60%)]" />

          <div className="container-x relative">
            <div className="mt-3 flex h-16 items-center justify-between pl-5 pr-2 sm:mt-4">
              <a href="#home" onClick={onClose} className="-m-2 rounded-full p-2" aria-label="Pixelvaan — back to top">
                <Logo />
              </a>
              <m.button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="grid size-12 place-items-center rounded-full border border-line-strong bg-fg/[0.04] transition-colors hover:bg-fg/[0.1] active:scale-95"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: easeOutExpo }}
              >
                <X className="size-5" strokeWidth={1.6} />
              </m.button>
            </div>
          </div>

          <nav aria-label="Mobile" className="container-x relative mt-6 flex-1 sm:mt-10">
            <ul className="border-t border-line">
              {navItems.map((item, i) => {
                const isActive = active === item.href.slice(1)
                return (
                  <li key={item.href} className="overflow-hidden border-b border-line">
                    <m.a
                      href={item.href}
                      onClick={onClose}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'group flex items-center gap-4 py-3.5 transition-colors active:bg-fg/[0.04] sm:py-4',
                        isActive ? 'text-fg' : 'text-fg/80 hover:text-fg',
                      )}
                      initial={{ y: '100%' }}
                      animate={{ y: '0%' }}
                      exit={{ y: '-100%', transition: { duration: 0.35, ease: easeInOutQuint } }}
                      transition={{ duration: 0.8, delay: 0.22 + i * 0.045, ease: easeOutExpo }}
                    >
                      <span className="w-7 text-xs tabular-nums text-dim">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-[clamp(1.75rem,7.5vw,3rem)] font-medium leading-none tracking-[-0.04em] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                        {item.label}
                      </span>
                      {isActive && <span className="size-2 bg-accent" aria-hidden="true" />}
                      <ArrowUpRight
                        className="ml-auto size-5 text-dim transition-all duration-500 group-hover:rotate-45 group-hover:text-accent"
                        aria-hidden="true"
                      />
                    </m.a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <m.div
            className="container-x relative pb-[max(2rem,env(safe-area-inset-bottom))] pt-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.8, delay: 0.55, ease: easeOutExpo }}
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm text-muted">Websites from {formatINR(brand.startingPrice)}</p>
                <div className="mt-4">
                  <ButtonLink href={primaryCta.href} onClick={onClose} size="lg" magnetic={false}>
                    {primaryCta.label}
                  </ButtonLink>
                </div>
              </div>
              {(wa || mail) && (
                <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
                  {wa && (
                    <li>
                      <a href={wa} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-fg">
                        WhatsApp
                      </a>
                    </li>
                  )}
                  {mail && (
                    <li>
                      <a href={mail} className="link-underline hover:text-fg">
                        {contact.email}
                      </a>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
