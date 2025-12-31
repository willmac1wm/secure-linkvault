import { useState, useEffect } from 'react'
import AppCard from './components/AppCard'
import AddAppModal from './components/AddAppModal'

// Check if running locally or in production
const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost'

// Default apps - different for local vs production
const LOCAL_APPS = [
  {
    id: '1',
    name: 'Open Stars',
    description: 'Air Traffic Control Radar Emulator Game',
    url: 'http://localhost:5174',
    projectPath: '/Users/williammacomber/Downloads/openstars-emulator',
    category: 'Games',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Air Traffic Expert',
    description: 'Next.js Air Traffic Control Expert Portal',
    url: 'http://localhost:3000',
    projectPath: '/Users/williammacomber/Downloads/airtrafficexpert-nextjs',
    category: 'Development',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Listing Pixl',
    description: 'Cape May Real Estate Photography',
    url: 'http://localhost:3001',
    projectPath: '/Users/williammacomber/Downloads/listingpixl',
    category: 'Business',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Essential Trade Contractors',
    description: 'ETC Website - Trade Contractor Services',
    url: 'http://localhost:3002',
    projectPath: '/Users/williammacomber/Downloads/etc-website-ready',
    category: 'Business',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'ATC Deploy',
    description: 'Air Traffic Control Deployment System',
    url: 'http://localhost:3003',
    projectPath: '/Users/williammacomber/Downloads/ATC_DEPLOY',
    category: 'Development',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '6',
    name: 'FDTS Brain',
    description: 'FDTS Adaptation Specialist - AI Data Extraction',
    url: 'http://localhost:5175',
    projectPath: '/Users/williammacomber/Downloads/brain',
    category: 'AI Tools',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Secure LinkVault',
    description: 'This App Launcher',
    url: 'http://localhost:5173',
    projectPath: '/Users/williammacomber/Downloads/secure-linkvault (2)',
    category: 'Tools',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  }
]

const PRODUCTION_APPS = [
  {
    id: '1',
    name: 'GitHub',
    description: 'Your GitHub repositories',
    url: 'https://github.com',
    icon: 'https://github.githubassets.com/favicons/favicon-dark.svg',
    category: 'Development',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Vercel',
    description: 'Deployment & Hosting Platform',
    url: 'https://vercel.com/dashboard',
    icon: 'https://assets.vercel.com/image/upload/front/favicon/vercel/favicon.ico',
    category: 'Development',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Netlify',
    description: 'Web Hosting & Automation',
    url: 'https://app.netlify.com',
    icon: 'https://www.netlify.com/favicon/icon.svg',
    category: 'Development',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Google AI Studio',
    description: 'Build with Gemini AI',
    url: 'https://aistudio.google.com',
    icon: 'https://www.gstatic.com/lamda/images/favicon_v1_150160cddff7f294ce30.svg',
    category: 'AI Tools',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'ChatGPT',
    description: 'OpenAI Chat Assistant',
    url: 'https://chat.openai.com',
    icon: 'https://chat.openai.com/favicon.ico',
    category: 'AI Tools',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Claude',
    description: 'Anthropic AI Assistant',
    url: 'https://claude.ai',
    icon: 'https://claude.ai/favicon.ico',
    category: 'AI Tools',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  }
]

// Combine local and production apps when running locally
const DEFAULT_APPS = isLocalhost 
  ? [...LOCAL_APPS, ...PRODUCTION_APPS.slice(0, 2)] 
  : PRODUCTION_APPS

function App() {
  const [apps, setApps] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingApp, setEditingApp] = useState(null)

  // Load apps from localStorage on mount, or use defaults
  useEffect(() => {
    const savedApps = localStorage.getItem('linkvault-apps')
    if (savedApps) {
      const parsed = JSON.parse(savedApps)
      // If saved apps exist and have items, use them
      if (parsed.length > 0) {
        setApps(parsed)
      } else {
        // Otherwise load defaults
        setApps(DEFAULT_APPS)
      }
    } else {
      // No saved apps, load defaults
      setApps(DEFAULT_APPS)
    }
  }, [])

  // Save apps to localStorage whenever apps change
  useEffect(() => {
    localStorage.setItem('linkvault-apps', JSON.stringify(apps))
  }, [apps])

  const handleAddApp = (appData) => {
    const newApp = {
      id: Date.now().toString(),
      ...appData,
      createdAt: new Date().toISOString()
    }
    setApps([...apps, newApp])
    setIsModalOpen(false)
  }

  const handleEditApp = (appData) => {
    setApps(apps.map(app => 
      app.id === editingApp.id ? { ...app, ...appData } : app
    ))
    setEditingApp(null)
    setIsModalOpen(false)
  }

  const handleDeleteApp = (id) => {
    if (confirm('Are you sure you want to delete this app?')) {
      setApps(apps.filter(app => app.id !== id))
    }
  }

  const handleEditClick = (app) => {
    setEditingApp(app)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingApp(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-white mb-2">
            Secure LinkVault
          </h1>
          <p className="text-purple-200 text-lg">
            Your centralized app launcher
          </p>
        </header>

        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New App
          </button>
        </div>

        {apps.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-6 bg-white/10 rounded-full mb-4">
              <svg className="w-16 h-16 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-purple-200 text-xl mb-2">No apps yet</p>
            <p className="text-purple-300">Click "Add New App" to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {apps.map(app => (
              <AppCard
                key={app.id}
                app={app}
                onEdit={() => handleEditClick(app)}
                onDelete={() => handleDeleteApp(app.id)}
              />
            ))}
          </div>
        )}

        {isModalOpen && (
          <AddAppModal
            app={editingApp}
            onSave={editingApp ? handleEditApp : handleAddApp}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  )
}

export default App

