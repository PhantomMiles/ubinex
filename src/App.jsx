import './App.css'
import Home from './pages/Home'
import AdminDashboard from './pages/AdminDashboard'
import Auth from './pages/Auth'
import Categories from './pages/Categories'
import Orders from './pages/Orders'
import Cart from './pages/Cart'
import About from './pages/About'
import Markets from './pages/Markets'
import Wholesale from './pages/Wholesale'
import Logistics from './pages/Logistics'
import Farms from './pages/Farms'
import Settings from './pages/Settings'
import Legal from './pages/Legal'
import { AppProvider, useApp } from './context/useAppContext'
import React, { useEffect, useState } from 'react'

import Footer from './components/Footer'

function AppContent() {
  const { user } = useApp()
  const [route, setRoute] = useState('home')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (!user) return 
    
    const onHash = () => {
      const hash = window.location.hash.slice(2)
      const [path, param] = hash.split('/')
      setRoute(path || 'home')
      
      if (path === 'categories' && param) {
        setSelectedCategory(decodeURIComponent(param))
      }
    }
    onHash()
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [user])

  if (!user) {
    return <Auth />
  }

  // Admin Dashboard for Farmers
  if (user.role === 'farmer' && (route === 'home' || route === 'admin')) {
    return <AdminDashboard />
  }

  // Common routing
  let content;
  switch (route) {
    case 'categories':
      content = <Categories 
        query={searchQuery} setQuery={setSearchQuery} 
        selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} 
      />;
      break;
    case 'orders':
      content = <Orders />;
      break;
    case 'cart':
      content = <Cart />;
      break;
    case 'about':
      content = <About />;
      break;
    case 'markets':
      content = <Markets />;
      break;
    case 'wholesale':
      content = <Wholesale />;
      break;
    case 'logistics':
      content = <Logistics />;
      break;
    case 'farms':
      content = <Farms />;
      break;
    case 'settings':
      content = <Settings />;
      break;
    case 'legal':
      content = <Legal />;
      break;
    default:
      content = <Home 
        query={searchQuery} setQuery={setSearchQuery} 
        selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} 
      />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        {content}
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App
