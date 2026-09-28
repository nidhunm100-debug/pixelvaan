import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/data/projects'
import { cn } from '@/lib/cn'
import { TiltCard } from '@/animations/TiltCard'
import { ImageReveal } from '@/animations/ImageReveal'
import { BrowserFrame } from '@/components/ui/Frames'
import { ProjectImage } from '@/components/ui/ProjectImage'
import { ConceptBadge } from '@/components/ui/ConceptBadge'

type ProjectCardProps = {
  project: Project
  index: number
  onOpen: (slug: string) => void
  onIntent?: () => void
  className?: string
}

/**
 * Portfolio card. Hover layers: tilt toward the pointer, frame lifts,
 * screenshot zooms, a light in the project's accent colour follows the
 * cursor, and the project summary slides open. The whole card opens the
 * case study (stretched button on the title for accessibility).
 */
export function ProjectCard({ project, index, onOpen, onIntent, className }: ProjectCardProps) {
  const isConcept = project.kind === 'concept'
  return (
    <article
      className={cn('group relative cursor-pointer', className)}
      style={{ '--accent': project.accent } as CSSProperties}
      onPointerEnter={onIntent}
      onFocus={onIntent}
      // Mouse/touch: the whole card opens the case study. Keyboard users get
      // the real <button> in the title (its click bubbles up to here).
      onClick={() => onOpen(project.slug)}
      data-cursor-label="View"
    >
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-[radial-gradient(60%_60%_at_50%_60%,color-mix(in_srgb,var(--accent)_28%,transparent),transparent_70%)]"
        />
        <TiltCard max={3} className="rounded-xl [--spot-alpha:0.14]">
          <div className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-2">
            <BrowserFrame label={project.name} className="shadow-[0_40px_80px_-40px_rgb(0_0_0/0.9)] transition-shadow duration-700 group-hover:shadow-[0_60px_100px_-40px_rgb(0_0_0/1)]">
              <ImageReveal delay={(index % 2) * 0.12}>
                <div className="transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]">
                  <ProjectImage
                    slug={project.slug}
                    alt={`${project.name} — ${project.industry.toLowerCase()} website concept by Pixelvaan`}
                    sizes="(min-width: 1440px) 660px, (min-width: 768px) 46vw, 92vw"
                  />
                </div>
              </ImageReveal>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(40%_50%_at_var(--mx,50%)_var(--my,50%),rgb(255_255_255/0.35),transparent_70%)]"
              />
            </BrowserFrame>
          </div>
        </TiltCard>
      </div>

      <div className="mt-6 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
            <span className="tabular-nums text-dim">{String(index + 1).padStart(2, '0')}</span>
            <span>{project.industry}</span>
            <span className="text-dim" aria-hidden="true">/</span>
            <span>{project.deliverable}</span>
            {isConcept && <ConceptBadge />}
          </div>
          <h3 className="mt-3 text-[clamp(1.6rem,2.6vw,2.25rem)] font-medium leading-tight tracking-[-0.035em]">
            <button type="button" className="text-left" aria-label={`${project.name} — open case study`}>
              {project.name}
            </button>
          </h3>
          <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-[var(--ease-out-expo)] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
            <p className="overflow-hidden text-muted">
              <span className="block max-w-md pt-2 leading-relaxed">{project.summary}</span>
            </p>
          </div>
        </div>
        <span
          aria-hidden="true"
          className="mt-1 grid size-12 shrink-0 place-items-center rounded-full border border-line-strong transition-[background-color,border-color,color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-ink"
        >
          <ArrowUpRight className="size-5" />
        </span>
      </div>
    </article>
  )
}
