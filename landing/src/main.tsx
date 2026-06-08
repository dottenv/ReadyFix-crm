import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import App from './App'
import './styles/index.css'

const root = document.getElementById('root')
if (!root) {
  document.body.innerHTML = '<p style="padding:2rem;font-family:sans-serif;">Ошибка: корневой элемент не найден</p>'
} else {
  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>,
  )
}
