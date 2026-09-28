import { useRef, type CSSProperties } from 'react'
import { Gauge, Search, Smartphone } from 'lucide-react'
import { brand } from '@/config/site'
import { getProject } from '@/data/projects'
import { gsap, motionQueries, useGSAP } from '@/lib/gsap'
import { formatINR } from '@/lib/format'
import { cn } from '@/lib/cn'
import { usePreferences } from '@/hooks/usePreferences'
import { useOffscreenPause } from '@/hooks/useOffscreenPause'
import { RevealText } from '@/animations/RevealText'
import { ButtonLink } from '@/components/ui/Button'
import { BrowserFrame, PhoneFrame } from '@/components/ui/Frames'
import { ProjectImage } from '@/components/ui/ProjectImage'

type Slot = {
  slug: string
  /** Position/size on ≥768px, as % of the stage. */
  desk: { left: string; top: string; width: string }
  /** Position/size on phones. */
  mob: { left: string; top: string; width: string }
  z: number
  /** Mouse-parallax depth (0 = static, 1 = most movement). */
  depth: number
  side: 'l' | 'r' | 'c'
  back?: boolean
  phone?: boolean
  float: 'animate-float' | 'animate-float-slow'
  delay: string
}

// The composition: an editorial storefront in front, surrounded by sites
// from other industries at different depths.
const slots: Slot[] = [
  { slug: 'volt-motors', desk: { left: '6%', top: '-4%', width: '24%' }, mob: { left: '-8%', top: '2%', width: '44%' }, z: 5, depth: 1, side: 'l', back: true, float: 'animate-float-slow', delay: '-2s' },
  { slug: 'aangan-estates', desk: { left: '70%', top: '-6%', width: '24%' }, mob: { left: '64%', top: '0%', width: '44%' }, z: 5, depth: 1, side: 'r', back: true, float: 'animate-float-slow', delay: '-5s' },
  { slug: 'tamarind-and-smoke', desk: { left: '-1%', top: '22%', width: '34%' }, mob: { left: '-14%', top: '30%', width: '50%' }, z: 20, depth: 0.65, side: 'l', float: 'animate-float', delay: '-1s' },
  { slug: 'ledgerly', desk: { left: '67%', top: '18%', width: '34%' }, mob: { left: '64%', top: '26%', width: '50%' }, z: 20, depth: 0.65, side: 'r', float: 'animate-float', delay: '-3.5s' },
  { slug: 'maison-kaavya', desk: { left: '21%', top: '8%', width: '58%' }, mob: { left: '7%', top: '14%', width: '86%' }, z: 30, depth: 0.3, side: 'c', float: 'animate-float-slow', delay: '0s' },
  { slug: 'mitti-botanicals', desk: { left: '73%', top: '44%', width: '13.5%' }, mob: { left: '68%', top: '46%', width: '28%' }, z: 40, depth: 0.2, side: 'r', phone: true, float: 'animate-float', delay: '-4s' },
]

const chips = [
  { icon: Smartphone, label: 'Mobile-first', className: 'left-[3%] top-[70%] md:left-[13%] md:top-[74%]', delay: '-1.5s' },
  { icon: Search, label: 'SEO-ready', className: 'hidden md:flex left-[84%] top-[4%]', delay: '-3s' },
  { icon: Gauge, label: 'Fast loading', className: 'right-[3%] top-[84%] md:right-auto md:left-[56%] md:top-[90%]', delay: '-4.5s' },
]

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const { pointerEffects } = usePreferences()
  useOffscreenPause(root)

  useGSAP(
    (_, contextSafe) => {
      const mm = gsap.matchMedia()

      mm.add(
        { motionOk: motionQueries.motionOk, desktop: '(min-width: 768px)', fine: motionQueries.finePointer },
        (context) => {
          const { motionOk, desktop, fine } = context.conditions as Record<string, boolean>
          if (!motionOk) return // Reduced motion: everything renders in its final state.

          // ── Page-load intro ───────────────────────────────────────────────
          const intro = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.2 })
          intro
            .from('.hero-chip', { y: 16, autoAlpha: 0, duration: 1 })
            .from('.rt-word', { yPercent: 115, duration: 1.25, stagger: 0.045 }, '<0.05')
            .from('.hero-sub', { y: 24, autoAlpha: 0, duration: 1.1 }, '-=0.95')
            .from('.hero-cta > *', { y: 24, autoAlpha: 0, duration: 1.1, stagger: 0.08 }, '-=0.95')
            .from('.hero-trust', { autoAlpha: 0, y: 10, duration: 1 }, '-=0.85')
            .from('.hero-window', { y: 140, autoAlpha: 0, duration: 1.7, stagger: { each: 0.07, from: 'end' } }, '-=1.2')
            .from('.hero-float-chip', { scale: 0.7, autoAlpha: 0, duration: 0.9, stagger: 0.12, ease: 'back.out(1.8)' }, '-=0.9')

          // ── Scroll: the stage tilts up to face the viewer, side screens spread ──
          const scroll = gsap.timeline({
            scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.8 },
          })
          if (desktop) {
            scroll
              .fromTo('.hero-stage', { rotateX: 14, yPercent: 0 }, { rotateX: 0, yPercent: -6, ease: 'none' }, 0)
              .to('.hero-slot[data-side="l"]', { xPercent: -14, ease: 'none' }, 0)
              .to('.hero-slot[data-side="r"]', { xPercent: 14, ease: 'none' }, 0)
              .to('.hero-copy', { yPercent: -18, autoAlpha: 0.15, ease: 'none' }, 0)
          } else {
            scroll.to('.hero-stage', { yPercent: -8, ease: 'none' }, 0).to('.hero-copy', { yPercent: -10, ease: 'none' }, 0)
          }

          // ── Pointer: layers drift by depth (desktop, fine pointer only) ──
          if (!(desktop && fine)) return
          const layers = gsap.utils.toArray<HTMLElement>('.hero-depth').map((el) => ({
            depth: Number(el.dataset.depth ?? 0.5),
            x: gsap.quickTo(el, 'x', { duration: 1.1, ease: 'power3' }),
            y: gsap.quickTo(el, 'y', { duration: 1.1, ease: 'power3' }),
          }))
          const onMove = contextSafe!((event: PointerEvent) => {
            const nx = event.clientX / window.innerWidth - 0.5
            const ny = event.clientY / window.innerHeight - 0.5
            for (const layer of layers) {
              layer.x(nx * layer.depth * -48)
              layer.y(ny * layer.depth * -28)
            }
          })
          window.addEventListener('pointermove', onMove, { passive: true })
          return () => window.removeEventListener('pointermove', onMove)
        },
      )
    },
    { scope: root, dependencies: [pointerEffects] },
  )

  return (
    <section
      ref={root}
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-clip pb-16 pt-32 sm:pt-40 lg:pb-24 lg:pt-40"
    >
      <HeroBackdrop />

      <div className="hero-copy container-x relative z-10 flex flex-col items-center text-center">
        <p className="hero-chip glass inline-flex items-center gap-3 rounded-full border border-line-strong py-1.5 pl-2 pr-4 text-sm text-fg/90">
          <span className="relative grid size-6 place-items-center rounded-full bg-accent/15">
            <span className="absolute size-2 rounded-full bg-accent animate-ping-soft" aria-hidden="true" />
            <span className="relative size-2 rounded-full bg-accent" />
          </span>
          <span>
            Websites from <strong className="font-semibold text-fg">{formatINR(brand.startingPrice)}</strong>
          </span>
          <span className="hidden h-3.5 w-px bg-line-strong sm:block" aria-hidden="true" />
          <span className="hidden text-muted sm:inline">For Indian businesses</span>
        </p>

        <RevealText
          as="h1"
          id="hero-title"
          trigger="manual"
          text="We Build Websites That Make Businesses *Look Bigger.*"
          accentClassName="serif-accent text-accent-soft pr-[0.04em] text-[1.06em]"
          className="display mt-7 max-w-[15ch] text-balance text-[clamp(2.85rem,6.9vw,7.25rem)] sm:mt-8 lg:max-w-[16ch]"
        />

        <p className="hero-sub mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">
          Premium, fast and conversion-focused websites for Indian businesses — starting at just{' '}
          <strong className="font-semibold text-fg">{formatINR(brand.startingPrice)}</strong>.
        </p>

        <div className="hero-cta mt-9 flex w-full flex-col items-center justify-center gap-3 xs:w-auto sm:flex-row">
          <ButtonLink href="#contact" size="lg" className="w-full xs:w-auto">
            Start Your Website
          </ButtonLink>
          <ButtonLink href="#work" size="lg" variant="secondary" className="w-full xs:w-auto">
            View Our Work
          </ButtonLink>
        </div>

        <p className="hero-trust mt-7 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-muted">
          Designed <span className="text-accent" aria-hidden="true">•</span> Developed{' '}
          <span className="text-accent" aria-hidden="true">•</span> Optimized
        </p>
      </div>

      <HeroStage />
    </section>
  )
}

function HeroStage() {
  return (
    <div className="container-x relative mt-14 sm:mt-20 [perspective:1600px]" aria-hidden="true">
      <div className="hero-stage relative mx-auto aspect-[4/3] w-full max-w-[1320px] origin-[50%_0%] [transform-style:preserve-3d] md:aspect-[21/10]">
        {slots.map((slot) => {
          const project = getProject(slot.slug)
          const style = {
            '--dl': slot.desk.left,
            '--dt': slot.desk.top,
            '--dw': slot.desk.width,
            '--ml': slot.mob.left,
            '--mt': slot.mob.top,
            '--mw': slot.mob.width,
            zIndex: slot.z,
          } as CSSProperties
          return (
            <div
              key={slot.slug}
              data-side={slot.side}
              style={style}
              className={cn(
                'hero-slot absolute left-[var(--ml)] top-[var(--mt)] w-[var(--mw)] md:left-[var(--dl)] md:top-[var(--dt)] md:w-[var(--dw)]',
                slot.back && 'opacity-60 [@media(min-width:768px)]:opacity-70',
              )}
            >
              <div className="hero-window">
                <div className="hero-depth" data-depth={slot.depth}>
                  <div className={slot.float} style={{ animationDelay: slot.delay }}>
                    {slot.phone ? (
                      <PhoneFrame>
                        <ProjectImage slug={slot.slug} view="mobile" alt="" sizes="(min-width: 768px) 13vw, 28vw" priority />
                      </PhoneFrame>
                    ) : (
                      <BrowserFrame
                        label={project?.name}
                        className={cn(
                          'shadow-[0_50px_100px_-40px_rgb(0_0_0/0.95)]',
                          slot.back && 'depth-blur',
                        )}
                      >
                        <ProjectImage
                          slug={slot.slug}
                          alt=""
                          sizes={slot.side === 'c' ? '(min-width: 768px) 58vw, 86vw' : '(min-width: 768px) 34vw, 50vw'}
                          priority={slot.side === 'c'}
                        />
                      </BrowserFrame>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {chips.map(({ icon: Icon, label, className, delay }) => (
          <div key={label} className={cn('hero-float-chip absolute z-50 flex', className)}>
            <div
              className="glass flex animate-float items-center gap-2 rounded-full border border-line-strong py-2 pl-2.5 pr-4 text-xs font-medium text-fg shadow-[0_20px_40px_-20px_rgb(0_0_0/0.9)] sm:text-sm"
              style={{ animationDelay: delay }}
            >
              <span className="grid size-6 place-items-center rounded-full bg-accent text-ink sm:size-7">
                <Icon className="size-3.5 sm:size-4" strokeWidth={2} />
              </span>
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {/* Dusk sky: deep blue above, a warm horizon glow behind the screens. */}
      <div className="absolute inset-0 bg-[radial-gradient(90%_55%_at_50%_0%,rgb(38_48_94/0.55),transparent_70%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(60%_60%_at_50%_70%,rgb(255_90_31/0.16),transparent_70%)]" />
      <div className="absolute left-1/2 top-[38%] h-[46rem] w-[46rem] -translate-x-1/2 animate-drift rounded-full bg-[radial-gradient(circle,rgb(255_138_91/0.10),transparent_62%)]" />
      <div className="pixel-grid absolute inset-0 [mask-image:radial-gradient(70%_55%_at_50%_30%,black,transparent)]" />
      <div className="noise absolute inset-0 opacity-60" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
    </div>
  )
}
