import { useState, useEffect } from 'react';
import './Home.css';

function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: '📊',
      title: 'Monitoreo en Tiempo Real',
      description: 'Sigue tu progreso diario y visualiza tus estadísticas'
    },
    {
      icon: '💪',
      title: 'Rutinas Personalizadas',
      description: 'Crea y gestiona tus rutinas de entrenamiento'
    },
    {
      icon: '🎯',
      title: 'Objetivos Claros',
      description: 'Define metas y alcanza tus objetivos de fitness'
    },
    {
      icon: '📱',
      title: 'Acceso Offline',
      description: 'Usa la app sin conexión, sincroniza después'
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
            <span className="gradient-text">Gym Progress</span>
            <span className="subtitle">Tracker</span>
          </h1>
          <p className="hero-description slide-up-delay">
            Tu <strong>Progressive Web App</strong> para monitorear y llevar el control completo de tu progreso en las rutinas del gimnasio
          </p>
          <div className="hero-buttons slide-up-delay-2">
            <button className="btn-primary glow">
              <span>Comenzar Ahora</span>
              <span className="arrow">→</span>
            </button>
            <button className="btn-secondary">
              Ver Demo
            </button>
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
            Comienza hoy y descubre cómo nuestra PWA puede ayudarte a alcanzar tus metas
          </p>
          <button className="btn-cta pulse-button">
            <span>Únete Ahora</span>
            <span className="sparkle">✨</span>
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
