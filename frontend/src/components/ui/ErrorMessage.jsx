const ErrorMessage = ({ 
  message, 
  title = 'Something went wrong',
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center bg-red-50 border border-red-200 rounded-lg ${className}`}>
      {/* Error Icon */}
      <div className="text-red-500 text-5xl mb-4">
        ⚠️
      </div>
      
      {/* Error Title */}
      <h3 className="text-lg font-semibold text-red-800 mb-2">
        {title}
      </h3>
      
      {/* Error Message */}
      <p className="text-red-600 max-w-md leading-relaxed">
        {message}
      </p>
    </div>
  )
}

export default ErrorMessage