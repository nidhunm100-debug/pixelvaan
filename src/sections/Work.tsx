import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { projects } from '@/data/projects'
import { gsap, motionQueries, useGSAP } from '@/lib/gsap'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ConceptBadge } from '@/components/ui/ConceptBadge'
import { ProjectCard } from '@/components/work/ProjectCard'
import { WorkEvents, useProjectDeepLink } from '@/components/work/useProjectDeepLink'

const loadModal = () => import('@/components/work/ProjectModal')
const ProjectModal = lazy(loadModal)

export function Work() {
  const root = useRef<HTMLElement>(null)
  const { openSlug, open, close } = useProjectDeepLink()
  const [modalRequested, setModalRequested] = useState(false)

  // Download the case-study code as soon as the visitor shows intent.
  const prefetch = useCallback(() => {
    void loadModal()
  }, [])

  useEffect(() => {
    if (openSlug) setModalRequested(true)
  }, [openSlug])

  // Other sections (e.g. the industry showcase) can open a case study.
  useEffect(() => {
    const onOpen = (event: Event) => open((event as CustomEvent<string>).detail)
    window.addEventListener(WorkEvents.open, onOpen)
    return () => window.removeEventListener(WorkEvents.open, onOpen)
  }, [open])

  // Staggered editorial grid: the right column drifts upward as you scroll.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(`${motionQueries.motionOk} and (min-width: 768px)`, () => {
        gsap.utils.toArray<HTMLElement>('.work-offset').forEach((card) => {
          gsap.fromTo(
            card,
            { y: 120 },
            { y: -40, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true } },
          )
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="work" aria-labelledby="work-title" className="section-y relative">
      <div className="container-x">
        <SectionHeader
          index="03"
          label="Work"
          id="work-title"
          title="Work That Speaks *Before We Do.*"
          intro={
            <>
              <span className="block">
                Concept websites we designed to show what’s possible across industries — each built around what that
                business actually needs online.
              </span>
              <span className="mt-4 flex items-center gap-3 text-sm">
                <ConceptBadge /> Concept projects, not client work.
              </span>
            </>
          }
        />

        <ul className="mt-16 grid gap-x-10 gap-y-20 md:grid-cols-2 md:pb-24 lg:mt-24 lg:gap-x-14 lg:gap-y-28">
          {projects.map((project, i) => (
            <li key={project.slug} className={i % 2 === 1 ? 'work-offset' : undefined}>
              <ProjectCard project={project} index={i} onOpen={open} onIntent={prefetch} />
            </li>
          ))}
        </ul>
      </div>

      {modalRequested && (
        <Suspense fallback={null}>
          <AnimatePresence>{openSlug && <ProjectModal key="project-modal" slug={openSlug} onClose={close} onNavigate={open} />}</AnimatePresence>
        </Suspense>
      )}
    </section>
  )
}
