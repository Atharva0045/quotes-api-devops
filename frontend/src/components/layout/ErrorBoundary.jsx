import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 py-16">
          <div className="text-center max-w-lg mx-auto">
            {/* Error Icon */}
            <div className="text-red-500 text-6xl mb-6">⚠️</div>
            
            {/* Error Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">
              Oops! Something went wrong
            </h2>
            
            {/* Error Message */}
            <p className="text-gray-600 mb-8 leading-relaxed max-w-md mx-auto">
              We encountered an unexpected error. Please try refreshing the page or click the button below to try again.
            </p>
            
            {/* Retry Button */}
            <button
              onClick={this.handleRetry}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              Try Again
            </button>
            
            {/* Error Details (in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left bg-gray-100 rounded-lg p-4">
                <summary className="cursor-pointer font-medium text-gray-800 mb-2">
                  Error Details (Development)
                </summary>
                <pre className="text-xs text-gray-600 overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary