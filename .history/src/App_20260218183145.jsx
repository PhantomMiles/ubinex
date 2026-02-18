import './App.css'
import Home from './pages/Home'
import { AppProvider } from './context/useAppContext'

function App() {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  )
}

export default App
