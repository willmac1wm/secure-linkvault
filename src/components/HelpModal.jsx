function HelpModal({ onClose }) {
  const repos = [
    { name: 'DTIS Portal', github: 'https://github.com/willmac1wm/atc-etc-portal', local: '/Users/williammacomber/Projects/atc-etc-portal' },
    { name: 'Open Stars', github: 'https://github.com/willmac1wm/openstars-emulator', local: '/Users/williammacomber/Projects/openstars' },
    { name: 'Listing Pixl', github: 'https://github.com/willmac1wm/listingpixl', local: '/Users/williammacomber/Projects/listingpixl' },
    { name: 'ETC Website', github: 'https://github.com/willmac1wm/etc-website', local: '/Users/williammacomber/Projects/etc-website' },
    { name: 'FDTS Brain', github: 'https://github.com/willmac1wm/fdts-brain', local: '/Users/williammacomber/Projects/fdts-brain' },
    { name: 'Secure LinkVault', github: 'https://github.com/willmac1wm/secure-linkvault', local: '/Users/williammacomber/Projects/secure-linkvault' },
    { name: 'Air Traffic Expert', github: 'https://github.com/willmac1wm/airtrafficexpert-site', local: '/Users/williammacomber/Projects/airtrafficexpert' },
    { name: 'ATC Deploy', github: 'https://github.com/willmac1wm/atc-rag', local: '/Users/williammacomber/Projects/atc-deploy' },
  ]

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl border border-white/20 my-8 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">📚 How To Edit Your Apps</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* STEP BY STEP - EDIT IN CURSOR */}
          <div className="mb-8 p-5 bg-green-500/20 rounded-xl border-2 border-green-500/50">
            <h3 className="text-xl font-bold text-green-300 mb-4">✏️ EDIT AN APP IN CURSOR</h3>
            <div className="space-y-4 text-white">
              
              <div className="flex gap-3 items-start">
                <span className="bg-green-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">1</span>
                <div>
                  <p className="font-semibold">Open <span className="text-green-300">Terminal</span> on your Mac</p>
                  <p className="text-gray-400 text-sm">Press <kbd className="bg-gray-700 px-2 py-1 rounded">⌘</kbd> + <kbd className="bg-gray-700 px-2 py-1 rounded">Space</kbd>, type "Terminal", press Enter</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className="bg-green-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">2</span>
                <div>
                  <p className="font-semibold">Copy and paste this command:</p>
                  <div className="flex items-center gap-2 mt-2">
                    <code className="bg-black/50 p-3 rounded text-green-400 text-sm flex-1 block">cd ~/Projects/secure-linkvault && npm run dev</code>
                    <button 
                      onClick={() => copyToClipboard('cd ~/Projects/secure-linkvault && npm run dev')}
                      className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded font-semibold text-sm"
                    >
                      COPY
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className="bg-green-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">3</span>
                <div>
                  <p className="font-semibold">Press <kbd className="bg-gray-700 px-2 py-1 rounded">Enter</kbd> and wait for it to start</p>
                  <p className="text-gray-400 text-sm">You'll see "ready in XXX ms" when it's done</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className="bg-green-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">4</span>
                <div>
                  <p className="font-semibold">Open this link in your browser:</p>
                  <a 
                    href="http://localhost:5173" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block mt-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded font-semibold"
                  >
                    👉 CLICK HERE: localhost:5173
                  </a>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className="bg-green-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">5</span>
                <div>
                  <p className="font-semibold">Hover over the app you want to edit</p>
                  <p className="text-gray-400 text-sm">Move your mouse over the app card</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className="bg-green-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">6</span>
                <div>
                  <p className="font-semibold">Click the <span className="text-green-400 font-bold text-lg">GREEN {"</>"}</span> button</p>
                  <p className="text-gray-400 text-sm">It's in the top-right corner of the card</p>
                  <p className="text-green-300 mt-1">→ Cursor will open with that project! 🎉</p>
                </div>
              </div>

            </div>
          </div>

          {/* QUICK OPEN IN CURSOR - Direct Links */}
          <div className="mb-6 p-4 bg-blue-500/20 rounded-xl border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-300 mb-3">⚡ QUICK: Open Any App in Cursor Right Now</h3>
            <p className="text-gray-300 text-sm mb-3">Click any button to open that project in Cursor:</p>
            <div className="grid grid-cols-2 gap-2">
              {repos.map((repo) => (
                <a
                  key={repo.name}
                  href={`cursor://file${repo.local}`}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded text-sm font-medium text-center transition-colors"
                >
                  {repo.name}
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-xs mt-3">⚠️ These only work on your Mac (not on other computers)</p>
          </div>

          {/* GitHub Repos */}
          <div className="mb-6 p-4 bg-slate-700/50 rounded-xl">
            <h3 className="text-lg font-bold text-white mb-3">🔗 GitHub Links (View Code Online)</h3>
            <div className="space-y-2">
              {repos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 bg-slate-600/50 hover:bg-slate-600 rounded-lg transition-colors"
                >
                  <span className="text-white">{repo.name}</span>
                  <span className="text-purple-400 text-sm">View on GitHub →</span>
                </a>
              ))}
            </div>
          </div>

          {/* After Editing - How to Save */}
          <div className="mb-6 p-4 bg-orange-500/20 rounded-xl border border-orange-500/30">
            <h3 className="text-lg font-bold text-orange-300 mb-3">💾 AFTER EDITING: Save & Deploy</h3>
            <div className="space-y-3 text-white text-sm">
              <div className="flex gap-2 items-start">
                <span className="text-orange-400 font-bold">1.</span>
                <p>Save your changes in Cursor (<kbd className="bg-gray-700 px-2 py-0.5 rounded text-xs">⌘</kbd>+<kbd className="bg-gray-700 px-2 py-0.5 rounded text-xs">S</kbd>)</p>
              </div>
              <div className="flex gap-2 items-start">
                <span className="text-orange-400 font-bold">2.</span>
                <div>
                  <p>Open Terminal in Cursor (<kbd className="bg-gray-700 px-2 py-0.5 rounded text-xs">⌘</kbd>+<kbd className="bg-gray-700 px-2 py-0.5 rounded text-xs">`</kbd>)</p>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <span className="text-orange-400 font-bold">3.</span>
                <div>
                  <p>Type this to save to GitHub:</p>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="bg-black/50 p-2 rounded text-green-400 text-xs">git add . && git commit -m "update" && git push</code>
                    <button 
                      onClick={() => copyToClipboard('git add . && git commit -m "update" && git push')}
                      className="bg-orange-600 hover:bg-orange-500 text-white px-2 py-1 rounded text-xs"
                    >
                      COPY
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <span className="text-orange-400 font-bold">4.</span>
                <div>
                  <p>Type this to put it live on Vercel:</p>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="bg-black/50 p-2 rounded text-green-400 text-xs">vercel --prod --yes</code>
                    <button 
                      onClick={() => copyToClipboard('vercel --prod --yes')}
                      className="bg-orange-600 hover:bg-orange-500 text-white px-2 py-1 rounded text-xs"
                    >
                      COPY
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-gray-400 text-sm border-t border-gray-700 pt-4">
            <p>All your projects are in: <code className="text-purple-400">~/Projects/</code></p>
            <p className="mt-1">Your GitHub: <a href="https://github.com/willmac1wm" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">github.com/willmac1wm</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpModal
