import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { FaUser, FaPalette, FaLink, FaEnvelope, FaSave, FaTrash, FaImage, FaCode, FaTools, FaBriefcase, FaCogs } from 'react-icons/fa'
import { settingsService, skillService } from '../../services/api'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const [settings, setSettings] = useState({
    hero: { title: '', subtitle: '', typingTexts: [] },
    about: { name: '', title: '', bio: '', yearsExperience: 0, projectsCompleted: 0, clientsSatisfied: 0, image: '' },
    services: [],
    process: [],
    social: { github: '', linkedin: '', facebook: '', instagram: '', tiktok: '', telegram: '', email: '', location: '', cvUrl: '' },
    contact: { email: '', subject: '', message: '' }
  })
  const [skills, setSkills] = useState([])
  const [typingTextInput, setTypingTextInput] = useState('')
  const [newSkill, setNewSkill] = useState({ name: '', category: 'frontend', proficiency: 80 })
  const [newService, setNewService] = useState({ title: '', description: '' })
  const [newProcess, setNewProcess] = useState({ step: '', title: '', description: '' })

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    } else {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [settingsRes, skillsRes] = await Promise.all([
        settingsService.getAll(),
        skillService.getAll()
      ])
      setSettings(prev => ({ ...prev, ...settingsRes.data }))
      setSkills(skillsRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }))
  }

  const handleSave = async (section) => {
    setSaving(true)
    try {
      await settingsService.update(section, settings[section])
      toast.success(`${section.charAt(0).toUpperCase() + section.slice(1)} settings saved!`)
    } catch (error) {
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const handleImageUpload = async (section, e) => {
    const file = e.target.files[0]
    if (!file) return
    
    setSaving(true)
    try {
      const res = await settingsService.uploadImage(section, file)
      setSettings(prev => ({
        ...prev,
        [section]: { ...prev[section], image: res.data.image }
      }))
      toast.success('Image uploaded!')
    } catch (error) {
      toast.error('Failed to upload image')
    } finally {
      setSaving(false)
    }
  }

  const addTypingText = () => {
    if (typingTextInput.trim()) {
      const newTexts = [...(settings.hero.typingTexts || []), typingTextInput.trim()]
      handleChange('hero', 'typingTexts', newTexts)
      setTypingTextInput('')
    }
  }

  const removeTypingText = (index) => {
    const newTexts = (settings.hero.typingTexts || []).filter((_, i) => i !== index)
    handleChange('hero', 'typingTexts', newTexts)
  }

  const addSkill = async () => {
    if (!newSkill.name.trim()) return
    try {
      await skillService.create(newSkill)
      toast.success('Skill added!')
      setNewSkill({ name: '', category: 'frontend', proficiency: 80 })
      fetchData()
    } catch (error) {
      toast.error('Failed to add skill')
    }
  }

  const deleteSkill = async (id) => {
    if (!window.confirm('Delete this skill?')) return
    try {
      await skillService.delete(id)
      toast.success('Skill deleted!')
      fetchData()
    } catch (error) {
      toast.error('Failed to delete skill')
    }
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FaUser },
    { id: 'hero', label: 'Hero Section', icon: FaPalette },
    { id: 'about', label: 'About Section', icon: FaUser },
    { id: 'skills', label: 'Skills', icon: FaCode },
    { id: 'services', label: 'Services', icon: FaBriefcase },
    { id: 'process', label: 'Process', icon: FaCogs },
    { id: 'social', label: 'Social Links', icon: FaLink },
    { id: 'contact', label: 'Contact Section', icon: FaEnvelope }
  ]

  const getSkillsByCategory = (category) => skills.filter(s => s.category === category)

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-2">Website Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Control everything on your portfolio website
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="card">
            {activeTab === 'profile' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Profile Picture</h2>
                  <div className="flex items-center gap-6">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-200 to-accent-200 flex items-center justify-center overflow-hidden">
                      {settings.about?.image ? (
                        <img src={settings.about.image} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <FaUser className="w-16 h-16 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <label className="btn-secondary cursor-pointer inline-flex items-center gap-2">
                        <FaImage />
                        Upload Photo
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload('about', e)} className="hidden" />
                      </label>
                      <p className="text-sm text-gray-500 mt-2">Recommended: Square image, max 2MB</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h2 className="text-xl font-semibold mb-4">CV / Resume</h2>
                  <div className="flex items-center gap-4">
                    <div className={`px-4 py-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      {settings.social?.cvUrl ? (
                        <a href={settings.social.cvUrl} target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline">
                          View Current CV
                        </a>
                      ) : (
                        <span className="text-gray-500">No CV uploaded</span>
                      )}
                    </div>
                    <label className="btn-secondary cursor-pointer inline-flex items-center gap-2">
                      <FaImage />
                      Upload CV
                      <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleImageUpload('social', e)} className="hidden" />
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Upload PDF, DOC, or DOCX file</p>
                </div>
              </div>
            )}

            {activeTab === 'hero' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Hero Section</h2>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Main Title (Your Name)</label>
                  <input
                    type="text"
                    value={settings.hero.title || ''}
                    onChange={(e) => handleChange('hero', 'title', e.target.value)}
                    className="input-field"
                    placeholder="Full Stack Developer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subtitle</label>
                  <textarea
                    value={settings.hero.subtitle || ''}
                    onChange={(e) => handleChange('hero', 'subtitle', e.target.value)}
                    className="input-field min-h-[80px]"
                    placeholder="Building modern web applications..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Typing Animation Texts</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={typingTextInput}
                      onChange={(e) => setTypingTextInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTypingText()}
                      className="input-field flex-1"
                      placeholder="Add text (e.g., React Expert)"
                    />
                    <button onClick={addTypingText} className="btn-primary px-4">Add</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(settings.hero.typingTexts || []).map((text, index) => (
                      <span key={index} className="flex items-center gap-2 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full">
                        {text}
                        <button onClick={() => removeTypingText(index)} className="text-red-500 hover:text-red-700">
                          <FaTrash className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <button onClick={() => handleSave('hero')} disabled={saving} className="btn-primary flex items-center gap-2">
                  <FaSave /> {saving ? 'Saving...' : 'Save Hero Settings'}
                </button>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">About Section</h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      value={settings.about?.name || ''}
                      onChange={(e) => handleChange('about', 'name', e.target.value)}
                      className="input-field"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Job Title</label>
                    <input
                      type="text"
                      value={settings.about?.title || ''}
                      onChange={(e) => handleChange('about', 'title', e.target.value)}
                      className="input-field"
                      placeholder="Full Stack Developer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  <textarea
                    value={settings.about?.bio || ''}
                    onChange={(e) => handleChange('about', 'bio', e.target.value)}
                    className="input-field min-h-[120px]"
                    placeholder="Tell visitors about yourself..."
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Years of Experience</label>
                    <input
                      type="number"
                      value={settings.about?.yearsExperience || 0}
                      onChange={(e) => handleChange('about', 'yearsExperience', parseInt(e.target.value))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Projects Completed</label>
                    <input
                      type="number"
                      value={settings.about?.projectsCompleted || 0}
                      onChange={(e) => handleChange('about', 'projectsCompleted', parseInt(e.target.value))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Clients Satisfied</label>
                    <input
                      type="number"
                      value={settings.about?.clientsSatisfied || 0}
                      onChange={(e) => handleChange('about', 'clientsSatisfied', parseInt(e.target.value))}
                      className="input-field"
                    />
                  </div>
                </div>

                <button onClick={() => handleSave('about')} disabled={saving} className="btn-primary flex items-center gap-2">
                  <FaSave /> {saving ? 'Saving...' : 'Save About Settings'}
                </button>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Skills Management</h2>

                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <h3 className="font-medium mb-4">Add New Skill</h3>
                  <div className="flex flex-wrap gap-4">
                    <input
                      type="text"
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                      className="input-field flex-1 min-w-[200px]"
                      placeholder="Skill name (e.g., React)"
                    />
                    <select
                      value={newSkill.category}
                      onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                      className="input-field w-auto"
                    >
                      <option value="frontend">Frontend</option>
                      <option value="backend">Backend</option>
                      <option value="database">Database</option>
                      <option value="tools">Tools</option>
                    </select>
                    <input
                      type="number"
                      value={newSkill.proficiency}
                      onChange={(e) => setNewSkill({ ...newSkill, proficiency: parseInt(e.target.value) })}
                      className="input-field w-24"
                      min="0"
                      max="100"
                    />
                    <button onClick={addSkill} className="btn-primary">Add Skill</button>
                  </div>
                </div>

                {['frontend', 'backend', 'database', 'tools'].map(category => (
                  <div key={category} className="space-y-3">
                    <h3 className="font-medium capitalize flex items-center gap-2">
                      {category === 'frontend' && <FaCode className="text-blue-500" />}
                      {category === 'backend' && <FaCode className="text-green-500" />}
                      {category === 'database' && <FaTools className="text-yellow-500" />}
                      {category === 'tools' && <FaTools className="text-purple-500" />}
                      {category} Skills
                    </h3>
                    <div className="grid gap-3">
                      {getSkillsByCategory(category).map(skill => (
                        <div key={skill.id} className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                          <div className="flex-1 mr-4">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">{skill.name}</span>
                              <span className="text-sm text-gray-500">{skill.proficiency}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                                style={{ width: `${skill.proficiency}%` }}
                              />
                            </div>
                          </div>
                          <button
                            onClick={() => deleteSkill(skill.id)}
                            className="text-red-500 hover:text-red-700 p-2"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      ))}
                      {getSkillsByCategory(category).length === 0 && (
                        <p className="text-gray-500 text-sm italic">No {category} skills added yet</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Services Section</h2>
                <p className="text-gray-500 text-sm">Manage the services displayed on your home page</p>

                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <h3 className="font-medium mb-4">Add New Service</h3>
                  <div className="grid gap-4">
                    <input
                      type="text"
                      value={newService?.title || ''}
                      onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                      className="input-field"
                      placeholder="Service title (e.g., Web Development)"
                    />
                    <textarea
                      value={newService?.description || ''}
                      onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                      className="input-field min-h-[80px]"
                      placeholder="Service description"
                    />
                    <button 
                      onClick={() => {
                        if (newService?.title && newService?.description) {
                          const services = [...(settings.services || []), { ...newService, id: Date.now() }];
                          handleChange('services', '', services);
                          setNewService({ title: '', description: '' });
                        }
                      }} 
                      className="btn-primary"
                    >
                      Add Service
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {(settings.services || []).map((service, index) => (
                    <div key={service.id || index} className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'} flex justify-between items-start`}>
                      <div>
                        <h4 className="font-medium">{service.title}</h4>
                        <p className="text-sm text-gray-500">{service.description}</p>
                      </div>
                      <button
                        onClick={() => {
                          const services = (settings.services || []).filter((_, i) => i !== index);
                          handleChange('services', '', services);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  {(settings.services || []).length === 0 && (
                    <p className="text-gray-500 col-span-2 text-center py-8">No services added yet. Add your first service above.</p>
                  )}
                </div>

                <button onClick={() => handleSave('services')} disabled={saving} className="btn-primary flex items-center gap-2">
                  <FaSave /> {saving ? 'Saving...' : 'Save Services'}
                </button>
              </div>
            )}

            {activeTab === 'process' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Working Process Section</h2>
                <p className="text-gray-500 text-sm">Manage the process steps displayed on your home page</p>

                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <h3 className="font-medium mb-4">Add New Process Step</h3>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={newProcess?.step || ''}
                        onChange={(e) => setNewProcess({ ...newProcess, step: e.target.value })}
                        className="input-field"
                        placeholder="Step (e.g., 01)"
                      />
                      <input
                        type="text"
                        value={newProcess?.title || ''}
                        onChange={(e) => setNewProcess({ ...newProcess, title: e.target.value })}
                        className="input-field"
                        placeholder="Title (e.g., Discovery)"
                      />
                    </div>
                    <textarea
                      value={newProcess?.description || ''}
                      onChange={(e) => setNewProcess({ ...newProcess, description: e.target.value })}
                      className="input-field min-h-[80px]"
                      placeholder="Description"
                    />
                    <button 
                      onClick={() => {
                        if (newProcess?.title && newProcess?.description) {
                          const process = [...(settings.process || []), { ...newProcess, id: Date.now() }];
                          handleChange('process', '', process);
                          setNewProcess({ step: '', title: '', description: '' });
                        }
                      }} 
                      className="btn-primary"
                    >
                      Add Step
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {(settings.process || []).map((p, index) => (
                    <div key={p.id || index} className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'} flex justify-between items-start`}>
                      <div>
                        <p className="text-purple-500 font-bold text-sm">{p.step}</p>
                        <h4 className="font-medium">{p.title}</h4>
                        <p className="text-xs text-gray-500">{p.description}</p>
                      </div>
                      <button
                        onClick={() => {
                          const process = (settings.process || []).filter((_, i) => i !== index);
                          handleChange('process', '', process);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {(settings.process || []).length === 0 && (
                    <p className="text-gray-500 col-span-4 text-center py-8">No process steps added yet. Add your first step above.</p>
                  )}
                </div>

                <button onClick={() => handleSave('process')} disabled={saving} className="btn-primary flex items-center gap-2">
                  <FaSave /> {saving ? 'Saving...' : 'Save Process'}
                </button>
              </div>
            )}

            {activeTab === 'social' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Social Media Links</h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">GitHub</label>
                    <input
                      type="url"
                      value={settings.social?.github || ''}
                      onChange={(e) => handleChange('social', 'github', e.target.value)}
                      className="input-field"
                      placeholder="https://github.com/username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">LinkedIn</label>
                    <input
                      type="url"
                      value={settings.social?.linkedin || ''}
                      onChange={(e) => handleChange('social', 'linkedin', e.target.value)}
                      className="input-field"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Facebook</label>
                    <input
                      type="url"
                      value={settings.social?.facebook || ''}
                      onChange={(e) => handleChange('social', 'facebook', e.target.value)}
                      className="input-field"
                      placeholder="https://facebook.com/username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Instagram</label>
                    <input
                      type="url"
                      value={settings.social?.instagram || ''}
                      onChange={(e) => handleChange('social', 'instagram', e.target.value)}
                      className="input-field"
                      placeholder="https://instagram.com/username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">TikTok</label>
                    <input
                      type="url"
                      value={settings.social?.tiktok || ''}
                      onChange={(e) => handleChange('social', 'tiktok', e.target.value)}
                      className="input-field"
                      placeholder="https://tiktok.com/@username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Telegram</label>
                    <input
                      type="url"
                      value={settings.social?.telegram || ''}
                      onChange={(e) => handleChange('social', 'telegram', e.target.value)}
                      className="input-field"
                      placeholder="https://t.me/username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={settings.social?.email || ''}
                      onChange={(e) => handleChange('social', 'email', e.target.value)}
                      className="input-field"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input
                      type="text"
                      value={settings.social?.location || ''}
                      onChange={(e) => handleChange('social', 'location', e.target.value)}
                      className="input-field"
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                <button onClick={() => handleSave('social')} disabled={saving} className="btn-primary flex items-center gap-2">
                  <FaSave /> {saving ? 'Saving...' : 'Save Social Settings'}
                </button>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Contact Section</h2>

                <div>
                  <label className="block text-sm font-medium mb-2">Contact Email</label>
                  <input
                    type="email"
                    value={settings.contact?.email || ''}
                    onChange={(e) => handleChange('contact', 'email', e.target.value)}
                    className="input-field"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Default Subject Line</label>
                  <input
                    type="text"
                    value={settings.contact?.subject || ''}
                    onChange={(e) => handleChange('contact', 'subject', e.target.value)}
                    className="input-field"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Default Message Placeholder</label>
                  <textarea
                    value={settings.contact?.message || ''}
                    onChange={(e) => handleChange('contact', 'message', e.target.value)}
                    className="input-field min-h-[80px]"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button onClick={() => handleSave('contact')} disabled={saving} className="btn-primary flex items-center gap-2">
                  <FaSave /> {saving ? 'Saving...' : 'Save Contact Settings'}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Settings
