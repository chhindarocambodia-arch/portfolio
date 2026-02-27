import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaCode, FaTools, FaCalendar } from 'react-icons/fa'
import { projectService } from '../services/api'

const ProjectDetail = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isDark, setIsDark] = useState(true)

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null
    if (imagePath.startsWith('http')) return imagePath
    return `http://localhost:5000${imagePath}`
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    } else {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }, [])

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await projectService.getById(id)
        setProject(response.data)
      } catch (error) {
        console.error('Error fetching project:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProject()
  }, [id])

  const bgPrimary = isDark ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
  const bgSection = isDark ? 'bg-slate-900' : 'bg-white'
  const bgCard = isDark ? 'bg-slate-800/50 border border-white/10' : 'bg-white border border-gray-200'
  const textPrimary = isDark ? 'text-white' : 'text-gray-900'
  const textSecondary = isDark ? 'text-white/60' : 'text-gray-600'
  const textMuted = isDark ? 'text-white/40' : 'text-gray-400'

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${textPrimary}`}>Project not found</h2>
          <Link to="/projects" className="text-purple-500 hover:underline">
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <section className={`py-12 ${bgPrimary}`}>
        <div className="container-custom">
          <Link
            to="/projects"
            className={`inline-flex items-center mb-8 transition-colors ${isDark ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <FaArrowLeft className="mr-2" />
            Back to Projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-sm font-medium text-purple-500 uppercase tracking-wider">
              {project.category}
            </span>
            <h1 className={`text-4xl md:text-5xl font-bold mt-2 mb-6 ${textPrimary}`}>
              {project.title}
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className={`${bgCard} rounded-2xl mb-8`}>
                {project.image ? (
                  <img src={getImageUrl(project.image)} alt={project.title} className="w-full h-80 object-cover rounded-xl" />
                ) : (
                  <div className="h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-8xl">🚀</span>
                  </div>
                )}
              </div>

              <div className={bgCard}>
                <h2 className={`text-2xl font-bold mb-4 ${textPrimary}`}>About This Project</h2>
                <p className={`${textSecondary} leading-relaxed`}>
                  {project.description}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className={bgCard}>
                <h3 className={`text-lg font-semibold mb-4 flex items-center ${textPrimary}`}>
                  <FaCode className="mr-2 text-purple-500" />
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack?.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm font-medium bg-purple-500/20 text-purple-500 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className={bgCard}>
                <h3 className={`text-lg font-semibold mb-4 flex items-center ${textPrimary}`}>
                  <FaTools className="mr-2 text-purple-500" />
                  Links
                </h3>
                <div className="space-y-3">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-between p-3 rounded-lg transition-colors ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'}`}
                    >
                      <span className={`font-medium ${textPrimary}`}>Live Demo</span>
                      <FaExternalLinkAlt className="text-purple-500" />
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-between p-3 rounded-lg transition-colors ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'}`}
                    >
                      <span className={`font-medium ${textPrimary}`}>Source Code</span>
                      <FaGithub className={textSecondary} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProjectDetail
