import previews from '@/data/generated/previews.json'
import { cn } from '@/lib/cn'

type View = 'desktop' | 'full' | 'mobile'

const widths: Record<View, number[]> = {
  desktop: [640, 960, 1440],
  full: [960, 1440],
  mobile: [390, 780],
}

type PreviewMeta = { width: number; height: number; lqip: string }
const manifest = previews as Record<string, Record<View, PreviewMeta>>

type ProjectImageProps = {
  slug: string
  view?: View
  alt: string
  /** The `sizes` attribute — describe the rendered width for the browser. */
  sizes: string
  className?: string
  priority?: boolean
}

/**
 * Responsive, lazy-loaded project preview: AVIF with WebP fallback at
 * several widths, intrinsic size to prevent layout shift, and a tiny
 * blurred placeholder while the real image loads.
 */
export function ProjectImage({ slug, view = 'desktop', alt, sizes, className, priority = false }: ProjectImageProps) {
  const meta = manifest[slug]?.[view]
  const set = (ext: 'avif' | 'webp') => widths[view].map((w) => `/projects/${slug}/${view}-${w}.${ext} ${w}w`).join(', ')
  const fallback = `/projects/${slug}/${view}-${widths[view][1] ?? widths[view][0]}.webp`

  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src={fallback}
        alt={alt}
        width={meta?.width}
        height={meta?.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        draggable={false}
        className={cn('block h-auto w-full bg-ink-3 bg-cover bg-center', className)}
        style={meta ? { backgroundImage: `url("${meta.lqip}")` } : undefined}
      />
    </picture>
  )
}
