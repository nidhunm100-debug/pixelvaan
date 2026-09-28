/**
 * Portfolio projects.
 *
 * IMPORTANT: every project below is a CONCEPT designed by Pixelvaan to show
 * range across industries. None of them is a real client. They are marked
 * `kind: 'concept'` and labelled as such everywhere they appear.
 *
 * When real client work is ready, add it with `kind: 'client'` and supply
 * preview images in /public/projects/<slug>/ (see scripts/generate-previews.mjs
 * for the expected file names and sizes).
 */
export type ProjectKind = 'concept' | 'client'

export type Project = {
  slug: string
  name: string
  industry: string
  kind: ProjectKind
  /** One-line description shown on cards. */
  summary: string
  /** Website type delivered. */
  deliverable: string
  /** Case-study copy. Keep factual: describe the design, not invented results. */
  brief: string
  approach: string
  features: string[]
  palette: string[]
  typography: string
  /** Accent used for card lighting and case-study details. */
  accent: string
}

export const projects: Project[] = [
  {
    slug: 'maison-kaavya',
    name: 'Maison Kaavya',
    industry: 'Fashion',
    kind: 'concept',
    summary: 'An editorial storefront for a handloom-inspired fashion label.',
    deliverable: 'E-commerce website',
    brief:
      'A contemporary fashion label rooted in Indian handloom needs a site that feels like a fashion magazine, while still making it effortless to browse and buy.',
    approach:
      'Large editorial typography, generous whitespace and textile-led imagery put the fabric first. Collections are presented as stories, with shopping one tap away.',
    features: ['Collection lookbooks', 'Product quick view', 'Size guide', 'Instagram-ready product pages', 'Mobile-first checkout flow'],
    palette: ['#EFE8DD', '#B4532A', '#2B2420', '#D9A441'],
    typography: 'Cormorant Garamond + Inter Tight',
    accent: '#D9A441',
  },
  {
    slug: 'tamarind-and-smoke',
    name: 'Tamarind & Smoke',
    industry: 'Restaurant',
    kind: 'concept',
    summary: 'A moody, appetite-first website for a modern Indian grill.',
    deliverable: 'Business website',
    brief:
      'Diners decide in seconds. The site has to answer three questions immediately — what is on the menu, where is it, and how do I book a table.',
    approach:
      'A dark, warm palette that mirrors the dining room, a scannable menu with prices, and a reservation call-to-action that follows you down the page.',
    features: ['Digital menu with prices', 'Table reservation CTA', 'Google Maps & timings', 'WhatsApp ordering link', 'Events & specials'],
    palette: ['#141110', '#E0703A', '#F3E6D3', '#7A2E1C'],
    typography: 'DM Serif Display + Inter Tight',
    accent: '#E0703A',
  },
  {
    slug: 'aangan-estates',
    name: 'Aangan Estates',
    industry: 'Real Estate',
    kind: 'concept',
    summary: 'A calm, trust-building property showcase for a boutique developer.',
    deliverable: 'Business website',
    brief:
      'Property buyers need clarity and confidence. The site should present each project with honest detail and make enquiries simple.',
    approach:
      'A restrained, architectural layout with a property search, clear specifications and a focused enquiry flow for every listing.',
    features: ['Property listings with filters', 'Floor plan & amenity sections', 'Enquiry forms per project', 'Location highlights', 'Brochure download'],
    palette: ['#F2F1EC', '#1F3B2F', '#C9B892', '#6E8B74'],
    typography: 'Fraunces + Inter Tight',
    accent: '#8FB39A',
  },
  {
    slug: 'volt-motors',
    name: 'Volt Motors',
    industry: 'Automobile',
    kind: 'concept',
    summary: 'A cinematic showroom website for an electric-vehicle dealership.',
    deliverable: 'Landing page',
    brief:
      'Cars are emotional purchases. The site should feel like standing in the showroom, then make booking a test drive the obvious next step.',
    approach:
      'A dark, high-contrast stage with dramatic lighting, bold specs and a test-drive booking flow that works beautifully on phones.',
    features: ['Model showcase', 'Spec comparison', 'Test-drive booking', 'EMI enquiry form', 'Showroom locator'],
    palette: ['#08090B', '#3DE0C5', '#E8ECEF', '#1B1F24'],
    typography: 'Space Grotesk + Inter Tight',
    accent: '#3DE0C5',
  },
  {
    slug: 'nila-varghese',
    name: 'Nila Varghese',
    industry: 'Personal Brand',
    kind: 'concept',
    summary: 'A confident portfolio for an independent product designer.',
    deliverable: 'Portfolio website',
    brief:
      'An independent designer needs a portfolio that wins the right clients — personality up front, case studies that are easy to skim, and a clear way to hire.',
    approach:
      'Big, personal typography, a curated project grid and a single "Work with me" path. Every page is fast and looks sharp when shared on LinkedIn.',
    features: ['Case-study templates', 'About & services', 'Testimonials section (client-supplied)', 'Booking link', 'Blog-ready structure'],
    palette: ['#F4F1EA', '#1A1A1A', '#FF6B4A', '#9DB5FF'],
    typography: 'Syne + Inter Tight',
    accent: '#FF6B4A',
  },
  {
    slug: 'lumen-salon',
    name: 'Lumen Salon & Spa',
    industry: 'Local Business',
    kind: 'concept',
    summary: 'A soft, welcoming booking-first site for a neighbourhood salon.',
    deliverable: 'Business website',
    brief:
      'Local customers search on their phones. The site has to show services, prices and timings clearly — and make booking or calling instant.',
    approach:
      'A gentle palette, a service menu with prices, one-tap call and WhatsApp buttons, and local SEO foundations so nearby customers can find it.',
    features: ['Service & price menu', 'One-tap call & WhatsApp', 'Opening hours & map', 'Gallery', 'Local SEO setup'],
    palette: ['#F6EEE9', '#3C4A3E', '#D9A89A', '#A7B8A0'],
    typography: 'Instrument Serif + Inter Tight',
    accent: '#D9A89A',
  },
  {
    slug: 'mitti-botanicals',
    name: 'Mitti Botanicals',
    industry: 'E-commerce',
    kind: 'concept',
    summary: 'A clean, conversion-focused store for a natural skincare brand.',
    deliverable: 'E-commerce website',
    brief:
      'A D2C skincare brand needs a store that feels premium, explains ingredients simply and keeps the path to checkout short.',
    approach:
      'Product-first layouts, ingredient storytelling, bundles and a streamlined cart designed for mobile shoppers.',
    features: ['Product catalogue', 'Cart & checkout', 'Ingredient highlights', 'Bundles & offers', 'Order-on-WhatsApp option'],
    palette: ['#F1EDE4', '#5B6B3A', '#C98B4E', '#2E2A22'],
    typography: 'Fraunces + Inter Tight',
    accent: '#C98B4E',
  },
  {
    slug: 'ledgerly',
    name: 'Ledgerly',
    industry: 'SaaS / Startup',
    kind: 'concept',
    summary: 'A crisp product website for an invoicing app built for small businesses.',
    deliverable: 'Landing page',
    brief:
      'A startup needs to explain its product in one scroll and turn visitors into sign-ups — with the polish of a much larger company.',
    approach:
      'A product-led hero with a live-feeling dashboard, benefit-driven sections, transparent pricing and a friction-free sign-up CTA.',
    features: ['Product-led hero', 'Feature walkthrough', 'Pricing table', 'Sign-up flow', 'Docs & blog structure'],
    palette: ['#0C0F1A', '#7C8CFF', '#F5F6FA', '#34D399'],
    typography: 'Inter Tight',
    accent: '#7C8CFF',
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
