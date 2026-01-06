import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import '../App.css'

function Home() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [count, setCount] = useState(0)

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="user-section">
          <h1>Bienvenido a Trainity - GYM</h1>
          <p className="user-email">{user?.email}</p>
          {user?.emailVerified && (
            <span className="email-verified">✓ Email verificado</span>
          )}
        </div>
        <button onClick={handleLogout} className="btn-logout">
          Cerrar sesión
        </button>
      </div>

      <div className="container">
        <div className="logo-section">
          <img src="/images/icon-512-maskable.png" alt="Trainity GYM Logo" className="app-logo" />
          <h2>Tu gimnasio en tu bolsillo</h2>
        </div>
        
        <div className="pwa-message">
          <h3>Esta es mi primera PWA</h3>
          <p>✓ Instalable en tu dispositivo</p>
          <p>✓ Funciona sin conexión</p>
          <p>✓ Acceso rápido desde pantalla de inicio</p>
        </div>
        
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            Contador: {count}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
