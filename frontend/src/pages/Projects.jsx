import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { projectService } from '../services/api'
import ProjectCard from '../components/ProjectCard'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState('all')
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
    const fetchProjects = async () => {
      try {
        const response = await projectService.getAll()
        setProjects(response.data)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const categories = ['all', 'frontend', 'backend', 'fullstack']

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter)

  const bgPrimary = isDark ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
  const bgSection = isDark ? 'bg-slate-900' : 'bg-white'
  const textPrimary = isDark ? 'text-white' : 'text-gray-900'
  const textSecondary = isDark ? 'text-white/60' : 'text-gray-600'
  const textMuted = isDark ? 'text-white/40' : 'text-gray-400'

  return (
    <div className="min-h-screen">
      <section className={`py-24 ${bgPrimary}`}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-purple-500 font-medium mb-4 block">// MY WORK</span>
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${textPrimary}`}>
              My <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Projects</span>
            </h1>
            <p className={`${textSecondary} max-w-2xl mx-auto`}>
              A collection of projects showcasing my skills and experience
            </p>
          </motion.div>
        </div>
      </section>

      <section className={`py-16 ${bgSection}`}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === category
                    ? 'bg-purple-500 text-white'
                    : `${isDark ? 'bg-white/5 text-white/60 hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </motion.div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className={`${isDark ? 'bg-slate-800/50 border border-white/10' : 'bg-white border border-gray-200'} rounded-2xl p-6 animate-pulse`}>
                  <div className={`h-48 ${isDark ? 'bg-white/5' : 'bg-gray-200'} rounded-xl mb-4`}></div>
                  <div className={`h-6 ${isDark ? 'bg-white/5' : 'bg-gray-200'} rounded mb-2`}></div>
                  <div className={`h-4 ${isDark ? 'bg-white/5' : 'bg-gray-200'} rounded w-2/3`}></div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <p className={textMuted}>No projects found in this category</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} dark={isDark} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Projects
