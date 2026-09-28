import { copyFile } from 'node:fs/promises'
import path from 'node:path'
import type { Plugin, ResolvedConfig } from 'vite'
import { brand, contact, seo, socialLinks } from '../src/config/site'
import { faqs } from '../src/data/faq'
import { pricingPlans } from '../src/data/pricing'
import { services } from '../src/data/services'

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const absolute = (pathname: string) => `${seo.siteUrl}${pathname.startsWith('/') ? pathname : `/${pathname}`}`

function structuredData() {
  const org = {
    '@type': 'ProfessionalService',
    '@id': `${seo.siteUrl}/#organization`,
    name: brand.name,
    url: `${seo.siteUrl}/`,
    description: seo.description,
    slogan: brand.shortDescription,
    image: absolute(seo.ogImage),
    logo: absolute('/favicon.svg'),
    areaServed: { '@type': 'Country', name: brand.country },
    priceRange: `From ₹${brand.startingPrice.toLocaleString('en-IN')}`,
    ...(contact.email ? { email: contact.email } : {}),
    ...(contact.phoneNumber ? { telephone: contact.phoneNumber } : {}),
    ...(socialLinks.some((s) => s.url) ? { sameAs: socialLinks.filter((s) => s.url).map((s) => s.url) } : {}),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Website design & development services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service.title, description: service.description },
      })),
    },
    makesOffer: pricingPlans
      .filter((plan) => plan.price !== null)
      .map((plan) => ({
        '@type': 'Offer',
        name: plan.name,
        description: plan.description,
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: plan.price,
          priceCurrency: brand.currency,
          minPrice: plan.price,
        },
      })),
  }

  const website = {
    '@type': 'WebSite',
    '@id': `${seo.siteUrl}/#website`,
    url: `${seo.siteUrl}/`,
    name: brand.name,
    inLanguage: seo.language,
    publisher: { '@id': `${seo.siteUrl}/#organization` },
  }

  const faqPage = {
    '@type': 'FAQPage',
    '@id': `${seo.siteUrl}/#faq`,
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return { '@context': 'https://schema.org', '@graph': [org, website, faqPage] }
}

function headTags() {
  const tags = [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="keywords" content="${escapeHtml(seo.keywords.join(', '))}" />`,
    `<link rel="canonical" href="${seo.siteUrl}/" />`,
    `<meta name="theme-color" content="${seo.themeColor}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    // Open Graph
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(brand.name)}" />`,
    `<meta property="og:locale" content="${seo.locale}" />`,
    `<meta property="og:url" content="${seo.siteUrl}/" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:image" content="${absolute(seo.ogImage)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeHtml(seo.ogImageAlt)}" />`,
    // Twitter / X
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${absolute(seo.ogImage)}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(seo.ogImageAlt)}" />`,
    ...(seo.twitterHandle
      ? [`<meta name="twitter:site" content="${seo.twitterHandle}" />`, `<meta name="twitter:creator" content="${seo.twitterHandle}" />`]
      : []),
    `<script type="application/ld+json">${JSON.stringify(structuredData()).replace(/</g, '\\u003c')}</script>`,
  ]
  return tags.map((tag) => `    ${tag}`).join('\n')
}

const robotsTxt = () => `User-agent: *\nAllow: /\n\nSitemap: ${seo.siteUrl}/sitemap.xml\n`

const sitemapXml = () => {
  const lastmod = new Date().toISOString().slice(0, 10)
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.w3.org/2000/sitemaps/0.9">
  <url>
    <loc>${seo.siteUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`
}

/**
 * Injects all SEO metadata into index.html from src/config/site.ts and
 * emits robots.txt, sitemap.xml and a 404.html fallback at build time.
 */
export function seoPlugin(): Plugin {
  let config: ResolvedConfig
  return {
    name: 'pixelvaan-seo',
    configResolved(resolved) {
      config = resolved
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replace('<!-- %SEO_HEAD% -->', headTags().trimStart()).replace('%HTML_LANG%', seo.language)
      },
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/robots.txt') {
          res.setHeader('Content-Type', 'text/plain')
          res.end(robotsTxt())
          return
        }
        if (req.url === '/sitemap.xml') {
          res.setHeader('Content-Type', 'application/xml')
          res.end(sitemapXml())
          return
        }
        next()
      })
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsTxt() })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml() })
    },
    async closeBundle() {
      // Static hosts (Netlify, GitHub Pages, etc.) serve 404.html for unknown
      // paths; the app renders its own "not found" page from the same bundle.
      const outDir = path.resolve(config.root, config.build.outDir)
      await copyFile(path.join(outDir, 'index.html'), path.join(outDir, '404.html')).catch(() => {})
    },
  }
}
