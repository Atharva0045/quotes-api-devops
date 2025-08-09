const LoadingSpinner = ({ 
  size = 'medium', 
  text, 
  fullHeight = false,
  className = ""
}) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-10 w-10', 
    large: 'h-16 w-16'
  }

  const containerClasses = fullHeight 
    ? 'flex flex-col items-center justify-center min-h-[200px]'
    : 'flex flex-col items-center justify-center py-8'

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className={`animate-spin rounded-full border-b-2 border-primary-500 ${sizeClasses[size]}`}></div>
      {text && (
        <p className="mt-4 text-gray-600 text-sm font-medium">
          {text}
        </p>
      )}
    </div>
  )
}

export default LoadingSpinner