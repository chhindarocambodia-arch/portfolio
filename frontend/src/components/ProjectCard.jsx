import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaExternalLinkAlt, FaGithub, FaArrowRight } from 'react-icons/fa'

const ProjectCard = ({ project, index = 0, dark = true }) => {
  const isDark = dark

  const API_URL = import.meta.env.VITE_API_URL || ''

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null
    if (imagePath.startsWith('http')) return imagePath
    return `${API_URL}${imagePath}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={`/projects/${project.id}`}>
        <div className={`group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-2 ${
          isDark 
            ? 'bg-slate-800/50 border border-white/10' 
            : 'bg-white border border-gray-200 shadow-lg'
        }`}>
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            {project.image ? (
              <>
                <img src={getImageUrl(project.image)} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl opacity-30">🚀</span>
                </div>
              </>
            )}
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
              {project.live_url && (
                <span className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white">
                  <FaExternalLinkAlt className="w-5 h-5" />
                </span>
              )}
              {project.github_url && (
                <span className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white">
                  <FaGithub className="w-5 h-5" />
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <span className="text-xs font-medium uppercase tracking-wider text-purple-500">
              {project.category}
            </span>
            <h3 className={`text-xl font-bold mt-1 mb-2 group-hover:text-purple-500 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {project.title}
            </h3>
            <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-white/50' : 'text-gray-600'}`}>
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech_stack?.slice(0, 3).map((tech, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    isDark 
                      ? 'bg-white/10 text-white/70' 
                      : 'bg-purple-50 text-purple-600'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className={`flex items-center gap-2 text-sm font-medium text-purple-500 group-hover:gap-3 transition-all`}>
              View Details <FaArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProjectCard
