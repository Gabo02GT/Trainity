import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      if (error.code === 'auth/invalid-credential') {
        setError('Correo o contraseña incorrectos');
      } else if (error.code === 'auth/user-not-found') {
        setError('No existe una cuenta con este correo');
      } else if (error.code === 'auth/wrong-password') {
        setError('Contraseña incorrecta');
      } else if (error.code === 'auth/too-many-requests') {
        setError('Demasiados intentos fallidos. Intenta más tarde');
      } else {
        setError('Error al iniciar sesión. Intenta de nuevo');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Formas animadas de fondo */}
      <div className="auth-background">
        <div className="auth-shape auth-shape-1"></div>
        <div className="auth-shape auth-shape-2"></div>
        <div className="auth-shape auth-shape-3"></div>
      </div>

      <div className="auth-content">
        {/* Logo y Título */}
        <div className="auth-header fade-in">
          <div className="auth-logo-container pulse-slow">
            <img src="/images/icon-192.png" alt="Gym PWA" className="auth-logo" />
          </div>
          <h1 className="auth-title">Bienvenido de nuevo</h1>
          <p className="auth-subtitle">Inicia sesión para continuar tu progreso</p>
        </div>

        {/* Formulario de Login */}
        <form className="auth-form slide-up" onSubmit={handleSubmit}>
          {/* Mensaje de error */}
          {error && (
            <div className="error-message">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Campo Email */}
          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">✉️</span>
              Email
            </label>
            <div className="input-wrapper">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="tu@email.com"
                required
              />
              <div className="input-border"></div>
            </div>
          </div>

          {/* Campo Password */}
          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">🔒</span>
              Contraseña
            </label>
            <div className="input-wrapper password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
              <div className="input-border"></div>
            </div>
          </div>

          {/* Remember Me y Forgot Password */}
          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="checkbox-input"
              />
              <span className="checkbox-custom"></span>
              <span className="checkbox-text">Recordarme</span>
            </label>
            <Link to="/forgot-password" className="forgot-link">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {/* Botón Submit */}
          <button type="submit" className="auth-button" disabled={loading}>
            <span>{loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}</span>
            {!loading && <span className="button-icon">→</span>}
          </button>

          {/* Link a Register */}
          <div className="auth-footer">
            <p>
              ¿No tienes cuenta?{' '}
              <Link to="/register" className="auth-link">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
