/**
 * Horizontal "Every industry" showcase. Each panel pairs an industry with
 * what its website genuinely needs to do, illustrated by a concept project.
 */
export type IndustryPanel = {
  industry: string
  headline: string
  needs: string[]
  projectSlug: string
}

export const industryPanels: IndustryPanel[] = [
  {
    industry: 'Restaurants',
    headline: 'Menus, timings and bookings — found in seconds.',
    needs: ['Menu with prices', 'Reservations', 'Maps & hours'],
    projectSlug: 'tamarind-and-smoke',
  },
  {
    industry: 'Fashion',
    headline: 'An editorial feel that sells the fabric, not just the product.',
    needs: ['Lookbooks', 'Product pages', 'Size guides'],
    projectSlug: 'maison-kaavya',
  },
  {
    industry: 'Real Estate',
    headline: 'Listings that build trust before the site visit.',
    needs: ['Property search', 'Floor plans', 'Enquiry forms'],
    projectSlug: 'aangan-estates',
  },
  {
    industry: 'Automobile',
    headline: 'The showroom experience, in the palm of a hand.',
    needs: ['Model showcase', 'Specs', 'Test-drive booking'],
    projectSlug: 'volt-motors',
  },
  {
    industry: 'E-commerce',
    headline: 'Short paths from product to checkout.',
    needs: ['Catalogue', 'Cart & checkout', 'Offers'],
    projectSlug: 'mitti-botanicals',
  },
  {
    industry: 'Local Business',
    headline: 'One tap to call, chat or book — right from search.',
    needs: ['Services & prices', 'Call & WhatsApp', 'Local SEO'],
    projectSlug: 'lumen-salon',
  },
  {
    industry: 'Personal Brands',
    headline: 'A portfolio with personality that wins the right clients.',
    needs: ['Case studies', 'About', 'Booking link'],
    projectSlug: 'nila-varghese',
  },
  {
    industry: 'Startups',
    headline: 'Explain the product in one scroll. Convert in one click.',
    needs: ['Product story', 'Pricing', 'Sign-up flow'],
    projectSlug: 'ledgerly',
  },
]
