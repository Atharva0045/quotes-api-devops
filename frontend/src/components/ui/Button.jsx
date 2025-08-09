const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className = "",
  ...props 
}) => {
  // Base classes
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:transform-none"
  
  // Size classes
  const sizeClasses = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  }
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 focus:ring-primary-500',
    secondary: 'bg-transparent hover:bg-primary-500 text-primary-500 hover:text-white border-2 border-primary-500 focus:ring-primary-500',
    outline: 'bg-transparent hover:bg-gray-50 text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400 focus:ring-gray-500',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 hover:text-gray-900 focus:ring-gray-500',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 focus:ring-red-500',
    success: 'bg-green-500 hover:bg-green-600 text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 focus:ring-green-500'
  }
  
  // Full width class
  const widthClass = fullWidth ? 'w-full' : ''
  
  // Combine all classes
  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={combinedClasses}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button