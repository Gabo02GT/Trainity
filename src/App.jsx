import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { ProtectedRoute } from './components/ProtectedRoute'
import Home from './pages/Home'
import './App.css'

function App() {
  const { isAuthenticated, loading } = useContext(AuthContext)

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ color: 'white', fontSize: '1.2rem' }}>Cargando...</div>
      </div>
    )
  }

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />

      {/* Rutas protegidas */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
    </Routes>
  )
}

export default App
