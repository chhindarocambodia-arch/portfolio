import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { FaPlus, FaEdit, FaTrash, FaImage, FaTimes } from 'react-icons/fa'
import { projectService } from '../../services/api'

const ProjectsManager = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'fullstack',
    tech_stack: '',
    live_url: '',
    github_url: '',
    featured: false,
    image: null
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [])

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const data = new FormData()
      data.append('title', formData.title)
      data.append('description', formData.description)
      data.append('category', formData.category)
      data.append('tech_stack', formData.tech_stack)
      data.append('live_url', formData.live_url)
      data.append('github_url', formData.github_url)
      data.append('featured', formData.featured)
      if (formData.image) {
        data.append('image', formData.image)
      }

      if (editingProject) {
        await projectService.update(editingProject.id, data)
        toast.success('Project updated successfully!')
      } else {
        await projectService.create(data)
        toast.success('Project created successfully!')
      }

      setShowModal(false)
      setEditingProject(null)
      resetForm()
      fetchProjects()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save project')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      tech_stack: project.tech_stack.join(', '),
      live_url: project.live_url || '',
      github_url: project.github_url || '',
      featured: project.featured,
      image: null
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return

    try {
      await projectService.delete(id)
      toast.success('Project deleted successfully!')
      fetchProjects()
    } catch (error) {
      toast.error('Failed to delete project')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'fullstack',
      tech_stack: '',
      live_url: '',
      github_url: '',
      featured: false,
      image: null
    })
  }

  const openCreateModal = () => {
    resetForm()
    setEditingProject(null)
    setShowModal(true)
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Projects Manager</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Add, edit, and delete your projects
            </p>
          </div>
          <button onClick={openCreateModal} className="btn-primary flex items-center">
            <FaPlus className="mr-2" />
            Add Project
          </button>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="card text-center py-16">
            <p className="text-gray-500 mb-4">No projects yet</p>
            <button onClick={openCreateModal} className="btn-primary">
              Create Your First Project
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card"
              >
                <div className="h-40 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                  {project.image ? (
                    <img 
                      src={project.image.startsWith('http') ? project.image : `http://localhost:5000${project.image}`} 
                      alt={project.title} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <FaImage className="w-12 h-12 text-primary-300" />
                  )}
                </div>
                
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  {project.featured && (
                    <span className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-gray-500 mb-3 capitalize">{project.category}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tech_stack?.slice(0, 3).map((tech, i) => (
                    <span key={i} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="flex-1 flex items-center justify-center py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors"
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="flex items-center justify-center px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">
                    {editingProject ? 'Edit Project' : 'Add New Project'}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <FaTimes />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="input-field min-h-[100px]"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="input-field"
                      >
                        <option value="fullstack">Full Stack</option>
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="mobile">Mobile</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Tech Stack</label>
                      <input
                        type="text"
                        name="tech_stack"
                        value={formData.tech_stack}
                        onChange={handleChange}
                        placeholder="React, Node.js, MongoDB"
                        className="input-field"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Live URL</label>
                      <input
                        type="url"
                        name="live_url"
                        value={formData.live_url}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="https://"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">GitHub URL</label>
                      <input
                        type="url"
                        name="github_url"
                        value={formData.github_url}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="https://github.com/..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Project Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="input-field"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="featured"
                      id="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                      className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <label htmlFor="featured" className="ml-2 text-sm font-medium">
                      Mark as featured
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="btn-primary w-full disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : editingProject ? 'Update Project' : 'Create Project'}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProjectsManager
