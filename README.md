# Secure LinkVault

A beautiful, modern app launcher and dashboard to organize and manage all your applications in one place.

## Features

- 🎨 Modern, beautiful UI with gradient backgrounds
- 📱 Responsive design that works on all devices
- 💾 Local storage persistence - your apps are saved automatically
- ➕ Add, edit, and delete apps easily
- 🎯 Organize apps by categories
- 🔗 Launch apps with custom URLs
- 🖼️ Custom icons for each app
- 🚀 Fast and lightweight

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

This will start the development server, typically at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Install as Desktop App (PWA)

This app can be installed on your Mac as a standalone application:

### Option 1: Chrome/Edge
1. Run the app with `npm run dev` or `npm run preview`
2. Open Chrome or Edge and go to `http://localhost:5173`
3. Click the install icon in the address bar (or the three-dot menu → "Install Secure LinkVault")
4. The app will appear in your Applications folder

### Option 2: Safari
1. Open Safari and go to `http://localhost:5173`
2. Click File → "Add to Dock"
3. The app will be added to your Dock

## Usage

1. Click "Add New App" to add a new application
2. Fill in the app details (name is required, others are optional)
3. Click "Launch App" on any app card to open it
4. Hover over app cards to see edit and delete options
5. All your apps are automatically saved to local storage

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Local Storage API

## License

MIT

