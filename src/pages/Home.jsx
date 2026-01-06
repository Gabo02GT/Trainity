import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

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
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Fondo animado */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-4 py-6 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between animate-slideDown">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#1a3a52] to-[#2d5a7b] bg-clip-text text-transparent">
              Bienvenido a Trainity - GYM
            </h1>
            <p className="text-[#7a8fa3] font-semibold mt-2">{user?.email}</p>
            {user?.emailVerified && (
              <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-900 text-sm font-semibold rounded-full">
                ✓ Email verificado
              </span>
            )}
          </div>
          <button 
            onClick={handleLogout}
            className="btn-primary hover:shadow-lg"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="relative z-10 px-4 py-8 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Sección Logo */}
          <div className="card flex flex-col items-center text-center animate-slideUp">
            <img 
              src="/images/icon-512-maskable.png" 
              alt="Trainity GYM Logo" 
              className="w-40 h-40 rounded-3xl shadow-lg border-4 border-[#1a3a52] hover:scale-110 hover:rotate-[-5deg] transition-all duration-300 animate-rotateIn"
            />
            <h2 className="text-3xl font-bold text-[#1a3a52] mt-6">Tu gimnasio en tu bolsillo</h2>
          </div>

          {/* Sección PWA */}
          <div className="card animate-slideInUp" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-bold text-[#1a3a52] mb-4">Esta es mi primera PWA</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-[#1a3a52]/10 to-[#2d5a7b]/10 rounded-lg">
                <span className="text-2xl">✓</span>
                <p className="text-[#7a8fa3] font-semibold">Instalable en tu dispositivo</p>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-[#1a3a52]/10 to-[#2d5a7b]/10 rounded-lg">
                <span className="text-2xl">✓</span>
                <p className="text-[#7a8fa3] font-semibold">Funciona sin conexión</p>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-[#1a3a52]/10 to-[#2d5a7b]/10 rounded-lg">
                <span className="text-2xl">✓</span>
                <p className="text-[#7a8fa3] font-semibold">Acceso rápido desde pantalla de inicio</p>
              </div>
            </div>
          </div>

          {/* Sección Contador */}
          <div className="card text-center animate-slideInUp" style={{ animationDelay: '0.4s' }}>
            <button 
              onClick={() => setCount((count) => count + 1)}
              className="btn-primary text-lg py-4 px-8"
            >
              Contador: {count}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
