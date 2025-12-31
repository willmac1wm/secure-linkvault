import { useState, useEffect } from 'react'
import AppCard from './components/AppCard'
import AddAppModal from './components/AddAppModal'
import HelpModal from './components/HelpModal'

// Check if running locally or in production
const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost'

// Default apps - different for local vs production
const LOCAL_APPS = [
  {
    id: '1',
    name: 'Open Stars',
    description: 'Air Traffic Control Radar Emulator Game',
    url: 'http://localhost:5174',
    projectPath: '/Users/williammacomber/Projects/openstars',
    category: 'Games',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Air Traffic Expert',
    description: 'Next.js Air Traffic Control Expert Portal',
    url: 'http://localhost:3000',
    projectPath: '/Users/williammacomber/Projects/airtrafficexpert',
    category: 'Development',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Listing Pixl',
    description: 'Cape May Real Estate Photography',
    url: 'http://localhost:3001',
    projectPath: '/Users/williammacomber/Projects/listingpixl',
    category: 'Business',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Essential Trade Contractors',
    description: 'ETC Website - Trade Contractor Services',
    url: 'http://localhost:3002',
    projectPath: '/Users/williammacomber/Projects/etc-website',
    category: 'Business',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'ATC Deploy',
    description: 'Air Traffic Control Deployment System',
    url: 'http://localhost:3003',
    projectPath: '/Users/williammacomber/Projects/atc-deploy',
    category: 'Development',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '6',
    name: 'FDTS Brain',
    description: 'FDTS Adaptation Specialist - AI Data Extraction',
    url: 'http://localhost:5175',
    projectPath: '/Users/williammacomber/Projects/fdts-brain',
    category: 'AI Tools',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Secure LinkVault',
    description: 'This App Launcher',
    url: 'http://localhost:5173',
    projectPath: '/Users/williammacomber/Projects/secure-linkvault',
    category: 'Tools',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  }
]

const PRODUCTION_APPS = [
  // === YOUR DEPLOYED APPS ===
  {
    id: '1',
    name: 'Open Stars',
    description: 'Air Traffic Control Radar Emulator Game',
    url: 'https://openstars-emulator.vercel.app',
    projectPath: '/Users/williammacomber/Projects/openstars',
    category: 'Games',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'ATC ETC',
    description: 'Essential Trade Contractors - Official Site',
    url: 'https://www.atc-etc.com',
    projectPath: '/Users/williammacomber/Projects/etc-website',
    category: 'Business',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Listing Pixl',
    description: 'Cape May Real Estate Photography',
    url: 'https://listingpixl.vercel.app',
    projectPath: '/Users/williammacomber/Projects/listingpixl',
    category: 'Business',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'ETC Website',
    description: 'Essential Trade Contractors Website',
    url: 'https://etc-website-ready.vercel.app',
    projectPath: '/Users/williammacomber/Projects/etc-website',
    category: 'Business',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'FDTS Brain',
    description: 'FDTS Adaptation Specialist - AI Data Extraction',
    url: 'https://brain-weld-five.vercel.app',
    projectPath: '/Users/williammacomber/Projects/fdts-brain',
    category: 'AI Tools',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '6',
    name: 'FDTS Assistant',
    description: 'FDTS Assistant Tool',
    url: 'https://fdts-assistant-zip.vercel.app',
    projectPath: '/Users/williammacomber/Projects/atc-deploy',
    category: 'Tools',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '13',
    name: 'DTIS Portal',
    description: 'Della Terra Insù - Daily Log & FDTS Tools',
    url: 'https://atc-etc.com',
    projectPath: '/Users/williammacomber/Projects/atc-etc-portal',
    category: 'Work',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  // === DEVELOPER TOOLS ===
  {
    id: '7',
    name: 'GitHub',
    description: 'Your GitHub repositories',
    url: 'https://github.com/willmac1wm',
    icon: 'https://github.githubassets.com/favicons/favicon-dark.svg',
    category: 'Development',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '8',
    name: 'Vercel',
    description: 'Deployment & Hosting Platform',
    url: 'https://vercel.com/dashboard',
    icon: 'https://assets.vercel.com/image/upload/front/favicon/vercel/favicon.ico',
    category: 'Development',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '9',
    name: 'Netlify',
    description: 'Web Hosting & Automation',
    url: 'https://app.netlify.com',
    icon: 'https://www.netlify.com/favicon/icon.svg',
    category: 'Development',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  // === AI TOOLS ===
  {
    id: '10',
    name: 'Google AI Studio',
    description: 'Build with Gemini AI',
    url: 'https://aistudio.google.com',
    icon: 'https://www.gstatic.com/lamda/images/favicon_v1_150160cddff7f294ce30.svg',
    category: 'AI Tools',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '11',
    name: 'ChatGPT',
    description: 'OpenAI Chat Assistant',
    url: 'https://chat.openai.com',
    icon: 'https://chat.openai.com/favicon.ico',
    category: 'AI Tools',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '12',
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
  const [isHelpOpen, setIsHelpOpen] = useState(false)
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

        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New App
          </button>
          <button
            onClick={() => setIsHelpOpen(true)}
            className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2 border border-purple-500/30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Developer Info
          </button>
          <button
            onClick={() => {
              if (confirm('Reset all apps to defaults? This will restore the original app list with Edit in Cursor buttons.')) {
                localStorage.removeItem('linkvault-apps')
                setApps(DEFAULT_APPS)
              }
            }}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset Apps
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

        {isHelpOpen && (
          <HelpModal onClose={() => setIsHelpOpen(false)} />
        )}
      </div>
    </div>
  )
}

export default App

