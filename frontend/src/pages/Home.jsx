import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'

// Components
import QuoteCard from '@components/features/QuoteCard'
import CategoryFilter from '@components/features/CategoryFilter'
import LoadingSpinner from '@components/ui/LoadingSpinner'
import ErrorMessage from '@components/ui/ErrorMessage'
import Button from '@components/ui/Button'
import Container from '@components/layout/Container'

// API Functions
const fetchRandomQuote = async (category) => {
  console.log('🔄 Fetching random quote, category:', category)
  
  try {
    const params = category ? `?category=${category}` : ''
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
    const response = await fetch(`${apiUrl}/quotes/random${params}`)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    console.log('✅ Random quote fetched successfully:', data)
    
    // Handle different response structures
    const quote = data?.data?.quote || data?.quote || data
    
    if (!quote || !quote.text) {
      throw new Error('Invalid quote data structure')
    }
    
    return quote
  } catch (error) {
    console.error('❌ Error fetching random quote:', error)
    throw error
  }
}

const fetchCategories = async () => {
  console.log('🔄 Fetching categories')
  
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
    const response = await fetch(`${apiUrl}/quotes/categories`)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    console.log('✅ Categories fetched successfully:', data)
    
    // Handle different response structures
    return data?.data?.categories || data?.categories || data || []
  } catch (error) {
    console.error('❌ Categories fetch error:', error)
    return [] // Graceful fallback
  }
}

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [refetchTrigger, setRefetchTrigger] = useState(0)
  
  console.log('🏠 Home component rendering', { selectedCategory, refetchTrigger })

  // Fetch random quote
  const { 
    data: quote, 
    isLoading: quoteLoading, 
    error: quoteError, 
    refetch,
    isFetching: quoteFetching
  } = useQuery({
    queryKey: ['randomQuote', selectedCategory, refetchTrigger],
    queryFn: () => fetchRandomQuote(selectedCategory),
    staleTime: 0, // Always fetch fresh
    retry: 1,
    throwOnError: false,
  })

  // Fetch categories
  const { 
    data: categories, 
    isLoading: categoriesLoading 
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
    throwOnError: false,
  })

  const handleNewQuote = () => {
    console.log('🎲 Getting new quote...')
    setRefetchTrigger(prev => prev + 1)
    refetch()
  }

  const handleCategoryChange = (category) => {
    console.log('📂 Category changed to:', category)
    setSelectedCategory(category)
    setRefetchTrigger(prev => prev + 1)
  }

  return (
    <Container className="py-8">
      {/* Hero Section */}
      <motion.section 
        className="text-center py-16 mb-12 gradient-bg text-white rounded-2xl relative overflow-hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative z-10">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4 text-gray-800 text-shadow"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Daily Inspiration
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl opacity-95 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Discover powerful quotes to motivate and inspire your journey towards greatness
          </motion.p>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-4 h-4 bg-white rounded-full animate-float"></div>
          <div className="absolute top-20 right-20 w-6 h-6 bg-white rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-16 left-1/4 w-3 h-3 bg-white rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        </div>
      </motion.section>

      {/* Quote Section */}
      <section className="text-center">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <CategoryFilter
            categories={categories || []}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </motion.div>

        {/* Quote Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {quoteLoading && (
            <LoadingSpinner size="large" text="Loading your daily inspiration..." />
          )}
          
          {quoteError && (
            <ErrorMessage 
              message={quoteError.message} 
              title="Unable to Load Quote"
            />
          )}
          
          {quote && !quoteLoading && (
            <QuoteCard quote={quote} featured />
          )}
          
          {!quoteLoading && !quoteError && !quote && (
            <ErrorMessage 
              message="No quote data received from the server. This might be a temporary issue." 
              title="No Quote Available"
            />
          )}
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="mt-8"
        >
          <Button 
            onClick={handleNewQuote}
            disabled={quoteLoading || quoteFetching}
            variant="primary"
            size="large"
            className="min-w-[180px]"
          >
            {quoteLoading || quoteFetching ? (
              <span className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Loading...</span>
              </span>
            ) : (
              'Get New Quote'
            )}
          </Button>
        </motion.div>
      </section>

      {/* Debug Info (development only) */}
      {/* {import.meta.env.DEV && (
        <section className="mt-12 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">🔍 Debug Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono">
            <div className={`p-2 rounded ${quoteLoading ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
              <span className="font-bold">Quote Status:</span> {quoteLoading ? 'Loading...' : quoteFetching ? 'Fetching...' : 'Ready'}
            </div>
            <div className={`p-2 rounded ${quoteError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
              <span className="font-bold">Quote Error:</span> {quoteError ? 'Yes' : 'No'}
            </div>
            <div className={`p-2 rounded ${categoriesLoading ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
              <span className="font-bold">Categories:</span> {categoriesLoading ? 'Loading...' : `${categories?.length || 0} loaded`}
            </div>
            <div className="p-2 rounded bg-purple-100 text-purple-800">
              <span className="font-bold">Selected:</span> {selectedCategory || 'All'}
            </div>
            <div className="p-2 rounded bg-gray-100 text-gray-800">
              <span className="font-bold">API URL:</span> {import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}
            </div>
            <div className="p-2 rounded bg-gray-100 text-gray-800">
              <span className="font-bold">Refetch Count:</span> {refetchTrigger}
            </div>
          </div>
          
          {quote && (
            <div className="mt-4 p-3 bg-white rounded border">
              <span className="font-bold">Current Quote:</span>
              <div className="text-xs mt-1 text-gray-600">
                "{quote.text?.substring(0, 100)}..." - {quote.author}
              </div>
            </div>
          )}
          
          {quoteError && (
            <div className="mt-4 p-3 bg-red-50 rounded border border-red-200">
              <span className="font-bold text-red-800">Error Details:</span>
              <div className="text-xs mt-1 text-red-600">
                {quoteError.message}
              </div>
            </div>
          )}
        </section>
          )} */}
    </Container>
  )
}

export default Home