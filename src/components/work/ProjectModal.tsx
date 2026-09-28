import { useEffect, useRef } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { ArrowRight, Check, X } from 'lucide-react'
import { getProject, projects } from '@/data/projects'
import { services } from '@/data/services'
import { useOverlay } from '@/hooks/useOverlay'
import { selectService } from '@/lib/events'
import { easeInOutQuint, easeOutExpo } from '@/animations/easing'
import { BrowserFrame, PhoneFrame } from '@/components/ui/Frames'
import { ProjectImage } from '@/components/ui/ProjectImage'
import { ConceptBadge } from '@/components/ui/ConceptBadge'
import { Button } from '@/components/ui/Button'

type ProjectModalProps = {
  slug: string
  onClose: () => void
  onNavigate: (slug: string) => void
}

const deliverableToService: Record<string, string> = {
  'E-commerce website': 'E-commerce Websites',
  'Business website': 'Business Websites',
  'Landing page': 'Landing Pages',
  'Portfolio website': 'Portfolio Websites',
}

/**
 * Case-study dialog. Slides up over the page, traps focus, closes on Esc /
 * Back / the close button, and lets visitors step through projects.
 */
export default function ProjectModal({ slug, onClose, onNavigate }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const project = getProject(slug)
  useOverlay(true, dialogRef, onClose)

  const index = projects.findIndex((p) => p.slug === slug)
  const next = projects[(index + 1) % projects.length]

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [slug])

  if (!project) return null

  const startSimilar = () => {
    const service = deliverableToService[project.deliverable] ?? services[0].title
    onClose()
    // Let the dialog close and history settle before scrolling to the form.
    window.setTimeout(() => {
      selectService(service)
      document.querySelector<HTMLAnchorElement>('a[href="#contact"]')?.click()
    }, 850)
  }

  return (
    <m.div
      className="fixed inset-0 z-[80] flex items-end justify-center sm:p-3 lg:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4, delay: 0.1 } }}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-ink/80 backdrop-blur-sm [[data-effects=lite]_&]:backdrop-blur-none" onClick={onClose} />

      <m.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        className="relative flex h-[calc(100dvh-1rem)] w-full max-w-[1440px] flex-col overflow-hidden rounded-t-[28px] border border-line-strong bg-ink-2 shadow-[0_-40px_120px_-40px_rgb(0_0_0/1)] sm:h-full sm:rounded-[28px]"
        initial={reduce ? { opacity: 0 } : { y: '100%' }}
        animate={reduce ? { opacity: 1 } : { y: '0%' }}
        exit={reduce ? { opacity: 0 } : { y: '100%' }}
        transition={{ duration: 0.8, ease: easeInOutQuint }}
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3 sm:px-8 sm:py-4">
          <div className="flex min-w-0 items-center gap-3">
            {project.kind === 'concept' && <ConceptBadge label="Concept project" />}
            <span className="truncate text-sm text-muted">
              {project.industry} · {project.deliverable}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-autofocus
            aria-label="Close case study"
            className="group grid size-11 shrink-0 place-items-center rounded-full border border-line-strong transition-colors hover:bg-fg/[0.08] active:scale-95"
          >
            <X className="size-5 transition-transform duration-500 group-hover:rotate-90" aria-hidden="true" />
          </button>
        </div>

        <div ref={scrollRef} data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain">
          <AnimatePresence mode="wait" initial={false}>
            <m.article
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.25, ease: easeOutExpo } }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
              className="px-5 pb-16 pt-10 sm:px-8 lg:px-14 lg:pt-14"
            >
              <header className="grid gap-8 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-8">
                  <p className="eyebrow">{project.industry}</p>
                  <h2 id="case-study-title" className="display mt-5 text-[clamp(2.75rem,7vw,6.5rem)]">
                    {project.name}
                  </h2>
                </div>
                <p className="text-lg leading-relaxed text-muted lg:col-span-4">{project.summary}</p>
              </header>

              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
                {[
                  ['Deliverable', project.deliverable],
                  ['Industry', project.industry],
                  ['Typography', project.typography],
                ].map(([label, value]) => (
                  <div key={label} className="bg-ink-2 p-5">
                    <dt className="text-xs uppercase tracking-[0.16em] text-dim">{label}</dt>
                    <dd className="mt-2 text-sm font-medium sm:text-base">{value}</dd>
                  </div>
                ))}
                <div className="bg-ink-2 p-5">
                  <dt className="text-xs uppercase tracking-[0.16em] text-dim">Palette</dt>
                  <dd className="mt-3 flex gap-1.5">
                    {project.palette.map((color) => (
                      <span key={color} className="size-6 rounded-full ring-1 ring-line-strong" style={{ background: color }} title={color} />
                    ))}
                  </dd>
                </div>
              </dl>

              <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-14">
                <div className="lg:col-span-5">
                  <div className="lg:sticky lg:top-6">
                    <h3 className="text-xs uppercase tracking-[0.16em] text-dim">The brief</h3>
                    <p className="mt-3 text-lg leading-relaxed text-fg/90">{project.brief}</p>
                    <h3 className="mt-10 text-xs uppercase tracking-[0.16em] text-dim">Design approach</h3>
                    <p className="mt-3 text-lg leading-relaxed text-fg/90">{project.approach}</p>
                    <h3 className="mt-10 text-xs uppercase tracking-[0.16em] text-dim">What’s included</h3>
                    <ul className="mt-4 space-y-3">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent-soft">
                            <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {project.kind === 'concept' && (
                      <p className="mt-10 rounded-2xl border border-line bg-fg/[0.03] p-5 text-sm leading-relaxed text-muted">
                        This is a concept project designed by Pixelvaan to demonstrate our range. It is not a client
                        website, and the brand, products and details shown are fictional.
                      </p>
                    )}
                    <div className="mt-8">
                      <Button onClick={startSimilar} size="lg" magnetic={false}>
                        Start a project like this
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-8 lg:col-span-7">
                  <BrowserFrame label={project.name}>
                    <ProjectImage
                      slug={project.slug}
                      view="full"
                      alt={`Full homepage design of the ${project.name} concept`}
                      sizes="(min-width: 1024px) 54vw, 94vw"
                    />
                  </BrowserFrame>
                  <div className="grid items-center gap-8 rounded-3xl border border-line bg-ink-3/50 p-6 sm:grid-cols-[minmax(0,15rem)_1fr] sm:p-10">
                    <PhoneFrame className="mx-auto w-full max-w-[15rem]">
                      <ProjectImage slug={project.slug} view="mobile" alt={`Mobile version of the ${project.name} concept`} sizes="240px" />
                    </PhoneFrame>
                    <div>
                      <h3 className="text-2xl font-medium tracking-[-0.03em]">Designed for the phone first.</h3>
                      <p className="mt-3 leading-relaxed text-muted">
                        Most visitors arrive on a phone, so every layout is designed for small screens first, then
                        scaled up — with tap-friendly buttons and fast-loading pages.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <footer className="mt-16 border-t border-line pt-8">
                <button
                  type="button"
                  onClick={() => onNavigate(next.slug)}
                  className="group flex w-full items-center justify-between gap-6 text-left"
                >
                  <span>
                    <span className="block text-xs uppercase tracking-[0.16em] text-dim">Next project</span>
                    <span className="mt-2 block text-[clamp(1.75rem,4vw,3rem)] font-medium tracking-[-0.04em] transition-colors group-hover:text-accent-soft">
                      {next.name}
                    </span>
                  </span>
                  <span className="grid size-14 shrink-0 place-items-center rounded-full border border-line-strong transition-[background-color,color,transform] duration-500 group-hover:translate-x-1 group-hover:bg-accent group-hover:text-ink">
                    <ArrowRight className="size-5" aria-hidden="true" />
                  </span>
                </button>
              </footer>
            </m.article>
          </AnimatePresence>
        </div>
      </m.div>
    </m.div>
  )
}
