import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaProjectDiagram, FaEnvelope, FaPlus, FaCog, FaInbox, FaEye } from 'react-icons/fa'
import { projectService, messageService } from '../../services/api'

const Dashboard = () => {
  const [stats, setStats] = useState({ projectCount: 0, messageCount: 0, unreadCount: 0 })
  const [recentMessages, setRecentMessages] = useState([])
  const [recentProjects, setRecentProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    } else {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectRes, messagesRes] = await Promise.all([
          projectService.getAll(),
          messageService.getAll()
        ])
        
        const projects = projectRes.data
        const messages = messagesRes.data
        setStats({
          projectCount: projects.length,
          messageCount: messages.length,
          unreadCount: messages.filter(m => !m.read).length
        })
        setRecentMessages(messages.slice(0, 5))
        setRecentProjects(projects.slice(0, 5))
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const statCards = [
    { label: 'Total Projects', value: stats.projectCount, icon: FaProjectDiagram, color: 'from-purple-500 to-pink-500' },
    { label: 'Total Messages', value: stats.messageCount, icon: FaInbox, color: 'from-blue-500 to-cyan-500' },
    { label: 'Unread Messages', value: stats.unreadCount, icon: FaEnvelope, color: 'from-green-500 to-emerald-500' }
  ]

  const quickActions = [
    { label: 'Website Settings', icon: FaCog, href: '/admin/settings', color: 'from-purple-500 to-pink-500' },
    { label: 'Manage Projects', icon: FaPlus, href: '/admin/projects', color: 'from-blue-500 to-cyan-500' },
    { label: 'View Messages', icon: FaEnvelope, href: '/admin/messages', color: 'from-green-500 to-emerald-500' }
  ]

  const bgSection = isDark ? 'bg-slate-900' : 'bg-gray-50'
  const bgCard = isDark ? 'bg-slate-800/50 border border-white/10' : 'bg-white border border-gray-200'
  const textPrimary = isDark ? 'text-white' : 'text-gray-900'
  const textSecondary = isDark ? 'text-white/40' : 'text-gray-500'

  return (
    <div className={`min-h-screen pt-20 ${bgSection} transition-colors duration-300`}>
      <div className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`text-3xl font-bold mb-2 ${textPrimary}`}>Admin Dashboard</h1>
          <p className={textSecondary}>
            Manage your portfolio content
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`${bgCard} rounded-2xl p-6`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`${textSecondary} text-sm mb-1`}>{stat.label}</p>
                    <p className={`text-3xl font-bold ${textPrimary}`}>{loading ? '...' : stat.value}</p>
                  </div>
                  <div className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className={`${bgCard} rounded-2xl p-6`}>
              <h2 className={`text-xl font-semibold mb-6 ${textPrimary}`}>Quick Actions</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {quickActions.map((action) => (
                  <Link
                    key={action.label}
                    to={action.href}
                    className="group p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-all text-center"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className={`text-sm font-medium ${isDark ? 'text-white/80' : 'text-gray-700'}`}>{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Messages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className={`${bgCard} rounded-2xl p-6`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-semibold ${textPrimary}`}>Recent Messages</h2>
                <Link
                  to="/admin/messages"
                  className="text-sm text-purple-500 hover:text-purple-400"
                >
                  View All
                </Link>
              </div>
              
              {recentMessages.length === 0 ? (
                <p className={`text-center py-8 ${textSecondary}`}>No messages yet</p>
              ) : (
                <div className="space-y-3">
                  {recentMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-center justify-between p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium">
                          {message.name.charAt(0)}
                        </div>
                        <div>
                          <p className={`font-medium text-sm ${textPrimary}`}>{message.name}</p>
                          <p className={`text-xs ${textSecondary}`}>{message.subject}</p>
                        </div>
                      </div>
                      {!message.read && (
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Recent Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <div className={`${bgCard} rounded-2xl p-6`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-xl font-semibold ${textPrimary}`}>Recent Projects</h2>
              <Link
                to="/admin/projects"
                className="text-sm text-purple-500 hover:text-purple-400 flex items-center gap-1"
              >
                View All <FaEye className="w-3 h-3" />
              </Link>
            </div>
            
            {recentProjects.length === 0 ? (
              <p className={`text-center py-8 ${textSecondary}`}>No projects yet</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className={`p-4 rounded-xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center overflow-hidden">
                        {project.image ? (
                          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        ) : (
                          <FaProjectDiagram className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium text-sm truncate ${textPrimary}`}>{project.title}</p>
                        <p className={`text-xs truncate ${textSecondary}`}>{project.category}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
