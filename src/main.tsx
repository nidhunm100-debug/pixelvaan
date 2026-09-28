import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/index.css'
import { applyEffectsTier } from '@/lib/device'
import App from './App'

// Decide the effect tier before first paint so CSS can adapt immediately.
applyEffectsTier()

// Always start at the top on reload; in-page hashes are handled by SmoothScroll.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
