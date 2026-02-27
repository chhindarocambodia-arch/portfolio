import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp, FaFacebook, FaTiktok, FaTelegram, FaInstagram, FaDownload } from 'react-icons/fa'
import { settingsService } from '../services/api'

const Footer = () => {
  const [settings, setSettings] = useState({
    about: { name: 'Developer' },
    social: { github: '', linkedin: '', facebook: '', instagram: '', tiktok: '', telegram: '', email: '', location: '', cvUrl: '' }
  })
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    } else {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }

    const fetchSettings = async () => {
      try {
        const res = await settingsService.getAll()
        setSettings(prev => ({ ...prev, ...res.data }))
      } catch (error) {
        console.error('Error fetching footer settings:', error)
      }
    }
    fetchSettings()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className={`${isDark ? 'bg-slate-900 border-t border-white/10' : 'bg-white border-t border-gray-200'}`}>
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link to="/" className="text-2xl font-bold font-heading inline-block mb-4">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                {settings.about?.name?.charAt(0) || 'D'}
              </span>
              <span className={isDark ? 'text-white' : 'text-gray-900'}>evPortfolio</span>
            </Link>
            <p className={isDark ? 'text-white/40 max-w-md mb-6' : 'text-gray-500 max-w-md mb-6'}>
              Building modern, scalable web applications with cutting-edge technologies.
            </p>
            <div className="flex flex-wrap gap-3">
              {settings.social?.facebook && (
                <a
                  href={settings.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg transition-all ${isDark ? 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10' : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200'}`}
                >
                  <FaFacebook className="w-5 h-5" />
                </a>
              )}
              {settings.social?.instagram && (
                <a
                  href={settings.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg transition-all ${isDark ? 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10' : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200'}`}
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
              )}
              {settings.social?.tiktok && (
                <a
                  href={settings.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg transition-all ${isDark ? 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10' : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200'}`}
                >
                  <FaTiktok className="w-5 h-5" />
                </a>
              )}
              {settings.social?.telegram && (
                <a
                  href={settings.social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg transition-all ${isDark ? 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10' : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200'}`}
                >
                  <FaTelegram className="w-5 h-5" />
                </a>
              )}
              {settings.social?.github && (
                <a
                  href={settings.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg transition-all ${isDark ? 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10' : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200'}`}
                >
                  <FaGithub className="w-5 h-5" />
                </a>
              )}
              {settings.social?.linkedin && (
                <a
                  href={settings.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg transition-all ${isDark ? 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10' : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200'}`}
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
              )}
              {settings.social?.email && (
                <a
                  href={`mailto:${settings.social.email}`}
                  className={`p-2 rounded-lg transition-all ${isDark ? 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10' : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200'}`}
                >
                  <FaEnvelope className="w-5 h-5" />
                </a>
              )}
              {settings.social?.cvUrl && (
                <a
                  href={settings.social.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg transition-all ${isDark ? 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10' : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200'}`}
                >
                  <FaDownload className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className={isDark ? 'text-white/40 hover:text-white transition-colors' : 'text-gray-500 hover:text-gray-900 transition-colors'}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className={isDark ? 'text-white/40 hover:text-white transition-colors' : 'text-gray-500 hover:text-gray-900 transition-colors'}>
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/#contact" className={isDark ? 'text-white/40 hover:text-white transition-colors' : 'text-gray-500 hover:text-gray-900 transition-colors'}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Contact</h4>
            <ul className={`space-y-2 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
              <li>{settings.social?.email}</li>
              <li>{settings.social?.location}</li>
            </ul>
          </div>
        </div>

        <div className={`mt-12 pt-8 flex flex-col md:flex-row justify-between items-center ${isDark ? 'border-t border-white/10' : 'border-t border-gray-200'}`}>
          <p className={isDark ? 'text-white/40' : 'text-gray-400'}>
            &copy; {currentYear} {settings.about?.name || 'DevPortfolio'}. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            aria-label="Back to top"
          >
            <FaArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
