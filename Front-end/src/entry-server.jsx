import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'
import ThemeContextProvider from './context/ThemeContext.jsx'

export function render(url) {
  return renderToString(
    <ThemeContextProvider>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </ThemeContextProvider>
  )
}