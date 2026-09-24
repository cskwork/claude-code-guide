# Claude Code Guide

A comprehensive guide for using Claude Code, built with Vue 3, Vite, and Tailwind CSS.

## Features

- Four-part guide (Part 1-4), each with four topics shown as keyboard "keys"
- Shareable topic links (`/part2#commit`) and working deep links on Vercel (`vercel.json` SPA rewrite)
- Learning progress saved in the browser: done marks per topic and "continue where you left off"
- Keyboard navigation (number keys 1-4, arrow keys) and copy buttons with a manual-copy fallback
- Design system documented in `DESIGN.md`; product context in `PRODUCT.md`; image provenance in `docs/asset-register.md`

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next-generation frontend build tool
- **Vue Router** - Official router for Vue.js
- **Tailwind CSS** - Utility-first CSS framework

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd claude-code-guide

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
# Build for production
npm run build
```

### Test

```bash
npm test
```

### Preview

```bash
# Preview production build
npm run preview
```

## Project Structure

```
claude-code-guide/
├── src/
│   ├── views/          # Page components
│   ├── components/     # Reusable components
│   ├── router/         # Vue Router configuration
│   ├── App.vue         # Root component
│   └── main.js         # Application entry point
├── public/             # Static assets
└── index.html          # HTML entry point
```

## License

Private project
