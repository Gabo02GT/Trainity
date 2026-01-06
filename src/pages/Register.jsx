import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación básica
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    if (!formData.terms) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }
    // Lógica de registro se implementará con Firebase después
    console.log('Register:', formData);
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
          <h1 className="auth-title">Únete a nosotros</h1>
          <p className="auth-subtitle">Crea tu cuenta y empieza a entrenar</p>
        </div>

        {/* Formulario de Registro */}
        <form className="auth-form slide-up" onSubmit={handleSubmit}>
          {/* Campo Nombre */}
          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">👤</span>
              Nombre Completo
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Tu nombre"
                required
              />
              <div className="input-border"></div>
            </div>
          </div>

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
                minLength="6"
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

          {/* Campo Confirmar Password */}
          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">🔐</span>
              Confirmar Contraseña
            </label>
            <div className="input-wrapper password-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                placeholder="••••••••"
                required
                minLength="6"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
              <div className="input-border"></div>
            </div>
          </div>

          {/* Términos y Condiciones */}
          <div className="form-options">
            <label className="checkbox-label full-width">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="checkbox-input"
                required
              />
              <span className="checkbox-custom"></span>
              <span className="checkbox-text">
                Acepto los{' '}
                <a href="#" className="terms-link">
                  términos y condiciones
                </a>
              </span>
            </label>
          </div>

          {/* Botón Submit */}
          <button type="submit" className="auth-button">
            <span>Crear Cuenta</span>
            <span className="button-icon">✨</span>
          </button>

          {/* Link a Login */}
          <div className="auth-footer">
            <p>
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="auth-link">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
