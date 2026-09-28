/**
 * Renders the concept-site mockups in scripts/previews/*.html with Chromium
 * and exports optimised, responsive images to public/projects/<slug>/:
 *
 *   desktop-{640,960,1440}.{avif,webp}   16:10 crop of the desktop homepage
 *   full-{960,1440}.{avif,webp}          full-length desktop page (case study)
 *   mobile-{390,780}.{avif,webp}         390×844 mobile viewport
 *
 * It also writes src/data/generated/previews.json with each image's
 * intrinsic size and a tiny blurred placeholder (LQIP) for reveal effects.
 *
 * Usage: npm run generate:previews [-- --only <slug>]
 */
import { chromium } from 'playwright'
import sharp from 'sharp'
import { mkdir, readdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const srcDir = path.join(root, 'scripts/previews')
const outDir = path.join(root, 'public/projects')
const manifestPath = path.join(root, 'src/data/generated/previews.json')

const onlyIdx = process.argv.indexOf('--only')
const only = onlyIdx > -1 ? process.argv[onlyIdx + 1] : null

const DESKTOP = { width: 1440, height: 900 }
const MOBILE = { width: 390, height: 844 }
const FULL_MAX_HEIGHT = 3200

async function encode(input, file, width) {
  const base = sharp(input).resize({ width, withoutEnlargement: true })
  await base.clone().avif({ quality: 52, effort: 6 }).toFile(`${file}-${width}.avif`)
  await base.clone().webp({ quality: 78, effort: 6 }).toFile(`${file}-${width}.webp`)
}

async function lqip(input) {
  const buf = await sharp(input).resize({ width: 24 }).blur(1.2).webp({ quality: 40 }).toBuffer()
  return `data:image/webp;base64,${buf.toString('base64')}`
}

const files = (await readdir(srcDir)).filter((f) => f.endsWith('.html') && !f.startsWith('_'))
const slugs = files.map((f) => f.replace(/\.html$/, '')).filter((s) => !only || s === only)
if (!slugs.length) throw new Error(`No mockups found${only ? ` for "${only}"` : ''}`)

const manifest = existsSync(manifestPath) ? JSON.parse(await (await import('node:fs/promises')).readFile(manifestPath, 'utf8')) : {}

const browser = await chromium.launch()
try {
  for (const slug of slugs) {
    const url = pathToFileURL(path.join(srcDir, `${slug}.html`)).href
    const dir = path.join(outDir, slug)
    await mkdir(dir, { recursive: true })

    // Desktop (rendered at 2x for crisp downscales)
    const desk = await browser.newPage({ viewport: DESKTOP, deviceScaleFactor: 2 })
    await desk.goto(url, { waitUntil: 'networkidle' })
    await desk.evaluate(() => document.fonts.ready)
    const top = await desk.screenshot({ type: 'png' })
    const full = await desk.screenshot({ type: 'png', fullPage: true })
    await desk.close()

    const fullMeta = await sharp(full).metadata()
    const fullCropped = await sharp(full)
      .extract({ left: 0, top: 0, width: fullMeta.width, height: Math.min(fullMeta.height, FULL_MAX_HEIGHT * 2) })
      .png()
      .toBuffer()

    // Mobile
    const mob = await browser.newPage({ viewport: MOBILE, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
    await mob.goto(url, { waitUntil: 'networkidle' })
    await mob.evaluate(() => document.fonts.ready)
    const mobile = await mob.screenshot({ type: 'png' })
    await mob.close()

    for (const w of [640, 960, 1440]) await encode(top, path.join(dir, 'desktop'), w)
    for (const w of [960, 1440]) await encode(fullCropped, path.join(dir, 'full'), w)
    for (const w of [390, 780]) await encode(mobile, path.join(dir, 'mobile'), w)

    const fullOut = await sharp(fullCropped).metadata()
    manifest[slug] = {
      desktop: { width: 1440, height: 900, lqip: await lqip(top) },
      full: { width: 1440, height: Math.round((fullOut.height / fullOut.width) * 1440), lqip: await lqip(fullCropped) },
      mobile: { width: 390, height: 844, lqip: await lqip(mobile) },
    }
    console.log(`✓ ${slug}`)
  }
} finally {
  await browser.close()
}

await mkdir(path.dirname(manifestPath), { recursive: true })
const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)))
await writeFile(manifestPath, `${JSON.stringify(sorted, null, 2)}\n`)
console.log(`Wrote ${path.relative(root, manifestPath)}`)
