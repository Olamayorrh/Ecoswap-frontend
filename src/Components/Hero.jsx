import React from 'react';
import { Link } from 'react-router';
import plasticHero from '../assets/images/plastic-hero.png';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-inner container">
        {/* Left: Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            The future of circular economy
          </div>

          <h1 className="hero-title">
            Turning Waste <br />
            <span className="hero-highlight">Into Value</span>
          </h1>

          <p className="hero-subtitle">
            Connect with verified buyers and sellers of recycled materials.
            From plastic to metal — trade waste sustainably and profitably.
          </p>

          <div className="hero-cta">
            <Link to="/signup" className="btn-hero-primary">Get Started</Link>
            <Link to="/signin" className="btn-hero-secondary">Sign In</Link>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <h3 className="stat-value">12k+</h3>
              <p className="stat-label">Tons Recycled</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <h3 className="stat-value">450+</h3>
              <p className="stat-label">Global Suppliers</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <h3 className="stat-value">24hrs</h3>
              <p className="stat-label">Avg. Response</p>
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="hero-image-section">
          <div className="hero-image-wrapper">
            <img
              src={plasticHero}
              alt="Sorted recycled plastic materials"
              className="hero-img"
            />
            <div className="hero-image-glow"></div>
          </div>

          {/* Floating badge */}
          <div className="hero-float-card">
            <span className="float-card-icon">♻️</span>
            <div>
              <p className="float-card-title">100% Verified</p>
              <p className="float-card-sub">All suppliers verified</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
