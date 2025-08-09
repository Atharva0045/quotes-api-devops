import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() }
    return config
  },
  (error) => {
    console.error('Request interceptor error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor - FIXED
apiClient.interceptors.response.use(
  (response) => {
    // Calculate request duration
    const endTime = new Date()
    const duration = endTime - response.config.metadata.startTime
    
    if (import.meta.env.DEV) {
      console.log(`✅ API Call: ${response.config.method?.toUpperCase()} ${response.config.url} - ${duration}ms`)
    }
    
    // Return the actual response data - DON'T double extract
    return response
  },
  (error) => {
    // Better error logging
    console.error('❌ API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.response?.data?.message || error.message,
      data: error.response?.data
    })
    
    // Create user-friendly error message
    let message = 'An error occurred'
    
    if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
      message = 'Unable to connect to server. Please check if the backend is running.'
    } else if (error.response) {
      message = error.response.data?.message || `Server error: ${error.response.status}`
    } else if (error.request) {
      message = 'No response from server. Please check your connection.'
    } else {
      message = error.message || 'Request failed'
    }
    
    return Promise.reject(new Error(message))
  }
)

export const quotesApi = {
  // Get all quotes with pagination and filters
  getQuotes: async (params = {}) => {
    try {
      const response = await apiClient.get('/quotes', { params })
      // Check if response has the expected structure
      if (response.data && response.data.success && response.data.data) {
        return response.data.data
      }
      // Fallback for different response structure
      return response.data || { quotes: [], pagination: {} }
    } catch (error) {
      console.error('getQuotes error:', error)
      throw error
    }
  },

  // Get random quote
  getRandomQuote: async (category) => {
    try {
      const params = category ? { category } : {}
      const response = await apiClient.get('/quotes/random', { params })
      
      // Check different possible response structures
      if (response.data && response.data.success && response.data.data && response.data.data.quote) {
        return response.data.data.quote
      } else if (response.data && response.data.data && response.data.data.quote) {
        return response.data.data.quote
      } else if (response.data && response.data.quote) {
        return response.data.quote
      } else if (response.data) {
        return response.data
      }
      
      throw new Error('Invalid response structure for random quote')
    } catch (error) {
      console.error('getRandomQuote error:', error)
      throw error
    }
  },

  // Get quote by ID
  getQuoteById: async (id) => {
    try {
      const response = await apiClient.get(`/quotes/${id}`)
      
      if (response.data && response.data.success && response.data.data && response.data.data.quote) {
        return response.data.data.quote
      } else if (response.data && response.data.data && response.data.data.quote) {
        return response.data.data.quote
      } else if (response.data && response.data.quote) {
        return response.data.quote
      }
      
      throw new Error('Quote not found')
    } catch (error) {
      console.error('getQuoteById error:', error)
      throw error
    }
  },

  // Create new quote
  createQuote: async (quoteData) => {
    try {
      const response = await apiClient.post('/quotes', quoteData)
      
      if (response.data && response.data.success && response.data.data && response.data.data.quote) {
        return response.data.data.quote
      } else if (response.data && response.data.data && response.data.data.quote) {
        return response.data.data.quote
      }
      
      return response.data
    } catch (error) {
      console.error('createQuote error:', error)
      throw error
    }
  },

  // Get categories
  getCategories: async () => {
    try {
      const response = await apiClient.get('/quotes/categories')
      
      if (response.data && response.data.success && response.data.data && response.data.data.categories) {
        return response.data.data.categories
      } else if (response.data && response.data.data && response.data.data.categories) {
        return response.data.data.categories
      } else if (response.data && response.data.categories) {
        return response.data.categories
      } else if (Array.isArray(response.data)) {
        return response.data
      }
      
      // Return empty array as fallback
      return []
    } catch (error) {
      console.error('getCategories error:', error)
      // Don't throw error for categories - return empty array
      return []
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await apiClient.get('/health')
      return response.data
    } catch (error) {
      console.error('healthCheck error:', error)
      throw error
    }
  },
}

export default quotesApi