/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PIXELVAAN — CENTRAL SITE CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 *  Everything a non-developer is likely to change lives in this file:
 *  brand, contact channels (WhatsApp, phone, email), social links and SEO.
 *
 *  Empty strings are intentional placeholders. Anything left empty is hidden
 *  on the live site (and shown as a dashed "setup" hint while running
 *  `npm run dev`) — so no fake numbers or dead links ever reach visitors.
 *
 *  This file is also read at build time by `vite/seo-plugin.ts` to generate
 *  the <head> metadata, JSON-LD structured data, sitemap.xml and robots.txt.
 *  Keep it free of browser-only code.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const brand = {
  name: 'Pixelvaan',
  wordmark: 'PIXELVAAN',
  shortDescription: 'Modern websites for ambitious businesses.',
  positioning: 'Premium websites made accessible to growing businesses.',
  /** Starting price of the primary package, in rupees. */
  startingPrice: 5999,
  currency: 'INR',
  country: 'India',
  /** Used in the footer copyright line. */
  copyrightHolder: 'Pixelvaan',
} as const

export const contact = {
  /**
   * WhatsApp number in international format, digits only — no "+", spaces or dashes.
   * Example format: 91 followed by the 10-digit mobile number.
   * Leave empty until the real number is available.
   */
  whatsappNumber: '',
  /** Pre-filled message when a visitor taps a WhatsApp button. */
  whatsappMessage: "Hi Pixelvaan! I'd like to talk about a website for my business.",
  /** Phone number for "tel:" links, international format e.g. "+91XXXXXXXXXX". */
  phoneNumber: '',
  /** How the phone number is displayed. Falls back to `phoneNumber` if empty. */
  phoneDisplay: '',
  /** Public email address, e.g. "hello@yourdomain.com". */
  email: '',
  /**
   * Optional form backend. Any endpoint that accepts a JSON POST works
   * (Formspree, Web3Forms, Getform, your own API…).
   * When empty, the contact form hands the enquiry off to WhatsApp or email
   * (whichever is configured above).
   */
  formEndpoint: '',
  /** Shown in the footer / contact section. */
  serviceArea: 'Serving businesses across India',
} as const

/**
 * Social profiles. Only entries with a URL are rendered.
 * Do not add profiles that don't exist yet.
 */
export const socialLinks: ReadonlyArray<{ label: string; url: string }> = [
  { label: 'Instagram', url: '' },
  { label: 'LinkedIn', url: '' },
  { label: 'X / Twitter', url: '' },
  { label: 'Behance', url: '' },
]

export const seo = {
  /** Production URL, no trailing slash. Replace with the real domain before launch. */
  siteUrl: 'https://www.pixelvaan.com',
  title: 'Pixelvaan — Premium Websites Starting at ₹5,999',
  description:
    'Pixelvaan builds modern, responsive and conversion-focused websites for Indian businesses starting from ₹5,999.',
  keywords: [
    'website design India',
    'web design agency',
    'website development',
    'business website',
    'landing page design',
    'ecommerce website',
    'website redesign',
    'affordable premium website',
    'website starting 5999',
  ],
  locale: 'en_IN',
  language: 'en-IN',
  /** Relative to /public. 1200×630. Regenerate with `npm run generate:og`. */
  ogImage: '/og-image.jpg',
  ogImageAlt: 'Pixelvaan — Premium websites starting at ₹5,999',
  /** X/Twitter handle including "@", or empty. */
  twitterHandle: '',
  themeColor: '#0B0B0D',
} as const

export type SiteConfig = {
  brand: typeof brand
  contact: typeof contact
  seo: typeof seo
}
