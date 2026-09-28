import { ArrowUpRight } from 'lucide-react'
import { services } from '@/data/services'
import { selectService } from '@/lib/events'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ServiceIcon } from '@/components/ui/icons'
import { ServiceVisual } from '@/components/ui/ServiceVisual'
import { StaggerChildren, StaggerItem } from '@/animations/StaggerChildren'
import { TiltCard } from '@/animations/TiltCard'

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-y relative">
      <div className="container-x">
        <SectionHeader
          index="02"
          label="Services"
          id="services-title"
          title="Everything You Need to Build Your *Online Presence.*"
          intro="From a first website to a full online store — designed, developed and optimised by one focused team."
        />

        <StaggerChildren
          as="ul"
          className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:mt-24 lg:grid-cols-3"
          stagger={0.07}
        >
          {services.map((service, i) => (
            <StaggerItem key={service.id} as="li" className="bg-ink">
              <TiltCard tilt={false} as="article" className="group h-full p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl border border-line-strong bg-fg/[0.03] text-fg transition-[transform,background-color,color] duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-ink">
                    <ServiceIcon name={service.icon} className="size-5" />
                  </span>
                  <span className="text-sm tabular-nums text-dim">{String(i + 1).padStart(2, '0')}</span>
                </div>

                <div className="mt-6">
                  <ServiceVisual kind={service.visual} />
                </div>

                <h3 className="mt-7 text-2xl font-medium tracking-[-0.03em]">
                  <a
                    href="#contact"
                    onClick={() => selectService(service.title)}
                    className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-[inherit] focus-visible:after:ring-2 focus-visible:after:ring-accent"
                    data-cursor-label="Start"
                  >
                    {service.title}
                  </a>
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{service.description}</p>
                <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-fg/70 transition-colors group-hover:text-accent-soft">
                  Start this project
                  <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </p>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
