/**
 * Testimonials.
 *
 * Pixelvaan has not supplied real client testimonials yet, so every entry
 * below is DEMO content with `isDemo: true`. Demo entries are always
 * visibly labelled on the site.
 *
 * To go live: replace these with real, client-approved quotes and set
 * `isDemo: false`. To hide the section until then, set
 * `showDemoTestimonials` to false.
 */
export type Testimonial = {
  id: string
  quote: string
  name: string
  role: string
  isDemo: boolean
}

export const showDemoTestimonials = true

export const testimonials: Testimonial[] = [
  {
    id: 'demo-1',
    quote:
      'This is where a real client’s words will go — a line about how their new website changed the way customers see their business.',
    name: 'Client name',
    role: 'Restaurant owner · Demo',
    isDemo: true,
  },
  {
    id: 'demo-2',
    quote:
      'Placeholder testimonial. Once Pixelvaan’s first clients share feedback, their approved quotes will replace this example.',
    name: 'Client name',
    role: 'Founder, D2C brand · Demo',
    isDemo: true,
  },
  {
    id: 'demo-3',
    quote:
      'Example layout only. Real reviews will describe the process, the design and what it was like to work with the team.',
    name: 'Client name',
    role: 'Independent professional · Demo',
    isDemo: true,
  },
]
