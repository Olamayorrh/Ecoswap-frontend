import React from 'react';
import Navbar from '../Components/Navbar.jsx';
import Hero from '../Components/Hero';
import MarketplaceListings from '../Components/MarketplaceListings.jsx';
import CTABanner from '../Components/CTABanner.jsx';
import Footer from '../Components/Footer.jsx';

const LandingPage = () => {
  return (
    <div className="landing-page flex-col">
      <Navbar />
      <Hero />
      <MarketplaceListings />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default LandingPage;
