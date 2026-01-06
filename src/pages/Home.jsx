import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: '�',
      title: 'Registro Completo',
      description: 'Registra ejercicios, pesos, series y descansos de forma detallada'
    },
    {
      icon: '💪',
      title: 'Rutinas Inteligentes',
      description: 'Crea y organiza tus rutinas de entrenamiento personalizadas'
    },
    {
      icon: '📊',
      title: 'Seguimiento de Progreso',
      description: 'Mide tu evolución día a día con estadísticas claras'
    },
    {
      icon: '⚡',
      title: 'Interfaz Eficiente',
      description: 'Diseño moderno enfocado en el rendimiento y la productividad'
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className={`hero-section ${isVisible ? 'fade-in' : ''}`}>
        <div className="hero-content">
          <div className="logo-container pulse">
            <img src="/images/icon-192.png" alt="Gym PWA" className="hero-logo" />
          </div>
          <h1 className="hero-title slide-up">
            <span className="gradient-text">Trainity</span>
          </h1>
          <p className="hero-description slide-up-delay">
            Una aplicación de entrenamiento diseñada para llevar un <strong>control inteligente y preciso</strong> de tus rutinas de gym. Registra ejercicios, pesos, series, descansos y progreso de forma clara y eficiente.
          </p>
          <div className="hero-buttons slide-up-delay-2">
            <Link to="/login" className="btn-primary glow">
              <span>Iniciar Sesión</span>
              <span className="arrow">→</span>
            </Link>
            <Link to="/register" className="btn-secondary">
              Registrarse
            </Link>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">¿Por qué elegirnos?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`feature-card ${isVisible ? 'fade-in' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="feature-icon bounce">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number counter">1000+</div>
            <div className="stat-label">Usuarios Activos</div>
          </div>
          <div className="stat-item">
            <div className="stat-number counter">50K+</div>
            <div className="stat-label">Entrenamientos</div>
          </div>
          <div className="stat-item">
            <div className="stat-number counter">98%</div>
            <div className="stat-label">Satisfacción</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">¿Listo para transformar tu entrenamiento?</h2>
          <p className="cta-description">
            Únete a quienes entrenan con constancia y quieren medir su evolución día a día
          </p>
          <Link to="/login" className="btn-cta pulse-button">
            <span>Iniciar Sesión</span>
            <span className="sparkle">✨</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
