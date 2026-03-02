import './App.css'
import Home from './pages/Home'
import AdminDashboard from './pages/AdminDashboard'
import Auth from './pages/Auth'
import Categories from './pages/Categories'
import Orders from './pages/Orders'
import Cart from './pages/Cart'
import { AppProvider, useApp } from './context/useAppContext'
import React, { useEffect, useState } from 'react'

function AppContent() {
  const { user } = useApp()
  const [route, setRoute] = useState('home')
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    if (!user) return // Show auth if not logged in
    
    const onHash = () => {
      const hash = window.location.hash.slice(2)
      const [path, param] = hash.split('/')
      setRoute(path || 'home')
      
      // Handle category parameter
      if (path === 'categories' && param) {
        setSelectedCategory(decodeURIComponent(param))
      }
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

  // Consumer routes
  switch (route) {
    case 'categories':
      return <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
    case 'orders':
      return <Orders />
    case 'cart':
      return <Cart />
    default:
      return <Home setSelectedCategory={setSelectedCategory} />
  }
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App
