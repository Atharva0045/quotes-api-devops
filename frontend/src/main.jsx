import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'

import App from './App.jsx'
import ErrorBoundary from '@components/layout/ErrorBoundary'
import './styles/index.css'

console.log('🚀 Starting React app with Tailwind CSS...')

// Create React Query client with optimized configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors (client errors)
        if (error?.message?.includes('HTTP 4')) return false
        // Retry up to 2 times for other errors
        return failureCount < 2
      },
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (updated from cacheTime)
      // Never throw errors that could crash the app
      throwOnError: false,
      useErrorBoundary: false,
    },
    mutations: {
      retry: 1,
      throwOnError: false,
      useErrorBoundary: false,
    },
  },
})

// Global error handler for unhandled query errors
queryClient.setQueryDefaults(['quotes'], {
  staleTime: 5 * 60 * 1000,
})

queryClient.setQueryDefaults(['categories'], {
  staleTime: 10 * 60 * 1000,
})

// Enhanced error logging for development
if (import.meta.env.DEV) {
  const originalError = console.error
  console.error = (...args) => {
    // Don't crash on React Query warnings
    if (typeof args[0] === 'string' && args[0].includes('React Query')) {
      console.warn('React Query:', ...args)
      return
    }
    originalError(...args)
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
          {/* Toast notifications */}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
                borderRadius: '0.5rem',
                fontSize: '14px',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
              loading: {
                duration: Infinity,
              },
            }}
          />
        </BrowserRouter>
        {/* React Query DevTools - only in development */}
        {import.meta.env.DEV && (
          <ReactQueryDevtools 
            initialIsOpen={false}
            position="bottom-left"
          />
        )}
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
)