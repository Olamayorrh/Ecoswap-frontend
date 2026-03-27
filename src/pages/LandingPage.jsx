import React from 'react';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import MarketplaceListings from '../Components/MarketplaceListings';
import CTABanner from '../Components/CTABanner';
import Footer from '../Components/Footer';

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
