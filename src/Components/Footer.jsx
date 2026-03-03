import React from 'react';
import { Link } from 'react-router';
import { Instagram, Linkedin, MessageCircle, Leaf } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-icon"><Leaf size={20} /></span>
              <span className="footer-logo-text">EcoSwap</span>
            </div>
            <p className="footer-desc">
              EcoSwap is a circular economy marketplace connecting waste material sellers
              and buyers across Africa — making recycling profitable and sustainable.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Instagram" className="social-link">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="social-link">
                <Linkedin size={20} />
              </a>
              <a href="#" aria-label="WhatsApp" className="social-link">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="footer-links-grid">
            <div className="footer-col">
              <h4 className="footer-col-title">Marketplace</h4>
              <Link to="#">Plastics</Link>
              <Link to="#">Metals</Link>
              <Link to="#">Paper &amp; Cardboard</Link>
              <Link to="#">Glass</Link>
            </div>
            <div className="footer-col">
              <h4 className="footer-col-title">Company</h4>
              <Link to="#">About Us</Link>
              <Link to="#">Sustainability</Link>
              <Link to="#">Contact</Link>
              <Link to="#">Careers</Link>
            </div>
            <div className="footer-col">
              <h4 className="footer-col-title">Resources</h4>
              <Link to="#">Help Center</Link>
              <Link to="#">Grading Guide</Link>
              <Link to="#">Logistics</Link>
              <Link to="#">API Docs</Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>&copy; 2025 EcoSwap. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
            <Link to="#">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
