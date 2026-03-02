import './App.css'
import Home from './pages/Home'
import Categories from './pages/Categories'
import Auth from './pages/Auth'
import AdminDashboard from './pages/AdminDashboard'
import Orders from './pages/Orders'
import Cart from './pages/Cart'
import { AppProvider, useApp } from './context/useAppContext'
import React, { useEffect, useState } from 'react'

function AppContent() {
  const { user } = useApp()
  const [route, setRoute] = useState('home')

  useEffect(() => {
    if (!user) return // Show auth if not logged in
    
    const onHash = () => {
      const hash = window.location.hash.slice(2)
      setRoute(hash || 'home')
    }
    onHash()
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [user])

  // Show authentication page if not logged in
  if (!user) {
    return <Auth />
  }

  // Route based on user role
  if (user.role === 'farmer') {
    return <AdminDashboard />
  }

  // Consumer route
  if (route === 'categories') return <Categories />;
  if (route === 'orders') return <Orders />;
  if (route === 'cart') return <Cart />;
  return <Home />
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App
