import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validaciones
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      setLoading(false);
      return;
    }

    try {
      await register(email, password);
      setSuccess(true);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      
      // Redirigir después de 3 segundos
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Este correo ya está registrado.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Correo inválido.');
      } else {
        setError('Error al registrar. Intenta nuevamente.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-end px-4 py-6 sm:px-8 relative overflow-hidden">
      {/* Fondo animado */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Card */}
      <div className="card w-full max-w-md lg:max-w-lg relative z-10 animate-slideUp">
        {/* Logo */}
        <div className="text-center mb-8 animate-rotateIn">
          <img 
            src="/images/icon-512-maskable.png" 
            alt="Trainity" 
            className="w-32 h-32 rounded-3xl mx-auto shadow-lg border-4 border-[#1a3a52] hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Título y Subtítulo */}
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-[#1a3a52] to-[#2d5a7b] bg-clip-text text-transparent animate-slideInLeft">
          Trainity - GYM
        </h1>
        <p className="text-center text-[#7a8fa3] mb-8 font-medium animate-fadeIn">
          Crea tu cuenta
        </p>

        {/* Mensaje de Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-900 rounded-lg animate-bounce">
            {error}
          </div>
        )}

        {/* Mensaje de Éxito */}
        {success && (
          <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-900 rounded-lg animate-slideUp">
            ✓ Cuenta creada exitosamente. Se ha enviado un email de verificación. Serás redirigido al login en unos segundos...
          </div>
        )}

        {!success && (
          <>
            {/* Formulario */}
            <form onSubmit={handleRegister} className="space-y-6">
              {/* Email */}
              <div className="animate-slideInUp" style={{ animationDelay: '0.3s' }}>
                <label className="block text-[#1a3a52] font-semibold mb-2 text-sm">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  disabled={loading}
                  className="input-field"
                />
              </div>

              {/* Contraseña */}
              <div className="animate-slideInUp" style={{ animationDelay: '0.35s' }}>
                <label className="block text-[#1a3a52] font-semibold mb-2 text-sm">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={loading}
                  className="input-field"
                />
                <small className="text-[#7a8fa3] text-xs mt-1 block">Mínimo 6 caracteres</small>
              </div>

              {/* Confirmar Contraseña */}
              <div className="animate-slideInUp" style={{ animationDelay: '0.4s' }}>
                <label className="block text-[#1a3a52] font-semibold mb-2 text-sm">
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={loading}
                  className="input-field"
                />
              </div>

              {/* Botón Registrarse */}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full btn-primary animate-slideInUp disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ animationDelay: '0.45s' }}
              >
                {loading ? 'Registrando...' : 'Registrarse'}
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-[#7a8fa3] text-sm mt-8 animate-fadeIn">
              ¿Ya tienes cuenta?{' '}
              <Link 
                to="/login" 
                className="font-bold text-[#1a3a52] hover:text-[#2d5a7b] transition-colors duration-300"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};
