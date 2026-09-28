/**
 * Services shown in the "Everything You Need" section, the contact form's
 * "Website type" dropdown and the footer.
 *
 * `visual` selects the small animated illustration rendered on each card.
 * `icon` is a Lucide icon name mapped in `src/components/ui/ServiceIcon.tsx`.
 */
export type ServiceVisual = 'business' | 'landing' | 'portfolio' | 'ecommerce' | 'redesign' | 'maintenance'

export type Service = {
  id: string
  title: string
  description: string
  icon: 'building' | 'rocket' | 'user' | 'shopping-bag' | 'refresh' | 'wrench'
  visual: ServiceVisual
}

export const services: Service[] = [
  {
    id: 'business-websites',
    title: 'Business Websites',
    description: 'Modern websites for companies and local businesses.',
    icon: 'building',
    visual: 'business',
  },
  {
    id: 'landing-pages',
    title: 'Landing Pages',
    description: 'High-converting landing pages for products, campaigns and services.',
    icon: 'rocket',
    visual: 'landing',
  },
  {
    id: 'portfolio-websites',
    title: 'Portfolio Websites',
    description: 'Premium portfolio websites for professionals, creators and freelancers.',
    icon: 'user',
    visual: 'portfolio',
  },
  {
    id: 'ecommerce-websites',
    title: 'E-commerce Websites',
    description: 'Online stores designed to showcase products and generate sales.',
    icon: 'shopping-bag',
    visual: 'ecommerce',
  },
  {
    id: 'website-redesign',
    title: 'Website Redesign',
    description: 'Transform outdated websites into modern digital experiences.',
    icon: 'refresh',
    visual: 'redesign',
  },
  {
    id: 'website-maintenance',
    title: 'Website Maintenance',
    description: 'Ongoing updates, improvements and technical support.',
    icon: 'wrench',
    visual: 'maintenance',
  },
]
