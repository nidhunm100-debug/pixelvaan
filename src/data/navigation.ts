export type NavItem = { label: string; href: `#${string}` }

/** Primary navigation. Each href must match a section id on the home page. */
export const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export const primaryCta = { label: 'Start a Project', href: '#contact' } as const
