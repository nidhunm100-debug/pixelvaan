import { useRef, type FocusEvent } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { industryPanels } from '@/data/industries'
import { getProject } from '@/data/projects'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/cn'
import { usePreferences } from '@/hooks/usePreferences'
import { RevealText } from '@/animations/RevealText'
import { FadeIn } from '@/animations/FadeIn'
import { BrowserFrame, PhoneFrame } from '@/components/ui/Frames'
import { ProjectImage } from '@/components/ui/ProjectImage'
import { openProject } from '@/components/work/useProjectDeepLink'

/**
 * "One studio. Every industry." — a pinned, horizontally scrolling reel on
 * desktop (GSAP ScrollTrigger pin + containerAnimation). On tablets, phones
 * and with reduced motion it becomes a native, touch-friendly snap carousel.
 */
export function Showcase() {
  const root = useRef<HTMLElement>(null)
  const pin = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLUListElement>(null)
  const trigger = useRef<ScrollTrigger | null>(null)
  const { isDesktop, reducedMotion } = usePreferences()
  const pinned = isDesktop && !reducedMotion

  useGSAP(
    () => {
      if (!pinned || !track.current || !pin.current) return
      const trackEl = track.current
      const distance = () => Math.max(0, trackEl.scrollWidth - window.innerWidth)

      const scrollTween = gsap.to(trackEl, {
        x: () => -distance(),
        ease: 'none', // required for containerAnimation
        scrollTrigger: {
          trigger: pin.current,
          pin: true,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: 0.7,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
      trigger.current = scrollTween.scrollTrigger ?? null

      gsap.fromTo(
        '.sc-progress',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: pin.current, start: 'top top', end: () => `+=${distance()}`, scrub: true, invalidateOnRefresh: true },
        },
      )

      gsap.utils.toArray<HTMLElement>('.sc-panel').forEach((panel) => {
        const media = panel.querySelector('.sc-media')
        const text = panel.querySelectorAll('.sc-text > *')
        gsap.fromTo(
          media,
          { scale: 0.84, autoAlpha: 0.35 },
          {
            scale: 1,
            autoAlpha: 1,
            ease: 'none',
            scrollTrigger: { trigger: panel, containerAnimation: scrollTween, start: 'left right', end: 'left 35%', scrub: true },
          },
        )
        gsap.from(text, {
          y: 36,
          autoAlpha: 0,
          stagger: 0.07,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: { trigger: panel, containerAnimation: scrollTween, start: 'left 72%', toggleActions: 'play none none reverse' },
        })
      })

      return () => {
        trigger.current = null
      }
    },
    { scope: root, dependencies: [pinned], revertOnUpdate: true },
  )

  // Keyboard users tabbing into a panel: scroll the page so it's in view.
  const onPanelFocus = (index: number) => (event: FocusEvent) => {
    const st = trigger.current
    if (!st || !event.currentTarget.contains(event.target as Node)) return
    const progress = industryPanels.length > 1 ? index / (industryPanels.length - 1) : 0
    window.scrollTo({ top: st.start + (st.end - st.start) * progress, behavior: 'instant' as ScrollBehavior })
  }

  const scrollCarousel = (direction: 1 | -1) => {
    const el = track.current
    if (!el) return
    const panel = el.querySelector<HTMLElement>('.sc-panel')
    el.scrollBy({ left: direction * ((panel?.offsetWidth ?? el.clientWidth) + 16), behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <section ref={root} id="industries" aria-labelledby="industries-title" className="relative">
      <div ref={pin} className={cn('relative flex flex-col overflow-hidden', pinned ? 'h-[100svh] justify-center' : 'py-24 sm:py-32')}>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_20%_100%,rgb(38_48_94/0.45),transparent_70%)]" />
        <div className="container-x flex items-end justify-between gap-8">
          <div>
            <FadeIn y={12}>
              <p className="eyebrow">
                <span className="tabular-nums">04</span>
                <span aria-hidden="true">—</span>
                Industries
              </p>
            </FadeIn>
            <RevealText
              id="industries-title"
              text="One studio. *Every industry.*"
              className="display mt-5 text-[clamp(2.4rem,5.5vw,5rem)]"
            />
          </div>
          {pinned ? (
            <div className="hidden w-56 shrink-0 pb-3 lg:block" aria-hidden="true">
              <div className="flex justify-between text-xs uppercase tracking-[0.16em] text-dim">
                <span>Scroll</span>
                <span className="tabular-nums">{String(industryPanels.length).padStart(2, '0')} industries</span>
              </div>
              <div className="mt-3 h-px bg-line-strong">
                <div className="sc-progress h-px origin-left bg-accent" />
              </div>
            </div>
          ) : (
            <div className="hidden shrink-0 gap-2 pb-2 sm:flex">
              <button type="button" onClick={() => scrollCarousel(-1)} aria-label="Previous industry" className="grid size-12 place-items-center rounded-full border border-line-strong transition-colors hover:bg-fg/[0.08] active:scale-95">
                <ArrowLeft className="size-5" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => scrollCarousel(1)} aria-label="Next industry" className="grid size-12 place-items-center rounded-full border border-line-strong transition-colors hover:bg-fg/[0.08] active:scale-95">
                <ArrowRight className="size-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        <ul
          ref={track}
          data-lenis-prevent-horizontal={pinned ? undefined : true}
          aria-label="Industries we design for"
          className={cn(
            'mt-10 flex gap-4 lg:mt-14',
            pinned
              ? 'w-max gap-8 pl-[max(3rem,calc((100vw-1440px)/2+3rem))] pr-[12vw] will-change-transform'
              : 'scrollbar-none snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-px-[clamp(1.25rem,4vw,3rem)] px-[clamp(1.25rem,4vw,3rem)] pb-4',
          )}
        >
          {industryPanels.map((panel, i) => {
            const project = getProject(panel.projectSlug)
            if (!project) return null
            return (
              <li
                key={panel.industry}
                onFocus={onPanelFocus(i)}
                className={cn(
                  'sc-panel shrink-0 snap-start',
                  pinned ? 'w-[min(76vw,1120px)]' : 'w-[86vw] max-w-[34rem] sm:w-[70vw]',
                )}
              >
                <div
                  className={cn(
                    'grid h-full overflow-hidden rounded-[28px] border border-line bg-ink-2',
                    pinned ? 'grid-cols-[0.9fr_1.1fr] items-center gap-6 p-10' : 'gap-6 p-5 sm:p-7',
                  )}
                >
                  <div className="sc-text flex flex-col">
                    <p className="text-sm tabular-nums text-dim">
                      {String(i + 1).padStart(2, '0')} / {String(industryPanels.length).padStart(2, '0')}
                    </p>
                    <h3 className={cn('mt-4 font-medium tracking-[-0.045em]', pinned ? 'text-[clamp(3rem,5vw,4.75rem)] leading-[0.95]' : 'text-4xl')}>
                      {panel.industry}
                    </h3>
                    <p className={cn('mt-4 max-w-sm text-fg/85', pinned ? 'text-xl leading-snug' : 'text-lg leading-snug')}>{panel.headline}</p>
                    <ul className="mt-6 flex flex-wrap gap-2" aria-label={`What a ${panel.industry.toLowerCase()} website needs`}>
                      {panel.needs.map((need) => (
                        <li key={need} className="rounded-full border border-line-strong px-3 py-1 text-sm text-muted">
                          {need}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => openProject(project.slug)}
                      className="group mt-8 inline-flex items-center gap-2 self-start rounded-full text-sm font-medium text-fg/80 transition-colors hover:text-accent-soft"
                    >
                      View the {project.name} concept
                      <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    </button>
                  </div>

                  <div className={cn('sc-media relative', pinned ? 'pb-10 pr-8' : 'order-first')}>
                    {pinned ? (
                      <>
                        <BrowserFrame label={project.name}>
                          <ProjectImage slug={project.slug} alt="" sizes="44vw" />
                        </BrowserFrame>
                        <PhoneFrame className="absolute -bottom-2 right-0 w-[26%]">
                          <ProjectImage slug={project.slug} view="mobile" alt="" sizes="12vw" />
                        </PhoneFrame>
                      </>
                    ) : (
                      <div className="relative overflow-hidden rounded-2xl bg-ink-3 px-8 pt-8 sm:px-14 sm:pt-10">
                        <div aria-hidden="true" className="absolute inset-0 opacity-50" style={{ background: `radial-gradient(70% 70% at 50% 100%, ${project.accent}33, transparent 70%)` }} />
                        <PhoneFrame className="relative mx-auto -mb-24 w-[62%] max-w-[13rem] sm:-mb-28">
                          <ProjectImage slug={project.slug} view="mobile" alt="" sizes="(min-width: 640px) 13rem, 52vw" />
                        </PhoneFrame>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
