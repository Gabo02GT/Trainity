import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="container">
        <div className="logo-section">
          <img src="/images/icon-512-maskable.png" alt="Trainity GYM Logo" className="app-logo" />
          <h1>Trainity - GYM</h1>
        </div>
        <div className="pwa-message">
          <h2>Esta es mi primera PWA</h2>
          <p>Puedes instalar esta aplicación en tu dispositivo</p>
          <p>Click en el ícono de instalar en la barra de direcciones</p>
        </div>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            Contador: {count}
          </button>
        </div>
      </div>
    </>
  )
}

export default App
