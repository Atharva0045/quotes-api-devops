import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { quotesApi } from '@services/quotesApi'
import toast from 'react-hot-toast'

// Query keys
export const QUERY_KEYS = {
  QUOTES: 'quotes',
  RANDOM_QUOTE: 'randomQuote',
  CATEGORIES: 'categories',
  QUOTE_BY_ID: 'quoteById',
}

// FIXED: Hook for fetching quotes with pagination
export const useQuotes = (params) => {
  return useQuery({
    queryKey: [QUERY_KEYS.QUOTES, params],
    queryFn: async () => {
      try {
        console.log('🔄 Fetching quotes with params:', params)
        const result = await quotesApi.getQuotes(params)
        console.log('✅ Quotes fetched successfully:', result)
        return result
      } catch (error) {
        console.error('❌ Error fetching quotes:', error)
        throw error
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,
    retry: 1,
    throwOnError: false,
    onError: (error) => {
      console.error('useQuotes error:', error)
      toast.error(`Failed to fetch quotes: ${error.message}`)
    },
  })
}

// FIXED: Hook for fetching random quote
export const useRandomQuote = (category, enabled = true) => {
  return useQuery({
    queryKey: [QUERY_KEYS.RANDOM_QUOTE, category],
    queryFn: async () => {
      try {
        console.log('🔄 Fetching random quote, category:', category)
        const result = await quotesApi.getRandomQuote(category)
        console.log('✅ Random quote fetched successfully:', result)
        return result
      } catch (error) {
        console.error('❌ Error fetching random quote:', error)
        throw error
      }
    },
    enabled,
    refetchOnMount: 'always',
    staleTime: 0, // Always fetch fresh random quote
    gcTime: 1000, // Short cache time for random quotes
    retry: 1,
    throwOnError: false,
    onError: (error) => {
      console.error('useRandomQuote error:', error)
      toast.error(`Failed to fetch random quote: ${error.message}`)
    },
  })
}

// FIXED: Hook for fetching categories with better fallback
export const useCategories = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: async () => {
      try {
        console.log('🔄 Fetching categories')
        const result = await quotesApi.getCategories()
        console.log('✅ Categories fetched successfully:', result)
        return Array.isArray(result) ? result : []
      } catch (error) {
        console.warn('⚠️ Categories fetch failed, returning empty array:', error)
        return [] // Always return empty array as fallback
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000,
    retry: 1,
    throwOnError: false, // Never throw errors for categories
    onError: (error) => {
      console.warn('useCategories error (non-critical):', error)
      // Don't show toast for categories error
    },
  })
}

// Hook for fetching quote by ID
export const useQuoteById = (id, enabled = true) => {
  return useQuery({
    queryKey: [QUERY_KEYS.QUOTE_BY_ID, id],
    queryFn: async () => {
      try {
        console.log('🔄 Fetching quote by ID:', id)
        const result = await quotesApi.getQuoteById(id)
        console.log('✅ Quote by ID fetched successfully:', result)
        return result
      } catch (error) {
        console.error('❌ Error fetching quote by ID:', error)
        throw error
      }
    },
    enabled: enabled && !!id,
    retry: 1,
    throwOnError: false,
    onError: (error) => {
      console.error('useQuoteById error:', error)
      toast.error(`Failed to fetch quote: ${error.message}`)
    },
  })
}

// Hook for creating quotes
export const useCreateQuote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (quoteData) => {
      try {
        console.log('🔄 Creating quote:', quoteData)
        const result = await quotesApi.createQuote(quoteData)
        console.log('✅ Quote created successfully:', result)
        return result
      } catch (error) {
        console.error('❌ Error creating quote:', error)
        throw error
      }
    },
    throwOnError: false,
    onSuccess: (data) => {
      // Invalidate and refetch quotes
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.QUOTES] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CATEGORIES] })
      
      toast.success('Quote created successfully! 🎉')
    },
    onError: (error) => {
      console.error('useCreateQuote error:', error)
      toast.error(`Failed to create quote: ${error.message}`)
    },
  })
}

// FIXED: Hook for health check
export const useHealthCheck = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      try {
        console.log('🔄 Health check')
        const result = await quotesApi.healthCheck()
        console.log('✅ Health check successful:', result)
        return result
      } catch (error) {
        console.warn('⚠️ Health check failed:', error)
        return { status: 'unhealthy', error: error.message }
      }
    },
    refetchInterval: 30000, // Check every 30 seconds
    retry: false, // Don't retry health checks
    throwOnError: false,
    onError: (error) => {
      console.warn('Health check failed (non-critical):', error.message)
    },
  })
}