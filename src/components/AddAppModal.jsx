import { useState, useEffect } from 'react'

function AddAppModal({ app, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    icon: '',
    category: '',
    projectPath: '',
    openInNewTab: true
  })

  useEffect(() => {
    if (app) {
      setFormData({
        name: app.name || '',
        description: app.description || '',
        url: app.url || '',
        icon: app.icon || '',
        category: app.category || '',
        projectPath: app.projectPath || '',
        openInNewTab: app.openInNewTab !== undefined ? app.openInNewTab : true
      })
    } else {
      // Reset form to initial state when app is null (e.g., when closing modal or adding new app)
      setFormData({
        name: '',
        description: '',
        url: '',
        icon: '',
        category: '',
        projectPath: '',
        openInNewTab: true
      })
    }
  }, [app])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      alert('Please enter an app name')
      return
    }
    onSave(formData)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-md border border-white/20">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {app ? 'Edit App' : 'Add New App'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-purple-200 text-sm font-medium mb-2">
                App Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-purple-500 focus:outline-none"
                placeholder="My Awesome App"
                required
              />
            </div>

            <div>
              <label className="block text-purple-200 text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-purple-500 focus:outline-none resize-none"
                rows="3"
                placeholder="A brief description of the app..."
              />
            </div>

            <div>
              <label className="block text-purple-200 text-sm font-medium mb-2">
                URL
              </label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-purple-500 focus:outline-none"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="block text-purple-200 text-sm font-medium mb-2">
                Icon URL (optional)
              </label>
              <input
                type="url"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-purple-500 focus:outline-none"
                placeholder="https://example.com/icon.png"
              />
            </div>

            <div>
              <label className="block text-purple-200 text-sm font-medium mb-2">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-purple-500 focus:outline-none"
                placeholder="Productivity, Development, etc."
              />
            </div>

            <div>
              <label className="block text-purple-200 text-sm font-medium mb-2">
                Project Path (for Edit in IDE)
              </label>
              <input
                type="text"
                name="projectPath"
                value={formData.projectPath}
                onChange={handleChange}
                className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-purple-500 focus:outline-none"
                placeholder="/Users/you/Projects/my-app"
              />
              <p className="text-purple-300 text-xs mt-1">
                Full path to project folder to open in Cursor
              </p>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="openInNewTab"
                id="openInNewTab"
                checked={formData.openInNewTab}
                onChange={handleChange}
                className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
              />
              <label htmlFor="openInNewTab" className="ml-2 text-purple-200 text-sm">
                Open in new tab
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                {app ? 'Save Changes' : 'Add App'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddAppModal

