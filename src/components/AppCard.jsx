import { useState } from 'react'

const SERVER_URL = 'http://localhost:3333'

function AppCard({ app, onEdit, onDelete }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isStarting, setIsStarting] = useState(false)
  const [status, setStatus] = useState(null)

  // Extract port from URL
  const getPortFromUrl = (url) => {
    try {
      const urlObj = new URL(url)
      return parseInt(urlObj.port) || 80
    } catch {
      return null
    }
  }

  // Check if app is a local app (localhost URL)
  const isLocalApp = app.url && app.url.includes('localhost')

  const handleLaunch = async () => {
    if (!app.url) return

    // For external URLs, just open directly
    if (!isLocalApp) {
      window.open(app.url, app.openInNewTab ? '_blank' : '_self')
      return
    }

    // For local apps with a project path, try to start the server first
    if (app.projectPath) {
      setIsStarting(true)
      setStatus('Checking...')

      try {
        const port = getPortFromUrl(app.url)
        
        // First check if already running
        const statusRes = await fetch(`${SERVER_URL}/api/status`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ port })
        })
        
        const statusData = await statusRes.json()
        
        if (statusData.running) {
          setStatus('Running!')
          setTimeout(() => {
            window.open(app.url, app.openInNewTab ? '_blank' : '_self')
            setIsStarting(false)
            setStatus(null)
          }, 500)
          return
        }

        // Not running, start it
        setStatus('Starting server...')
        const startRes = await fetch(`${SERVER_URL}/api/start`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            projectPath: app.projectPath, 
            port,
            name: app.name 
          })
        })

        const startData = await startRes.json()
        
        if (startData.status === 'started' || startData.status === 'already_running') {
          setStatus('Ready!')
          setTimeout(() => {
            window.open(app.url, app.openInNewTab ? '_blank' : '_self')
            setIsStarting(false)
            setStatus(null)
          }, 1000)
        } else if (startData.status === 'starting') {
          setStatus('Starting... (may take a moment)')
          setTimeout(() => {
            window.open(app.url, app.openInNewTab ? '_blank' : '_self')
            setIsStarting(false)
            setStatus(null)
          }, 3000)
        } else {
          setStatus('Error starting')
          setTimeout(() => {
            setIsStarting(false)
            setStatus(null)
          }, 2000)
        }
      } catch (error) {
        // Server not running, just try to open the app directly
        setStatus('Opening...')
        setTimeout(() => {
          window.open(app.url, app.openInNewTab ? '_blank' : '_self')
          setIsStarting(false)
          setStatus(null)
        }, 500)
      }
    } else {
      // No project path, just open directly
      window.open(app.url, app.openInNewTab ? '_blank' : '_self')
    }
  }

  const handleEditInIDE = () => {
    if (app.projectPath) {
      // Open in Cursor IDE (cursor:// protocol)
      window.open(`cursor://file${app.projectPath}`, '_self')
    }
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105 border border-white/20 relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Actions overlay */}
      <div className={`absolute top-3 right-3 flex gap-2 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        {app.projectPath && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleEditInIDE()
            }}
            className="p-2 bg-green-500/80 hover:bg-green-500 rounded-lg text-white transition-colors"
            title="Edit in Cursor"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onEdit()
          }}
          className="p-2 bg-blue-500/80 hover:bg-blue-500 rounded-lg text-white transition-colors"
          title="Edit App Info"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className="p-2 bg-red-500/80 hover:bg-red-500 rounded-lg text-white transition-colors"
          title="Delete"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* App Icon/Initials */}
      <div className="mb-4 flex justify-center">
        {app.icon ? (
          <img
            src={app.icon}
            alt={app.name}
            className="w-16 h-16 rounded-xl object-cover"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
        ) : null}
        <div
          className={`w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold ${app.icon ? 'hidden' : ''}`}
        >
          {getInitials(app.name)}
        </div>
      </div>

      {/* App Name */}
      <h3 className="text-xl font-bold text-white mb-2 text-center">
        {app.name}
      </h3>

      {/* App Description */}
      {app.description && (
        <p className="text-purple-200 text-sm mb-4 text-center line-clamp-2">
          {app.description}
        </p>
      )}

      {/* Launch Button */}
      {app.url && (
        <button
          onClick={handleLaunch}
          disabled={isStarting}
          className={`w-full text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${
            isStarting 
              ? 'bg-yellow-600 cursor-wait' 
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          {isStarting ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {status || 'Starting...'}
            </>
          ) : (
            <>
              {isLocalApp && app.projectPath && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {isLocalApp && app.projectPath ? 'Start & Launch' : 'Launch App'}
            </>
          )}
        </button>
      )}

      {/* Category Badge */}
      {app.category && (
        <div className="mt-3 text-center">
          <span className="inline-block bg-purple-500/30 text-purple-200 text-xs px-2 py-1 rounded-full">
            {app.category}
          </span>
        </div>
      )}
    </div>
  )
}

export default AppCard

