import './App.css'
import Home from './pages/Home'
import AdminDashboard from './pages/AdminDashboard'
import { AppProvider } from './context/useAppContext'
import React, { useEffect, useState } from 'react'

function App() {
  const [route, setRoute] = useState(() => (window.location.hash.startsWith('#/admin') ? 'admin' : 'home'))

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.startsWith('#/admin') ? 'admin' : 'home')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <AppProvider>
      {route === 'home' ? <Home /> : <AdminDashboard />}
    </AppProvider>
  )
}

export default App
