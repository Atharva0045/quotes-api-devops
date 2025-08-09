import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'

// Layout Components
import Navbar from '@components/layout/Navbar'
import Footer from '@components/layout/Footer'
import ErrorBoundary from '@components/layout/ErrorBoundary'
import LoadingSpinner from '@components/ui/LoadingSpinner'

// Lazy load pages for better performance
const Home = lazy(() => import('@pages/Home'))
const About = lazy(() => import('@pages/About'))
const Quotes = lazy(() => import('@pages/Quotes'))
const NotFound = lazy(() => import('@pages/NotFound'))

// Loading component for Suspense
const PageLoader = () => (
  <div className="flex justify-center items-center min-h-[400px]">
    <LoadingSpinner size="large" text="Loading page..." />
  </div>
)

// App component with comprehensive error handling and routing
function App() {
  console.log('📱 App component rendering (Full Tailwind version)')
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <ErrorBoundary>
        <Navbar />
      </ErrorBoundary>

      {/* Main Content */}
      <main className="flex-1">
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Home Route */}
              <Route path="/" element={<Home />} />
              
              {/* About Route */}
              <Route path="/about" element={<About />} />
              
              {/* Quotes Route */}
              <Route path="/quotes" element={<Quotes />} />
              
              {/* Redirect old routes if any */}
              <Route path="/home" element={<Navigate to="/" replace />} />
              
              {/* 404 Route - Must be last */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>

      {/* Footer */}
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </div>
  )
}

export default App