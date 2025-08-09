import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-md mx-auto">
        {/* 404 Number */}
        <div className="text-8xl md:text-9xl font-bold text-primary-500 mb-4 animate-bounce">
          404
        </div>
        
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 animate-fade-in">
          Page Not Found
        </h1>
        
        {/* Description */}
        <p className="text-gray-600 mb-8 leading-relaxed animate-fade-in">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back to discovering amazing quotes!
        </p>
        
        {/* Action Button */}
        <Link
          to="/"
          className="inline-flex items-center space-x-2 btn-primary hover:shadow-lg animate-fade-in"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Back to Home</span>
        </Link>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-300 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-secondary-400 rounded-full animate-float opacity-40" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-primary-400 rounded-full animate-float opacity-50" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 right-1/3 w-2.5 h-2.5 bg-secondary-300 rounded-full animate-float opacity-30" style={{animationDelay: '0.5s'}}></div>
      </div>
    </div>
  )
}

export default NotFound