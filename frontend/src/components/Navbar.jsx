import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const { isAuthenticated, isAdmin, logout } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    } else {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
    window.location.reload()
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/#contact' }
  ]

  const isHomePage = location.pathname === '/'
  const bgColor = isScrolled || !isHomePage 
    ? (isDark ? 'bg-slate-900/90 backdrop-blur-lg border-b border-white/10' : 'bg-white/90 backdrop-blur-lg border-b border-gray-200')
    : 'bg-transparent'

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgColor}`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-bold font-heading">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Dev
            </span>
            <span className={isDark ? 'text-white' : 'text-gray-900'}>Portfolio</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium transition-colors ${isDark ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-white/10 text-white/60 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}`}
              aria-label="Toggle theme"
            >
              {isDark ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
            </button>

            {isAuthenticated && isAdmin ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/admin"
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className={isDark ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className={isDark ? 'px-4 py-2 text-white/60 hover:text-white font-medium transition-colors' : 'px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors'}
              >
                Admin
              </Link>
            )}
          </div>

          <button
            className={`md:hidden p-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <HiX className="w-6 h-6" />
            ) : (
              <HiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden py-4 ${isDark ? 'border-t border-white/10' : 'border-t border-gray-200'}`}
            >
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={isDark ? 'text-white/60 hover:text-white font-medium' : 'text-gray-600 hover:text-gray-900 font-medium'}
                  >
                    {link.name}
                  </Link>
                ))}
                <button
                  onClick={toggleTheme}
                  className={`flex items-center space-x-2 ${isDark ? 'text-white/60' : 'text-gray-600'}`}
                >
                  {isDark ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
                  <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
                {isAuthenticated && isAdmin ? (
                  <>
                    <Link
                      to="/admin"
                      className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium text-center"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className={isDark ? 'text-white/60 text-left' : 'text-gray-600 text-left'}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="text-purple-500 font-medium"
                  >
                    Admin Login
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

export default Navbar
