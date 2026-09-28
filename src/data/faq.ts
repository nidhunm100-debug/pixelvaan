/**
 * FAQ content. Also emitted as FAQPage structured data at build time.
 * Answers intentionally avoid unconfirmed commercial terms
 * (timelines, revision counts, hosting/domain durations).
 */
export type FaqItem = { question: string; answer: string }

export const faqs: FaqItem[] = [
  {
    question: 'How much does a website cost?',
    answer:
      'Our Website Starter package starts at ₹5,999. The final price depends on the number of pages, the features you need and your content. Tell us about your project and we’ll share a clear quote.',
  },
  {
    question: 'Is ₹5,999 the final price?',
    answer:
      '₹5,999 is the starting price for the Website Starter package. Projects that need more pages, an online store or custom features are quoted based on scope. For domain, hosting and other third-party costs, talk to us for details.',
  },
  {
    question: 'How long does a website take?',
    answer:
      'It depends on the size of the project and how quickly content is ready. Talk to us for details — we’ll share an estimated timeline once we understand what you need.',
  },
  {
    question: 'Will the website work on mobile?',
    answer:
      'Yes. Every website we build is designed mobile-first and checked on phones, tablets and desktops so it looks and works great on every screen.',
  },
  {
    question: 'Can you redesign my existing website?',
    answer:
      'Yes. Website redesign is one of our core services. We can modernise the design, improve speed and mobile experience, and restructure content so it’s easier for customers to act.',
  },
  {
    question: 'Can you build an online store?',
    answer:
      'Yes. We design and build e-commerce websites that showcase your products and make buying simple. Pricing depends on your catalogue and features — talk to us for details.',
  },
  {
    question: 'Can I request custom features?',
    answer:
      'Absolutely. Tell us what you have in mind and we’ll let you know what’s possible and how it affects scope and pricing before any work begins.',
  },
  {
    question: 'Do you provide website maintenance?',
    answer:
      'Yes. We offer ongoing updates, improvements and technical support. Talk to us for details about maintenance options.',
  },
  {
    question: 'Can you help with SEO?',
    answer:
      'Every website includes a basic SEO setup — clean structure, page titles and descriptions, fast loading and mobile optimisation. We don’t promise specific rankings, but we build with search visibility in mind. For ongoing SEO, talk to us for details.',
  },
  {
    question: 'How do I get started?',
    answer:
      'Fill in the contact form or message us on WhatsApp. Tell us about your business and what you need — we’ll take it from there.',
  },
]
