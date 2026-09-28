import { m } from 'motion/react'
import { WhatsAppIcon } from '@/components/ui/icons'
import { whatsappUrl } from '@/lib/contact'
import { easeOutExpo } from '@/animations/easing'

/**
 * Floating WhatsApp call-to-action. Uses the number from
 * src/config/site.ts; until one is configured it points to the contact
 * section instead of a broken link.
 */
export function WhatsAppFab() {
  const href = whatsappUrl()
  const external = href !== null

  return (
    <m.a
      href={href ?? '#contact'}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      aria-label="Chat with Pixelvaan on WhatsApp"
      className="group glass fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex h-14 items-center rounded-full border border-line-strong p-1.5 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.9)] transition-[border-color,box-shadow] duration-500 hover:border-whatsapp/50 hover:shadow-[0_18px_40px_-14px_rgb(37_211_102/0.45)] sm:right-6 sm:bottom-6"
      initial={{ opacity: 0, y: 24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 1.6, ease: easeOutExpo }}
      whileTap={{ scale: 0.94, transition: { duration: 0.15 } }}
    >
      <span className="relative grid size-11 shrink-0 place-items-center rounded-full bg-whatsapp text-ink">
        <WhatsAppIcon className="relative size-[22px]" />
      </span>
      <span
        aria-hidden="true"
        className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-500 ease-[var(--ease-out-expo)] [@media(hover:hover)]:group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr]"
      >
        <span className="overflow-hidden whitespace-nowrap">
          <span className="block pl-3 pr-4 text-sm font-medium">Chat with Pixelvaan</span>
        </span>
      </span>
    </m.a>
  )
}
