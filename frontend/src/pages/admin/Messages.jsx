import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { FaEnvelope, FaTrash, FaCheck, FaSearch } from 'react-icons/fa'
import { messageService } from '../../services/api'

const Messages = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await messageService.getAll()
      setMessages(response.data)
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (id) => {
    try {
      await messageService.markAsRead(id)
      setMessages(messages.map(m => 
        m.id === id ? { ...m, read: true } : m
      ))
      toast.success('Message marked as read')
    } catch (error) {
      toast.error('Failed to update message')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return

    try {
      await messageService.delete(id)
      setMessages(messages.filter(m => m.id !== id))
      toast.success('Message deleted successfully')
    } catch (error) {
      toast.error('Failed to delete message')
    }
  }

  const filteredMessages = messages.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (filter === 'all') return matchesSearch
    if (filter === 'read') return matchesSearch && m.read
    if (filter === 'unread') return matchesSearch && !m.read
    
    return matchesSearch
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Messages</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage contact form submissions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'unread', 'read'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === f
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="space-y-4">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="flex justify-between">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mt-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mt-2"></div>
              </div>
            ))}
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="card text-center py-16">
            <FaEnvelope className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No messages found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`card ${!message.read ? 'border-l-4 border-l-primary-500' : ''}`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{message.name}</h3>
                      {!message.read && (
                        <span className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-primary-500 mb-2">{message.email}</p>
                    <p className="font-medium mb-2">{message.subject}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {message.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-3">
                      {formatDate(message.created_at)}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {!message.read && (
                      <button
                        onClick={() => handleMarkAsRead(message.id)}
                        className="p-2 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors"
                        title="Mark as read"
                      >
                        <FaCheck />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(message.id)}
                      className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                      title="Delete message"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Messages
