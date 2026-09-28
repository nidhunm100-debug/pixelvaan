import { lazy, Suspense } from 'react'
import { MotionProvider } from '@/components/layout/MotionProvider'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { usePreferences } from '@/hooks/usePreferences'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'

// Desktop-only enhancement: never downloaded on touch devices.
const CustomCursor = lazy(() => import('@/components/layout/CustomCursor'))

const HOME_PATHS = new Set(['/', '/index.html'])

export default function App() {
  const { pointerEffects } = usePreferences()
  const isHome = HOME_PATHS.has(window.location.pathname)

  return (
    <MotionProvider>
      <SmoothScroll />
      {isHome ? <HomePage /> : <NotFoundPage />}
      {pointerEffects && (
        <Suspense fallback={null}>
          <CustomCursor />
        </Suspense>
      )}
    </MotionProvider>
  )
}
