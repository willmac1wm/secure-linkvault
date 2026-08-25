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
    projectPath: '/Users/williammacomber/Desktop/Desktop_Cleanup_2026-06-24/awesome projects/openstars',
    category: 'Games',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Air Traffic Expert',
    description: 'Next.js Air Traffic Control Expert Portal',
    url: 'http://localhost:3000',
    projectPath: '/Users/williammacomber/Desktop/Desktop_Cleanup_2026-06-24/awesome projects/airtrafficexpert-site',
    category: 'Development',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Listing Pixl',
    description: 'Cape May Real Estate Photography',
    url: 'http://localhost:3001',
    projectPath: '/Users/williammacomber/Desktop/_Dev_Projects/listing-pixl',
    category: 'Business',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Essential Trade Contractors',
    description: 'ETC Website - Trade Contractor Services',
    url: 'http://localhost:3002',
    projectPath: '/Users/williammacomber/Desktop/Desktop_Cleanup_2026-06-24/awesome projects/etc-website',
    category: 'Business',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'ATC Deploy',
    description: 'Air Traffic Control Deployment System',
    url: 'http://localhost:3003',
    projectPath: '/Users/williammacomber/Desktop/Desktop_Cleanup_2026-06-24/awesome projects/atc-deploy',
    category: 'Development',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '6',
    name: 'FDTS Brain',
    description: 'FDTS Adaptation Specialist - AI Data Extraction',
    url: 'http://localhost:5175',
    projectPath: '/Users/williammacomber/Desktop/Desktop_Cleanup_2026-06-24/awesome projects/fdts-brain',
    category: 'AI Tools',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Secure LinkVault',
    description: 'This App Launcher',
    url: 'http://localhost:5173',
    projectPath: '/Users/williammacomber/Desktop/Desktop_Cleanup_2026-06-24/awesome projects/secure-linkvault',
    category: 'Tools',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '8',
    name: 'Zulu Pro',
    description: 'Aviation Time & Mission Intel',
    url: 'http://localhost:5173/zulu-pro',
    projectPath: '/Users/williammacomber/Desktop/Desktop_Cleanup_2026-06-24/awesome projects/Zulu-time-',
    category: 'Tools',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '9',
    name: 'National FDTS Assistant',
    description: 'National dashboard and adaptation tool for FDTS',
    url: 'http://localhost:5173',
    projectPath: '/Users/williammacomber/Desktop/Desktop_Cleanup_2026-06-24/awesome projects/worldview',
    category: 'Development',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '11',
    name: 'FDTS Repo (GitHub)',
    description: 'Source Code for the National FDTS Assistant',
    url: 'https://github.com/willmac1wm/FDTS-Adaptation-Tool',
    icon: 'https://github.githubassets.com/favicons/favicon-dark.svg',
    category: 'Development',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '12',
    name: 'WorldView',
    description: 'Geospatial Intelligence Command Center — Live satellites, flights, vessels & TFRs',
    url: 'http://localhost:8080/worldview.html',
    projectPath: '/Users/williammacomber/Desktop/Desktop_Cleanup_2026-06-24/awesome projects/worldview',
    category: 'Tools',
    openInNewTab: true,
    createdAt: new Date().toISOString()
  }
]

const PRODUCTION_APPS = [
  // === CORE BUSINESS ===
  {
    id: 'contractoros',
    name: 'ContractorOS',
    description: 'Contractor management - passwordless, emails you a sign-in link',
    url: 'https://web-five-nu-89.vercel.app',
    projectPath: '/Users/williammacomber/Desktop/ContractorOS',
    category: 'Business',
    openInNewTab: true
  },
  {
    id: 'atc-etc',
    name: 'ATC ETC (Portal)',
    description: 'Custom domain - currently serves the DTIS Secure Portal',
    url: 'https://www.atc-etc.com',
    projectPath: '/Users/williammacomber/Desktop/Desktop_Cleanup_2026-06-24/awesome projects/etc-website',
    category: 'Business',
    openInNewTab: true
  },
  {
    id: 'etc-website',
    name: 'ETC Website',
    description: 'Essential Trade Contractors Website',
    url: 'https://etc-website-ready.vercel.app',
    projectPath: '/Users/williammacomber/Desktop/Desktop_Cleanup_2026-06-24/awesome projects/etc-website',
    category: 'Business',
    openInNewTab: true
  },
  {
    id: 'essential-trade-contractors',
    name: 'ETC (Canonical)',
    description: 'Essential Trade Contractors - canonical deploy',
    url: 'https://essential-trade-contractors.vercel.app',
    projectPath: '/Users/williammacomber/Desktop/Desktop_Cleanup_2026-06-24/awesome projects/essential-trade-contractors',
    category: 'Business',
    openInNewTab: true
  },
  {
    id: 'dtis-portal',
    name: 'DTIS Portal',
    description: 'Della Terra Insu - Daily Log & FDTS Tools',
    url: 'https://atc-etc-portal.vercel.app',
    projectPath: '/Users/williammacomber/Desktop/Desktop_Cleanup_2026-06-24/awesome projects/atc-etc-portal',
    category: 'Work',
    openInNewTab: true
  },

  // === LISTING PIXL ===
  {
    id: 'listingpixl',
    name: 'Listing Pixl',
    description: 'Cape May Real Estate Photography',
    url: 'https://listingpixl.vercel.app',
    projectPath: '/Users/williammacomber/Desktop/_Dev_Projects/listing-pixl',
    category: 'Business',
    openInNewTab: true
  },
  {
    id: 'listingpixl-2026',
    name: 'Listing Pixl 2026',
    description: 'Listing Pixl - 2026 rebuild',
    url: 'https://listingpixl-2026.vercel.app',
    projectPath: '/Users/williammacomber/Desktop/Desktop_Cleanup_2026-06-24/awesome projects/listingpixl',
    category: 'Business',
    openInNewTab: true
  },
  {
    id: 'listingpixl-photo-admin',
    name: 'Photo Admin (Static)',
    description: 'Listing Pixl photo admin - static build',
    url: 'https://listingpixl-photo-admin-static.vercel.app',
    category: 'Business',
    openInNewTab: true
  },

  // === AVIATION ===
  {
    id: 'openstars',
    name: 'Open Stars',
    description: 'Air Traffic Control Radar Emulator Game',
    url: 'https://openstars-emulator.vercel.app',
    projectPath: '/Users/williammacomber/Desktop/Desktop_Cleanup_2026-06-24/awesome projects/openstars',
    category: 'Games',
    openInNewTab: true
  },
  {
    id: 'macomber-openstars',
    name: 'Open Stars (Macomber)',
    description: 'Open Stars - alternate deploy',
    url: 'https://macomber-openstars.vercel.app',
    projectPath: '/Users/williammacomber/Desktop/Desktop_Cleanup_2026-06-24/awesome projects/OpenStars-Emulator',
    category: 'Games',
    openInNewTab: true
  },
  {
    id: 'airtrafficexpert',
    name: 'Air Traffic Expert',
    description: 'ATC expert portal & training resource',
    url: 'https://airtrafficexpert-site.vercel.app',
    projectPath: '/Users/williammacomber/Desktop/Desktop_Cleanup_2026-06-24/awesome projects/airtrafficexpert-site',
    category: 'Business',
    openInNewTab: true
  },
  {
    id: 'zulu-pro',
    name: 'Zulu Pro',
    description: 'Tactical Aviation Timekeeping & Mission Intel',
    url: 'https://zulu-time-web-deploy.vercel.app',
    projectPath: '/Users/williammacomber/Desktop/Desktop_Cleanup_2026-06-24/awesome projects/Zulu-time-',
    category: 'Tools',
    openInNewTab: true
  },

  // === FDTS ===
  {
    id: 'fdts-brain',
    name: 'FDTS Brain',
    description: 'FDTS Adaptation Specialist - AI Data Extraction',
    url: 'https://brain-weld-five.vercel.app',
    projectPath: '/Users/williammacomber/Desktop/Desktop_Cleanup_2026-06-24/awesome projects/fdts-brain',
    category: 'AI Tools',
    openInNewTab: true
  },
  {
    id: 'fdts-assistant',
    name: 'FDTS Assistant',
    description: 'FDTS Assistant Tool',
    url: 'https://fdts-assistant-zip.vercel.app',
    projectPath: '/Users/williammacomber/Desktop/Desktop_Cleanup_2026-06-24/awesome projects/atc-deploy',
    category: 'Tools',
    openInNewTab: true
  },
  {
    id: 'fdts-repo',
    name: 'FDTS Repo (GitHub)',
    description: 'Source for the National FDTS Assistant',
    url: 'https://github.com/willmac1wm/FDTS-Adaptation-Tool',
    icon: 'https://github.githubassets.com/favicons/favicon-dark.svg',
    projectPath: '/Users/williammacomber/Desktop/Desktop_Cleanup_2026-06-24/awesome projects/worldview',
    category: 'Development',
    openInNewTab: true
  },

  // === NEWER PROJECTS ===
  {
    id: 'eve-slack-agent',
    name: 'Eve (Slack Agent)',
    description: 'Slack AI agent',
    url: 'https://eve-slack-agent.vercel.app',
    category: 'AI Tools',
    openInNewTab: true
  },
  {
    id: 'contractoros-prototype',
    name: 'ContractorOS Prototype',
    description: 'ContractorOS experimental build',
    url: 'https://contractoros-prototype.vercel.app',
    projectPath: '/Users/williammacomber/Desktop/ContractorOS',
    category: 'Development',
    openInNewTab: true
  },
  {
    id: 'pool-wallet',
    name: 'Pool Wallet',
    description: 'Shared wallet application',
    url: 'https://pool-wallet.vercel.app',
    category: 'Tools',
    openInNewTab: true
  },
  {
    id: 'gods-eye-view',
    name: "God's Eye View",
    description: 'OSINT globe - live flights, satellites, vessels. Runs on Legion 24/7',
    url: 'http://192.168.12.243:4173',
    projectPath: 'Legion: C:/Users/willm/gods-eye-view',
    category: 'Development',
    openInNewTab: true
  },
  {
    id: 'gods-eye-view-repo',
    name: "God's Eye View (repo)",
    description: 'Upstream source - MIT, Bilawal Sidhu',
    url: 'https://github.com/bilawalsidhu/gods-eye-view',
    icon: 'https://github.githubassets.com/favicons/favicon-dark.svg',
    projectPath: '/Users/williammacomber/Desktop/Desktop_Cleanup_2026-06-24/awesome projects/gods-eye-view',
    category: 'Development',
    openInNewTab: true
  },
  {
    id: 'worldview',
    name: 'WorldView (mine)',
    description: 'My earlier geospatial build - deck.gl, demo data, superseded by GEV',
    url: 'https://github.com/willmac1wm/secure-linkvault',
    projectPath: '/Users/williammacomber/Desktop/Desktop_Cleanup_2026-06-24/awesome projects/worldview',
    category: 'Development',
    openInNewTab: true
  },

  {
    id: 'linkvault',
    name: 'Secure LinkVault',
    description: 'This app launcher (self-link)',
    url: 'https://secure-linkvault.vercel.app',
    projectPath: '/Users/williammacomber/Desktop/Desktop_Cleanup_2026-06-24/awesome projects/secure-linkvault',
    category: 'Tools',
    openInNewTab: true
  },
  {
    id: 'resolve-ai',
    name: 'ResolveAI',
    description: 'Rewrite Your Relationship - couples app',
    url: 'https://resolve-ai-one.vercel.app',
    projectPath: '/Users/williammacomber/Desktop/Desktop_Cleanup_2026-06-24/awesome projects/ResolveAI-App',
    category: 'Tools',
    openInNewTab: true
  },
  // === INFRASTRUCTURE ===
  {
    id: 'github',
    name: 'GitHub',
    description: 'Your GitHub repositories',
    url: 'https://github.com/willmac1wm',
    icon: 'https://github.githubassets.com/favicons/favicon-dark.svg',
    category: 'Development',
    openInNewTab: true
  },
  {
    id: 'vercel',
    name: 'Vercel',
    description: 'Deployment & Hosting Platform',
    url: 'https://vercel.com/dashboard',
    icon: 'https://assets.vercel.com/image/upload/front/favicon/vercel/favicon.ico',
    category: 'Development',
    openInNewTab: true
  },
  {
    id: 'supabase',
    name: 'Supabase',
    description: 'Database & backend dashboard',
    url: 'https://supabase.com/dashboard',
    category: 'Development',
    openInNewTab: true
  },
  {
    id: 'netlify',
    name: 'Netlify',
    description: 'Web Hosting & Automation',
    url: 'https://app.netlify.com',
    icon: 'https://www.netlify.com/favicon/icon.svg',
    category: 'Development',
    openInNewTab: true
  },

  // === AI TOOLS ===
  {
    id: 'claude',
    name: 'Claude',
    description: 'Anthropic AI Assistant',
    url: 'https://claude.ai',
    icon: 'https://claude.ai/favicon.ico',
    category: 'AI Tools',
    openInNewTab: true
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'OpenAI Chat Assistant',
    url: 'https://chat.openai.com',
    icon: 'https://chat.openai.com/favicon.ico',
    category: 'AI Tools',
    openInNewTab: true
  },
  {
    id: 'google-ai-studio',
    name: 'Google AI Studio',
    description: 'Build with Gemini AI',
    url: 'https://aistudio.google.com',
    icon: 'https://www.gstatic.com/lamda/images/favicon_v1_150160cddff7f294ce30.svg',
    category: 'AI Tools',
    openInNewTab: true
  }
]

// Combine local and production apps when running locally
const DEFAULT_APPS = isLocalhost
  ? [...LOCAL_APPS, ...PRODUCTION_APPS.slice(0, 2)]
  : PRODUCTION_APPS

const STORAGE_KEY = 'linkvault-apps'
const REMOVED_KEY = 'linkvault-removed-defaults'

function App() {
  const [apps, setApps] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const [editingApp, setEditingApp] = useState(null)

  // Load apps: merge baked-in defaults with anything saved locally.
  // Defaults live in the deployed bundle, so a browser storage purge
  // (Safari clears script-writable storage after 7 idle days) can never
  // lose the curated list -- it always comes back from the code.
  useEffect(() => {
    let saved = []
    let removed = []
    try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { saved = [] }
    try { removed = JSON.parse(localStorage.getItem(REMOVED_KEY) || '[]') } catch { removed = [] }
    if (!Array.isArray(saved)) saved = []
    if (!Array.isArray(removed)) removed = []

    const savedById = new Map(saved.map((a) => [a.id, a]))
    const defaultIds = new Set(DEFAULT_APPS.map((d) => d.id))

    // Defaults first (honoring user edits + deletions), then user-added apps
    const merged = DEFAULT_APPS
      .filter((d) => !removed.includes(d.id))
      .map((d) => (savedById.has(d.id) ? { ...d, ...savedById.get(d.id) } : d))

    for (const a of saved) {
      if (!defaultIds.has(a.id)) merged.push(a)
    }

    setApps(merged)
    setLoaded(true)
  }, [])

  // Save apps to localStorage whenever apps change (after initial load)
  useEffect(() => {
    if (!loaded) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps))
  }, [apps, loaded])

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
      // If this is a baked-in default, remember the deletion so the merge
      // on next load doesn't resurrect it.
      if (DEFAULT_APPS.some((d) => d.id === id)) {
        let removed = []
        try { removed = JSON.parse(localStorage.getItem(REMOVED_KEY) || '[]') } catch { removed = [] }
        if (!Array.isArray(removed)) removed = []
        if (!removed.includes(id)) {
          localStorage.setItem(REMOVED_KEY, JSON.stringify([...removed, id]))
        }
      }
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
                localStorage.removeItem(STORAGE_KEY)
                localStorage.removeItem(REMOVED_KEY)
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
