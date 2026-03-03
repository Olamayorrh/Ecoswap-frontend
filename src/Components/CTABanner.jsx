import React from 'react';
import { Link } from 'react-router';
import './CTABanner.css';

const CTABanner = () => {
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <div className="cta-banner">
          {/* Decorative blobs */}
          <div className="cta-blob cta-blob-1"></div>
          <div className="cta-blob cta-blob-2"></div>

          <div className="cta-content">
            <span className="cta-eyebrow">Join EcoSwap Today</span>
            <h2 className="cta-title">Ready to join the circular revolution?</h2>
            <p className="cta-subtitle">
              Join thousands of businesses turning recyclable waste into value.
              Whether you have materials to sell or need sustainable supply,
              EcoSwap connects you to a verified network of buyers and sellers across Africa.
            </p>

            <div className="cta-actions">
              <Link to="/signup" state={{ role: 'Buyer' }} className="btn-cta-primary">
                Register as a Buyer
              </Link>
              <Link to="/signup" state={{ role: 'Seller' }} className="btn-cta-outline">
                Register as a Seller
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
