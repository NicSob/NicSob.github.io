# Mikołaj Sobczyk - Cybersecurity Portfolio

A hacker-themed portfolio website built with React, featuring a Matrix-inspired terminal aesthetic with green (#00FF00) text on black background.

## Features

- **Terminal Aesthetic**: Matrix-inspired design with monospace fonts
- **Typing Animations**: Dynamic text animations for headers
- **Glitch Effects**: Hover effects on interactive elements
- **Scanline Overlay**: Subtle CRT monitor simulation (toggleable)
- **Responsive Design**: Mobile-friendly layout
- **Project Blog**: Markdown-based project writeups with syntax highlighting
- **Smooth Scrolling**: Terminal-style navigation between sections

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router v7
- **Animations**: Framer Motion
- **Markdown**: react-markdown with react-syntax-highlighter
- **Styling**: CSS with CSS Variables

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git

# Navigate to project directory
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── About.jsx / About.css
│   │   ├── Contact.jsx / Contact.css
│   │   ├── Education.jsx / Education.css
│   │   ├── Experience.jsx / Experience.css
│   │   ├── Hero.jsx / Hero.css
│   │   ├── Navigation.jsx / Navigation.css
│   │   ├── Projects.jsx / Projects.css
│   │   ├── ProjectPost.jsx / ProjectPost.css
│   │   └── Scanlines.jsx / Scanlines.css
│   ├── hooks/
│   │   └── useTypingEffect.js
│   ├── projects/
│   │   ├── README.md
│   │   └── template.md
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Customization

### Updating Content

1. **Personal Info**: Edit the data in each component file
2. **Skills**: Modify `src/components/About.jsx`
3. **Education**: Update `src/components/Education.jsx`
4. **Experience**: Edit `src/components/Experience.jsx`
5. **Projects**: Modify `src/components/Projects.jsx` and `ProjectPost.jsx`
6. **Contact**: Update `src/components/Contact.jsx`

### Adding Project Posts

See `src/projects/README.md` for detailed instructions on adding new project writeups.

### Styling

- Global styles: `src/styles/global.css`
- CSS Variables for theming are defined in `:root`
- Component-specific styles in their respective CSS files

## Deployment

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build the project
npm run build

# Deploy dist folder to Netlify
```

### GitHub Pages

1. Update `vite.config.js` with your repo name:
   ```js
   base: '/your-repo-name/',
   ```
2. Build and deploy to gh-pages branch

## Color Scheme

| Variable | Value | Usage |
|----------|-------|-------|
| `--terminal-green` | #00FF00 | Primary accent |
| `--terminal-green-dim` | #00CC00 | Secondary accent |
| `--bg-primary` | #000000 | Main background |
| `--bg-secondary` | #0a0a0a | Card backgrounds |
| `--text-primary` | #00FF00 | Primary text |
| `--text-muted` | #008800 | Muted text |

## License

MIT License - feel free to use this template for your own portfolio.

## Contact

- **Email**: mikolaj.sobczyk03@outlook.com
- **LinkedIn**: [Add your LinkedIn]
- **GitHub**: [Add your GitHub]

---

Built with ❤️ and terminal aesthetics
