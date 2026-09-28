/**
 * Pricing packages.
 *
 * Only the Website Starter price is confirmed. Higher packages are
 * placeholders — their price is `null`, which renders "Talk to us for details".
 * Do not add guarantees, revision counts, hosting or domain durations here
 * unless they are real, confirmed commercial terms.
 */
export type PricingPlan = {
  id: string
  name: string
  /** Price in rupees, or null for "Talk to us for details". */
  price: number | null
  pricePrefix?: string
  description: string
  features: string[]
  cta: { label: string; href: string }
  featured?: boolean
  /** Marks a package as a placeholder until details are confirmed. */
  placeholder?: boolean
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Website Starter',
    price: 5999,
    pricePrefix: 'Starting at',
    description: 'Everything a growing business needs to look professional online.',
    features: [
      'Professional website',
      'Responsive design',
      'Mobile optimized',
      'Modern UI',
      'Contact form',
      'Basic SEO setup',
      'Social media integration',
      'Fast loading',
      'Deployment assistance',
    ],
    cta: { label: 'Start at ₹5,999', href: '#contact' },
    featured: true,
  },
  {
    id: 'business',
    name: 'Business',
    price: null,
    description: 'For businesses that need more pages, sections and custom functionality.',
    features: ['Everything in Website Starter', 'More pages & sections', 'Custom features on request', 'Advanced integrations'],
    cta: { label: 'Talk to us', href: '#contact' },
    placeholder: true,
  },
  {
    id: 'commerce',
    name: 'E-commerce',
    price: null,
    description: 'For brands ready to sell online with a store built around their products.',
    features: ['Product catalogue', 'Cart & checkout', 'Payment gateway integration', 'Store management guidance'],
    cta: { label: 'Talk to us', href: '#contact' },
    placeholder: true,
  },
]

/** Shown under the pricing cards. Keep it honest — no invented terms. */
export const pricingNote =
  'Domain, hosting, revisions, timelines and third-party costs — talk to us for details. Final pricing depends on your project’s scope.'
