
import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <img 
          src="https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=1200&h=400&fit=crop" 
          alt="Synagogue Interior" 
          className="hero-image"
        />
      </div>
      <div className="hero-content">
        <h2 className="hero-title">Welcome to Our Sacred Community</h2>
        <p className="hero-subtitle">
          Join us in prayer, study, and fellowship as we honor our traditions and build connections.
        </p>
        <div className="hero-quote">
          <p>"The world stands on three things: Torah, service to God, and deeds of kindness."</p>
          <cite>— Pirkei Avot 1:2</cite>
        </div>
      </div>
    </section>
  );
};

export default Hero;
