import { useEffect } from 'react'
import { brand } from '@/config/site'
import { Logo } from '@/components/ui/Logo'
import { ButtonLink } from '@/components/ui/Button'
import { RevealText } from '@/animations/RevealText'
import { FadeIn } from '@/animations/FadeIn'

/** Rendered for any path other than "/". Marked noindex. */
export default function NotFoundPage() {
  useEffect(() => {
    document.title = `Page not found — ${brand.name}`
    const robots = document.querySelector('meta[name="robots"]') ?? document.head.appendChild(document.createElement('meta'))
    robots.setAttribute('name', 'robots')
    robots.setAttribute('content', 'noindex, follow')
  }, [])

  return (
    <main id="main" tabIndex={-1} className="relative isolate flex min-h-[100svh] flex-col overflow-clip">
      <div aria-hidden="true" className="pixel-grid absolute inset-0 -z-10 [mask-image:radial-gradient(60%_50%_at_50%_40%,black,transparent)]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-[radial-gradient(50%_60%_at_50%_80%,rgb(255_90_31/0.15),transparent_70%)]" />
      <header className="container-x flex h-24 items-center">
        <a href="/" aria-label={`${brand.name} home`} className="rounded-full">
          <Logo animate />
        </a>
      </header>
      <div className="container-x flex flex-1 flex-col items-start justify-center pb-24">
        <FadeIn y={12}>
          <p className="eyebrow">Error 404</p>
        </FadeIn>
        <RevealText
          as="h1"
          text="This page took a *wrong turn.*"
          className="display mt-6 max-w-[14ch] text-[clamp(3rem,9vw,8rem)]"
          accentClassName="serif-accent text-accent-soft"
        />
        <FadeIn delay={0.3}>
          <p className="mt-6 max-w-md text-lg text-muted">
            The page you’re looking for doesn’t exist or has moved. Let’s get you back somewhere useful.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/" size="lg">
              Back to home
            </ButtonLink>
            <ButtonLink href="/#contact" size="lg" variant="secondary">
              Start a project
            </ButtonLink>
          </div>
        </FadeIn>
      </div>
    </main>
  )
}
