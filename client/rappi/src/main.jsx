import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import GoogleMap from './components/Map.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <GoogleMap lat={37.7749} lng={-122.4194} />
  </StrictMode>,
)
