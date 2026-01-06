import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="container">
        <h1>🚀 Trainity</h1>
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
