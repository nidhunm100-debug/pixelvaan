/**
 * "Why Pixelvaan" / About content.
 * Only factual statements about what the service provides — no invented
 * client counts, awards or ratings.
 */
export const aboutStatement =
  'Pixelvaan is a web design and development studio for growing Indian businesses. We design, build and optimise websites that make you look as good online as you are in person — premium web design, without the agency overhead.'

export type Reason = {
  id: string
  value: string
  /** When set, the value animates as a number (e.g. the starting price). */
  countTo?: number
  label: string
  description: string
}

export const reasons: Reason[] = [
  {
    id: 'price',
    value: '₹5,999',
    countTo: 5999,
    label: 'Starting price',
    description: 'Transparent pricing for a professionally designed website.',
  },
  {
    id: 'mobile',
    value: 'Mobile First',
    label: 'Every website optimised for phones',
    description: 'Designed for the screen your customers actually use.',
  },
  {
    id: 'seo',
    value: 'SEO Ready',
    label: 'Built with search visibility in mind',
    description: 'Clean structure, metadata and speed from day one.',
  },
  {
    id: 'fast',
    value: 'Fast',
    label: 'Performance-focused development',
    description: 'Lightweight pages that load quickly on real networks.',
  },
  {
    id: 'modern',
    value: 'Modern',
    label: 'Contemporary design and technology',
    description: 'A custom look on a modern, maintainable stack.',
  },
]

/** Traditional agency vs Pixelvaan — general, non-specific comparison. */
export const comparison = {
  rows: [
    { label: 'Pricing', traditional: 'Custom quote after discovery', pixelvaan: 'Starts at ₹5,999, upfront' },
    { label: 'Design', traditional: 'Premium, often at a premium', pixelvaan: 'Premium, custom-designed' },
    { label: 'Technology', traditional: 'Varies by agency', pixelvaan: 'Modern, fast, mobile-first' },
    { label: 'Getting started', traditional: 'Proposals & meetings', pixelvaan: 'One conversation' },
  ],
  footnote: 'A general comparison. Every agency works differently.',
}
