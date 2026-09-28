import { useEffect, useRef } from 'react'
import { ReactLenis, useLenis, type LenisRef } from 'lenis/react'
import type Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so Lenis and ScrollTrigger
 * share one animation loop (official Lenis + GSAP integration):
 *   - lenis.raf() runs inside gsap.ticker
 *   - every Lenis scroll event calls ScrollTrigger.update
 *   - GSAP lag smoothing is disabled to keep them in sync
 *
 * Touch devices keep native scrolling (Lenis' default `syncTouch: false`),
 * and `prefers-reduced-motion` disables smoothing entirely.
 */
export function SmoothScroll() {
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    return () => gsap.ticker.remove(update)
  }, [])

  useLenis(ScrollTrigger.update)

  const lenis = useLenis()
  useAnchorNavigation(lenis)

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.1,
        wheelMultiplier: 1,
        respectReducedMotion: true,
        stopInertiaOnNavigate: true,
      }}
    />
  )
}

/** Scrolls to an element (or the top for #home) and moves keyboard focus there. */
export function scrollToElement(target: HTMLElement, lenis?: Lenis) {
  const isTop = target.id === 'home'
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (lenis) {
    lenis.scrollTo(isTop ? 0 : target, { duration: 1.4, immediate: reduce, force: true })
  } else {
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
  target.focus({ preventScroll: true })
}

/**
 * Intercepts same-page anchor links (href="#id") so they scroll smoothly via
 * Lenis, update the URL and move focus to the target for keyboard and
 * screen-reader users. Also honours a hash on first load.
 */
function useAnchorNavigation(lenis: Lenis | undefined) {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]')
      if (!link) return
      const hash = link.getAttribute('href') ?? ''
      if (hash.length < 2) return
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (!target) return
      event.preventDefault()
      scrollToElement(target, lenis)
      if (window.location.hash !== hash) window.history.pushState(null, '', hash)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [lenis])

  // Deep links like /#pricing: jump once layout (incl. pin spacers) is ready.
  const handledInitialHash = useRef(false)
  useEffect(() => {
    if (handledInitialHash.current || !lenis) return
    handledInitialHash.current = true
    const hash = window.location.hash
    if (hash.length < 2) return
    const jump = () => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target) lenis.scrollTo(target, { immediate: true, force: true })
    }
    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh()
      jump()
    }, 120)
    return () => window.clearTimeout(timer)
  }, [lenis])
}
