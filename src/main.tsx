import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const rootEl = document.getElementById('root')

if (!rootEl) {
  throw new Error(
    '[PixelRaider] Fatal: #root element not found in the DOM. Check your index.html.'
  )
}

Object.freeze(Object.prototype)

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
)
