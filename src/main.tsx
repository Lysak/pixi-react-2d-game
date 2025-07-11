/**
 * biome-ignore-all lint/style/noNonNullAssertion: <explanation>
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//TODO: extension should be here
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
