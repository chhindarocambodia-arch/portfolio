import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { FaLock, FaEnvelope } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    } else {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }, [])

  const from = location.state?.from?.pathname || '/admin'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const user = await login(formData.email, formData.password)
      if (user.role === 'admin') {
        toast.success('Welcome back!')
        navigate(from, { replace: true })
      } else {
        toast.error('Access denied. Admin only.')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen pt-20 flex items-center justify-center transition-colors duration-300 ${isDark ? 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'} relative overflow-hidden`}>
      {/* Background */}
      {isDark ? (
        <>
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
        </>
      ) : (
        <>
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-purple-200/50 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-pink-200/50 rounded-full blur-3xl"></div>
        </>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className={`backdrop-blur-xl border rounded-2xl p-8 ${isDark ? 'bg-slate-800/50 border-white/10' : 'bg-white/80 border-gray-200'}`}>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaLock className="w-8 h-8 text-white" />
            </div>
            <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Admin Login
            </h1>
            <p className={isDark ? 'text-white/40' : 'text-gray-500'}>
              Sign in to manage your portfolio
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Email</label>
              <div className="relative">
                <FaEnvelope className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-white/30' : 'text-gray-400'}`} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none transition-colors ${
                    isDark 
                      ? 'bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-purple-500' 
                      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500'
                  }`}
                  placeholder="admin@portfolio.com"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Password</label>
              <div className="relative">
                <FaLock className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-white/30' : 'text-gray-400'}`} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none transition-colors ${
                    isDark 
                      ? 'bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-purple-500' 
                      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500'
                  }`}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className={`text-sm ${isDark ? 'text-white/40 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
              ← Back to Portfolio
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
