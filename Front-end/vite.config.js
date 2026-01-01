import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, isSsrBuild }) => ({
  plugins: [react()],
  ssr: {
    // Bundle react-router for proper ESM handling in SSR
    noExternal: ['react-router', 'react-router-dom'],
  },
  build: {
    // Use esbuild for minification (faster and built-in)
    minify: 'esbuild',
    // Only apply code splitting for client builds, not SSR
    rollupOptions: !isSsrBuild ? {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
        },
      },
    } : {},
  },
}))