import { useCallback, useState } from 'react'
import { m, useMotionValueEvent, useScroll } from 'motion/react'
import { navItems, primaryCta } from '@/data/navigation'
import { useActiveSection } from '@/hooks/useActiveSection'
import { ButtonLink } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/cn'
import { easeOutExpo } from '@/animations/easing'
import { MobileMenu } from './MobileMenu'

const sectionIds = navItems.map((item) => item.href.slice(1))

/**
 * Sticky navigation. Transparent over the hero; once the page scrolls it
 * condenses into a floating glass bar. A thin progress line tracks overall
 * scroll position.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(sectionIds)
  const { scrollY, scrollYProgress } = useScroll()

  useMotionValueEvent(scrollY, 'change', (value) => setScrolled(value > 24))
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[70] -translate-y-24 rounded-full bg-fg px-5 py-3 text-sm font-semibold text-ink transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <m.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent"
        style={{ scaleX: scrollYProgress }}
      />

      <m.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.15, ease: easeOutExpo }}
      >
        <div className="container-x">
          <div
            className={cn(
              'mx-auto mt-3 flex h-16 items-center justify-between gap-6 rounded-full border px-2 pl-5 transition-[max-width,background-color,border-color,box-shadow] duration-700 ease-[var(--ease-out-expo)] sm:mt-4',
              scrolled
                ? 'glass max-w-[1200px] border-line shadow-[0_20px_50px_-30px_rgb(0_0_0/0.9)]'
                : 'max-w-[1440px] border-transparent bg-transparent',
            )}
          >
            <a href="#home" className="-m-2 rounded-full p-2" aria-label="Pixelvaan — back to top">
              <Logo animate />
            </a>

            <nav aria-label="Primary" className="hidden xl:block">
              <ul className="flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive = active === item.href.slice(1)
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        aria-current={isActive ? 'true' : undefined}
                        className={cn(
                          'relative block rounded-full px-3.5 py-2 text-sm transition-colors duration-300',
                          isActive ? 'text-fg' : 'text-muted hover:text-fg',
                        )}
                      >
                        {isActive && (
                          <m.span
                            layoutId="nav-active"
                            className="absolute inset-0 -z-10 rounded-full bg-fg/[0.07]"
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          />
                        )}
                        {item.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <ButtonLink href={primaryCta.href} className="hidden sm:inline-flex" variant="light">
                {primaryCta.label}
              </ButtonLink>
              <button
                type="button"
                className="relative grid size-12 place-items-center rounded-full border border-line-strong bg-fg/[0.03] transition-colors hover:bg-fg/[0.08] active:scale-95 xl:hidden"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span aria-hidden="true" className="relative block h-3 w-5">
                  <span
                    className={cn(
                      'absolute left-0 top-0 h-[1.5px] w-full bg-fg transition-transform duration-500 ease-[var(--ease-out-expo)]',
                      menuOpen && 'translate-y-[5.25px] rotate-45',
                    )}
                  />
                  <span
                    className={cn(
                      'absolute bottom-0 left-0 h-[1.5px] w-full bg-fg transition-transform duration-500 ease-[var(--ease-out-expo)]',
                      menuOpen && '-translate-y-[5.25px] -rotate-45',
                    )}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </m.header>

      <MobileMenu open={menuOpen} onClose={closeMenu} active={active} />
    </>
  )
}
