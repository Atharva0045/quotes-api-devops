import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-xl font-bold text-primary-500 hover:text-primary-600 transition-colors"
          >
            QuotesAPI
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-primary-500 text-white' 
                  : 'text-gray-700 hover:bg-primary-500 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/quotes"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/quotes') 
                  ? 'bg-primary-500 text-white' 
                  : 'text-gray-700 hover:bg-primary-500 hover:text-white'
              }`}
            >
              All Quotes
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/about') 
                  ? 'bg-primary-500 text-white' 
                  : 'text-gray-700 hover:bg-primary-500 hover:text-white'
              }`}
            >
              About
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-500 hover:bg-gray-100 transition-colors"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <Link
                to="/"
                onClick={closeMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/') 
                    ? 'bg-primary-500 text-white' 
                    : 'text-gray-700 hover:bg-primary-500 hover:text-white'
                }`}
              >
                Home
              </Link>
              <Link
                to="/quotes"
                onClick={closeMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/quotes') 
                    ? 'bg-primary-500 text-white' 
                    : 'text-gray-700 hover:bg-primary-500 hover:text-white'
                }`}
              >
                All Quotes
              </Link>
              <Link
                to="/about"
                onClick={closeMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/about') 
                    ? 'bg-primary-500 text-white' 
                    : 'text-gray-700 hover:bg-primary-500 hover:text-white'
                }`}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar