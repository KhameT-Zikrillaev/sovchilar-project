import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Импортируем BrowserRouter
import './index.css'
import './i18n.js'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Оборачиваем приложение в BrowserRouter */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)
