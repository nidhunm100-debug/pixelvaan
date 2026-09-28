import { useRef, type ReactNode } from 'react'
import { gsap, motionQueries, useGSAP } from '@/lib/gsap'

type ParallaxProps = {
  children: ReactNode
  className?: string
  /** Total vertical travel in px across the element's pass through the viewport. */
  distance?: number
  /** Skip the effect below 1024px. */
  desktopOnly?: boolean
}

/**
 * Scroll-scrubbed parallax (GSAP ScrollTrigger). The wrapper is the trigger;
 * only its inner layer moves, so trigger positions stay stable.
 */
export function Parallax({ children, className, distance = 80, desktopOnly = false }: ParallaxProps) {
  const root = useRef<HTMLDivElement>(null)
  const layer = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      const query = desktopOnly ? `${motionQueries.motionOk} and ${motionQueries.desktop}` : motionQueries.motionOk
      mm.add(query, () => {
        gsap.fromTo(
          layer.current,
          { y: -distance / 2 },
          {
            y: distance / 2,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
    },
    { scope: root, dependencies: [distance, desktopOnly] },
  )

  return (
    <div ref={root} className={className}>
      <div ref={layer} className="will-change-transform">
        {children}
      </div>
    </div>
  )
}
