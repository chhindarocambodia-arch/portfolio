import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedin, FaArrowRight, FaMapMarkerAlt, FaEnvelope, FaUser, FaBriefcase, FaClock, FaCheckCircle, FaFacebook, FaTiktok, FaTelegram, FaInstagram, FaDownload, FaLaptopCode, FaMobileAlt, FaDatabase, FaCloud, FaPalette, FaRocket } from 'react-icons/fa'
import { FaFileDownload } from 'react-icons/fa'
import Typewriter from 'typewriter-effect'
import { projectService, settingsService, skillService, messageService } from '../services/api'
import ProjectCard from '../components/ProjectCard'

const Home = () => {
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [settings, setSettings] = useState({
    hero: { title: '', subtitle: '', typingTexts: [] },
    about: { name: '', title: '', bio: '', yearsExperience: 0, projectsCompleted: 0, clientsSatisfied: 0, image: '' },
    services: [],
    process: [],
    social: { github: '', linkedin: '', facebook: '', instagram: '', tiktok: '', telegram: '', email: '', location: '', cvUrl: '' },
    contact: { email: '', subject: '', message: '' }
  })
  const [loading, setLoading] = useState(true)
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
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
        const [settingsRes, projectsRes, skillsRes] = await Promise.all([
          settingsService.getAll(),
          projectService.getAll(),
          skillService.getAll()
        ])
        setSettings(prev => ({ ...prev, ...settingsRes.data }))
        setProjects(projectsRes.data)
        setSkills(skillsRes.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleContactChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value })
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      await messageService.create(contactForm)
      alert('Message sent successfully!')
      setContactForm({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      alert('Failed to send message')
    } finally {
      setSending(false)
    }
  }

  const typingTexts = settings.hero?.typingTexts || ['Full Stack Developer']
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter)

  const getSkillsByCategory = (category) => skills.filter(s => s.category === category)

  const stats = [
    { value: settings.about?.yearsExperience || 0, label: 'Years Experience', icon: FaClock },
    { value: settings.about?.projectsCompleted || projects.length, label: 'Projects Completed', icon: FaBriefcase },
    { value: settings.about?.clientsSatisfied || 0, label: 'Happy Clients', icon: FaCheckCircle }
  ]

  const bgPrimary = isDark ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
  const bgSection = isDark ? 'bg-slate-900' : 'bg-white'
  const bgCard = isDark ? 'bg-slate-800/50 border border-white/10' : 'bg-white border border-gray-200'
  const textPrimary = isDark ? 'text-white' : 'text-gray-900'
  const textSecondary = isDark ? 'text-white/60' : 'text-gray-600'
  const textMuted = isDark ? 'text-white/40' : 'text-gray-400'
  const textTertiary = isDark ? 'text-white/80' : 'text-gray-700'

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className={`min-h-screen flex items-center pt-20 relative overflow-hidden ${bgPrimary}`}>
        {isDark ? (
          <>
            <div className="absolute top-1/4 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
          </>
        ) : (
          <>
            <div className="absolute top-1/4 -right-20 w-96 h-96 bg-purple-200/50 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-pink-200/50 rounded-full blur-3xl"></div>
          </>
        )}
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Profile Image in Hero */}
              {settings.about?.image && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="mb-6"
                >
                  <img 
                    src={settings.about.image} 
                    alt={settings.about?.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-purple-500 shadow-lg"
                  />
                </motion.div>
              )}

              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6 ${isDark ? 'bg-white/10 backdrop-blur-sm border border-white/20 text-white/80' : 'bg-purple-100 border border-purple/20 text-purple-800'}`}
              >
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Available for work
              </motion.span>

              <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold font-heading mb-2 leading-tight ${textPrimary}`}>
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {settings.about?.name || 'Developer'}
                </span>
              </h1>

              {settings.about?.title && (
                <p className={`text-xl md:text-2xl mb-2 ${textSecondary}`}>
                  {settings.about.title}
                </p>
              )}

              <div className={`text-xl md:text-2xl mb-8 h-10 ${textSecondary}`}>
                <Typewriter
                  options={{
                    strings: typingTexts,
                    autoStart: true,
                    loop: true,
                    delay: 80,
                    deleteSpeed: 50,
                    pause: 2000
                  }}
                />
              </div>

              <p className={`text-lg ${textSecondary} max-w-2xl mx-auto mb-10`}>
                {settings.hero?.subtitle}
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Link to="/projects" className={`group px-8 py-4 font-semibold rounded-full transition-all duration-300 flex items-center gap-2 ${isDark ? 'bg-white text-slate-900 hover:bg-purple-50' : 'bg-purple-600 text-white hover:bg-purple-700'}`}>
                  View My Work
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/#contact" className={`px-8 py-4 border font-semibold rounded-full transition-all duration-300 ${isDark ? 'border-white/20 text-white hover:bg-white/10' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}>
                  Contact Me
                </Link>
              </div>

              <div className="flex justify-center gap-4">
                {settings.social?.facebook && (
                  <a href={settings.social.facebook} target="_blank" rel="noopener noreferrer" 
                    className={`p-3 rounded-full transition-all ${isDark ? 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/20' : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200'}`}>
                    <FaFacebook className="w-5 h-5" />
                  </a>
                )}
                {settings.social?.instagram && (
                  <a href={settings.social.instagram} target="_blank" rel="noopener noreferrer"
                    className={`p-3 rounded-full transition-all ${isDark ? 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/20' : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200'}`}>
                    <FaInstagram className="w-5 h-5" />
                  </a>
                )}
                {settings.social?.tiktok && (
                  <a href={settings.social.tiktok} target="_blank" rel="noopener noreferrer"
                    className={`p-3 rounded-full transition-all ${isDark ? 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/20' : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200'}`}>
                    <FaTiktok className="w-5 h-5" />
                  </a>
                )}
                {settings.social?.telegram && (
                  <a href={settings.social.telegram} target="_blank" rel="noopener noreferrer"
                    className={`p-3 rounded-full transition-all ${isDark ? 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/20' : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200'}`}>
                    <FaTelegram className="w-5 h-5" />
                  </a>
                )}
                {settings.social?.github && (
                  <a href={settings.social.github} target="_blank" rel="noopener noreferrer" 
                    className={`p-3 rounded-full transition-all ${isDark ? 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/20' : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200'}`}>
                    <FaGithub className="w-5 h-5" />
                  </a>
                )}
                {settings.social?.linkedin && (
                  <a href={settings.social.linkedin} target="_blank" rel="noopener noreferrer"
                    className={`p-3 rounded-full transition-all ${isDark ? 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/20' : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200'}`}>
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                )}
                {settings.social?.email && (
                  <a href={`mailto:${settings.social.email}`}
                    className={`p-3 rounded-full transition-all ${isDark ? 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/20' : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200'}`}>
                    <FaEnvelope className="w-5 h-5" />
                  </a>
                )}
                {settings.social?.cvUrl && (
                  <a href={settings.social.cvUrl} target="_blank" rel="noopener noreferrer"
                    className={`p-3 rounded-full transition-all ${isDark ? 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/20' : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200'}`}>
                    <FaDownload className="w-5 h-5" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className={`w-6 h-10 border-2 rounded-full flex justify-center ${isDark ? 'border-white/20' : 'border-gray-300'}`}
          >
            <motion.div className={`w-1.5 h-3 ${isDark ? 'bg-white/40' : 'bg-gray-400'} rounded-full mt-2`}></motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className={`py-24 ${bgSection}`}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <span className="text-purple-500 font-medium mb-4 block">// ABOUT ME</span>
            <h2 className={`text-4xl md:text-5xl font-bold mb-8 ${textPrimary}`}>
              Building digital experiences that matter
            </h2>
            <p className={`${textSecondary} text-lg leading-relaxed mb-12`}>
              {settings.about?.bio}
            </p>

            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                  <p className={`text-4xl font-bold mb-1 ${textPrimary}`}>{stat.value}+</p>
                  <p className={`text-sm ${textMuted}`}>{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className={`py-24 ${isDark ? 'bg-gradient-to-b from-slate-800 to-slate-900' : 'bg-gray-100'}`}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-purple-500 font-medium mb-4 block">// WHAT I DO</span>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${textPrimary}`}>Services I Offer</h2>
            <p className={`${textMuted} max-w-2xl mx-auto`}>Bringing your ideas to life with modern technology</p>
          </motion.div>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(settings.services && settings.services.length > 0) ? (
              settings.services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`${bgCard} rounded-2xl p-8 h-full hover:border-purple-500/50 transition-colors`}>
                    <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                      <FaLaptopCode className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-primary">{service.title}</h3>
                    <p className={`${textSecondary}`}>{service.description}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              [
                { icon: FaLaptopCode, title: 'Web Development', desc: 'Custom websites and web applications built with modern frameworks like React, Node.js, and more.' },
                { icon: FaMobileAlt, title: 'Responsive Design', desc: 'Beautiful, mobile-friendly interfaces that look great on all devices.' },
                { icon: FaDatabase, title: 'Database Design', desc: 'Efficient database architecture and management with MySQL, MongoDB, and other databases.' },
                { icon: FaCloud, title: 'API Development', desc: 'RESTful and GraphQL APIs that power your applications with secure endpoints.' },
                { icon: FaPalette, title: 'UI/UX Design', desc: 'User-centered design that combines aesthetics with functionality.' },
                { icon: FaRocket, title: 'Performance Optimization', desc: 'Speed up your applications with optimization best practices.' }
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`${bgCard} rounded-2xl p-8 h-full hover:border-purple-500/50 transition-colors`}>
                    <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-primary">{service.title}</h3>
                    <p className={`${textSecondary}`}>{service.desc}</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className={`py-24 ${isDark ? 'bg-gradient-to-b from-slate-900 to-slate-800' : 'bg-gray-50'}`}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-purple-500 font-medium mb-4 block">// MY SKILLS</span>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${textPrimary}`}>Skills & Technologies</h2>
            <p className={`${textMuted} max-w-2xl mx-auto`}>Technologies I work with</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['frontend', 'backend', 'database', 'tools'].map((category, catIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
              >
                <div className={`${bgCard} rounded-2xl p-6 h-full`}>
                  <h3 className={`text-lg font-semibold mb-4 capitalize ${textPrimary}`}>{category}</h3>
                  <div className="space-y-3">
                    {getSkillsByCategory(category).length > 0 ? (
                      getSkillsByCategory(category).map((skill) => (
                        <div key={skill.id} className="flex items-center justify-between">
                          <span className={`text-sm ${textSecondary}`}>{skill.name}</span>
                          <div className="flex items-center gap-2">
                            <div className={`w-20 h-2 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                              <div 
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" 
                                style={{ width: `${skill.proficiency}%` }}
                              ></div>
                            </div>
                            <span className={`text-xs ${textMuted}`}>{skill.proficiency}%</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className={`text-sm ${textMuted}`}>No skills added yet</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className={`py-24 ${bgSection}`}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-purple-500 font-medium mb-4 block">// MY WORK</span>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${textPrimary}`}>Featured Projects</h2>
            <p className={`${textMuted} max-w-2xl mx-auto`}>A selection of projects I've worked on</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['all', 'frontend', 'fullstack', 'backend'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === filter
                    ? 'bg-purple-500 text-white'
                    : `${isDark ? 'bg-white/5 text-white/60 hover:bg-white/10' : 'bg-white text-gray-600 hover:bg-gray-100'}`
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.slice(0, 6).map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} dark={isDark} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <p className={`text-center ${textMuted} py-16`}>No projects found. Add projects from admin dashboard.</p>
          )}

          {projects.length > 6 && (
            <div className="text-center mt-12">
              <Link to="/projects" className="inline-flex items-center gap-2 text-purple-500 hover:text-purple-400">
                View All Projects <FaArrowRight />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className={`py-24 ${bgSection}`}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-purple-500 font-medium mb-4 block">// HOW I WORK</span>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${textPrimary}`}>My Working Process</h2>
            <p className={`${textMuted} max-w-2xl mx-auto`}>A structured approach to deliver exceptional results</p>
          </motion.div>

<div className="grid md:grid-cols-4 gap-6">
            {(settings.process && settings.process.length > 0) ? (
              settings.process.map((p, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className={`${bgCard} rounded-2xl p-6 h-full`}>
                    <p className="text-5xl font-bold text-purple-500/30 mb-4">{p.step}</p>
                    <h3 className="text-lg font-semibold mb-2 text-primary">{p.title}</h3>
                    <p className={`text-sm ${textSecondary}`}>{p.description}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              [
                { step: '01', title: 'Discovery', desc: 'Understanding your requirements and goals' },
                { step: '02', title: 'Design', desc: 'Creating visual designs and prototypes' },
                { step: '03', title: 'Development', desc: 'Building your project with clean code' },
                { step: '04', title: 'Delivery', desc: 'Testing and launching your project' }
              ].map((process, index) => (
                <motion.div
                  key={process.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className={`${bgCard} rounded-2xl p-6 h-full`}>
                    <p className="text-5xl font-bold text-purple-500/30 mb-4">{process.step}</p>
                    <h3 className="text-lg font-semibold mb-2 text-primary">{process.title}</h3>
                    <p className={`text-sm ${textSecondary}`}>{process.desc}</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-24 ${isDark ? 'bg-gradient-to-r from-purple-900 to-pink-900' : 'bg-gradient-to-r from-purple-600 to-pink-600'}`}>
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's Work Together</h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Have a project in mind? Let's discuss how I can help bring your vision to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/#contact" className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-full hover:bg-gray-100 transition-colors">
                Get In Touch
              </Link>
              {settings.social?.cvUrl && (
                <a href={settings.social.cvUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors flex items-center gap-2">
                  <FaDownload /> Download CV
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-24 ${bgSection}`}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <span className="text-purple-500 font-medium mb-4 block">// GET IN TOUCH</span>
            <h2 className={`text-4xl md:text-5xl font-bold mb-8 ${textPrimary}`}>Let's work together</h2>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className={`${textSecondary} text-lg mb-8`}>
                  I'm currently available for freelance projects and full-time opportunities. 
                  Let's discuss how I can help bring your ideas to life.
                </p>

                <div className="space-y-4">
                  {settings.social?.email && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                        <FaEnvelope className="w-5 h-5 text-purple-500" />
                      </div>
                      <div>
                        <p className={`text-sm ${textMuted}`}>Email</p>
                        <p className={textPrimary}>{settings.social.email}</p>
                      </div>
                    </div>
                  )}
                  {settings.social?.location && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                        <FaMapMarkerAlt className="w-5 h-5 text-purple-500" />
                      </div>
                      <div>
                        <p className={`text-sm ${textMuted}`}>Location</p>
                        <p className={textPrimary}>{settings.social.location}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    placeholder="Your Name"
                    required
                    className={`w-full px-4 py-3 rounded-xl focus:outline-none transition-colors ${
                      isDark 
                        ? 'bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-purple-500' 
                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500'
                    }`}
                  />
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    placeholder="Your Email"
                    required
                    className={`w-full px-4 py-3 rounded-xl focus:outline-none transition-colors ${
                      isDark 
                        ? 'bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-purple-500' 
                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500'
                    }`}
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleContactChange}
                  placeholder={settings.contact?.subject || 'Subject'}
                  required
                  className={`w-full px-4 py-3 rounded-xl focus:outline-none transition-colors ${
                    isDark 
                      ? 'bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-purple-500' 
                      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500'
                  }`}
                />
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  placeholder={settings.contact?.message || 'Your Message'}
                  rows={5}
                  required
                  className={`w-full px-4 py-3 rounded-xl focus:outline-none transition-colors resize-none ${
                    isDark 
                      ? 'bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-purple-500' 
                      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500'
                  }`}
                ></textarea>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {sending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
