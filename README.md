# HK Enterprises - Pallets & Packaging Solutions

A modern, high-performance e-commerce platform for quality pallets and packaging solutions built with **React**, **Vite**, and **Server-Side Rendering (SSR)**.

## 🚀 Features

- **Server-Side Rendering (SSR)** - Better SEO and faster initial page loads
- **Code Splitting** - Optimized lazy loading for improved performance
- **Dark Mode Support** - Full dark/light theme switching
- **Responsive Design** - Mobile-first approach using Tailwind CSS
- **Product Management** - Browse, filter, and inquire about products
- **Contact Forms** - Customer inquiry and quick message popups
- **Optimized Images** - WebP format with lazy loading
- **Production Ready** - Minified and optimized builds

## 📊 Performance Metrics

**Current Lighthouse Scores:**
- Performance: 100
- Accessibility: 95
- Best Practices: 96
- SEO: 100
<img width="1434" height="178" alt="image" src="https://github.com/user-attachments/assets/70df1550-b1cd-4d1a-8fdb-2ee8c6ee0cc4" />

Visit the live site: [https://pallets-lovat.vercel.app/](https://pallets-lovat.vercel.app/)


## 📋 Project Structure

```
Pallets/
├── Front-end/                    # React + Vite frontend
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   ├── pages/               # Page components (Home, Product, Contact)
│   │   ├── context/             # React context (Theme, Shop)
│   │   ├── hooks/               # Custom hooks
│   │   ├── assets/              # Images and static assets
│   │   ├── App.jsx              # Main app component
│   │   ├── entry-client.jsx     # Client entry point
│   │   └── entry-server.jsx     # Server entry point (SSR)
│   ├── server.js                # Express SSR server
│   ├── vite.config.js           # Vite configuration
│   ├── vercel.json              # Vercel deployment config
│   └── package.json
├── BackEnd/                      # Backend API (Node.js)
│   ├── app.js
│   ├── DB/
│   └── package.json
└── vercel.json                   # Root Vercel config
```

## ⚙️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite 5** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **React Icons** - Icon library
- **SweetAlert2** - Beautiful alert dialogs
- **Axios** - HTTP client
- **GSAP** - Animation library

### Server
- **Node.js** - Runtime
- **Express 5** - Web framework
- **SSR** - Server-side rendering for better SEO

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Frontend Setup

```bash
cd Front-end
npm install
```

### Development

```bash
# Start SSR development server (port 5173)
npm run dev

# The server will:
# - Hot reload on file changes
# - Render React components on the server
# - Serve pre-rendered HTML for better SEO
```

### Production Build

```bash
# Build both client and server bundles
npm run build

# Output:
# - dist/client/  - Client-side assets
# - dist/server/  - Server bundle

# Run production server
npm run preview
```

## 🔍 SSR Configuration

The project uses **Vite 5** with proper SSR setup:

### Key Files:
- **`server.js`** - Express server that handles SSR
- **`entry-server.jsx`** - Server entry point (renders app to HTML)
- **`entry-client.jsx`** - Client entry point (hydrates app)
- **`vite.config.js`** - Vite SSR configuration

### How SSR Works:
1. Request comes to Express server
2. Server renders React components to HTML string
3. HTML is sent to client with full content (better SEO)
4. Client hydrates the HTML and takes over

## ⚡ Performance Optimizations

### Code Splitting
- Pages are lazy-loaded with `React.lazy()`
- Components are split into separate chunks
- React and Router are bundled separately

### Image Optimization
- All images use `loading="lazy"` attribute
- WebP format for smaller file sizes
- Responsive image serving

### Build Optimization
- esbuild minification (fast)
- Tree-shaking (removes unused code)
- CSS minification

## 🌐 SEO Improvements

All necessary SEO meta tags are included:
- Meta description
- Keywords
- Open Graph tags
- Twitter Card tags
- Canonical URL
- Structured data ready

## 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS breakpoints
- Touch-friendly UI
- Adaptive layouts

## 🎨 Theme System

Dark mode is fully supported:
- LocalStorage persistence
- CSS classes for styling
- Smooth transitions
- Global context management

```jsx
// Usage
const { isDarkMode, toggleTheme } = useTheme();
```

## 🚀 Deployment

### Vercel Deployment

The project is configured for **Vercel** deployment:

1. Push to GitHub
2. Connect repository to Vercel
3. Vercel automatically:
   - Runs `npm run build`
   - Deploys `dist/client/` directory
   - Handles routing with rewrites

### Environment Variables

Create `.env` for backend URLs if needed:

```env
VITE_API_URL=https://your-api.com
```



## 🐛 Troubleshooting

### SSR Errors
If you get `module is not defined` errors:
- Ensure `vite.config.js` has proper SSR settings
- Check `noExternal` packages in config
- Use react-router v6 (not v7)

### Build Failures
- Clear `node_modules/` and `dist/`
- Run `npm install` again
- Check Node.js version (18+)

### Port Already in Use
```bash
# Change port in server.js line 73
app.listen(3000)  // Change 5173 to another port
```

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start SSR dev server

# Building
npm run build        # Build client and server
npm run build:client # Build client only
npm run build:server # Build server only

# Production
npm run preview      # Run production server

# Linting
npm run lint         # Check code style
```

## 🔐 Security Considerations

- All external packages are properly vetted
- No sensitive data in client code
- CORS properly configured
- XSS protection via React escaping

## 📄 License

This project is proprietary to HK Enterprises.

## 👥 Support

For issues or questions, contact the development team.

---

**Built with ❤️ using React and Vite**
