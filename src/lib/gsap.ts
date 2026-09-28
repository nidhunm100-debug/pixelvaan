/**
 * Single place where GSAP plugins are registered (per the gsap-react and
 * gsap-scrolltrigger skills: register once, before any GSAP code runs).
 * Import gsap / ScrollTrigger / useGSAP from here, never directly.
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

gsap.defaults({ ease: 'power3.out', duration: 0.9 })

// Mobile browsers resize the viewport when the address bar shows/hides;
// don't recalculate every trigger for that.
ScrollTrigger.config({ ignoreMobileResize: true })

/** Media conditions shared by every gsap.matchMedia() call. */
export const motionQueries = {
  motionOk: '(prefers-reduced-motion: no-preference)',
  reduceMotion: '(prefers-reduced-motion: reduce)',
  desktop: '(min-width: 1024px)',
  mobile: '(max-width: 1023px)',
  finePointer: '(hover: hover) and (pointer: fine)',
} as const

export { gsap, ScrollTrigger, useGSAP }
