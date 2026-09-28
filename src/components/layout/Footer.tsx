import { ArrowUp } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { m } from 'motion/react'
import { brand, contact, socialLinks } from '@/config/site'
import { navItems } from '@/data/navigation'
import { services } from '@/data/services'
import { emailUrl, phoneLabel, phoneUrl, whatsappUrl } from '@/lib/contact'
import { formatINR } from '@/lib/format'
import { Logo } from '@/components/ui/Logo'
import { ConfigHint } from '@/components/ui/ConfigHint'
import { easeOutExpo, revealViewport } from '@/animations/easing'

export function Footer() {
  const lenis = useLenis()
  const year = new Date().getFullYear()
  const socials = socialLinks.filter((s) => s.url)
  const wa = whatsappUrl()
  const tel = phoneUrl()
  const mail = emailUrl()

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (lenis) lenis.scrollTo(0, { duration: 1.6, immediate: reduce })
    else window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    document.getElementById('main')?.focus({ preventScroll: true })
  }

  return (
    <footer className="relative overflow-clip border-t border-line bg-ink pt-20 sm:pt-28">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo size="lg" />
            <p className="mt-6 max-w-xs text-lg leading-relaxed text-muted">{brand.shortDescription}</p>
            <p className="mt-3 text-sm text-dim">
              Websites from {formatINR(brand.startingPrice)} · {contact.serviceArea}
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-dim">Navigate</h2>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="link-underline text-fg/85 transition-colors hover:text-fg">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-dim">Services</h2>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <a href="#services" className="link-underline text-fg/85 transition-colors hover:text-fg">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-dim">Contact</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a href="#contact" className="link-underline text-fg/85 hover:text-fg">
                  Start a project
                </a>
              </li>
              {wa ? (
                <li>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="link-underline text-fg/85 hover:text-fg">
                    WhatsApp
                  </a>
                </li>
              ) : (
                <li><ConfigHint>contact.whatsappNumber</ConfigHint></li>
              )}
              {tel ? (
                <li>
                  <a href={tel} className="link-underline text-fg/85 hover:text-fg">
                    {phoneLabel()}
                  </a>
                </li>
              ) : (
                <li><ConfigHint>contact.phoneNumber</ConfigHint></li>
              )}
              {mail ? (
                <li>
                  <a href={mail} className="link-underline break-all text-fg/85 hover:text-fg">
                    {contact.email}
                  </a>
                </li>
              ) : (
                <li><ConfigHint>contact.email</ConfigHint></li>
              )}
            </ul>

            <h2 className="mt-10 text-xs font-medium uppercase tracking-[0.18em] text-dim">Social</h2>
            {socials.length > 0 ? (
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a href={social.url} target="_blank" rel="noopener noreferrer" className="link-underline text-fg/85 hover:text-fg">
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-5">
                <ConfigHint>socialLinks[].url</ConfigHint>
              </div>
            )}
          </div>
        </div>

        <div className="mt-20 flex flex-col-reverse gap-6 border-t border-line py-8 text-sm text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {brand.copyrightHolder}. All rights reserved.
          </p>
          <button
            type="button"
            onClick={toTop}
            className="group inline-flex items-center gap-2 self-start rounded-full text-fg/80 transition-colors hover:text-fg sm:self-auto"
          >
            Back to top
            <span className="grid size-9 place-items-center rounded-full border border-line-strong transition-transform duration-500 group-hover:-translate-y-1">
              <ArrowUp className="size-4" aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>

      <m.p
        aria-hidden="true"
        className="pointer-events-none select-none whitespace-nowrap text-center font-semibold leading-[0.78] tracking-[-0.06em] text-fg/[0.06] text-[20.5vw] 3xl:text-[19vw]"
        initial={{ y: '40%', opacity: 0 }}
        whileInView={{ y: '12%', opacity: 1 }}
        viewport={revealViewport}
        transition={{ duration: 1.4, ease: easeOutExpo }}
      >
        {brand.wordmark}
      </m.p>
    </footer>
  )
}
