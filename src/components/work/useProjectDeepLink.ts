import { useCallback, useEffect, useState } from 'react'
import { getProject } from '@/data/projects'

export const WorkEvents = { open: 'pixelvaan:open-project' } as const

/** Asks the Work section to open a case study from anywhere on the page. */
export function openProject(slug: string) {
  window.dispatchEvent(new CustomEvent<string>(WorkEvents.open, { detail: slug }))
}

const PARAM = 'project'

function readSlug(): string | null {
  const slug = new URLSearchParams(window.location.search).get(PARAM)
  return slug && getProject(slug) ? slug : null
}

function urlFor(slug: string | null) {
  const url = new URL(window.location.href)
  if (slug) url.searchParams.set(PARAM, slug)
  else url.searchParams.delete(PARAM)
  url.hash = ''
  return `${url.pathname}${url.search}`
}

/**
 * Keeps the open case study in the URL (?project=slug) so it can be shared,
 * and so the browser/phone Back button closes it naturally.
 */
export function useProjectDeepLink() {
  const [openSlug, setOpenSlug] = useState<string | null>(() => (typeof window === 'undefined' ? null : readSlug()))

  useEffect(() => {
    const onPop = () => setOpenSlug(readSlug())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const open = useCallback((slug: string) => {
    if (!getProject(slug)) return
    const state = window.history.state as { pixelvaanProject?: boolean } | null
    if (state?.pixelvaanProject) window.history.replaceState({ pixelvaanProject: true }, '', urlFor(slug))
    else window.history.pushState({ pixelvaanProject: true }, '', urlFor(slug))
    setOpenSlug(slug)
  }, [])

  const close = useCallback(() => {
    const state = window.history.state as { pixelvaanProject?: boolean } | null
    if (state?.pixelvaanProject) {
      window.history.back()
    } else {
      window.history.replaceState(null, '', urlFor(null))
      setOpenSlug(null)
    }
  }, [])

  return { openSlug, open, close }
}
