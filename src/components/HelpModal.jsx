function HelpModal({ onClose }) {
  const repos = [
    { name: 'Open Stars', github: 'https://github.com/willmac1wm/openstars-emulator', local: '/Users/williammacomber/Downloads/openstars-emulator' },
    { name: 'Listing Pixl', github: 'https://github.com/willmac1wm/listingpixl', local: '/Users/williammacomber/Downloads/listingpixl' },
    { name: 'ETC Website', github: 'https://github.com/willmac1wm/etc-website', local: '/Users/williammacomber/Downloads/etc-website-ready' },
    { name: 'FDTS Brain', github: 'https://github.com/willmac1wm/fdts-brain', local: '/Users/williammacomber/Downloads/brain' },
    { name: 'Secure LinkVault', github: 'https://github.com/willmac1wm/secure-linkvault', local: '/Users/williammacomber/Downloads/secure-linkvault (2)' },
    { name: 'Air Traffic Expert', github: 'https://github.com/willmac1wm/airtrafficexpert-site', local: '/Users/williammacomber/Downloads/airtrafficexpert-nextjs' },
    { name: 'ATC Deploy', github: 'https://github.com/willmac1wm/atc-rag', local: '/Users/williammacomber/Downloads/ATC_DEPLOY' },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl border border-white/20 my-8">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Developer Reference
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

          {/* Quick Start */}
          <div className="mb-6 p-4 bg-purple-500/20 rounded-lg border border-purple-500/30">
            <h3 className="text-lg font-semibold text-purple-300 mb-2">🚀 Quick Start - Edit Apps Locally</h3>
            <div className="text-purple-200 text-sm space-y-2">
              <p>1. Open Terminal and run:</p>
              <code className="block bg-black/30 p-2 rounded text-green-400 text-xs overflow-x-auto">
                cd ~/Downloads/secure-linkvault\ \(2\) && npm run dev
              </code>
              <p>2. Go to <span className="text-white font-mono">http://localhost:5173</span></p>
              <p>3. Hover over any app → Click the <span className="text-green-400 font-bold">green {"</>"} button</span> to open in Cursor</p>
            </div>
          </div>

          {/* GitHub Repos */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub Repositories
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {repos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors group"
                >
                  <span className="text-white font-medium">{repo.name}</span>
                  <span className="text-purple-400 text-sm group-hover:text-purple-300 flex items-center gap-1">
                    View Code
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Local Paths */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              Local File Paths
            </h3>
            <div className="space-y-1 text-xs max-h-32 overflow-y-auto bg-black/30 rounded-lg p-3">
              {repos.map((repo) => (
                <div key={repo.name} className="flex gap-2">
                  <span className="text-purple-400 w-32 shrink-0">{repo.name}:</span>
                  <code className="text-green-400 break-all">{repo.local}</code>
                </div>
              ))}
            </div>
          </div>

          {/* Commands Reference */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Common Commands
            </h3>
            <div className="space-y-2 text-sm">
              <div className="bg-black/30 p-2 rounded">
                <span className="text-gray-400"># Start any project:</span>
                <code className="block text-green-400">cd ~/Downloads/[project-folder] && npm run dev</code>
              </div>
              <div className="bg-black/30 p-2 rounded">
                <span className="text-gray-400"># Deploy to Vercel:</span>
                <code className="block text-green-400">vercel --prod</code>
              </div>
              <div className="bg-black/30 p-2 rounded">
                <span className="text-gray-400"># Push to GitHub:</span>
                <code className="block text-green-400">git add . && git commit -m "update" && git push</code>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-gray-400 text-sm">
            <p>All projects are in <code className="text-purple-400">~/Downloads/</code></p>
            <p className="mt-1">GitHub: <a href="https://github.com/willmac1wm" className="text-purple-400 hover:text-purple-300">github.com/willmac1wm</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpModal

