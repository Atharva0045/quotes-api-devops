import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

// Simple quote card component
const QuoteCard = ({ quote }) => {
  if (!quote) return null

  return (
    <div className="card p-6 mb-6 hover:shadow-xl transition-all duration-300">
      <blockquote className="text-lg italic text-white-700 mb-4 relative">
        <span className="text-5xl text-primary-500 absolute -left-3 -top-3 opacity-30 font-serif">"</span>
        <span className="relative z-10 leading-relaxed">
          {quote.text}
        </span>
      </blockquote>
      
      <div className="flex flex-wrap justify-between items-center gap-4">
        <cite className="text-primary-600 font-semibold text-lg">
          — {quote.author}
        </cite>
        {quote.category && (
          <span className="inline-block bg-gradient-to-r from-purple-400 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {quote.category}
          </span>
        )}
      </div>
    </div>
  )
}

// Simple category filter component
const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  if (!categories || categories.length === 0) return null

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Filter by Category
      </h3>
      
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => onCategoryChange('')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedCategory === ''
              ? 'bg-primary-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700'
          }`}
        >
          All Categories
        </button>
        
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => onCategoryChange(category._id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
              selectedCategory === category._id
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700'
            }`}
          >
            {category._id} ({category.count})
          </button>
        ))}
      </div>
    </div>
  )
}

// Loading spinner component
const LoadingSpinner = ({ text = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mb-4"></div>
    <p className="text-gray-600">{text}</p>
  </div>
)

// Error message component
const ErrorMessage = ({ message, title = "Something went wrong" }) => (
  <div className="card p-8 text-center border-red-200 bg-red-50">
    <div className="text-red-500 text-4xl mb-4">⚠️</div>
    <h3 className="text-lg font-semibold text-red-800 mb-2">{title}</h3>
    <p className="text-red-600">{message}</p>
  </div>
)

// Empty state component
const EmptyState = ({ selectedCategory }) => (
  <div className="text-center py-12">
    <div className="text-6xl mb-4">📭</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">No quotes found</h3>
    <p className="text-gray-600 max-w-md mx-auto">
      {selectedCategory 
        ? `No quotes available in the "${selectedCategory}" category.`
        : 'No quotes are currently available.'
      }
    </p>
  </div>
)

// Simple API functions
const fetchQuotes = async (params = {}) => {
  console.log('🔄 Fetching quotes with params:', params)
  
  try {
    const queryParams = new URLSearchParams()
    if (params.page) queryParams.append('page', params.page)
    if (params.limit) queryParams.append('limit', params.limit)
    if (params.category) queryParams.append('category', params.category)
    
    const response = await fetch(`http://localhost:5000/api/quotes?${queryParams}`)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    console.log('✅ Quotes data received:', data)
    
    // Handle different response structures
    return data?.data || data || { quotes: [], pagination: {} }
  } catch (error) {
    console.error('❌ Quotes fetch error:', error)
    throw error
  }
}

const fetchCategories = async () => {
  console.log('🔄 Fetching categories')
  
  try {
    const response = await fetch('http://localhost:5000/api/quotes/categories')
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    console.log('✅ Categories data received:', data)
    
    // Handle different response structures
    return data?.data?.categories || data?.categories || data || []
  } catch (error) {
    console.error('❌ Categories fetch error:', error)
    return [] // Return empty array as fallback
  }
}

const Quotes = () => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [page, setPage] = useState(1)
  const limit = 10

  console.log('📖 Quotes page rendering', { selectedCategory, page })

  // Fetch quotes
  const { 
    data: quotesData, 
    isLoading, 
    error, 
    isFetching 
  } = useQuery({
    queryKey: ['quotes', { page, limit, category: selectedCategory }],
    queryFn: () => fetchQuotes({ page, limit, category: selectedCategory }),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    throwOnError: false,
  })

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000,
    retry: 1,
    throwOnError: false,
  })

  const handleCategoryChange = (category) => {
    console.log('📂 Category changed to:', category)
    setSelectedCategory(category)
    setPage(1) // Reset to first page when category changes
  }

  const handleLoadMore = () => {
    console.log('📄 Loading more quotes...')
    setPage(prev => prev + 1)
  }

  const quotes = quotesData?.quotes || []
  const pagination = quotesData?.pagination || {}
  const hasNextPage = pagination.hasNext

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          All Quotes
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Explore our collection of inspirational quotes from great minds
        </p>
      </header>

      {/* Category Filter */}
      <CategoryFilter
        categories={categories || []}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Content */}
      <div className="animate-slide-up">
        {isLoading && page === 1 ? (
          <LoadingSpinner text="Loading quotes..." />
        ) : error ? (
          <ErrorMessage 
            message={error.message} 
            title="Failed to load quotes"
          />
        ) : quotes.length === 0 ? (
          <EmptyState selectedCategory={selectedCategory} />
        ) : (
          <>
            {/* Quotes List */}
            <div className="space-y-6 mb-8">
              {quotes.map((quote) => (
                <QuoteCard key={quote._id} quote={quote} />
              ))}
            </div>

            {/* Load More Button */}
            {hasNextPage && (
              <div className="text-center">
                <button
                  onClick={handleLoadMore}
                  disabled={isFetching}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isFetching ? (
                    <span className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Loading...</span>
                    </span>
                  ) : (
                    'Load More Quotes'
                  )}
                </button>
              </div>
            )}

            {/* Loading indicator for additional pages */}
            {isFetching && page > 1 && (
              <div className="text-center mt-6">
                <LoadingSpinner text="Loading more quotes..." />
              </div>
            )}
          </>
        )}
      </div>

      {/* Debug Info (development only)
      {import.meta.env.DEV && (
        <section className="mt-12 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">🔍 Debug Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono">
            <div><span className="font-bold">Loading:</span> {isLoading ? 'Yes' : 'No'}</div>
            <div><span className="font-bold">Fetching:</span> {isFetching ? 'Yes' : 'No'}</div>
            <div><span className="font-bold">Error:</span> {error ? 'Yes' : 'No'}</div>
            <div><span className="font-bold">Quotes Count:</span> {quotes.length}</div>
            <div><span className="font-bold">Current Page:</span> {page}</div>
            <div><span className="font-bold">Has Next:</span> {hasNextPage ? 'Yes' : 'No'}</div>
            <div><span className="font-bold">Selected Category:</span> {selectedCategory || 'All'}</div>
            <div><span className="font-bold">Categories:</span> {categories?.length || 0}</div>
          </div>
        </section>
      )} */}
    </div>
  )
}

export default Quotes