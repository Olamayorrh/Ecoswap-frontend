import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar-inner container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <span className="logo-icon-wrap">♻️</span>
          <span className="logo-text">EcoSwap</span>
        </Link>

        {/* Desktop nav links */}
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/buyer/dashboard" className="nav-link">Marketplace</Link>
          <Link to="/buyer/orders" className="nav-link">My Orders</Link>
        </div>

        {/* Desktop actions */}
        <div className="nav-actions">
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link to="/signin" className="btn-nav-signin">Sign In</Link>
          <Link to="/signup" className="btn-nav-getstarted">Get Started</Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-link" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/buyer/dashboard" className="mobile-link" onClick={() => setMenuOpen(false)}>Marketplace</Link>
          <Link to="/buyer/orders" className="mobile-link" onClick={() => setMenuOpen(false)}>My Orders</Link>
          <hr className="mobile-divider" />
          <div className="mobile-auth">
            <Link to="/signin" className="btn-nav-signin" onClick={() => setMenuOpen(false)}>Sign In</Link>
            <Link to="/signup" className="btn-nav-getstarted" onClick={() => setMenuOpen(false)}>Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
