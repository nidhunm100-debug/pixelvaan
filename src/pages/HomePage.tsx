import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFab } from '@/components/layout/WhatsAppFab'
import { Hero } from '@/sections/Hero'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <div className="h-[200vh]" />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
