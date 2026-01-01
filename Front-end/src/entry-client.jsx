import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import ThemeContextProvider from './context/ThemeContext.jsx'
import './index.css'

const container = document.getElementById('root')
hydrateRoot(
  container,
  <ThemeContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeContextProvider>
)
