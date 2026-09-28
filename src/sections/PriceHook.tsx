import { useRef } from 'react'
import { m } from 'motion/react'
import { Check, Minus } from 'lucide-react'
import { brand } from '@/config/site'
import { comparison } from '@/data/about'
import { formatINR } from '@/lib/format'
import { gsap, motionQueries, useGSAP } from '@/lib/gsap'
import { RevealText } from '@/animations/RevealText'
import { FadeIn } from '@/animations/FadeIn'
import { StaggerChildren, StaggerItem } from '@/animations/StaggerChildren'
import { easeOutExpo, revealViewport } from '@/animations/easing'
import { ButtonLink } from '@/components/ui/Button'

/** A single odometer wheel that spins past a full turn before landing. */
function Digit({ digit, index }: { digit: number; index: number }) {
  const cells = Array.from({ length: 20 }, (_, i) => i % 10)
  return (
    <span className="relative inline-block h-[1.02em] overflow-hidden align-top">
      <m.span
        className="flex flex-col"
        initial={{ y: '0%' }}
        whileInView={{ y: `-${((digit + 10) / 20) * 100}%` }}
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        transition={{ duration: 1.9 + index * 0.18, ease: easeOutExpo, delay: 0.1 }}
      >
        {cells.map((n, i) => (
          <span key={i} className="block h-[1.02em] leading-[1.02]">
            {n}
          </span>
        ))}
      </m.span>
    </span>
  )
}

function PriceOdometer({ value }: { value: number }) {
  const text = formatINR(value)
  let digitIndex = 0
  return (
    <p className="font-semibold leading-none tracking-[-0.055em] text-ink text-[clamp(5.25rem,19vw,15.5rem)]">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex items-start">
        {text.split('').map((char, i) =>
          /\d/.test(char) ? (
            <Digit key={i} digit={Number(char)} index={digitIndex++} />
          ) : char === '₹' ? (
            <span key={i} className="mr-[0.04em] mt-[0.1em] text-[0.5em] font-medium text-accent-deep">
              {char}
            </span>
          ) : (
            <span key={i} className="-mx-[0.02em]">
              {char}
            </span>
          ),
        )}
      </span>
    </p>
  )
}

export function PriceHook() {
  const root = useRef<HTMLElement>(null)
  const panel = useRef<HTMLDivElement>(null)

  // Section transition: the paper panel expands to full size as it arrives.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(motionQueries.motionOk, () => {
        gsap.fromTo(
          panel.current,
          { scale: 0.93, y: 40 },
          {
            scale: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top 30%', scrub: 0.6 },
          },
        )
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="offer" aria-labelledby="offer-title" className="relative py-6 sm:py-10">
      <div className="container-x">
        <div
          ref={panel}
          className="relative isolate overflow-hidden rounded-[28px] bg-paper px-5 py-16 text-ink will-change-transform xs:px-7 sm:rounded-[40px] sm:px-12 sm:py-20 lg:px-20 lg:py-28"
        >
          <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60 [background-image:linear-gradient(to_right,rgb(11_11_13/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(11_11_13/0.05)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(70%_70%_at_85%_20%,black,transparent)]" />
          <div aria-hidden="true" className="absolute -right-40 -top-40 -z-10 size-[36rem] rounded-full bg-[radial-gradient(circle,rgb(255_90_31/0.16),transparent_65%)]" />

          <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-6">
              <FadeIn y={12}>
                <p className="eyebrow text-ink/60">
                  <span className="tabular-nums">01</span>
                  <span aria-hidden="true">—</span>
                  The offer
                </p>
              </FadeIn>
              <RevealText
                id="offer-title"
                text="A Professional Website. *Without the Professional-Agency Price.*"
                className="display mt-6 text-balance text-[clamp(2.4rem,5.2vw,4.75rem)]"
                accentClassName="serif-accent text-accent-deep"
              />
              <FadeIn delay={0.2}>
                <p className="mt-7 max-w-md text-lg leading-relaxed text-ink/70">
                  Your business deserves more than a template. Pixelvaan brings premium web design to growing
                  businesses — without the agency overhead.
                </p>
              </FadeIn>
            </div>

            <div className="lg:col-span-6 lg:justify-self-end lg:text-right">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-ink/60">Starting at</p>
              <PriceOdometer value={brand.startingPrice} />
              <FadeIn delay={0.3} className="flex flex-col gap-6 lg:items-end">
                <p className="text-lg text-ink/70">Website packages starting from {formatINR(brand.startingPrice)}</p>
                <div>
                  <ButtonLink href="#contact" variant="dark" size="lg">
                    Get Your Website
                  </ButtonLink>
                </div>
              </FadeIn>
            </div>
          </div>

          <div className="mt-20 grid gap-4 lg:mt-28 lg:grid-cols-2">
            <FadeIn className="rounded-3xl border border-ink/10 bg-paper-2/60 p-6 sm:p-9">
              <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-ink/60">Traditional agency</h3>
              <dl className="mt-6 divide-y divide-ink/10">
                {comparison.rows.map((row) => (
                  <div key={row.label} className="grid grid-cols-[1.75rem_1fr] gap-x-3 py-4 sm:grid-cols-[1.75rem_9rem_1fr]">
                    <Minus className="mt-0.5 size-5 text-ink/35" aria-hidden="true" />
                    <dt className="text-sm text-ink/55 sm:text-base">{row.label}</dt>
                    <dd className="col-start-2 text-base text-ink/75 sm:col-start-3">{row.traditional}</dd>
                  </div>
                ))}
              </dl>
            </FadeIn>
            <FadeIn delay={0.12} className="relative overflow-hidden rounded-3xl bg-ink p-6 text-fg sm:p-9">
              <div aria-hidden="true" className="absolute -right-24 -top-24 size-72 rounded-full bg-[radial-gradient(circle,rgb(255_90_31/0.35),transparent_65%)]" />
              <h3 className="relative text-sm font-medium uppercase tracking-[0.18em] text-accent-soft">Pixelvaan</h3>
              <dl className="relative mt-6 divide-y divide-line">
                {comparison.rows.map((row) => (
                  <div key={row.label} className="grid grid-cols-[1.75rem_1fr] gap-x-3 py-4 sm:grid-cols-[1.75rem_9rem_1fr]">
                    <span className="mt-0.5 grid size-5 place-items-center rounded-full bg-accent text-ink">
                      <Check className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    <dt className="text-sm text-muted sm:text-base">{row.label}</dt>
                    <dd className="col-start-2 text-base font-medium sm:col-start-3">{row.pixelvaan}</dd>
                  </div>
                ))}
              </dl>
            </FadeIn>
          </div>
          <p className="mt-4 text-sm text-ink/55">{comparison.footnote}</p>

          <StaggerChildren
            as="ul"
            className="mt-16 grid gap-3 border-t border-ink/10 pt-10 sm:grid-cols-3 lg:mt-24"
            stagger={0.12}
          >
            {['Premium design.', 'Modern technology.', 'Transparent pricing.'].map((line) => (
              <StaggerItem key={line} as="li" className="text-[clamp(1.5rem,2.6vw,2.25rem)] font-medium tracking-[-0.035em]">
                {line}
              </StaggerItem>
            ))}
          </StaggerChildren>
          <m.span
            aria-hidden="true"
            className="mt-8 block h-px origin-left bg-ink/15"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={revealViewport}
            transition={{ duration: 1.6, ease: easeOutExpo }}
          />
        </div>
      </div>
    </section>
  )
}
