import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-logo">
          <img src="/images/icon-192.png" alt="Trainity" />
        </div>
        <h1>Bienvenido a Trainity</h1>
        <p className="user-name">
          👤 {currentUser?.displayName || currentUser?.email}
        </p>
      </div>

      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>🎉 ¡Cuenta creada exitosamente!</h2>
          <p>Estás listo para comenzar a registrar tus entrenamientos.</p>
          <div className="coming-soon">
            <span className="badge">Próximamente</span>
            <h3>Panel de Control</h3>
            <ul>
              <li>📊 Estadísticas de progreso</li>
              <li>💪 Gestión de rutinas</li>
              <li>📝 Registro de ejercicios</li>
              <li>🎯 Objetivos personalizados</li>
            </ul>
          </div>
        </div>

        <button onClick={handleLogout} className="logout-button">
          <span>Cerrar Sesión</span>
          <span>🚪</span>
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
